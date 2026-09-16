import { Outlet } from "react-router";
//Outlet still needed, since it's still the mechanism that decides which page renders based on the current URL
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ApplicationsProvider } from "../context/ApplicationsContext";

function AppLayout() {
  return (
    //everything is now nested inside the app porvider ,
    //why this ? bcz only components rendered inside <ApplicationsProvider> can access applications/setApplications via useApplications()
    <ApplicationsProvider>
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="p-4 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </ApplicationsProvider>
  );
}

export default AppLayout;
