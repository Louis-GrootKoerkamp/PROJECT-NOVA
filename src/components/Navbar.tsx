import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { translations } from "../translations";
import { Language } from "../types";

export const Navbar = ({ onOpenPopup, language, setLanguage }: { onOpenPopup: () => void, language: Language, setLanguage: (l: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "bg-neutral/90 backdrop-blur-md py-4 border-b border-ink/10" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black tracking-tighter text-ink flex items-center gap-1"
        >
          <span className="bg-primary px-2 py-0.5 transform -rotate-2">Studio</span>
          <span className="italic font-serif text-secondary">Nova</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {[
            { key: "work", label: t.work },
            { key: "team", label: t.team },
            { key: "reviews", label: t.local }
          ].map((item) => (
            <a key={item.key} href={`#${item.key}`} className="text-sm font-bold text-ink/70 hover:text-secondary transition-colors tracking-tight uppercase py-2 px-1 focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-4">
              {item.label}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex bg-ink/5 p-1 border border-ink/10 shadow-[2px_2px_0px_0px_rgba(20,20,20,0.1)]">
            <button 
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${language === "en" ? "bg-ink text-neutral" : "text-ink/40 hover:text-ink"}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage("nl")}
              className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${language === "nl" ? "bg-ink text-neutral" : "text-ink/40 hover:text-ink"}`}
            >
              NL
            </button>
          </div>

          <button onClick={onOpenPopup} type="button" className="px-6 py-2 bg-ink text-neutral text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 flex items-center gap-2 group shadow-[4px_4px_0px_0px_#00BCD4]">
            {t.start}
          </button>
        </div>

        <button 
          className="md:hidden text-ink p-2 hover:bg-ink/5 transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-neutral border-t border-ink/10 p-6 flex flex-col gap-6 md:hidden shadow-xl"
        >
          {[
            { key: "work", label: t.work },
            { key: "team", label: t.team },
            { key: "reviews", label: t.local }
          ].map((item) => (
            <a key={item.key} href={`#${item.key}`} className="text-2xl font-black text-ink uppercase tracking-tighter" onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex bg-ink/5 p-1 border border-ink/10 max-w-fit">
            <button 
              onClick={() => setLanguage("en")}
              className={`px-6 py-3 text-sm font-black uppercase transition-all ${language === "en" ? "bg-ink text-neutral" : "text-ink/40 hover:text-ink"}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage("nl")}
              className={`px-6 py-3 text-sm font-black uppercase transition-all ${language === "nl" ? "bg-ink text-neutral" : "text-ink/40 hover:text-ink"}`}
            >
              Nederlands
            </button>
          </div>

          <button onClick={() => { setIsMenuOpen(false); onOpenPopup(); }} type="button" className="w-full py-4 bg-primary text-ink font-black uppercase tracking-widest">
            {t.start}
          </button>
        </motion.div>
      )}
    </nav>
  );
};
