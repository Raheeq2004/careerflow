import { useUpcomingActions } from "../hooks/useUpcomingActions";

function formatDate(date) {
  //turns it into a readable string
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

//call the hook
function UpcomingActions() {
  const { upcomingActions } = useUpcomingActions();

  return (
    <section className="overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-heading text-lg font-bold text-navy">
          Upcoming Actions
        </h3>
      </div>

      {upcomingActions.length === 0 ? (
        <p className="px-5 py-8 text-center text-muted">
          Nothing upcoming right now.
        </p>
      ) : (
        <div className="divide-y divide-line">
          {upcomingActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start justify-between gap-3 px-5 py-4"
            >
              <div>
                <h4 className="font-semibold text-navy">{action.title}</h4>
                {action.description && (
                  <p className="text-sm text-muted">{action.description}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {action.isOverdue && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-semibold text-navy">
                    <span className="size-2 rounded-full bg-danger" />
                    Overdue
                  </span>
                )}
                <p className="text-[13px] text-muted">
                  {formatDate(action.date)}
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
