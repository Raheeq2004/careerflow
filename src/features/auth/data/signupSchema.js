import { z } from "zod";
//Role: the rules for what a valid sign-up is. It has no UI
export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.email("Enter a valid email address"),
    targetRole: z.string().trim().optional(),
    password: z.string().min(8, "Use 8 or more characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z
      .boolean()
      .refine((value) => value === true, "You must agree to continue"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
