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

const statusStyles = {
  Interview: "bg-accent text-white",
  Applied: "bg-brand text-white",
  Offer: "bg-warn text-white",
};
//div 3 for the 3 grid in the left , and the data comes from heredata
function HeroPreview() {
  return (
    <div className="relative rounded-3xl bg-brand-gradient px-4 py-14 sm:px-10">
      <div className="rounded-card bg-white p-5 shadow-elevated">
        <h2 className="font-heading text-h3 font-bold text-navy">This week</h2>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-control bg-page p-3">
              <p
                className={`font-heading text-2xl font-bold ${toneText[stat.tone]}`}
              >
                {stat.value}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-4 flex flex-col gap-3">
          {heroApplications.map(
            (
              app, //map through the second array
            ) => (
              <li
                key={app.id}
                className="flex items-center justify-between gap-3 rounded-control border border-line p-3"
              >
                <div>
                  <p className="text-[15px] font-semibold text-ink">
                    {app.role}
                  </p>
                  <p className="text-sm text-muted">{app.company}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[app.status]}`} //statusStyles["Interview"] object is at the top for the style
                >
                  {app.status}
                </span>
              </li>
            ),
          )}
        </ul>
      </div>

      <FloatingNotice
        title="Interview tomorrow"
        detail="10:00 · Acme Studio"
        dotClass="bg-accent"
        className="left-3 top-3 lg:-left-10 lg:top-0"
      />
      <FloatingNotice
        title="New offer received"
        detail="Bluepeak · Remote"
        dotClass="bg-warn"
        className="bottom-3 right-3 lg:bottom-6 lg:right-6"
      />
    </div>
  );
}

export default HeroPreview;

//<FloatingNotice props from that file