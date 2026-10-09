import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Trash2 } from "lucide-react";
import PageHeader from "../components/common/PageHeader.jsx";
import InputField from "../components/common/InputField.jsx";
import ResultCard from "../components/common/ResultCard.jsx";
import { PROVINCES, getProvince } from "../data/provinces.js";
import { useHistoryList } from "../hooks/useHistoryList.js";
import { STORAGE_KEYS } from "../utils/storage.js";

export default function Validator() {
  const { t } = useTranslation();
  const { items: history, addItem, clear } = useHistoryList(
    STORAGE_KEYS.VALIDATION_HISTORY,
    { limit: 8 }
  );

  const schema = useMemo(
    () =>
      z
        .object({
          registrationNumber: z.string().min(1, t("validator.errors.regNumberRequired")),
          registrationDate: z.string().min(1, t("validator.errors.regDateRequired")),
          province: z.string().min(1, t("validator.errors.provinceRequired")),
        })
        .superRefine((data, ctx) => {
          if (data.province) {
            const province = getProvince(data.province);
            if (province && data.registrationNumber && !province.pattern.test(data.registrationNumber.trim().toUpperCase())) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["registrationNumber"],
                message: t("validator.errors.regNumberFormat", {
                  province: t(province.nameKey),
                  example: province.example,
                }),
              });
            }
          }
          if (data.registrationDate) {
            const entered = new Date(data.registrationDate);
            if (entered > new Date()) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["registrationDate"],
                message: t("validator.errors.regDateFuture"),
              });
            }
          }
        }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  const onSubmit = (data) => {
    const province = getProvince(data.province);
    addItem({
      registrationNumber: data.registrationNumber.trim().toUpperCase(),
      province: province ? t(province.nameKey) : data.province,
      date: data.registrationDate,
    });
    reset(data);
  };

  const provinceOptions = [
    { value: "", label: t("validator.selectProvince") },
    ...PROVINCES.map((p) => ({ value: p.id, label: t(p.nameKey) })),
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader
        icon={ShieldCheck}
        title={t("validator.pageTitle")}
        subtitle={t("validator.pageSubtitle")}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5 rounded-xl2 border border-ink-900/10 bg-white p-6 shadow-soft dark:border-sand-100/10 dark:bg-ink-900"
      >
        <InputField
          label={t("validator.labelRegNumber")}
          name="registrationNumber"
          placeholder={t("validator.placeholderRegNumber")}
          registration={register("registrationNumber")}
          error={errors.registrationNumber?.message}
        />
        <InputField
          label={t("validator.labelRegDate")}
          name="registrationDate"
          type="date"
          registration={register("registrationDate")}
          error={errors.registrationDate?.message}
        />
        <InputField
          label={t("validator.labelProvince")}
          name="province"
          type="select"
          options={provinceOptions}
          registration={register("province")}
          error={errors.province?.message}
        />
        <button
          type="submit"
          className="focus-ring w-full rounded-xl bg-leaf-600 py-3 text-base font-semibold text-white transition hover:bg-leaf-700"
        >
          {t("validator.submit")}
        </button>
      </form>

      {isSubmitSuccessful && Object.keys(errors).length === 0 && history[0] && (
        <div className="mt-6">
          <ResultCard tone="success" title={t("validator.successTitle")}>
            {t("validator.successBody", { province: history[0].province })}
          </ResultCard>
        </div>
      )}

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-sand-50">
            {t("validator.recentTitle")}
          </h2>
          {history.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="focus-ring flex items-center gap-1 rounded-md text-sm font-medium text-clay-600 hover:underline dark:text-clay-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t("validator.clearHistory")}
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-ink-900/50 dark:text-sand-100/50">{t("validator.recentEmpty")}</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h) => (
              <li
                key={h.id}
                className="flex items-center justify-between rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-sand-100/10 dark:bg-ink-900"
              >
                <span className="font-mono font-medium text-ink-900 dark:text-sand-50">
                  {h.registrationNumber}
                </span>
                <span className="text-ink-900/60 dark:text-sand-100/60">{h.province}</span>
                <span className="text-ink-900/40 dark:text-sand-100/40">{h.date}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
