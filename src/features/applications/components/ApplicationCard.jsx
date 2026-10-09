import { Link } from 'react-router';
import Button from "../../../components/UI/Button";
import styles from './ApplicationCard.module.css';

function ApplicationCard({ application, onDelete, onEdit, onStatusChange }) {
  return (
    <div className={styles.card}>
      <Link to={`/app/applications/${application.id}`} className="hover:underline">
        <h3>{application.company}</h3>
      </Link>
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
        <Button onClick={() => onEdit(application)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(application.id)}>Delete</Button>
      </div>
    </div>
  );
}

export default ApplicationCard;