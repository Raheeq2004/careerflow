import { Link } from "react-router";

const linkClasses = "text-sm text-white/70 transition-colors hover:text-white";

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>

      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className={linkClasses}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={linkClasses}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;
