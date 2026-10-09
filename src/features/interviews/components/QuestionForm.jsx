import { useState } from "react";

function QuestionForm({ initialData, onSubmit, onCancel }) {
  const [question, setQuestion] = useState(initialData?.question || "");
  const [myAnswer, setMyAnswer] = useState(initialData?.myAnswer || "");
  const [answeredWell, setAnsweredWell] = useState(
    initialData?.answeredWell ?? true,
  );
  const [reviewNotes, setReviewNotes] = useState(
    initialData?.reviewNotes || "",
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return; //if "" , the function exits immediately, right there onSubmit(...) never gets called.
    onSubmit({ question, myAnswer, answeredWell, reviewNotes });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2"
    >
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          My Answer
        </label>
        <textarea
          value={myAnswer}
          onChange={(e) => setMyAnswer(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="answeredWell"
          checked={answeredWell}
          onChange={(e) => setAnsweredWell(e.target.checked)}
        />
        <label htmlFor="answeredWell" className="text-xs text-gray-700">
          Did I answer it well?
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Review Notes
        </label>
        <textarea
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default QuestionForm;
