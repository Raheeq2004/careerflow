const dotColors = {
  neutral: "bg-muted",
  brand: "bg-brand",
  accent: "bg-accent",
  success: "bg-success",
  danger: "bg-danger",
};

function StatCard({ number, label, tone = "neutral" }) {
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card">
      <div className="flex items-center gap-2 text-sm text-muted">
        <span className={`size-2 rounded-full ${dotColors[tone]}`} />
        {label}
      </div>
      <div className="mt-2 font-heading text-3xl font-extrabold text-navy">
        {number}
      </div>
    </div>
  );
}

export default StatCard;
