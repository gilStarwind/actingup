import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "../utils/helpers";
import Shell from "../components/Shell";
import Cta from "../components/Cta";

export default function Home() {
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
            className="mx-auto mb-4 w-full max-w-xl rounded-full border px-4 py-2 text-center text-sm leading-snug md:inline-flex md:w-auto md:items-center md:justify-center md:gap-2"
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
            <Cta href="https://app.jackrabbitclass.com/regv2.asp?id=519476">Register Now</Cta>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/classes"
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl px-6 font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900/50"
                style={{ borderColor: "#262626" }}
              >
                Explore Classes
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <a
                href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=519476"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl px-6 font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900/50"
                style={{ borderColor: "#262626" }}
              >
                Parent Login
              </a>
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
