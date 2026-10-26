import { useTranslation } from "react-i18next";
//Change the lookup so it holds a key, not the English word

const statusStyles = {
  applied:   { labelKey: "status.applied",   pill: "bg-brand-soft",   dot: "bg-brand" },
  screening: { labelKey: "status.screening", pill: "bg-warn-soft",    dot: "bg-warn" },
  interview: { labelKey: "status.interview", pill: "bg-accent-soft",  dot: "bg-accent" },
  offer:     { labelKey: "status.offer",     pill: "bg-success-soft", dot: "bg-success" },
  rejected:  { labelKey: "status.rejected",  pill: "bg-danger-soft",  dot: "bg-danger" },
  withdrawn: { labelKey: "status.withdrawn", pill: "bg-line",         dot: "bg-muted" },
};

function StatusBadge({ status }) {
  const { t } = useTranslation();
  const style = statusStyles[status] ?? {
    labelKey: null,
    pill: "bg-line",
    dot: "bg-muted",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold text-navy ${style.pill}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      {style.labelKey ? t(style.labelKey) : status}
    </span>
  );
}

export default StatusBadge;
