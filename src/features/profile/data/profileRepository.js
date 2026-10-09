import { emptyProfile, profileSchema } from "./profileSchema";

// The only file in the app allowed to read or write profile data in localStorage.
// "v1" is a version: if the profile shape changes later, we can use "v2"
// and migrate, without crashing on old saved data.
const STORAGE_KEY = "careerflow.profile.v1";

// Read the saved profile, and never trust it.
// localStorage is just text that the user (or a browser extension) can edit,
// so the saved value can be missing, broken JSON, or have unsafe links.
function readFromStorage() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);

    // Nothing saved yet (first visit): normal case, not an error.
    if (!rawValue) {
      return emptyProfile;
    }

    // Text -> object. Throws if the text is not valid JSON.
    const parsed = JSON.parse(rawValue);

    // Fill in any missing fields (for example, a field we added later),
    // then check every field with the same schema the form uses.
    const result = profileSchema.safeParse({ ...emptyProfile, ...parsed });

    if (!result.success) {
      console.error("Invalid profile data in localStorage:", result.error);
      return emptyProfile;
    }

    // result.data only contains the fields in the schema,
    // so unknown extra keys in storage are dropped.
    return result.data;
  } catch (error) {
    // Broken JSON, or localStorage not available (some private modes).
    console.error("Could not read profile from localStorage:", error);
    return emptyProfile;
  }
}

// Save the profile. Returns true if it worked, false if it failed,
// so the UI can show an error instead of pretending it was saved.
// setItem can throw when the storage is full or blocked.
function writeToStorage(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error("Could not save profile to localStorage:", error);
    return false;
  }
}

// The profile is ONE object (not a list like applications),
// so we only need "get" and "save". There are no ids and no create/update/remove.
//
// Time complexity: the work depends only on the 7 fields, never on how many
// applications exist, so it is O(1) for practical purposes.
// Call getProfile() once when the app starts (as the initial state of the
// context), not on every render. Reading and parsing storage is the slow part.
export const profileRepository = {
  getProfile() {
    return readFromStorage();
  },

  saveProfile(profile) {
    return writeToStorage(profile);
  },
};
