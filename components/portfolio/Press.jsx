import { motion } from "framer-motion";

const clips = {
  bottom: ["inset(0 0 100% 0 round 1.5rem)", "inset(0 0 0% 0 round 1.5rem)"],
  left: ["inset(0 100% 0 0 round 1.5rem)", "inset(0 0% 0 0 round 1.5rem)"],
};

export default function Press({ children, className = "", delay = 0, from = "bottom" }) {
  const [start, end] = clips[from] || clips.bottom;

  return (
    <div className={`hover-zoom ${className}`}>
      <motion.div
        className="h-full"
        initial={{ clipPath: start }}
        whileInView={{ clipPath: end }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
