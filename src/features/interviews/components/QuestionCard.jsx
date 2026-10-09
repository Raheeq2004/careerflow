function QuestionCard({ question, onEdit, onDelete }) {
  //Displays one question, with Edit/Delete buttons
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3">
      <p className="text-sm font-semibold text-gray-800 mb-1">
        Q: {question.question}
      </p>

      {question.myAnswer && (
        <p className="text-sm text-gray-600 mb-2">
          My answer: {question.myAnswer}
        </p>
      )}

      <span
        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
          question.answeredWell
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-600"
        }`}
      >
        {question.answeredWell ? "Answered well" : "Needs review"}
      </span>

      {question.reviewNotes && (
        <p className="text-xs text-gray-500 mt-2">
          Review notes: {question.reviewNotes}
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={onEdit}
          className="text-xs text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-xs text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
