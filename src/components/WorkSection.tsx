import { motion } from "motion/react";
import { translations } from "../translations";
import { Language } from "../types";

export const WorkSection = ({ language, isMobile }: { language: Language, isMobile: boolean }) => {
  const t = translations[language].work;
  return (
    <section id="work" className="py-32 bg-neutral relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8">
            <h2 className="text-7xl md:text-9xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-8">
              <span className="relative inline-block">
                <span className="text-ink/30 italic font-serif lowercase">{t.title_code}</span>
                <motion.span 
                   initial={{ width: 0 }}
                   whileInView={{ width: "110%" }}
                   transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                   viewport={{ once: true }}
                   className="absolute top-1/2 left-[-5%] h-3 md:h-5 bg-tertiary -rotate-2 z-10 origin-left shadow-[4px_4px_0px_0px_#141414]"
                />
              </span>
              <br />
              {t.title_part2 || "The"} <br />
              <span className="text-primary">{t.title_canvas}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-xl md:text-2xl text-ink/80 font-serif italic border-l-4 border-primary pl-6 py-2">
              {t.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            whileInView="inView"
            viewport={{ once: false, amount: 0.6 }}
            className="relative group"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">{t.projects.local_baker.title}</h3>
              <p className="text-lg font-serif italic text-ink inline-block px-2 relative group-hover:px-4 transition-all duration-300 max-w-[calc(100vw-4rem)]">
                <span className="relative z-10">{t.projects.local_baker.subtitle}</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-primary/40 -z-0 transform -rotate-1 group-hover:h-full group-hover:bg-primary/20 transition-all duration-500 ease-in-out"></span>
              </p>
            </div>
            <motion.div 
              variants={{
                initial: { y: 0 },
                hover: { y: -10 },
                inView: { y: 0 }
              }}
              className="relative aspect-[4/5] bg-white border-2 border-ink p-4 shadow-[8px_8px_0px_0px_#00BCD4]"
            >
              <motion.img 
                initial={{ filter: "grayscale(100%)" }}
                whileHover={{ filter: "grayscale(0%)" }}
                whileInView={{ filter: isMobile ? "grayscale(0%)" : "grayscale(100%)" }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.5 }}
                src="/piercing.jpg" 
                alt="Magic Piercing Studio case study" 
                loading="lazy" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <a 
                href="https://magic-piercing-studioo.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute top-8 right-8 bg-primary text-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest z-30 hover:bg-ink hover:text-primary transition-colors cursor-pointer"
              >
                {t.label_ordering}
              </a>
              <div className="absolute inset-4 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity p-4 md:p-6 flex flex-col items-center text-center justify-center border-2 border-ink overflow-hidden z-20">
                <p className="text-ink font-serif italic mb-2 text-sm md:text-base">{t.projects.local_baker.problem}</p>
                <p className="text-ink font-serif italic mb-2">{t.projects.local_baker.solution}</p>
                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter mt-2">{t.projects.local_baker.result}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            whileInView="inView"
            viewport={{ once: false, amount: 0.6 }}
            className="relative group md:mt-24"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">{t.projects.yoga_hub.title}</h3>
              <p className="text-lg font-serif italic text-ink inline-block px-2 relative group-hover:px-4 transition-all duration-300 max-w-[calc(100vw-4rem)]">
                <span className="relative z-10">{t.projects.yoga_hub.subtitle}</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-secondary/40 -z-0 transform -rotate-1 group-hover:h-full group-hover:bg-secondary/20 transition-all duration-500 ease-in-out"></span>
              </p>
            </div>
            <motion.div 
              variants={{
                initial: { y: 0 },
                hover: { y: -10 },
                inView: { y: 0 }
              }}
              className="relative aspect-[3/4] bg-white border-2 border-ink p-4 shadow-[8px_8px_0px_0px_#E91E63]"
            >
              <motion.img 
                initial={{ filter: "grayscale(100%)" }}
                whileHover={{ filter: "grayscale(0%)" }}
                whileInView={{ filter: isMobile ? "grayscale(0%)" : "grayscale(100%)" }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.5 }}
                src="/tattoo.png" 
                alt="Stubborn Tattoo Studio case study" 
                loading="lazy" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-4 bg-secondary/95 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col items-center text-center justify-center border-2 border-ink text-neutral overflow-hidden z-20">
                <p className="font-serif italic mb-2 text-ink">{t.projects.yoga_hub.problem}</p>
                <p className="font-serif italic mb-2 text-ink">{t.projects.yoga_hub.solution}</p>
                <p className="text-2xl font-black uppercase tracking-tighter text-ink mt-2">{t.projects.yoga_hub.result}</p>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-secondary text-neutral p-4 border-2 border-ink font-black text-xs uppercase tracking-widest rotate-3 z-30">
                {t.label_transformation}
              </div>
            </motion.div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            initial="initial"
            whileHover="hover"
            whileInView="inView"
            viewport={{ once: false, amount: 0.6 }}
            className="relative group"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">{t.projects.vintage_vault.title}</h3>
              <p className="text-lg font-serif italic text-ink inline-block px-2 relative group-hover:px-4 transition-all duration-300 max-w-[calc(100vw-4rem)]">
                <span className="relative z-10">{t.projects.vintage_vault.subtitle}</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-tertiary/40 -z-0 transform -rotate-1 group-hover:h-full group-hover:bg-tertiary/20 transition-all duration-500 ease-in-out"></span>
              </p>
            </div>
            <motion.div 
              variants={{
                initial: { y: 0 },
                hover: { y: -10 },
                inView: { y: 0 }
              }}
              className="relative aspect-[4/5] bg-white border-2 border-ink p-4 shadow-[8px_8px_0px_0px_#FFEB3B]"
            >
              <motion.img 
                initial={{ filter: "grayscale(100%)" }}
                whileHover={{ filter: "grayscale(0%)" }}
                whileInView={{ filter: isMobile ? "grayscale(0%)" : "grayscale(100%)" }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.5 }}
                src="/vintage.png" 
                alt="Vintage Vault website design"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 bg-tertiary text-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10">{t.label_branding}</div>
              <div className="absolute inset-4 bg-tertiary/95 opacity-0 group-hover:opacity-100 transition-opacity p-4 md:p-6 flex flex-col items-center text-center justify-center border-2 border-ink overflow-hidden z-20">
                <p className="text-ink font-serif italic mb-2 text-sm md:text-base">{t.projects.vintage_vault.problem}</p>
                <p className="text-ink font-serif italic mb-2 text-sm md:text-base">{t.projects.vintage_vault.solution}</p>
                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter mt-2">{t.projects.vintage_vault.result}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
