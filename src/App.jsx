import { Routes, Route } from "react-router";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ApplicationsPage from "./pages/ApplicationsPage";
import CreateApplicationPage from "./pages/CreateApplicationPage";
import EditApplicationPage from "./pages/EditApplicationPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="applications/new" element={<CreateApplicationPage />} />
        <Route
          path="applications/:applicationId/edit"
          element={<EditApplicationPage />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
