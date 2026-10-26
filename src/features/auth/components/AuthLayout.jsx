import { useTranslation } from "react-i18next";
import Logo from "../../../components/UI/Logo";
import AuthSidePanel from "./AuthSidePanel";
import LanguageSwitcher from "../../../components/UI/LanguageSwitcher";

function AuthLayout({ children, title, description, bannerTitle, bannerText }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen font-sans text-ink lg:grid lg:grid-cols-2">
      <AuthSidePanel
        title={title ?? t("auth.layout.title")}
        description={description ?? t("auth.layout.description")}
      />

      <main className="flex items-center justify-center bg-white px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="mb-8 lg:hidden">
            <Logo to="/" />
            <div className="mt-4 rounded-card bg-brand-gradient px-4 py-3 text-white">
              <p className="text-sm font-semibold">
                {bannerTitle ?? t("auth.layout.bannerTitle")}
              </p>
              <p className="text-xs text-white/80">
                {bannerText ?? t("auth.layout.bannerText")}
              </p>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
