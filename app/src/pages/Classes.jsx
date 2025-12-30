import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { brand } from "../utils/helpers";
import Shell from "../components/Shell";
import { useClassSchedule } from "../hooks/useClassSchedule";

const ClassTableRow = ({ row }) => (
  <tr className="align-top">
    <td className="px-4 py-4">
      <div className="font-semibold text-neutral-100">{row.title}</div>
      <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{row.description}</p>
    </td>
    <td className="px-4 py-4 text-sm text-neutral-200">
      <div className="font-medium text-neutral-100">{row.days}</div>
      <div className="mt-1 text-neutral-200">{row.times}</div>
      <div className="mt-3 text-neutral-400 text-xs uppercase tracking-wide">Session</div>
      <div className="text-neutral-200">{row.session}</div>
      <div className="mt-1 text-neutral-400 text-xs uppercase tracking-wide">Dates</div>
      <div className="text-neutral-200">{row.starts} – {row.ends}</div>
    </td>
    <td className="px-4 py-4 text-sm text-neutral-200">
      <div><span className="text-neutral-400 text-xs uppercase tracking-wide">Ages</span></div>
      <div className="text-neutral-100">{row.ages}</div>
      <div className="mt-3"><span className="text-neutral-400 text-xs uppercase tracking-wide">Gender</span></div>
      <div className="text-neutral-100">{row.gender}</div>
    </td>
    <td className="px-4 py-4 text-sm text-neutral-200">
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
        style={{
          backgroundColor: row.status === 'Open' ? brand.yellow : '#27272a',
          color: row.status === 'Open' ? '#111827' : '#f4f4f5',
        }}
      >
        {row.status}
      </span>
      <div className="mt-3 text-neutral-400 text-xs uppercase tracking-wide">Openings</div>
      <div className="text-neutral-100">{row.openings}</div>
    </td>
    <td className="px-4 py-4 text-sm text-neutral-200">
      <div><span className="text-neutral-400 text-xs uppercase tracking-wide">Tuition</span></div>
      <div className="text-neutral-100">{row.tuition}</div>
      <div className="mt-3"><span className="text-neutral-400 text-xs uppercase tracking-wide">Performance Fee</span></div>
      <div className="text-neutral-100">{row.fees}</div>
    </td>
  </tr>
);

const ClassCard = ({ row }) => (
  <article
    className="rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-4 text-base text-neutral-200 shadow-inner"
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
        style={{
          backgroundColor: row.status === 'Open' ? brand.yellow : '#27272a',
          color: row.status === 'Open' ? '#111827' : '#f4f4f5',
        }}
      >
        {row.status}
      </span>
      <h4 className="text-lg font-semibold text-neutral-50">{row.title}</h4>
    </div>
    <p className="mt-3 text-neutral-300 leading-relaxed">{row.description}</p>
    <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-neutral-300">
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Days</dt>
        <dd className="text-right">{row.days}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Times</dt>
        <dd className="text-right">{row.times}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Ages</dt>
        <dd className="text-right">{row.ages}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Gender</dt>
        <dd className="text-right">{row.gender}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Openings</dt>
        <dd className="text-right">{row.openings}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Session</dt>
        <dd className="text-right">{row.session}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Starts</dt>
        <dd className="text-right">{row.starts}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Ends</dt>
        <dd className="text-right">{row.ends}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Tuition</dt>
        <dd className="text-right">{row.tuition}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="font-medium text-neutral-100">Performance Fee</dt>
        <dd className="text-right">{row.fees}</dd>
      </div>
    </dl>
    <div className="mt-4 border-t border-neutral-800 pt-3 text-sm text-neutral-400">
      <span>Starts {row.starts} • Ends {row.ends}</span>
    </div>
  </article>
);


export default function Classes() {
  const items = [
    { title: "Acting / Improv", desc: "Develop stage presence, creativity, and quick thinking." },
    { title: "Musical Theatre", desc: "Sing, dance, and act in a supportive ensemble." },
    { title: "Show Choir", desc: "Hone vocal technique and performance skills." },
  ];
  const { schedule, scheduleLoading, scheduleError } = useClassSchedule();

  useEffect(() => {
    if (scheduleError) {
      console.warn("[Classes] schedule load warning:", scheduleError);
    }
  }, [scheduleError]);

  return (
    <Shell>
      <div className="flex items-end justify-between gap-6 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Classes</h2>
        <a href="https://app.jackrabbitclass.com/regv2.asp?id=519476" className="text-base underline hover:text-neutral-200">See schedule</a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c) => (
          <motion.article
            key={c.title}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(250,204,21,0.08)" }}
            className="rounded-2xl p-6 border bg-neutral-950"
            style={{ borderColor: `${brand.purple}33` }}
          >
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-base text-neutral-200">{c.desc}</p>
            <div className="mt-4">
              <a href="https://app.jackrabbitclass.com/regv2.asp?id=519476" className="text-base font-medium hover:opacity-90"
                 style={{ color: brand.yellow }}
              >
                View details & register →
              </a>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-semibold tracking-tight">Class Schedule</h3>
        <p className="mt-2 text-base text-neutral-300 max-w-3xl">
          Explore our current offerings, including meeting times, ages, and availability. Use the register link to secure your spot or join the waitlist when a class is full.
        </p>
        {scheduleLoading && (
          <div className="mt-4 text-sm text-neutral-300">Loading the latest schedule…</div>
        )}
        {!scheduleLoading && !schedule.length && (
          <div className="mt-4 rounded-xl border border-neutral-800/60 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-200">
            Schedule coming soon. Check back shortly or contact us for details.
          </div>
        )}
        {/* schedule errors are logged to the console to avoid confusing site visitors */}
        <div className="mt-6 hidden md:block">
          <table className="min-w-full table-fixed divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800/80 bg-black/40 text-base">
            <thead className="bg-neutral-950/90 text-sm uppercase tracking-wide text-neutral-300">
              <tr>
                <th scope="col" className="px-4 py-3 text-left w-[28%]">Class</th>
                <th scope="col" className="px-4 py-3 text-left w-[24%]">Schedule</th>
                <th scope="col" className="px-4 py-3 text-left w-[18%]">Ages &amp; Gender</th>
                <th scope="col" className="px-4 py-3 text-left w-[15%]">Enrollment</th>
                <th scope="col" className="px-4 py-3 text-left w-[15%]">Tuition &amp; Fees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {schedule.map((row) => (
                <ClassTableRow key={row.title} row={row} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-4 md:hidden">
          {schedule.map((row) => (
            <ClassCard key={`${row.title}-mobile`} row={row} />
          ))}
        </div>
      </div>
    </Shell>
  );
}
