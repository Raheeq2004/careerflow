import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInterviewsFeature } from "../hooks/useInterviewsFeature";
import QuestionCard from "./QuestionCard";
import QuestionForm from "./QuestionForm";

//Now receives only interviewId, and calls the hook itself
function QuestionList({ interviewId }) {
  const { t } = useTranslation();
  const {
    getQuestionsForInterview,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  } = useInterviewsFeature();
  const questions = getQuestionsForInterview(interviewId);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  function handleAddClick() {
    setEditingQuestion(null);
    setIsFormOpen(true);
  }

  function handleEditClick(question) {
    setEditingQuestion(question);
    setIsFormOpen(true);
  }

  function handleSubmit(formData) {
    if (editingQuestion) {
      updateQuestion(editingQuestion.id, formData);
    } else {
      addQuestion(interviewId, formData);
    }
    setIsFormOpen(false);
    setEditingQuestion(null);
  }

  function handleCancel() {
    setIsFormOpen(false);
    setEditingQuestion(null);
  }

  return (
    <div className="mt-4 ps-4 border-s-2 border-gray-200 space-y-3">
      <p className="text-sm font-semibold text-gray-700">
        {t("questions.title")}
      </p>

      {questions.length === 0 && !isFormOpen && (
        <p className="text-sm text-gray-400">{t("questions.empty")}</p>
      )}

      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          onEdit={() => handleEditClick(q)}
          onDelete={() => deleteQuestion(q.id)}
        />
      ))}

      {isFormOpen ? (
        <QuestionForm
          initialData={editingQuestion}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <button
          onClick={handleAddClick}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          {t("questions.add")}
        </button>
      )}
    </div>
  );
}

export default QuestionList;
