import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../components/UI/Button";

// The stored values. The shown text comes from the dictionary.
const INTERVIEW_TYPES = [
  "HR",
  "Technical",
  "Take-home Task",
  "Manager",
  "Final",
  "Other",
];
const STATUS_OPTIONS = ["Scheduled", "Completed", "Cancelled"];

function InterviewForm({ initialData, onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [type, setType] = useState(initialData?.type || "HR");
  const [scheduledAt, setScheduledAt] = useState(
    initialData?.scheduledAt || "",
  );
  const [status, setStatus] = useState(initialData?.status || "Scheduled");
  const [interviewer, setInterviewer] = useState(
    initialData?.interviewer || "",
  );
  const [notes, setNotes] = useState(initialData?.notes || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!scheduledAt) return;
    //don't submit if no date was picked.
    onSubmit({ type, scheduledAt, status, interviewer, notes });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("interviews.form.type")}
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {/* the map variable is called "option", NOT "t": it would hide our t() function */}
          {INTERVIEW_TYPES.map((option) => (
            <option key={option} value={option}>
              {t(`interviews.types.${option}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("interviews.form.scheduledAt")}
        </label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("interviews.form.status")}
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {t(`interviews.statuses.${option}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("interviews.form.interviewer")}
        </label>
        <input
          type="text"
          value={interviewer}
          onChange={(e) => setInterviewer(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("interviews.form.notes")}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit">{t("interviews.form.save")}</Button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {t("interviews.form.cancel")}
        </button>
      </div>
    </form>
  );
}

export default InterviewForm;
