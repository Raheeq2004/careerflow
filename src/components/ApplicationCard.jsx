import { Link } from "react-router";
import Button from "./Button";
import styles from "./ApplicationCard.module.css";

function ApplicationCard({ application, onDelete, onStatusChange }) {
  return (
    <div className={styles.card}>
      <h3>{application.company}</h3>
      <p>{application.position}</p>

      <select
        className={styles.statusSelect}
        value={application.status}
        onChange={(e) => onStatusChange(application.id, e.target.value)}
      >
        <option value="applied">Applied</option>
        <option value="screening">Screening</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="withdrawn">Withdrawn</option>
      </select>

      <p className={styles.appliedDate}>Applied on {application.appliedAt}</p>

      <div className={styles.cardActions}>
        <Link to={`/app/applications/${application.id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="danger" onClick={() => onDelete(application.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ApplicationCard;
