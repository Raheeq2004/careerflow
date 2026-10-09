import { useInterviewsContext } from "../../../context/InterviewsContext";

//this file is where all the business logic for interviews/questions lives.
export function useInterviewsFeature(applicationId) {
  const { interviews, setInterviews, questions, setQuestions } =
    useInterviewsContext();

  const applicationInterviews = interviews.filter(
    (interview) => interview.applicationId === applicationId,
  );
  //This is a **derived value** — it's not stored anywhere by itself; it's recalculated fresh every single time the component re-renders

  function addInterview(formData) {
    const newInterview = {
      id: crypto.randomUUID(),
      applicationId,
      ...formData,
    };
    setInterviews((prev) => [...prev, newInterview]);
  }

  function updateInterview(interviewId, formData) {
    setInterviews((prev) =>
      prev.map((interview) =>
        interview.id === interviewId
          ? { ...interview, ...formData }
          : interview,
      ),
    );
  }

  function deleteInterview(interviewId) {
    setInterviews((prev) =>
      prev.filter((interview) => interview.id !== interviewId),
    );
    setQuestions((prev) =>
      prev.filter((question) => question.interviewId !== interviewId),
    );
  }
  //when delete an interview, i dont want its questions left, pointing at an interview id that no longer exists anywhere.

  function getQuestionsForInterview(interviewId) {
    return questions.filter((question) => question.interviewId === interviewId);
  }

  function addQuestion(interviewId, formData) {
    const newQuestion = {
      id: crypto.randomUUID(),
      interviewId,
      ...formData,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function updateQuestion(questionId, formData) {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId ? { ...question, ...formData } : question,
      ),
    );
  }

  function getInterviewById(interviewId) {
    return interviews.find((interview) => interview.id === interviewId);
  }

  function deleteQuestion(questionId) {
    setQuestions((prev) =>
      prev.filter((question) => question.id !== questionId),
    );
  }

  // Called when a whole Application is deleted, so its interviews
  // (and their questions) don't become orphaned data with no owner.
  function deleteInterviewsForApplication(appId) {
    const interviewIdsToDelete = interviews
      .filter((interview) => interview.applicationId === appId)
      .map((interview) => interview.id); //to put the ids in array

    setInterviews((prev) =>
      prev.filter((interview) => interview.applicationId !== appId),
    );
    //remain the id we dont want to delete

    setQuestions((prev) =>
      prev.filter(
        (question) => !interviewIdsToDelete.includes(question.interviewId),
      ),
    );
  }

  return {
    interviews, // ← this line
    applicationInterviews,
    addInterview,
    updateInterview,
    deleteInterview,
    getInterviewById, // ← new , searches the full interviews array and returns one match
    getQuestionsForInterview,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteInterviewsForApplication,
  };
  //object bundles everything (the derived array + all 8 functions) into one object, that's what a component gets back when it calls useInterviewsFeature(applicationId).
}
