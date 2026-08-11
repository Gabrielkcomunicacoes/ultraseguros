import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';
import { DollarSign, MapPin, CheckSquare, Headphones, ArrowRight, ShieldCheck } from 'lucide-react';

interface CostAnalysisSectionProps {
  onOpenAnalysis: () => void;
}

export const CostAnalysisSection: React.FC<CostAnalysisSectionProps> = ({ onOpenAnalysis }) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const factors = [
    {
      title: 'PREÇO',
      subtitle: 'Custo & Sustentabilidade',
      desc: 'Quanto a empresa investe mensalmente e a previsibilidade de reajustes futuros.',
      icon: DollarSign,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-[#F5B51B]',
    },
    {
      title: 'REDE',
      subtitle: 'Cobertura de Hospitais & Médicos',
      desc: 'Quais opções de atendimento, clínicas e laboratórios estão realmente disponíveis para a equipe.',
      icon: MapPin,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400',
    },
    {
      title: 'ELEGIBILIDADE',
      subtitle: 'Regras & Coparticipação',
      desc: 'Quais condições contratuais, carências e formatos de inclusão precisam ser atendidos.',
      icon: CheckSquare,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-400',
    },
    {
      title: 'ATENDIMENTO',
      subtitle: 'Suporte de Pós-Venda',
      desc: 'Quem estará ao lado da empresa para resolver demandas e orientar a gestão no dia a dia.',
      icon: Headphones,
      color: 'from-red-500/20 to-red-600/10 border-red-500/40 text-[#E52B32]',
    },
  ];

  const handleCtaClick = () => {
    trackEvent('cta_click', { button_name: 'Custo Nao E Tudo: Solicitar analise' });
    onOpenAnalysis();
  };

  return (
    <section className="relative bg-[#102A50] text-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5B51B] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
            AVALIAÇÃO CRITÉRIOS DE ESCOLHA
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            O plano mais barato nem sempre é o melhor plano.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Uma boa decisão considera o conjunto equilibrado entre valor e entrega.
          </p>
        </div>

        {/* 4 Big Interactive Factor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {factors.map((factor, index) => {
            const Icon = factor.icon;
            const isSelected = activeItem === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveItem(index)}
                onClick={() => setActiveItem(index)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#07172E] border-white/30 shadow-2xl scale-102 ring-1 ring-white/20'
                    : 'bg-[#07172E]/60 border-white/10 hover:bg-[#07172E]/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold tracking-widest uppercase text-slate-400">
                      0{index + 1}
                    </span>
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${factor.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white font-heading tracking-wide mb-1">
                    {factor.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#F5B51B] mb-3">
                    {factor.subtitle}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {factor.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Análise no estudo</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Conclusion Callout & CTA */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <p className="text-lg font-bold text-white">
            Compare todos os pilares antes de decidir.
          </p>

          <button
            onClick={handleCtaClick}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-xl shadow-red-950/60 transition-all cursor-pointer"
          >
            <span>Solicitar análise do conjunto</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
