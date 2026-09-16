import { useState } from "react";
import { useApplicationsFeature } from "../context/useApplicationsFeature";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import Button from "../components/Button";
import styles from "./ApplicationsPage.module.css";

function ApplicationsPage() {
  const {
    applications,
    sortedApplications,
    searchText,
    statusFilter,
    workModeFilter,
    sortBy,
    hasActiveFilters,
    updateParam,
    clearFilters,
    deleteApplication,
    changeStatus,
    submitApplication,
  } = useApplicationsFeature();

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

  function handleFormSubmit(formData) {
    submitApplication(formData, editingApplication);
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

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by company or position..."
          value={searchText}
          onChange={(e) => updateParam("search", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-[200px]"
        />

        <select
          value={statusFilter}
          onChange={(e) => updateParam("status", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>

        <select
          value={workModeFilter}
          onChange={(e) => updateParam("workMode", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">All Work Modes</option>
          <option value="on-site">On-site</option>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="newest">Newest Applied</option>
          <option value="oldest">Oldest Applied</option>
          <option value="recentlyUpdated">Recently Updated</option>
          <option value="companyAZ">Company A-Z</option>
        </select>

        {hasActiveFilters && (
          <Button onClick={clearFilters}>Clear Filters</Button>
        )}
      </div>

      {applications.length === 0 ? (
        <p className={styles.emptyState}>No applications yet.</p>
      ) : sortedApplications.length === 0 ? (
        <p className={styles.emptyState}>
          No applications match your search or filters.
        </p>
      ) : (
        sortedApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={deleteApplication}
            onEdit={handleEditClick}
            onStatusChange={changeStatus}
          />
        ))
      )}
    </div>
  );
}

export default ApplicationsPage;
