import { NavLink } from "react-router";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";

const navItems = [
  { labelKey: "nav.dashboard", to: "/app/dashboard" },
  { labelKey: "nav.applications", to: "/app/applications" },
];

function linkClasses({ isActive }) {
  return `rounded-control px-3 py-2 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
    isActive
      ? "bg-brand-soft text-brand"
      : "text-muted hover:bg-page hover:text-ink"
  }`;
}

function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="w-full border-b border-line bg-white p-4 md:w-[220px] md:border-b-0 md:border-e">
      <div className="mb-6">
        <Logo to="/app/dashboard" />
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClasses}>
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
