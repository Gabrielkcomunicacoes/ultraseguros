import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Plano de Saúde Empresarial é somente para empresas grandes?',
      a: 'Não. É possível contratar ou revisar soluções de plano de saúde empresarial a partir de 2 a 3 vidas (sócios, colaboradores ou dependentes elegíveis, conforme as regras de cada operadora).',
    },
    {
      q: 'Minha empresa já possui plano. A Ultra pode analisar outras opções?',
      a: 'Com certeza. A maioria dos nossos atendimentos é justamente para empresas que já possuem plano e desejam comparar a rede de atendimento, reajustes recentes, valores e suporte antes da renovação anual.',
    },
    {
      q: 'É possível contratar para uma empresa pequena?',
      a: 'Sim. Pequenas e médias empresas (PMEs) possuem opções de contratação simplificada com valores e estruturas desenhadas especificamente para o perfil e quantidade de vidas do negócio.',
    },
    {
      q: 'Como funciona a análise?',
      a: 'Você preenche as informações básicas da sua empresa. Um especialista da Ultra entra em contato para entender o cenário e preparar um estudo comparativo imparcial entre as opções do mercado.',
    },
    {
      q: 'Preciso cancelar meu plano atual para solicitar uma análise?',
      a: 'De forma alguma. A análise é um estudo comparativo e sem compromisso. Você só toma qualquer decisão de migração ou ajuste se identificar que a mudança é vantajosa e segura para sua empresa.',
    },
    {
      q: 'A Ultra atende empresas fora de Juiz de Fora?',
      a: 'Sim! A Ultra Seguros atende empresas em diferentes regiões do Brasil, considerando a disponibilidade de rede credenciada e as condições operacionais dos produtos em cada localidade.',
    },
  ];

  const toggleFaq = (idx: number) => {
    const nextState = openIndex === idx ? null : idx;
    setOpenIndex(nextState);
    if (nextState !== null) {
      trackEvent('cta_click', { button_name: `FAQ Toggle: ${faqs[idx].q}` });
    }
  };

  return (
    <section id="faq" className="relative bg-[#F7F4EE] text-[#07172E] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#234E9A] bg-[#234E9A]/10 px-3.5 py-1.5 rounded-full inline-block">
            PERGUNTAS FREQUENTES
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-[#07172E]">
            Dúvidas antes de começar?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Esclareça os principais pontos sobre a análise de plano empresarial.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-[#07172E] font-heading leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#234E9A] text-white' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
