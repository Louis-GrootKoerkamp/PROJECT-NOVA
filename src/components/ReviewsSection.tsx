import { motion } from "motion/react";
import { Star } from "lucide-react";
import { translations } from "../translations";
import { Language } from "../types";

export const ReviewsSection = ({ language, isMobile }: { language: Language, isMobile: boolean }) => {
  const t = translations[language].reviews;
  const cardColors = ["bg-neutral", "bg-secondary", "bg-tertiary", "bg-primary"];
  const rot = ["-rotate-2", "rotate-3", "rotate-1", "-rotate-3"];
  
  return (
    <section id="reviews" className="py-32 bg-ink overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-7xl md:text-9xl font-black text-neutral uppercase tracking-tighter leading-none mb-6">
            {t.title_part1} <span className="text-primary italic font-serif lowercase">{t.title_part2}</span>
          </h2>
          <p className="text-xl md:text-3xl text-neutral/60 font-serif italic max-w-2xl mx-auto">
            "{t.subtitle}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.list.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotate: idx % 2 === 0 ? -2 : 2 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotate: rot[idx] === "-rotate-2" ? -2 : rot[idx] === "rotate-3" ? 3 : rot[idx] === "rotate-1" ? 1 : -3,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: isMobile ? 0 : idx * 0.1,
                duration: 1.2
              }}
              className={`flex flex-col p-8 border-4 border-neutral shadow-[12px_12px_0px_0px_#f5f5f5] ${cardColors[idx]} hover:rotate-0 transition-transform duration-300`}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-ink text-ink" />
                ))}
              </div>
              
              <blockquote className="text-lg font-black uppercase tracking-tight mb-8 leading-tight italic text-pretty">
                "{review.text}"
              </blockquote>
              
              <div className="mt-auto pt-6 border-t-2 border-ink/20">
                <div className="text-sm font-black uppercase tracking-widest leading-none mb-1">{review.name}</div>
                <div className="text-[10px] font-serif italic text-ink/60">{review.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
