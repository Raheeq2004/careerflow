import { z } from "zod";


// One place describing what a "valid" application looks like.
export const WORK_MODE_LABELS = {
  "on-site": "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export const applicationSchema = z.object({
  //a valid application is an object with exactly these properties, each following its own rule.
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  //Must be a string, and at least 1 character long.

  location: z.string().optional(),

  workMode: z.enum(Object.values(WORK_MODE_LABELS)),

  // Optional, but must be a real URL if the user types something in.
  jobUrl: z
    .string()
    .url("Must be a valid URL (e.g. https://company.com/job)")
    .optional()
    .or(z.literal("")),

  source: z.string().optional(),

  status: z.enum(
    ["applied", "screening", "interview", "offer", "rejected", "withdrawn"],
    { message: "Please choose a status" },
  ),

  appliedAt: z.string().min(1, "Applied date is required"),

  // Next action fields stay free-form/optional, same as before.
  nextActionAt: z.string().optional(),
  nextActionDescription: z.string().optional(),

  notes: z.string().optional(),
});


