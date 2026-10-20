import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import FormField from "../../../components/UI/FormField";
import PasswordField from "../../../components/UI/PasswordField";
import LandingButton from "../../landing/components/LandingButton";
import { signupSchema } from "../data/signupSchema";

//Role: the form logic: values, validation, submit
function SignupForm() {
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
        label="Full name"
        id="signup-name"
        placeholder="Your name"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <FormField
        label="Email address"
        id="signup-email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        label="Target role (optional)"
        id="signup-role"
        placeholder="e.g. Frontend Developer"
        error={errors.targetRole?.message}
        {...register("targetRole")}
      />
      <PasswordField
        label="Password"
        id="signup-password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        hint="Use 8 or more characters."
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        label="Confirm password"
        id="signup-confirm"
        placeholder="Repeat your password"
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
          <span>I agree to the Terms and Privacy Policy</span>
        </label>
        {errors.terms && (
          <p className="mt-1.5 text-sm text-danger">{errors.terms.message}</p>
        )}
      </div>

      <LandingButton type="submit" className="w-full">
        Create account
      </LandingButton>
    </form>
  );
}

export default SignupForm;
