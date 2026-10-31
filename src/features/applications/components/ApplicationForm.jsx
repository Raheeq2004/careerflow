import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import Button from "../../../components/UI/Button";
import styles from "./ApplicationForm.module.css";
import { WORK_MODE_LABELS, applicationSchema } from "../data/applicationSchema";

// The stored values. The text shown comes from the dictionary: status.* and workMode.*
const STATUS_OPTIONS = [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];
const WORK_MODE_OPTIONS = Object.keys(WORK_MODE_LABELS);

//starting values for a brand-new application
const emptyDefaults = {
  company: "",
  position: "",
  location: "",
  workMode: "on-site",
  jobUrl: "",
  source: "",
  status: "applied",
  appliedAt: "",
  nextActionAt: "",
  nextActionDescription: "",
  notes: "",
};

//useform This is the main function that creates and manages the entire form
function ApplicationForm({ initialData, onSubmit, onCancel }) {
  const { t } = useTranslation();

  const {
    register, //register — a function you call, once per field, passing the field's name as a string: register("company")
    handleSubmit,
    setValue, //changes a field from code instead of typing
    watch, //helper to read from the field
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData ?? emptyDefaults, //defaultValues — an object, the starting values for every field
    resolver: zodResolver(applicationSchema), //resolver — a function, not raw data. You don't pass the schema directly
  });
  //Think of zodResolver as a translator between the two libraries.

  // watch() subscribes to one field's live value without making the
  // whole form controlled — only this component re-renders when
  // nextActionAt changes, same effect as the old useState did.
  const nextActionAt = watch("nextActionAt");

  // Only runs once Zod has approved the data
  function onValid(data) {
    onSubmit({
      ...data,
      nextActionAt: data.nextActionAt || null,
    });
  }

  function handleClearNextAction() {
    // setValue tells RHF to update that field directly.
    setValue("nextActionAt", "");
    setValue("nextActionDescription", "");
  }

  //no value/onChange written
  return (
    <form className={styles.form} onSubmit={handleSubmit(onValid)} noValidate>
      <label>
        {t("applicationForm.company")}
        <input {...register("company")} />
        {errors.company && (
          <p className={styles.formError}>{t(errors.company.message)}</p>
        )}
      </label>

      <label>
        {t("applicationForm.position")}
        <input {...register("position")} />
        {errors.position && (
          <p className={styles.formError}>{t(errors.position.message)}</p>
        )}
      </label>

      <label>
        {t("applicationForm.location")}
        <input {...register("location")} />
      </label>

      <label>
        {t("applicationForm.workMode")}
        <select {...register("workMode")}>
          {WORK_MODE_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {t(`workMode.${value}`)}
            </option>
          ))}
        </select>
      </label>

      <label>
        {t("applicationForm.jobUrl")}
        <input {...register("jobUrl")} />
        {errors.jobUrl && (
          <p className={styles.formError}>{t(errors.jobUrl.message)}</p>
        )}
      </label>

      <label>
        {t("applicationForm.source")}
        <input {...register("source")} />
      </label>

      <label>
        {t("applicationForm.status")}
        <select {...register("status")}>
          {STATUS_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {t(`status.${value}`)}
            </option>
            //register :connects the <select> itself to React Hook Form
          ))}
        </select>
        {errors.status && (
          <p className={styles.formError}>{t(errors.status.message)}</p>
        )}
      </label>

      <label>
        {t("applicationForm.appliedAt")}
        <input type="date" {...register("appliedAt")} />
        {errors.appliedAt && (
          <p className={styles.formError}>{t(errors.appliedAt.message)}</p>
        )}
      </label>

      <label>
        {t("applicationForm.nextActionAt")}
        <input type="date" {...register("nextActionAt")} />
      </label>

      <label>
        {t("applicationForm.nextActionDescription")}
        <input
          type="text"
          placeholder={t("applicationForm.nextActionPlaceholder")}
          {...register("nextActionDescription")}
        />
      </label>

      {nextActionAt && (
        <button
          type="button"
          onClick={handleClearNextAction}
          className="text-sm text-gray-500 hover:underline text-start"
        >
          {t("applicationForm.clearNextAction")}
        </button>
      )}

      <label>
        {t("applicationForm.notes")}
        <textarea {...register("notes")} />
      </label>

      <div className={styles.formActions}>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? t("applicationForm.save") : t("applicationForm.add")}
        </Button>
        <Button type="button" onClick={onCancel}>
          {t("applicationForm.cancel")}
        </Button>
      </div>
    </form>
  );
}

export default ApplicationForm;
