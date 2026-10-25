import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const itemClasses =
  "flex min-h-11 w-full items-center gap-2.5 rounded-control px-3 text-left text-sm font-medium hover:bg-page focus-visible:outline-2 focus-visible:outline-brand";

function Icon({ children, className = "" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

function ProfileMenu({ name }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const initial = name ? name.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function handleLogout() {
    // Demo only: there is no real session yet, so we just go to the login page.
    setOpen(false);
    navigate("/login");
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex min-h-11 items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 hover:bg-page focus-visible:outline-2 focus-visible:outline-brand"
      >
        <span className="grid size-9 place-items-center rounded-full bg-brand text-[15px] font-semibold text-white">
          {initial}
        </span>
        <Icon className="size-4 text-muted">
          <path d="M6 9l6 6 6-6" />
        </Icon>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-56 rounded-card border border-line bg-white p-1.5 shadow-float"
        >
          <Link
            to="/app/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className={`${itemClasses} text-ink`}
          >
            <Icon className="text-muted">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </Icon>
            Profile
          </Link>

          <div className="mx-1.5 my-1 h-px bg-line" />

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className={`${itemClasses} text-danger`}
          >
            <Icon>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </Icon>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
