import { lazy } from "react";
import { Routes, Route } from "react-router";
import AppLayout from "./components/UI/AppLayout";
import NotFound from "./pages/NotFound";

// Route-level code splitting: each page is downloaded only when its route is opened.
const Dashboard = lazy(() => import("./features/dashboard/pages/Dashboard"));
const ApplicationsPage = lazy(
  () => import("./features/applications/pages/ApplicationsPage"),
);
const ApplicationDetailsPage = lazy(
  () => import("./features/applications/pages/ApplicationDetailsPage"),
);


const ProfilePage = lazy(() => import("./features/profile/pages/ProfilePage"));


function App() {
  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route
          path="applications/:applicationId"
          element={<ApplicationDetailsPage />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
