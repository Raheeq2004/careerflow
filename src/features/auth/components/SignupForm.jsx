import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import FormField from "../../../components/UI/FormField";
import PasswordField from "../../../components/UI/PasswordField";
import LandingButton from "../../landing/components/LandingButton";
import { signupSchema } from "../data/signupSchema";

import { useTranslation } from "react-i18next";

//Role: the form logic: values, validation, submit
function SignupForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      targetRole: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onSubmit() {
    // Demo behaviour
    // 
    navigate("/login");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField
        label={t("auth.fullName")}
        id="signup-name"
        placeholder={t("auth.fullNamePlaceholder")}
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <FormField
        label={t("auth.email")}
        id="signup-email"
        type="email"
        placeholder={t("auth.emailPlaceholder")}
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        label={t("auth.targetRole")}
        id="signup-role"
        placeholder={t("auth.targetRolePlaceholder")}
        error={errors.targetRole?.message}
        {...register("targetRole")}
      />
      <PasswordField
        label={t("auth.password")}
        id="signup-password"
        placeholder={t("auth.newPasswordPlaceholder")}
        autoComplete="new-password"
        hint={t("auth.passwordHint")}
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        label={t("auth.confirmPassword")}
        id="signup-confirm"
        placeholder={t("auth.confirmPlaceholder")}
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input
            type="checkbox"
            aria-invalid={errors.terms ? "true" : undefined}
            className="mt-0.5 size-4 accent-brand"
            {...register("terms")}
          />
          <span>{t("auth.terms")}</span>
        </label>
        {errors.terms && (
          <p className="mt-1.5 text-sm text-danger">
            {t(errors.terms.message)}
          </p>
        )}
      </div>

      <LandingButton type="submit" className="w-full">
        {t("auth.createAccount")}
      </LandingButton>
    </form>
  );
}

export default SignupForm;
