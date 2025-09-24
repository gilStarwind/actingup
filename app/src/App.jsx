import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";
import classScheduleFallback from "./data/classScheduleFallback.json";

// Brand helpers
const brand = {
  purple: "#6d28d9", // purple-700
  purpleSoft: "#a78bfa", // violet-300
  yellow: "#facc15", // yellow-400
  yellowDark: "#eab308", // yellow-500
  black: "#0a0a0a",
};

const rawBase = (import.meta.env && import.meta.env.BASE_URL) || "/";
const publicBase = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");
const publicAsset = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${publicBase}${normalized}`;
};

const rawGalleryBase = (import.meta.env && import.meta.env.VITE_GALLERY_BASE_URL) || "/shows";
const galleryBase = (() => {
  if (/^https?:\/\//i.test(rawGalleryBase)) {
    return rawGalleryBase.replace(/\/$/, "");
  }
  const normalized = rawGalleryBase.startsWith("/") ? rawGalleryBase : `/${rawGalleryBase}`;
  return `${publicBase}${normalized}`.replace(/\/$/, "");
})();

const galleryAsset = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${galleryBase}${normalized}`;
};

function Header() {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.35, 0.75]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0.2, 0.6]);
  const bg = useMotionTemplate`rgba(10,10,10, ${bgOpacity})`;
  const border = useMotionTemplate`1px solid rgba(255,255,255, ${borderOpacity})`;

  const navItem = (label, to) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'text-white' : 'text-neutral-300 hover:text-white/90'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span>{label}</span>
          <motion.span
            layoutId="active-pill"
            className="absolute inset-x-2 -bottom-1 h-[2px] rounded"
            animate={{ backgroundColor: isActive ? brand.yellow : 'transparent' }}
          />
        </>
      )}
    </NavLink>
  );

  return (
    <motion.header
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{
        backgroundColor: bg,
        borderBottom: border,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://le-cdn.hibuwebsites.com/52be499460c147619cde1f2f840c663e/dms3rep/multi/opt/Acting-Up-Carolina-LLC-Logo-344w.png"
            alt="Acting Up Carolina logo"
            className="h-9 w-auto drop-shadow-sm transition-transform group-hover:scale-105"
          />
          <span className="sr-only">Acting Up Carolina</span>
        </Link>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-200 hover:bg-neutral-800/60 focus:outline-none focus:ring focus:ring-violet-500/40"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="block h-0.5 w-5 bg-current"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block h-0.5 w-5 bg-current my-1"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="block h-0.5 w-5 bg-current"
          />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItem("Classes", "/classes")}
          {navItem("Camps", "/camps")}
          {navItem("Calendar", "/calendar")}
          {navItem("Gallery", "/gallery")}
          {navItem("About", "/about")}
          {navItem("Contact", "/contact")}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://app.jackrabbitclass.com/regv2.asp?id=548716"
            rel="noopener noreferrer"
            className="rounded-2xl px-4 py-2 text-sm font-semibold text-black"
            style={{ backgroundColor: brand.yellow }}
          >
            Register
          </a>
          <a
            href="https://app2.jackrabbitclass.com/portal/ppLogin.asp?id=548716"
            rel="noopener noreferrer"
            className="rounded-2xl px-4 py-2 text-sm font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900"
          >
            Login
          </a>
        </div>
      </div>
      <motion.nav
        id="primary-navigation"
        className="md:hidden border-t border-neutral-800/80 bg-black/50 backdrop-blur-xl"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <NavLink to="/classes" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Classes</NavLink>
            <NavLink to="/camps" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Camps</NavLink>
            <NavLink to="/calendar" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Calendar</NavLink>
            <NavLink to="/gallery" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Gallery</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Contact</NavLink>
          </div>
          <div className="flex gap-2 pt-2">
            <a href="https://app.jackrabbitclass.com/regv2.asp?id=548716" className="flex-1 rounded-xl px-4 py-2 text-base font-semibold text-black" style={{ backgroundColor: brand.yellow }}>Register</a>
            <a href="https://app2.jackrabbitclass.com/portal/ppLogin.asp?id=548716" className="flex-1 rounded-xl px-4 py-2 text-base font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900">Login</a>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-900 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-base text-neutral-400 flex flex-col sm:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Acting Up Carolina LLC</p>
        <p>
          <a href="#" className="underline hover:text-neutral-200">Website Accessibility</a>
          <span className="px-2">•</span>
          <a href="#" className="underline hover:text-neutral-200">Privacy</a>
          <span className="px-2">•</span>
          <a href="#" className="underline hover:text-neutral-200">Terms</a>
        </p>
      </div>
    </footer>
  );
}

function GlowOrbs() {
  // Subtle animated background orbs in brand colors
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: brand.purple }}
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: brand.yellow, opacity: 0.6 }}
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Stripe() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 -top-1 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(250,204,21,0) 0%, rgba(250,204,21,1) 20%, rgba(109,40,217,1) 50%, rgba(250,204,21,1) 80%, rgba(250,204,21,0) 100%)",
          filter: "blur(0.3px)",
        }}
      />
    </div>
  );
}

function Shell({ children }) {
  return (
    <main className="relative min-h-screen text-neutral-100" style={{ background: `radial-gradient(1200px 600px at 10% -10%, ${brand.purple}22, transparent), radial-gradient(1200px 600px at 110% 10%, ${brand.yellow}22, transparent), ${brand.black}` }}>
      <GlowOrbs />
      <Header />
      <Stripe />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        {children}
      </div>
      <Footer />
    </main>
  );
}

// Shared CTA Button with pulse on mount
const Cta = ({ href, children }) => (
  <motion.a
    href={href}
    rel="noopener noreferrer"
    initial={{ scale: 0.96, boxShadow: "0 0 0px rgba(250,204,21,0)" }}
    animate={{ scale: 1, boxShadow: "0 0 40px rgba(250,204,21,0.15)" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl px-6 font-semibold text-black"
    style={{ backgroundColor: brand.yellow }}
  >
    {children}
  </motion.a>
);

// Pages
// Instructors (verbatim bios from actingupcarolina.com/about)
const INSTRUCTORS = [
  {
    name: 'Jennifer Tankersley',
    role: 'Founder & Director',
    img: 'https://le-cdn.hibuwebsites.com/52be499460c147619cde1f2f840c663e/dms3rep/multi/opt/Jennifer-Tankersley-326h.jpg',
    bio: `Jennifer, originally from Music City Nashville TN, has worked in the entertainment industry for over 20 years. She has performed at Regional Theaters, Cruise Ships, Theme Parks, Dinner Theaters, and Summer Stock. For the past 10 years, Jennifer has focused on teaching music, drama, and dance. She has a passion for using the performing arts to build confidence, communication, and teamwork skills with students from preschool to adult.`,
  },
  {
    name: 'Leigh Ann Murdaugh',
    role: 'Voice & Music Instructor / Director',
    img: 'https://le-cdn.hibuwebsites.com/52be499460c147619cde1f2f840c663e/dms3rep/multi/opt/Leigh%2BAnn%2BMurdaugh-Headshot-404h.JPG',
    bio: `Leigh Ann is a versatile music educator and performer with a wide range of experience in vocal, instrumental, and theatrical arts. She has taught voice, piano, and oboe for more than 10 years, working with students across many different genres. Locally, she serves as a voice teacher for the award‑winning Clover Choraliers and teaches/directs at Acting Up Carolina.`,
  },
  {
    name: 'Olivia Fisher',
    role: 'Dance & Choreography Instructor',
    img: 'https://le-cdn.hibuwebsites.com/52be499460c147619cde1f2f840c663e/dms3rep/multi/opt/HeadshotLiv-401h.jpg',
    bio: `Olivia recently moved to Lake Wylie from Cincinnati, Ohio. She has been teaching dance and choreographing for over 20 years. Olivia holds a BFA in Dance Performance from Oklahoma City University and is a proud member of Actors' Equity Association. Favorite performance credits include Peter Pan (with Cathy Rigby), Cats, West Side Story, and Hairspray. Her students have gone on to dance for the NBA, NFL, The Ohio State University Dance Team, Radio City Rockettes, and Broadway.`,
  },
];

// Class schedule entries load from /class-schedule/index.csv (or index.json) at runtime (see Classes component).

function Home() {
  const prefersReducedMotion = useReducedMotion();
  const chips = [
    "Free Trial Class",
    "Sibling Discounts",
    "Celebrating 10-years!",
  ];

  return (
    <Shell>
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm mb-4"
            style={{
              borderColor: `${brand.purple}55`,
              backgroundColor: `${brand.purple}22`,
              color: brand.purpleSoft,
            }}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 2 }}
          >
            We’ve moved — 5501 Hwy 55 E, Lake Wylie (@ Imagine Church)
          </motion.p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Performing Arts Classes & Camps
          </h1>
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
            Acting • Singing • Dancing • Confidence Building. Your child’s journey starts here. Register today—spots are limited!
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((chip) => (
              <motion.span
                key={chip}
                className="rounded-full px-3 py-1 text-base border bg-neutral-900/60 sm:text-sm"
                style={{ borderColor: "#262626" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                {chip}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta href="https://app.jackrabbitclass.com/regv2.asp?id=548716">Register Now</Cta>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/classes"
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl px-6 font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900/50"
                style={{ borderColor: "#262626" }}
              >
                Explore Classes
              </Link>
            </motion.div>
          </div>
        <p className="mt-6 text-base text-neutral-300">
            Call <a href="tel:+17043138228" className="underline hover:text-neutral-200">(704) 313‑8228</a> or email {" "}
            <a href="mailto:actingupcarolina@gmail.com" className="underline hover:text-neutral-200">actingupcarolina@gmail.com</a>
          </p>

          {/* marquee */}
          <div className="mt-10 overflow-hidden rounded-xl border" style={{ borderColor: `${brand.purple}44` }}>
            <motion.div
              className="flex gap-10 whitespace-nowrap px-4 py-3 text-base"
              animate={{ x: prefersReducedMotion ? 0 : [0, -600] }}
              transition={{ repeat: prefersReducedMotion ? 0 : Infinity, duration: 18, ease: "linear" }}
            >
              {["Fall enrollment open now", "Scholarships available", "New Musical Theatre track", "Parent portal updates"]
                .map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: brand.yellow }} />
                    {t}
                  </span>
                ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: "#262626" }}>
            <img
              src="https://le-cdn.hibuwebsites.com/52be499460c147619cde1f2f840c663e/dms3rep/multi/opt/25-IMG_3628-a4c70f34-7b19341f-503w.jpg"
              alt="Students performing on stage"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Trust bar */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["Small classes", "Experienced teachers", "Performance showcases", "Welcoming community"].map((k) => (
          <motion.div
            key={k}
            className="flex items-center gap-3 rounded-xl bg-neutral-900/40 px-4 py-3 text-base text-neutral-200 cursor-default shadow-inner"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: brand.yellow }} />
            {k}
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

function Classes() {
  const items = [
    { title: "Acting / Improv", desc: "Develop stage presence, creativity, and quick thinking." },
    { title: "Musical Theatre", desc: "Sing, dance, and act in a supportive ensemble." },
    { title: "Show Choir", desc: "Hone vocal technique and performance skills." },
  ];
  const [schedule, setSchedule] = useState(
    Array.isArray(classScheduleFallback) ? classScheduleFallback : []
  );
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [scheduleError, setScheduleError] = useState(null);
  const [usingFallbackSchedule, setUsingFallbackSchedule] = useState(true);
  const scheduleCsvUrl = publicAsset("/class-schedule/index.csv");
  const scheduleJsonUrl = publicAsset("/class-schedule/index.json");

  useEffect(() => {
    let cancelled = false;
    async function loadSchedule() {
      if (!cancelled) {
        setScheduleLoading(true);
        setScheduleError(null);
      }
      const fallbackData = Array.isArray(classScheduleFallback) ? classScheduleFallback : [];
      const errorMessages = [];

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
        return { rows, errors: parsed.errors || [] };
      };

      try {
        const res = await fetch(scheduleCsvUrl, { cache: "no-cache" });
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const { rows, errors } = parseCsvText(text);
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
        const res = await fetch(scheduleJsonUrl, { cache: "no-cache" });
        if (!res.ok) throw new Error(`JSON HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected JSON schedule format");
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

  useEffect(() => {
    if (scheduleError) {
      console.warn("[Classes] schedule load warning:", scheduleError);
    }
  }, [scheduleError]);

  return (
    <Shell>
      <div className="flex items-end justify-between gap-6 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Classes</h2>
        <a href="https://app.jackrabbitclass.com/regv2.asp?id=548716" className="text-base underline hover:text-neutral-200">See schedule</a>
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
              <a href="https://app.jackrabbitclass.com/regv2.asp?id=548716" className="text-base font-medium hover:opacity-90"
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
                <tr key={row.title} className="align-top">
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
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-4 md:hidden">
          {schedule.map((row) => (
            <article
              key={`${row.title}-mobile`}
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
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Camps() {
  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">Camps</h2>
      <div className="mt-6 space-y-6 text-neutral-300 max-w-3xl">
        <div>
          <h3 className="text-xl font-semibold text-neutral-50">Register for Our Performing Arts Camps and Workshops TODAY!</h3>
          <p className="mt-2">
            Ignite your child's passion for the performing arts! Register for camps and join our amazing Acting Up family. Our experienced teachers will help your child learn and grow through the art of musical theatre, improv, acting, singing, and dancing.
          </p>
          <p className="mt-2">
            Our camps help students express themselves, gain confidence, and learn the art of communication.
          </p>
          <p className="mt-2 text-base text-neutral-300">
            *2026 Camp registration will open at the end of February 2026
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 p-5">
          <h4 className="text-lg font-semibold text-neutral-100">Payment Policy</h4>
          <p className="mt-2 text-base text-neutral-200">
            A non-refundable $50 deposit is charged at registration. This deposit holds your spot in camp and is applied toward your balance, which is due on the first day of each camp.
          </p>
        </div>

        <p>
          The 2025 Summer Camp season has officially come to an end. We're so proud of everything our campers accomplished and grateful for all the memories made this summer!
        </p>
        <p>
          Explore our exciting fall classes, join the fun, and take the stage with us! Visit the {" "}
          <Link to="/classes" className="underline hover:text-neutral-200">Classes page</Link> to learn more, or contact us via email or by phone.
        </p>
      </div>
      <div className="mt-8">
        <Cta href="https://app.jackrabbitclass.com/regv2.asp?id=548716">Register for Camps</Cta>
      </div>
    </Shell>
  );
}

function Calendar() {
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
          <p className="text-neutral-300 text-base">Embed your Google/Apple calendar here or list key dates as cards.</p>
        </div>
      </div>
    </Shell>
  );
}

function Gallery() {
  const { show: showParam } = useParams();
  const [shows, setShows] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const labelFor = (slug) => {
    const map = {
      "nemo": "Finding Nemo Jr.",
      "matilda": "Matilda Jr.",
      "secret-garden": "The Secret Garden",
    };
    if (!slug) return "";
    return map[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    let cancelled = false;
    async function loadIndex() {
      try {
        const res = await fetch(galleryAsset("/index.json"), { cache: "no-cache" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setShows(Array.isArray(data) ? data : []);
        } else if (!cancelled) {
          setShows([]);
        }
      } catch (err) {
        if (!cancelled) setShows([]);
      }
    }
    loadIndex();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeShow = showParam || (shows.length ? shows[0] : null);
  const photosPath = activeShow ? `/${activeShow}/photos.json` : null;
  const resolvedPhotosPath = photosPath ? galleryAsset(photosPath) : "";

  useEffect(() => {
    if (!resolvedPhotosPath) return;
    let cancelled = false;
    async function loadPhotos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(resolvedPhotosPath, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setImages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load photos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadPhotos();
    return () => {
      cancelled = true;
    };
  }, [resolvedPhotosPath]);

  const closeLightbox = React.useCallback(() => setLightboxIndex(null), []);
  const showNext = React.useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || !images.length) return prev;
      return (prev + 1) % images.length;
    });
  }, [images.length]);
  const showPrev = React.useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || !images.length) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const openLightbox = (index) => {
    if (index < 0 || index >= images.length) return;
    setLightboxIndex(index);
  };

  const activeLabel = activeShow ? labelFor(activeShow) : "Gallery";
  const featuredPhoto = images[0] || null;
  const featuredSrc = featuredPhoto ? galleryAsset(featuredPhoto.src || "") : "";
  const restPhotos = images.slice(1);
  const lightboxPhoto = lightboxIndex !== null ? images[lightboxIndex] : null;
  const lightboxSrc = lightboxPhoto ? galleryAsset(lightboxPhoto.src || "") : "";

  return (
    <Shell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
          <p className="mt-2 text-base text-neutral-300 max-w-xl">
            Browse highlights from recent productions. Tap a photo to open it full-screen and use your arrow keys to keep exploring.
          </p>
        </div>
        {images.length > 0 && (
          <span className="text-sm uppercase tracking-widest text-neutral-400">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </span>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-sm uppercase tracking-wide text-neutral-400">Productions</span>
            <h3 className="text-lg font-semibold text-neutral-100">{activeLabel}</h3>
          </div>
          <Link
            to="/classes"
            className="hidden sm:inline-flex items-center rounded-full border border-neutral-800 px-3 py-1 text-sm font-medium text-neutral-300 hover:text-white/90"
          >
            View programs
          </Link>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {shows.map((slug) => (
            <NavLink
              key={slug}
              to={`/gallery/${slug}`}
              className={({ isActive }) =>
                `group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-violet-500/60 bg-violet-500/10 text-white"
                    : "border-neutral-700/70 text-neutral-300 hover:border-neutral-500 hover:text-white"
                }`
              }
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-current opacity-60" aria-hidden="true" />
              {labelFor(slug)}
            </NavLink>
          ))}
          {!shows.length && (
            <span className="rounded-full border border-dashed border-neutral-700 px-4 py-2 text-base text-neutral-300">
              No shows found. Add `shows/index.json` to your gallery folder.
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {loading && <div className="text-base text-neutral-300">Loading photos…</div>}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-base text-red-100">
            Could not load <code>{resolvedPhotosPath || photosPath || "(unknown path)"}</code> ({error})
          </div>
        )}
        {!loading && !error && activeShow && (
          images.length ? (
            <>
              {featuredPhoto && featuredSrc && (
                <motion.figure
                  layout
                  className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-950/60 shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(0)}
                    className="group block h-full w-full text-left focus:outline-none"
                  >
                    <img
                      src={featuredSrc}
                      alt={featuredPhoto.alt || featuredPhoto.caption || `${activeLabel} highlight`}
                      loading="lazy"
                      className="h-[20rem] w-full object-cover sm:h-[28rem] transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                      <div>
                        <p className="text-sm uppercase tracking-widest text-white/70">Featured moment</p>
                        <p className="text-lg font-semibold text-white drop-shadow">
                          {featuredPhoto.caption || featuredPhoto.alt || activeLabel}
                        </p>
                      </div>
                      <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur">
                        View full-screen
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5 5h4a1 1 0 100-2H4a1 1 0 00-1 1v5a1 1 0 102 0V5zM11 17h5a1 1 0 001-1v-5a1 1 0 10-2 0v4h-4a1 1 0 100 2z" />
                        </svg>
                      </span>
                    </div>
                  </button>
                </motion.figure>
              )}

              {restPhotos.length > 0 && (
                <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
                  {restPhotos.map((photo, index) => {
                    const photoIndex = index + 1;
                    const rawSrc = photo?.src || "";
                    const resolvedSrc = galleryAsset(rawSrc);
                    if (!resolvedSrc) return null;
                    return (
                      <motion.figure
                        key={`${rawSrc}-${photoIndex}`}
                        layout
                        className="group relative overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950/60"
                        style={{ breakInside: "avoid" }}
                        whileHover={{ y: -2 }}
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(photoIndex)}
                          className="block w-full text-left focus:outline-none"
                          aria-label={`Open photo ${photoIndex + 1} from ${activeLabel}`}
                        >
                          <img
                            src={resolvedSrc}
                            alt={photo?.alt || photo?.caption || `${activeLabel} photo ${photoIndex + 1}`}
                            loading="lazy"
                            className="w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.02]"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                            <p className="text-sm uppercase tracking-wide text-white/70">Tap to enlarge</p>
                            {photo?.caption && (
                              <p className="mt-1 text-base font-medium text-white">
                                {photo.caption}
                              </p>
                            )}
                          </div>
                        </button>
                      </motion.figure>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-neutral-800/70 bg-neutral-950/60 px-4 py-6 text-base text-neutral-300">
              No photos posted yet for this show.
            </div>
          )
        )}
      </div>

      <AnimatePresence>
        {lightboxPhoto && lightboxSrc && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative mx-4 flex max-h-[90vh] w-full max-w-5xl items-center justify-center"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={lightboxSrc}
                alt={lightboxPhoto.alt || lightboxPhoto.caption || `${activeLabel} photo`}
                className="max-h-[90vh] w-auto rounded-3xl border border-neutral-800/80 bg-neutral-950 object-contain"
              />
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90"
                aria-label="Close photo"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    aria-label="Previous photo"
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    aria-label="Next photo"
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </>
              )}
              {(lightboxPhoto.caption || lightboxPhoto.alt) && (
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/70 px-4 py-3 text-base text-white backdrop-blur">
                  {lightboxPhoto.caption || lightboxPhoto.alt}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

function About() {
    console.log("About rendered", INSTRUCTORS.length);
  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">About Us</h2>
      <p className="mt-3 text-neutral-300 max-w-3xl">
        At Acting Up, we nurture self-confidence, strengthen communication skills, and inspire a lifelong love for the performing arts. Our experienced teachers guide students through acting, improv, musical theatre, and more.
      </p>

      <h3 className="mt-10 text-2xl font-bold tracking-tight">Our Instructors</h3>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSTRUCTORS.map((t) => (
          <motion.article key={t.name} whileHover={{ y: -3 }} className="rounded-2xl border bg-neutral-950 p-6" style={{ borderColor: `${brand.purple}33` }}>
            <div className="flex items-center gap-4">
              {t.img && (
                <img src={t.img} alt={t.name} className="h-16 w-16 rounded-lg object-cover border border-neutral-800" />
              )}
              <div>
                <h4 className="font-semibold leading-tight">{t.name}</h4>
                <p className="text-base text-neutral-300">{t.role}</p>
              </div>
            </div>
            <p className="mt-4 text-base text-neutral-200 leading-relaxed">{t.bio}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border bg-neutral-950 p-6" style={{ borderColor: `#262626` }}>
        <p className="text-base text-neutral-200">
          Interested in joining our team? Send your resume to{' '}
          <a className="underline" href="mailto:actingupcarolina@gmail.com" style={{ color: brand.yellow }}>actingupcarolina@gmail.com</a>.
        </p>
      </div>
    </Shell>
  );
}

function Contact() {
  return (
    <Shell>
      <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
      <div className="mt-4 grid sm:grid-cols-2 gap-6">
        <div>
          <p className="text-neutral-300">Call: <a href="tel:+17043138228" className="underline hover:text-neutral-200">(704) 313-8228</a></p>
          <p className="text-neutral-300">Email: <a href="mailto:actingupcarolina@gmail.com" className="underline hover:text-neutral-200">actingupcarolina@gmail.com</a></p>
          <p className="text-neutral-300">Address: 5501 Hwy 55 East, Lake Wylie, SC 29710 (Inside Imagine Church)</p>
        </div>
        <form className="space-y-3">
          <input className="w-full rounded-xl bg-neutral-900 border px-4 py-3" placeholder="Your name" style={{ borderColor: `#262626` }} />
          <input className="w-full rounded-xl bg-neutral-900 border px-4 py-3" placeholder="Email" type="email" style={{ borderColor: `#262626` }} />
          <textarea className="w-full rounded-xl bg-neutral-900 border px-4 py-3" placeholder="Message" rows={4} style={{ borderColor: `#262626` }} />
          <button type="button" className="rounded-xl px-5 py-3 font-semibold text-black" style={{ backgroundColor: brand.yellow }}>
            Send Inquiry
          </button>
        </form>
      </div>
    </Shell>
  );
}

function ScheduleHelper() {
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/camps" element={<Camps />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:show" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tools/schedule-helper" element={<ScheduleHelper />} />
        <Route
          path="*"
          element={
            <Shell>
              <div className="text-center">
                <h2 className="text-2xl font-bold">Page not found</h2>
                <p className="text-neutral-400 mt-2">Try one of the sections above.</p>
              </div>
            </Shell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
