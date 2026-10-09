import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, CircleHelp } from "lucide-react";

const TONE_STYLES = {
  success: {
    icon: CheckCircle2,
    wrap: "border-leaf-300 bg-leaf-50 text-leaf-800 dark:border-leaf-600/40 dark:bg-leaf-700/20 dark:text-leaf-50",
    iconWrap: "bg-leaf-600 text-white",
  },
  warning: {
    icon: AlertTriangle,
    wrap: "border-clay-100 bg-clay-100/60 text-clay-600 dark:border-clay-500/30 dark:bg-clay-500/10 dark:text-clay-100",
    iconWrap: "bg-clay-500 text-white",
  },
  info: {
    icon: CircleHelp,
    wrap: "border-amber-100 bg-amber-100/60 text-amber-500 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100",
    iconWrap: "bg-amber-500 text-white",
  },
};

export default function ResultCard({ tone = "info", title, children }) {
  const { icon: Icon, wrap, iconWrap } = TONE_STYLES[tone] || TONE_STYLES.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      className={`rounded-xl2 border p-5 ${wrap}`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconWrap}`}>
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <div className="mt-1.5 text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
