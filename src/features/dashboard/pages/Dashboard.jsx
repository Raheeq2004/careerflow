import { Link } from "react-router";
import { useApplicationsFeature } from "../../applications/hooks/useApplicationsFeature";
import StatCard from "../../../components/UI/StatCard";
import StatusBadge from "../../../components/UI/StatusBadge";
import UpcomingActions from "../components/UpcomingActions";
import { useTranslation } from "react-i18next";

function Dashboard() {
     const { t } = useTranslation();

     
  const { applications } = useApplicationsFeature();

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-navy md:text-h2">
            {t("dashboard.title")}
          </h2>
          <p className="mt-1 text-muted">{t("dashboard.subtitle")}</p>
        </div>

        <Link
          to="/app/applications"
          className="inline-flex min-h-11 items-center rounded-control border border-line bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-page focus-visible:outline-2 focus-visible:outline-brand"
        >
          {t("dashboard.viewAllApplications")}
        </Link>
      </div>

      <section className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
        <StatCard number={total} label={t("dashboard.stats.total")} />
        <StatCard
          number={active}
          label={t("dashboard.stats.active")}
          tone="brand"
        />
        <StatCard
          number={interviews}
          label={t("dashboard.stats.interviews")}
          tone="accent"
        />
        <StatCard
          number={offers}
          label={t("dashboard.stats.offers")}
          tone="success"
        />
        <StatCard
          number={rejected}
          label={t("dashboard.stats.rejected")}
          tone="danger"
        />
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <section className="overflow-hidden rounded-card border border-line bg-white shadow-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h3 className="font-heading text-lg font-bold text-navy">
              {t("dashboard.recent.title")}
            </h3>
            <Link
              to="/app/applications"
              className="text-sm font-semibold text-brand hover:text-brand-hover"
            >
              {t("dashboard.recent.viewAll")}
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <p className="px-5 py-8 text-center text-muted">
              yet. {t("dashboard.recent.empty")}
            </p>
          ) : (
            <div className="divide-y divide-line">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div>
                    <h4 className="font-semibold text-navy">
                      {application.company}
                    </h4>
                    <p className="text-sm text-muted">{application.position}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted">
                      {application.appliedAt}
                    </span>
                    <StatusBadge status={application.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <UpcomingActions />
      </div>
    </div>
  );
}

export default Dashboard;
