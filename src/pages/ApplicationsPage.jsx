import { useState } from "react";
import { useOutletContext } from "react-router";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import Button from "../components/Button";
import styles from "./ApplicationsPage.module.css";

function ApplicationsPage() {
  const { applications, setApplications } = useOutletContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  function handleAddClick() {
    setEditingApplication(null);
    setIsFormOpen(true);
  }

  function handleEditClick(application) {
    setEditingApplication(application);
    setIsFormOpen(true);
  }

  function handleCancel() {
    setIsFormOpen(false);
    setEditingApplication(null);
  }

  function handleDelete(id) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }

  function handleStatusChange(id, newStatus) {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app,
      ),
    );
  }

  function handleFormSubmit(formData) {
    if (editingApplication) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingApplication.id
            ? { ...app, ...formData, updatedAt: new Date().toISOString() }
            : app,
        ),
      );
    } else {
      const newApplication = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setApplications((prev) => [...prev, newApplication]);
    }

    setIsFormOpen(false);
    setEditingApplication(null);
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2>Recent Applications</h2>
        {!isFormOpen && (
          <Button onClick={handleAddClick}>Add Application</Button>
        )}
      </div>

      {isFormOpen && (
        <ApplicationForm
          initialData={editingApplication}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      {applications.length === 0 ? (
        <p className={styles.emptyState}>No applications yet.</p>
      ) : (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={handleDelete}
            onEdit={handleEditClick}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
}

export default ApplicationsPage;
