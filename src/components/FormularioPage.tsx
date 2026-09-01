import React, { useState, useEffect } from 'react';
import { trackEvent, getUTMParameters, buildWhatsAppLink } from '../utils/analytics';
import { Logo } from './Logo';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Building2,
  Users,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  User,
  HelpCircle,
  MessageSquare,
  DollarSign,
  TrendingDown,
  Briefcase,
  AlertCircle,
  Check,
  Ban,
  RotateCcw,
} from 'lucide-react';

interface FormularioPageProps {
  onNavigateHome: () => void;
}

export interface QuoteFormData {
  // 1. CNPJ
  hasCnpj: 'Sim' | 'Sou MEI' | 'Não' | '';
  cnpjNumber: string;
  companyName: string;
  cityState: string;

  // 2. Quem será incluído
  includedProfiles: string[];

  // 3. Idades
  agesList: string;

  // 4. Plano atual
  hasCurrentPlan: 'Sim' | 'Não' | '';
  currentCarrier: string;
  currentPlanName: string;
  currentMonthlyCost: string;

  // 5. Objetivo principal
  mainGoal: string;

  // 6. Preferência de contato
  contactPreference: 'WhatsApp' | 'Ligação' | 'Reunião on-line' | '';

  // Dados de contato
  fullName: string;
  whatsapp: string;
  email: string;
  notes?: string;
  lgpdAccepted: boolean;
}

export const FormularioPage: React.FC<FormularioPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    hasCnpj: '',
    cnpjNumber: '',
    companyName: '',
    cityState: '',
    includedProfiles: [],
    agesList: '',
    hasCurrentPlan: '',
    currentCarrier: '',
    currentPlanName: '',
    currentMonthlyCost: '',
    mainGoal: '',
    contactPreference: 'WhatsApp',
    fullName: '',
    whatsapp: '',
    email: '',
    lgpdAccepted: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    trackEvent('view_quote_form_page', { page: '/formulario' });
  }, []);

  // Format CNPJ input
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 14) raw = raw.substring(0, 14);

    let formatted = raw;
    if (raw.length > 2) {
      formatted = `${raw.substring(0, 2)}.${raw.substring(2)}`;
    }
    if (raw.length > 5) {
      formatted = `${raw.substring(0, 2)}.${raw.substring(2, 5)}.${raw.substring(5)}`;
    }
    if (raw.length > 8) {
      formatted = `${raw.substring(0, 2)}.${raw.substring(2, 5)}.${raw.substring(5, 8)}/${raw.substring(8)}`;
    }
    if (raw.length > 12) {
      formatted = `${raw.substring(0, 2)}.${raw.substring(2, 5)}.${raw.substring(5, 8)}/${raw.substring(8, 12)}-${raw.substring(12)}`;
    }

    setFormData((prev) => ({ ...prev, cnpjNumber: formatted }));
    if (errors.cnpjNumber) setErrors((prev) => ({ ...prev, cnpjNumber: '' }));
  };

  const handleToggleProfile = (profile: string) => {
    setFormData((prev) => {
      let updated: string[];
      if (profile === 'Sócios e funcionários') {
        if (prev.includedProfiles.includes('Sócios e funcionários')) {
          updated = prev.includedProfiles.filter((p) => p !== 'Sócios e funcionários');
        } else {
          updated = ['Sócios e funcionários'];
        }
      } else {
        const withoutAll = prev.includedProfiles.filter((p) => p !== 'Sócios e funcionários');
        if (withoutAll.includes(profile)) {
          updated = withoutAll.filter((p) => p !== profile);
        } else {
          updated = [...withoutAll, profile];
        }
      }
      return { ...prev, includedProfiles: updated };
    });
    if (errors.includedProfiles) setErrors((prev) => ({ ...prev, includedProfiles: '' }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.substring(0, 11);

    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.substring(0, 2)}) `;
      if (raw.length > 7) {
        formatted += `${raw.substring(2, 7)}-${raw.substring(7)}`;
      } else {
        formatted += raw.substring(2);
      }
    }

    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setFormData((prev) => ({ ...prev, currentMonthlyCost: '' }));
      return;
    }
    const num = Number(raw) / 100;
    const formatted = num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    setFormData((prev) => ({ ...prev, currentMonthlyCost: formatted }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.hasCnpj) {
      newErrors.hasCnpj = 'Selecione uma opção de CNPJ.';
    }

    if (formData.hasCnpj === 'Não') {
      newErrors.hasCnpj = 'Atendimento exclusivo para CNPJ e MEI.';
      setErrors(newErrors);
      return false;
    }

    // CNPJ obrigatório se Sim ou MEI
    const cleanCnpj = formData.cnpjNumber.replace(/\D/g, '');
    if (!cleanCnpj || cleanCnpj.length < 14) {
      newErrors.cnpjNumber = 'Por favor, informe um CNPJ válido com 14 dígitos.';
    }

    if (formData.includedProfiles.length === 0) {
      newErrors.includedProfiles = 'Selecione quem será incluído no plano.';
    }

    if (!formData.agesList.trim()) {
      newErrors.agesList = 'Informe as idades (ex: 42, 38, 15 e 10 anos).';
    }

    if (!formData.hasCurrentPlan) {
      newErrors.hasCurrentPlan = 'Informe se sua empresa possui plano de saúde atualmente.';
    }

    if (formData.hasCurrentPlan === 'Sim' && !formData.currentCarrier.trim()) {
      newErrors.currentCarrier = 'Informe a operadora atual da sua empresa (ex: Bradesco, Amil, Unimed, etc.).';
    }

    if (!formData.mainGoal) {
      newErrors.mainGoal = 'Selecione o principal objetivo da cotação.';
    }

    if (!formData.contactPreference) {
      newErrors.contactPreference = 'Selecione sua preferência de contato.';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Informe seu nome completo.';
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.whatsapp = 'Informe um telefone/WhatsApp válido com DDD.';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Informe um e-mail corporativo válido.';
    }

    if (!formData.lgpdAccepted) {
      newErrors.lgpdAccepted = 'Você precisa aceitar os termos de consentimento.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.form-error-marker');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const utms = getUTMParameters();
    const payload = {
      ...formData,
      ...utms,
      sourceForm: '/formulario',
      createdAt: new Date().toISOString(),
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('ultra_quote_leads') || '[]');
      existingLeads.push(payload);
      localStorage.setItem('ultra_quote_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    trackEvent('quote_form_submit', payload);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const getWhatsAppLeadMessage = () => {
    let msg = `*Nova Cotação de Plano de Saúde (Ultra Seguros)*\n\n`;
    msg += `👤 *Nome:* ${formData.fullName}\n`;
    msg += `🏢 *Empresa:* ${formData.companyName || 'Não informada'}\n`;
    msg += `📄 *CNPJ:* ${formData.cnpjNumber} (${formData.hasCnpj})\n`;
    msg += `👥 *Quem será incluído:* ${formData.includedProfiles.join(', ')}\n`;
    msg += `🎂 *Idades:* ${formData.agesList}\n`;
    msg += `📋 *Possui plano atual:* ${formData.hasCurrentPlan}`;
    if (formData.hasCurrentPlan === 'Sim') {
      msg += `\n   - *Operadora:* ${formData.currentCarrier}`;
      if (formData.currentPlanName) msg += `\n   - *Plano/Categoria:* ${formData.currentPlanName}`;
      if (formData.currentMonthlyCost) msg += `\n   - *Mensalidade Atual:* ${formData.currentMonthlyCost}`;
    }
    msg += `\n🎯 *Objetivo:* ${formData.mainGoal}\n`;
    msg += `📞 *Preferência de contato:* ${formData.contactPreference}\n`;
    msg += `📱 *WhatsApp:* ${formData.whatsapp}\n`;
    msg += `✉️ *E-mail:* ${formData.email}`;
    return msg;
  };

  const commonCarriers = [
    'Bradesco Saúde',
    'SulAmérica',
    'Amil',
    'Unimed',
    'Porto Saúde',
    'NotreDame Intermédica',
    'Outra',
  ];

  return (
    <div className="min-h-screen bg-[#07172E] text-slate-100 font-sans selection:bg-[#E52B32] selection:text-white flex flex-col">
      {/* Dedicated Clean Header */}
      <header className="border-b border-white/10 bg-[#07172E]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
              title="Voltar para a página inicial"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Página Principal</span>
              <span className="sm:hidden">Voltar</span>
            </button>
            <div onClick={onNavigateHome} className="cursor-pointer">
              <Logo size="md" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SUSEP 202045165</span>
            </div>
            {/* Direct WhatsApp CTA only in general header if not disqualified */}
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Form Page Body */}
      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {isSuccess ? (
            /* Success State */
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-[#07172E] shadow-2xl text-center space-y-6 border border-slate-200 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                  SOLICITAÇÃO RECEBIDA COM SUCESSO
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#07172E]">
                  Obrigado, {formData.fullName.split(' ')[0]}!
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
                  Nossos consultores da <strong>Ultra Seguros</strong> já estão analisando as melhores tabelas corporativas para o CNPJ <strong>{formData.cnpjNumber}</strong> e entrarão em contato via <strong>{formData.contactPreference}</strong>.
                </p>
              </div>

              {/* Quick Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs sm:text-sm text-slate-700 space-y-2 max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">CNPJ:</span>
                  <span className="font-semibold text-slate-900">{formData.cnpjNumber} ({formData.hasCnpj})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Pessoas incluídas:</span>
                  <span className="font-semibold text-slate-900">{formData.includedProfiles.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Idades:</span>
                  <span className="font-semibold text-slate-900">{formData.agesList}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Objetivo principal:</span>
                  <span className="font-semibold text-slate-900">{formData.mainGoal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href={`https://wa.me/5532984324095?text=${encodeURIComponent(getWhatsAppLeadMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar Agora no WhatsApp</span>
                </a>

                <button
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <span>Voltar para o Site</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main Form View */
            <div className="space-y-8">
              {/* Header Title and Description */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#F5B51B] uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CONSULTORIA ESPECIALIZADA & GRATUITA</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
                  Formulário — Cotação de Plano de Saúde Empresarial
                </h1>

                <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
                  Preencha as informações abaixo para buscarmos as melhores opções de plano de saúde para sua empresa.
                </p>
              </div>

              {/* Form Card */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 text-[#07172E] space-y-8"
              >
                {/* 1. Sua empresa possui CNPJ ativo? */}
                <div className={`space-y-3 pb-6 border-b border-slate-200 ${errors.hasCnpj ? 'form-error-marker' : ''}`}>
                  <label className="block text-base sm:text-lg font-bold text-[#07172E] font-heading">
                    1. Sua empresa possui CNPJ ativo? <span className="text-[#E52B32]">*</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Planos com CNPJ/MEI têm condições especiais e valores até 40% mais acessíveis que planos individuais.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {[
                      { key: 'Sim', label: 'Sim' },
                      { key: 'Sou MEI', label: 'Sou MEI' },
                      { key: 'Não', label: 'Não (Pessoa Física)' },
                    ].map(({ key, label }) => {
                      const isSelected = formData.hasCnpj === key;
                      return (
                        <label
                          key={key}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              hasCnpj: key as 'Sim' | 'Sou MEI' | 'Não',
                            }));
                            if (errors.hasCnpj) setErrors((prev) => ({ ...prev, hasCnpj: '' }));
                          }}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                            isSelected
                              ? key === 'Não'
                                ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                                : 'border-[#07172E] bg-blue-50/50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasCnpj"
                            value={key}
                            checked={isSelected}
                            onChange={() => {}}
                            className="w-4 h-4 text-[#07172E] focus:ring-0 cursor-pointer"
                          />
                          <span className={`text-sm font-semibold ${isSelected ? 'text-[#07172E]' : 'text-slate-700'}`}>
                            {label}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {errors.hasCnpj && (
                    <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.hasCnpj}
                    </p>
                  )}

                  {/* Field for CNPJ when Sim or MEI */}
                  {(formData.hasCnpj === 'Sim' || formData.hasCnpj === 'Sou MEI') && (
                    <div className={`pt-3 space-y-1.5 animate-fadeIn ${errors.cnpjNumber ? 'form-error-marker' : ''}`}>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800">
                        Informe o número do CNPJ: <span className="text-[#E52B32]">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="00.000.000/0000-00"
                          value={formData.cnpjNumber}
                          onChange={handleCnpjChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-sm focus:outline-none focus:bg-white ${
                            errors.cnpjNumber ? 'border-[#E52B32]' : 'border-slate-300 focus:border-[#07172E]'
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Necessário para aplicarmos a tabela corporativa correta e verificar abrangência da sua região.
                      </p>
                      {errors.cnpjNumber && (
                        <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.cnpjNumber}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* DISQUALIFICATION SCREEN WHEN "NÃO" IS SELECTED */}
                {formData.hasCnpj === 'Não' ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/80 border-2 border-amber-200 text-[#07172E] space-y-5 animate-fadeIn text-center">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Ban className="w-7 h-7" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900">
                        Atendimento Exclusivo para Empresas (CNPJ ou MEI)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Agradecemos muito pelo seu interesse! No momento, a <strong>Ultra Seguros Corretora</strong> trabalha exclusivamente com cotações corporativas para <strong>Empresas e MEI (com CNPJ ativo)</strong>, a partir de 1 titular.
                      </p>
                      <p className="text-xs text-slate-500">
                        Não realizamos cotações para a modalidade de plano individual/pessoa física.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, hasCnpj: 'Sim' }))}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#07172E] hover:bg-[#0c2242] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Possuo CNPJ / Desejo Corrigir</span>
                      </button>

                      <button
                        type="button"
                        onClick={onNavigateHome}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                      >
                        <span>Voltar para a Página Principal</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* QUALIFIED FORM CONTINUATION */
                  <>
                    {/* 2. Quem será incluído no plano? */}
                    <div className={`space-y-3 pb-6 border-b border-slate-200 ${errors.includedProfiles ? 'form-error-marker' : ''}`}>
                      <label className="block text-base sm:text-lg font-bold text-[#07172E] font-heading">
                        2. Quem será incluído no plano? <span className="text-[#E52B32]">*</span>
                      </label>
                      <p className="text-xs text-slate-500">
                        Você pode selecionar uma ou mais opções.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {['Sócios', 'Funcionários', 'Dependentes', 'Sócios e funcionários'].map((profile) => {
                          const isChecked = formData.includedProfiles.includes(profile);
                          return (
                            <label
                              key={profile}
                              onClick={() => handleToggleProfile(profile)}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                                isChecked
                                  ? 'border-[#07172E] bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? 'bg-[#07172E] border-[#07172E] text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className={`text-sm font-semibold ${isChecked ? 'text-[#07172E]' : 'text-slate-700'}`}>
                                {profile}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.includedProfiles && (
                        <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.includedProfiles}
                        </p>
                      )}
                    </div>

                    {/* 3. Idades das pessoas */}
                    <div className={`space-y-3 pb-6 border-b border-slate-200 ${errors.agesList ? 'form-error-marker' : ''}`}>
                      <label className="block text-base sm:text-lg font-bold text-[#07172E] font-heading">
                        3. Informe as idades das pessoas que serão incluídas no plano: <span className="text-[#E52B32]">*</span>
                      </label>
                      <p className="text-xs text-slate-500">
                        As operadoras calculam os valores pelas faixas etárias de cada vida.
                      </p>

                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Exemplo: 42, 38, 15 e 10 anos."
                          value={formData.agesList}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, agesList: e.target.value }));
                            if (errors.agesList) setErrors((prev) => ({ ...prev, agesList: '' }));
                          }}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:bg-white transition-all ${
                            errors.agesList ? 'border-[#E52B32]' : 'border-slate-200 focus:border-[#07172E]'
                          }`}
                        />
                        <p className="text-[11px] text-slate-400 italic">
                          Dica: digite as idades separadas por vírgula ou o total por faixa (ex: "2 pessoas com 35, 1 com 40").
                        </p>
                      </div>
                      {errors.agesList && (
                        <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.agesList}
                        </p>
                      )}
                    </div>

                    {/* 4. A empresa possui plano de saúde atualmente? */}
                    <div className={`space-y-4 pb-6 border-b border-slate-200 ${errors.hasCurrentPlan ? 'form-error-marker' : ''}`}>
                      <label className="block text-base sm:text-lg font-bold text-[#07172E] font-heading">
                        4. A empresa possui plano de saúde atualmente? <span className="text-[#E52B32]">*</span>
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(['Sim', 'Não'] as const).map((option) => {
                          const isSelected = formData.hasCurrentPlan === option;
                          return (
                            <label
                              key={option}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, hasCurrentPlan: option }));
                                if (errors.hasCurrentPlan) setErrors((prev) => ({ ...prev, hasCurrentPlan: '' }));
                              }}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                                isSelected
                                  ? 'border-[#07172E] bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="hasCurrentPlan"
                                value={option}
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 text-[#07172E] focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-sm font-semibold ${isSelected ? 'text-[#07172E]' : 'text-slate-700'}`}>
                                {option}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.hasCurrentPlan && (
                        <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.hasCurrentPlan}
                        </p>
                      )}

                      {/* Conditional Fields if SIM */}
                      {formData.hasCurrentPlan === 'Sim' && (
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 animate-fadeIn">
                          <div className="text-xs font-bold text-[#07172E] uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingDown className="w-3.5 h-3.5 text-[#E52B32]" />
                            <span>Informações do Plano Atual</span>
                          </div>

                          {/* Operadora Atual */}
                          <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold text-slate-800">
                              Qual é a operadora atual? <span className="text-[#E52B32]">*</span>
                            </label>

                            {/* Quick Select Buttons */}
                            <div className="flex flex-wrap gap-2">
                              {commonCarriers.map((carrier) => {
                                const isCarrierSelected = formData.currentCarrier === carrier;
                                return (
                                  <button
                                    key={carrier}
                                    type="button"
                                    onClick={() => {
                                      if (carrier === 'Outra') {
                                        setFormData((prev) => ({ ...prev, currentCarrier: '' }));
                                      } else {
                                        setFormData((prev) => ({ ...prev, currentCarrier: carrier }));
                                      }
                                      if (errors.currentCarrier) setErrors((prev) => ({ ...prev, currentCarrier: '' }));
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                      isCarrierSelected
                                        ? 'bg-[#07172E] text-white border-[#07172E]'
                                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                                    }`}
                                  >
                                    {carrier}
                                  </button>
                                );
                              })}
                            </div>

                            <input
                              type="text"
                              placeholder="Digite ou confirme a operadora atual (ex: Bradesco, SulAmérica, Amil, Unimed...)"
                              value={formData.currentCarrier}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, currentCarrier: e.target.value }));
                                if (errors.currentCarrier) setErrors((prev) => ({ ...prev, currentCarrier: '' }));
                              }}
                              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 text-sm focus:outline-none ${
                                errors.currentCarrier ? 'border-[#E52B32]' : 'border-slate-300 focus:border-[#07172E]'
                              }`}
                            />
                            {errors.currentCarrier && (
                              <p className="text-[11px] text-[#E52B32] font-semibold">{errors.currentCarrier}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                            {/* Nome / Categoria do Plano */}
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold text-slate-700">
                                Qual é o plano / categoria atual? <span className="text-slate-400 font-normal">(Opcional)</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Ex: Top Nacional, Especial, Fácil..."
                                value={formData.currentPlanName}
                                onChange={(e) => setFormData((prev) => ({ ...prev, currentPlanName: e.target.value }))}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#07172E]"
                              />
                            </div>

                            {/* Valor Aproximado */}
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold text-slate-700">
                                Valor aproximado da mensalidade total
                              </label>
                              <input
                                type="text"
                                placeholder="R$ 0,00"
                                value={formData.currentMonthlyCost}
                                onChange={handleCurrencyChange}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#07172E]"
                              />
                              <p className="text-[10px] text-slate-400">
                                Utilizado para calcular sua economia comparativa.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 5. Qual é o principal objetivo da cotação? */}
                    <div className={`space-y-3 pb-6 border-b border-slate-200 ${errors.mainGoal ? 'form-error-marker' : ''}`}>
                      <label className="block text-base sm:text-lg font-bold text-[#07172E] font-heading">
                        5. Qual é o principal objetivo da cotação? <span className="text-[#E52B32]">*</span>
                      </label>

                      <div className="space-y-2.5 pt-1">
                        {[
                          'Reduzir o valor do plano atual',
                          'Melhorar a rede de hospitais e médicos',
                          'Melhorar coberturas e benefícios',
                          'Contratar um plano pela primeira vez',
                          'Comparar opções disponíveis no mercado',
                        ].map((goal) => {
                          const isSelected = formData.mainGoal === goal;
                          return (
                            <label
                              key={goal}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, mainGoal: goal }));
                                if (errors.mainGoal) setErrors((prev) => ({ ...prev, mainGoal: '' }));
                              }}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all cursor-pointer select-none ${
                                isSelected
                                  ? 'border-[#07172E] bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="mainGoal"
                                value={goal}
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 text-[#07172E] focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-sm font-semibold ${isSelected ? 'text-[#07172E]' : 'text-slate-700'}`}>
                                {goal}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.mainGoal && (
                        <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.mainGoal}
                        </p>
                      )}
                    </div>

                    {/* 6. Como prefere receber nosso contato? */}
                    <div className={`space-y-3 pb-6 border-b border-slate-200 ${errors.contactPreference ? 'form-error-marker' : ''}`}>
                      <label className="block text-base sm:text-lg font-bold text-[#07172E] font-heading">
                        6. Como prefere receber nosso contato? <span className="text-[#E52B32]">*</span>
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        {(['WhatsApp', 'Ligação', 'Reunião on-line'] as const).map((pref) => {
                          const isSelected = formData.contactPreference === pref;
                          return (
                            <label
                              key={pref}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, contactPreference: pref }));
                                if (errors.contactPreference) setErrors((prev) => ({ ...prev, contactPreference: '' }));
                              }}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                                isSelected
                                  ? 'border-[#07172E] bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="contactPreference"
                                value={pref}
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 text-[#07172E] focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-sm font-semibold ${isSelected ? 'text-[#07172E]' : 'text-slate-700'}`}>
                                {pref}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.contactPreference && (
                        <p className="text-xs text-[#E52B32] font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.contactPreference}
                        </p>
                      )}
                    </div>

                    {/* Dados de Contato e Identificação */}
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-[#07172E] font-heading">
                          Onde devemos enviar o estudo comparativo?
                        </h3>
                        <p className="text-xs text-slate-500">
                          Seus dados são confidenciais e utilizados exclusivamente para o envio desta cotação.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Nome Completo */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            Seu Nome Completo <span className="text-[#E52B32]">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Ex: Carlos Eduardo"
                              value={formData.fullName}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                              }}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-sm focus:outline-none focus:bg-white ${
                                errors.fullName ? 'border-[#E52B32]' : 'border-slate-300 focus:border-[#07172E]'
                              }`}
                            />
                          </div>
                          {errors.fullName && <p className="text-[11px] text-[#E52B32] font-semibold">{errors.fullName}</p>}
                        </div>

                        {/* WhatsApp */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            Telefone / WhatsApp com DDD <span className="text-[#E52B32]">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="tel"
                              placeholder="(11) 99999-9999"
                              value={formData.whatsapp}
                              onChange={handlePhoneChange}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-sm focus:outline-none focus:bg-white ${
                                errors.whatsapp ? 'border-[#E52B32]' : 'border-slate-300 focus:border-[#07172E]'
                              }`}
                            />
                          </div>
                          {errors.whatsapp && <p className="text-[11px] text-[#E52B32] font-semibold">{errors.whatsapp}</p>}
                        </div>

                        {/* E-mail */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            E-mail corporativo para envio <span className="text-[#E52B32]">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              placeholder="carlos@suaempresa.com.br"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, email: e.target.value }));
                                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                              }}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-sm focus:outline-none focus:bg-white ${
                                errors.email ? 'border-[#E52B32]' : 'border-slate-300 focus:border-[#07172E]'
                              }`}
                            />
                          </div>
                          {errors.email && <p className="text-[11px] text-[#E52B32] font-semibold">{errors.email}</p>}
                        </div>

                        {/* Nome da Empresa / Cidade (Opcional) */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            Razão Social / Nome Fantasia <span className="text-slate-400 font-normal">(Opcional)</span>
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              placeholder="Ex: Empresa ABC Ltda"
                              value={formData.companyName}
                              onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-[#07172E]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LGPD Consent */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                        <input
                          type="checkbox"
                          checked={formData.lgpdAccepted}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, lgpdAccepted: e.target.checked }));
                            if (errors.lgpdAccepted) setErrors((prev) => ({ ...prev, lgpdAccepted: '' }));
                          }}
                          className="w-4 h-4 mt-0.5 rounded text-[#E52B32] border-slate-300 focus:ring-0 cursor-pointer"
                        />
                        <span>
                          Concordo em receber o contato da <strong>Ultra Seguros Corretora</strong> para elaboração e apresentação desta cotação empresarial, conforme a LGPD.
                        </span>
                      </label>
                      {errors.lgpdAccepted && (
                        <p className="text-[11px] text-[#E52B32] font-semibold mt-1">{errors.lgpdAccepted}</p>
                      )}
                    </div>

                    {/* Submit CTA Button */}
                    <div className="pt-4 space-y-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-xl shadow-red-950/20 hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processando cotação...</span>
                          </div>
                        ) : (
                          <>
                            <span>Solicitar minha cotação</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-emerald-600" />
                          Dados protegidos e sigilosos
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          Sem taxa de consultoria
                        </span>
                        <span>•</span>
                        <span>Mais de 15 operadoras parceiras</span>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Dedicated Clean Footer */}
      <footer className="border-t border-white/10 bg-[#051122] py-8 px-4 text-center text-xs text-slate-400 space-y-2">
        <p className="text-slate-300">
          © {new Date().getFullYear()} Ultra Seguros Corretora de Seguros. Todos os direitos reservados.
        </p>
        <p className="text-slate-400">
          Registro SUSEP: 202045165 · Atendimento Nacional
        </p>
      </footer>
    </div>
  );
};
