import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/UI/Button";
import styles from "./ApplicationForm.module.css";
import { WORK_MODE_LABELS } from "./../data/applicationSchema";

import { applicationSchema } from "../data/applicationSchema";


//This is just a dictionary: "if the stored value is applied, the text to show is Applied
const STATUS_LABELS = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

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
  const {
    register, //register — a function you call, once per field, passing the field's name as a string: register("company")
    handleSubmit,
    setValue, //changes a field from code instead of typing
    watch, //helper to read from the field
    formState: { errors, isSubmitting },
  } = useForm
  ({
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
    // Can't just "setNextActionAt('')" anymore — there's no such
    // state. setValue tells RHF to update that field directly.
    setValue("nextActionAt", "");
    setValue("nextActionDescription", "");
  }

  //no value/onChange written
  return (
    <form className={styles.form} onSubmit={handleSubmit(onValid)} noValidate>
      <label>
        Company *
        <input {...register("company")} />
        {errors.company && (
          <p className={styles.formError}>{errors.company.message}</p>
        )}
      </label>

      <label>
        Position *
        <input {...register("position")} />
        {errors.position && (
          <p className={styles.formError}>{errors.position.message}</p>
        )}
      </label>

      <label>
        Location
        <input {...register("location")} />
      </label>

      <label>
        Work Mode
        <select {...register("workMode")}>
          {Object.entries(WORK_MODE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Job URL
        <input {...register("jobUrl")} />
        {errors.jobUrl && (
          <p className={styles.formError}>{errors.jobUrl.message}</p>
        )}
      </label>

      <label>
        Source
        <input {...register("source")} />
      </label>

      <label>
        Status *
        <select {...register("status")}>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
            //register :connects the <select> itself to React Hook Form
          ))}
        </select>
        {errors.status && (
          <p className={styles.formError}>{errors.status.message}</p>
        )}
      </label>

      <label>
        Applied Date *
        <input type="date" {...register("appliedAt")} />
        {errors.appliedAt && (
          <p className={styles.formError}>{errors.appliedAt.message}</p>
        )}
      </label>

      <label>
        Next Action Date
        <input type="date" {...register("nextActionAt")} />
      </label>

      <label>
        Next Action Description
        <input
          type="text"
          placeholder="e.g. Follow up with recruiter"
          {...register("nextActionDescription")}
        />
      </label>

      {nextActionAt && (
        <button
          type="button"
          onClick={handleClearNextAction}
          className="text-sm text-gray-500 hover:underline text-left"
        >
          Clear next action
        </button>
      )}

      <label>
        Notes
        <textarea {...register("notes")} />
      </label>

      <div className={styles.formActions}>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? "Save Changes" : "Add Application"}
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ApplicationForm;


//register("fieldName") on every input — the one-line replacement for value + onChange. It connects that specific input to the engine.

//Where it replaces: your old single const [error, setError] = useState("") — instead of one generic message shared by the whole form, you now get one specific message per field, read as errors.company.message.