import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { ArchitecturalButton } from '../../components/common/ArchitecturalButton';
import { TaxonomyBadge } from '../../components/common/TaxonomyBadge';
import { ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: RoutePath) => void;
}

type TypologyFilter = 'ALL' | 'RESIDENTIAL' | 'COMMERCIAL' | 'CONTEMPLATIVE' | 'IN_PLANNING';

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<TypologyFilter>('ALL');

  const filterTabs = [
    { id: 'ALL' as TypologyFilter, label: 'ALL PROJECTS (05)' },
    { id: 'RESIDENTIAL' as TypologyFilter, label: 'RESIDENTIAL (03)' },
    { id: 'COMMERCIAL' as TypologyFilter, label: 'COMMERCIAL (01)' },
    { id: 'CONTEMPLATIVE' as TypologyFilter, label: 'CONTEMPLATIVE (01)' },
    { id: 'IN_PLANNING' as TypologyFilter, label: 'IN PLANNING (02)' },
  ];

  const ledgerEntries = [
    {
      no: '01',
      specimen: 'The Lacustrine Pavilions',
      typology: 'Alpine Sanctuary',
      geography: 'Engadin Valley, CH',
      status: 'PHASE II ACTIVE',
      statusType: 'active',
      delivery: 'Q4 2026',
      footprint: '4,800 – 7,200 sq.ft',
    },
    {
      no: '02',
      specimen: 'The Belvedere Enclave',
      typology: 'Horizon Penthouses',
      geography: "Cap d'Antibes, FR",
      status: 'FOUNDATION POUR',
      statusType: 'active',
      delivery: 'Q1 2027',
      footprint: '5,400 – 9,100 sq.ft',
    },
    {
      no: '03',
      specimen: 'Villa Verona Monolith',
      typology: 'Waterfront Estate',
      geography: 'Lake Como, IT',
      status: 'GROUNDBREAKING',
      statusType: 'active',
      delivery: 'Q2 2027',
      footprint: '6,200 sq.ft',
    },
    {
      no: '04',
      specimen: 'The Aurelia Portal',
      typology: 'Commercial Flagship',
      geography: 'Zurich / Milan',
      status: 'ZONING APPROVED',
      statusType: 'planning',
      delivery: 'Q3 2027',
      footprint: '14,200 sq.ft',
    },
    {
      no: '05',
      specimen: 'Kyoto Pavilion Retreat',
      typology: 'Contemplative Basalt',
      geography: 'Kyoto Foothills, JP',
      status: 'IN PLANNING',
      statusType: 'planning',
      delivery: 'Q4 2027',
      footprint: '3,800 sq.ft',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] text-[#121314]">
      {/* 1. Monograph Page Header */}
      <section className="border-b border-[#e5e2dc] bg-[#faf9f7] pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b]">
              Hills Pavillion · Portfolio
            </span>
            <span className="text-xs text-[#54524f] uppercase tracking-widest font-mono">
              PORTFOLIO INDEX: VOL. IV &bull; REGISTERED ATELIER SITES: 05
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#121314] leading-[1.05]">
                PLACES DESIGNED FOR <br />
                <span className="italic font-normal text-[#9e876b]">WHAT COMES NEXT.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#54524f] font-normal leading-relaxed">
                Monograph collection of residential sanctums and commercial flagships engineered for permanent value.
              </p>
            </div>

            <div className="text-right hidden lg:block">
              <span className="text-[10px] uppercase tracking-widest text-[#9e876b] block">CURATED CAPITAL ASSETS</span>
              <span className="font-sans text-2xl text-[#121314] font-medium">USD 1.2 Billion Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Typology Filter Tabs */}
      <section className="border-b border-[#e5e2dc] bg-[#f4f3f1] sticky top-16 z-30 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2 sharp transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#121314] text-white shadow-sm'
                      : 'bg-transparent text-[#54524f] hover:text-[#121314] hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-[#54524f]">
            <span className="font-mono text-[11px]">SORT: CHRONOLOGICAL</span>
            <span className="text-[#e5e2dc]">|</span>
            <span className="font-mono text-[11px]">DISPLAY: FULL MONOGRAPH</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-20">
        {/* 3. Featured Flagship Monument 01 (Hero Specimen Card) */}
        {(activeFilter === 'ALL' || activeFilter === 'RESIDENTIAL') && (
          <div className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-10 shadow-sm space-y-8 group">
            <div className="relative aspect-[21/9] overflow-hidden bg-[#121314] sharp">
              <img
                src="/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png"
                alt="The Lacustrine Pavilions"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#121314]/85 backdrop-blur-md px-3 py-1.5 sharp text-white text-[10px] font-semibold tracking-widest uppercase border border-white/10">
                PHASE II ACTIVE &bull; NORTH PROMONTORY
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 sharp text-[#121314] text-[10px] font-semibold tracking-widest uppercase">
                FLAGSHIP SPECIMEN 01
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl text-[#9e876b]">01</span>
                  <div className="h-4 w-[1px] bg-[#e5e2dc]" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#54524f]">
                    ENGADIN VALLEY, SWITZERLAND &bull; RESIDENTIAL SANCTUM
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                  The Lacustrine Pavilions
                </h2>

                <p className="text-sm sm:text-base text-[#54524f] font-normal leading-relaxed max-w-3xl">
                  Carved directly into the sub-alpine granite terraces, The Lacustrine Pavilions introduce a rare equilibrium of honed limestone mass, floor-to-ceiling panoramic thermal glass, and discreet subterranean wellness vaults.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#54524f]">
                  <span>14 PRIVATE ESTATES</span>
                  <span>&bull;</span>
                  <span>4,800 – 7,200 SQ.FT</span>
                  <span>&bull;</span>
                  <span>100% GEOTHERMAL</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end lg:justify-between h-full pt-4">
                <div className="lg:text-right">
                  <span className="text-[10px] text-[#54524f] uppercase tracking-widest block">Acquisition Valuation</span>
                  <span className="font-sans text-xl sm:text-2xl text-[#121314] font-medium">
                    PKR 850M / CHF 18.5M
                  </span>
                </div>

                <ArchitecturalButton
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate(ROUTES.PROJECT_DETAIL)}
                  arrow
                >
                  Explore Project
                </ArchitecturalButton>
              </div>
            </div>
          </div>
        )}

        {/* 4. Grid of Specimen Cards (02 & 03) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Specimen 02: The Belvedere Enclave */}
          {(activeFilter === 'ALL' || activeFilter === 'RESIDENTIAL') && (
            <div className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 group flex flex-col justify-between">
              <div className="space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f1ed] sharp">
                  <img
                    src="/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png"
                    alt="The Belvedere Enclave"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                    Cap d'Antibes, France
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#121314]/85 backdrop-blur-sm px-3 py-1 sharp text-white text-[10px] font-semibold uppercase tracking-wider">
                    SPECIMEN 02
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-2xl text-[#9e876b]">02</span>
                    <TaxonomyBadge variant="neutral">Horizon Penthouses</TaxonomyBadge>
                  </div>
                  <h3 className="font-serif text-2xl text-[#121314] uppercase tracking-tight">
                    The Belvedere Enclave
                  </h3>
                  <p className="text-xs text-[#54524f] leading-relaxed">
                    Ascending from maritime pine groves, six tiered horizon penthouses sculpted with raw coastal limestone, saltwater infinity terraces, and dedicated yacht slips.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2dc] flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#54524f] block text-[10px] uppercase">Scale</span>
                  <span className="font-medium text-[#121314]">6 Penthouses · 5,400–9,100 sq.ft</span>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.DISCOVERY)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Specimen 03: The Aurelia Portal Flagship */}
          {(activeFilter === 'ALL' || activeFilter === 'COMMERCIAL') && (
            <div className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 group flex flex-col justify-between">
              <div className="space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f1ed] sharp">
                  <img
                    src="/images/stitch/Modern_architectural_luxury_commercial_flagship_pa__be4b3c0104bb4c6b8fc459ec37a92fc6.png"
                    alt="The Aurelia Portal Flagship"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                    Milan / Zurich Axis
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#121314]/85 backdrop-blur-sm px-3 py-1 sharp text-white text-[10px] font-semibold uppercase tracking-wider">
                    SPECIMEN 03
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-2xl text-[#9e876b]">03</span>
                    <TaxonomyBadge variant="neutral">Commercial Flagship</TaxonomyBadge>
                  </div>
                  <h3 className="font-serif text-2xl text-[#121314] uppercase tracking-tight">
                    The Aurelia Portal Flagship
                  </h3>
                  <p className="text-xs text-[#54524f] leading-relaxed">
                    Triple-height fluted limestone colonnades framing an open structural glass atrium engineered for premier European institutions and flagship pavilions.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2dc] flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#54524f] block text-[10px] uppercase">Scale</span>
                  <span className="font-medium text-[#121314]">Institutional Atrium · 14,200 sq.ft</span>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.ADVISORY)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5. Specimen Spotlight (Dark Monolith Section) */}
        {(activeFilter === 'ALL' || activeFilter === 'RESIDENTIAL') && (
          <div className="bg-[#121314] text-white p-8 sm:p-12 sharp border border-white/10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ddc2a3]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ddc2a3]">
                  Specimen Spotlight · Private Acquisition
                </span>
              </div>
              <span className="text-xs text-stone-400 font-mono">LAKE COMO SECTOR 03</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden sharp border border-white/10">
                <img
                  src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                  alt="Villa Verona Monolith"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-[#121314]/85 backdrop-blur-sm px-4 py-2 sharp text-xs text-white uppercase tracking-widest">
                  WATERFRONT BRUTALIST SANCTUARY
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ddc2a3] block">
                  Specimen Ref: HP-VVM-01
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight">
                  Villa Verona Monolith
                </h3>
                <p className="text-sm text-stone-300 font-normal leading-relaxed">
                  Positioned on a private cliffside overlooking Lake Como, featuring board-formed charcoal concrete walls, monolithic floating bronze pavilions, and private submerged boat dock.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                  <div>
                    <span className="font-sans text-xl text-white font-medium block">180°</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">Panoramic Vista</span>
                  </div>
                  <div>
                    <span className="font-sans text-xl text-[#ddc2a3] font-medium block">100%</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">Geothermal</span>
                  </div>
                  <div>
                    <span className="font-sans text-xl text-white font-medium block">Private</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">Pier & Moor</span>
                  </div>
                </div>

                <div className="pt-2">
                  <ArchitecturalButton
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto bg-[#ddc2a3] text-[#121314] hover:bg-white"
                    onClick={() => onNavigate(ROUTES.ADVISORY)}
                    arrow
                  >
                    Inquire for Private Allocation
                  </ArchitecturalButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Further Specimens Grid (04 & 05) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Specimen 04: The Brasília Brutalist Tower */}
          {(activeFilter === 'ALL' || activeFilter === 'CONTEMPLATIVE' || activeFilter === 'RESIDENTIAL') && (
            <div className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 group flex flex-col justify-between">
              <div className="space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f1ed] sharp">
                  <img
                    src="/images/stitch/High-end_architectural_construction_site_progress___b158f37442334254887a382db650c7f6.png"
                    alt="The Brasília Brutalist Tower"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                    Brasília Promontory
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#121314]/85 backdrop-blur-sm px-3 py-1 sharp text-white text-[10px] font-semibold uppercase tracking-wider">
                    SPECIMEN 04
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-2xl text-[#9e876b]">04</span>
                    <TaxonomyBadge variant="neutral">Brutalist Tower</TaxonomyBadge>
                  </div>
                  <h3 className="font-serif text-2xl text-[#121314] uppercase tracking-tight">
                    The Brasília Brutalist Tower
                  </h3>
                  <p className="text-xs text-[#54524f] leading-relaxed">
                    Deep fluted board-formed concrete monolith engineered for severe seismic stability and thermal mass buffering with panoramic plateau apertures.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2dc] flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#54524f] block text-[10px] uppercase">Scale</span>
                  <span className="font-medium text-[#121314]">8 Residences · 8,400 sq.ft</span>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.CONSTRUCTION)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Specimen 05: Kyoto Pavilion Retreat */}
          {(activeFilter === 'ALL' || activeFilter === 'CONTEMPLATIVE' || activeFilter === 'IN_PLANNING') && (
            <div className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 group flex flex-col justify-between">
              <div className="space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f1ed] sharp">
                  <img
                    src="/images/stitch/Architectural_site_masterplan_axonometric_render_b__66d25f7075ce478eae67fa61ae2db7eb.png"
                    alt="Kyoto Pavilion Retreat"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                    Kyoto Foothills, Japan
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#121314]/85 backdrop-blur-sm px-3 py-1 sharp text-white text-[10px] font-semibold uppercase tracking-wider">
                    SPECIMEN 05
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-2xl text-[#9e876b]">05</span>
                    <TaxonomyBadge variant="neutral">Contemplative Architecture</TaxonomyBadge>
                  </div>
                  <h3 className="font-serif text-2xl text-[#121314] uppercase tracking-tight">
                    Kyoto Pavilion Retreat
                  </h3>
                  <p className="text-xs text-[#54524f] leading-relaxed">
                    Charred yakisugi cedar siding framed with flamed basalt stone, internal zen gravel atriums, and natural onsen springs fed directly from subterranean thermal veins.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2dc] flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#54524f] block text-[10px] uppercase">Scale</span>
                  <span className="font-medium text-[#121314]">6 Sanctuaries · 3,800 sq.ft</span>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.ADVISORY)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 7. ARCHITECTURAL MASTER LEDGER */}
        <section className="bg-white border border-[#e5e2dc] sharp p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-1">
                Atelier Registry &bull; 2026 / 2027
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#121314] uppercase tracking-tight">
                Architectural Master Ledger
              </h3>
            </div>
            <p className="text-xs text-[#54524f] max-w-sm sm:text-right">
              Chronological catalog of active and planned atelier developments with spatial specifications.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e5e2dc] text-[#54524f] font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-2">No.</th>
                  <th className="py-3 px-4">Specimen</th>
                  <th className="py-3 px-4">Typology</th>
                  <th className="py-3 px-4">Geography</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Delivery</th>
                  <th className="py-3 px-4 text-right">Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e2dc]/60">
                {ledgerEntries.map((row) => (
                  <tr key={row.no} className="hover:bg-[#f4f3f1] transition-colors">
                    <td className="py-4 px-2 font-mono text-[#9e876b] font-medium">{row.no}</td>
                    <td className="py-4 px-4 font-serif text-sm font-medium text-[#121314]">
                      {row.specimen}
                    </td>
                    <td className="py-4 px-4 text-[#54524f]">{row.typology}</td>
                    <td className="py-4 px-4 text-[#54524f]">{row.geography}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sharp text-[10px] font-semibold tracking-wider uppercase bg-[#f4f3f1] text-[#121314] border border-[#e5e2dc]">
                        <span className={`w-1.5 h-1.5 ${row.statusType === 'active' ? 'bg-[#9e876b]' : 'bg-[#54524f]'}`} />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-[#54524f]">{row.delivery}</td>
                    <td className="py-4 px-4 text-right font-mono text-[#121314] font-medium">{row.footprint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Bottom CTA Banner */}
        <section className="bg-[#f4f3f1] border border-[#e5e2dc] sharp p-8 sm:p-12 text-center space-y-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
            Confidential Acquisition Concierge
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
            Looking for a Specific Property?
          </h3>
          <p className="text-sm text-[#54524f] max-w-xl mx-auto font-normal leading-relaxed">
            Our private client advisory coordinates bespoke property matching, confidential off-market allocations, and customized site visits.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <ArchitecturalButton
              variant="primary"
              size="md"
              onClick={() => onNavigate(ROUTES.DISCOVERY)}
            >
              Discover Inventory
            </ArchitecturalButton>

            <ArchitecturalButton
              variant="secondary"
              size="md"
              onClick={() => onNavigate(ROUTES.ADVISORY)}
            >
              Schedule Private Advisory
            </ArchitecturalButton>
          </div>
        </section>
      </div>
    </div>
  );
};
