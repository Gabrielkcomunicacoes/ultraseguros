import React from 'react';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, CheckCircle, HelpCircle, UserPlus, RefreshCcw, Headphones, ShieldCheck } from 'lucide-react';

interface RHPainSectionProps {
  onOpenAnalysis: () => void;
}

export const RHPainSection: React.FC<RHPainSectionProps> = ({ onOpenAnalysis }) => {
  const painPills = [
    { label: 'DÚVIDAS FREQUENTES', icon: HelpCircle },
    { label: 'ALTERAÇÕES CONTRATUAIS', icon: RefreshCcw },
    { label: 'INCLUSÕES E DEMISSÕES', icon: UserPlus },
    { label: 'GESTÃO DE VIDAS', icon: ShieldCheck },
    { label: 'SUPORTE A COLABORADORES', icon: Headphones },
  ];

  const handleClick = () => {
    trackEvent('cta_click', { button_name: 'Dor RH: Falar com um especialista' });
    onOpenAnalysis();
  };

  return (
    <section className="relative bg-[#FFFFFF] text-[#07172E] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column - Professional RH Image & Overlays */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#07172E]">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop"
                  alt="Profissional de Recursos Humanos e Gestão de Pessoas"
                  className="w-full h-[380px] sm:h-[450px] object-cover object-center filter contrast-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Solution Overlay Card */}
              <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-[#07172E] text-white p-5 rounded-2xl border border-slate-700 shadow-2xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#E52B32] text-white flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Apoio direto ao RH</span>
                    <span className="text-[11px] text-slate-300">Respostas rápidas e sem burocracia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text & Pain vs Solution */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E52B32]/10 border border-[#E52B32]/20 text-xs sm:text-sm font-bold text-[#E52B32] uppercase tracking-wider">
              <span>FACILIDADE PARA O SEU TIME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-[#07172E] leading-tight">
              O plano virou mais uma dor de cabeça para o RH?
            </h2>

            {/* Pain Pills */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                DESAFIOS COMUNS NO DIA A DIA:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {painPills.map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#E52B32]" />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Solution Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#07172E] to-[#102A50] text-white space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-[#F5B51B] font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>SOLUÇÃO ULTRA CORRETORA</span>
              </div>
              <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                Conte com atendimento especializado para tornar a gestão do benefício mais simples para sua empresa.
              </p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={handleClick}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-lg shadow-red-950/40 hover:shadow-red-600/30 transition-all duration-300 cursor-pointer"
              >
                <span>Falar com um especialista</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
