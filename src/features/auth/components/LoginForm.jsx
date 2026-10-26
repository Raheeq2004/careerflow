import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import FormField from "../../../components/UI/FormField";
import PasswordField from "../../../components/UI/PasswordField";
import LandingButton from "../../landing/components/LandingButton";
import { loginSchema } from "../data/loginSchema";

import { useTranslation } from "react-i18next";

function LoginForm() {
  const { t } = useTranslation();

  const navigate = useNavigate();
const [showNotice, setShowNotice] = useState(false);

  const {
    register,
    handleSubmit, //runs the Zod rules.
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  function onSubmit() {
    // Demo behaviour , We only go to the dashboard.
    navigate("/app/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField
        label={t("auth.email")}
        id="login-email"
        type="email"
        placeholder={t("auth.emailPlaceholder")}
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordField
        label={t("auth.password")}
        id="login-password"
        placeholder={t("auth.passwordPlaceholder")}
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="size-4 accent-brand"
            {...register("remember")}
          />
          {t("auth.remember")}
        </label>
        <button
          type="button"
          onClick={() => setShowNotice(true)}
          className="text-sm font-semibold text-brand hover:underline"
        >
          {t("auth.forgot")}
        </button>
      </div>

      {showNotice && (
        <p
          role="status"
          className="rounded-control bg-brand-soft px-4 py-3 text-sm text-ink"
        >
          {t("auth.resetUnavailable")}
        </p>
      )}

      <LandingButton type="submit" className="w-full">
        {t("auth.login")}
      </LandingButton>
    </form>
  );
}

export default LoginForm;
