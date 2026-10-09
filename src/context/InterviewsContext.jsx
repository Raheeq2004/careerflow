import { createContext, useState, useEffect, useContext } from "react";
import { interviewsRepository } from "../features/interviews/data/interviewsRepository";
import { questionsRepository } from "../features/interviews/data/questionsRepository";

/*createContext(null) → defines that a channel exists, and what the fallback is if nobody's broadcasting.
InterviewsProvider → is the thing that actually broadcasts real, live, changing data onto that channel, to every component wrapped inside it. */
const InterviewsContext = createContext(null);

export function InterviewsProvider({ children }) {
  const [interviews, setInterviews] = useState(() =>
    interviewsRepository.getAll(),
  );
  const [questions, setQuestions] = useState(() =>
    questionsRepository.getAll(),
  );

  //children is a special prop — it means "whatever JSX gets wrapped inside <InterviewsProvider>...</InterviewsProvider>.
  useEffect(() => {
    interviewsRepository.saveAll(interviews);
  }, [interviews]);

  useEffect(() => {
    questionsRepository.saveAll(questions);
  }, [questions]);

  return (
    <InterviewsContext.Provider
      value={{ interviews, setInterviews, questions, setQuestions }}
    >
      {children}
    </InterviewsContext.Provider>
  );
}
//Anything rendered inside it ({children}) can now reach into this value.

export function useInterviewsContext() {
  return useContext(InterviewsContext);
}
//hold the real, live, in-memory copy of interviews and questions as React state, keep it automatically synced to localStorage, and make it reachable from any component in the app — without passing it manually through props at every level.
