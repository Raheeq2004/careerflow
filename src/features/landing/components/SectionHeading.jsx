function SectionHeading({ eyebrow, title, description, align = "center" }) {
      const alignment = align === "left" ? "text-start" : "mx-auto text-center";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-h2 font-bold text-navy">{title}</h2>
      <p className="mt-3 text-muted">{description}</p>
    </div>
  );
}

export default SectionHeading;
