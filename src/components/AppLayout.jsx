import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { applicationsRepository } from "../data/applicationsRepository";

function AppLayout() {
  const [applications, setApplications] = useState(() =>
    applicationsRepository.getAll(),
  );

  useEffect(() => {
    applicationsRepository.saveAll(applications);
  }, [applications]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-4 flex-1">
          <Outlet context={{ applications, setApplications }} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
