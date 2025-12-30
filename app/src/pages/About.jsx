import { motion } from "framer-motion";
import { brand } from "../utils/helpers";
import { INSTRUCTORS } from "../data/instructors";
import Shell from "../components/Shell";

export default function About() {
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
