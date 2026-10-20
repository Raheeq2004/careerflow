function Logo({ tone = "dark", href = "#home" }) {
  const textColor = tone === "light" ? "text-white" : "text-navy";

  return (
    <a
      href={href}
      className={`flex items-center gap-2 font-heading text-xl font-extrabold ${textColor}`}
    >
      <span className="grid size-8 place-items-center rounded-control bg-brand-gradient text-sm text-white">
        C
      </span>
      CareerFlow
    </a>
  );
}

export default Logo;
