import SectionHeading from "./SectionHeading";
import FeatureCard from "./FeatureCard";
import { featureItems } from "../data/featuresData";

function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-page py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to stay organised"
          description="Six focused tools that cover the whole job search."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
//the section: assembles the heading and the six cards
//Sends (props)	to SectionHeading: eyebrow, title, description. To each FeatureCard: icon, title, description
//.map loops over the array and returns one <FeatureCard> per item.
//feature is the current object.