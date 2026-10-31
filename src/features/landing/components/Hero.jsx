import { useTranslation } from "react-i18next";
import LandingButton from "./LandingButton";
import HeroPreview from "./HeroPreview";

function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="scroll-mt-20 bg-page">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
            <span className="size-2 rounded-full bg-brand" />
            {t("landing.hero.badge")}
          </span>

          <h1 className="font-heading text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.1] font-extrabold text-navy">
            {t("landing.hero.title")}
          </h1>

          <p className="max-w-md text-lg text-muted">
            {t("landing.hero.text")}
          </p>

          <div className="flex flex-wrap gap-3">
            <LandingButton to="/signup">
              {t("landing.hero.ctaPrimary")}
            </LandingButton>
            <LandingButton href="#how-it-works" variant="outline">
              {t("landing.hero.ctaSecondary")}
            </LandingButton>
          </div>

          <p className="text-sm text-muted">{t("landing.hero.note")}</p>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

export default Hero;
