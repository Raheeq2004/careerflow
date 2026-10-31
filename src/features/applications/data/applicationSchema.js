import { z } from "zod";

// The stored values of work mode. The schema only needs the KEYS.
export const WORK_MODE_LABELS = {
  "on-site": "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

// Messages are KEYS: the form translates them with t()
export const applicationSchema = z.object({
  company: z.string().min(1, "applicationForm.errors.companyRequired"),
  position: z.string().min(1, "applicationForm.errors.positionRequired"),

  location: z.string().optional(),

  workMode: z.enum(Object.keys(WORK_MODE_LABELS)),

  // Optional, but must be a real URL if the user types something in.
  jobUrl: z
    .string()
    .url("applicationForm.errors.jobUrlInvalid")
    .optional()
    .or(z.literal("")),

  source: z.string().optional(),

  status: z.enum(
    ["applied", "screening", "interview", "offer", "rejected", "withdrawn"],
    { message: "applicationForm.errors.statusRequired" },
  ),

  appliedAt: z.string().min(1, "applicationForm.errors.appliedAtRequired"),

  // Next action fields stay free-form/optional, same as before.
  nextActionAt: z.string().optional(),
  nextActionDescription: z.string().optional(),

  notes: z.string().optional(),
});
