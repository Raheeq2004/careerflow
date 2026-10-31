import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import StepCard from "./StepCard";
import { howItWorksSteps } from "../data/howItWorksData";

function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("landing.howItWorks.eyebrow")}
          title={t("landing.howItWorks.title")}
          description={t("landing.howItWorks.description")}
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <StepCard
              key={step.id}
              number={index + 1}
              title={t(step.titleKey)}
              description={t(step.descriptionKey)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
