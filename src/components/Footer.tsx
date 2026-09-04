import React, { useState } from 'react';
import { Logo } from './Logo';
import { LegalModals } from './LegalModals';
import { trackEvent, buildWhatsAppLink } from '../utils/analytics';
import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateFormulario?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateFormulario }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#051020] text-slate-300 pt-16 pb-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          {/* Col 1: Brand & SUSEP */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="dark" imgClassName="h-16 sm:h-20 max-w-[240px] sm:max-w-[300px] object-contain" />

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-2">
              Corretora especializada em análise, comparação e gestão contínua de Plano de Saúde Empresarial para pequenas, médias e grandes empresas.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#F5B51B]" />
              <span>SUSEP Registrada: 202045165</span>
            </div>
          </div>

          {/* Col 2: Endereço & Horário */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block font-heading">
              LOCALIZAÇÃO & ATENDIMENTO
            </span>

            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-[#E52B32] shrink-0 mt-0.5" />
              <span>
                Rua Halfeld, 414, Sala 807<br />
                Centro — Juiz de Fora / MG
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300 pt-1">
              <Clock className="w-4 h-4 text-[#F5B51B] shrink-0" />
              <span>Segunda a sexta, das 9h às 18h</span>
            </div>
          </div>

          {/* Col 3: Contatos Diretos */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block font-heading">
              CANAL DIRETO COM A EQUIPE
            </span>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'Footer' })}
              className="flex items-center gap-2.5 text-slate-200 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: (32) 98865-0027</span>
            </a>

            <a
              href="tel:+5532988650027"
              className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#234E9A] shrink-0" />
              <span>Telefone: (32) 98865-0027</span>
            </a>

            <a
              href="mailto:cotacao@ultraseguroscorretora.com.br"
              className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#F5B51B] shrink-0" />
              <span>cotacao@ultraseguroscorretora.com.br</span>
            </a>
          </div>

        </div>

        {/* Bottom Legal Rights & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Ultra Seguros Corretora. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {onNavigateFormulario && (
              <button
                onClick={onNavigateFormulario}
                className="hover:text-[#F5B51B] text-slate-400 font-medium cursor-pointer"
              >
                Formulário de Cotação
              </button>
            )}
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Política de Privacidade
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>
        </div>

      </div>

      {/* Render Legal Modals */}
      <LegalModals type={modalType} onClose={() => setModalType(null)} />
    </footer>
  );
};
