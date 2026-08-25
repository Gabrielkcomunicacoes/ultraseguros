import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';
import {
  Shield,
  Heart,
  Car,
  Home,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
} from 'lucide-react';

interface InsurersSectionProps {
  onOpenAnalysis: () => void;
}

interface Insurer {
  id: string;
  code: string;
  name: string;
  segments: string[];
  highlightColor?: string;
  badgeBg?: string;
  badgeText?: string;
}

export const InsurersSection: React.FC<InsurersSectionProps> = ({ onOpenAnalysis }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const insurers: Insurer[] = [
    {
      id: 'porto',
      code: 'POR',
      name: 'Porto Seguro',
      segments: ['Auto', 'Residencial', 'Vida'],
      badgeBg: 'bg-blue-950/70 border-blue-500/40',
      badgeText: 'text-blue-400',
    },
    {
      id: 'azul',
      code: 'AZUL',
      name: 'Azul Seguros',
      segments: ['Auto', 'Residencial'],
      badgeBg: 'bg-sky-950/70 border-sky-500/40',
      badgeText: 'text-sky-400',
    },
    {
      id: 'bradesco',
      code: 'BRA',
      name: 'Bradesco Seguros',
      segments: ['Auto', 'Vida', 'Saúde'],
      badgeBg: 'bg-red-950/70 border-red-500/40',
      badgeText: 'text-red-400',
    },
    {
      id: 'sulamerica',
      code: 'SUL',
      name: 'SulAmérica',
      segments: ['Saúde', 'Odonto', 'Vida'],
      badgeBg: 'bg-amber-950/70 border-amber-500/40',
      badgeText: 'text-amber-400',
    },
    {
      id: 'allianz',
      code: 'ALL',
      name: 'Allianz',
      segments: ['Auto', 'Residencial', 'Vida'],
      badgeBg: 'bg-indigo-950/70 border-indigo-500/40',
      badgeText: 'text-indigo-400',
    },
    {
      id: 'hdi',
      code: 'HDI',
      name: 'HDI',
      segments: ['Auto', 'Residencial', 'Empresarial'],
      badgeBg: 'bg-emerald-950/70 border-emerald-500/40',
      badgeText: 'text-emerald-400',
    },
    {
      id: 'tokio',
      code: 'TM',
      name: 'Tokio Marine',
      segments: ['Auto', 'Residencial', 'Vida'],
      badgeBg: 'bg-teal-950/70 border-teal-500/40',
      badgeText: 'text-teal-400',
    },
    {
      id: 'mapfre',
      code: 'MAP',
      name: 'Mapfre',
      segments: ['Auto', 'Vida', 'Residencial'],
      badgeBg: 'bg-rose-950/70 border-rose-500/40',
      badgeText: 'text-rose-400',
    },
    {
      id: 'itau',
      code: 'ITAÚ',
      name: 'Itaú',
      segments: ['Vida', 'Residencial', 'Empresarial'],
      badgeBg: 'bg-orange-950/70 border-orange-500/40',
      badgeText: 'text-orange-400',
    },
    {
      id: 'yelum',
      code: 'YEL',
      name: 'Yelum',
      segments: ['Auto', 'Residencial', 'Empresarial'],
      badgeBg: 'bg-yellow-950/70 border-yellow-500/40',
      badgeText: 'text-yellow-400',
    },
    {
      id: 'zurich',
      code: 'ZUR',
      name: 'Zurich',
      segments: ['Auto', 'Vida', 'Residencial'],
      badgeBg: 'bg-cyan-950/70 border-cyan-500/40',
      badgeText: 'text-cyan-400',
    },
    {
      id: 'sura',
      code: 'SURA',
      name: 'Sura',
      segments: ['Auto', 'Empresarial'],
      badgeBg: 'bg-blue-950/70 border-blue-400/40',
      badgeText: 'text-blue-300',
    },
    {
      id: 'suhai',
      code: 'SUH',
      name: 'Suhai',
      segments: ['Auto', 'Moto'],
      badgeBg: 'bg-red-950/70 border-red-400/40',
      badgeText: 'text-red-300',
    },
    {
      id: 'icatu',
      code: 'ICA',
      name: 'Icatu',
      segments: ['Vida', 'Previdência'],
      badgeBg: 'bg-teal-950/70 border-teal-400/40',
      badgeText: 'text-teal-300',
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'Todas as Seguradoras' },
    { id: 'Saúde', label: 'Saúde & Odonto' },
    { id: 'Auto', label: 'Auto & Moto' },
    { id: 'Vida', label: 'Vida & Previdência' },
    { id: 'Residencial', label: 'Residencial' },
    { id: 'Empresarial', label: 'Empresarial' },
  ];

  const filteredInsurers = insurers.filter((insurer) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'Saúde') {
      return insurer.segments.some((s) => s === 'Saúde' || s === 'Odonto');
    }
    if (selectedFilter === 'Auto') {
      return insurer.segments.some((s) => s === 'Auto' || s === 'Moto');
    }
    if (selectedFilter === 'Vida') {
      return insurer.segments.some((s) => s === 'Vida' || s === 'Previdência');
    }
    return insurer.segments.includes(selectedFilter);
  });

  const handleCtaClick = () => {
    trackEvent('cta_click', { button_name: 'Seguradoras: Solicitar Cotacao' });
    onOpenAnalysis();
  };

  return (
    <section id="seguradoras" className="relative bg-[#07172E] text-white py-16 sm:py-24 overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#234E9A]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#E52B32]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#F5B51B] uppercase tracking-widest">
            <Award className="w-4 h-4 text-[#F5B51B]" />
            <span>PORTFÓLIO MULTISEGURADORAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            As principais seguradoras do mercado
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Cotamos com as maiores seguradoras do país — entre outras — para encontrar a melhor condição pra você.
          </p>

          {/* Quick Segment Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterOptions.map((filter) => {
              const isActive = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => {
                    setSelectedFilter(filter.id);
                    trackEvent('filter_click', { filter_category: filter.label });
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#E52B32] text-white shadow-lg shadow-red-950/40 border border-red-400/30 scale-105'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 14 Insurers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {filteredInsurers.map((item) => (
            <div
              key={item.id}
              className="ultra-glass group relative rounded-2xl p-5 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header with Monogram Code and Status */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={`inline-flex items-center justify-center font-extrabold text-xs tracking-wider px-2.5 py-1 rounded-lg border font-heading ${item.badgeBg} ${item.badgeText}`}
                  >
                    {item.code}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400/90 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Parceira Ativa
                  </span>
                </div>

                {/* Insurer Name */}
                <h3 className="text-lg font-bold text-white font-heading tracking-tight mb-2 group-hover:text-[#F5B51B] transition-colors">
                  {item.name}
                </h3>
              </div>

              {/* Segments list */}
              <div className="pt-3 mt-2 border-t border-white/5">
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors flex items-center gap-1.5 flex-wrap">
                  {item.segments.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Action Banner */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#102A50] via-[#0F2646] to-[#102A50] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white font-heading">
              Precisa cotar ou comparar outra seguradora?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Analisamos todas as coberturas, tabelas de carência e reajustes sem custo de consultoria.
            </p>
          </div>

          <button
            onClick={handleCtaClick}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-lg shadow-red-950/50 hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Cotar com Especialista</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
