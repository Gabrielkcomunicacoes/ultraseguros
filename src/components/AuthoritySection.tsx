import React from 'react';
import { trackEvent } from '../utils/analytics';
import { ShieldCheck, Award, Building2, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthoritySectionProps {
  onOpenAnalysis: () => void;
}

export const AuthoritySection: React.FC<AuthoritySectionProps> = ({ onOpenAnalysis }) => {
  const badges = [
    { title: 'Corretora Registrada', desc: 'Susep Oficial N.º 202045165', icon: ShieldCheck },
    { title: 'Atendimento Especializado', desc: 'Foco exclusivo em soluções empresariais', icon: Award },
    { title: 'Diversidade de Soluções', desc: 'Mais de 15 parceiros e operadoras na operação', icon: Building2 },
    { title: 'Acompanhamento Pós-Venda', desc: 'Suporte contínuo para o setor de RH', icon: UserCheck },
  ];

  return (
    <section className="relative bg-[#07172E] text-white py-16 sm:py-20 overflow-hidden">
      {/* Background Decorative Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E52B32]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>REGISTRO OFICIAL E SEGURANÇA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            ULTRA SEGUROS CORRETORA
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Experiência para ajudar empresas a tomarem decisões com mais segurança, ética e clareza.
          </p>
        </div>

        {/* 4 Premium Authority Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="ultra-glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#234E9A]/30 border border-white/10 flex items-center justify-center text-[#F5B51B] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 font-heading">
                    {b.title}
                  </h3>

                  <p className="text-xs text-slate-300">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verificado</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUSEP Highlight Box */}
        <div className="max-w-2xl mx-auto ultra-glass p-6 rounded-2xl border border-amber-500/30 text-center space-y-2">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#F5B51B]">
            REGISTRO SUSEP OFICIAL
          </div>
          <div className="text-2xl font-black text-white font-heading tracking-wider">
            202045165
          </div>
          <p className="text-xs text-slate-300">
            Habilitada para atuação em todo o território nacional.
          </p>
        </div>

      </div>
    </section>
  );
};
