import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, ChevronRight, Star, Heart, Sparkles, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {["Our Work", "The Team", "Local Love", "Say Hi"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm font-bold text-ink/70 hover:text-secondary transition-colors tracking-tight uppercase py-2 px-1 focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-4">
              {item}
            </a>
          ))}
          <button onClick={onOpenPopup} type="button" className="px-6 py-2 bg-ink text-neutral text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 flex items-center gap-2 group shadow-[4px_4px_0px_0px_#00BCD4]">
            Start a Project
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
          {["Our Work", "The Team", "Local Love", "Say Hi"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-2xl font-black text-ink uppercase tracking-tighter">
              {item}
            </a>
          ))}
          <button onClick={() => { setIsMenuOpen(false); onOpenPopup(); }} type="button" className="w-full py-4 bg-primary text-ink font-black uppercase tracking-widest">
            Start a Project
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
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
              <MapPin className="w-3 h-3" /> Based in Utrecht
            </span>
          </div>
          
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.8] tracking-tighter text-ink uppercase mb-8 pt-4">
            The <span className="italic font-serif text-primary lowercase">Nova</span> <br />
            <span className="text-secondary">Growth Engine.</span>
          </h1>
          
          <div className="max-w-xl">
            <p className="text-2xl md:text-3xl text-ink/80 mb-12 font-serif italic leading-tight">
              "We take the digital headache away so you can focus on your craft. We engineer beautiful landmarks that turn silent browsers into <span className="text-secondary underline decoration-primary decoration-4 underline-offset-4">loyal customers.</span>"
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={onOpenPopup} type="button" className="px-8 py-4 bg-primary text-ink font-black uppercase tracking-widest hover:bg-ink hover:text-neutral transition-all duration-300 flex items-center justify-center gap-3 group shadow-[6px_6px_0px_0px_#141414]">
                Scale Your Brand
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <a href="#the-team" className="px-8 py-4 border-2 border-ink text-ink font-black uppercase tracking-widest hover:bg-tertiary transition-all duration-300 flex items-center justify-center">
                Meet the Squad
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
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="The Team" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary text-neutral p-4 border-2 border-ink font-serif italic text-xl">
              Utrecht's finest.
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

const TeamSection = () => {
  const team = [
    { name: "Janis", role: "Design Lead", color: "bg-primary", shadow: "shadow-[12px_12px_0px_0px_#00BCD4]", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
    { name: "Louis", role: "Tech Wizard", color: "bg-secondary", shadow: "shadow-[12px_12px_0px_0px_#E91E63]", img: "/louis.jpg" },
    { name: "Hein", role: "Strategy", color: "bg-tertiary", shadow: "shadow-[12px_12px_0px_0px_#FFEB3B]", img: "/hein.jpg" },
  ];

  return (
    <section id="the-team" className="py-32 bg-neutral relative overflow-hidden">
      
      {/* Playful looping route animation spanning right-to-left */}
      <div className="absolute top-12 right-0 w-[1200px] h-[300px] pointer-events-none z-0 hidden md:block opacity-60">
        <svg viewBox="0 0 1200 300" className="w-full h-full overflow-visible" fill="none">
          <motion.path
            d="M 1300 50 C 1100 50, 1000 250, 900 250 C 800 250, 700 200, 700 120 C 700 40, 850 40, 850 150 C 850 260, 600 250, 400 250 C 200 250, 100 200, -100 200"
            stroke="var(--color-secondary)"
            strokeWidth="6"
            strokeDasharray="12 12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ pathLength: { duration: 4, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
          />
          {/* Loop nodes */}
          <motion.circle 
            cx="900" cy="250" r="10" fill="var(--color-primary)" stroke="var(--color-ink)" strokeWidth="4"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }}
          />
          <motion.circle 
            cx="850" cy="150" r="10" fill="var(--color-tertiary)" stroke="var(--color-ink)" strokeWidth="4"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.8, duration: 0.5 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24">
          <h2 className="text-6xl md:text-8xl font-black text-ink uppercase tracking-tighter leading-none mb-4">
            Meet <br />
            <span className="italic font-serif text-primary">Your</span> <br />
            Team
          </h2>
          <p className="text-xl text-ink/60 font-serif italic max-w-md">
            The Utrecht team is small, but we're loud. We build things that matter for the shops next door.
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
                  variants={{
                    initial: { filter: "grayscale(100%)" },
                    hover: { filter: "grayscale(0%)" },
                    inView: { filter: "grayscale(0%)" }
                  }}
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

const LocalLove = () => {
  return (
    <section id="local-love" className="py-32 bg-ink text-neutral overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
              Your Business. <br />
              Your <span className="text-tertiary underline decoration-secondary decoration-8">Legacy.</span>
            </h2>
            <p className="text-2xl text-neutral/60 font-serif italic mb-12 leading-relaxed">
              We help local Utrecht businesses (and beyond) punch way above their weight class. No corporate fluff, just high-fidelity digital craft.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 border border-neutral/20 bg-neutral/5">
                <Sparkles className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-black mb-1">100%</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Hand-Crafted</div>
              </div>
              <div className="p-6 border border-neutral/20 bg-neutral/5">
                <Heart className="w-8 h-8 text-secondary mb-4" />
                <div className="text-3xl font-black mb-1">Local</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Community First</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-primary/20 rounded-full absolute -inset-20 blur-3xl animate-pulse" />
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-square bg-neutral p-4 border-2 border-ink rotate-3 flex items-center justify-center text-center">
                  <div>
                    <div className="text-[10px] font-black uppercase opacity-40 mb-1">Local Craft</div>
                    <div className="text-xl font-black text-ink">Boutique <br />Bakeries</div>
                  </div>
                </div>
                <div className="aspect-[3/4] bg-tertiary p-4 border-2 border-ink -rotate-6 flex items-center justify-center text-center">
                  <div>
                    <div className="text-[10px] font-black uppercase opacity-40 mb-1">Health & Zen</div>
                    <div className="text-xl font-black text-ink">Yoga <br />Studios</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-secondary p-4 border-2 border-ink rotate-6 flex items-center justify-center text-center text-neutral">
                  <div>
                    <div className="text-[10px] font-black uppercase opacity-80 mb-1">Urban Culture</div>
                    <div className="text-xl font-black">Tattoo <br />Studios</div>
                  </div>
                </div>
                <div className="aspect-square bg-primary p-4 border-2 border-ink -rotate-3 flex items-center justify-center text-center">
                  <div>
                    <div className="text-[10px] font-black uppercase opacity-40 mb-1">Food & Beverage</div>
                    <div className="text-xl font-black text-ink">Specialty <br />Coffee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowWeRoll = () => {
  return (
    <section id="how-we-roll" className="py-32 bg-neutral relative overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-white border-2 border-ink -rotate-3 hover:-rotate-1 transition-transform shadow-[8px_8px_0px_0px_#00BCD4]">
                   <h4 className="text-2xl font-black uppercase mb-4">Hand-Crafted</h4>
                   <p className="font-serif italic text-ink/70">Every pixel is placed with intent and care. We pour our hearts into building digital experiences that feel human.</p>
                </div>
                <div className="p-8 bg-tertiary border-2 border-ink mt-12 rotate-2 hover:rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">No Fluff</h4>
                   <p className="font-serif italic text-ink/70">Zero corporate speak. Just high-fidelity craft that actually moves the needle.</p>
                </div>
                <div className="p-8 bg-secondary border-2 border-ink -mt-4 text-neutral -rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0px_0px_#00BCD4]">
                   <h4 className="text-2xl font-black uppercase mb-4">Community</h4>
                   <p className="font-serif italic text-neutral/80">We live, breathe, and drink coffee in Utrecht. Your shop is our pride.</p>
                </div>
                <div className="p-8 bg-primary border-2 border-ink mt-8 rotate-3 hover:rotate-1 transition-transform shadow-[8px_8px_0px_0px_#141414]">
                   <h4 className="text-2xl font-black uppercase mb-4">Results First</h4>
                   <p className="font-serif italic text-ink/70">We focus on ROI, conversions, and growth—not just pretty pixels.</p>
                </div>
             </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-6xl md:text-8xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-8">
              The <span className="text-primary italic font-serif">Nova</span> <br />
              <span className="text-secondary">Edge.</span>
            </h2>
            <p className="text-2xl text-ink/60 font-serif italic mb-12 max-w-lg leading-relaxed">
              We've ditched the agency hierarchy to give you direct access to the tech. We're young, we're fast, and we actually care about your bottom line.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="px-4 py-2 border-2 border-ink rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">High-Conversion Tech</span>
              <span className="px-4 py-2 border-2 border-ink rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest bg-ink text-neutral">Frictionless UX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
  return (
    <footer id="say-hi" className="bg-neutral pt-32 pb-12 border-t-4 border-ink">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-2xl">
            <h2 className="text-7xl md:text-9xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-12">
              Focus on <br /> <span className="text-primary italic font-serif">Your Craft.</span>
            </h2>
            <p className="text-xl text-ink/60 font-serif italic mb-8 max-w-xl leading-relaxed">
              Tired of ghost-town websites and the endless headache of managing digital? We take all that pain away. We build elegant, high-performing machines that bring customers to your door—careless, good-working websites so you can get back to what you love doing.
            </p>
            <div className="flex gap-6">
              <button onClick={onOpenPopup} type="button" className="px-12 py-6 bg-secondary text-neutral font-black uppercase tracking-widest hover:bg-ink transition-all duration-300 text-xl shadow-[8px_8px_0px_0px_#141414]">
                Let's Scale Utrecht
              </button>
            </div>
          </div>
          
          <div className="flex gap-24">
            <div>
              <h3 className="text-ink font-black uppercase tracking-widest text-xs mb-8 border-b-2 border-primary inline-block">Navigation</h3>
              <ul className="flex flex-col gap-4">
                {["Work", "Team", "Local", "Journal"].map(item => (
                  <li key={item}><a href="#" className="text-ink/60 hover:text-secondary transition-colors font-bold uppercase text-sm tracking-tighter">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-ink/10 gap-8">
          <div className="text-ink/40 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 NOVA UTRECHT. BUILT WITH LOVE & COFFEE.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-ink/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="text-ink/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WorkSection = () => {
  return (
    <section id="our-work" className="py-32 bg-neutral relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8">
            <h2 className="text-7xl md:text-9xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-8">
              <span className="relative inline-block">
                <span className="text-ink/30 italic font-serif lowercase">The Code</span>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: "110%" }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-[-5%] h-3 md:h-5 bg-tertiary -rotate-2 z-10 origin-left shadow-[4px_4px_0px_0px_#141414]"
                />
              </span>
              <br />
              The <br />
              <span className="text-primary">Canvas.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-xl md:text-2xl text-ink/80 font-serif italic border-l-4 border-primary pl-6 py-2">
              Forget the technical jargon. We handle the heavy lifting under the hood so you only have to care about the beautiful, revenue-generating result.
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
              <h3 className="text-3xl font-black uppercase tracking-tighter">The Local Baker</h3>
              <p className="text-lg font-serif italic text-secondary">Community Flourishing</p>
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
                variants={{
                  initial: { filter: "grayscale(100%)" },
                  hover: { filter: "grayscale(0%)" },
                  inView: { filter: "grayscale(0%)" }
                }}
                transition={{ duration: 0.5 }}
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" 
                alt="The Local Baker case study" 
                loading="lazy" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-8 right-8 bg-ink text-neutral px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10">Online Presence</div>
              <div className="absolute inset-4 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity p-4 md:p-6 flex flex-col items-center text-center justify-center border-2 border-ink overflow-hidden z-20">
                <p className="text-ink font-serif italic mb-2 text-sm md:text-base">Problem: Outdated static landing page.</p>
                <p className="text-ink font-serif italic mb-2">Solution: Intuitive UX & 1-Click Ordering.</p>
                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter mt-2">Result: +140% Orders</p>
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
              <h3 className="text-3xl font-black uppercase tracking-tighter">Utrecht Yoga Hub</h3>
              <p className="text-lg font-serif italic text-primary">Seamless Member Flow</p>
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
                variants={{
                  initial: { filter: "grayscale(100%)" },
                  hover: { filter: "grayscale(0%)" },
                  inView: { filter: "grayscale(0%)" }
                }}
                transition={{ duration: 0.5 }}
                src="/yoga.png" 
                alt="Utrecht Yoga Hub case study" 
                loading="lazy" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-4 bg-secondary/95 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col items-center text-center justify-center border-2 border-ink text-neutral overflow-hidden z-20">
                <p className="font-serif italic mb-2 text-ink">Problem: Messy WhatsApp booking.</p>
                <p className="font-serif italic mb-2 text-ink">Solution: Seamless Member Dashboard.</p>
                <p className="text-2xl font-black uppercase tracking-tighter text-ink mt-2">Result: Community Building</p>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-tertiary text-ink p-4 border-2 border-ink font-black text-xs uppercase tracking-widest rotate-3 z-30">
                Digital Transformation
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
              <h3 className="text-3xl font-black uppercase tracking-tighter">Vintage Vault</h3>
              <p className="text-lg font-serif italic text-ink/60">Digital Storytelling</p>
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
                variants={{
                  initial: { filter: "grayscale(100%)" },
                  hover: { filter: "grayscale(0%)" },
                  inView: { filter: "grayscale(0%)" }
                }}
                transition={{ duration: 0.5 }}
                src="/vintage.png" 
                alt="Vintage Vault website design"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 bg-secondary text-neutral px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10">Brand Logic</div>
              <div className="absolute inset-4 bg-tertiary/95 opacity-0 group-hover:opacity-100 transition-opacity p-4 md:p-6 flex flex-col items-center text-center justify-center border-2 border-ink overflow-hidden z-20">
                <p className="text-ink font-serif italic mb-2 text-sm md:text-base">Problem: Weak store-front identity.</p>
                <p className="text-ink font-serif italic mb-2 text-sm md:text-base">Solution: Immersive Brand Storytelling.</p>
                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter mt-2">Result: 3x Store Visits</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PopupModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
        className="relative w-full max-w-2xl bg-neutral border-4 border-ink p-8 md:p-12 shadow-[16px_16px_0px_0px_#141414] max-h-[90vh] overflow-y-auto"
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
            Engineer Your Next <br /> <span className="italic font-serif lowercase decoration-primary underline decoration-4 underline-offset-8">Growth Phase.</span>
          </h2>
          <p className="font-serif italic text-ink/70 text-lg md:text-xl">
            Tell us where you're bleeding revenue or losing traction, and we'll build the machine to fix it.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-ink/80">Name</label>
              <input type="text" required className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink rounded-none" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-ink/80">Email</label>
              <input type="email" required className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink rounded-none" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-ink/80">Company URL</label>
            <input type="url" className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink rounded-none" placeholder="https://" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-ink/80">The Bottleneck</label>
            <div className="relative">
              <select defaultValue="" required className="w-full bg-white border-2 border-ink p-4 focus:outline-none focus:ring-4 focus:ring-tertiary transition-shadow font-bold text-ink appearance-none cursor-pointer rounded-none">
                <option value="" disabled>What's holding you back?</option>
                <option value="outdated">Outdated Design / UX</option>
                <option value="conversions">Low Conversions / Sales</option>
                <option value="brand">Weak Brand Logic</option>
                <option value="tech">Slow / Clunky Tech Stack</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronRight className="w-5 h-5 rotate-90 opacity-40" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-ink/80">Target Timeline</label>
            <div className="grid grid-cols-3 gap-4">
              {['ASAP', 'Next Month', 'Exploring'].map((time) => (
                <label key={time} className="cursor-pointer">
                  <input type="radio" name="timeline" className="peer sr-only" value={time} required />
                  <div className="h-full flex items-center justify-center text-center p-3 border-2 border-ink bg-white font-bold text-sm uppercase peer-checked:bg-secondary peer-checked:text-neutral hover:bg-neutral transition-colors">
                    {time}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-6 mt-4 bg-ink text-neutral font-black text-xl uppercase tracking-widest hover:bg-primary hover:text-ink transition-all duration-300 shadow-[6px_6px_0px_0px_#00BCD4] group">
            <span className="flex items-center justify-center gap-3">
              Initialize Growth Protocol
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
  useEffect(() => {
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
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="bg-neutral text-ink selection:bg-primary selection:text-ink">
      <Navbar onOpenPopup={() => setIsPopupOpen(true)} />
      <main>
        <Hero onOpenPopup={() => setIsPopupOpen(true)} />
        <WorkSection />
        <HowWeRoll />
        <TeamSection />
        <LocalLove />
      </main>
      <Footer onOpenPopup={() => setIsPopupOpen(true)} />
      
      <AnimatePresence>
        <PopupModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </AnimatePresence>
      
      {/* Custom Cursor */}
      <div 
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 border-2 border-ink rounded-full pointer-events-none z-[99999] -ml-5 -mt-5 bg-tertiary mix-blend-multiply" 
        id="cursor" 
      />
    </div>
  );
}
