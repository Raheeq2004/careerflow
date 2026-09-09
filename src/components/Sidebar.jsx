import { NavLink } from "react-router";

function Sidebar() {
  return (
    <aside className="w-full md:w-[220px] bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">CareerFlow</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/app/dashboard"
          className="cursor-pointer hover:opacity-80"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/app/applications"
          className="cursor-pointer hover:opacity-80"
        >
          Applications
        </NavLink>
        <NavLink to="/app/profile" className="cursor-pointer hover:opacity-80">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
