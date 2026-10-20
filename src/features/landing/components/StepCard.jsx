//draws one step card
//Receives (props)	number, title, description
function StepCard({ number, title, description }) {
  return (
    <li className="rounded-card border border-line bg-page p-6">
      <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
        {number}
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </li>
  );
}

export default StepCard;
