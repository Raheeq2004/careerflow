import { useTranslation } from "react-i18next";
import { useUpcomingActions } from "../hooks/useUpcomingActions";

// "ar-u-nu-latn" = Arabic words, but Latin digits (2026, not ٢٠٢٦)
function formatDate(date, language) {
  const locale = language === "ar" ? "ar-u-nu-latn" : "en";
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function UpcomingActions() {
  const { t, i18n } = useTranslation();
  const { upcomingActions } = useUpcomingActions();

  // Builds the title from data. Company and position are user data: not translated.
  function getTitle(action) {
    if (action.type === "application") {
      return `${action.company} — ${action.position}`;
    }
    const type = t(`interviews.types.${action.interviewType}`, {
      defaultValue: action.interviewType,
    });
    return action.company
      ? t("dashboard.upcoming.interviewTitle", {
          company: action.company,
          type,
        })
      : t("dashboard.upcoming.interviewTitleNoCompany", { type });
  }

  // Shows what the user wrote; only if empty, uses our own "Follow up" text.
  function getDescription(action) {
    if (action.description) return action.description;
    return action.type === "application"
      ? t("dashboard.upcoming.followUp")
      : "";
  }

  return (
    <section className="overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-heading text-lg font-bold text-navy">
          {t("dashboard.upcoming.title")}
        </h3>
      </div>

      {upcomingActions.length === 0 ? (
        <p className="px-5 py-8 text-center text-muted">
          {t("dashboard.upcoming.empty")}
        </p>
      ) : (
        <div className="divide-y divide-line">
          {upcomingActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start justify-between gap-3 px-5 py-4"
            >
              <div>
                <h4 className="font-semibold text-navy">{getTitle(action)}</h4>
                {getDescription(action) && (
                  <p className="text-sm text-muted">{getDescription(action)}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {action.isOverdue && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-semibold text-navy">
                    <span className="size-2 rounded-full bg-danger" />
                    {t("dashboard.upcoming.overdue")}
                  </span>
                )}
                <p className="text-[13px] text-muted">
                  {formatDate(action.date, i18n.resolvedLanguage)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default UpcomingActions;
