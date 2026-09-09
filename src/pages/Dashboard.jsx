import { useOutletContext } from "react-router";
import StatCard from "../components/StatCard";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { applications } = useOutletContext();

  return (
    <section className={styles.dashboardStats}>
      <StatCard number={applications.length} label="Total Applications" />
      <StatCard
        number={applications.filter((app) => app.status === "interview").length}
        label="Interviews"
      />
      <StatCard
        number={applications.filter((app) => app.status === "rejected").length}
        label="Rejected"
      />
    </section>
  );
}

export default Dashboard;
