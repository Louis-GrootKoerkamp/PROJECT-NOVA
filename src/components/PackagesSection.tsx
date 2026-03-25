import { motion } from "motion/react";
import { Star } from "lucide-react";
import { translations } from "../translations";
import { Language } from "../types";

export const PackagesSection = ({ language, onOpenPopup }: { language: Language, onOpenPopup: () => void }) => {
  const t = translations[language].packages;
  const colors = ["bg-neutral", "bg-primary", "bg-tertiary", "bg-secondary"];
  const textColors = ["text-ink", "text-ink", "text-ink", "text-neutral"];
  
  return (
    <section id="packages" className="py-32 bg-neutral relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black text-ink uppercase tracking-tighter leading-none mb-6">
            {t.title_part1} <span className="text-secondary italic font-serif">{t.title_pro}</span>
          </h2>
          <p className="text-xl md:text-2xl text-ink/60 font-serif italic leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                ease: "easeOut" 
              }}
              className={`relative flex flex-col p-8 border-4 border-ink shadow-[8px_8px_0px_0px_#141414] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#141414] transition-transform duration-300 ease-out ${colors[idx]} ${textColors[idx]} z-10`}
            >
              {idx === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [-12, -10, -12]
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-4 -left-10 bg-tertiary text-ink text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border-2 border-ink shadow-[4px_4px_0px_0px_#141414] z-0 pointer-events-none"
                >
                  {translations[language].footer.cta_badge}
                </motion.div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 leading-tight break-words">{tier.title}</h3>
                <p className="text-sm font-serif italic opacity-70 leading-relaxed">{tier.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <Star className={`w-4 h-4 mt-1 shrink-0 ${idx === 3 ? 'fill-neutral text-neutral' : 'fill-ink text-ink'}`} />
                    <span className="text-xs font-black uppercase tracking-wider leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
