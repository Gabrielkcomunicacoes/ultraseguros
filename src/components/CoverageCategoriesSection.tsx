import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';
import {
  Users,
  Car,
  Building,
  ShieldCheck,
  Heart,
  Activity,
  Smile,
  AlertTriangle,
  PawPrint,
  Plane,
  Truck,
  PackageCheck,
  Home,
  Building2,
  Briefcase,
  Tractor,
  Scale,
  BadgeCheck,
  KeyRound,
  Coins,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

interface CoverageCategoriesSectionProps {
  onOpenAnalysis: () => void;
}

interface CoverageItem {
  name: string;
  desc?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  items: CoverageItem[];
}

export const CoverageCategoriesSection: React.FC<CoverageCategoriesSectionProps> = ({
  onOpenAnalysis,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: CategoryGroup[] = [
    {
      id: 'familia',
      title: 'Pessoas e Família',
      subtitle: 'Proteção essencial para você, sua família e seus colaboradores',
      icon: Users,
      accentColor: 'from-blue-600 to-cyan-500',
      badgeBg: 'bg-blue-950/60',
      badgeBorder: 'border-blue-500/30',
      badgeText: 'text-blue-400',
      items: [
        { name: 'Seguro de Vida', desc: 'Amparo e segurança financeira para momentos imprevistos', icon: Heart },
        { name: 'Plano de Saúde', desc: 'Acesso às melhores redes hospitalares e clínicas do país', icon: Activity },
        { name: 'Odontológico', desc: 'Cuidados completos com a saúde bucal para você ou equipe', icon: Smile },
        { name: 'Acidentes Pessoais', desc: 'Coberturas financeiras específicas contra imprevistos', icon: AlertTriangle },
        { name: 'Plano Pet', desc: 'Consultas, exames e proteção para cães e gatos', icon: PawPrint },
        { name: 'Seguro Viagem', desc: 'Assistência médica nacional e internacional 24h', icon: Plane },
      ],
    },
    {
      id: 'veiculos',
      title: 'Veículos',
      subtitle: 'Tranquilidade e assistência 24h para você ou a logística do seu negócio',
      icon: Car,
      accentColor: 'from-red-600 to-amber-500',
      badgeBg: 'bg-red-950/60',
      badgeBorder: 'border-red-500/30',
      badgeText: 'text-red-400',
      items: [
        { name: 'Seguro Auto (Carro)', desc: 'Proteção contra colisão, roubo, furto e terceiros', icon: Car },
        { name: 'Seguro Moto', desc: 'Cobertura completa ou compreensiva com socorro 24h', icon: Car },
        { name: 'Frota', desc: 'Condições corporativas otimizadas para veículos da empresa', icon: Truck },
        { name: 'Caminhão', desc: 'Segurança pesada para transporte autônomo ou de carga', icon: Truck },
        { name: 'Transporte e Cargas', desc: 'Seguro RCTR-C e transporte multimodal de mercadorias', icon: PackageCheck },
      ],
    },
    {
      id: 'patrimonio',
      title: 'Patrimônio',
      subtitle: 'Blindagem de imóveis residenciais, comerciais e do agronegócio',
      icon: Building,
      accentColor: 'from-emerald-600 to-teal-500',
      badgeBg: 'bg-emerald-950/60',
      badgeBorder: 'border-emerald-500/30',
      badgeText: 'text-emerald-400',
      items: [
        { name: 'Residencial', desc: 'Incêndio, danos elétricos, vendaval e assistências ao lar', icon: Home },
        { name: 'Condomínio', desc: 'Seguro obrigatório com coberturas amplas para áreas comuns', icon: Building2 },
        { name: 'Empresarial', desc: 'Proteção para instalações, maquinário, estoques e lucros', icon: Briefcase },
        { name: 'Rural / Agronegócio', desc: 'Seguro agrícola, equipamentos, animais e propriedades', icon: Tractor },
      ],
    },
    {
      id: 'garantias',
      title: 'Garantias e Profissional',
      subtitle: 'Segurança jurídica e financeira para contratos e atividades corporativas',
      icon: ShieldCheck,
      accentColor: 'from-amber-600 to-yellow-500',
      badgeBg: 'bg-amber-950/60',
      badgeBorder: 'border-amber-500/30',
      badgeText: 'text-amber-400',
      items: [
        { name: 'Responsabilidade Civil', desc: 'Proteção patrimonial contra indenizações e erros profissionais', icon: Scale },
        { name: 'Seguro Garantia', desc: 'Garantia de cumprimento de contratos públicos e privados', icon: BadgeCheck },
        { name: 'Fiança Locatícia', desc: 'Aluguel ágil sem fiador ou caução para locatários e proprietários', icon: KeyRound },
        { name: 'Seguro de Crédito', desc: 'Proteção contra inadimplência em operações comerciais', icon: Coins },
      ],
    },
  ];

  const handleCtaClick = (itemTitle: string) => {
    trackEvent('cta_click', { button_name: `Coberturas: ${itemTitle}` });
    onOpenAnalysis();
  };

  const displayedCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <section id="coberturas" className="relative bg-[#0A1D38] text-white py-16 sm:py-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E52B32]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#234E9A]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#F5B51B] uppercase tracking-widest">
            <Layers className="w-4 h-4 text-[#F5B51B]" />
            <span>SOLUÇÕES COMPLETAS EM SEGUROS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
            Cobertura para cada área da sua vida
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Trabalhamos com todos os ramos. Veja os principais tipos abaixo e fale com a gente para uma cotação.
          </p>

          {/* Quick Segment Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => {
                setActiveCategory('all');
                trackEvent('filter_click', { filter_category: 'Todas as Áreas' });
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#E52B32] text-white shadow-lg shadow-red-950/50 scale-105 border border-red-400/40'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Todos os Ramos
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    trackEvent('filter_click', { filter_category: cat.title });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#E52B32] text-white shadow-lg shadow-red-950/50 scale-105 border border-red-400/40'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Main Category Blocks */}
        <div className="space-y-10 sm:space-y-12">
          {displayedCategories.map((category) => {
            const CatIcon = category.icon;
            return (
              <div
                key={category.id}
                className="rounded-2xl sm:rounded-3xl bg-[#08182F]/80 border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${category.badgeBg} border ${category.badgeBorder} shadow-lg shrink-0`}>
                      <CatIcon className={`w-6 h-6 ${category.badgeText}`} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCtaClick(category.title)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F5B51B] hover:text-white transition-colors cursor-pointer group shrink-0"
                  >
                    <span>Cotar este ramo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Sub-items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleCtaClick(item.name)}
                        className="group p-4 sm:p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-[#E52B32]/20 border border-white/10 group-hover:border-red-500/30 transition-colors shrink-0 mt-0.5">
                            <ItemIcon className="w-4 h-4 text-slate-300 group-hover:text-red-400 transition-colors" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-white font-heading group-hover:text-[#F5B51B] transition-colors">
                              {item.name}
                            </h4>
                            {item.desc && (
                              <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-200">
                          <span className="font-medium">Solicitar cotação</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-1 text-[#F5B51B]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Consultation Card */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#102A50] via-[#0F2646] to-[#102A50] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5B51B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atendimento Consultivo Especializado</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white font-heading">
              Não encontrou o que precisa ou deseja um pacote integrado?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Nossa equipe faz o mapeamento completo das suas apólices e unifica tudo na melhor condição do mercado.
            </p>
          </div>

          <button
            onClick={() => handleCtaClick('Falar com Corretor Especialista')}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-lg shadow-red-950/50 hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Falar com Especialista</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
