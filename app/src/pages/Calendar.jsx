import Shell from "../components/Shell";

export default function Calendar() {
  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">Location & Calendar</h2>
      <div className="mt-6 space-y-6">
        <div>
          <p className="text-neutral-300">5501 Hwy 55 East, Lake Wylie, SC 29710 — Inside Imagine Church</p>
          <a href="https://maps.apple.com/?q=5501%20Hwy%2055%20East%2C%20Lake%20Wylie%2C%20SC%2029710" className="underline hover:text-neutral-200">
            Open in Maps
          </a>
        </div>
        <div className="rounded-2xl border bg-neutral-950 p-6" style={{ borderColor: `#262626` }}>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-neutral-100">Upcoming Events & Closures</h3>
            <p className="mt-2 text-base text-neutral-300">
              Stay up to date with key dates, studio closures, performances, and special workshops. Click any event for details.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-800/80 bg-black/40 overflow-hidden shadow-inner">
            <iframe
              title="Acting Up Carolina Event Calendar"
              src="https://app.jackrabbitclass.com/eventcalendar.asp?orgid=519476"
              className="h-[720px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Shell>
  );
}
