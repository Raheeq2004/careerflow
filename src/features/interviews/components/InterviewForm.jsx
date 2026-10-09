import { useState } from "react";
import Button from "../../../components/UI/Button";

const INTERVIEW_TYPES = [
  "HR",
  "Technical",
  "Take-home Task",
  "Manager",
  "Final",
  "Other",
];
const STATUS_OPTIONS = ["Scheduled", "Completed", "Cancelled"];
//plain arrays of strings defined outside the component so they don't get recreated every render, Used to build the <select> dropdown options.

function InterviewForm({ initialData, onSubmit, onCancel }) {
  const [type, setType] = useState(initialData?.type || "HR");
  //usestate creates one piece of state and gives back two things in an array
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
  } //packages 5 field values into one object and hands it to whoever gave the onSubmit prop

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={type} //choosen option
          onChange={(e) => setType(e.target.value)} //setType(...) updates the state to match.
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {INTERVIEW_TYPES.map(
            (
              t, //t is the option for the user
            ) => (
              <option key={t} value={t}>
                {t}
              </option>
            ),
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scheduled Date/Time
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
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interviewer / Team
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
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit">Save</Button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default InterviewForm;
