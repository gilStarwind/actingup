import { motion } from "framer-motion";
import { brand } from "../utils/helpers";

export default function GlowOrbs() {
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
