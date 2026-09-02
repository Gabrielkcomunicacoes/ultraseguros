import React, { useState, useEffect } from 'react';
import { trackEvent, getUTMParameters, buildWhatsAppLink, LeadData } from '../utils/analytics';
import { sendLeadToSheetDB } from '../utils/sheetdb';
import { ArrowRight, ArrowLeft, Check, Lock, Building, Users, Calendar, HelpCircle, Phone, Mail, User, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';

interface MainLeadFormProps {
  onNavigateFormulario?: () => void;
}

export const MainLeadForm: React.FC<MainLeadFormProps> = ({ onNavigateFormulario }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 is Success state

  // Form State
  const [formData, setFormData] = useState<LeadData>({
    companyName: '',
    cityState: '',
    teamSize: '2 a 5',
    hasCurrentPlan: 'Sim',
    mainReasonOrGoal: 'Reajuste / preço',
    renewalWindow: 'Até 30 dias',
    fullName: '',
    whatsapp: '',
    email: '',
    lgpdAccepted: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track initial form view
  useEffect(() => {
    trackEvent('view_form', { form_name: 'Main Lead Form' });
  }, []);

  // Format WhatsApp input
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

  // Step 1 Validation & Proceed
  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Por favor, informe o nome da sua empresa.';
    }
    if (!formData.cityState.trim()) {
      newErrors.cityState = 'Por favor, informe a cidade/UF da empresa.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    trackEvent('form_step_1', {
      companyName: formData.companyName,
      teamSize: formData.teamSize,
    });
    setStep(2);
  };

  // Step 2 Validation & Proceed
  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('form_step_2', {
      hasCurrentPlan: formData.hasCurrentPlan,
      reasonOrGoal: formData.mainReasonOrGoal,
      renewalWindow: formData.renewalWindow,
    });
    setStep(3);
  };

  // Step 3 Submission
  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Informe seu nome completo.';
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.whatsapp = 'Informe um WhatsApp válido com DDD.';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Informe um e-mail corporativo válido.';
    }

    if (!formData.lgpdAccepted) {
      newErrors.lgpdAccepted = 'Você precisa aceitar os termos de consentimento.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const utms = getUTMParameters();
    const fullPayload: LeadData = {
      ...formData,
      ...utms,
      createdAt: new Date().toISOString(),
    };

    // Save locally for persistence / simulation
    try {
      const existingLeads = JSON.parse(localStorage.getItem('ultra_leads') || '[]');
      existingLeads.push(fullPayload);
      localStorage.setItem('ultra_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Dispatch Events
    trackEvent('form_submit', fullPayload);

    // Enviar para planilha via SheetDB
    try {
      await sendLeadToSheetDB({
        ...fullPayload,
        sourceForm: 'Formulário Página Principal (#formulario)',
      });
    } catch (sheetErr) {
      console.warn('Erro ao salvar no SheetDB:', sheetErr);
    }

    setIsSubmitting(false);
    setStep(4); // Show Success State
  };

  return (
    <section id="formulario" className="relative bg-[#F7F4EE] text-[#07172E] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E52B32] bg-red-500/10 px-3.5 py-1.5 rounded-full inline-block">
            ANÁLISE PERSONALIZADA
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-[#07172E]">
            Vamos entender o que sua empresa precisa?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto">
            Preencha algumas informações. A equipe da Ultra entra em contato para entender melhor o cenário da sua empresa.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80 relative">

          {/* Step Indicator (for Steps 1, 2, 3) */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span>PASSO {step} DE 3</span>
                <span>
                  {step === 1 && 'Sobre sua empresa'}
                  {step === 2 && 'Sobre o plano'}
                  {step === 3 && 'Contato do responsável'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#E52B32] to-[#F5B51B] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <form onSubmit={handleNextToStep2} className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Empresa */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Nome da empresa <span className="text-[#E52B32]">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ex: ACME Soluções LTDA"
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData({ ...formData, companyName: e.target.value });
                        if (errors.companyName) setErrors({ ...errors, companyName: '' });
                      }}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A] focus:bg-white transition-all"
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.companyName}</p>
                  )}
                </div>

                {/* Cidade / Estado */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Cidade / Estado <span className="text-[#E52B32]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Juiz de Fora / MG"
                    value={formData.cityState}
                    onChange={(e) => {
                      setFormData({ ...formData, cityState: e.target.value });
                      if (errors.cityState) setErrors({ ...errors, cityState: '' });
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A] focus:bg-white transition-all"
                  />
                  {errors.cityState && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.cityState}</p>
                  )}
                </div>

              </div>

              {/* Team Size Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  Quantidade aproximada de pessoas que pretende incluir:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {['2 a 5', '6 a 10', '11 a 29', '30 a 99', '100+'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData({ ...formData, teamSize: size })}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        formData.teamSize === size
                          ? 'bg-[#07172E] text-white border-[#07172E] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {size} vidas
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Step 1 Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-lg shadow-red-900/30 transition-all cursor-pointer"
                >
                  <span>Avançar para etapa 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <form onSubmit={handleNextToStep3} className="space-y-6 animate-fadeIn">
              
              {/* Já possui plano? */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  Sua empresa já possui Plano de Saúde Empresarial?
                </label>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {(['Sim', 'Não'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const newReason = opt === 'Sim' ? 'Reajuste / preço' : 'Oferecer um benefício para a equipe';
                        setFormData({ ...formData, hasCurrentPlan: opt, mainReasonOrGoal: newReason });
                      }}
                      className={`py-3.5 px-4 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        formData.hasCurrentPlan === opt
                          ? 'bg-[#07172E] text-white border-[#07172E] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt === 'Sim' ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                      <span>{opt === 'Sim' ? 'Sim, já temos plano' : 'Não, será o primeiro'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* IF YES */}
              {formData.hasCurrentPlan === 'Sim' && (
                <div className="space-y-5 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Qual o principal motivo para analisar outras opções?
                    </label>
                    <select
                      value={formData.mainReasonOrGoal}
                      onChange={(e) => setFormData({ ...formData, mainReasonOrGoal: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A]"
                    >
                      <option value="Reajuste / preço">Reajuste / preço elevado</option>
                      <option value="Rede de atendimento">Insatisfação com a rede de atendimento</option>
                      <option value="Atendimento / suporte">Falta de suporte da corretora/plano</option>
                      <option value="Crescimento da equipe">Crescimento da equipe de colaboradores</option>
                      <option value="Gestão do benefício">Buscar melhoria na gestão do benefício</option>
                      <option value="Apenas quero comparar">Apenas quero comparar com o mercado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Quando aproximadamente ocorre a próxima renovação do plano?
                    </label>
                    <select
                      value={formData.renewalWindow}
                      onChange={(e) => setFormData({ ...formData, renewalWindow: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A]"
                    >
                      <option value="Até 30 dias">Próximos 30 dias (Urgente)</option>
                      <option value="31 a 90 dias">31 a 90 dias</option>
                      <option value="3 a 6 meses">3 a 6 meses</option>
                      <option value="Mais de 6 meses">Mais de 6 meses</option>
                      <option value="Não sei">Não sei a data exata</option>
                    </select>
                  </div>
                </div>
              )}

              {/* IF NO */}
              {formData.hasCurrentPlan === 'Não' && (
                <div className="space-y-5 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Qual o principal objetivo com a contratação?
                    </label>
                    <select
                      value={formData.mainReasonOrGoal}
                      onChange={(e) => setFormData({ ...formData, mainReasonOrGoal: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A]"
                    >
                      <option value="Oferecer um benefício para a equipe">Oferecer um benefício atrativo para a equipe</option>
                      <option value="Melhorar retenção">Melhorar a retenção de talentos (Turnover)</option>
                      <option value="Solicitação dos colaboradores">Atender solicitação dos sócios ou time</option>
                      <option value="Estou pesquisando opções">Apenas pesquisando valores e condições</option>
                      <option value="Outro">Outro motivo</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-lg shadow-red-900/30 transition-all cursor-pointer"
                >
                  <span>Avançar para dados de contato</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <form onSubmit={handleSubmitFinal} className="space-y-6 animate-fadeIn">
              <div className="space-y-4">
                
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Seu nome completo <span className="text-[#E52B32]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ex: Carlos Silva"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A]"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    WhatsApp com DDD <span className="text-[#E52B32]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="(32) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A]"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.whatsapp}</p>
                  )}
                </div>

                {/* Email Profissional */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    E-mail profissional <span className="text-[#E52B32]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="carlos@suaempresa.com.br"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#234E9A]"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Checkbox LGPD */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.lgpdAccepted}
                      onChange={(e) => setFormData({ ...formData, lgpdAccepted: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#E52B32] focus:ring-[#E52B32] border-slate-300"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Concordo em compartilhar estas informações com a <strong>Ultra Seguros Corretora</strong> para receber a análise e atendimento referente ao plano de saúde empresarial.
                    </span>
                  </label>
                  {errors.lgpdAccepted && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.lgpdAccepted}</p>
                  )}
                </div>

              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl text-base font-bold text-white bg-[#E52B32] hover:bg-[#c21c23] shadow-xl shadow-red-950/40 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Enviando informações...</span>
                  ) : (
                    <>
                      <span>Solicitar minha análise</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 4: SUCCESS STATE ================= */}
          {step === 4 && (
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                  SOLICITAÇÃO REGISTRADA COM SUCESSO
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07172E] font-heading">
                  Recebemos suas informações!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Um especialista da <strong>Ultra Seguros Corretora</strong> irá analisar os dados da sua empresa ({formData.companyName}) e entrará em contato em breve.
                </p>
              </div>

              {/* Immediate WhatsApp Action */}
              <div className="p-6 rounded-2xl bg-emerald-950/5 border border-emerald-500/20 max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
                  <Sparkles className="w-4 h-4 text-[#F5B51B]" />
                  <span>PREFERE ATENDIMENTO IMEDIATO?</span>
                </div>

                <a
                  href={buildWhatsAppLink(
                    `Olá! Acabei de enviar o formulário para a empresa ${formData.companyName} (${formData.teamSize} vidas). Gostaria de falar com um especialista agora.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'Success Screen' })}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Falar agora pelo WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
