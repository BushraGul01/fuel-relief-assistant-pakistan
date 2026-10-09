import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Info, MessageCircleQuestion } from "lucide-react";
import PageHeader from "../components/common/PageHeader.jsx";
import InputField from "../components/common/InputField.jsx";
import ResultCard from "../components/common/ResultCard.jsx";
import { REJECTION_REASONS } from "../data/rejectionReasons.js";

export default function RejectionHelp() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("");

  const reason = REJECTION_REASONS.find((r) => r.code === selected);

  const options = [
    { value: "", label: t("rejection.selectPlaceholder") },
    ...REJECTION_REASONS.map((r) => ({ value: r.code, label: t(`${r.key}.title`) })),
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader
        icon={Info}
        title={t("rejection.pageTitle")}
        subtitle={t("rejection.pageSubtitle")}
      />

      <div className="rounded-xl2 border border-ink-900/10 bg-white p-6 shadow-soft dark:border-sand-100/10 dark:bg-ink-900">
        <InputField
          label={t("rejection.selectLabel")}
          name="reason"
          type="select"
          options={options}
          registration={{
            value: selected,
            onChange: (e) => setSelected(e.target.value),
          }}
        />
      </div>

      {reason && (
        <div className="mt-6 space-y-4">
          <ResultCard tone="warning" title={t(`${reason.key}.title`)}>
            <p className="font-semibold">{t("rejection.causeLabel")}</p>
            <p>{t(`${reason.key}.cause`)}</p>
          </ResultCard>
          <ResultCard tone="info" title={t("rejection.explanationLabel")}>
            {t(`${reason.key}.explanation`)}
          </ResultCard>
          <ResultCard tone="success" title={t("rejection.resolutionLabel")}>
            {t(`${reason.key}.resolution`)}
          </ResultCard>
        </div>
      )}

      <p className="mt-8 flex items-start gap-2 rounded-xl bg-sand-100 p-4 text-sm text-ink-900/70 dark:bg-ink-900 dark:text-sand-100/70">
        <MessageCircleQuestion className="h-4 w-4 shrink-0 translate-y-0.5" />
        {t("rejection.recentNote")}
      </p>
    </div>
  );
}
