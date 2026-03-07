import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import TrustedBy from "./components/sections/TrustedBy";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Services from "./components/sections/Services";
import ProjectsPreview from "./components/sections/ProjectsPreview";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Skills />
      <ProjectsPreview />
      <Contact />
      <Footer />
    </main>
  );
}