import { useApplicationsFeature } from "../../applications/hooks/useApplicationsFeature";
import { useInterviewsFeature } from "../../interviews/hooks/useInterviewsFeature";

export function useUpcomingActions() {
  const { applications } = useApplicationsFeature(); //pulls applications
  const { interviews } = useInterviewsFeature(); //pulls interviews

  const now = new Date(); //to decide overdue vs. not.

  // Applications with a next action date become one "action item"
  const applicationActions = applications
    .filter((app) => app.nextActionAt) //keep only applications that actually have a nextActionAt date set — skip the rest.
    //takes every application that survived the .filter() and transforms it into a new, different-shaped object
    .map((app) => ({
      id: `app-${app.id}`, //Prefixing keeps every item's id guaranteed unique.
      type: "application",
      applicationId: app.id,
      title: `${app.company} — ${app.position}`, //Builds a readable label by combining two fields from the original application
      description: app.nextActionDescription || "Follow up",
      date: new Date(app.nextActionAt),
      isOverdue: new Date(app.nextActionAt) < now,
      //onverts the stored date (a plain string like "2026-09-28") into an actual JavaScript Date object — needed so it can later be compared (isOverdue)
    })); //pure date comparison: is this date in the past?

  // Interviews that are still upcoming (not finished/cancelled) become action items too
  const interviewActions = interviews
    .filter(
      (interview) =>
        interview.scheduledAt && //not empty
        interview.status !== "Completed" &&
        interview.status !== "Cancelled",
    )
    //iza kan completed or canceled , y3ni not upcoming , so no need to keep and show it

    .map((interview) => {
      const application = applications.find(
        //searches through the applications array and returns the first one whose id matches this interview's applicationId
        (app) => app.id === interview.applicationId,
      );
      return {
        id: `interview-${interview.id}`,
        type: "interview",
        applicationId: interview.applicationId,
        title: application //to avoid crashing if application wasn't found.
          ? `${application.company} — ${interview.type} Interview`
          : `${interview.type} Interview`,
        description: interview.interviewer || "",
        date: new Date(interview.scheduledAt),
        isOverdue: new Date(interview.scheduledAt) < now,
      };
    });
  //unpacks both arrays and combines their items into one single new array.
  const upcomingActions = [...applicationActions, ...interviewActions].sort(
    (a, b) => a.date - b.date,
  );

  return { upcomingActions };
}
