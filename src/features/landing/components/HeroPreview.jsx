import { useTranslation } from "react-i18next";
import FloatingNotice from "./FloatingNotice";
import { heroStats, heroApplications } from "../data/heroData";
//heroData.js → HeroPreview :--this is data for 2 arrays

//objects defined once outside the component
//so when the design changes , edit the object not every data item
const toneText = {
  brand: "text-brand",
  accent: "text-accent",
  warn: "text-warn",
};

// The keys are the STORED status values (lowercase), the same as in the real app.
// The shown word comes from the dictionary: status.*
const statusStyles = {
  interview: "bg-accent text-white",
  applied: "bg-brand text-white",
  offer: "bg-warn text-white",
};

function HeroPreview() {
  const { t } = useTranslation();

  return (
    <div className="relative rounded-3xl bg-brand-gradient px-4 py-14 sm:px-10">
      <div className="rounded-card bg-white p-5 shadow-elevated">
        <h2 className="font-heading text-h3 font-bold text-navy">
          {t("landing.hero.thisWeek")}
        </h2>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {heroStats.map((stat) => (
            <div key={stat.labelKey} className="rounded-control bg-page p-3">
              <p
                className={`font-heading text-2xl font-bold ${toneText[stat.tone]}`}
              >
                {stat.value}
              </p>
              <p className="text-sm text-muted">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

        <ul className="mt-4 flex flex-col gap-3">
          {heroApplications.map((app) => (
            <li
              key={app.id}
              className="flex items-center justify-between gap-3 rounded-control border border-line p-3"
            >
              <div>
                <p className="text-[15px] font-semibold text-ink">
                  {t(app.roleKey)}
                </p>
                <p className="text-sm text-muted">{t(app.companyKey)}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[app.status]}`}
              >
                {t(`status.${app.status}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <FloatingNotice
        title={t("landing.hero.notices.interviewTitle")}
        detail={t("landing.hero.notices.interviewDetail")}
        dotClass="bg-accent"
        className="inset-s-3 top-3 lg:-inset-s-10 lg:top-0"
      />
      <FloatingNotice
        title={t("landing.hero.notices.offerTitle")}
        detail={t("landing.hero.notices.offerDetail")}
        dotClass="bg-warn"
        className="bottom-3 inset-e-3 lg:bottom-6 lg:inset-e-6"
      />
    </div>
  );
}

export default HeroPreview;
