import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApplicationsFeature } from "../hooks/useApplicationsFeature";
import { useInterviewsFeature } from "../../interviews/hooks/useInterviewsFeature";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import Button from "../../../components/UI/Button";
import Modal from "../../../components/UI/Modal";

const statusOptions = [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];
const workModeOptions = ["on-site", "hybrid", "remote"];
const sortOptions = ["newest", "oldest", "recentlyUpdated", "companyAZ"];

function ApplicationsPage() {
  const { t } = useTranslation();
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
            {t("applications.title")}
          </h2>
          <p className="mt-1 text-muted">
            {t("applications.count", { count: sortedApplications.length })}
          </p>
        </div>
        {!isFormOpen && (
          <Button onClick={handleAddClick}>{t("applications.add")}</Button>
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
          aria-label={t("applications.searchLabel")}
          placeholder={t("applications.searchPlaceholder")}
          value={searchText}
          onChange={(e) => updateParam("search", e.target.value)}
          className={`${controlClasses} sm:min-w-60 sm:flex-1`}
        />

        <select
          aria-label={t("applications.filterStatus")}
          value={statusFilter}
          onChange={(e) => updateParam("status", e.target.value)}
          className={controlClasses}
        >
          <option value="">{t("applications.allStatuses")}</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {t(`status.${status}`)}
            </option>
          ))}
        </select>

        <select
          aria-label={t("applications.filterWorkMode")}
          value={workModeFilter}
          onChange={(e) => updateParam("workMode", e.target.value)}
          className={controlClasses}
        >
          <option value="">{t("applications.allWorkModes")}</option>
          {workModeOptions.map((mode) => (
            <option key={mode} value={mode}>
              {t(`workMode.${mode}`)}
            </option>
          ))}
        </select>

        <select
          aria-label={t("applications.sortLabel")}
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className={controlClasses}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {t(`sort.${option}`)}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            {t("applications.clearFilters")}
          </Button>
        )}
      </div>

      {applications.length === 0 ? (
        <p className={emptyClasses}>{t("applications.empty")}</p>
      ) : sortedApplications.length === 0 ? (
        <p className={emptyClasses}>{t("applications.noMatch")}</p>
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
