import { useTranslation } from "react-i18next";
//Role: one field: label, input
function FormField({
  label, // the label text
  id, //  links label to input
  error, //the red text
  hint,
  action,
  as: Control = "input",
  ref,
  ...rest
}) {
  const { t } = useTranslation();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  //tells screen readers which text
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>

      <div className="relative">
        <Control
          id={id}
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={`w-full rounded-control border bg-white py-2.5 text-sm text-ink placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-brand ${
            action ? "ps-3 pe-16" : "px-3"
          } ${error ? "border-danger" : "border-line"}`}
          {...rest}
        />
        {action}
      </div>

      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {t(error, { defaultValue: error })}
        </p>
      )}
    </div>
  );
}

export default FormField;
