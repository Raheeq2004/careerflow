import Logo from "../../../components/UI/Logo";
//Role: the left gradient panel on desktop.

const panelCards = [
  {
    id: "interview",
    title: "Frontend Developer",
    detail: "Acme Studio · Remote",
    badge: "Interview",
  },
  {
    id: "offer",
    title: "New offer received",
    detail: "Bluepeak · Remote",
    dotClass: "bg-warn",
    className: "ml-16",
  },
];

function AuthSidePanel({ title, description }) {
  return (
    <aside className="hidden bg-brand-gradient p-12 text-white lg:flex lg:flex-col">
      <Logo tone="light"  to="/" />

      <div className="my-auto max-w-md">
        <h2 className="font-heading text-h2 font-bold">{title}</h2>
        <p className="mt-3 text-white/80">{description}</p>

        <ul className="mt-8 flex flex-col gap-3">
          {panelCards.map((card) => (
            <li
              key={card.id}
              className={`flex w-fit items-center gap-3 rounded-card bg-white px-4 py-3 text-ink shadow-float ${card.className ?? ""}`}
            >
              {card.dotClass && (
                <span
                  className={`size-3 rounded-full ${card.dotClass}`}
                  aria-hidden="true"
                />
              )}
              <div>
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="text-xs text-muted">{card.detail}</p>
              </div>
              {card.badge && (
                <span className="ml-4 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
                  {card.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default AuthSidePanel;
