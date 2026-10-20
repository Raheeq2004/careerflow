import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import HowItWorks from "./components/HowItWorks";

import Features from "./components/Features";

import Contact from "./components/Contact";

import Footer from "./components/Footer";

function LandingPage() {
  return (
    <div className="font-sans text-ink">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
//Makes this function available to App.js
//every section has an id so the link can reach it 

//The id="home" now lives inside Hero.jsx, so the nav link still finds it.