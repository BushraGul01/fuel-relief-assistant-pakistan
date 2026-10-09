import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { HelpCircle, Trash2 } from "lucide-react";
import PageHeader from "../components/common/PageHeader.jsx";
import InputField from "../components/common/InputField.jsx";
import ResultCard from "../components/common/ResultCard.jsx";
import { PROVINCES } from "../data/provinces.js";
import { VEHICLE_TYPES, evaluateEligibility } from "../data/eligibilityRules.js";
import { useHistoryList } from "../hooks/useHistoryList.js";
import { STORAGE_KEYS } from "../utils/storage.js";

const schema = z.object({
  vehicleType: z.string().min(1),
  engineCapacity: z.coerce.number().min(1).max(10000),
  province: z.string().min(1),
});

const OUTCOME_TONE = { eligible: "success", notEligible: "warning", undetermined: "info" };

export default function Eligibility() {
  const { t } = useTranslation();
  const { items: history, addItem, clear } = useHistoryList(
    STORAGE_KEYS.ELIGIBILITY_HISTORY,
    { limit: 8 }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const latest = history[0];

  const onSubmit = (data) => {
    const outcome = evaluateEligibility({
      vehicleType: data.vehicleType,
      engineCapacityCc: data.engineCapacity,
      province: data.province,
    });
    const provinceLabel = t(PROVINCES.find((p) => p.id === data.province)?.nameKey || "");
    addItem({
      vehicleType: t(`eligibility.vehicleTypes.${data.vehicleType}`),
      engineCapacity: data.engineCapacity,
      province: provinceLabel,
      result: outcome,
    });
  };

  const provinceOptions = [
    { value: "", label: t("validator.selectProvince") },
    ...PROVINCES.map((p) => ({ value: p.id, label: t(p.nameKey) })),
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader
        icon={HelpCircle}
        title={t("eligibility.pageTitle")}
        subtitle={t("eligibility.pageSubtitle")}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5 rounded-xl2 border border-ink-900/10 bg-white p-6 shadow-soft dark:border-sand-100/10 dark:bg-ink-900"
      >
        <InputField
          label={t("eligibility.labelVehicleType")}
          name="vehicleType"
          type="select"
          options={[{ value: "", label: t("eligibility.labelVehicleType") }, ...VEHICLE_TYPES.map((v) => ({ value: v.id, label: t(v.labelKey) }))]}
          registration={register("vehicleType")}
          error={errors.vehicleType && t("validator.errors.provinceRequired")}
        />
        <InputField
          label={t("eligibility.labelEngineCapacity")}
          name="engineCapacity"
          type="number"
          placeholder={t("eligibility.placeholderEngineCapacity")}
          registration={register("engineCapacity")}
          error={errors.engineCapacity && t("validator.errors.regNumberRequired")}
        />
        <InputField
          label={t("eligibility.labelProvince")}
          name="province"
          type="select"
          options={provinceOptions}
          registration={register("province")}
          error={errors.province && t("validator.errors.provinceRequired")}
        />
        <button
          type="submit"
          className="focus-ring w-full rounded-xl bg-clay-500 py-3 text-base font-semibold text-white transition hover:bg-clay-600"
        >
          {t("eligibility.submit")}
        </button>
      </form>

      {latest && (
        <div className="mt-6">
          <ResultCard tone={OUTCOME_TONE[latest.result]} title={t(`eligibility.outcomes.${latest.result}`)}>
            <p>{t(`eligibility.outcomeBody.${latest.result}`, { province: latest.province })}</p>
            <p className="mt-2 text-xs italic opacity-70">{t("eligibility.disclaimer")}</p>
          </ResultCard>
        </div>
      )}

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-sand-50">
            {t("eligibility.recentTitle")}
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
          <p className="text-sm text-ink-900/50 dark:text-sand-100/50">{t("eligibility.recentEmpty")}</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h) => (
              <li
                key={h.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-sand-100/10 dark:bg-ink-900"
              >
                <span className="font-medium text-ink-900 dark:text-sand-50">
                  {h.vehicleType} · {h.engineCapacity}cc
                </span>
                <span className="text-ink-900/60 dark:text-sand-100/60">{h.province}</span>
                <span className="text-xs font-semibold text-leaf-700 dark:text-leaf-300">
                  {t(`eligibility.outcomes.${h.result}`)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
