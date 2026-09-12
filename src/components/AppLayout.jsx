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

  function handleDelete(id) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }

  function handleStatusChange(id, newStatus) {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app,
      ),
    );
  }

  function handleFormSubmit(formData, editingApplication) {
    if (editingApplication) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingApplication.id
            ? { ...app, ...formData, updatedAt: new Date().toISOString() }
            : app,
        ),
      );
    } else {
      const newApplication = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setApplications((prev) => [...prev, newApplication]);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-4 flex-1">
          <Outlet
            context={{
              applications,
              onDelete: handleDelete,
              onStatusChange: handleStatusChange,
              onFormSubmit: handleFormSubmit,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
