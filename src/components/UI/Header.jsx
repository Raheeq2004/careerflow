import { useProfile } from "../../context/ProfileContext";//for the data from the provider
import ProfileMenu from "./ProfileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation(); 
  const { profile } = useProfile();

  const name = profile?.fullName?.trim() ?? "";
  const firstName = name.split(" ")[0];

  return (
    <header className="relative z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-4 py-3 md:px-6">
      <h1 className="font-heading text-lg font-bold text-navy md:text-xl">
        {firstName
          ? t("header.welcomeBackName", { name: firstName })
          : t("header.welcomeBack")}
      </h1>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ProfileMenu name={name} />
      </div>
    </header>
  );
}

export default Header;
