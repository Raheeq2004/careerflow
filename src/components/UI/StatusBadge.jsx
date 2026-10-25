const statusStyles = {
  applied: { label: "Applied", pill: "bg-brand-soft", dot: "bg-brand" },
  screening: { label: "Screening", pill: "bg-warn-soft", dot: "bg-warn" },
  interview: { label: "Interview", pill: "bg-accent-soft", dot: "bg-accent" },
  offer: { label: "Offer", pill: "bg-success-soft", dot: "bg-success" },
  rejected: { label: "Rejected", pill: "bg-danger-soft", dot: "bg-danger" },
  withdrawn: { label: "Withdrawn", pill: "bg-line", dot: "bg-muted" },
};

function StatusBadge({ status }) {
  const style = statusStyles[status] ?? {
    label: status,
    pill: "bg-line",
    dot: "bg-muted",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold text-navy ${style.pill}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}

export default StatusBadge;
