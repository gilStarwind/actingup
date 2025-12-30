import { useEffect, useState } from "react";
import Papa from "papaparse";
import DOMPurify from "dompurify";
import classScheduleFallback from "../data/classScheduleFallback.json";
import { publicAsset } from "../utils/helpers";

const parseCsvText = (text) => {
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => (header ?? "").trim(),
    transform: (value) => (typeof value === "string" ? value.trim() : value),
  });
  const rows = Array.isArray(parsed.data)
    ? parsed.data.filter((row) => row && Object.values(row).some((val) => (val ?? "").toString().trim()))
    : [];
  if (!rows.length) throw new Error("CSV contained no rows");

  const sanitizedRows = rows.map(row => {
    const sanitizedRow = {};
    for (const key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        const value = row[key];
        if (typeof value === 'string') {
          sanitizedRow[key] = DOMPurify.sanitize(value);
        } else {
          sanitizedRow[key] = value;
        }
      }
    }
    return sanitizedRow;
  });

  return { rows: sanitizedRows, errors: parsed.errors || [] };
};

async function fetchCsvSchedule(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
  const text = await res.text();
  return parseCsvText(text);
}

async function fetchJsonSchedule(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`JSON HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected JSON schedule format");
  return data;
}

export function useClassSchedule() {
  const [schedule, setSchedule] = useState(
    Array.isArray(classScheduleFallback) ? classScheduleFallback : []
  );
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [scheduleError, setScheduleError] = useState(null);
  const [usingFallbackSchedule, setUsingFallbackSchedule] = useState(true);

  const scheduleCsvUrl = (() => {
    const raw = import.meta.env?.VITE_SCHEDULE_CSV_URL;
    if (typeof raw === "string" && raw.trim()) return raw.trim();
    return publicAsset("/class-schedule/index.csv");
  })();

  const scheduleJsonUrl = (() => {
    const raw = import.meta.env?.VITE_SCHEDULE_JSON_URL;
    if (typeof raw === "string" && raw.trim()) return raw.trim();
    return publicAsset("/class-schedule/index.json");
  })();

  useEffect(() => {
    let cancelled = false;
    async function loadSchedule() {
      if (!cancelled) {
        setScheduleLoading(true);
        setScheduleError(null);
      }

      const errorMessages = [];

      try {
        const { rows, errors } = await fetchCsvSchedule(scheduleCsvUrl);
        if (!cancelled) {
          setSchedule(rows);
          setUsingFallbackSchedule(false);
          if (errors.length) errorMessages.push(`CSV parsed with ${errors.length} warning(s)`);
          setScheduleLoading(false);
          if (!errors.length) setScheduleError(null);
          else setScheduleError(errorMessages.join(" • "));
        }
        return;
      } catch (err) {
        if (!cancelled) errorMessages.push(err?.message || "Unable to load CSV schedule");
      }

      try {
        const data = await fetchJsonSchedule(scheduleJsonUrl);
        if (!cancelled) {
          setSchedule(data);
          setUsingFallbackSchedule(false);
          setScheduleLoading(false);
          setScheduleError(null);
        }
        return;
      } catch (err) {
        if (!cancelled) errorMessages.push(err?.message || "Unable to load JSON schedule");
      }

      if (!cancelled) {
        const fallbackData = Array.isArray(classScheduleFallback) ? classScheduleFallback : [];
        setSchedule(fallbackData);
        setUsingFallbackSchedule(true);
        if (errorMessages.length) setScheduleError(errorMessages.join(" • "));
        setScheduleLoading(false);
      }
    }

    loadSchedule();
    return () => {
      cancelled = true;
    };
  }, [scheduleCsvUrl, scheduleJsonUrl]);

  return { schedule, scheduleLoading, scheduleError, usingFallbackSchedule };
}
