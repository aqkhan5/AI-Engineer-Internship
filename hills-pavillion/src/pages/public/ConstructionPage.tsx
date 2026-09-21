import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { ArchitecturalButton } from '../../components/common/ArchitecturalButton';
import { MetricCounter } from '../../components/common/MetricCounter';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  Calendar,
  Layers,
  Building,
  Check,
} from 'lucide-react';

interface ConstructionPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ConstructionPage: React.FC<ConstructionPageProps> = ({ onNavigate }) => {
  const [activeProjectTab, setActiveProjectTab] = useState('lacustrine');

  const milestones = [
    {
      stage: '01',
      title: 'Site Excavation & Bedrock Anchor',
      progress: 100,
      status: 'VERIFIED',
      completion: 'Jan 2026',
      notes: 'Bedrock core samples certified at 180 MPa',
    },
    {
      stage: '02',
      title: 'Substructure & Foundation Pour',
      progress: 100,
      status: 'VERIFIED',
      completion: 'Apr 2026',
      notes: 'Hydraulic waterproof membrane signed off',
    },
    {
      stage: '03',
      title: 'Structural Core & Post-Tensioned Slabs',
      progress: 100,
      status: 'VERIFIED',
      completion: 'Jun 2026',
      notes: 'Post-tensioned tendons stressed to 1,480 MPa',
    },
    {
      stage: '04',
      title: 'Superstructure & Cantilever Framing',
      progress: 73,
      status: 'ACTIVE',
      completion: 'Oct 2026',
      notes: 'Sector B shear walls poured; Level 03 framing underway',
    },
    {
      stage: '05',
      title: 'Thermal Envelope & Acoustic Glazing',
      progress: 0,
      status: 'SCHEDULED',
      completion: 'Dec 2026',
      notes: 'Triple-acoustic German glass packages on water',
    },
    {
      stage: '06',
      title: 'Interior Archetype Finishes & Joinery',
      progress: 0,
      status: 'SCHEDULED',
      completion: 'Mar 2027',
      notes: 'Rapolano travertine slabs staged in Zurich depot',
    },
    {
      stage: '07',
      title: 'Final Commissioning & Key Handover',
      progress: 0,
      status: 'SCHEDULED',
      completion: 'Q2 2027',
      notes: 'Canton occupancy permits & Lex Koller handover',
    },
  ];

  const chronologicalArchive = [
    {
      date: 'September 18, 2026',
      title: 'Sector B Level 03 Post-Tensioned Slab Pour Completed',
      badge: 'VERIFIED',
      ref: 'SGS-REP-2026-0918',
      summary: '280 m³ low-heat Portland cement poured under humidity monitors. 7-day compressive test returned 52.4 MPa.',
      auditor: 'Marcus Keller, PE / SGS Switzerland',
    },
    {
      date: 'August 24, 2026',
      title: 'Closed-Loop Geothermal Heat Exchanger Sunk to 320m',
      badge: 'VERIFIED',
      ref: 'SGS-REP-2026-0824',
      summary: 'All 24 vertical thermal boreholes successfully pressurized to 16 bar. Thermodynamic loop operating within 0.2°C tolerance.',
      auditor: 'Dr. Hans-Peter Roth / Swiss Geothermal Bureau',
    },
    {
      date: 'July 12, 2026',
      title: 'North Promontory Bedrock Micro-Piling Sign-Off',
      badge: 'VERIFIED',
      ref: 'SGS-REP-2026-0712',
      summary: '68 titanium-alloy tie-back anchors grouted into granite formation. Zero micro-fracture propagation detected.',
      auditor: 'Canton Graubünden Building Department',
    },
    {
      date: 'May 04, 2026',
      title: 'Heavy Subterranean Excavation & Water Retaining Barrier',
      badge: 'VERIFIED',
      ref: 'SGS-REP-2026-0504',
      summary: 'Sub-lake hydrostatic pressure seals verified by ultrasonic sonar inspection. Complete dry subterranean basement secured.',
      auditor: 'SGS Zurich Materials Laboratory',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] text-[#121314]">
      {/* 1. Header Section */}
      <section className="border-b border-[#e5e2dc] bg-[#faf9f7] pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b]">
              Hills Pavillion &bull; Construction Ledger
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#54524f]">
              <ShieldCheck className="w-4 h-4 text-[#9e876b]" />
              <span>INDEPENDENT AUDITOR: SGS SWITZERLAND AG &bull; AUDIT REF: CH-SGS-9428</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#121314] leading-[1.08]">
                BUILT WITH <br />
                <span className="italic font-normal text-[#9e876b]">TRANSPARENCY.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#54524f] font-normal leading-relaxed">
                Real-time engineering ledger, independent audit logs, and verified milestone disbursements anchored to physical execution.
              </p>
            </div>

            <div className="text-right hidden lg:block">
              <span className="text-[10px] uppercase tracking-widest text-[#9e876b] block">DISBURSED ESCROW CAPITAL</span>
              <span className="font-sans text-2xl text-[#121314] font-medium">PKR 42.1M / 100% Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Project Selection Bar */}
      <section className="border-b border-[#e5e2dc] bg-[#f4f3f1] sticky top-16 z-30 px-6 sm:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveProjectTab('lacustrine')}
              className={`text-[11px] font-semibold uppercase tracking-wider px-4 py-2 sharp transition-colors cursor-pointer ${
                activeProjectTab === 'lacustrine'
                  ? 'bg-[#121314] text-white'
                  : 'bg-white text-[#54524f] hover:text-[#121314] border border-[#e5e2dc]'
              }`}
            >
              01 The Lacustrine Pavilions (Active)
            </button>
            <button
              onClick={() => setActiveProjectTab('belvedere')}
              className={`text-[11px] font-semibold uppercase tracking-wider px-4 py-2 sharp transition-colors cursor-pointer ${
                activeProjectTab === 'belvedere'
                  ? 'bg-[#121314] text-white'
                  : 'bg-white text-[#54524f] hover:text-[#121314] border border-[#e5e2dc]'
              }`}
            >
              02 The Belvedere Enclave (On Track)
            </button>
            <button
              onClick={() => setActiveProjectTab('verona')}
              className={`text-[11px] font-semibold uppercase tracking-wider px-4 py-2 sharp transition-colors cursor-pointer ${
                activeProjectTab === 'verona'
                  ? 'bg-[#121314] text-white'
                  : 'bg-white text-[#54524f] hover:text-[#121314] border border-[#e5e2dc]'
              }`}
            >
              03 Villa Verona Monolith (On Track)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Downloading latest certified SGS Swiss Audit Report (PDF)...')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] px-3 py-1.5 bg-white border border-[#e5e2dc] sharp cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Audit Report</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-20">
        {/* 3. Execution Health Card */}
        <section className="bg-white border border-[#e5e2dc] sharp p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-1">
                Active Construction Site &bull; Sector 01
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
                The Lacustrine Pavilions, Engadin
              </h2>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-sans text-5xl sm:text-6xl font-medium text-[#121314]">73%</span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9e876b] block">
                  Overall Aggregate Completion
                </span>
                <span className="text-[11px] text-[#54524f] font-mono">Stage 04 Superstructure Active</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-[#f4f3f1] sharp overflow-hidden border border-[#e5e2dc]">
              <div className="h-full bg-[#121314] w-[73%]" />
            </div>
            <div className="flex justify-between text-[11px] text-[#54524f] font-mono">
              <span>Groundbreak (Nov 2024)</span>
              <span className="text-[#9e876b] font-bold">Current Elevation: Level 03 (73%)</span>
              <span>Handover (Dec 2026)</span>
            </div>
          </div>

          {/* 5 KPI Metric Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-6 border-t border-[#e5e2dc] text-left">
            <MetricCounter value="418" label="Days in Build" sublabel="On Schedule" theme="light" borderRight />
            <MetricCounter value="PKR 42.1M" label="Milestone Disbursed" sublabel="Escrow Certified" theme="light" borderRight />
            <MetricCounter value="28" label="Total Units" sublabel="In Current Phase" theme="light" borderRight />
            <MetricCounter value="34 Days" label="Next Milestone" sublabel="Stage 04 Enclosure" theme="light" borderRight />
            <MetricCounter value="98.6%" label="Independent Audit" sublabel="SGS Certified" theme="light" />
          </div>
        </section>

        {/* 4. 7-Stage Milestone Execution Stepper */}
        <section className="bg-white border border-[#e5e2dc] sharp p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-1">
                Fiduciary Execution Architecture
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#121314] uppercase tracking-tight">
                7-Stage Milestone Stepper
              </h3>
            </div>
            <p className="text-xs text-[#54524f] max-w-md sm:text-right">
              Milestone escrow releases only follow certified engineering inspections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {milestones.map((m) => (
              <div
                key={m.stage}
                className={`p-5 sharp border flex flex-col justify-between space-y-4 ${
                  m.status === 'VERIFIED'
                    ? 'bg-[#f4f3f1] border-[#e5e2dc]'
                    : m.status === 'ACTIVE'
                    ? 'bg-[#121314] text-white border-[#121314] shadow-md'
                    : 'bg-white border-[#e5e2dc] text-stone-400'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl">{m.stage}</span>
                    {m.status === 'VERIFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    {m.status === 'ACTIVE' && <Clock className="w-4 h-4 text-[#ddc2a3] animate-pulse" />}
                  </div>

                  <div className="h-1 w-full bg-stone-300 sharp overflow-hidden">
                    <div
                      className={`h-full ${m.status === 'ACTIVE' ? 'bg-[#ddc2a3]' : 'bg-[#121314]'}`}
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>

                  <h4 className="font-semibold text-xs leading-snug">{m.title}</h4>
                  <p className={`text-[11px] leading-relaxed ${m.status === 'ACTIVE' ? 'text-stone-300' : 'text-[#54524f]'}`}>
                    {m.notes}
                  </p>
                </div>

                <div className="pt-2 border-t border-current/20 text-[10px] uppercase tracking-wider font-mono">
                  <span>{m.completion}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Structural Core Feature & Live Site Telemetry */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Structural Telemetry &bull; Daily Log
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
              Structural Core Reaches Zenith Elevation on North Promontory
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Live Feed Video / Image Frame */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#121314] sharp border border-[#e5e2dc] shadow-lg">
              <img
                src="/images/stitch/High-end_architectural_construction_site_progress___b158f37442334254887a382db650c7f6.png"
                alt="Construction progress site"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#121314]/90 backdrop-blur-md px-3 py-1.5 sharp text-white text-[10px] font-semibold tracking-widest uppercase border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>LIVE FEED &bull; CAM 04 NORTH PROMONTORY</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 sharp text-[#121314] text-[10px] font-mono">
                12 FPS &bull; 1,820M MASL
              </div>
            </div>

            {/* Engineer Field Placard */}
            <div className="lg:col-span-5 bg-white border border-[#e5e2dc] sharp p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dc]">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#9e876b] font-semibold block">
                    Chief Structural Engineer
                  </span>
                  <h4 className="font-serif text-lg text-[#121314]">Marcus Keller, PE</h4>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 sharp text-[10px] font-semibold uppercase">
                  SGS Swiss Audited
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#121314] block">
                  Engineer's Field Notes:
                </span>
                <p className="text-xs sm:text-sm text-[#54524f] font-normal leading-relaxed italic bg-[#f4f3f1] p-4 sharp border-l-2 border-[#9e876b]">
                  "Core shear walls for Sector B completed on schedule. Concrete core sample tests returned 52.4 MPa compressive strength (exceeding 45 MPa specification). Glazing brackets for Level 02 arrived on site."
                </p>
              </div>

              {/* Verified Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase tracking-wider text-[#54524f] font-semibold block">
                  Current Verification Protocol
                </span>
                <ul className="space-y-2 text-xs text-[#121314]">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Core test certificates logged & sealed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>Steel rebar spacing verified by ultrasonic scan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Clock className="w-3 h-3" />
                    </span>
                    <span>Thermal curtain wall brackets preparation in progress</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#e5e2dc]">
                <button
                  onClick={() => alert('Opening verified engineering field logbook PDF...')}
                  className="w-full py-2.5 bg-[#121314] text-white text-xs font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Field Logbook (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Chronological Milestone Archive */}
        <section className="bg-white border border-[#e5e2dc] sharp p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5e2dc]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-1">
                Audited Inspection Ledger
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#121314] uppercase tracking-tight">
                Chronological Milestone Archive
              </h3>
            </div>
            <span className="text-xs font-mono text-[#54524f]">TOTAL CERTIFIED MILESTONES: 04</span>
          </div>

          <div className="divide-y divide-[#e5e2dc]">
            {chronologicalArchive.map((item, idx) => (
              <div key={idx} className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#f4f3f1] px-4 transition-colors">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase text-[#9e876b]">{item.date}</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 sharp text-[9px] font-semibold uppercase">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">{item.ref}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#121314]">{item.title}</h4>
                  <p className="text-xs text-[#54524f] font-normal leading-relaxed">{item.summary}</p>
                  <span className="text-[10px] text-stone-400 block pt-1">Auditor: {item.auditor}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => alert(`Downloading inspection dossier ${item.ref}...`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#121314] hover:text-[#9e876b] px-3 py-1.5 bg-white border border-[#e5e2dc] sharp cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tactile Verification Editorial Site Archive */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
              Physical Craft Documentation
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
              Tactile Verification &bull; Editorial Site Archive
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#e5e2dc] sharp p-4 space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#121314] sharp">
                <img
                  src="/images/stitch/High-end_architectural_construction_site_progress___b158f37442334254887a382db650c7f6.png"
                  alt="Board-formed Concrete"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase text-[#9e876b] block">Core Pour</span>
              <h5 className="font-medium text-xs text-[#121314]">Board-Formed Concrete Finish</h5>
              <p className="text-[11px] text-[#54524f]">Textured grain transfer using Swiss pine planks.</p>
            </div>

            <div className="bg-white border border-[#e5e2dc] sharp p-4 space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#121314] sharp">
                <img
                  src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                  alt="Travertine Masonry"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase text-[#9e876b] block">Masonry Cladding</span>
              <h5 className="font-medium text-xs text-[#121314]">Honed Travertine Jointing</h5>
              <p className="text-[11px] text-[#54524f]">6mm recessed shadow gaps with seismic decoupling.</p>
            </div>

            <div className="bg-white border border-[#e5e2dc] sharp p-4 space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#121314] sharp">
                <img
                  src="/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png"
                  alt="Cantilever Terraces"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase text-[#9e876b] block">Cantilever Engineering</span>
              <h5 className="font-medium text-xs text-[#121314]">Post-Tensioned Terraces</h5>
              <p className="text-[11px] text-[#54524f]">14-meter projection over lake water plane.</p>
            </div>

            <div className="bg-white border border-[#e5e2dc] sharp p-4 space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#121314] sharp">
                <img
                  src="/images/stitch/Architectural_site_masterplan_axonometric_render_b__66d25f7075ce478eae67fa61ae2db7eb.png"
                  alt="Thermal Well Matrix"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase text-[#9e876b] block">Geothermal Array</span>
              <h5 className="font-medium text-xs text-[#121314]">Closed-Loop Wellhead Matrix</h5>
              <p className="text-[11px] text-[#54524f]">Pressure certified at 16 bar continuous circulation.</p>
            </div>
          </div>
        </section>

        {/* 8. Institutional Escrow & Quad-Audit Verification (Dark Section) */}
        <section className="bg-[#121314] text-white p-8 sm:p-12 sharp border border-white/10 space-y-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ddc2a3] block">
              Fiduciary Security Architecture
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Institutional Escrow & Quad-Audit Verification
            </h3>
            <p className="text-sm text-stone-300 font-normal leading-relaxed">
              Every franc and rupee allocated by our private clients remains protected within sovereign segregated accounts governed by strict legal draw-down triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 sharp space-y-3">
              <Layers className="w-5 h-5 text-[#ddc2a3]" />
              <h4 className="font-serif text-lg text-white">SGS Engineering Audit</h4>
              <p className="text-xs text-stone-300 font-normal leading-relaxed">
                Independent Swiss surveying firm inspects each milestone on site before any drawdown certification.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 sharp space-y-3">
              <Building className="w-5 h-5 text-[#ddc2a3]" />
              <h4 className="font-serif text-lg text-white">Canton Authority</h4>
              <p className="text-xs text-stone-300 font-normal leading-relaxed">
                Graubünden cantonal inspectors audit all structural, seismic, and environmental compliance standards.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 sharp space-y-3">
              <ShieldCheck className="w-5 h-5 text-[#ddc2a3]" />
              <h4 className="font-serif text-lg text-white">Escrow Custodian Bank</h4>
              <p className="text-xs text-stone-300 font-normal leading-relaxed">
                Client capital is held by Tier-1 Swiss banking custodians in segregated statutory escrow.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 sharp space-y-3">
              <Calendar className="w-5 h-5 text-[#ddc2a3]" />
              <h4 className="font-serif text-lg text-white">Zero Debt Assurance</h4>
              <p className="text-xs text-stone-300 font-normal leading-relaxed">
                All land parcels are 100% debt-free and unencumbered prior to groundbreaking.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Bottom CTA Banner */}
        <section className="bg-[#f4f3f1] border border-[#e5e2dc] sharp p-8 sm:p-12 text-center space-y-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block">
            Private Site Inspections
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#121314] uppercase tracking-tight">
            Want to Witness the Craft in Person?
          </h3>
          <p className="text-sm text-[#54524f] max-w-xl mx-auto font-normal leading-relaxed">
            Private escorted helicopter transfers from Zurich or St. Moritz directly to our North Promontory site landing pad can be coordinated through our advisory atelier.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <ArchitecturalButton
              variant="primary"
              size="md"
              onClick={() => onNavigate(ROUTES.ADVISORY)}
            >
              Book Site Inspection
            </ArchitecturalButton>

            <ArchitecturalButton
              variant="secondary"
              size="md"
              onClick={() => alert('Initiating confidential download of complete 140-page engineering dossier...')}
            >
              Request Full Engineering Dossier
            </ArchitecturalButton>
          </div>
        </section>
      </div>
    </div>
  );
};
