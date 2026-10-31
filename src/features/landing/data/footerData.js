// Data holds KEYS. Links that are also in the navbar reuse the navbar keys.
export const footerColumns = [
  {
    id: "product",
    titleKey: "landing.footer.product",
    links: [
      { labelKey: "landing.nav.features", href: "#features" },
      { labelKey: "landing.nav.howItWorks", href: "#how-it-works" },
    ],
  },
  {
    id: "account",
    titleKey: "landing.footer.account",
    links: [
      { labelKey: "landing.nav.login", to: "/login" },
      { labelKey: "landing.nav.signUp", to: "/signup" },
    ],
  },
  {
    id: "legal",
    titleKey: "landing.footer.legal",
    links: [
      { labelKey: "landing.footer.privacy", to: "/privacy" },
      { labelKey: "landing.footer.terms", to: "/terms" },
      { labelKey: "landing.nav.contact", href: "#contact" },
    ],
  },
];
