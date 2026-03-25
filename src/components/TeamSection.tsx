import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { translations } from "../translations";
import { Language } from "../types";

export const TeamSection = ({ language, isMobile }: { language: Language, isMobile: boolean }) => {
  const t = translations[language].team;
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const team = [
    { name: "Liv", role: t.roles.design, color: "bg-primary", shadow: "shadow-[12px_12px_0px_0px_#00BCD4]", img: "/liv.jpg" },
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
