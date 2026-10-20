import { Link } from "react-router";

const base =
  "inline-flex items-center justify-center rounded-control px-5 py-2.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
//the class with fixed style , never changes

const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-line bg-white text-ink hover:bg-page",
};//add third look here later , when needed

function LandingButton({
  children, //create free acount , ex
  to, //sign up
  href, //<a href="#how-it-works">
  variant = "primary",
  type = "button",
  className = "",
  ...rest
}) {
 const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      //sign up , then broweser catches <a href="/signup"> , finally app.jsx change the route
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    //for the sections ,  after the click , the browser finds the element with id
    //in the navlinks file , the id is there 
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default LandingButton;


// example : <LandingButton type="submit">Send message</LandingButton>
