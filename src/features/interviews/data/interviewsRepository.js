const STORAGE_KEY = "careerflow.interviews.v1";
//only place in the whole app allowed to read or write interview data to localStorage
function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
//converts array into string
function saveToStorage(interviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interviews));
}
//write that string into the browsers storage.

//bundles both functions into one object
export const interviewsRepository = {
  getAll() {
    return readFromStorage();
  },
  saveAll(interviews) {
    saveToStorage(interviews);
  },
};
