import { useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { translations } from "../translations";
import { Language } from "../types";

export const BookingPopup = ({ isOpen, onClose, language }: { isOpen: boolean, onClose: () => void, language: Language }) => {
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
            {t.title_part1} 
            <span className="block mt-2 italic font-serif decoration-primary underline decoration-2 underline-offset-4 text-xl md:text-2xl normal-case">
              {t.title_growth}
            </span>
          </h2>
          <p className="font-serif italic text-ink/70 text-lg md:text-xl leading-relaxed mb-8">
            {t.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 p-6 bg-ink/5 border-2 border-ink shadow-[6px_6px_0px_0px_rgba(20,20,20,0.1)]">
            {t.checklist && t.checklist.map((item: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 group">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 border-2 border-ink bg-primary shadow-[2px_2px_0px_0px_#141414]">
                  <span className="text-[10px] font-black text-ink">{idx + 1}</span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest leading-tight text-ink/80 group-hover:text-ink transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[600px] border-4 border-ink shadow-[8px_8px_0px_0px_#141414]">
          <iframe 
            src="https://calendly.com/louisgrootkoerkamp/30min?hide_event_type_details=1&hide_gdpr_banner=1" 
            width="100%" 
            height="600" 
            frameBorder="0"
            title="Calendly Scheduling"
            className="bg-white"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};
