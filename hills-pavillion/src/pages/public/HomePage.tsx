import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { ArchitecturalButton } from '../../components/common/ArchitecturalButton';
import { MetricCounter } from '../../components/common/MetricCounter';
import { demoStore } from '../../data/demoStore';
import { ArrowRight, MapPin, SlidersHorizontal, MessageSquare } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Filter state for Chapter 05: Active Ledger
  const [selectedLocation, setSelectedLocation] = useState('All Developments');
  const [selectedTypology, setSelectedTypology] = useState('All Types');
  const [selectedSize, setSelectedSize] = useState('Any Dimension');
  const [selectedPrice, setSelectedPrice] = useState('Custom Tier');

  const propertyLedger = [
    {
      code: 'HP-401',
      name: 'The Lakefront Penthouse',
      location: 'Engadin Valley',
      specs: '4 Bed / 4.5 Bath · 5,800 sq.ft · Private Heli-pad access',
      price: 'PKR 920 Million',
      status: 'Available',
      statusColor: 'bg-[#9e876b]',
      unitTarget: 'A-102',
    },
    {
      code: 'HP-204',
      name: 'The Terraced Garden Villa',
      location: 'Lake Como',
      specs: '3 Bed / 3.5 Bath · 3,900 sq.ft · Direct water mooring',
      price: 'PKR 640 Million',
      status: 'Reserved',
      statusColor: 'bg-[#5e5e5f]',
      unitTarget: 'A-202',
    },
    {
      code: 'HP-502',
      name: 'The Solarium Duplex',
      location: "Cap d'Antibes",
      specs: '5 Bed / 6 Bath · 7,200 sq.ft · Private rooftop observatory',
      price: 'PKR 1,150 Million',
      status: 'Available',
      statusColor: 'bg-[#9e876b]',
      unitTarget: 'A-103',
    },
    {
      code: 'HP-108',
      name: 'The Courtyard Residence',
      location: 'Kyoto Foothills',
      specs: '3 Bed / 3 Bath · 3,200 sq.ft · Dedicated tea pavilion',
      price: 'PKR 480 Million',
      status: 'Sold / Handed Over',
      statusColor: 'bg-[#121314]',
      unitTarget: 'A-101',
    },
  ];

  const handleSelectUnit = (unitId: string) => {
    demoStore.selectUnit(unitId);
    onNavigate(ROUTES.ADVISORY);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] text-[#121314] overflow-hidden">
      {/* ================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#121314] min-h-[92vh] flex flex-col justify-between px-6 sm:px-12 py-16 text-white">
        {/* Cinematic Full-Bleed Architectural Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png"
            alt="The Lacustrine Pavilions architectural monument at dusk"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121314] via-[#121314]/50 to-[#121314]/30" />
        </div>

        {/* Top Meta Strip */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs tracking-widest text-[#ddc2a3] uppercase pt-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-[#9e876b]" />
            <span>Monograph Collection · 2026 Edition</span>
          </div>
          <span className="hidden md:inline font-mono text-[11px] text-stone-400">
            LAT 46.4907° N · LON 9.8355° E
          </span>
        </div>

        {/* Center Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto my-auto py-12 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#ddc2a3] uppercase">
              Atelier Architectural Portfolio · 2026
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08]">
            BUILDING PLACES. <br />
            <span className="italic font-normal text-[#ddc2a3]">
              CREATING LEGACIES.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
            Quiet architectural permanence, monolithic warmth, and spatial contemplation.
            Curated residential pavilions and commercial flagships engineered for generations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ArchitecturalButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-white text-[#121314] hover:bg-[#ddc2a3] hover:text-[#121314]"
              onClick={() => onNavigate(ROUTES.PROJECTS)}
              arrow
            >
              Explore Projects
            </ArchitecturalButton>

            <ArchitecturalButton
              variant="dark-outline"
              size="lg"
              className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10"
              onClick={() => onNavigate(ROUTES.ADVISORY)}
            >
              Book a Visit
            </ArchitecturalButton>
          </div>
        </div>

        {/* Benchmark Metrics Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <MetricCounter
            value="06"
            label="Active Developments"
            sublabel="Global Sites"
            theme="dark"
            borderRight
          />
          <MetricCounter
            value="USD 1.2B"
            label="Portfolio Valuation"
            sublabel="Under Execution"
            theme="dark"
            borderRight
          />
          <MetricCounter
            value="100%"
            label="Geothermal Energy"
            sublabel="Passive Systems"
            theme="dark"
            borderRight
          />
          <MetricCounter
            value="73%"
            label="Lacustrine Progress"
            sublabel="Phase 01 Framing"
            theme="dark"
          />
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. CHAPTER 01 / FEATURED PROJECT (FLAGSHIP MONUMENT) */}
      {/* ================================================================= */}
      <section className="w-full bg-[#faf9f7] py-24 lg:py-32 border-b border-[#e5e2dc]" id="flagship">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Index Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Chapter 01 / Featured Flagship Monument
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight">
                The Lacustrine Pavilions
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[#54524f] text-xs font-semibold tracking-widest uppercase">
              <MapPin className="w-4 h-4 text-[#9e876b]" />
              <span>Engadin Valley, Switzerland</span>
            </div>
          </div>

          {/* Asymmetric Editorial Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
            {/* Left: Technical Taxonomy & Dossier */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-[#121314] font-normal leading-relaxed">
                  Carved directly into the sub-alpine granite terraces, The Lacustrine Pavilions introduce a rare equilibrium of honed limestone mass, floor-to-ceiling panoramic thermal glass, and discreet subterranean wellness vaults.
                </p>
                <p className="text-sm text-[#54524f] font-normal leading-relaxed">
                  Each residence functions as an independent thermodynamic organism—harnessing closed-loop alpine geothermal shafts and passive solar alignment while honoring the strict vernacular heritage of the Engadin plateau.
                </p>
              </div>

              {/* Architectural Spec Ledger */}
              <div className="bg-[#f3f1ed] p-6 sm:p-8 space-y-4 border border-[#e5e2dc] sharp">
                <div className="flex justify-between py-2 border-b border-[#e5e2dc] text-xs">
                  <span className="text-[#54524f] uppercase tracking-wider font-semibold">Typology</span>
                  <span className="text-[#121314] font-medium">Ultra-Prime Alpine Sanctuary</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e5e2dc] text-xs">
                  <span className="text-[#54524f] uppercase tracking-wider font-semibold">Scale</span>
                  <span className="text-[#121314] font-medium">14 Private Monolithic Estates</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e5e2dc] text-xs">
                  <span className="text-[#54524f] uppercase tracking-wider font-semibold">Footprint Range</span>
                  <span className="text-[#121314] font-medium">4,800 – 7,200 sq.ft</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e5e2dc] text-xs">
                  <span className="text-[#54524f] uppercase tracking-wider font-semibold">Acquisition Valuation</span>
                  <span className="text-[#9e876b] font-semibold">PKR 850 Million / CHF 18.5M</span>
                </div>
                <div className="flex justify-between py-2 text-xs">
                  <span className="text-[#54524f] uppercase tracking-wider font-semibold">Architectural Phase</span>
                  <span className="flex items-center gap-2 text-[#121314] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#9e876b] animate-ping" />
                    Phase II Structural Framing Active
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ArchitecturalButton
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate(ROUTES.PROJECT_DETAIL)}
                  arrow
                >
                  Explore Project
                </ArchitecturalButton>

                <ArchitecturalButton
                  variant="secondary"
                  size="md"
                  onClick={() => onNavigate(ROUTES.ADVISORY)}
                >
                  Request Dossier
                </ArchitecturalButton>
              </div>
            </div>

            {/* Right: Monumental Framed Architectural Photograph */}
            <div className="lg:col-span-7 relative group">
              <div className="relative overflow-hidden bg-[#f3f1ed] border border-[#e5e2dc] sharp shadow-xl aspect-[16/10]">
                <img
                  src="/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png"
                  alt="The Lacustrine Pavilions monolithic limestone cantilevers and reflecting pool"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121314]/60 via-transparent to-transparent" />
                {/* Blueprint Metadata Overprint */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-[10px] font-semibold tracking-widest uppercase bg-[#121314]/85 backdrop-blur-md px-4 py-3 sharp border border-white/10">
                  <span>ELEVATION: 1,820M MASL</span>
                  <span className="hidden sm:inline">STRUCTURAL PERMANENCE CERTIFIED</span>
                  <span>PLATE NO. 01-ENG</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#54524f]">
                <span className="italic font-normal">Natural travertine ashlar masonry juxtaposed against reflective infinity hydro-basins.</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b]">ARCHIVE REF: HP-ENG-26</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. CHAPTER 02 / HILLS PAVILLION STORY */}
      {/* ================================================================= */}
      <section className="w-full bg-[#f4f3f1] py-24 lg:py-32 border-b border-[#e5e2dc]" id="about">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text & Creed */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-3">
                  Chapter 02 / Brand Creed & Heritage
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight leading-tight">
                  More than a property.<br />
                  <span className="italic text-[#9e876b]">A place to belong.</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#54524f] leading-relaxed">
                Hills Pavillion creates thoughtfully planned developments that combine quality architecture, strategic locations, modern amenities and long-term value.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3 p-6 bg-white border border-[#e5e2dc] sharp">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9e876b] font-bold block">01</span>
                  <h4 className="text-base font-semibold text-[#121314]">Quiet Permanence</h4>
                  <p className="text-xs text-[#54524f] leading-relaxed">
                    We reject speculative speed. Every foundation is poured with monolithic density designed to outlive trends, cultivating enduring value across generational horizons.
                  </p>
                </div>
                <div className="space-y-3 p-6 bg-white border border-[#e5e2dc] sharp">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9e876b] font-bold block">02</span>
                  <h4 className="text-base font-semibold text-[#121314]">Curated Geographies</h4>
                  <p className="text-xs text-[#54524f] leading-relaxed">
                    We develop exclusively within finite, unrepeatable natural micro-climates where zoning rigor ensures scenic preservation in perpetuity.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate(ROUTES.PROJECTS)}
                  className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer"
                >
                  <span>Discover Our Story & Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tactical Monograph Image Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden border border-[#e5e2dc] sharp shadow-lg bg-white aspect-[4/5] p-8 flex flex-col justify-between">
                <div className="flex flex-col items-center justify-center my-auto text-center space-y-4">
                  <img
                    src="/images/stitch/Hills_Pavillion_Architectural_Wordmark__3ebffdc5a84240cfbab9083fd2222e03.png"
                    alt="Hills Pavillion Architectural Wordmark"
                    className="h-14 w-auto object-contain"
                  />
                  <div className="h-[1px] w-24 bg-[#9e876b]" />
                  <p className="font-serif text-lg italic text-[#121314] max-w-xs">
                    "Architecture is the physical crystallization of human contemplation."
                  </p>
                </div>

                <div className="p-4 bg-[#121314] text-white sharp border border-white/10">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ddc2a3] block">
                    Master Atelier Ledger
                  </span>
                  <p className="text-xs text-stone-300 font-normal mt-1">
                    Certified zero-debt development pipelines with sovereign institutional backing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. CHAPTER 03 / PROJECTS PORTFOLIO */}
      {/* ================================================================= */}
      <section className="w-full bg-[#faf9f7] py-24 lg:py-32 border-b border-[#e5e2dc]" id="projects">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#e5e2dc] gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Chapter 03 / Curated Developments
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight">
                Our Projects
              </h2>
            </div>
            <p className="text-sm text-[#54524f] max-w-md font-normal">
              Explore developments designed around the way discerning patrons live, work, and invest. Every parcel engineered as a unique spatial artifact.
            </p>
          </div>

          {/* 3 Distinct Editorial Project Monographs */}
          <div className="space-y-24 pt-16">
            {/* Project I: The Belvedere Enclave */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
              <div className="lg:col-span-7 order-2 lg:order-1 relative overflow-hidden bg-[#f3f1ed] border border-[#e5e2dc] sharp aspect-[16/10]">
                <img
                  src="/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png"
                  alt="The Belvedere Enclave maritime coastal architecture in Cap d'Antibes"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#e5e2dc] sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                  Cap d'Antibes, France
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b]">
                  01 / Horizon Sanctuaries
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                  The Belvedere Enclave
                </h3>
                <p className="text-sm text-[#54524f] font-normal leading-relaxed">
                  Ascending from maritime pine groves, six tiered horizon penthouses sculpted with raw coastal limestone, saltwater infinity terraces, and dedicated yacht slips.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e5e2dc] text-xs">
                  <div>
                    <span className="text-[#54524f] block text-[10px] uppercase tracking-wider">Typology</span>
                    <span className="text-[#121314] font-medium">Tiered Horizon Penthouses</span>
                  </div>
                  <div>
                    <span className="text-[#54524f] block text-[10px] uppercase tracking-wider">Living Space</span>
                    <span className="text-[#121314] font-medium">5,400 – 9,100 sq.ft</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.PROJECTS)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Project II: Villa Verona Monolith */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b]">
                  02 / Lakeside Brutalism
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                  Villa Verona Monolith
                </h3>
                <p className="text-sm text-[#54524f] font-normal leading-relaxed">
                  Positioned on a private cliffside overlooking Lake Como, featuring board-formed charcoal concrete walls, monolithic floating bronze pavilions, and private submerged boat dock.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e5e2dc] text-xs">
                  <div>
                    <span className="text-[#54524f] block text-[10px] uppercase tracking-wider">Typology</span>
                    <span className="text-[#121314] font-medium">Waterfront Brutalist Estate</span>
                  </div>
                  <div>
                    <span className="text-[#54524f] block text-[10px] uppercase tracking-wider">Living Space</span>
                    <span className="text-[#121314] font-medium">6,200 sq.ft</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.PROJECTS)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:col-span-7 relative overflow-hidden bg-[#f3f1ed] border border-[#e5e2dc] sharp aspect-[16/10]">
                <img
                  src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                  alt="Villa Verona Monolith lakefront modern villa overlooking lake waters"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#e5e2dc] sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                  Lake Como, Italy
                </div>
              </div>
            </div>

            {/* Project III: Kyoto Pavilion Retreat */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
              <div className="lg:col-span-7 order-2 lg:order-1 relative overflow-hidden bg-[#f3f1ed] border border-[#e5e2dc] sharp aspect-[16/10]">
                <img
                  src="/images/stitch/Modern_architectural_luxury_commercial_flagship_pa__be4b3c0104bb4c6b8fc459ec37a92fc6.png"
                  alt="Kyoto Pavilion Retreat structural timber framing and minimalist basalt courtyard"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#e5e2dc] sharp text-[10px] font-semibold uppercase tracking-wider text-[#121314]">
                  Kyoto Foothills, Japan
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b]">
                  03 / Contemplative Architecture
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                  Kyoto Pavilion Retreat
                </h3>
                <p className="text-sm text-[#54524f] font-normal leading-relaxed">
                  Charred yakisugi cedar siding framed with flamed basalt stone, internal zen gravel atriums, and natural onsen springs fed directly from subterranean thermal veins.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e5e2dc] text-xs">
                  <div>
                    <span className="text-[#54524f] block text-[10px] uppercase tracking-wider">Typology</span>
                    <span className="text-[#121314] font-medium">Cedar & Basalt Villas</span>
                  </div>
                  <div>
                    <span className="text-[#54524f] block text-[10px] uppercase tracking-wider">Living Space</span>
                    <span className="text-[#121314] font-medium">3,800 sq.ft</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.PROJECTS)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. CHAPTER 04 / INVESTMENT OPPORTUNITIES (SOPHISTICATED DARK) */}
      {/* ================================================================= */}
      <section className="w-full bg-[#121314] text-white py-28 lg:py-36" id="investments">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4 mb-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ddc2a3] block">
              Chapter 04 / Capital Stewardship & Institutional Fidelity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Opportunities Built for the Future
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-normal max-w-2xl leading-relaxed">
              Structured real asset instruments engineered for multi-family offices, high-net-worth individuals, and institutional sovereign allocators seeking defensive real estate equity.
            </p>
          </div>

          {/* 3-Column Asset Pillar Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white/5 p-8 lg:p-10 sharp border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors group">
              <div className="space-y-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ddc2a3] block">
                  Pillar I
                </span>
                <h3 className="font-serif text-2xl text-white uppercase tracking-tight">
                  Residential Sanctum
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed">
                  Generational legacy estates with full freehold title, golden residency compliance qualification, and historical 14.2% annualized value appreciation across closed luxury clusters.
                </p>
                <ul className="space-y-2 pt-4 border-t border-white/10 text-xs text-stone-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ddc2a3]" />
                    Direct deeded land ownership
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ddc2a3]" />
                    In-house bespoke property curation
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onNavigate(ROUTES.ADVISORY)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white group-hover:text-[#ddc2a3] transition-colors cursor-pointer"
                >
                  <span>Explore Residential Assets</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/5 p-8 lg:p-10 sharp border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors group">
              <div className="space-y-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ddc2a3] block">
                  Pillar II
                </span>
                <h3 className="font-serif text-2xl text-white uppercase tracking-tight">
                  Commercial Flagships
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed">
                  Mixed-use prime urban headquarters and gallery enclaves certified LEED Platinum, backed by index-linked institutional covenants with 15-year minimum lease tenures.
                </p>
                <ul className="space-y-2 pt-4 border-t border-white/10 text-xs text-stone-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ddc2a3]" />
                    High ESG rating compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ddc2a3]" />
                    Inflation-hedged indexation
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onNavigate(ROUTES.ADVISORY)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white group-hover:text-[#ddc2a3] transition-colors cursor-pointer"
                >
                  <span>Explore Commercial Holdings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/5 p-8 lg:p-10 sharp border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors group">
              <div className="space-y-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ddc2a3] block">
                  Pillar III
                </span>
                <h3 className="font-serif text-2xl text-white uppercase tracking-tight">
                  Bespoke Co-Investment
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-normal leading-relaxed">
                  Syndicated development partnerships and early-stage land banking programs engineered for qualified family offices seeking superior hurdle rate dividends.
                </p>
                <ul className="space-y-2 pt-4 border-t border-white/10 text-xs text-stone-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ddc2a3]" />
                    First-lien collateral governance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ddc2a3]" />
                    Quarterly technical board audits
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => onNavigate(ROUTES.ADVISORY)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white group-hover:text-[#ddc2a3] transition-colors cursor-pointer"
                >
                  <span>Inquire for Private Placement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. CHAPTER 05 / PROPERTY DISCOVERY (INTERACTIVE ATELIER LEDGER) */}
      {/* ================================================================= */}
      <section className="w-full bg-[#faf9f7] py-24 lg:py-32" id="property-query">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#e5e2dc] gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Chapter 05 / Active Ledger
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight">
                Find Your Next Property
              </h2>
            </div>
            <p className="text-sm text-[#54524f] max-w-md font-normal">
              Query verified active residences, master penthouses, and private parcels across global Hills Pavillion developments.
            </p>
          </div>

          {/* Architectural Specification Ledger Filter */}
          <div className="mt-8 bg-[#f4f3f1] p-6 sharp border border-[#e5e2dc]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
              <div className="flex flex-col">
                <label className="text-[10px] font-semibold uppercase text-[#54524f] mb-1 tracking-wider">
                  Project Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-white text-[#121314] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                >
                  <option>All Developments</option>
                  <option>Engadin Valley, Switzerland</option>
                  <option>Cap d'Antibes, France</option>
                  <option>Lake Como, Italy</option>
                  <option>Kyoto Foothills, Japan</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-semibold uppercase text-[#54524f] mb-1 tracking-wider">
                  Typology
                </label>
                <select
                  value={selectedTypology}
                  onChange={(e) => setSelectedTypology(e.target.value)}
                  className="bg-white text-[#121314] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                >
                  <option>All Types</option>
                  <option>Horizon Penthouses</option>
                  <option>Waterfront Monoliths</option>
                  <option>Courtyard Residences</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-semibold uppercase text-[#54524f] mb-1 tracking-wider">
                  Scale / Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-white text-[#121314] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                >
                  <option>Any Dimension</option>
                  <option>2,500 – 4,500 sq.ft</option>
                  <option>4,500 – 7,500 sq.ft</option>
                  <option>7,500+ sq.ft</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-semibold uppercase text-[#54524f] mb-1 tracking-wider">
                  Valuation Range
                </label>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="bg-white text-[#121314] text-xs px-3 py-2.5 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
                >
                  <option>Custom Tier</option>
                  <option>PKR 450M – 750M</option>
                  <option>PKR 750M – 1,200M</option>
                  <option>Above PKR 1,200M</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate(ROUTES.DISCOVERY)}
                  className="h-[42px] bg-[#121314] text-white text-xs font-semibold uppercase tracking-widest sharp hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter Ledger</span>
                </button>
              </div>
            </div>
          </div>

          {/* Specimen Property Ledger Rows */}
          <div className="mt-8 divide-y divide-[#e5e2dc] border-y border-[#e5e2dc]">
            {propertyLedger.map((prop) => (
              <div
                key={prop.code}
                className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#f4f3f1] px-4 transition-colors group cursor-pointer"
                onClick={() => handleSelectUnit(prop.unitTarget)}
              >
                <div className="flex items-start md:items-center gap-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9e876b] font-bold">{prop.code}</span>
                  <div>
                    <h4 className="text-base font-semibold text-[#121314]">{prop.name}</h4>
                    <p className="text-xs text-[#54524f]">{prop.specs}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 justify-between lg:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-[#54524f] uppercase tracking-wider block">
                      Acquisition Value
                    </span>
                    <span className="text-base text-[#121314] font-semibold">
                      {prop.price}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#e5e2dc] sharp text-[#121314] text-[10px] font-semibold tracking-wider uppercase">
                    <span className={`w-2 h-2 ${prop.statusColor}`} />
                    {prop.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectUnit(prop.unitTarget);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer"
                  >
                    <span>View Property</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <ArchitecturalButton
              variant="secondary"
              size="md"
              onClick={() => onNavigate(ROUTES.DISCOVERY)}
              arrow
            >
              Open Complete Public Property Inventory
            </ArchitecturalButton>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. CHAPTER 06 / CONSTRUCTION TRANSPARENCY */}
      {/* ================================================================= */}
      <section className="w-full bg-[#f4f3f1] py-24 lg:py-32 border-y border-[#e5e2dc]" id="construction">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#e5e2dc] gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Chapter 06 / Zero-Compromise Execution
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight">
                Building with Transparency
              </h2>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[10px] font-semibold text-[#9e876b] uppercase tracking-widest block">
                Audit Authority
              </span>
              <span className="text-sm text-[#121314] font-medium">
                Independent Auditor: SGS Switzerland
              </span>
            </div>
          </div>

          {/* Main Ledger Overview Bar */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[10px] font-semibold text-[#54524f] uppercase tracking-wider block mb-1">
                Development Site
              </span>
              <span className="text-base text-[#121314] font-medium">
                The Lacustrine Pavilions — Milestone Ledger
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#54524f] uppercase tracking-wider block mb-1">
                Aggregate Completion
              </span>
              <span className="text-base text-[#9e876b] font-semibold">
                72% Overall Progress
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#54524f] uppercase tracking-wider block mb-1">
                Last Certified Inspection
              </span>
              <span className="text-base text-[#121314] font-medium">
                September 2026
              </span>
            </div>
          </div>

          {/* Multi-stage Timeline Stepper */}
          <div className="pt-12 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {/* Step 1 */}
              <div className="space-y-3 p-4 bg-white border border-[#e5e2dc] sharp">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#9e876b] uppercase tracking-widest">Phase 01</span>
                  <span className="text-xs font-bold text-[#121314]">100%</span>
                </div>
                <div className="w-full h-1 bg-[#e5e2dc]">
                  <div className="h-full bg-[#121314] w-full" />
                </div>
                <h5 className="font-medium text-sm text-[#121314]">Planning & Geo-Zoning</h5>
                <p className="text-[11px] text-[#54524f]">Complete canton authorization</p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3 p-4 bg-white border border-[#e5e2dc] sharp">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#9e876b] uppercase tracking-widest">Phase 02</span>
                  <span className="text-xs font-bold text-[#121314]">100%</span>
                </div>
                <div className="w-full h-1 bg-[#e5e2dc]">
                  <div className="h-full bg-[#121314] w-full" />
                </div>
                <h5 className="font-medium text-sm text-[#121314]">Geothermal Drilling</h5>
                <p className="text-[11px] text-[#54524f]">Closed-loop thermal grid sunk</p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3 p-4 bg-white border border-[#e5e2dc] sharp">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#9e876b] uppercase tracking-widest">Phase 03</span>
                  <span className="text-xs font-bold text-[#9e876b]">88%</span>
                </div>
                <div className="w-full h-1 bg-[#e5e2dc]">
                  <div className="h-full bg-[#9e876b] w-[88%]" />
                </div>
                <h5 className="font-medium text-sm text-[#121314]">Monolithic Framing</h5>
                <p className="text-[11px] text-[#54524f]">Structural board concrete active</p>
              </div>

              {/* Step 4 */}
              <div className="space-y-3 p-4 bg-white border border-[#e5e2dc] sharp">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#9e876b] uppercase tracking-widest">Phase 04</span>
                  <span className="text-xs font-bold text-[#9e876b]">65%</span>
                </div>
                <div className="w-full h-1 bg-[#e5e2dc]">
                  <div className="h-full bg-[#9e876b] w-[65%]" />
                </div>
                <h5 className="font-medium text-sm text-[#121314]">Facades & Glazing</h5>
                <p className="text-[11px] text-[#54524f]">Triple-acoustic glass installation</p>
              </div>

              {/* Step 5 */}
              <div className="space-y-3 p-4 bg-white border border-[#e5e2dc] sharp opacity-80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#54524f] uppercase tracking-widest">Phase 05</span>
                  <span className="text-xs text-[#54524f]">Q2 2027</span>
                </div>
                <div className="w-full h-1 bg-[#e5e2dc]">
                  <div className="h-full bg-[#54524f] w-[10%]" />
                </div>
                <h5 className="font-medium text-sm text-[#121314]">Interior Craft</h5>
                <p className="text-[11px] text-[#54524f]">Joinery & client key handover</p>
              </div>
            </div>
          </div>

          {/* Documentary Photography & Note */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 relative overflow-hidden bg-[#121314] border border-[#e5e2dc] sharp aspect-[16/9] shadow-xl">
              <img
                src="/images/stitch/High-end_architectural_construction_site_progress___b158f37442334254887a382db650c7f6.png"
                alt="Real-world construction site showing monumental concrete core and cranes"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#121314]/85 backdrop-blur-md px-4 py-2 sharp text-white text-[10px] font-semibold tracking-widest uppercase border border-white/10">
                LIVE SITE TELEMETRY / ENGADIN SOUTH TOWER
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b]">
                Technical Ledger
              </span>
              <h4 className="font-serif text-2xl text-[#121314] uppercase tracking-tight">
                Board-Formed Concrete Density
              </h4>
              <p className="text-xs sm:text-sm text-[#54524f] font-normal leading-relaxed">
                Our construction methodology relies on low-carbon aggregate formulas cured under controlled humidity to prevent micro-fissures in sub-zero alpine conditions.
              </p>
              <button
                onClick={() => onNavigate(ROUTES.CONSTRUCTION)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer"
              >
                <span>View Full Construction Logbook</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. CHAPTER 07 / WHY HILLS PAVILLION (FOUNDATIONAL VALUE PILLARS) */}
      {/* ================================================================= */}
      <section className="w-full bg-[#faf9f7] py-24 lg:py-32 border-b border-[#e5e2dc]" id="pillars">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4 mb-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Chapter 07 / Institutional Advantage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight">
              Why Hills Pavillion
            </h2>
            <p className="text-sm sm:text-base text-[#54524f] leading-relaxed">
              Four unyielding structural commitments that define our identity as master architectural builders.
            </p>
          </div>

          {/* 4-Column Minimal Architectural Layout with Roman Numerals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-[#f4f3f1] border border-[#e5e2dc] sharp space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-serif text-2xl text-[#9e876b] font-normal">I</span>
                <h3 className="text-base font-semibold text-[#121314] uppercase tracking-tight">
                  Strategic Locations
                </h3>
                <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                  Rare geographies with natural physical borders preventing oversupply, ensuring perpetual exclusivity and sustained market capital protection.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                Zero Replicability
              </span>
            </div>

            <div className="p-8 bg-[#f4f3f1] border border-[#e5e2dc] sharp space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-serif text-2xl text-[#9e876b] font-normal">II</span>
                <h3 className="text-base font-semibold text-[#121314] uppercase tracking-tight">
                  Quality Construction
                </h3>
                <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                  Post-tensioned board-formed concrete cores, hand-chiseled travertine, and triple-glazed German acoustic facade engineering built to withstand centuries.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                Certified Monoliths
              </span>
            </div>

            <div className="p-8 bg-[#f4f3f1] border border-[#e5e2dc] sharp space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-serif text-2xl text-[#9e876b] font-normal">III</span>
                <h3 className="text-base font-semibold text-[#121314] uppercase tracking-tight">
                  Thoughtful Planning
                </h3>
                <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                  Passive solar orientation, subterranean gallery parking, discrete service corridors, and internal courtyards maximizing natural light capture.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                Spatial Intelligence
              </span>
            </div>

            <div className="p-8 bg-[#f4f3f1] border border-[#e5e2dc] sharp space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-serif text-2xl text-[#9e876b] font-normal">IV</span>
                <h3 className="text-base font-semibold text-[#121314] uppercase tracking-tight">
                  Long-Term Value
                </h3>
                <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                  In-house estate management, multi-decade capital sinking funds, and strict ownership association bylaws safeguarding your spatial asset.
                </p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                Generational Security
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. CHAPTER 08 / MEDIA & JOURNAL */}
      {/* ================================================================= */}
      <section className="w-full bg-[#f4f3f1] py-24 lg:py-32" id="journal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[#e5e2dc] gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-2">
                Chapter 08 / The Architectural Dispatch
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121314] uppercase tracking-tight">
                From the Hills Pavillion Journal
              </h2>
            </div>
            <button
              onClick={() => onNavigate(ROUTES.PROJECTS)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] transition-colors cursor-pointer"
            >
              <span>Read All Monographs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Editorial Articles in Magazine Column Format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-12">
            <article className="p-8 bg-white border border-[#e5e2dc] sharp space-y-4 group">
              <div className="flex items-center justify-between text-[#54524f] text-[10px] font-semibold tracking-widest uppercase pb-3 border-b border-[#e5e2dc]">
                <span>01 / Construction Update</span>
                <span>Sep 2026</span>
              </div>
              <h3 className="font-serif text-xl text-[#121314] group-hover:text-[#9e876b] transition-colors leading-snug">
                Engineering Structural Permanence in Extreme Alpine Terrains
              </h3>
              <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                A technical breakdown of deep-drilled bedrock anchoring and freeze-thaw acoustic concrete formulations deployed in the Swiss Engadin.
              </p>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b] block pt-2 group-hover:translate-x-1 transition-transform">
                Read Technical Monograph &rarr;
              </span>
            </article>

            <article className="p-8 bg-white border border-[#e5e2dc] sharp space-y-4 group">
              <div className="flex items-center justify-between text-[#54524f] text-[10px] font-semibold tracking-widest uppercase pb-3 border-b border-[#e5e2dc]">
                <span>02 / Materiality</span>
                <span>Aug 2026</span>
              </div>
              <h3 className="font-serif text-xl text-[#121314] group-hover:text-[#9e876b] transition-colors leading-snug">
                The Art of Monolithic Travertine: Sourcing from Tuscan Quarries
              </h3>
              <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                Following master stonecutters through historic Rapolano veins to hand-select un-filled blocks for our Lake Como pavilions.
              </p>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b] block pt-2 group-hover:translate-x-1 transition-transform">
                Read Atelier Interview &rarr;
              </span>
            </article>

            <article className="p-8 bg-white border border-[#e5e2dc] sharp space-y-4 group">
              <div className="flex items-center justify-between text-[#54524f] text-[10px] font-semibold tracking-widest uppercase pb-3 border-b border-[#e5e2dc]">
                <span>03 / Wealth Stewardship</span>
                <span>Jul 2026</span>
              </div>
              <h3 className="font-serif text-xl text-[#121314] group-hover:text-[#9e876b] transition-colors leading-snug">
                Generational Real Assets as Inflation Hedging for Family Offices
              </h3>
              <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                Macroeconomic analysis on why physical, architecturally unrepeatable residential reserves outpace speculative financial equities.
              </p>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9e876b] block pt-2 group-hover:translate-x-1 transition-transform">
                Read Market Whitepaper &rarr;
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 10. CHAPTER 09 / FINAL INVITATION & CTA BANNER */}
      {/* ================================================================= */}
      <section className="w-full bg-[#121314] text-white py-28 lg:py-36 relative overflow-hidden" id="inquiries">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#ddc2a3]">
            <span>Confidential Advisory</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl uppercase tracking-tight text-white">
            Ready to Find Your Next Place?
          </h2>

          <p className="text-base sm:text-lg text-stone-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Speak directly with the Hills Pavillion acquisition atelier to discover off-market portfolio holdings, private residential commissions, and international estate schedules.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-5">
            <ArchitecturalButton
              variant="primary"
              size="lg"
              className="bg-white text-[#121314] hover:bg-[#ddc2a3]"
              onClick={() => onNavigate(ROUTES.ADVISORY)}
            >
              Book a Visit
            </ArchitecturalButton>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 bg-transparent text-white border border-white/30 text-xs font-semibold uppercase tracking-widest hover:border-[#9e876b] hover:text-[#ddc2a3] transition-all sharp"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-[#ddc2a3]" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>

          <div className="pt-12 text-center">
            <span className="text-xs text-stone-400 uppercase tracking-widest font-mono">
              Direct Telephone: +41 22 819 00 00 &nbsp;|&nbsp; Dossier Transmissions: atelier@hillspavillion.ch
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
