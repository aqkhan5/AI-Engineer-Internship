import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { useDemoState } from '../../hooks/useDemoState';
import {
  FileDown,
  RefreshCw,
  Zap,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL'>('ALL');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleSelectLead = (leadId: string) => {
    demo.selectLead(leadId);
    onNavigate(ROUTES.PLATFORM_LEADS);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 text-[#121314]">
      {/* Toast Feedback Notification */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121314] text-white px-5 py-3 sharp shadow-xl border border-white/20 flex items-center gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-[#ddc2a3]" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* 1. Header & Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e2dc] pb-6">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b] block mb-1">
            Executive Operations Overview &bull; Cross-Portfolio Telemetry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#121314] font-normal tracking-tight">
            Good morning, Alexander
          </h1>
          <p className="text-xs text-[#54524f] mt-1 font-normal max-w-xl leading-relaxed">
            Here is what requires your direct attention across active global portfolios in Engadin, Lake Como, Mayfair and Arashiyama.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => showFeedback('Exporting Executive Briefing dossier (PDF)...')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 bg-white text-[#121314] hover:bg-[#f4f3f1] border border-[#e5e2dc] sharp transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Briefing</span>
          </button>

          <button
            onClick={() => {
              demo.refreshData();
              showFeedback('System telemetry re-balanced across all 4 desks.');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 bg-white text-[#121314] hover:bg-[#f4f3f1] border border-[#e5e2dc] sharp transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run Re-Balance</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#121314] text-white sharp text-xs font-semibold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Active</span>
          </div>
        </div>
      </div>

      {/* 2. Primary 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 border border-[#e5e2dc] sharp space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Pipeline Revenue
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold block">
            {demoState.metrics.revenue}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold tracking-wider block">
            +14.2% vs Last Quarter
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 border border-[#e5e2dc] sharp space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              New Inquiries
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold block">
            {demoState.metrics.newLeads}
          </span>
          <span className="text-[10px] text-[#ba1a1a] font-semibold tracking-wider block">
            3 require 4H SLA action
          </span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 border border-[#e5e2dc] sharp space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Active Bookings
            </span>
            <Clock className="w-3.5 h-3.5 text-[#9e876b]" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold block">
            {demoState.metrics.activeBookings} Units
          </span>
          <span className="text-[10px] text-[#54524f] tracking-wider block">
            92% Escrow Conversion
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 border border-[#e5e2dc] sharp space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Milestones Pending
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#9e876b]" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold block">
            PKR 42.1M
          </span>
          <span className="text-[10px] text-[#9e876b] font-semibold tracking-wider block">
            5 Pending Eng. Sign-offs
          </span>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-5 border border-[#e5e2dc] sharp space-y-1 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Overdue Escrow
            </span>
            <AlertTriangle className="w-3.5 h-3.5 text-[#ba1a1a]" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl text-[#ba1a1a] font-semibold block">
            PKR 3.8M
          </span>
          <span className="text-[10px] text-[#ba1a1a] font-semibold tracking-wider block">
            2 Tranches Overdue
          </span>
        </div>
      </div>

      {/* 3. AI Command & Intelligence Telemetry Directive Cards */}
      <section className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e2dc] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#121314] text-white flex items-center justify-center sharp">
              <Zap className="w-3.5 h-3.5 text-[#ddc2a3]" />
            </div>
            <div>
              <h2 className="font-semibold text-xs uppercase tracking-wider text-[#121314]">
                AI Command & Intelligence Telemetry
              </h2>
              <p className="text-[10px] text-[#54524f]">Heuristic Directive Execution Layer &bull; SLA Monitor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(ROUTES.PLATFORM_COMMAND)}
              className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] hover:text-[#121314] flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full Command Center</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Directive 1 */}
          <div className="p-5 bg-[#faf9f7] border-l-2 border-[#ba1a1a] border-y border-r border-[#e5e2dc] sharp space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ba1a1a] flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" />
                CRITICAL ACTION REQUIRED
              </span>
              <h3 className="font-semibold text-xs text-[#121314] leading-snug">
                3 high-intent leads pending response past 4-Hour SLA
              </h3>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Ahmed Khan, Dr. Tariq Mansoor, and Vivienne Dubois have inquiries active with zero contact past target SLA.
              </p>
            </div>

            <button
              onClick={() => {
                showFeedback('Auto-assigned 3 leads to Partner Alexander von Berg.');
                onNavigate(ROUTES.PLATFORM_LEADS);
              }}
              className="w-full py-2 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-widest sharp hover:bg-neutral-800 transition-colors cursor-pointer text-center"
            >
              Auto-Assign Desk &rarr;
            </button>
          </div>

          {/* Directive 2 */}
          <div className="p-5 bg-[#faf9f7] border-l-2 border-[#9e876b] border-y border-r border-[#e5e2dc] sharp space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e876b] flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                MILESTONE DISBURSEMENT
              </span>
              <h3 className="font-semibold text-xs text-[#121314] leading-snug">
                5 milestone disbursements overdue totaling PKR 42.1M
              </h3>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Stage 03 Framing and Stage 02 Foundation pour certificates require partner countersignature for escrow release.
              </p>
            </div>

            <button
              onClick={() => {
                showFeedback('Opening Stage 03 engineering demands ledger...');
                onNavigate(ROUTES.CONSTRUCTION);
              }}
              className="w-full py-2 bg-white text-[#121314] border border-[#e5e2dc] text-[10px] font-semibold uppercase tracking-widest sharp hover:bg-[#f4f3f1] transition-colors cursor-pointer text-center"
            >
              Review Demands &rarr;
            </button>
          </div>

          {/* Directive 3 */}
          <div className="p-5 bg-[#faf9f7] border-l-2 border-emerald-700 border-y border-r border-[#e5e2dc] sharp space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                RECOMMENDED ACTION
              </span>
              <h3 className="font-semibold text-xs text-[#121314] leading-snug">
                Initiate site visit for Unit A-102 (Ahmed Khan)
              </h3>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                High probability conversion (92%). Buyer requested board-formed concrete engineering log before signing.
              </p>
            </div>

            <button
              onClick={() => {
                showFeedback('Dispatched North Promontory site visit invite to Ahmed Khan.');
                onNavigate(ROUTES.PLATFORM_LEADS);
              }}
              className="w-full py-2 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer text-center"
            >
              Escalate (1) &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 4. Two-Column Operational Split: Lead Funnel & Inventory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Lead Conversion Pipeline Funnel */}
        <div className="lg:col-span-6 bg-white border border-[#e5e2dc] sharp p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                Funnel Analytics
              </span>
              <h3 className="font-serif text-xl text-[#121314]">Lead Conversion Pipeline</h3>
            </div>
            <span className="font-mono text-xs text-[#54524f]">TOTAL PIPELINE: PKR 84.6M</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-sans text-[#121314]">1. Total Inquiries</span>
                <span className="text-[#54524f]">42 Inquiries (100%)</span>
              </div>
              <div className="h-2 w-full bg-[#f4f3f1] sharp overflow-hidden border border-[#e5e2dc]">
                <div className="h-full bg-[#121314] w-full" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-sans text-[#121314]">2. Qualified Opportunities</span>
                <span className="text-[#54524f]">28 Opportunities (66%)</span>
              </div>
              <div className="h-2 w-full bg-[#f4f3f1] sharp overflow-hidden border border-[#e5e2dc]">
                <div className="h-full bg-[#121314] w-[66%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-sans text-[#121314]">3. Site Visit Booked</span>
                <span className="text-[#54524f]">14 Site Visits (33%)</span>
              </div>
              <div className="h-2 w-full bg-[#f4f3f1] sharp overflow-hidden border border-[#e5e2dc]">
                <div className="h-full bg-[#9e876b] w-[33%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-sans text-[#121314]">4. Contract Negotiation</span>
                <span className="text-[#54524f]">8 Contracts (19%)</span>
              </div>
              <div className="h-2 w-full bg-[#f4f3f1] sharp overflow-hidden border border-[#e5e2dc]">
                <div className="h-full bg-[#9e876b] w-[19%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-sans text-[#121314] font-semibold">5. Closed Handover</span>
                <span className="text-emerald-700 font-bold">PKR 84.6M (14%)</span>
              </div>
              <div className="h-2 w-full bg-[#f4f3f1] sharp overflow-hidden border border-[#e5e2dc]">
                <div className="h-full bg-emerald-700 w-[14%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Inventory Status */}
        <div className="lg:col-span-6 bg-white border border-[#e5e2dc] sharp p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
                Spatial Allocation Matrix
              </span>
              <h3 className="font-serif text-xl text-[#121314]">Inventory Status</h3>
            </div>
            <button
              onClick={() => onNavigate(ROUTES.PLATFORM_INVENTORY)}
              className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b] hover:text-[#121314]"
            >
              Open Inventory &rarr;
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span>Total Catalog: 500 Units</span>
                <span>{demoState.units.filter((u) => u.status === 'AVAILABLE').length} Available</span>
              </div>
              <div className="h-3 w-full bg-[#f4f3f1] sharp overflow-hidden flex border border-[#e5e2dc]">
                <div className="h-full bg-[#121314] w-[63%]" title="Sold (316)" />
                <div className="h-full bg-[#9e876b] w-[8%]" title="In Escrow (42)" />
                <div className="h-full bg-amber-500 w-[4%]" title="Active Holds (18)" />
                <div className="h-full bg-emerald-600 w-[25%]" title="Available (124)" />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#54524f] pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#121314]" /> Deeded (63%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#9e876b]" /> Escrow (8%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500" /> 48H Hold (4%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-600" /> Available (25%)</span>
              </div>
            </div>

            {/* Breakdown per development */}
            <div className="divide-y divide-[#e5e2dc] pt-2 text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="font-medium text-[#121314]">The Lacustrine Pavilions</span>
                <span className="font-mono text-[#54524f]">14 / 28 Available</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="font-medium text-[#121314]">The Belvedere Enclave</span>
                <span className="font-mono text-[#54524f]">2 / 6 Available</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="font-medium text-[#121314]">Villa Verona Monolith</span>
                <span className="font-mono text-amber-700 font-bold">1 Unit (Partner Hold)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="font-medium text-[#121314]">Kyoto Pavilion Retreat</span>
                <span className="font-mono text-[#54524f]">Planning (6 Units)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Today's Operational Roster */}
      <section className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
              Daily Duty Assignments
            </span>
            <h3 className="font-serif text-xl text-[#121314]">Today's Operational Roster</h3>
          </div>
          <span className="text-xs font-mono text-[#54524f]">4 ACTIVE DESKS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-[#f4f3f1] sharp space-y-2 border border-[#e5e2dc]">
            <span className="text-[10px] font-bold uppercase text-[#9e876b] block">Desk A &bull; Sales & Concierge</span>
            <h4 className="font-medium text-xs text-[#121314]">Christian Vance (Partner)</h4>
            <p className="text-[11px] text-[#54524f]">Assigned 3 high-intent follow-ups; St. Moritz viewing scheduled.</p>
          </div>

          <div className="p-4 bg-[#f4f3f1] sharp space-y-2 border border-[#e5e2dc]">
            <span className="text-[10px] font-bold uppercase text-[#9e876b] block">Desk B &bull; Site & Engineering</span>
            <h4 className="font-medium text-xs text-[#121314]">Marcus Keller, PE</h4>
            <p className="text-[11px] text-[#54524f]">Level 03 concrete curing audit; SGS ultrasonic inspection sign-off.</p>
          </div>

          <div className="p-4 bg-[#f4f3f1] sharp space-y-2 border border-[#e5e2dc]">
            <span className="text-[10px] font-bold uppercase text-[#9e876b] block">Desk C &bull; Finance & Escrow</span>
            <h4 className="font-medium text-xs text-[#121314]">Helena Weiss (UBS Custody)</h4>
            <p className="text-[11px] text-[#54524f]">PKR 42.1M Stage 03 milestone drawdown packet review.</p>
          </div>

          <div className="p-4 bg-[#f4f3f1] sharp space-y-2 border border-[#e5e2dc]">
            <span className="text-[10px] font-bold uppercase text-[#9e876b] block">Desk D &bull; Legal & Notary</span>
            <h4 className="font-medium text-xs text-[#121314]">Dr. Beat Ammann (Zurich)</h4>
            <p className="text-[11px] text-[#54524f]">Lex Koller foreign ownership clearance for Unit A-102.</p>
          </div>
        </div>
      </section>

      {/* 6. Priority Prospects & Leads Table */}
      <section className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5e2dc] pb-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
              Active CRM Pipeline &bull; Live Synchronization
            </span>
            <h3 className="font-serif text-2xl text-[#121314]">Priority Prospects & Leads</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider sharp transition-colors cursor-pointer ${
                activeTab === 'ALL' ? 'bg-[#121314] text-white' : 'bg-[#f4f3f1] text-[#54524f]'
              }`}
            >
              All Leads ({demoState.leads.length})
            </button>
            <button
              onClick={() => setActiveTab('CRITICAL')}
              className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider sharp transition-colors cursor-pointer ${
                activeTab === 'CRITICAL' ? 'bg-[#ba1a1a] text-white' : 'bg-[#f4f3f1] text-[#ba1a1a]'
              }`}
            >
              Attention Required ({demoState.leads.filter((l) => l.slaStatus === 'ATTENTION_REQUIRED').length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e5e2dc] bg-[#f4f3f1] text-[#54524f] font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Prospect</th>
                <th className="py-3 px-4">Target Asset</th>
                <th className="py-3 px-4">Capital Budget</th>
                <th className="py-3 px-4">Intent Score</th>
                <th className="py-3 px-4">Last Contact</th>
                <th className="py-3 px-4">SLA Status</th>
                <th className="py-3 px-4 text-right">Direct Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2dc]/60">
              {demoState.leads
                .filter((l) => activeTab === 'ALL' || l.slaStatus === 'ATTENTION_REQUIRED')
                .map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-[#f4f3f1]/60 transition-colors cursor-pointer"
                    onClick={() => handleSelectLead(lead.id)}
                  >
                    <td className="py-4 px-4">
                      <div className="font-semibold text-[#121314]">{lead.name}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{lead.phone || '+41 79 000 0000'}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-serif text-sm text-[#121314]">{lead.targetProject}</div>
                      <div className="text-[10px] text-[#9e876b] font-mono">{lead.targetUnit || 'Pending'}</div>
                    </td>
                    <td className="py-4 px-4 font-mono font-medium text-[#121314]">{lead.budget}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 sharp bg-[#f4f3f1] text-[#121314] border border-[#e5e2dc] font-mono text-[10px] font-bold">
                        {lead.intentScore}/100
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#54524f] text-[11px]">{lead.lastContact}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 sharp text-[9px] font-semibold tracking-wider uppercase ${
                          lead.slaStatus === 'ATTENTION_REQUIRED'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            lead.slaStatus === 'ATTENTION_REQUIRED' ? 'bg-red-600 animate-pulse' : 'bg-emerald-600'
                          }`}
                        />
                        {lead.slaStatus === 'ATTENTION_REQUIRED' ? 'Action Overdue' : 'On Track'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => showFeedback(`Initiating secure direct call to ${lead.name}...`)}
                          className="p-1.5 bg-white border border-[#e5e2dc] sharp hover:text-[#9e876b] text-[#54524f] cursor-pointer"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => showFeedback(`Opening WhatsApp conversation with ${lead.name}...`)}
                          className="p-1.5 bg-white border border-[#e5e2dc] sharp hover:text-[#9e876b] text-[#54524f] cursor-pointer"
                          title="Message Lead"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSelectLead(lead.id)}
                          className="px-2.5 py-1 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-wider sharp hover:bg-[#9e876b] transition-colors cursor-pointer"
                        >
                          Dossier &rarr;
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Real-Time Atelier Audit Trail */}
      <section className="bg-white border border-[#e5e2dc] sharp p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b] block">
              Cryptographic Fiduciary Log
            </span>
            <h3 className="font-serif text-xl text-[#121314]">Real-Time Atelier Audit Trail</h3>
          </div>
          <span className="text-xs font-mono text-[#54524f]">STREAM ACTIVE</span>
        </div>

        <div className="divide-y divide-[#e5e2dc]">
          {demoState.activities.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9e876b]" />
                <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">{act.type}</span>
                <span className="text-[#121314]">{act.action}</span>
              </div>
              <span className="font-mono text-[10px] text-stone-400 whitespace-nowrap">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
