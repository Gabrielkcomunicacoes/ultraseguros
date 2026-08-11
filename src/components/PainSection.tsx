import React from 'react';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, AlertTriangle, RefreshCw, DollarSign, Layers, ArrowRightCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface PainSectionProps {
  onOpenAnalysis: () => void;
}

export const PainSection: React.FC<PainSectionProps> = ({ onOpenAnalysis }) => {
  const handleClick = () => {
    trackEvent('cta_click', { button_name: 'Pain Section: Quero revisar meu plano' });
    onOpenAnalysis();
  };

  return (
    <section className="relative bg-[#102A50] text-white py-16 sm:py-24 overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#234E9A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-[#E52B32] uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>DIAGNÓSTICO EMPRESARIAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            Seu plano empresarial ficou mais caro?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Reajustes, mudanças na equipe e novas necessidades podem fazer com que o plano contratado no passado deixe de ser a melhor opção para o momento atual.
          </p>
        </div>

        {/* Comparison Cards: ANTES vs AGORA */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">

          {/* ANTES Card */}
          <div className="md:col-span-5 bg-[#07172E]/90 p-6 sm:p-8 rounded-2xl border border-red-500/30 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E52B32]"></div>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black tracking-widest text-[#E52B32] uppercase bg-red-500/10 px-3 py-1 rounded-md">
                CENÁRIO ANTES
              </span>
              <ShieldAlert className="w-5 h-5 text-[#E52B32]" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 font-heading">Plano Atual Desatualizado</h3>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-[#E52B32] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">↑</span>
                <span><strong>Reajustes elevados acumulados</strong> ano após ano sem renegociação prévia.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-[#E52B32] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong>Rede credenciada defasada</strong> que não atende aos hospitais e clínicas dos sócios e colaboradores.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-[#E52B32] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">!</span>
                <span><strong>A equipe mudou de tamanho</strong> ou perfil e a estrutura do plano permaneceu congelada.</span>
              </li>
            </ul>
          </div>

          {/* Connector Arrow */}
          <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
            <div className="w-12 h-12 rounded-full bg-[#E52B32] text-white flex items-center justify-center shadow-lg shadow-red-900/40 transform md:-rotate-0 rotate-90">
              <ArrowRightCircle className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-[#F5B51B] uppercase tracking-wider mt-2">SOLUÇÃO ULTRA</span>
          </div>

          {/* AGORA Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#163666] to-[#07172E] p-6 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-md">
                COM A ULTRA AGORA
              </span>
              <Sparkles className="w-5 h-5 text-[#F5B51B]" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 font-heading">Adequação Estratégica</h3>

            <ul className="space-y-3.5 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                <span><strong>Reavaliar o contrato:</strong> Diagnóstico técnico dos custos e cláusulas atuais.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                <span><strong>Comparar alternativas:</strong> Estudo imparcial entre diferentes operadoras do mercado.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                <span><strong>Adequar benefício:</strong> Opção ideal de preço, rede de atendimento e perfil do time.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Section CTA */}
        <div className="text-center mt-12">
          <button
            onClick={handleClick}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] transition-all duration-300 shadow-xl shadow-red-950/60 hover:shadow-red-600/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Quero revisar meu plano</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
