import React from 'react';
import { X, Shield, Lock, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#07172E] text-slate-100 w-full max-w-2xl rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#F5B51B] font-bold text-lg font-heading">
              <Shield className="w-6 h-6" />
              <span>Política de Privacidade - Ultra Seguros</span>
            </div>
            <p className="text-xs text-slate-400">Última atualização: Agosto de 2026</p>
            
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                A <strong>Ultra Seguros Corretora</strong> compromete-se com a proteção e privacidade dos dados pessoais dos usuários coletados em nosso site ou formulários, em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>

              <h4 className="font-bold text-white text-sm">1. Coleta de Informações</h4>
              <p>
                Coletamos apenas informações estritamente necessárias enviadas voluntariamente pelo usuário (como nome da empresa, cidade, quantidade de vidas, nome do responsável, e-mail e WhatsApp) para realizar o atendimento consultivo e apresentação de cotações de plano de saúde empresarial.
              </p>

              <h4 className="font-bold text-white text-sm">2. Uso e Compartilhamento de Dados</h4>
              <p>
                As informações fornecidas são utilizadas exclusivamente por nossa equipe especializada para contato, elaboração de estudos comparativos e ofertas de planos de saúde. Não vendemos, alugamos ou comercializamos dados com terceiros não autorizados.
              </p>

              <h4 className="font-bold text-white text-sm">3. Seus Direitos</h4>
              <p>
                O titular dos dados pode a qualquer momento solicitar a confirmação da existência de tratamento, correção de dados incompletos ou a eliminação de seus dados pessoais do nosso cadastro via e-mail: <em>cotacao@ultraseguroscorretora.com.br</em>.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#F5B51B] font-bold text-lg font-heading">
              <FileText className="w-6 h-6" />
              <span>Termos de Uso - Ultra Seguros Corretora</span>
            </div>
            <p className="text-xs text-slate-400">Última atualização: Agosto de 2026</p>

            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                Ao utilizar esta página e enviar suas informações para a <strong>Ultra Seguros Corretora</strong> (SUSEP N.º 202045165), você concorda com os termos aqui estabelecidos.
              </p>

              <h4 className="font-bold text-white text-sm">1. Caráter Consultivo e Imparcial</h4>
              <p>
                A Ultra Seguros atua como corretora de seguros independente habilitada na SUSEP. As informações apresentadas nesta landing page possuem caráter informativo e consultivo. Condições definitivas de valores, prazos, coberturas e carências estão sujeitas às regras específicas de cada operadora ou seguradora de saúde na data da contratação.
              </p>

              <h4 className="font-bold text-white text-sm">2. Ausência de Garantias Automáticas</h4>
              <p>
                A aceitação do plano de saúde empresarial depende da análise de elegibilidade e documentação da empresa interessada e de seus beneficiários.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-bold bg-[#E52B32] text-white hover:bg-[#c21c23] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
