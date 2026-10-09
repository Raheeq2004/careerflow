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
    <section className="mt-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Actions</h2>

      {upcomingActions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Nothing upcoming right now.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {upcomingActions.map((action) => (
            <div
              key={action.id}
              className={`bg-white border rounded-lg p-4 flex justify-between items-center ${
                action.isOverdue ? "border-red-300" : "border-gray-200"
              }`}
            >
              <div>
                <h3 className="font-bold">{action.title}</h3>
                {action.description && (
                  <p className="text-gray-600 text-sm">{action.description}</p>
                )}
              </div>
              <div className="text-right">
                {action.isOverdue && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 mb-1">
                    Overdue
                  </span>
                )}
                <p className="text-xs text-gray-400">
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
