import { z } from "zod";
//the validation rules of the form: what counts as a valid name, email, subject and message
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a short subject."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(1000, "Please keep your message under 1000 characters."),
});
