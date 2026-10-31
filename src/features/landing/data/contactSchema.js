import { z } from "zod";
//the validation rules of the form. Messages are KEYS: FormField translates them
export const contactSchema = z.object({
  name: z.string().trim().min(2, "landing.contact.errors.nameRequired"),
  email: z.email("landing.contact.errors.emailInvalid"),
  subject: z.string().trim().min(3, "landing.contact.errors.subjectRequired"),
  message: z
    .string()
    .trim()
    .min(10, "landing.contact.errors.messageShort")
    .max(1000, "landing.contact.errors.messageLong"),
});
