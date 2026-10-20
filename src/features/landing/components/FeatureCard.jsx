function FeatureCard({ icon, title, description }) {
  return (
    <li className="rounded-card border border-line bg-white p-6 shadow-card">
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-control bg-brand-soft"
      >
        {icon}
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </li>
  );
}

export default FeatureCard;
//Role	draws one feature card
//Receives (props)	icon, title, description
//span :The icon box