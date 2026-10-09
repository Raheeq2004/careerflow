const STORAGE_KEY = "careerflow.applications.v1";
//fixed label used to store/retrieve data in localStorage.
function readFromStorage() {
  const rawValue = localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue); //make the string into array again

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("Corrupted applications data in localStorage:", error);
    return [];
  }
}

function saveToStorage(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
} //saves that string under our fixed key, overwriting whatever was there before

export const applicationsRepository = {
  //each a function living as a property on that object.
  getAll() {
    return readFromStorage();
  },

  saveAll(applications) {
    saveToStorage(applications);
  },

  create(application) {
    const current = readFromStorage();
    const updated = [...current, application];
    saveToStorage(updated);
    return updated;
  },

  update(id, changes) {
    const current = readFromStorage();
    const updated = current.map((app) =>
      app.id === id ? { ...app, ...changes } : app,
    );
    saveToStorage(updated);
    return updated;
  },

  remove(id) {
    const current = readFromStorage();
    const updated = current.filter((app) => app.id !== id);
    saveToStorage(updated);
    return updated;
  },
};
