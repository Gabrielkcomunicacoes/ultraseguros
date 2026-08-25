import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { trackEvent, buildWhatsAppLink } from '../utils/analytics';
import { Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenAnalysis: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAnalysis }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    trackEvent('cta_click', { button_name: `Header Nav: ${id}` });
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { button_name: 'Header Solicitar Análise' });
    onOpenAnalysis();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07172E]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Logo variant="dark" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('coberturas')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Coberturas
          </button>
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Como funciona
          </button>
          <button
            onClick={() => scrollToSection('seguradoras')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Seguradoras
          </button>
          <button
            onClick={() => scrollToSection('para-sua-empresa')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Para sua empresa
          </button>
          <button
            onClick={() => scrollToSection('diferenciais')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Diferenciais
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Dúvidas
          </button>
        </nav>

        {/* Desktop Contact & Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'Header' })}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>(32) 98432-4095</span>
          </a>

          <button
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] transition-all duration-300 shadow-lg shadow-red-950/40 hover:shadow-red-600/30 hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
          >
            {/* Subtle Gold Accent border ring on hover */}
            <span className="absolute inset-0 rounded-xl border border-[#F5B51B]/40 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span>Solicitar análise</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={handleCtaClick}
            className="px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] transition-colors"
          >
            Análise
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07172E] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('coberturas')}
              className="text-left py-2 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Coberturas
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="text-left py-2 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection('seguradoras')}
              className="text-left py-2 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Seguradoras
            </button>
            <button
              onClick={() => scrollToSection('para-sua-empresa')}
              className="text-left py-2 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Para sua empresa
            </button>
            <button
              onClick={() => scrollToSection('diferenciais')}
              className="text-left py-2 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 text-base font-medium text-slate-200 hover:text-white border-b border-white/5"
            >
              Dúvidas
            </button>
          </div>

          <div className="pt-2 space-y-3">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'Mobile Menu' })}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-medium text-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: (32) 98432-4095</span>
            </a>

            <button
              onClick={handleCtaClick}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-lg shadow-red-900/50"
            >
              <span>Solicitar análise empresarial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
