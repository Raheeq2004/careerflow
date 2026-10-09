import { useState } from "react";
import { useInterviewsFeature } from "../hooks/useInterviewsFeature";
import InterviewCard from "./InterviewCard";
import InterviewForm from "./InterviewForm";

function InterviewList({ applicationId }) {
  const { applicationInterviews, addInterview } =
    useInterviewsFeature(applicationId);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleSubmit(formData) {
    addInterview(formData);
    setIsFormOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-bold text-gray-400 uppercase">Interviews</p>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add Interview
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="mb-4">
          <InterviewForm
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {applicationInterviews.length === 0 ? (
        <p className="text-sm text-gray-400">No interviews added yet.</p>
      ) : (
        <div className="space-y-3">
          {applicationInterviews.map((interview) => (
            <InterviewCard key={interview.id} id={interview.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
