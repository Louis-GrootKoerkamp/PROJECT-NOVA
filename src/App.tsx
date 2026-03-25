import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WorkSection } from "./components/WorkSection";
import { HowWeRoll } from "./components/HowWeRoll";
import { TeamSection } from "./components/TeamSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { SprintSection } from "./components/SprintSection";
import { PackagesSection } from "./components/PackagesSection";
import { Footer } from "./components/Footer";
import { BookingPopup } from "./components/BookingPopup";

// Types
import { Language } from "./types";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("nl");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Only enable custom cursor on devices with hover capability
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    const cursor = document.getElementById("cursor");
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="bg-neutral text-ink selection:bg-primary selection:text-ink overflow-x-hidden">
      <Navbar onOpenPopup={() => setIsPopupOpen(true)} language={language} setLanguage={setLanguage} />
      <main>
        <Hero onOpenPopup={() => setIsPopupOpen(true)} language={language} isMobile={isMobile} />
        <WorkSection language={language} isMobile={isMobile} />
        <HowWeRoll language={language} />
        <TeamSection language={language} isMobile={isMobile} />
        <ReviewsSection language={language} isMobile={isMobile} />
        <SprintSection language={language} onOpenPopup={() => setIsPopupOpen(true)} />
        <PackagesSection language={language} onOpenPopup={() => setIsPopupOpen(true)} />
      </main>
      <Footer onOpenPopup={() => setIsPopupOpen(true)} language={language} isMobile={isMobile} />
      
      <AnimatePresence>
        <BookingPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} language={language} />
      </AnimatePresence>
      
      {/* Custom Cursor */}
      <div 
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 border-2 border-ink rounded-full pointer-events-none z-[99999] -ml-5 -mt-5 bg-tertiary mix-blend-multiply" 
        id="cursor" 
      />
    </div>
  );
}
