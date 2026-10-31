// A row has EITHER a plain value (the email address: never translated)
// OR a valueKey (a sentence: translated)
export const contactDetails = [
  {
    id: 1,
    icon: "✉️",
    labelKey: "landing.contact.details.email",
    value: "support@careerflow.app",
  },
  {
    id: 2,
    icon: "⏱️",
    labelKey: "landing.contact.details.responseTime",
    valueKey: "landing.contact.details.responseTimeValue",
  },
  {
    id: 3,
    icon: "💬",
    labelKey: "landing.contact.details.feedback",
    valueKey: "landing.contact.details.feedbackValue",
  },
];
