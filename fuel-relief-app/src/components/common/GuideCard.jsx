import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function GuideCard({ name, example, dateLocation, onOpen, index = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="focus-ring group flex h-full flex-col gap-3 rounded-xl2 border border-ink-900/10 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-sand-100/10 dark:bg-ink-900"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-100 text-leaf-700 dark:bg-leaf-700/30 dark:text-leaf-200">
        <MapPin className="h-4 w-4" />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-ink-900 dark:text-sand-50">{name}</h3>
        <p className="mt-1 text-xs font-mono text-ink-900/60 dark:text-sand-100/60">{example}</p>
        <p className="mt-2 text-sm text-ink-900/70 dark:text-sand-100/70">{dateLocation}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-sm font-medium text-leaf-700 dark:text-leaf-300">
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  );
}
