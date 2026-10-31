import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInterviewsFeature } from "../hooks/useInterviewsFeature";
import InterviewForm from "./InterviewForm";
import QuestionList from "./QuestionList";

// The keys are the STORED values: the styles are chosen from them, the text from the dictionary
const STATUS_STYLES = {
  Scheduled: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-gray-200 text-gray-600",
};

// The date follows the app language, not the browser's ("ar-u-nu-latn" = Latin digits)
function formatDateTime(value, language) {
  const locale = language === "ar" ? "ar-u-nu-latn" : "en";
  return new Date(value).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

//only takes { id } as a prop — no more interview, isExpanded, onToggleExpand
function InterviewCard({ id }) {
  const { t, i18n } = useTranslation();
  const {
    getInterviewById,
    updateInterview,
    deleteInterview,
    getQuestionsForInterview,
  } = useInterviewsFeature();

  //Fetches its own interview + questions using just id
  const interview = getInterviewById(id);
  const questions = getQuestionsForInterview(id);

  //local state, owned by the card itself.
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!interview) return null;

  function handleEditSubmit(formData) {
    updateInterview(id, formData);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InterviewForm
        initialData={interview}
        onSubmit={handleEditSubmit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div
        className="cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">
            {t(`interviews.types.${interview.type}`, {
              defaultValue: interview.type,
            })}
          </h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[interview.status] || "bg-gray-100 text-gray-600"}`}
          >
            {t(`interviews.statuses.${interview.status}`, {
              defaultValue: interview.status,
            })}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {interview.scheduledAt
            ? formatDateTime(interview.scheduledAt, i18n.resolvedLanguage)
            : t("interviews.noDate")}
        </p>
        {interview.interviewer && (
          <p className="text-sm text-gray-500">
            {t("interviews.interviewer", { name: interview.interviewer })}
          </p>
        )}
        <p className="text-xs text-indigo-600 mt-1">
          {t("interviews.questionCount", { count: questions.length })} ·{" "}
          {isExpanded ? t("common.hide") : t("common.show")}
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-blue-600 hover:underline"
        >
          {t("common.edit")}
        </button>
        <button
          onClick={() => deleteInterview(id)}
          className="text-xs text-red-600 hover:underline"
        >
          {t("common.delete")}
        </button>
      </div>

      {interview.notes && (
        <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
          {interview.notes}
        </p>
      )}

      {isExpanded && <QuestionList interviewId={id} />}
    </div>
  );
}

export default InterviewCard;
