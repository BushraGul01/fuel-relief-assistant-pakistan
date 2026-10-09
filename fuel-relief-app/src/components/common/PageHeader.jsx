import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, subtitle, icon: Icon }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-6 text-center sm:pt-14">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium text-leaf-700 dark:text-leaf-300">{eyebrow}</p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="font-display text-3xl font-semibold text-ink-900 dark:text-sand-50 sm:text-4xl"
      >
        {Icon && <Icon className="mb-2 mx-auto h-8 w-8 text-leaf-600 dark:text-leaf-300" />}
        {title}
      </motion.h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-base text-ink-900/70 dark:text-sand-100/70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
