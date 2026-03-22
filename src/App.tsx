import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Menu, X, ChevronRight, Star, Heart, Sparkles, MapPin } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { translations } from "./translations";

type Language = "en" | "nl";

// --- Components ---

const Navbar = ({ onOpenPopup, language, setLanguage }: { onOpenPopup: () => void, language: Language, setLanguage: (l: Language) => void }) => {
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
            { key: "local", label: t.local },
            { key: "hi", label: t.hi }
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
            { key: "local", label: t.local },
            { key: "hi", label: t.hi }
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

const Hero = ({ onOpenPopup, language, isMobile }: { onOpenPopup: () => void, language: Language, isMobile: boolean }) => {
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

const TeamSection = ({ language, isMobile }: { language: Language, isMobile: boolean }) => {
  const t = translations[language].team;
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const team = [
    { name: "Janis", role: t.roles.design, color: "bg-primary", shadow: "shadow-[12px_12px_0px_0px_#00BCD4]", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
    { name: "Louis", role: t.roles.tech, color: "bg-secondary", shadow: "shadow-[12px_12px_0px_0px_#E91E63]", img: "/louis.jpg" },
    { name: "Hein", role: t.roles.strategy, color: "bg-tertiary", shadow: "shadow-[12px_12px_0px_0px_#FFEB3B]", img: "/hein.jpg" },
  ];

  return (
    <section ref={sectionRef} id="team" className="py-32 bg-neutral relative overflow-hidden">
      
      {/* Playful looping route animation spanning right-to-left */}
      <div className="absolute top-12 right-0 w-[1200px] h-[300px] pointer-events-none z-0 hidden md:block opacity-60">
        <svg viewBox="0 0 1200 300" className="w-full h-full overflow-visible" fill="none">
          <motion.path
            d="M 1300 50 C 1100 50, 1000 250, 900 250 C 800 250, 700 200, 700 120 C 700 40, 850 40, 850 150 C 850 260, 600 250, 400 250 C 200 250, 100 200, -100 200"
            stroke="var(--color-secondary)"
            strokeWidth="6"
            strokeDasharray="12 12"
            strokeLinecap="round"
            style={{ pathLength, opacity }}
          />
          {/* Loop nodes */}
          <motion.circle 
            cx="900" cy="250" r="10" fill="var(--color-primary)" stroke="var(--color-ink)" strokeWidth="4"
            style={{ scale: useTransform(scrollYProgress, [0.35, 0.4], [0, 1]) }}
          />
          <motion.circle 
            cx="850" cy="150" r="10" fill="var(--color-tertiary)" stroke="var(--color-ink)" strokeWidth="4"
            style={{ scale: useTransform(scrollYProgress, [0.45, 0.5], [0, 1]) }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24">
          <h2 className="text-6xl md:text-8xl font-black text-ink uppercase tracking-tighter leading-none mb-4">
            {t.title_part1} <br />
            <span className="italic font-serif text-primary">{t.title_part2}</span> <br />
            {t.title_part3}
          </h2>
          <p className="text-xl text-ink/60 font-serif italic max-w-md">
            {t.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial="initial"
              whileHover="hover"
              whileInView="inView"
              viewport={{ once: false, amount: 0.6 }}
              className="relative group"
            >
              <motion.div 
                variants={{
                  initial: { y: 0 },
                  hover: { y: -10 },
                  inView: { y: 0 }
                }}
                className={`relative aspect-[4/5] bg-white border-2 border-ink p-4 transition-all duration-300 ${member.shadow}`}
              >
                <motion.img 
                  initial={{ filter: "grayscale(100%)" }}
                  whileHover={{ filter: "grayscale(0%)" }}
                  whileInView={{ filter: isMobile ? "grayscale(0%)" : "grayscale(100%)" }}
                  viewport={{ amount: 0.6 }}
                  transition={{ duration: 0.5 }}
                  src={member.img} 
                  alt={member.name} 
                  loading="lazy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="mt-8">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-ink">{member.name}</h3>
                <p className="text-lg font-serif italic text-ink/60">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = ({ language }: { language: Language }) => {
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
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className={`p-8 border-4 border-neutral shadow-[12px_12px_0px_0px_#f5f5f5] ${cardColors[idx]} ${rot[idx]} hover:rotate-0 transition-transform duration-500`}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-ink text-ink" />
                ))}
              </div>
              
              <blockquote className="text-lg font-black uppercase tracking-tight mb-8 leading-tight italic break-words hyphens-auto">
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

const HowWeRoll = ({ language }: { language: Language }) => {
  const t = translations[language].howWeRoll;
  return (
    <section id="how-we-roll" className="py-32 bg-neutral relative overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-8 bg-white border-2 border-ink -rotate-3 hover:-rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.crafted.title}</h4>
                   <p className="font-serif italic text-ink/70">{t.cards.crafted.desc}</p>
                </div>
                <div className="p-8 bg-tertiary border-2 border-ink mt-12 rotate-2 hover:rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.fluff.title}</h4>
                   <p className="font-serif italic text-ink/70">{t.cards.fluff.desc}</p>
                </div>
                <div className="p-8 bg-secondary border-2 border-ink -mt-4 text-neutral -rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">{t.cards.community.title}</h4>
                   <p className="font-serif italic text-neutral/80">{t.cards.community.desc}</p>
                </div>
                <div className="p-8 bg-primary border-2 border-ink mt-8 rotate-3 hover:rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
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

const SprintSection = ({ language, onOpenPopup }: { language: Language, onOpenPopup: () => void }) => {
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PackagesSection = ({ language, onOpenPopup }: { language: Language, onOpenPopup: () => void }) => {
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
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col p-8 border-4 border-ink shadow-[8px_8px_0px_0px_#141414] transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#141414] ${colors[idx]} ${textColors[idx]}`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-ink text-neutral text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 border-2 border-neutral z-20">
                  Meest Gekozen
                </div>
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

const Footer = ({ onOpenPopup, language }: { onOpenPopup: () => void, language: Language }) => {
  const t = translations[language].footer;
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
            <div className="flex gap-6">
              <button onClick={onOpenPopup} type="button" className="px-12 py-6 bg-secondary text-neutral font-black uppercase tracking-widest hover:bg-ink transition-all duration-300 text-xl shadow-[8px_8px_0px_0px_#141414]">
                {t.cta}
              </button>
            </div>
          </div>
          
          <div className="flex gap-24">
            <div>
              <h3 className="text-ink font-black uppercase tracking-widest text-xs mb-8 border-b-2 border-primary inline-block">{t.nav}</h3>
              <ul className="flex flex-col gap-4">
                {[
                  { key: "work", label: t.links[0] },
                  { key: "team", label: t.links[1] },
                  { key: "local", label: t.links[2] },
                  { key: "hi", label: t.links[3] }
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
            <a href="#" className="text-ink/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-secondary transition-colors">{t.privacy}</a>
            <a href="#" className="text-ink/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WorkSection = ({ language, isMobile }: { language: Language, isMobile: boolean }) => {
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
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" 
                alt="The Local Baker case study" 
                loading="lazy" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-8 right-8 bg-primary text-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10">{t.label_ordering}</div>
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
                src="/yoga.png" 
                alt="Utrecht Yoga Hub case study" 
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

const PopupModal = ({ isOpen, onClose, language }: { isOpen: boolean, onClose: () => void, language: Language }) => {
  const t = translations[language].modal;
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-neutral border-4 border-ink p-8 md:p-12 shadow-[16px_16px_0px_0px_#141414] max-h-[90vh] overflow-y-auto overflow-x-hidden"
      >
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-neutral border-2 border-ink hover:bg-secondary hover:text-neutral transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-10 mt-4 md:mt-0 pr-8">
          <h2 id="modal-title" className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-ink mb-4 leading-tight">
            {t.title_part1} <br /> <span className="italic font-serif lowercase decoration-primary underline decoration-4 underline-offset-8">{t.title_growth}</span>
          </h2>
          <p className="font-serif italic text-ink/70 text-lg md:text-xl">
            {t.description}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-ink/80">{t.form.name}</label>
              <input type="text" required className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink rounded-none" placeholder={t.form.name} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-ink/80">{t.form.email}</label>
              <input type="email" required className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink rounded-none" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-ink/80">{t.form.url}</label>
            <input type="url" className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink rounded-none" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-ink/80">{t.form.bottleneck.label}</label>
            <div className="relative">
              <select defaultValue="" required className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink appearance-none cursor-pointer rounded-none">
                <option value="" disabled>{t.form.bottleneck.placeholder}</option>
                <option value="outdated">{t.form.bottleneck.options.outdated}</option>
                <option value="conversions">{t.form.bottleneck.options.conversions}</option>
                <option value="brand">{t.form.bottleneck.options.brand}</option>
                <option value="tech">{t.form.bottleneck.options.tech}</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronRight className="w-5 h-5 rotate-90 opacity-40" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-ink/80">{t.form.timeline.label}</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'asap', label: t.form.timeline.asap },
                { id: 'next', label: t.form.timeline.nextMonth },
                { id: 'explore', label: t.form.timeline.exploring }
              ].map((time) => (
                <label key={time.id} className="cursor-pointer">
                  <input type="radio" name="timeline" className="peer sr-only" value={time.id} required />
                  <div className="h-full flex items-center justify-center text-center p-3 border-2 border-ink bg-white font-bold text-sm uppercase peer-checked:bg-secondary peer-checked:text-neutral hover:bg-neutral transition-colors">
                    {time.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-6 mt-4 bg-ink text-neutral font-black text-xl uppercase tracking-widest hover:bg-primary hover:text-ink transition-all duration-300 shadow-[6px_6px_0px_0px_#00BCD4] group">
            <span className="flex items-center justify-center gap-3">
              {t.form.submit}
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main App ---

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
        <ReviewsSection language={language} />
        <SprintSection language={language} onOpenPopup={() => setIsPopupOpen(true)} />
        <PackagesSection language={language} onOpenPopup={() => setIsPopupOpen(true)} />
      </main>
      <Footer onOpenPopup={() => setIsPopupOpen(true)} language={language} />
      
      <AnimatePresence>
        <PopupModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} language={language} />
      </AnimatePresence>
      
      {/* Custom Cursor */}
      <div 
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 border-2 border-ink rounded-full pointer-events-none z-[99999] -ml-5 -mt-5 bg-tertiary mix-blend-multiply" 
        id="cursor" 
      />
    </div>
  );
}
