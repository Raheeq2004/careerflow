

import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("auth.errors.emailInvalid"),
  password: z.string().min(1, "auth.errors.passwordRequired"),
  remember: z.boolean(),
});
