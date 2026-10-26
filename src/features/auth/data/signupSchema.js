import { z } from "zod";
//Role: the rules for what a valid sign-up is. It has no UI
export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "auth.errors.nameRequired"),
    email: z.email("auth.errors.emailInvalid"),
    targetRole: z.string().trim().optional(),
    password: z.string().min(8, "auth.errors.passwordShort"),
    confirmPassword: z.string().min(1, "auth.errors.confirmRequired"),
    terms: z
      .boolean()
      .refine((value) => value === true, "auth.errors.termsRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.errors.passwordMismatch",
    path: ["confirmPassword"],
  });
