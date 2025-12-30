import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";
import { brand } from "../utils/helpers";

export default function Header() {
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
          {navItem("Cast", "/cast")}
          {navItem("About", "/about")}
          {navItem("Contact", "/contact")}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://app.jackrabbitclass.com/regv2.asp?id=519476"
            rel="noopener noreferrer"
            className="rounded-2xl px-4 py-2 text-sm font-semibold text-black"
            style={{ backgroundColor: brand.yellow }}
          >
            Register
          </a>
          <a
            href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=519476"
            rel="noopener noreferrer"
            className="rounded-2xl px-4 py-2 text-sm font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900"
            target="_blank"
          >
            Parent Login
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
            <NavLink to="/cast" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Cast</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-base bg-neutral-900/70 border border-neutral-800">Contact</NavLink>
          </div>
          <div className="flex gap-2 pt-2">
            <a href="https://app.jackrabbitclass.com/regv2.asp?id=519476" className="flex-1 rounded-xl px-4 py-2 text-base font-semibold text-black" style={{ backgroundColor: brand.yellow }}>Register</a>
            <a
              href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=519476"
              className="flex-1 rounded-xl px-4 py-2 text-base font-semibold border border-neutral-700 text-neutral-100 hover:bg-neutral-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Parent Login
            </a>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}
