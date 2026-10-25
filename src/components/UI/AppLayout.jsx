import { Suspense } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ApplicationsProvider } from "../../context/ApplicationsContext";
import { InterviewsProvider } from "../../context/InterviewsContext";
import { ProfileProvider } from "../../context/ProfileContext";

function AppLayout() {
  return (
    <ApplicationsProvider>
      <InterviewsProvider>
        <ProfileProvider>
          <div className="flex min-h-screen flex-col bg-page font-sans text-ink md:flex-row">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 p-4 md:p-6">
                <Suspense fallback={<p className="text-muted">Loading...</p>}>
                  <Outlet />
                </Suspense>
              </main>
            </div>
          </div>
        </ProfileProvider>
      </InterviewsProvider>
    </ApplicationsProvider>
  );
}

export default AppLayout;
