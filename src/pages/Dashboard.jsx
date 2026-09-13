import { useOutletContext } from "react-router";
import StatCard from "../components/StatCard";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { applications } = useOutletContext();

  const total = applications.length;

  const active = applications.filter(
    (app) => app.status !== "rejected" && app.status !== "withdrawn",
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "interview",
  ).length;

  const offers = applications.filter((app) => app.status === "offer").length;

  const rejected = applications.filter(
    (app) => app.status === "rejected",
  ).length;

  const sorted = [...applications].sort((a, b) => {
    return new Date(b.appliedAt) - new Date(a.appliedAt);
  });

  const recentApplications = sorted.slice(0, 3);

  return (
    <div>
      <section className={styles.dashboardStats}>
        <StatCard number={total} label="Total Applications" />
        <StatCard number={active} label="Active Applications" />
        <StatCard number={interviews} label="Interviews" />
        <StatCard number={offers} label="Offers" />
        <StatCard number={rejected} label="Rejected" />
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-bold mb-4">Recent Applications</h2>

        {recentApplications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No applications yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{application.company}</h3>
                  <p className="text-gray-600 text-sm">
                    {application.position}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize bg-gray-200 text-gray-700">
                    {application.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {application.appliedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
