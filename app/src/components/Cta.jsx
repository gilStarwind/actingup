import { motion } from "framer-motion";
import { brand } from "../utils/helpers";

// Shared CTA Button with pulse on mount
export default function Cta({ href, children }) {
  return (
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
}
