function FloatingNotice({ title, detail, dotClass, className = "" }) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-control bg-white px-4 py-3 shadow-float ${className}`}
    >
      <span className={`size-8 shrink-0 rounded-full ${dotClass}`} />
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-xs text-muted">{detail}</p>
      </div>
    </div>
  );
}

export default FloatingNotice;
//It receives four props