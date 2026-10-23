import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import FormField from "../../../components/UI/FormField";
import PasswordField from "../../../components/UI/PasswordField";
import LandingButton from "../../landing/components/LandingButton";
import { loginSchema } from "../data/loginSchema";

function LoginForm() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  function onSubmit() {
    // Demo behaviour: there is no backend or auth logic yet,
    // so nobody is really logged in. We only go to the dashboard.
    navigate("/app/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField
        label="Email address"
        id="login-email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordField
        label="Password"
        id="login-password"
        placeholder="Your password"
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
          Remember me
        </label>
        <button
          type="button"
          onClick={() => setNotice("Password reset is not available yet.")}
          className="text-sm font-semibold text-brand hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {notice && (
        <p
          role="status"
          className="rounded-control bg-brand-soft px-4 py-3 text-sm text-ink"
        >
          {notice}
        </p>
      )}

      <LandingButton type="submit" className="w-full">
        Log in
      </LandingButton>
    </form>
  );
}

export default LoginForm;
