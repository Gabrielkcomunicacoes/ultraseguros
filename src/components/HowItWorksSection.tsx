import React from 'react';
import { trackEvent } from '../utils/analytics';
import { ClipboardList, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenAnalysis: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenAnalysis }) => {
  const steps = [
    {
      num: '01',
      title: 'Conte sobre sua empresa',
      desc: 'Preencha o formulário rápido informando quantidade aproximada de vidas e se já possui plano de saúde.',
      icon: ClipboardList,
    },
    {
      num: '02',
      title: 'Um especialista analisa o cenário',
      desc: 'A equipe da Ultra examina as opções compatíveis com a região, orçamento e perfil da empresa.',
      icon: BarChart3,
    },
    {
      num: '03',
      title: 'Você conhece as possibilidades',
      desc: 'Receba uma apresentação clara e imparcial para tomar a melhor decisão com tranquilidade.',
      icon: CheckCircle,
    },
  ];

  const handleCtaClick = () => {
    trackEvent('cta_click', { button_name: 'Como Funciona: Iniciar agora' });
    onOpenAnalysis();
  };

  return (
    <section id="como-funciona" className="relative bg-[#07172E] text-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5B51B] bg-white/5 px-3.5 py-1.5 rounded-full inline-block border border-white/10">
            PASSO A PASSO TRANSPARENTE
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            É simples começar.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Sem burocracia ou compromisso. Entenda as alternativas de forma segura.
          </p>
        </div>

        {/* 3 Step Connected Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="ultra-glass p-8 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-heading text-[#E52B32]">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#234E9A]/30 border border-white/10 flex items-center justify-center text-[#F5B51B] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Atendimento consultivo</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="text-center mt-12">
          <button
            onClick={handleCtaClick}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-xl shadow-red-950/60 transition-all cursor-pointer"
          >
            <span>Iniciar minha análise agora</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
