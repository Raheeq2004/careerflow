//Nothing but data. The texts are KEYS, read from the dictionary when drawn.
export const heroStats = [
  { labelKey: "landing.hero.stats.applied", value: 12, tone: "brand" },
  { labelKey: "landing.hero.stats.interviews", value: 3, tone: "accent" },
  { labelKey: "landing.hero.stats.offer", value: 1, tone: "warn" },
];

export const heroApplications = [
  {
    id: 1,
    roleKey: "landing.hero.apps.frontendRole",
    companyKey: "landing.hero.apps.frontendCompany",
    status: "interview",
  },
  {
    id: 2,
    roleKey: "landing.hero.apps.reactRole",
    companyKey: "landing.hero.apps.reactCompany",
    status: "applied",
  },
];
//id is there so each row has a unique key when mapped
