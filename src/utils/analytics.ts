/**
 * Analytics and Tracking Utility for Ultra Seguros Landing Page
 * Handles UTM parameter extraction, Meta Pixel, GTM, GA4, and Google Ads events.
 */

export interface LeadData {
  companyName: string;
  cityState: string;
  teamSize: string;
  hasCurrentPlan: 'Sim' | 'Não';
  mainReasonOrGoal: string;
  renewalWindow?: string;
  fullName: string;
  whatsapp: string;
  email: string;
  lgpdAccepted: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  createdAt?: string;
}

// Get UTM parameters from current URL
export function getUTMParameters() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
  };
}

// Global Tracking Event Dispatcher
export function trackEvent(eventName: string, payload?: Record<string, any>) {
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  // 1. Console Log for Development
  console.log(`[Tracking Event - ${eventName}]:`, eventData);

  // 2. Google Tag Manager / GA4 DataLayer
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(eventData);

    // 3. Meta Pixel (fbq) if present
    if (typeof (window as any).fbq === 'function') {
      try {
        if (eventName === 'form_submit' || eventName === 'quote_form_submit') {
          (window as any).fbq('track', 'Lead', payload);
        } else if (eventName === 'start_form' || eventName === 'view_quote_form_page') {
          (window as any).fbq('track', 'InitiateCheckout', payload);
        } else if (eventName.includes('whatsapp') || eventName === 'contact_click') {
          (window as any).fbq('track', 'Contact', payload);
        } else {
          (window as any).fbq('trackCustom', eventName, payload);
        }
      } catch (e) {
        console.warn('Meta Pixel dispatch error:', e);
      }
    }
  }
}

// Format WhatsApp Phone link with optional pre-filled message
export function buildWhatsAppLink(message?: string): string {
  const phone = '5532984324095';
  const defaultMsg = message || 'Olá, gostaria de solicitar uma análise de plano de saúde empresarial com a Ultra Seguros.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;
}
