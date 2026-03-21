import { motion } from "motion/react";
import { ArrowUpRight, Menu, X, ChevronRight, Star, Heart, Sparkles, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
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
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm font-bold text-ink/70 hover:text-secondary transition-colors tracking-tight uppercase">
              {item}
            </a>
          ))}
          <button className="px-6 py-2 bg-ink text-neutral text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 flex items-center gap-2 group shadow-[4px_4px_0px_0px_#00BCD4]">
            Start a Project
          </button>
        </div>

        <button className="md:hidden text-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          <button className="w-full py-4 bg-primary text-ink font-black uppercase tracking-widest">
            Start a Project
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
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
            <span className="px-3 py-1 bg-tertiary text-ink text-[10px] font-black uppercase tracking-[0.2em] border border-ink">
              Small Team. Big Results.
            </span>
            <div className="flex items-center gap-1 text-ink/40 text-[10px] font-bold uppercase tracking-widest">
              <MapPin className="w-3 h-3" /> Based in Utrecht
            </div>
          </div>
          
          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.8] tracking-tighter text-ink uppercase mb-8">
            The <span className="italic font-serif text-primary lowercase">Nova</span> <br />
            & The <br />
            <span className="text-secondary">Foundry.</span>
          </h1>
          
          <div className="max-w-xl">
            <p className="text-2xl md:text-3xl text-ink/80 mb-12 font-serif italic leading-tight">
              "A digital mark that defines the <span className="text-secondary underline decoration-primary decoration-4 underline-offset-4">narrative</span> of your business."
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-primary text-ink font-black uppercase tracking-widest hover:bg-ink hover:text-neutral transition-all duration-300 flex items-center justify-center gap-3 group shadow-[6px_6px_0px_0px_#141414]">
                See Our Work
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-ink text-ink font-black uppercase tracking-widest hover:bg-tertiary transition-all duration-300">
                Meet the Squad
              </button>
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
    { name: "Janis", role: "Design Lead", color: "bg-primary", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
    { name: "Deef", role: "Tech Wizard", color: "bg-secondary", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    { name: "Luna", role: "Strategy", color: "bg-tertiary", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section id="the-team" className="py-32 bg-neutral relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-6xl md:text-8xl font-black text-ink uppercase tracking-tighter leading-none mb-4">
            Permanent <br />
            <span className="italic font-serif text-primary">Resident</span> <br />
            Artists
          </h2>
          <p className="text-xl text-ink/60 font-serif italic max-w-md">
            The Utrecht team is small, but we're loud. We build things that matter for the shops next door.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className={`aspect-[4/5] overflow-hidden border-2 border-ink relative z-10 ${member.color} p-2`}>
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-ink">{member.name}</h3>
                <p className="text-lg font-serif italic text-ink/60">{member.role}</p>
              </div>
              <div className={`absolute -inset-2 ${member.color} opacity-0 group-hover:opacity-20 transition-opacity -z-0 blur-xl`} />
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
              Our <span className="text-tertiary underline decoration-secondary decoration-8">Legacy.</span>
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
                <div className="aspect-square bg-neutral p-2 border-2 border-ink rotate-3">
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[3/4] bg-tertiary p-2 border-2 border-ink -rotate-6">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-secondary p-2 border-2 border-ink rotate-6">
                  <img src="https://images.unsplash.com/photo-1493857671297-66f1aa627845?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square bg-primary p-2 border-2 border-ink -rotate-3">
                  <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral pt-32 pb-12 border-t-4 border-ink">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-2xl">
            <h2 className="text-7xl md:text-9xl font-black text-ink uppercase tracking-tighter leading-[0.8] mb-12">
              Ready to <br /> <span className="text-primary italic font-serif">Nova?</span>
            </h2>
            <div className="flex gap-6">
              <button className="px-12 py-6 bg-secondary text-neutral font-black uppercase tracking-widest hover:bg-ink transition-all duration-300 text-xl shadow-[8px_8px_0px_0px_#141414]">
                Enquire Now
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-24">
            <div>
              <h3 className="text-ink font-black uppercase tracking-widest text-xs mb-8 border-b-2 border-primary inline-block">Navigation</h3>
              <ul className="flex flex-col gap-4">
                {["Work", "Team", "Local", "Journal"].map(item => (
                  <li key={item}><a href="#" className="text-ink/60 hover:text-secondary transition-colors font-bold uppercase text-sm tracking-tighter">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-ink font-black uppercase tracking-widest text-xs mb-8 border-b-2 border-secondary inline-block">Socials</h3>
              <ul className="flex flex-col gap-4">
                {["Instagram", "TikTok", "LinkedIn"].map(item => (
                  <li key={item}><a href="#" className="text-ink/60 hover:text-primary transition-colors font-bold uppercase text-sm tracking-tighter">{item}</a></li>
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
              The <span className="text-primary italic font-serif lowercase">Code</span> <br />
              & The <br />
              <span className="text-secondary">Canvas.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-xl text-ink/60 font-serif italic border-l-4 border-primary pl-6 py-2">
              We don't just build sites. We create digital landmarks for the businesses we love.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <motion.div whileHover={{ y: -10 }} className="relative group">
            <div className="aspect-[4/5] bg-white border-2 border-ink p-4 shadow-[8px_8px_0px_0px_#00BCD4]">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              <div className="absolute top-8 right-8 bg-ink text-neutral px-3 py-1 text-[10px] font-black uppercase tracking-widest">E-Commerce</div>
            </div>
            <div className="mt-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">The Local Baker</h3>
              <p className="text-lg font-serif italic text-secondary">+140% Online Orders</p>
            </div>
          </motion.div>

          {/* Project 2 - Overlapping style */}
          <motion.div whileHover={{ y: -10 }} className="relative group md:mt-24">
            <div className="aspect-[3/4] bg-white border-2 border-ink p-4 shadow-[8px_8px_0px_0px_#E91E63]">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-6 -right-6 bg-tertiary text-ink p-4 border-2 border-ink font-black text-xs uppercase tracking-widest rotate-3">
                Booking System
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Utrecht Yoga Hub</h3>
              <p className="text-lg font-serif italic text-primary">Seamless Member Flow</p>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div whileHover={{ y: -10 }} className="relative group">
            <div className="aspect-[4/5] bg-white border-2 border-ink p-4 shadow-[8px_8px_0px_0px_#FFEB3B]">
              <img src="https://images.unsplash.com/photo-1493857671297-66f1aa627845?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              <div className="absolute top-8 left-8 bg-secondary text-neutral px-3 py-1 text-[10px] font-black uppercase tracking-widest">Brand Identity</div>
            </div>
            <div className="mt-6">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Vintage Vault</h3>
              <p className="text-lg font-serif italic text-ink/60">Digital Storytelling</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  useEffect(() => {
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
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <TeamSection />
        <LocalLove />
      </main>
      <Footer />
      
      {/* Custom Cursor */}
      <div 
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 border-2 border-ink rounded-full pointer-events-none z-[999] transition-transform duration-150 ease-out -ml-5 -mt-5 bg-tertiary mix-blend-multiply" 
        id="cursor" 
      />
    </div>
  );
}
