import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { translations } from "../translations";
import { Language } from "../types";

export const SprintSection = ({ language, onOpenPopup }: { language: Language, onOpenPopup: () => void }) => {
  const t = translations[language].sprint;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="sprint" className="py-32 bg-ink text-neutral relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              <span className="text-neutral/40 block text-2xl md:text-4xl">{t.title_part1}</span>
              <span className="text-secondary">{t.title_week}</span> <br />
              <span className="italic font-serif text-tertiary lowercase">{t.title_part2}</span>
            </h2>
          </motion.div>
          
          <div className="relative group">
            <motion.button 
              onClick={onOpenPopup}
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 md:w-44 md:h-44 bg-primary rounded-full flex items-center justify-center border-[8px] border-neutral relative cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full border-2 border-ink m-[-2px]" />
              <div className="text-ink font-black text-center text-xs md:text-base uppercase leading-tight px-4 whitespace-normal relative z-10 tracking-tighter">
                {t.cta}
              </div>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
          {/* Progress Line Background */}
          <div className="absolute top-0 md:top-[28px] left-[15px] md:left-0 w-[2px] md:w-full h-full md:h-[2px] bg-neutral/10 z-0" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ 
              scaleX: scrollYProgress,
              originX: 0
            }}
            className="hidden md:block absolute top-[28px] left-0 w-full h-[2px] bg-primary z-10"
          />
          <motion.div 
            style={{ 
              scaleY: scrollYProgress,
              originY: 0
            }}
            className="md:hidden absolute top-0 left-[15px] w-[2px] h-full bg-primary z-10"
          />
          
          {t.days.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-20 bg-neutral/5 border border-neutral/10 p-6 md:p-8 hover:bg-neutral/10 transition-colors group ml-8 md:ml-0"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  initial={{ scale: 0.8, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileInView={{ 
                    scale: 1, 
                    backgroundColor: "var(--color-primary, #C6FF00)",
                    transition: { delay: idx * 0.2 + 0.3 }
                  }}
                  className="w-3 h-3 rounded-full border-2 border-ink md:-ml-[7px] relative z-30" 
                />
                <span className="text-xs font-black uppercase tracking-widest text-primary">{item.day}</span>
              </div>
              <h4 className="text-2xl font-black uppercase mb-4 group-hover:text-secondary transition-colors">{item.title}</h4>
              <p className="font-serif italic text-neutral/60 leading-relaxed text-sm">
                {item.desc}
              </p>

              {/* Animated Feedback Popup for 'The Design' stage */}
              {idx === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, y: -20, rotate: 4 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: idx * 0.2 + 0.6, type: "spring", stiffness: 200, damping: 12 }}
                  className="absolute -top-6 right-[-10px] md:-right-6 bg-secondary text-ink text-[9px] md:text-[11px] font-black tracking-widest px-3 py-2 border-2 border-ink shadow-[4px_4px_0px_0px_#141414] z-50 whitespace-nowrap pointer-events-none"
                >
                  {t.feedback_popup}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
