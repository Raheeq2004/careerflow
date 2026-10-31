import { useTranslation } from "react-i18next";

function QuestionCard({ question, onEdit, onDelete }) {
  const { t } = useTranslation();
  //Displays one question, with Edit/Delete buttons
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3">
      <p className="text-sm font-semibold text-gray-800 mb-1">
        {t("questions.q", { text: question.question })}
      </p>

      {question.myAnswer && (
        <p className="text-sm text-gray-600 mb-2">
          {t("questions.myAnswer", { text: question.myAnswer })}
        </p>
      )}

      <span
        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
          question.answeredWell
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-600"
        }`}
      >
        {question.answeredWell
          ? t("questions.answeredWell")
          : t("questions.needsReview")}
      </span>

      {question.reviewNotes && (
        <p className="text-xs text-gray-500 mt-2">
          {t("questions.reviewNotes", { text: question.reviewNotes })}
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={onEdit}
          className="text-xs text-blue-600 hover:underline"
        >
          {t("common.edit")}
        </button>
        <button
          onClick={onDelete}
          className="text-xs text-red-600 hover:underline"
        >
          {t("common.delete")}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
