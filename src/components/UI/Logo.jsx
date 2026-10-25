import { Link } from "react-router";
import logoMark from "../../assets/logo-mark.svg";

const sizes = {
  sm: { mark: "size-6", text: "text-base" },
  md: { mark: "size-8", text: "text-xl" },
  lg: { mark: "size-12", text: "text-3xl" },
};

function Logo({ tone = "dark", href = "#home", to, size = "md" }) {
  const textColor = tone === "light" ? "text-white" : "text-navy";
  const { mark, text } = sizes[size];
  const classes = `flex items-center gap-2 font-heading font-extrabold ${text} ${textColor}`;

  const content = (
    <>
      <img src={logoMark} alt="" className={`${mark} shrink-0`} />
      CareerFlow
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

export default Logo;
