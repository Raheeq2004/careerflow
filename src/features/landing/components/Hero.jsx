import LandingButton from "./LandingButton";
import HeroPreview from "./HeroPreview";

function Hero() {
  return (
    <section id="home" className="scroll-mt-20 bg-page">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
            <span className="size-2 rounded-full bg-brand" />
            Your personal job-search tracker
          </span>

          <h1 className="font-heading text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.1] font-extrabold text-navy">
            Keep every job application in one calm place
          </h1>

          <p className="max-w-md text-lg text-muted">
            CareerFlow helps you track applications, plan interviews and see
            your progress at a glance. No spreadsheets, no lost emails.
          </p>

          <div className="flex flex-wrap gap-3">
            <LandingButton to="/signup">Create free account</LandingButton>
            <LandingButton href="#how-it-works" variant="outline">
              See how it works
            </LandingButton>
          </div>
            
          <p className="text-sm text-muted">
            Free to use · Your data stays on your device
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

export default Hero;


//  <LandingButton to="/signup">Create free account</LandingButton>:-- this is prop from landing button
//<LandingButton href="#how-it-works" variant="outline"> :--prop from landing butoon