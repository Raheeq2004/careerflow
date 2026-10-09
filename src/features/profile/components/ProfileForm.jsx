import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/UI/Button";
import { profileSchema } from "../data/profileSchema";

// The form is described as data, then drawn with one .map().
// Seven nearly identical <label><input/></label> blocks would be easy to get
// wrong, and adding a field later means adding one line here.
const FIELDS = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "currentRole", label: "Current Role", type: "text" },
  { name: "targetRole", label: "Target Role", type: "text" },
  { name: "preferredLocation", label: "Preferred Location", type: "text" },
  { name: "linkedinUrl", label: "LinkedIn URL", type: "url" },
  { name: "portfolioUrl", label: "Portfolio URL", type: "url" },
  { name: "githubUrl", label: "GitHub URL", type: "url" },
];

// Shared Tailwind classes, written once so the two error messages stay identical.
const ERROR_CLASS =
  "bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-normal";

// initialData: the saved profile, used as the starting values.
// onSubmit:    asks the parent to save; returns true/false.
// saveStatus:  null | "saved" | "error", set by the parent after a save attempt.
function ProfileForm({ initialData, onSubmit, saveStatus }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(profileSchema),
  });

  // Runs only after Zod approved the data. With zodResolver, `data` is the
  // cleaned output (for example, trimmed), which is what we want to store.
  function onValid(data) {
    const wasSaved = onSubmit(data);

    if (wasSaved) {
      // Make the saved values the new "starting point". isDirty becomes false,
      // so the Save button disables again and the form shows the trimmed values.
      reset(data);
    }
  }

  return (
    <form
      className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl flex flex-col gap-3"
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      {FIELDS.map(({ name, label, type }) => (
        <label
          key={name}
          className="flex flex-col gap-1 text-sm font-semibold text-gray-700"
        >
          {label}
          <input
            type={type}
            aria-invalid={errors[name] ? "true" : "false"}
            className="border border-gray-300 rounded-md p-2 font-normal aria-invalid:border-red-500"
            {...register(name)}
          />
          {errors[name] && (
            <p className={ERROR_CLASS}>{errors[name].message}</p>
          )}
        </label>
      ))}

      {/* role="status" makes screen readers announce the message politely.
          It disappears by itself when the user edits again (isDirty = true). */}
      {saveStatus === "saved" && !isDirty && (
        <p
          className="bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm"
          role="status"
        >
          Profile saved on this device.
        </p>
      )}

      {saveStatus === "error" && (
        <p className={ERROR_CLASS} role="alert">
          Could not save your profile. Your browser storage may be full or
          blocked.
        </p>
      )}

      <div className="flex gap-2 mt-2">
        <Button type="submit" disabled={!isDirty}>
          Save Profile
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
