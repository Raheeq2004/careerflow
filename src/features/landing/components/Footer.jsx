import { useTranslation } from "react-i18next";
import Logo from "../../../components/UI/Logo";
import FooterColumn from "./FooterColumn";
import { footerColumns } from "../data/footerData";

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:py-16">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-4 text-sm text-white/70">
            {t("landing.footer.tagline")}
          </p>
          <p className="mt-6 text-xs text-white/60">
            {t("landing.footer.rights", { year })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
          {footerColumns.map((column) => (
            <FooterColumn
              key={column.id}
              title={t(column.titleKey)}
              // we translate the link labels here, so FooterColumn stays unchanged
              links={column.links.map((link) => ({
                ...link,
                label: t(link.labelKey),
              }))}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
