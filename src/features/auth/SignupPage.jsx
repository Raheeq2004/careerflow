import { Link } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import AuthLayout from "./components/AuthLayout";
import SignupForm from "./components/SignupForm";

function SignupPage() {
  const { t } = useTranslation();

  return (
    <AuthLayout>
      <h1 className="font-heading text-h3 font-bold text-navy">
        {t("auth.signupPage.heading")}
      </h1>
      <p className="mt-2 text-sm text-muted">{t("auth.signupPage.subtitle")}</p>

      <div className="mt-8">
        <SignupForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <Trans
          i18nKey="auth.signupPage.haveAccount"
          components={{
            login: (
              <Link
                to="/login"
                className="font-semibold text-brand hover:underline"
              />
            ),
          }}
        />
      </p>
    </AuthLayout>
  );
}

export default SignupPage;

/*It reads the sentence from the dictionary.
It finds <signup>…</signup>, and wraps the text inside it with the element we gave: our Link with its classes and to. */