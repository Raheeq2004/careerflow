import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useApplicationsFeature } from "../hooks/useApplicationsFeature";
import { useInterviewsFeature } from "../../interviews/hooks/useInterviewsFeature";
import ApplicationForm from "../components/ApplicationForm";
import InterviewList from "../../interviews/components/InterviewList";
import Button from "../../../components/UI/Button";

function ApplicationDetailsPage() {
  const { t } = useTranslation();
  const { applicationId } = useParams(); //to read the applicationId from the URL
  const navigate = useNavigate();
  const { applications, submitApplication, deleteApplication } =
    useApplicationsFeature();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const application = applications.find((app) => app.id === applicationId);

  const { deleteInterviewsForApplication } = useInterviewsFeature();

  function handleEditSubmit(formData) {
    submitApplication(formData, application);
    setIsFormOpen(false);
  }

  function handleDeleteClick() {
    deleteInterviewsForApplication(application.id);
    deleteApplication(application.id);
    navigate("/app/applications");
  }

  if (!application) {
    return (
      <div>
        <p className="text-gray-500">{t("details.notFound")}</p>
        <Button onClick={() => navigate("/app/applications")}>
          {t("details.back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate("/app/applications")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:underline"
      >
        {/* The arrow turns around when the page direction is right-to-left (rtl:rotate-180) */}
        <svg
          className="size-4 rtl:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t("details.back")}
      </button>

      {isFormOpen ? (
        <ApplicationForm
          initialData={application}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold break-words">
                {application.company}
              </h1>
              <p className="text-gray-600 break-words">
                {application.position}
              </p>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize bg-gray-200 text-gray-700 shrink-0 ms-4">
              {t(`status.${application.status}`, {
                defaultValue: application.status,
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase">
                {t("details.location")}
              </p>
              <p>{application.location || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                {t("details.workMode")}
              </p>
              <p className="capitalize">
                {application.workMode
                  ? t(`workMode.${application.workMode}`, {
                      defaultValue: application.workMode,
                    })
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                {t("details.source")}
              </p>
              <p>{application.source || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                {t("details.jobUrl")}
              </p>
              {application.jobUrl ? (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="text-blue-600 hover:underline break-all"
                >
                  {application.jobUrl}
                </a>
              ) : (
                <p>—</p>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                {t("details.appliedDate")}
              </p>
              <p>{application.appliedAt || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                {t("details.nextActionDate")}
              </p>
              <p>{application.nextActionAt || t("details.noNextAction")}</p>
            </div>
          </div>

          {application.nextActionDescription && (
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase">
                {t("details.nextAction")}
              </p>
              <p>{application.nextActionDescription}</p>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs text-gray-400 uppercase mb-1">
              {t("details.notes")}
            </p>
            <p className="whitespace-pre-wrap break-words text-gray-700">
              {application.notes || t("details.noNotes")}
            </p>
          </div>

          <div className="flex gap-6 text-xs text-gray-400 mb-6">
            <p>
              {t("details.created", {
                date: application.createdAt?.slice(0, 10),
              })}
            </p>
            <p>
              {t("details.updated", {
                date: application.updatedAt?.slice(0, 10),
              })}
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setIsFormOpen(true)}>
              {t("common.edit")}
            </Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              {t("common.delete")}
            </Button>
          </div>
        </div>
      )}

      {!isFormOpen && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <InterviewList applicationId={applicationId} />
        </div>
      )}
    </div>
  );
}

export default ApplicationDetailsPage;
