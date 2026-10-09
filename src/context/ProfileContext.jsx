import { createContext, useContext, useState } from "react";
import { profileRepository } from "../features/profile/data/profileRepository";

// The channel that carries the profile to any component inside the provider.
const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  // Read from localStorage ONCE, when the provider first mounts.
  // Passing a function to useState means React runs it only on the first render.
  // Without the function, getProfile() would run on every render.
  const [profile, setProfile] = useState(() => profileRepository.getProfile());

  // Save to storage first. Update the screen only if the save worked,
  // so what the user sees always matches what is really saved.
  // Returns true/false so the form can show a message if it failed.
  function saveProfile(newProfile) {
    const wasSaved = profileRepository.saveProfile(newProfile);

    if (wasSaved) {
      setProfile(newProfile);
    }

    return wasSaved;
  }

  return (
    <ProfileContext.Provider value={{ profile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Components call this instead of using useContext(ProfileContext) directly.
export function useProfile() {
  const context = useContext(ProfileContext);

  // If someone uses the hook outside the provider, fail loudly with a clear
  // message instead of returning null and crashing later with a confusing error.
  if (context === null) {
    throw new Error("useProfile must be used inside <ProfileProvider>");
  }

  return context;
}
