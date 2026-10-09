import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bot, Mic, Send, Trash2, Volume2 } from "lucide-react";
import ChatBubble from "../components/common/ChatBubble.jsx";
import { useHistoryList } from "../hooks/useHistoryList.js";
import { STORAGE_KEYS } from "../utils/storage.js";

function pickAnswer(t, question) {
  const questions = t("assistant.quickQuestions", { returnObjects: true });
  const answers = t("assistant.quickAnswers", { returnObjects: true });
  const idx = questions.findIndex(
    (q) => q.trim().toLowerCase() === question.trim().toLowerCase()
  );
  if (idx !== -1) return answers[idx];

  // Lightweight keyword match so free-typed questions close to a quick
  // question still get a grounded answer instead of always falling back.
  const lower = question.toLowerCase();
  const keywordHits = [
    { words: ["phone", "mobile", "موبائل", "فون", "ګرځنده"], idx: 2 },
    { words: ["official", "government", "سرکار", "حکومت"], idx: 3 },
    { words: ["ready", "keep", "تیار", "معلومات"], idx: 1 },
    { words: ["help", "مدد", "کیا کر"], idx: 0 },
  ];
  for (const { words, idx: i } of keywordHits) {
    if (words.some((w) => lower.includes(w.toLowerCase()))) return answers[i];
  }
  return t("assistant.fallbackAnswer");
}

export default function Assistant() {
  const { t } = useTranslation();
  const { items, addItem, clear } = useHistoryList(STORAGE_KEYS.CHAT_HISTORY, {
    limit: 100,
  });
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);

  const quickQuestions = t("assistant.quickQuestions", { returnObjects: true });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [items.length]);

  const ask = (question) => {
    const q = question.trim();
    if (!q) return;
    const answer = pickAnswer(t, q);
    addItem({ question: q, answer });
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  const handleSpeak = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      ask(input || "");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = document.documentElement.lang || "en";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const handleListen = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.documentElement.lang || "en";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // oldest-first for natural reading order (history list itself is newest-first)
  const chronological = [...items].reverse();

  return (
    <div className="mx-auto flex h-[calc(100vh-7.5rem)] max-w-2xl flex-col px-4 pb-4 pt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-600 text-white">
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold text-ink-900 dark:text-sand-50">
              {t("assistant.pageTitle")}
            </h1>
            <p className="text-xs text-ink-900/50 dark:text-sand-100/50">
              {t("assistant.selectedNote")}
            </p>
          </div>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="focus-ring flex items-center gap-1 rounded-md text-xs font-medium text-clay-600 hover:underline dark:text-clay-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("assistant.clearChat")}
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="chat-scroll flex-1 space-y-4 overflow-y-auto rounded-xl2 border border-ink-900/10 bg-sand-100/60 p-4 dark:border-sand-100/10 dark:bg-ink-900/60"
      >
        <ChatBubble role="assistant" text={t("assistant.greeting")} />
        <ChatBubble role="assistant" text={t("assistant.firstQuestionPrompt")} />

        {items.length === 0 ? (
          <p className="pt-4 text-center text-sm text-ink-900/40 dark:text-sand-100/40">
            {t("assistant.emptyState")}
          </p>
        ) : (
          chronological.map((m) => (
            <div key={m.id} className="space-y-2">
              <ChatBubble role="user" text={m.question} />
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <ChatBubble role="assistant" text={m.answer} />
                </div>
                <button
                  type="button"
                  onClick={() => handleListen(m.answer)}
                  aria-label={t("assistant.listen")}
                  className="focus-ring mt-1 rounded-full p-1.5 text-ink-900/40 hover:bg-white hover:text-leaf-700 dark:text-sand-100/40 dark:hover:bg-white/10"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q)}
            className="focus-ring rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-900/70 hover:border-leaf-400 hover:text-leaf-700 dark:border-sand-100/15 dark:bg-ink-900 dark:text-sand-100/70"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("assistant.placeholder")}
          className="focus-ring flex-1 rounded-full border border-ink-900/15 bg-white px-4 py-3 text-sm dark:border-sand-100/15 dark:bg-ink-900 dark:text-sand-50"
        />
        <button
          type="button"
          onClick={handleSpeak}
          aria-pressed={listening}
          aria-label={t("assistant.speak")}
          className={`focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
            listening
              ? "border-clay-500 bg-clay-100 text-clay-600"
              : "border-ink-900/15 bg-white text-ink-900/70 dark:border-sand-100/15 dark:bg-ink-900 dark:text-sand-100/70"
          }`}
        >
          <Mic className="h-4 w-4" />
        </button>
        <button
          type="submit"
          aria-label={t("common.send")}
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-white hover:bg-leaf-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-ink-900/40 dark:text-sand-100/40">
        {t("assistant.disclaimer")}
      </p>
    </div>
  );
}
