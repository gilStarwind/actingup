import { brand } from "../utils/helpers";
import Shell from "../components/Shell";

export default function Contact() {
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
