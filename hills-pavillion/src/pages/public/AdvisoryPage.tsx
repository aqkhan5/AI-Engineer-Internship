import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { useDemoState } from '../../hooks/useDemoState';
import { ArchitecturalButton } from '../../components/common/ArchitecturalButton';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Building,
  Landmark,
  Compass,
  Briefcase,
} from 'lucide-react';

interface AdvisoryPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AdvisoryPage: React.FC<AdvisoryPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();

  const [step, setStep] = useState(1);
  const [typology, setTypology] = useState('Residential Sanctum');
  const [monument, setMonument] = useState('The Lacustrine Pavilions');
  const [format, setFormat] = useState('Single Private Estate');
  const [dimension, setDimension] = useState('5,000 – 8,000 sq.ft');
  const [budget, setBudget] = useState('PKR 350M – 500M');
  const [horizon, setHorizon] = useState('Immediate Allocation (< 60 Days)');
  const [directive, setDirective] = useState('Generational Legacy Sanctum');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [authority, setAuthority] = useState('Principal / Self');
  const [confidentialNotes, setConfidentialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dossierRef = 'REF: HP-8412';

  const monumentImages: Record<string, string> = {
    'The Lacustrine Pavilions': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
    'The Belvedere Enclave': '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
    'Villa Verona Monolith': '/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png',
    'Kyoto Pavilion Retreat': '/images/stitch/Architectural_site_masterplan_axonometric_render_b__66d25f7075ce478eae67fa61ae2db7eb.png',
    'Unconstrained Global Placement': '/images/stitch/Modern_architectural_luxury_commercial_flagship_pa__be4b3c0104bb4c6b8fc459ec37a92fc6.png',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    demo.addLead({
      name: name.trim() || 'Private Client Principal',
      targetProject: monument,
      targetUnit: demoState.selectedUnitId || 'Unit A-102',
      budget: budget,
      phone: phone.trim() || '+41 79 382 9102',
      notes: `Directive: ${directive}. Authority: ${authority}. Email: ${email}. Format: ${format} (${dimension}). Notes: ${confidentialNotes}`,
    });
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] text-[#121314]">
      {/* 1. Top Dossier Header Banner */}
      <section className="border-b border-[#e5e2dc] bg-[#faf9f7] pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#9e876b]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b]">
              Private Client Advisory / Bespoke Acquisition Concierge
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#121314] leading-[1.08] max-w-2xl">
              LET'S FIND THE RIGHT <br />
              <span className="italic font-normal text-[#9e876b]">OPPORTUNITY FOR YOU.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#54524f] font-normal max-w-md leading-relaxed">
              An intelligent, confidential consultation framework designed to align discerning patrons with generational architectural estates, private commercial flagships, and off-market allocations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Live Step Progress Horizon */}
      <section className="border-b border-[#e5e2dc] bg-[#f4f3f1] sticky top-16 z-30 px-6 sm:px-12 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
            {[
              { num: 'STEP 01', label: 'Interest' },
              { num: 'STEP 02', label: 'Monument' },
              { num: 'STEP 03', label: 'Parameters' },
              { num: 'STEP 04', label: 'Directive' },
              { num: 'STEP 05', label: 'Enrollment' },
            ].map((s, idx) => {
              const currentStepIndex = idx + 1;
              const isPassed = step > currentStepIndex;
              const isCurrent = step === currentStepIndex;
              return (
                <div
                  key={s.num}
                  onClick={() => {
                    if (currentStepIndex < step) setStep(currentStepIndex);
                  }}
                  className={`py-2 px-1 sm:px-2 border-b-2 transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#121314] text-[#121314] font-semibold'
                      : isPassed
                      ? 'border-[#9e876b] text-[#9e876b]'
                      : 'border-transparent text-stone-400'
                  }`}
                >
                  <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-widest">{s.num}</span>
                  <span className="hidden sm:block text-xs uppercase tracking-wider mt-0.5">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Framework Split View */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {submitted ? (
          /* Submission Success State */
          <div className="bg-white border border-[#e5e2dc] p-10 sm:p-16 sharp text-center space-y-8 max-w-3xl mx-auto shadow-md">
            <div className="w-16 h-16 bg-[#121314] text-[#ddc2a3] mx-auto flex items-center justify-center sharp border border-white/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
                Acquisition Dossier Confirmed &bull; {dossierRef}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#121314] uppercase tracking-tight">
                Enrollment Transmitted
              </h2>
              <p className="text-base text-[#54524f] max-w-lg mx-auto font-normal leading-relaxed">
                Your private enrollment dossier has been securely anchored into the Hills Pavillion Atelier Registry.
              </p>
            </div>

            {/* SLA Commitment Card */}
            <div className="bg-[#f4f3f1] border border-[#e5e2dc] sharp p-6 max-w-md mx-auto space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#121314]">Client SLA Standard</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  4-Hour Response
                </span>
              </div>
              <p className="text-xs text-[#54524f] leading-relaxed">
                An Atelier Senior Partner will initiate confidential contact via WhatsApp or telephone within four hours to schedule your private consultation or site transfer.
              </p>
              <div className="pt-2 border-t border-[#e5e2dc] text-[11px] text-[#54524f] font-mono">
                Assigned Unit: <span className="text-[#121314] font-bold">{demoState.selectedUnitId || 'Unit A-102'}</span> ({monument})
              </div>
            </div>

            {/* Platform & Navigation Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <ArchitecturalButton
                variant="primary"
                size="lg"
                onClick={() => onNavigate(ROUTES.PLATFORM_LEADS)}
                arrow
              >
                View Lead in Internal CRM
              </ArchitecturalButton>

              <ArchitecturalButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
              >
                Submit Another Inquiry
              </ArchitecturalButton>
            </div>
          </div>
        ) : (
          /* 5-Step Funnel Split View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT / INTERACTIVE COLUMN */}
            <div className="lg:col-span-7 bg-white border border-[#e5e2dc] sharp p-8 sm:p-12 space-y-8 shadow-sm">
              {/* STEP 01: TYPOLOGICAL HORIZON */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                      Step 01 / 05 &bull; Typology Discovery
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                      What are you interested in?
                    </h2>
                    <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                      Select your typological preference. Each pathway unlocks distinct private inventory and specialized advisory protocols.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        num: 'I.',
                        title: 'Residential Sanctum',
                        desc: 'Private estates, lakefront penthouses, alpine retreats, and cliffside compounds engineered for permanent serenity.',
                      },
                      {
                        num: 'II.',
                        title: 'Commercial Flagship',
                        desc: 'Bespoke family office pavilions, private galleries, institutional atriums, and curated retail spaces.',
                      },
                      {
                        num: 'III.',
                        title: 'Plot & Monument Site',
                        desc: 'Virgin alpine parcels, protected Mediterranean promontories, and generational freehold topography ready for custom commission.',
                      },
                      {
                        num: 'IV.',
                        title: 'Capital Investment',
                        desc: 'Syndicated debt instruments, inflation hedging stone and timber holdings, and institutional equity allocations.',
                      },
                      {
                        num: 'V.',
                        title: 'Bespoke Commission',
                        desc: 'Complete greenfield architectural commission legally governed by the Hills Pavillion master atelier and founding partners.',
                      },
                    ].map((opt) => (
                      <div
                        key={opt.title}
                        onClick={() => setTypology(opt.title)}
                        className={`p-5 sharp border transition-all cursor-pointer flex items-start gap-4 ${
                          typology === opt.title
                            ? 'bg-[#f4f3f1] border-[#121314] shadow-sm'
                            : 'bg-white border-[#e5e2dc] hover:border-[#9e876b]'
                        }`}
                      >
                        <span className="font-serif text-lg text-[#9e876b] font-medium">{opt.num}</span>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">{opt.title}</h4>
                          <p className="text-[11px] text-[#54524f] font-normal leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <ArchitecturalButton
                      variant="primary"
                      size="md"
                      onClick={() => setStep(2)}
                      arrow
                    >
                      Proceed to Monument
                    </ArchitecturalButton>
                  </div>
                </div>
              )}

              {/* STEP 02: MONUMENT & GEOGRAPHY */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                      Step 02 / 05 &bull; Geographical Axis
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                      Which development commands your focus?
                    </h2>
                    <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                      Select your target specimen enclave or request an unconstrained multi-geography placement briefing.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        name: 'The Lacustrine Pavilions',
                        geo: 'Engadin Valley, Switzerland',
                        spec: 'Sub-alpine granite lakefront · Phase II active framing',
                      },
                      {
                        name: 'The Belvedere Enclave',
                        geo: "Cap d'Antibes, France",
                        spec: 'Maritime limestone horizon terraces · 6 private penthouses',
                      },
                      {
                        name: 'Villa Verona Monolith',
                        geo: 'Lake Como, Italy',
                        spec: 'Cliffside board-formed charcoal concrete · Submerged dock',
                      },
                      {
                        name: 'Kyoto Pavilion Retreat',
                        geo: 'Kyoto Foothills, Japan',
                        spec: 'Yakisugi charred cedar siding & basalt onsen villa',
                      },
                      {
                        name: 'Unconstrained Global Placement',
                        geo: 'Global Coordinates',
                        spec: 'Comprehensive cross-portfolio briefing across all jurisdictions',
                      },
                    ].map((mon) => (
                      <div
                        key={mon.name}
                        onClick={() => setMonument(mon.name)}
                        className={`p-5 sharp border transition-all cursor-pointer flex items-center justify-between ${
                          monument === mon.name
                            ? 'bg-[#f4f3f1] border-[#121314] shadow-sm'
                            : 'bg-white border-[#e5e2dc] hover:border-[#9e876b]'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-[#9e876b] tracking-wider block">
                            {mon.geo}
                          </span>
                          <h4 className="font-serif text-lg text-[#121314] uppercase tracking-tight">{mon.name}</h4>
                          <p className="text-[11px] text-[#54524f] font-normal">{mon.spec}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          monument === mon.name ? 'border-[#121314] bg-[#121314]' : 'border-stone-300'
                        }`}>
                          {monument === mon.name && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#54524f] hover:text-[#121314] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <ArchitecturalButton
                      variant="primary"
                      size="md"
                      onClick={() => setStep(3)}
                      arrow
                    >
                      Proceed to Parameters
                    </ArchitecturalButton>
                  </div>
                </div>
              )}

              {/* STEP 03: SPATIAL PARAMETERS & CAPITAL */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                      Step 03 / 05 &bull; Portfolio Parameters
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                      Spatial Scale & Capital
                    </h2>
                    <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                      Define the target footprint and acquisition allocation aligned with your private wealth structure.
                    </p>
                  </div>

                  {/* Format */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block">
                      Typological Format
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Single Private Estate', 'Multi-Generation Compound', 'Flagship Gallery / Office'].map((f) => (
                        <div
                          key={f}
                          onClick={() => setFormat(f)}
                          className={`p-3 text-xs text-center sharp border cursor-pointer transition-all ${
                            format === f
                              ? 'bg-[#121314] text-white border-[#121314]'
                              : 'bg-white text-[#54524f] border-[#e5e2dc] hover:border-[#9e876b]'
                          }`}
                        >
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimension */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block">
                      Target Living Dimension
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['3,500 – 5,000 sq.ft', '5,000 – 8,000 sq.ft', '8,000+ sq.ft Custom'].map((d) => (
                        <div
                          key={d}
                          onClick={() => setDimension(d)}
                          className={`p-3 text-xs text-center sharp border cursor-pointer transition-all ${
                            dimension === d
                              ? 'bg-[#121314] text-white border-[#121314]'
                              : 'bg-white text-[#54524f] border-[#e5e2dc] hover:border-[#9e876b]'
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capital Spectrum */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block">
                      Capital Allocation Spectrum
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['PKR 350M – 500M', 'PKR 500M – 800M', 'Above PKR 800M+'].map((b) => (
                        <div
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`p-3 text-xs text-center sharp border cursor-pointer transition-all ${
                            budget === b
                              ? 'bg-[#121314] text-white border-[#121314]'
                              : 'bg-white text-[#54524f] border-[#e5e2dc] hover:border-[#9e876b]'
                          }`}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Horizon */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block">
                      Acquisition Horizon Cycle
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        'Immediate Allocation (< 60 Days)',
                        '12 – 24 Month Handover',
                        '36+ Month Long-Term Planning',
                      ].map((h) => (
                        <div
                          key={h}
                          onClick={() => setHorizon(h)}
                          className={`p-3 text-xs text-center sharp border cursor-pointer transition-all ${
                            horizon === h
                              ? 'bg-[#121314] text-white border-[#121314]'
                              : 'bg-white text-[#54524f] border-[#e5e2dc] hover:border-[#9e876b]'
                          }`}
                        >
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#54524f] hover:text-[#121314] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <ArchitecturalButton
                      variant="primary"
                      size="md"
                      onClick={() => setStep(4)}
                      arrow
                    >
                      Proceed to Directive
                    </ArchitecturalButton>
                  </div>
                </div>
              )}

              {/* STEP 04: PRIMARY STRATEGIC DIRECTIVE */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                      Step 04 / 05 &bull; Acquisition Mandate
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                      Primary Strategic Directive
                    </h2>
                    <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                      What is the primary defining objective of this spatial allocation?
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: 'Generational Legacy Sanctum',
                        desc: 'Enduring family retreat held in perpetual freehold trust for multiple generations.',
                        icon: Building,
                      },
                      {
                        title: 'Sovereign Capital Preservation',
                        desc: 'Defensive real asset investment protected by zero-debt development pipelines and Swiss notary governance.',
                        icon: Landmark,
                      },
                      {
                        title: 'Bespoke Escorted Site Visit',
                        desc: 'Immediate coordination of private helicopter transfer and on-site inspection with founding partners.',
                        icon: Compass,
                      },
                      {
                        title: 'Discretion & Tax Governance',
                        desc: 'Confidential off-market acquisition managed through family office or private banking fiduciary representatives.',
                        icon: Briefcase,
                      },
                    ].map((dir) => {
                      const Icon = dir.icon;
                      return (
                        <div
                          key={dir.title}
                          onClick={() => setDirective(dir.title)}
                          className={`p-5 sharp border transition-all cursor-pointer flex items-start gap-4 ${
                            directive === dir.title
                              ? 'bg-[#f4f3f1] border-[#121314] shadow-sm'
                              : 'bg-white border-[#e5e2dc] hover:border-[#9e876b]'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-[#9e876b] shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">
                              {dir.title}
                            </h4>
                            <p className="text-[11px] text-[#54524f] font-normal leading-relaxed">
                              {dir.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#54524f] hover:text-[#121314] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <ArchitecturalButton
                      variant="primary"
                      size="md"
                      onClick={() => setStep(5)}
                      arrow
                    >
                      Proceed to Enrollment
                    </ArchitecturalButton>
                  </div>
                </div>
              )}

              {/* STEP 05: CONFIDENTIAL ENROLLMENT */}
              {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                      Step 05 / 05 &bull; Transmission
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                      Confidential Enrollment
                    </h2>
                    <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                      All dossiers remain strictly confidential and privileged. Transmissions are encrypted and assigned directly to partner desk.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block mb-1">
                        Patron Full Name / Principal *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Lord Alistair Vance or Dr. Tariq Mansoor"
                        className="w-full bg-[#faf9f7] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block mb-1">
                          Direct Secure Mobile / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+41 79 000 0000 or +92 300 0000000"
                          className="w-full bg-[#faf9f7] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block mb-1">
                          Atelier Inscription (Email) *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@familyoffice.com"
                          className="w-full bg-[#faf9f7] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block mb-1">
                        Advisory Representation Authority
                      </label>
                      <select
                        value={authority}
                        onChange={(e) => setAuthority(e.target.value)}
                        className="w-full bg-[#faf9f7] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                      >
                        <option>Principal / Self</option>
                        <option>Family Office Director</option>
                        <option>Private Banking Wealth Advisor</option>
                        <option>Fiduciary Attorney</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f] block mb-1">
                        Confidential Directives / Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        value={confidentialNotes}
                        onChange={(e) => setConfidentialNotes(e.target.value)}
                        placeholder="Specific requirements regarding helicopter transfers, non-disclosure protocols, or custom architectural amendments..."
                        className="w-full bg-[#faf9f7] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#e5e2dc]">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#54524f] hover:text-[#121314] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#121314] text-white text-xs font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer flex items-center gap-2 shadow-md"
                    >
                      <span>Confirm & Transmit Enrollment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: Live Client Dossier Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#121314] text-white p-8 sharp border border-white/10 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ddc2a3] animate-pulse" />
                    <span className="font-semibold uppercase tracking-widest text-[#ddc2a3] text-[10px]">
                      Curated Advisory Dossier
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-400">{dossierRef}</span>
                </div>

                {/* Specimen Render */}
                <div className="relative aspect-[16/9] overflow-hidden sharp border border-white/10">
                  <img
                    src={monumentImages[monument] || monumentImages['The Lacustrine Pavilions']}
                    alt={monument}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#121314]/85 px-2.5 py-1 sharp text-[9px] font-semibold uppercase tracking-wider text-white">
                    {monument}
                  </div>
                </div>

                {/* Dossier Fields */}
                <div className="space-y-3 text-xs divide-y divide-white/10">
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-400 uppercase text-[10px]">Selected Interest</span>
                    <span className="text-white font-medium">{typology}</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-400 uppercase text-[10px]">Monument</span>
                    <span className="text-[#ddc2a3] font-medium">{monument}</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-400 uppercase text-[10px]">Scale Format</span>
                    <span className="text-white font-mono">{format} ({dimension})</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-400 uppercase text-[10px]">Capital Range</span>
                    <span className="text-[#ddc2a3] font-mono font-semibold">{budget}</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-400 uppercase text-[10px]">Target Unit</span>
                    <span className="text-white font-mono">{demoState.selectedUnitId || 'Unit A-102'}</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-stone-400 uppercase text-[10px]">Primary Directive</span>
                    <span className="text-white font-medium text-right max-w-[200px] truncate">{directive}</span>
                  </div>
                </div>

                {/* WhatsApp Direct Action */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-widest sharp border border-white/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#ddc2a3]" />
                    <span>Direct WhatsApp Concierge</span>
                  </a>
                </div>
              </div>

              {/* Atelier Creed Card */}
              <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                  Architectural Custody & Sovereignty
                </span>
                <p className="font-serif text-xs text-[#121314] italic leading-relaxed">
                  "We regard the home not simply as physical shelter, but as an eternal contemplation sanctuary. Every commission remains an act of profound structural silence."
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase font-semibold tracking-wider text-[#54524f] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9e876b]" />
                  <span>Hills Pavillion Atelier Creed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Bottom Value Tenets */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#e5e2dc]">
          <div className="space-y-2 p-6 bg-white border border-[#e5e2dc] sharp">
            <span className="font-sans font-medium text-xl text-[#9e876b]">01</span>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Artisanal Permanence</h4>
            <p className="text-[11px] text-[#54524f] leading-relaxed">
              Each monument is limited to single-digit collector editions across European and alpine sanctuaries.
            </p>
          </div>
          <div className="space-y-2 p-6 bg-white border border-[#e5e2dc] sharp">
            <span className="font-sans font-medium text-xl text-[#9e876b]">02</span>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Fiduciary Integrity</h4>
            <p className="text-[11px] text-[#54524f] leading-relaxed">
              Structured staged drawdowns audited and certified by Swiss cantonal institutional custodians.
            </p>
          </div>
          <div className="space-y-2 p-6 bg-white border border-[#e5e2dc] sharp">
            <span className="font-sans font-medium text-xl text-[#9e876b]">03</span>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Bespoke Governance</h4>
            <p className="text-[11px] text-[#54524f] leading-relaxed">
              Direct liaison with our principal architects and master stone carvers throughout execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
