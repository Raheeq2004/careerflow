import { z } from "zod";

// One place that describes what a valid profile looks like.
// Both the form (React Hook Form) and the repository (localStorage) use it,
// so the rules are written once and cannot drift apart.
// Messages are KEYS: the form translates them and fills {{field}} and {{max}}.

// A profile link must be empty OR a real http/https URL.
// Why not just z.string().url()? Because "javascript:alert(1)" is a valid URL
// for that check. We show these values as clickable links, so we only
// accept http and https.
const optionalWebUrl = () =>
  z
    .string()
    .trim()
    .max(300, "profile.errors.urlTooLong")
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
      "profile.errors.urlInvalid",
    );

// Short free-text field: trimmed, with a length limit so nobody can
// store a huge string in localStorage by accident.
// The form shows the limit in the message: keep it 80 here and in ProfileForm.
const optionalText = (max = 80) =>
  z.string().trim().max(max, "profile.errors.textTooLong");

export const profileSchema = z.object({
  fullName: optionalText(),
  currentRole: optionalText(),
  targetRole: optionalText(),
  preferredLocation: optionalText(),
  linkedinUrl: optionalWebUrl(),
  portfolioUrl: optionalWebUrl(),
  githubUrl: optionalWebUrl(),
});

// What a brand-new user has: every field exists and is an empty string.
// Inputs need string values from the start. If a value is undefined,
// React treats the input as "uncontrolled" and shows a warning later.
export const emptyProfile = {
  fullName: "",
  currentRole: "",
  targetRole: "",
  preferredLocation: "",
  linkedinUrl: "",
  portfolioUrl: "",
  githubUrl: "",
};
