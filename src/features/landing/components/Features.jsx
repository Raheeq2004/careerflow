import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import FeatureCard from "./FeatureCard";
import { featureItems } from "../data/featuresData";

function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="scroll-mt-20 bg-page py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("landing.features.eyebrow")}
          title={t("landing.features.title")}
          description={t("landing.features.description")}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
