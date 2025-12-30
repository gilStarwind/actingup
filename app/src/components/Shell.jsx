import { brand } from "../utils/helpers";
import GlowOrbs from "./GlowOrbs";
import Header from "./Header";
import Stripe from "./Stripe";
import Footer from "./Footer";

export default function Shell({ children }) {
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
