import React from 'react';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenAnalysis: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenAnalysis }) => {
  const handleClick = () => {
    trackEvent('cta_click', { button_name: 'Final CTA: Solicitar uma analise' });
    onOpenAnalysis();
  };

  return (
    <section className="relative bg-[#07172E] text-white py-20 sm:py-28 overflow-hidden">
      {/* Glow & Wave Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E52B32]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#234E9A]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="ultra-glass rounded-3xl p-8 sm:p-14 border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Red & Gold Accent Lines */}
          <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-[#E52B32] to-[#F5B51B]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5B51B]/10 border border-[#F5B51B]/20 text-xs font-bold text-[#F5B51B] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>DECISÃO INTELIGENTE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white leading-tight">
                Antes de contratar ou renovar, compare.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Entenda quais opções podem fazer sentido para o momento atual da sua empresa com o suporte especializado da Ultra Seguros.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleClick}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-xl shadow-red-950/60 transition-all cursor-pointer"
                >
                  <span>Solicitar uma análise</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sem custo de consultoria
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Atendimento humano especializado
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                  alt="Equipe executiva alinhada com estratégia da empresa"
                  className="w-full h-[320px] object-cover object-center filter brightness-95"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07172E] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
