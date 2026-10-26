import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "../../../components/UI/Button";
import StatusBadge from "../../../components/UI/StatusBadge";

const statusOptions = [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];

function ApplicationCard({ application, onDelete, onEdit, onStatusChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-card sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
      <div>
        <Link
          to={`/app/applications/${application.id}`}
          className="font-heading text-[17px] font-semibold text-navy hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          {application.company}
        </Link>
        <p className="text-sm text-muted">{application.position}</p>
        <p className="mt-0.5 text-[13px] text-muted">
          {t("applications.appliedOn", { date: application.appliedAt })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={application.status} />

        <select
          aria-label={t("applications.changeStatus", {
            company: application.company,
          })}
          className="min-h-11 w-full rounded-control border border-line bg-white px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-brand sm:w-auto"
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {t(`status.${status}`)}
            </option>
          ))}
        </select>

        <div className="flex w-full gap-2 sm:w-auto">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => onEdit(application)}
          >
            {t("common.edit")}
          </Button>
          <Button
            variant="danger"
            className="flex-1 sm:flex-none"
            onClick={() => onDelete(application.id)}
          >
            {t("common.delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
