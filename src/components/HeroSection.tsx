import React from 'react';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, Check, TrendingUp, Users, ShieldCheck, FileCheck, Building2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnalysis: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAnalysis }) => {
  const handlePrimaryClick = () => {
    trackEvent('cta_click', { button_name: 'Hero Primary: Solicitar análise' });
    onOpenAnalysis();
  };

  const handleSecondaryClick = () => {
    trackEvent('cta_click', { button_name: 'Hero Secondary: Entender como funciona' });
    const element = document.getElementById('como-funciona');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#07172E] text-white pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#234E9A]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#E52B32]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column - Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">

            {/* Microtag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F5B51B] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#E52B32] animate-pulse"></span>
              <span>PLANO DE SAÚDE EMPRESARIAL</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white font-heading">
              O plano de saúde da sua empresa{' '}
              <span className="relative inline-block text-[#E52B32] decoration-clone">
                <span className="relative z-10">ainda faz sentido</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#E52B32]/20 rounded -rotate-1 z-0"></span>
              </span>{' '}
              para o momento atual?
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Compare opções, entenda custos, rede e condições e tenha acompanhamento especializado para cuidar desse benefício.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handlePrimaryClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] transition-all duration-300 shadow-xl shadow-red-950/60 hover:shadow-red-600/40 hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Gold Accent Corner */}
                <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#F5B51B] rounded-tr-xl"></span>
                <span>Solicitar uma análise</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleSecondaryClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>Entender como funciona</span>
              </button>
            </div>

            {/* 3 Key Indicators */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Para empresas que já possuem plano</span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Para novas contratações</span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-[#F5B51B]/20 text-[#F5B51B] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Atendimento especializado</span>
              </div>
            </div>

          </div>

          {/* Right Column - Premium Executive Image & Live Metric Overlay UI */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#102A50]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                  alt="Diretora executiva e gestor analisando dados da empresa"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-top filter brightness-[0.92] contrast-[1.05]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07172E] via-transparent to-transparent opacity-80"></div>

                {/* Top Badge: Ultra Corretora Support */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="ultra-glass px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-white">
                    <Building2 className="w-4 h-4 text-[#F5B51B]" />
                    <span>Gestão & Análise Empresarial</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                </div>
              </div>

              {/* Floating Graph UI Card 1 - Bottom Left */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 ultra-glass p-4 rounded-xl border border-white/15 shadow-2xl max-w-[240px] z-20 hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E52B32]/20 border border-[#E52B32]/40 flex items-center justify-center text-[#E52B32]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Análise de Custos</span>
                    <span className="text-xs font-extrabold text-white">Otimização de Reajuste</span>
                  </div>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#E52B32] to-[#F5B51B] h-full w-[85%] rounded-full"></div>
                </div>
                <span className="text-[10px] text-slate-300 mt-1.5 block">Comparativo de 15+ operadoras parceiras</span>
              </div>

              {/* Floating UI Card 2 - Top Right */}
              <div className="absolute -top-5 -right-3 sm:-right-6 ultra-glass p-3.5 rounded-xl border border-white/15 shadow-2xl z-20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">SUSEP: 202045165</div>
                  <div className="text-[10px] text-emerald-300 font-medium">Corretora Oficial Registrada</div>
                </div>
              </div>

              {/* Floating UI Card 3 - Middle Right Badge */}
              <div className="absolute bottom-16 -right-2 sm:-right-4 ultra-glass px-3.5 py-2 rounded-lg border border-white/10 shadow-lg z-20 hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-200">
                <FileCheck className="w-4 h-4 text-[#F5B51B]" />
                <span>Sem custo de consultoria</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
