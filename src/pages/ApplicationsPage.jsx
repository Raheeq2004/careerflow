import { useOutletContext } from "react-router";
import { Link } from "react-router";
import ApplicationCard from "../components/ApplicationCard";
import Button from "../components/Button";
import styles from "./ApplicationsPage.module.css";

function ApplicationsPage() {
  const { applications, onDelete, onStatusChange } = useOutletContext();

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2>Recent Applications</h2>
        <Link to="/app/applications/new">
          <Button>Add Application</Button>
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className={styles.emptyState}>No applications yet.</p>
      ) : (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </div>
  );
}

export default ApplicationsPage;
