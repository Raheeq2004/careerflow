import { z } from "zod";

// One place that describes what a valid profile looks like.
// Both the form (React Hook Form) and the repository (localStorage) use it,
// so the rules are written once and cannot drift apart.

// A profile link must be empty OR a real http/https URL.
// Why not just z.string().url()? Because "javascript:alert(1)" is a valid URL
// for that check. We show these values as clickable links, so we only
// accept http and https.
const optionalWebUrl = (label) =>
  z
    .string()
    .trim()
    .max(300, `${label} is too long`)
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
      `${label} must start with http:// or https://`,
    );

// Short free-text field: trimmed, with a length limit so nobody can
// store a huge string in localStorage by accident.
const optionalText = (label, max = 80) =>
  z.string().trim().max(max, `${label} must be ${max} characters or less`);

export const profileSchema = z.object({
  fullName: optionalText("Full name"),
  currentRole: optionalText("Current role"),
  targetRole: optionalText("Target role"),
  preferredLocation: optionalText("Preferred location"),
  linkedinUrl: optionalWebUrl("LinkedIn URL"),
  portfolioUrl: optionalWebUrl("Portfolio URL"),
  githubUrl: optionalWebUrl("GitHub URL"),
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
