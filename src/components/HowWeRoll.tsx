import { translations } from "../translations";
import { Language } from "../types";

export const HowWeRoll = ({ language }: { language: Language }) => {
  const t = translations[language].howWeRoll;
  return (
    <section id="how-we-roll" className="py-32 bg-neutral relative overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4">
                <div className="p-8 bg-white border-2 border-ink -rotate-3 hover:-rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.crafted.title}</h4>
                   <p className="font-serif italic text-ink/70">{t.cards.crafted.desc}</p>
                </div>
                <div className="p-8 bg-tertiary border-2 border-ink sm:mt-12 rotate-2 hover:rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.fluff.title}</h4>
                   <p className="font-serif italic text-ink/70">{t.cards.fluff.desc}</p>
                </div>
                <div className="p-8 bg-secondary border-2 border-ink sm:-mt-4 text-neutral -rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.community.title}</h4>
                   <p className="font-serif italic text-neutral/80">{t.cards.community.desc}</p>
                </div>
                <div className="p-8 bg-primary border-2 border-ink sm:mt-8 rotate-3 hover:rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.results.title}</h4>
                   <p className="font-serif italic text-ink/70">{t.cards.results.desc}</p>
                </div>
             </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-6xl md:text-8xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-8">
              {t.title_part1} <span className="text-primary italic font-serif">{t.title_nova}</span> <br />
              <span className="text-secondary">{t.title_edge}</span>
            </h2>
            <p className="text-2xl text-ink/60 font-serif italic mb-12 max-w-lg leading-relaxed">
              {t.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="px-4 py-2 border-2 border-ink rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">{t.tags.tech}</span>
              <span className="px-4 py-2 border-2 border-ink rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest bg-ink text-neutral">{t.tags.ux}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
