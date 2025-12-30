import React, { useState } from "react";
import Papa from "papaparse";
import { brand, publicAsset } from "../utils/helpers";
import Shell from "../components/Shell";

export default function ScheduleHelper() {
  const [parsedRows, setParsedRows] = useState([]);
  const [helperMessage, setHelperMessage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setHelperMessage("Parsing CSV…");
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => (header ?? "").trim(),
      transform: (value) => (typeof value === "string" ? value.trim() : value),
      complete: (results) => {
        const rows = Array.isArray(results.data)
          ? results.data.filter((row) => row && Object.values(row).some((val) => (val ?? "").toString().trim()))
          : [];
        setParsedRows(rows);
        if (results.errors?.length) {
          setHelperMessage(`Parsed with ${results.errors.length} warning(s). Review the preview below.`);
        } else {
          setHelperMessage(`Loaded ${rows.length} row(s). Preview below and download JSON if needed.`);
        }
      },
      error: (err) => {
        setParsedRows([]);
        setHelperMessage(err?.message || "Unable to parse CSV");
      },
    });
  };

  const downloadJson = () => {
    if (!parsedRows.length) return;
    const blob = new Blob([JSON.stringify(parsedRows, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">Class Schedule Helper</h2>
      <p className="mt-2 max-w-3xl text-base text-neutral-300">
        Use this tool to double-check your `index.csv` before uploading it to the server. Upload a CSV exported from Excel/Sheets, preview the parsed rows, and optionally download a JSON version for debugging.
      </p>

      <div className="mt-6 space-y-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-6">
        <div>
          <label htmlFor="schedule-csv" className="block text-sm font-semibold text-neutral-200">
            Upload schedule CSV
          </label>
          <input
            id="schedule-csv"
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-200"
          />
          <p className="mt-2 text-sm text-neutral-400">
            Required headers: <code>status,title,description,days,times,gender,ages,openings,starts,ends,session,tuition,fees</code>
          </p>
        </div>
        {fileName && (
          <div className="rounded-xl border border-neutral-800/80 bg-black/40 px-4 py-3 text-sm text-neutral-200">
            <strong>File:</strong> {fileName}{helperMessage ? ` — ${helperMessage}` : ""}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <a
            href={publicAsset("/class-schedule/index.sample.csv")}
            className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-400"
          >
            Download sample CSV
          </a>
          <button
            type="button"
            onClick={downloadJson}
            disabled={!parsedRows.length}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-neutral-800"
            style={{ backgroundColor: parsedRows.length ? brand.yellow : "#27272a" }}
          >
            Download JSON preview
          </button>
        </div>
      </div>

      {parsedRows.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-800/80">
          <table className="min-w-full table-fixed divide-y divide-neutral-800 bg-black/40 text-sm text-neutral-200">
            <thead className="bg-neutral-950/80 text-xs uppercase tracking-wide text-neutral-400">
              <tr>
                {Object.keys(parsedRows[0]).map((key) => (
                  <th key={key} className="px-3 py-3 text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {parsedRows.map((row, idx) => (
                <tr key={`${row.title || "row"}-${idx}`}>
                  {Object.keys(parsedRows[0]).map((key) => (
                    <td key={`${key}-${idx}`} className="px-3 py-3 align-top text-neutral-200">
                      {row[key] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}
