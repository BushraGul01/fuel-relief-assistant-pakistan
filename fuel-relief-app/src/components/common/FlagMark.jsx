import { Sparkles } from "lucide-react";

export default function FlagMark({ size = "md" }) {
  const styles = {
    // footer version (original)
    sm: "h-8 w-8 rounded-lg bg-white/10 text-white",
    // navbar version (original)
    md: "h-9 w-9 rounded-xl bg-leaf-600 text-white",
    lg: "h-14 w-14 rounded-2xl bg-leaf-600 text-white",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  };

  return (
    <span
      className={`flex shrink-0 items-center justify-center ${styles[size]}`}
    >
      <Sparkles className={iconSizes[size]} />
    </span>
  );
}