import SectionHeading from "./SectionHeading";
import StepCard from "./StepCard";
import { howItWorksSteps } from "../data/howItWorksData";
//the section: assembles the heading and the cards


function HowItWorks() {
  return (
    <section id="how-it-worssks" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From first application to final offer in three steps"
          description="Set up in under a minute. Nothing to install and no account details to share."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <StepCard
              key={step.id}
              number={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
//Sends (props)	to SectionHeading: eyebrow, title, description. To each StepCard: number, title, description