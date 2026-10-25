import { NavLink } from "react-router";
import Logo from "./Logo";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Applications", to: "/app/applications" },
];

function linkClasses({ isActive }) {
  return `rounded-control px-3 py-2 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
    isActive
      ? "bg-brand-soft text-brand"
      : "text-muted hover:bg-page hover:text-ink"
  }`;
}

function Sidebar() {
  return (
    <aside className="w-full border-b border-line bg-white p-4 md:w-[220px] md:border-b-0 md:border-r">
      <div className="mb-6">
        <Logo to="/app/dashboard" />
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClasses}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
