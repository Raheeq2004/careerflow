import LandingButton from "./LandingButton";
import { navLinks } from "../data/navLinks";

import Logo from "../../../components/UI/Logo";

import { Link } from "react-router";

const linkClasses = "rounded-control px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-brand-soft hover:text-brand";

  function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
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

        <div className="flex items-center gap-3">
          <LandingButton to="/login" variant="outline">
            Login
          </LandingButton>
          <LandingButton to="/signup">Sign Up</LandingButton>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

//<header> is the semantic tag for the top of a page.--full width--
//<nav> is the semantic tag for navigation--limited width--
//span : small square icon
//<ul> and <li> are the correct HTML for a list of links.

/*On the first round, link is { label: "Home", href: "#home" }, 
so href={link.href} becomes href="#home", 
and {link.label} becomes the text Home.*/

//The 3 children of <nav>: logo , list , buttons

//key={link.label}: React needs a key in every .map.
//I added a to field in the nav data, and the Navbar picks Link or <a> from it, so page links use the router and section links scroll.