import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { translations } from "../translations";
import { Language } from "../types";

export const Hero = ({ onOpenPopup, language, isMobile }: { onOpenPopup: () => void, language: Language, isMobile: boolean }) => {
  const t = translations[language].hero;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral pt-20">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-tertiary text-ink text-[10px] font-black uppercase tracking-[0.2em] border border-ink flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {t.location}
            </span>
          </div>
          
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.8] tracking-tighter text-ink uppercase mb-8 pt-4">
            {t.title_part1} <span className="italic font-serif text-primary lowercase">{t.title_nova}</span> <br />
            <span className="text-secondary">{t.title_part2}</span>
          </h1>
          
          <div className="max-w-xl">
            <p className="text-2xl md:text-3xl text-ink/80 mb-12 font-serif italic leading-tight" dangerouslySetInnerHTML={{ __html: t.description }} />
            <div className="flex flex-wrap gap-4">
              <button onClick={onOpenPopup} type="button" className="px-8 py-4 bg-primary text-ink font-black uppercase tracking-widest hover:bg-ink hover:text-neutral transition-all duration-300 flex items-center justify-center gap-3 group shadow-[6px_6px_0px_0px_#141414]">
                {t.cta_primary}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <a href="#team" className="px-8 py-4 border-2 border-ink text-ink font-black uppercase tracking-widest hover:bg-tertiary transition-all duration-300 flex items-center justify-center">
                {t.cta_secondary}
              </a>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-4 relative hidden lg:block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative z-10 aspect-[3/4] bg-white p-4 border-2 border-ink shadow-[20px_20px_0px_0px_#FFEB3B]"
          >
            <motion.img 
              initial={{ filter: "grayscale(100%)" }}
              whileHover={{ filter: "grayscale(0%)" }}
              whileInView={{ filter: isMobile ? "grayscale(0%)" : "grayscale(100%)" }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.5 }}
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="The Team" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary text-neutral p-4 border-2 border-ink font-serif italic text-xl">
              {t.team_caption}
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-24 h-24 border-2 border-dashed border-primary rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
