import Logo from "../../../components/UI/Logo";
import FooterColumn from "./FooterColumn";
import { footerColumns } from "../data/footerData";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:py-16">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-4 text-sm text-white/70">
            A calm, private place to track your job search.
          </p>
          <p className="mt-6 text-xs text-white/60">
            © {year} CareerFlow. All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
          {footerColumns.map((column) => (
            <FooterColumn
              key={column.id}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
