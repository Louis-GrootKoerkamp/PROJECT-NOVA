import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { translations } from "../translations";
import { Language } from "../types";

export const Footer = ({ onOpenPopup, language, isMobile }: { onOpenPopup: () => void, language: Language, isMobile: boolean }) => {
  const t = translations[language].footer;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <footer id="hi" className="bg-neutral pt-32 pb-12 border-t-4 border-ink">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-2xl">
            <h2 className="text-7xl md:text-9xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-12">
              {t.title_part1} <br /> <span className="text-primary italic font-serif">{t.title_craft}</span>
            </h2>
            <p className="text-xl text-ink/60 font-serif italic mb-8 max-w-xl leading-relaxed">
              {t.description}
            </p>
            <div className="relative flex gap-6 mt-12">
              
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onOpenPopup} 
                type="button" 
                className="px-12 py-6 bg-secondary text-neutral font-black uppercase tracking-widest hover:bg-ink transition-all duration-300 text-xl shadow-[8px_8px_0px_0px_#141414]"
              >
                {t.cta}
              </button>
              <AnimatePresence>
                {(isHovered || isMobile) && (
                  <motion.div
                    initial={isMobile ? { opacity: 0, scale: 0.5, y: 0, rotate: -10 } : { opacity: 0, scale: 0.5, y: 20, rotate: -10 }}
                    whileInView={isMobile ? { opacity: 1, scale: 1, y: -45, rotate: 4 } : {}}
                    animate={!isMobile ? { opacity: 1, scale: 1, y: -40, rotate: 4 } : {}}
                    viewport={{ once: true, margin: "-100px" }}
                    exit={{ opacity: 0, scale: 0.5, y: 10, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute -top-16 left-0 bg-primary text-ink text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-2 border-2 border-ink shadow-[4px_4px_0px_0px_#141414] z-40 whitespace-nowrap pointer-events-none"
                  >
                    {t.cta_subtitle}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex gap-24">
            <div>
              <h3 className="text-ink font-black uppercase tracking-widest text-xs mb-8 border-b-2 border-primary inline-block">{t.nav}</h3>
              <ul className="flex flex-col gap-4">
                {[
                  { key: "work", label: t.links[0] },
                  { key: "team", label: t.links[1] },
                  { key: "reviews", label: t.links[2] }
                ].map((item) => (
                  <li key={item.key}>
                    <a 
                      href={`#${item.key}`} 
                      className="text-ink/60 hover:text-secondary transition-colors font-bold uppercase text-sm tracking-tighter"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-ink/10 gap-8">
          <div className="text-ink/40 text-[10px] font-black uppercase tracking-[0.3em]">
            {t.copyright}
          </div>
          <div className="flex gap-8">
          </div>
        </div>
      </div>
    </footer>
  );
};
