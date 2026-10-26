import { Link } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

function LoginPage() {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t("auth.loginPage.heroTitle")}
      description={t("auth.loginPage.heroText")}
      bannerTitle={t("auth.loginPage.bannerTitle")}
      bannerText={t("auth.loginPage.bannerText")}
    >
      <h1 className="font-heading text-h3 font-bold text-navy">
        {t("auth.loginPage.heading")}
      </h1>
      <p className="mt-2 text-sm text-muted">{t("auth.loginPage.subtitle")}</p>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <Trans
          i18nKey="auth.loginPage.newHere"
          components={{
            signup: (
              <Link
                to="/signup"
                className="font-semibold text-brand hover:underline"
              />
            ),
          }}
        />
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
