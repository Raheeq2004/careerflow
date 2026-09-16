//Separate "how data is shared" from "what to do with that data."

import { useSearchParams } from "react-router";
import { useApplications } from "./ApplicationsContext";

export function useApplicationsFeature() {
  const { applications, setApplications } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const workModeFilter = searchParams.get("workMode") || "";
  const sortBy = searchParams.get("sortBy") || "newest";

  function updateParam(key, value) {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }

  function clearFilters() {
    setSearchParams({});
  }

  function deleteApplication(id) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }

  function changeStatus(id, newStatus) {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: newStatus, updatedAt: new Date().toISOString() }
          : app,
      ),
    );
  }

  function submitApplication(formData, editingApplication) {
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

  const searchedApplications = applications.filter((app) => {
    const companyMatch = app.company
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const positionMatch = app.position
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return companyMatch || positionMatch;
  });

  const filteredApplications = searchedApplications.filter((app) => {
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    const matchesWorkMode = workModeFilter
      ? app.workMode === workModeFilter
      : true;
    return matchesStatus && matchesWorkMode;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.appliedAt) - new Date(a.appliedAt);
    if (sortBy === "oldest")
      return new Date(a.appliedAt) - new Date(b.appliedAt);
    if (sortBy === "recentlyUpdated")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sortBy === "companyAZ") return a.company.localeCompare(b.company);
    return 0;
  });

  const hasActiveFilters =
    searchText || statusFilter || workModeFilter || sortBy !== "newest";

  return {
    applications,
    sortedApplications,
    searchText,
    statusFilter,
    workModeFilter,
    sortBy,
    hasActiveFilters,
    updateParam,
    clearFilters,
    deleteApplication,
    changeStatus,
    submitApplication,
  };
}
