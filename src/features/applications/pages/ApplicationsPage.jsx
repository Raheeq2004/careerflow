import { useState } from "react";
import { useApplicationsFeature } from "../hooks/useApplicationsFeature";
import { useInterviewsFeature } from "../../interviews/hooks/useInterviewsFeature";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import Button from "../../../components/UI/Button";
import Modal from "../../../components/UI/Modal";

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

  const { deleteInterviewsForApplication } = useInterviewsFeature();

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

  function handleDeleteApplication(applicationId) {
    deleteInterviewsForApplication(applicationId);
    deleteApplication(applicationId);
  }
  
  const controlClasses =
    "min-h-11 w-full rounded-control border border-line bg-white px-3 text-[15px] text-ink placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-brand sm:w-auto";

  const emptyClasses =
    "rounded-card border border-line bg-white px-5 py-10 text-center text-muted shadow-card";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-navy md:text-h2">
            Applications
          </h2>
          <p className="mt-1 text-muted">
            {sortedApplications.length}{" "}
            {sortedApplications.length === 1 ? "application" : "applications"}
          </p>
        </div>
        {!isFormOpen && (
          <Button onClick={handleAddClick}>+ Add Application</Button>
        )}
      </div>

      {isFormOpen && (
        <Modal onClose={handleCancel}>
          <ApplicationForm
            initialData={editingApplication}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </Modal>
      )}

      <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-4 shadow-card sm:flex-row sm:flex-wrap">
        <input
          type="text"
          aria-label="Search applications"
          placeholder="Search by company or position..."
          value={searchText}
          onChange={(e) => updateParam("search", e.target.value)}
          className={`${controlClasses} sm:min-w-60 sm:flex-1`}
        />

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => updateParam("status", e.target.value)}
          className={controlClasses}
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
          aria-label="Filter by work mode"
          value={workModeFilter}
          onChange={(e) => updateParam("workMode", e.target.value)}
          className={controlClasses}
        >
          <option value="">All Work Modes</option>
          <option value="on-site">On-site</option>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
        </select>

        <select
          aria-label="Sort applications"
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className={controlClasses}
        >
          <option value="newest">Newest Applied</option>
          <option value="oldest">Oldest Applied</option>
          <option value="recentlyUpdated">Recently Updated</option>
          <option value="companyAZ">Company A-Z</option>
        </select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {applications.length === 0 ? (
        <p className={emptyClasses}>No applications yet.</p>
      ) : sortedApplications.length === 0 ? (
        <p className={emptyClasses}>
          No applications match your search or filters.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDelete={handleDeleteApplication}
              onEdit={handleEditClick}
              onStatusChange={changeStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;
