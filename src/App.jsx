import { Routes, Route } from "react-router";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ApplicationsPage from "./pages/ApplicationsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="applications" element={<ApplicationsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
