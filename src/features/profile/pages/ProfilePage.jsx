import { useState } from "react";
import { useProfile } from "../../../context/ProfileContext";
import ProfileForm from "../components/ProfileForm";

const LINKS = [
  { key: "linkedinUrl", label: "LinkedIn" },
  { key: "portfolioUrl", label: "Portfolio" },
  { key: "githubUrl", label: "GitHub" },
];

function ProfilePage() {
  const { profile, saveProfile } = useProfile();
  const [saveStatus, setSaveStatus] = useState(null);

  function handleSubmit(data) {
    const wasSaved = saveProfile(data);
    setSaveStatus(wasSaved ? "saved" : "error");
    return wasSaved;
  }

  // Only show links the user actually filled in.
  const savedLinks = LINKS.filter((link) => profile[link.key]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Profile</h2>
      <p className="text-gray-600 text-sm mb-4">
        Saved only on this device. CareerFlow has no account or server.
      </p>

      <ProfileForm
        initialData={profile}
        onSubmit={handleSubmit}
        saveStatus={saveStatus}
      />

      {savedLinks.length > 0 && (
        <section className="mt-6">
          <h3 className="font-bold mb-2">Your links</h3>
          <ul className="flex flex-col gap-1">
            {savedLinks.map((link) => (
              <li key={link.key}>
                {/* rel="noopener noreferrer": the new tab cannot access this page. */}
                <a
                  href={profile[link.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ProfilePage;
