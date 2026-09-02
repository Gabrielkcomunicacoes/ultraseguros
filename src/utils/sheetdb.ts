export const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/q5ab87liudofm';

export interface SheetLeadPayload {
  [key: string]: any;
}

/**
 * Envia os dados do formulário para a planilha via SheetDB API
 */
export async function sendLeadToSheetDB(data: SheetLeadPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const formattedDate = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium',
    });

    // Montar string amigável de UTMs se houver
    const utmSummary = [
      data.utm_source ? `source: ${data.utm_source}` : '',
      data.utm_campaign ? `campaign: ${data.utm_campaign}` : '',
      data.utm_medium ? `medium: ${data.utm_medium}` : '',
      data.utm_content ? `content: ${data.utm_content}` : '',
      data.utm_term ? `term: ${data.utm_term}` : '',
    ].filter(Boolean).join(' | ');

    // Mapeamento abrangente com nomes legíveis para colunas de planilha
    const rowData: Record<string, string> = {
      // Data e Hora
      'Data': formattedDate,
      'Data e Hora': formattedDate,
      'Hora': formattedDate.split(' ')[1] || '',

      // Identificação
      'Nome': data.fullName || data.name || '',
      'Nome Completo': data.fullName || data.name || '',
      'Telefone': data.whatsapp || data.phone || '',
      'WhatsApp': data.whatsapp || data.phone || '',
      'E-mail': data.email || '',
      'Email': data.email || '',

      // Empresa e CNPJ
      'Empresa': data.companyName || '',
      'Razão Social': data.companyName || '',
      'CNPJ': data.cnpjNumber || '',
      'Tem CNPJ': data.hasCnpj || '',
      'Cidade/UF': data.cityState || '',
      'Cidade e Estado': data.cityState || '',

      // Pessoas e Idades
      'Quem será incluído': Array.isArray(data.includedProfiles)
        ? data.includedProfiles.join(', ')
        : (data.includedProfiles || ''),
      'Idades': data.agesList || '',
      'Quantidade de Vidas': data.teamSize || (Array.isArray(data.includedProfiles) ? data.includedProfiles.length.toString() : ''),
      'Porte': data.teamSize || '',

      // Plano Atual
      'Possui Plano': data.hasCurrentPlan || '',
      'Possui Plano Atual': data.hasCurrentPlan || '',
      'Operadora Atual': data.currentCarrier || '',
      'Plano Atual': data.currentPlanName || '',
      'Mensalidade': data.currentMonthlyCost || '',
      'Mensalidade Atual': data.currentMonthlyCost || '',

      // Preferências e Objetivo
      'Objetivo Principal': data.mainGoal || '',
      'Preferência de Contato': data.contactPreference || '',
      'Observações': data.notes || '',

      // Rastreamento e Origem
      'Origem': data.sourceForm || window.location.pathname || 'Site Ultra',
      'Página': window.location.href,
      'UTMs': utmSummary,
      'utm_source': data.utm_source || '',
      'utm_medium': data.utm_medium || '',
      'utm_campaign': data.utm_campaign || '',
      'utm_term': data.utm_term || '',
      'utm_content': data.utm_content || '',
    };

    const response = await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [rowData],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('SheetDB API warning response:', response.status, errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    return { success: true };
  } catch (err: any) {
    console.error('Erro ao enviar lead para o SheetDB:', err);
    return { success: false, error: err?.message || 'Erro de conexão' };
  }
}
