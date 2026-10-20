function ContactInfoItem({ icon, label, value }) {
  return (
    <li className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-control bg-brand-soft"
      >
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-semibold text-navy">{value}</p>
      </div>
    </li>
  );
}

export default ContactInfoItem;
//draws one info row: icon box + small label + bold value
//Receives (props)	icon, label, value