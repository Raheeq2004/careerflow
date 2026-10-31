import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import Button from "../../../components/UI/Button";
import { profileSchema } from "../data/profileSchema";

// The form is described as data, then drawn with one .map().
// Seven nearly identical <label><input/></label> blocks would be easy to get
// wrong, and adding a field later means adding one line here.
// The data holds KEYS: the text is read from the dictionary when it is drawn.
const FIELDS = [
  { name: "fullName", labelKey: "profile.fields.fullName", type: "text" },
  { name: "currentRole", labelKey: "profile.fields.currentRole", type: "text" },
  { name: "targetRole", labelKey: "profile.fields.targetRole", type: "text" },
  {
    name: "preferredLocation",
    labelKey: "profile.fields.preferredLocation",
    type: "text",
  },
  { name: "linkedinUrl", labelKey: "profile.fields.linkedinUrl", type: "url" },
  {
    name: "portfolioUrl",
    labelKey: "profile.fields.portfolioUrl",
    type: "url",
  },
  { name: "githubUrl", labelKey: "profile.fields.githubUrl", type: "url" },
];

// Shared Tailwind classes, written once so the two error messages stay identical.
const ERROR_CLASS =
  "bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-normal";

// initialData: the saved profile, used as the starting values.
// onSubmit:    asks the parent to save; returns true/false.
// saveStatus:  null | "saved" | "error", set by the parent after a save attempt.
function ProfileForm({ initialData, onSubmit, saveStatus }) {
  const { t } = useTranslation();

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
      {FIELDS.map(({ name, labelKey, type }) => (
        <label
          key={name}
          className="flex flex-col gap-1 text-sm font-semibold text-gray-700"
        >
          {t(labelKey)}
          <input
            type={type}
            // Links are always written left-to-right (http://...), even on an Arabic page
            dir={type === "url" ? "ltr" : undefined}
            aria-invalid={errors[name] ? "true" : "false"}
            className="border border-gray-300 rounded-md p-2 font-normal aria-invalid:border-red-500"
            {...register(name)}
          />
          {errors[name] && (
            <p className={ERROR_CLASS}>
              {t(errors[name].message, { field: t(labelKey), max: 80 })}
            </p>
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
          {t("profile.saved")}
        </p>
      )}

      {saveStatus === "error" && (
        <p className={ERROR_CLASS} role="alert">
          {t("profile.saveError")}
        </p>
      )}

      <div className="flex gap-2 mt-2">
        <Button type="submit" disabled={!isDirty}>
          {t("profile.save")}
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
