/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PainSection } from './components/PainSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { RHPainSection } from './components/RHPainSection';
import { CostAnalysisSection } from './components/CostAnalysisSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InsurersSection } from './components/InsurersSection';
import { CoverageCategoriesSection } from './components/CoverageCategoriesSection';
import { MainLeadForm } from './components/MainLeadForm';
import { AuthoritySection } from './components/AuthoritySection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { FloatingCTABar } from './components/FloatingCTABar';
import { FormularioPage } from './components/FormularioPage';

import {
  WaveHeroToPain,
  WavePainToAudience,
  WaveAudienceToTimeline,
  WaveTimelineToRH,
  WaveRHToCost,
  WaveCostToHow,
  WaveHowToForm,
  WaveFormToAuth,
  WaveAuthToFAQ,
  WaveFAQToFinalCTA,
} from './components/WaveDividers';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname.startsWith('/formulario') ||
        window.location.hash === '#/formulario' ||
        window.location.search.includes('page=formulario')
      ) {
        return '/formulario';
      }
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      if (
        window.location.pathname.startsWith('/formulario') ||
        window.location.hash === '#/formulario' ||
        window.location.search.includes('page=formulario')
      ) {
        setCurrentPath('/formulario');
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    if (currentPath === '/formulario') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (currentPath === '/formulario') {
    return <FormularioPage onNavigateHome={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-[#07172E] text-slate-100 font-sans selection:bg-[#E52B32] selection:text-white relative overflow-x-hidden">
      {/* 01. Header */}
      <Header
        onOpenAnalysis={scrollToForm}
        onNavigateFormulario={() => navigateTo('/formulario')}
      />

      {/* 02. Hero Section */}
      <main>
        <HeroSection onOpenAnalysis={scrollToForm} />
        <WaveHeroToPain />

        {/* 03. Dor Principal */}
        <PainSection onOpenAnalysis={scrollToForm} />
        <WavePainToAudience />

        {/* 04. Para Quem É */}
        <TargetAudienceSection onOpenAnalysis={scrollToForm} />
        <WaveAudienceToTimeline />

        {/* 05. Não É Só Contratar (Timeline) */}
        <ProcessTimelineSection onOpenAnalysis={scrollToForm} />
        <WaveTimelineToRH />

        {/* 06. Dor do RH / Gestão */}
        <RHPainSection onOpenAnalysis={scrollToForm} />
        <WaveRHToCost />

        {/* 07. Custo Não É Tudo */}
        <CostAnalysisSection onOpenAnalysis={scrollToForm} />
        <WaveCostToHow />

        {/* 08. Como Funciona */}
        <HowItWorksSection onOpenAnalysis={scrollToForm} />

        {/* 08.1 Coberturas por Ramo */}
        <CoverageCategoriesSection onOpenAnalysis={scrollToForm} />

        {/* 08.2 Principais Seguradoras */}
        <InsurersSection onOpenAnalysis={scrollToForm} />
        <WaveHowToForm />

        {/* 09. Formulário Principal */}
        <MainLeadForm onNavigateFormulario={() => navigateTo('/formulario')} />
        <WaveFormToAuth />

        {/* 10. Autoridade & SUSEP */}
        <AuthoritySection onOpenAnalysis={scrollToForm} />
        <WaveAuthToFAQ />

        {/* 11. FAQ */}
        <FAQSection />
        <WaveFAQToFinalCTA />

        {/* 12. CTA Final */}
        <FinalCTASection onOpenAnalysis={scrollToForm} />
      </main>

      {/* 13. Footer */}
      <Footer onNavigateFormulario={() => navigateTo('/formulario')} />

      {/* 14. Floating Mobile CTAs */}
      <FloatingCTABar onOpenAnalysis={scrollToForm} />
    </div>
  );
}
