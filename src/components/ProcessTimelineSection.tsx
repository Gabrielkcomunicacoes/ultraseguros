import React from 'react';
import { trackEvent } from '../utils/analytics';
import { CheckCircle2, Search, Compass, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface ProcessTimelineSectionProps {
  onOpenAnalysis: () => void;
}

export const ProcessTimelineSection: React.FC<ProcessTimelineSectionProps> = ({ onOpenAnalysis }) => {
  const steps = [
    {
      number: '01',
      title: 'Entender a empresa',
      description: 'Perfil da equipe, quantidade de vidas e necessidades específicas dos sócios e colaboradores.',
      icon: Search,
      tag: 'DIAGNÓSTICO INICIAL',
    },
    {
      number: '02',
      title: 'Comparar possibilidades',
      description: 'Analisar alternativas de diferentes seguradoras de acordo com o cenário financeiro e assistencial da empresa.',
      icon: Compass,
      tag: 'ANÁLISE COMPARATIVA',
    },
    {
      number: '03',
      title: 'Contratar com orientação',
      description: 'Apoio especializado durante todo o processo de envio de documentos, análise de elegibilidade e implantação.',
      icon: ShieldCheck,
      tag: 'IMPLANTAÇÃO SEGURA',
    },
    {
      number: '04',
      title: 'Continuar acompanhando',
      description: 'Suporte, atendimento a dúvidas e acompanhamento contínuo na gestão do benefício ao longo do relacionamento.',
      icon: HeartHandshake,
      tag: 'SUPORTE CONTÍNUO',
    },
  ];

  const handleCtaClick = () => {
    trackEvent('cta_click', { button_name: 'Timeline: Conhecer o acompanhamento' });
    onOpenAnalysis();
  };

  return (
    <section id="diferenciais" className="relative bg-[#07172E] text-white py-16 sm:py-24 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#234E9A]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5B51B] bg-[#F5B51B]/10 border border-[#F5B51B]/20 px-3.5 py-1.5 rounded-full inline-block">
            MÉTODO ULTRA DE ACOMPANHAMENTO
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            Um bom plano empresarial não termina na contratação.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto">
            Ter alguém acompanhando a gestão do benefício também faz diferença para a sustentabilidade financeira e satisfação da equipe.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#234E9A]/60 ml-4 sm:ml-8 md:ml-32 space-y-12 sm:space-y-16">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="relative pl-8 sm:pl-12 group">

                {/* Timeline Dot & Number Marker */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#07172E] border-2 border-[#E52B32] flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:bg-[#E52B32] group-hover:scale-110 transition-all duration-300">
                  <span className="text-[11px]">{step.number}</span>
                </div>

                {/* Content Box */}
                <div className="ultra-glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5B51B] bg-white/5 px-2.5 py-1 rounded">
                      {step.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#234E9A]/30 flex items-center justify-center text-slate-300">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-xl shadow-red-950/60 hover:shadow-red-600/40 transition-all duration-300 cursor-pointer"
          >
            <span>Conversar sobre a gestão do meu plano</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
