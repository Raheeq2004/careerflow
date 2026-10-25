import { useProfile } from "../../context/ProfileContext";
import ProfileMenu from "./ProfileMenu";

function Header() {
  const { profile } = useProfile();

  // ASSUMPTION: the profile's name field is called "fullName".
  // If yours has another name (for example "name"), change it on this line only.
  const name = profile?.fullName?.trim() ?? "";
  const firstName = name.split(" ")[0];

  return (
    <header className="relative z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-4 py-3 md:px-6">
      <h1 className="font-heading text-lg font-bold text-navy md:text-xl">
        {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
      </h1>
      <ProfileMenu name={name} />
    </header>
  );
}

export default Header;
