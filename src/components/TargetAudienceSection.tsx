import React from 'react';
import { trackEvent } from '../utils/analytics';
import { Building, Rocket, TrendingUp, ArrowUpRight } from 'lucide-react';

interface TargetAudienceSectionProps {
  onOpenAnalysis: () => void;
}

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ onOpenAnalysis }) => {
  const cards = [
    {
      badge: 'CENÁRIO 01',
      title: 'Já tenho plano',
      description: 'Quer comparar custos, rede, condições ou atendimento antes da próxima renovação?',
      icon: Building,
      accentColor: 'border-l-4 border-l-[#234E9A]',
      iconBg: 'bg-[#234E9A]/10 text-[#234E9A]',
    },
    {
      badge: 'CENÁRIO 02',
      title: 'Quero contratar',
      description: 'Entenda quais alternativas podem fazer sentido para o tamanho e perfil da sua equipe.',
      icon: Rocket,
      accentColor: 'border-l-4 border-l-[#E52B32]',
      iconBg: 'bg-[#E52B32]/10 text-[#E52B32]',
    },
    {
      badge: 'CENÁRIO 03',
      title: 'Minha empresa cresceu',
      description: 'Reavalie número de vidas, cobertura e estrutura do benefício com suporte contínuo.',
      icon: TrendingUp,
      accentColor: 'border-l-4 border-l-[#F5B51B]',
      iconBg: 'bg-[#F5B51B]/20 text-[#07172E]',
    },
  ];

  const handleCardClick = (title: string) => {
    trackEvent('cta_click', { button_name: `Para Quem É Card: ${title}` });
    onOpenAnalysis();
  };

  return (
    <section id="para-sua-empresa" className="relative bg-[#F7F4EE] text-[#07172E] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#234E9A] bg-[#234E9A]/10 px-3.5 py-1.5 rounded-full inline-block">
            MOMENTO DA SUA EMPRESA
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-[#07172E]">
            A Ultra pode ajudar em diferentes momentos da sua empresa.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto">
            Seja para revisar o plano atual, realizar uma nova contratação ou reestruturar benefícios em uma fase de expansão.
          </p>
        </div>

        {/* 3 Spacious Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                onClick={() => handleCardClick(card.title)}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${card.accentColor} flex flex-col justify-between group cursor-pointer border border-slate-200/80 hover:-translate-y-1 relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      {card.badge}
                    </span>
                    <div className={`p-3 rounded-xl ${card.iconBg} transition-transform group-hover:scale-110`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#07172E] mb-3 font-heading group-hover:text-[#234E9A] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#234E9A] group-hover:text-[#E52B32] transition-colors">
                  <span>Solicitar análise direcionada</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
