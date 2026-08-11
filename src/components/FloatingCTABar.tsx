import React from 'react';
import { trackEvent, buildWhatsAppLink } from '../utils/analytics';
import { MessageSquare, ArrowRight, PhoneCall } from 'lucide-react';

interface FloatingCTABarProps {
  onOpenAnalysis: () => void;
}

export const FloatingCTABar: React.FC<FloatingCTABarProps> = ({ onOpenAnalysis }) => {
  const handleCtaClick = () => {
    trackEvent('cta_click', { button_name: 'Floating Mobile Bar: Solicitar analise' });
    onOpenAnalysis();
  };

  return (
    <>
      {/* Fixed WhatsApp Quick Floating Badge (Desktop & Mobile) */}
      <a
        href={buildWhatsAppLink('Olá! Gostaria de falar com um especialista sobre plano de saúde empresarial.')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { source: 'Floating Bubble' })}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 group"
        aria-label="Falar no WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 text-xs font-bold">
          WhatsApp Ultra
        </span>
      </a>

      {/* Sticky Bottom Bar for Mobile Screens ONLY */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07172E]/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 shadow-2xl flex items-center gap-3">
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'Mobile Bottom Sticky' })}
          className="p-3 rounded-xl bg-emerald-600 text-white shrink-0 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <button
          onClick={handleCtaClick}
          className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-[#E52B32] active:bg-[#c21c23] shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Solicitar análise empresarial</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
