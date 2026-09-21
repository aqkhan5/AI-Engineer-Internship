import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { ArchitecturalButton } from '../../components/common/ArchitecturalButton';
import { MetricCounter } from '../../components/common/MetricCounter';
import { useDemoState } from '../../hooks/useDemoState';
import {
  MapPin,
  ShieldCheck,
  Flame,
  Wifi,
  Sparkles,
  Wine,
  Anchor,
  Clock,
} from 'lucide-react';

interface ProjectDetailPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();
  const [activeLevelFilter, setActiveLevelFilter] = useState('ALL');

  const handleInquireUnit = (unitId: string) => {
    demo.selectUnit(unitId);
    onNavigate(ROUTES.ADVISORY);
  };

  const levelTabs = [
    { id: 'ALL', label: 'ALL LEVELS' },
    { id: 'LEVEL 01', label: 'LEVEL 01 (PROMONTORY)' },
    { id: 'LEVEL 02', label: 'LEVEL 02 (ORCHARD)' },
    { id: 'LEVEL 03', label: 'LEVEL 03 (HILLSIDE)' },
    { id: 'LEVEL 04', label: 'LEVEL 04 (SKY)' },
  ];

  const filteredUnits = activeLevelFilter === 'ALL'
    ? demoState.units
    : demoState.units.filter((u) => u.level.toUpperCase().includes(activeLevelFilter.toUpperCase()));

  const archetypes = [
    {
      no: 'I',
      title: 'Monolith Estate',
      category: '10 Marla Lakefront Cantilever',
      footprint: '5,800 sq.ft (540 m²)',
      price: 'PKR 850M / CHF 18.5M',
      features: ['Cantilevered infinity pool', 'Honed Rapolano travertine', 'Subterranean wellness spa'],
      image: '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
      targetUnit: 'A-102',
    },
    {
      no: 'II',
      title: 'Sky Solarium Villa',
      category: '8 Marla Hillside Solarium',
      footprint: '4,800 sq.ft (446 m²)',
      price: 'PKR 720M / CHF 15.6M',
      features: ['Dual-aspect thermal glass', 'Private rooftop observatory', 'Triple garage with EV gallery'],
      image: '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
      targetUnit: 'A-404',
    },
    {
      no: 'III',
      title: 'Glacier Courtyard',
      category: '12 Marla Cloistered Sanctuary',
      footprint: '7,200 sq.ft (670 m²)',
      price: 'PKR 980M / CHF 21.2M',
      features: ['Internal zen basalt garden', 'Submerged onsen thermal pool', 'Master suite panoramic wing'],
      image: '/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png',
      targetUnit: 'A-202',
    },
    {
      no: 'IV',
      title: 'Sanctuary Custom Plots',
      category: '18 Marla Prime Alpine Parcel',
      footprint: '14,000 sq.ft (1,300 m²)',
      price: 'Upon Confidential Request',
      features: ['Direct shoreline riparian rights', 'Custom architect commission', 'Private helicopter landing rights'],
      image: '/images/stitch/Architectural_site_masterplan_axonometric_render_b__66d25f7075ce478eae67fa61ae2db7eb.png',
      targetUnit: 'A-304',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] text-[#121314]">
      {/* 1. FULLSCREEN PROJECT HERO */}
      <section className="relative w-full overflow-hidden bg-[#121314] min-h-[92vh] flex flex-col justify-between px-6 sm:px-12 py-16 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png"
            alt="The Lacustrine Pavilions"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121314] via-[#121314]/50 to-[#121314]/30" />
        </div>

        {/* Top Breadcrumb & Metadata */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest uppercase pt-4 text-[#ddc2a3]">
          <div className="flex items-center gap-3">
            <span
              onClick={() => onNavigate(ROUTES.PROJECTS)}
              className="hover:underline cursor-pointer opacity-80"
            >
              PORTFOLIO
            </span>
            <span className="opacity-50">/</span>
            <span className="text-white font-semibold">MONUMENT 01 &bull; SWISS ALPINE HORIZON</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#ddc2a3]" />
            <span>ENGADIN VALLEY &bull; 1,820M MASL</span>
          </div>
        </div>

        {/* Hero Central Header */}
        <div className="relative z-10 max-w-5xl mx-auto my-auto py-12 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#ddc2a3] uppercase">
              Master Flagship Specimen
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white uppercase leading-[1.04]">
            The Lacustrine <br />
            <span className="italic font-normal text-[#ddc2a3]">Pavilions</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
            Honed limestone cantilevers, panoramic acoustic glass curtain walls, and closed-loop geothermal systems.
            A generational residential enclave carved directly into the sub-alpine promontory.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ArchitecturalButton
            variant="primary"
            size="lg"
            className="w-full sm:w-auto bg-white text-[#121314] hover:bg-[#ddc2a3]"
            onClick={() => onNavigate(ROUTES.ADVISORY)}
            arrow
          >
            Book Private Viewing
          </ArchitecturalButton>

          <ArchitecturalButton
            variant="dark-outline"
            size="lg"
            className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10"
            onClick={() => {
              const el = document.getElementById('inventory-directory');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Inquire on Units
          </ArchitecturalButton>
        </div>

        {/* 5 Key Metric Counters */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-5 gap-6 text-left">
          <MetricCounter value="28" label="Total Units" sublabel="Exclusive Enclave" theme="dark" borderRight />
          <MetricCounter value="73%" label="Framing Complete" sublabel="Phase II Active" theme="dark" borderRight />
          <MetricCounter value="1,200 m²" label="Average Footprint" sublabel="Estate & Grounds" theme="dark" borderRight />
          <MetricCounter value="Q4 2026" label="Target Handover" sublabel="On Schedule" theme="dark" borderRight />
          <MetricCounter value="100%" label="Geothermal" sublabel="Zero Fossil Fuel" theme="dark" />
        </div>
      </section>

      {/* 2. ARCHITECTURAL CREED & SPECIFICATIONS */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 border-b border-[#e5e2dc]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Architectural Concept
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight leading-tight">
              Designed Around the Water's Reflection.
            </h2>
            <p className="text-base sm:text-lg text-[#121314] font-normal leading-relaxed">
              Every pavilion is situated along a micro-topographical axis designed to optimize natural diurnal light cycles and capture the pristine reflecting plane of Lake Silvaplana.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#54524f] font-normal leading-relaxed">
            <p>
              Constructed using local Andeer granite and hand-dressed Rapolano travertine, the structural volumes appear to emerge directly from the bedrock. Cantilevered floorplates extend up to 14 meters over the water line, supported by hidden post-tensioned carbon tendons.
            </p>
            <p>
              Thermal comfort is managed completely without air conditioning through an array of 24 deep geothermal probes and intelligent triple-cavity acoustic glass facades providing sound insulation exceeding 48 dB.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#e5e2dc] text-xs">
              <div>
                <span className="text-[10px] uppercase text-[#54524f] block font-semibold">Master Architect</span>
                <span className="font-medium text-[#121314]">Hills Pavillion Atelier S.A.</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#54524f] block font-semibold">Independent Audit</span>
                <span className="font-medium text-[#121314]">SGS Switzerland AG</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#54524f] block font-semibold">Title Framework</span>
                <span className="font-medium text-[#121314]">Swiss Lex Koller Freehold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MASTERPLAN & ZONAL ANATOMY */}
      <section className="w-full bg-[#f4f3f1] py-24 border-b border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Zonal Cartography &bull; 1:500 Axonometric
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                The Estuary Masterplan
              </h2>
            </div>
            <p className="text-xs text-[#54524f] max-w-sm sm:text-right">
              28 private residences zoned into three micro-neighborhoods connected by subterranean gallery driveways.
            </p>
          </div>

          <div className="relative aspect-[21/10] overflow-hidden bg-white border border-[#e5e2dc] sharp shadow-md">
            <img
              src="/images/stitch/Architectural_site_masterplan_axonometric_render_b__66d25f7075ce478eae67fa61ae2db7eb.png"
              alt="The Estuary Masterplan"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-[#121314]/85 backdrop-blur-md px-3 py-1.5 sharp text-white text-[10px] font-semibold tracking-widest uppercase border border-white/10">
              AXONOMETRIC BLUEPRINT REGISTRY &bull; PLATE 03
            </div>
          </div>

          {/* 5-Column Zonal Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-serif text-xl text-[#9e876b]">01</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Lakefront Promontory</h4>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Direct water-access villas with private submerged boat cradles and cantilevered pools.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-serif text-xl text-[#9e876b]">02</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">The Central Orchard</h4>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Alpine apple orchards and native stone walking cloister buffering private estates.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-serif text-xl text-[#9e876b]">03</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Hillside Terraces</h4>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Elevated positions capturing 180° southern mountain light and thermal solar mass.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-serif text-xl text-[#9e876b]">04</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Private Marina & Jetty</h4>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Electric watercraft charging berths and direct hydrofoil connection to lake towns.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-serif text-xl text-[#9e876b]">05</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Wellness Pavilion & Spa</h4>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Biophilic thermal baths fed directly from sub-alpine geothermal springs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESPOKE STRUCTURAL ARCHETYPES */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 border-b border-[#e5e2dc]">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Archetypal Typologies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
              Bespoke Structural Archetypes
            </h2>
            <p className="text-sm text-[#54524f] font-normal leading-relaxed">
              Four distinct spatial executions engineered for specific patron profiles, all sharing the core monolithic materiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {archetypes.map((arch) => (
              <div
                key={arch.no}
                className="bg-white border border-[#e5e2dc] sharp p-6 space-y-6 flex flex-col justify-between hover:border-[#9e876b] transition-colors group cursor-pointer"
                onClick={() => handleInquireUnit(arch.targetUnit)}
              >
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed] sharp">
                    <img
                      src={arch.image}
                      alt={arch.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#121314]/85 backdrop-blur-sm px-2.5 py-1 sharp text-white text-[9px] font-semibold uppercase tracking-wider">
                      ARCHETYPE {arch.no}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] block mb-1">
                      {arch.category}
                    </span>
                    <h3 className="font-serif text-xl text-[#121314] uppercase tracking-tight">
                      {arch.title}
                    </h3>
                  </div>

                  <div className="py-2 border-y border-[#e5e2dc] text-xs">
                    <span className="text-[10px] uppercase text-[#54524f] block">Living Footprint</span>
                    <span className="font-medium text-[#121314]">{arch.footprint}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#54524f]">
                    {arch.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#9e876b]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#e5e2dc] space-y-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#54524f] block">Valuation</span>
                    <span className="font-sans text-sm font-semibold text-[#121314]">{arch.price}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquireUnit(arch.targetUnit);
                    }}
                    className="w-full py-2 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer"
                  >
                    Select Archetype &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESPOKE AMENITIES & INFRASTRUCTURE (DARK SECTION) */}
      <section className="w-full bg-[#121314] text-white py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ddc2a3] block">
              Infrastructure &bull; Engineering Matrix
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-tight text-white">
              Bespoke Amenities & Infrastructure
            </h2>
            <p className="text-sm text-stone-300 font-normal leading-relaxed">
              Designed to operate autonomously with dedicated redundant systems, continuous private security, and sovereign telecommunications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-white/10 sharp space-y-4">
              <Anchor className="w-6 h-6 text-[#ddc2a3]" />
              <h3 className="font-serif text-xl uppercase tracking-tight text-white">Private Heliport & Jetty</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                ICAO-certified private helipad on North Promontory with twin-engine clearance and all-weather instrument approach.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 sharp space-y-4">
              <Flame className="w-6 h-6 text-[#ddc2a3]" />
              <h3 className="font-serif text-xl uppercase tracking-tight text-white">Geothermal Energy Grid</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                24 boreholes sunk 320 meters into alpine granite delivering 100% heating, radiant cooling, and hot water with zero carbon emission.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 sharp space-y-4">
              <ShieldCheck className="w-6 h-6 text-[#ddc2a3]" />
              <h3 className="font-serif text-xl uppercase tracking-tight text-white">24/7 Concierge Security</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                Physical biometric perimeter gates, discreet patrols, and dedicated concierge desk handling customs, transfers, and private aviation.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 sharp space-y-4">
              <Sparkles className="w-6 h-6 text-[#ddc2a3]" />
              <h3 className="font-serif text-xl uppercase tracking-tight text-white">Biophilic Wellness Spa</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                Subterranean mineral baths, Finnish cedar saunas, cryotherapy chambers, and private treatment suites for resident families.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 sharp space-y-4">
              <Wine className="w-6 h-6 text-[#ddc2a3]" />
              <h3 className="font-serif text-xl uppercase tracking-tight text-white">Subterranean Wine Vault</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                Naturally humidity-controlled granite chambers maintaining constant 12°C year-round with private locked collector bays.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 sharp space-y-4">
              <Wifi className="w-6 h-6 text-[#ddc2a3]" />
              <h3 className="font-serif text-xl uppercase tracking-tight text-white">Fiber Optic Backbone</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                Dual redundant 10 Gbps fiber links with Starlink satellite backup, providing institutional trading-grade reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL-TIME AVAILABLE INVENTORY DIRECTORY */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 border-b border-[#e5e2dc]" id="inventory-directory">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Live Spatial Matrix &bull; Block A North Promontory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                Real-Time Inventory Directory
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9e876b] animate-ping" />
              <span className="text-xs text-[#54524f] font-mono">
                {demoState.units.filter((u) => u.status === 'AVAILABLE').length} UNITS AVAILABLE
              </span>
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {levelTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLevelFilter(tab.id)}
                className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-2 sharp transition-all cursor-pointer whitespace-nowrap ${
                  activeLevelFilter === tab.id
                    ? 'bg-[#121314] text-white'
                    : 'bg-white text-[#54524f] hover:bg-[#f4f3f1] border border-[#e5e2dc]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Unit Table */}
          <div className="overflow-x-auto bg-white border border-[#e5e2dc] sharp">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e5e2dc] bg-[#f4f3f1] text-[#54524f] font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Typology</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Living Area</th>
                  <th className="py-3 px-4">Valuation (PKR)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e2dc]/60">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-[#f4f3f1]/60 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-[#121314]">{unit.id}</td>
                    <td className="py-4 px-4 font-serif text-sm font-medium text-[#121314]">{unit.typology}</td>
                    <td className="py-4 px-4 text-[#54524f]">{unit.level}</td>
                    <td className="py-4 px-4 font-mono text-[#54524f]">
                      {unit.sqft.toLocaleString()} sq.ft ({unit.sqm} m²)
                    </td>
                    <td className="py-4 px-4 font-mono text-[#9e876b] font-semibold">{unit.pricePKR}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sharp text-[10px] font-semibold tracking-wider uppercase ${
                          unit.status === 'AVAILABLE'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : unit.status === 'RESERVED'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            unit.status === 'AVAILABLE'
                              ? 'bg-emerald-600'
                              : unit.status === 'RESERVED'
                              ? 'bg-amber-600'
                              : 'bg-stone-500'
                          }`}
                        />
                        {unit.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {unit.status === 'AVAILABLE' ? (
                        <button
                          onClick={() => handleInquireUnit(unit.id)}
                          className="px-3 py-1 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer"
                        >
                          Inquire / Reserve &rarr;
                        </button>
                      ) : (
                        <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
                          On Partner Hold
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. STRUCTURED PAYMENT ARCHITECTURE */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 border-b border-[#e5e2dc]">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Fiduciary Milestones &bull; 5 Stages
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
              Structured Payment Architecture
            </h2>
            <p className="text-sm text-[#54524f] font-normal leading-relaxed">
              Funds are held in segregated escrow accounts and disbursed only upon certification by independent structural engineering auditors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-sans font-medium text-3xl text-[#9e876b]">15%</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Reservation</h4>
              <p className="text-[11px] text-[#54524f]">Immediate unit lock & allotment agreement</p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-sans font-medium text-3xl text-[#9e876b]">20%</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Groundbreaking</h4>
              <p className="text-[11px] text-[#54524f]">Completion of bedrock anchoring</p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-sans font-medium text-3xl text-[#9e876b]">25%</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Superstructure</h4>
              <p className="text-[11px] text-[#54524f]">Completion of monolithic concrete framing</p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-sans font-medium text-3xl text-[#9e876b]">25%</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Enclosure</h4>
              <p className="text-[11px] text-[#54524f]">Acoustic glazing and thermal envelope</p>
            </div>
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-3">
              <span className="font-sans font-medium text-3xl text-[#9e876b]">15%</span>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">Handover</h4>
              <p className="text-[11px] text-[#54524f]">Key handover & final canton occupancy permit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONSTRUCTION PROGRESS & LIVE TELEMETRY */}
      <section className="w-full bg-[#f4f3f1] py-24 border-b border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Verified Progress
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                Execution Timeline: 73% Completed
              </h2>
            </div>
            <ArchitecturalButton
              variant="secondary"
              size="sm"
              onClick={() => onNavigate(ROUTES.CONSTRUCTION)}
              arrow
            >
              Open Live Construction Dashboard
            </ArchitecturalButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#121314] sharp">
              <img
                src="/images/stitch/High-end_architectural_construction_site_progress___b158f37442334254887a382db650c7f6.png"
                alt="Construction progress site"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#121314]/85 backdrop-blur-md px-3 py-1.5 sharp text-white text-[10px] font-semibold uppercase tracking-widest border border-white/10">
                LIVE TELEMETRY &bull; NORTH PROMONTORY
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 bg-white border border-[#e5e2dc] sharp p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9e876b]">
                <Clock className="w-4 h-4" />
                <span>Field Engineer Logbook &bull; 48H Update</span>
              </div>

              <h4 className="font-serif text-2xl text-[#121314] uppercase tracking-tight">
                Sector B Core Shear Walls Poured
              </h4>

              <p className="text-xs sm:text-sm text-[#54524f] font-normal leading-relaxed">
                "Core shear walls for Sector B completed on schedule. Concrete core sample tests returned 52.4 MPa compressive strength (exceeding 45 MPa specification). Glazing brackets for Level 02 arrived on site."
              </p>

              <div className="pt-4 border-t border-[#e5e2dc] text-xs text-[#54524f] space-y-1">
                <span className="font-semibold text-[#121314] block">Marcus Keller, PE</span>
                <span className="text-[10px] uppercase tracking-wider block">Lead Structural Engineer &bull; SGS Audited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CURATED IMMERSIVE GALLERY */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 border-b border-[#e5e2dc]">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Architectural Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
              Curated Architectural Specimens
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed] sharp border border-[#e5e2dc]">
              <img
                src="/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png"
                alt="Cantilever Terraces"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                Lake Elevation &bull; Twilight
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed] sharp border border-[#e5e2dc]">
              <img
                src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                alt="Travertine Facades"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                Honed Rapolano Stone
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f1ed] sharp border border-[#e5e2dc]">
              <img
                src="/images/stitch/Modern_architectural_luxury_commercial_flagship_pa__be4b3c0104bb4c6b8fc459ec37a92fc6.png"
                alt="Atrium Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                Triple-Height Colonnade
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GEOGRAPHIC PROVENANCE & ACCESS */}
      <section className="w-full bg-[#f4f3f1] py-24 border-b border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Access Coordinates
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
              Perfect Reclusion, Connected to Life
            </h2>
            <p className="text-sm text-[#54524f] font-normal leading-relaxed">
              Situated in the high Engadin plateau with year-round alpine road access, private airfield proximity, and direct helicopter transfers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] block">Helicopter</span>
              <h4 className="font-serif text-xl text-[#121314]">St. Moritz Heliport</h4>
              <p className="text-xs text-[#54524f]">12 minutes via direct on-site helipad transfer</p>
            </div>

            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] block">Private Aviation</span>
              <h4 className="font-serif text-xl text-[#121314]">Samedan Airport (SMV)</h4>
              <p className="text-xs text-[#54524f]">25 minutes road / Customs and G7 FBO terminal</p>
            </div>

            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] block">Commercial Hub</span>
              <h4 className="font-serif text-xl text-[#121314]">Zurich Airport (ZRH)</h4>
              <p className="text-xs text-[#54524f]">120 minutes scenic drive via Julier Pass</p>
            </div>

            <div className="p-6 bg-white border border-[#e5e2dc] sharp space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] block">Italian Hub</span>
              <h4 className="font-serif text-xl text-[#121314]">Milan Malpensa (MXP)</h4>
              <p className="text-xs text-[#54524f]">90 minutes via Chiavenna and Lake Como</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CLOSING MONOGRAPH CTA */}
      <section className="w-full bg-[#121314] text-white py-28 text-center px-6 sm:px-12 space-y-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ddc2a3] block">
            Confidential Acquisition
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-white uppercase tracking-tight">
            Ready to Secure The Lacustrine Pavilions?
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-normal max-w-xl mx-auto leading-relaxed">
            Direct appointments with our senior partners available on site in Engadin or at our private advisory atelier in Geneva.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <ArchitecturalButton
              variant="primary"
              size="lg"
              className="bg-white text-[#121314] hover:bg-[#ddc2a3]"
              onClick={() => onNavigate(ROUTES.ADVISORY)}
              arrow
            >
              Book Private Viewing
            </ArchitecturalButton>

            <ArchitecturalButton
              variant="dark-outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() => onNavigate(ROUTES.DISCOVERY)}
            >
              View Full Inventory Matrix
            </ArchitecturalButton>
          </div>
        </div>
      </section>
    </div>
  );
};
