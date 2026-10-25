const base =
  "inline-flex min-h-11 items-center justify-center rounded-control px-5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60";

// variant word -> class string (lookup object, O(1))
const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-line bg-white text-ink hover:bg-page",
  danger:
    "border border-danger/30 bg-danger-soft text-red-700 hover:bg-danger/15",
};

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled,
  className = "",
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
