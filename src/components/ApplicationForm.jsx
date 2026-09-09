import { useState } from "react";
import Button from "./Button";
import styles from "./ApplicationForm.module.css";

function ApplicationForm({ initialData, onSubmit, onCancel }) {
  const [company, setCompany] = useState(initialData?.company || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [workMode, setWorkMode] = useState(initialData?.workMode || "on-site");
  const [jobUrl, setJobUrl] = useState(initialData?.jobUrl || "");
  const [source, setSource] = useState(initialData?.source || "");
  const [status, setStatus] = useState(initialData?.status || "applied");
  const [appliedAt, setAppliedAt] = useState(initialData?.appliedAt || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!company.trim() || !position.trim() || !appliedAt || !status) {
      setError("Company, Position, Applied Date, and Status are required.");
      return;
    }

    setError("");

    onSubmit({
      company,
      position,
      location,
      workMode,
      jobUrl,
      source,
      status,
      appliedAt,
      notes,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.formError}>{error}</p>}

      <label>
        Company *
        <input value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>

      <label>
        Position *
        <input value={position} onChange={(e) => setPosition(e.target.value)} />
      </label>

      <label>
        Location
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>

      <label>
        Work Mode
        <select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
          <option value="on-site">On-site</option>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
        </select>
      </label>

      <label>
        Job URL
        <input value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} />
      </label>

      <label>
        Source
        <input value={source} onChange={(e) => setSource(e.target.value)} />
      </label>

      <label>
        Status *
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </label>

      <label>
        Applied Date *
        <input
          type="date"
          value={appliedAt}
          onChange={(e) => setAppliedAt(e.target.value)}
        />
      </label>

      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      <div className={styles.formActions}>
        <Button type="submit">
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

/*CSS Modules don't require every single element to have its own class — you can still use descendant selectors (.form label) to style plain HTML tags based on their parent, and scoping still applies safely, since the parent class itself is what gets uniquely renamed. */
