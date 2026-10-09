import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export default function ChatBubble({ role, text, time }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-ink-900 text-white dark:bg-sand-100 dark:text-ink-900"
            : "bg-leaf-600 text-white"
        }`}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </span>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
          isUser
            ? "rounded-br-sm bg-ink-900 text-sand-50 dark:bg-sand-100 dark:text-ink-900"
            : "rounded-bl-sm bg-leaf-50 text-ink-900 dark:bg-ink-800 dark:text-sand-50"
        }`}
      >
        <p>{text}</p>
        {time && (
          <p className={`mt-1 text-[10px] opacity-50 ${isUser ? "text-right" : ""}`}>{time}</p>
        )}
      </div>
    </motion.div>
  );
}
