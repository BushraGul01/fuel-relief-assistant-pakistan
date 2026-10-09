import { forwardRef } from "react";

/**
 * Shared form field. Works for type="text" | "date" | "select".
 * Pass `register` from react-hook-form's useForm().register(name, ...).
 */
const InputField = forwardRef(function InputField(
  { label, name, type = "text", error, options, placeholder, registration, className = "" },
  _ref
) {
  const baseClasses =
    "focus-ring w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-900/40 dark:bg-ink-900 dark:text-sand-50 dark:placeholder:text-sand-100/30";
  const borderClasses = error
    ? "border-clay-500"
    : "border-ink-900/15 dark:border-sand-100/15";

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-sand-100">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          {...registration}
          className={`${baseClasses} ${borderClasses}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`${baseClasses} ${borderClasses}`}
        />
      )}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-clay-600 dark:text-clay-100">
          {error}
        </p>
      )}
    </div>
  );
});

export default InputField;
