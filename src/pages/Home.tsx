import MenuListComposition from "../components/Navbar";
import Hero from "../components/Hero";
import EventGallery from "../components/EventGallery/EventGallery";
import AboutSection from "../components/AboutSection/AboutSection";
import Footer from "../components/Footer";
import useSectionAutoScroll from "../hooks/useSectionAutoScroll";

function Home() {
  // Auto-scroll between sections on scroll gestures (wheel, touch, keyboard)
  useSectionAutoScroll(["hero", "events", "about", "footer"]);

  return (
    <div>
      <MenuListComposition />
      <main id="main-content">
        {/* Frame 01: Hero */}
        <Hero />

        {/* Frame 02: Ideas in action (Event Gallery) */}
        <EventGallery />

        {/* Frame 03: About Our Chapter */}
        <AboutSection />
      </main>

      {/* Frame 04: Contact & Footer */}
      <Footer />
    </div>
  );
}

export default Home;
