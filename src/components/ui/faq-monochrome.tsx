import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { translations } from "../../translations";
import { Language } from "../../types";

export function FAQSectionNew({ language }: { language: Language }) {
  const t = translations[language].faq;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => setActiveIndex((prev) => (prev === index ? null : index));

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <section id="faq" className="relative py-24 bg-neutral/50 overflow-hidden">
      {/* Subtle Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse 50% 100% at 10% 0%, rgba(0, 188, 212, 0.05), transparent 65%)' }} />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12">
        <header className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-ink uppercase tracking-tighter leading-none mb-6">
              Heldere <span className="italic font-serif font-normal text-secondary">Antwoorden.</span>
            </h2>
            <p className="text-lg md:text-xl text-ink/40 font-serif italic max-w-xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
        </header>

        <ul className="space-y-4 max-w-4xl mx-auto">
          {t.questions.map((item, index) => {
            const open = activeIndex === index;
            
            return (
              <motion.li
                key={index}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
                className={`group relative overflow-hidden rounded-sm border-2 transition-all duration-300 ${
                  open 
                    ? "bg-white border-ink shadow-[6px_6px_0px_0px_#141414] -rotate-1 z-20" 
                    : "bg-transparent border-ink/10 hover:border-ink/20 hover:bg-white/30 z-10"
                }`}
              >
                {/* Subtle Glow Effect */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${
                      open ? 'rgba(0, 188, 212, 0.05)' : 'rgba(20,20,20,0.02)'
                    }, transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-center gap-6 px-6 py-8 md:px-10 md:py-10 text-left transition-colors duration-300"
                >
                  <div className="flex-1">
                    <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight text-ink transition-all duration-300 ${open ? 'translate-x-1' : ''}`}>
                      {item.q}
                    </h3>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.3, delay: 0.1 }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="font-serif italic text-lg md:text-xl leading-relaxed text-ink/70 pt-6 pr-8 m-0 border-l-4 border-primary/40 pl-6 mt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-sm border-2 border-ink transition-all duration-500 shadow-[3px_3px_0px_0px_#141414] ${open ? 'rotate-90 bg-primary text-ink' : 'rotate-0 bg-white text-ink/30'}`}>
                    <Plus className={`w-6 h-6 transition-transform duration-500 ${open ? 'scale-110' : ''}`} />
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>

        <footer className="mt-16 text-center pt-8">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-ink/20">
              {language === 'nl' ? 'Nog meer weten? Plan een gesprek.' : 'Want to know more? Schedule a call.'}
            </p>
        </footer>
      </div>
    </section>
  );
}
