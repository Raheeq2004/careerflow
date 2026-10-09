const STORAGE_KEY = "careerflow.questions.v1";
//Only file that reads/writes questions to localStorage (key: careerflow.questions.v1)
function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(questions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

export const questionsRepository = {
  getAll() {
    return readFromStorage();
  },
  saveAll(questions) {
    saveToStorage(questions);
  },
};
