import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CalendarDays, HelpCircle, Info, ShieldCheck } from "lucide-react";

const ICONS = { ShieldCheck, HelpCircle, Info, CalendarDays, Bot };

const TONES = {
  leaf: "bg-leaf-100 text-leaf-800 dark:bg-leaf-700/30 dark:text-leaf-100",
  clay: "bg-clay-100 text-clay-600 dark:bg-clay-500/20 dark:text-clay-100",
  amber: "bg-amber-100 text-amber-500 dark:bg-amber-500/20 dark:text-amber-100",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-100",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-100",
};

export default function HelpCard({ icon, tone = "leaf", title, description, to, index = 0 }) {
  const Icon = ICONS[icon] || Info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        to={to}
        className={`focus-ring group flex h-full flex-col justify-between gap-6 rounded-xl2 border border-ink-900/8 p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-sand-100/10 ${TONES[tone]}`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 dark:bg-black/20">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug">{title}</h3>
          <p className="mt-1 text-sm opacity-80">{description}</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium opacity-80 transition group-hover:gap-2">
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  );
}
