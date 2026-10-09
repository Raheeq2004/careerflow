import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useApplicationsFeature } from "../hooks/useApplicationsFeature";
import { useInterviewsFeature } from "../../interviews/hooks/useInterviewsFeature";
import ApplicationForm from "../components/ApplicationForm";
import InterviewList from "../../interviews/components/InterviewList";
import Button from "../../../components/UI/Button";

function ApplicationDetailsPage() {
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
        <p className="text-gray-500">Application not found.</p>
        <Button onClick={() => navigate("/app/applications")}>
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate("/app/applications")}
        className="text-sm text-gray-500 mb-4 hover:underline"
      >
        ← Back to Applications
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
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize bg-gray-200 text-gray-700 shrink-0 ml-4">
              {application.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase">Location</p>
              <p>{application.location || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Work Mode</p>
              <p className="capitalize">{application.workMode || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Source</p>
              <p>{application.source || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Job URL</p>
              {application.jobUrl ? (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {application.jobUrl}
                </a>
              ) : (
                <p>—</p>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Applied Date</p>
              <p>{application.appliedAt || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                Next Action Date
              </p>
              <p>{application.nextActionAt || "No next action scheduled"}</p>
            </div>
          </div>

          {application.nextActionDescription && (
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase">Next Action</p>
              <p>{application.nextActionDescription}</p>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs text-gray-400 uppercase mb-1">Notes</p>
            <p className="whitespace-pre-wrap break-words text-gray-700">
              {application.notes || "No notes yet."}
            </p>
          </div>

          <div className="flex gap-6 text-xs text-gray-400 mb-6">
            <p>Created: {application.createdAt?.slice(0, 10)}</p>
            <p>Last Updated: {application.updatedAt?.slice(0, 10)}</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setIsFormOpen(true)}>Edit</Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              Delete
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
