import React, { useState, useEffect } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { useDemoState } from '../../hooks/useDemoState';
import { MockAIService, type AICommandResult } from '../../services/aiService';
import {
  Terminal,
  Zap,
  Sparkles,
  Shield,
  Download,
  Clock,
  ArrowRight,
  TrendingUp,
  Building2,
  AlertTriangle,
  FileDown,
  ExternalLink,
  MessageSquare,
  Phone,
  CheckCircle2,
  Calendar,
  Lock,
} from 'lucide-react';

interface CommandCenterPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const CommandCenterPage: React.FC<CommandCenterPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();
  const [query, setQuery] = useState('Which leads need attention today?');
  const [activeScope, setActiveScope] = useState('All Portfolios');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AICommandResult | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleRunQuery = async (queryText: string) => {
    setLoading(true);
    setQuery(queryText);
    const res = await MockAIService.executeCommand(queryText);
    setResult(res);
    setLoading(false);
  };

  // Run initial query on mount
  useEffect(() => {
    handleRunQuery('Which leads need attention today?');
  }, []);

  const suggestedDirectives = [
    {
      id: '01.1',
      title: '“Which leads need attention today?”',
      tag: 'PRIORITY SENSITIVE',
      count: '3 critical dossiers',
      query: 'Which leads need attention today?',
    },
    {
      id: '01.2',
      title: '“Show today’s sales & escrow drawdowns”',
      tag: 'ESCROW DRAWDOWN',
      count: 'Est. 3 dossiers pending',
      query: 'Show today’s sales & escrow drawdowns',
    },
    {
      id: '01.3',
      title: '“Find available 10 Marla properties under PKR 30M”',
      tag: 'SPATIAL ALLOCATION',
      count: '14 plots qualifying',
      query: 'Find available 10 Marla properties under PKR 30M',
    },
    {
      id: '01.4',
      title: '“Which agents have overdue follow-ups?”',
      tag: 'AGENT PERFORMANCE',
      count: '2 Partner Desks flagged',
      query: 'Which agents have overdue follow-ups?',
    },
    {
      id: '01.5',
      title: '“How many units are currently reserved?”',
      tag: 'INVENTORY ALLOCATION',
      count: `${demoState.units.filter((u) => u.status === 'RESERVED').length} active holds`,
      query: 'How many units are currently reserved?',
    },
    {
      id: '01.6',
      title: '“Which properties are selling fastest?”',
      tag: 'VELOCITY INDEX',
      count: 'Lacustrine Terrace leads',
      query: 'Which properties are selling fastest?',
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 text-[#121314]">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121314] text-white px-5 py-3 sharp shadow-2xl border border-white/20 flex items-center gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-[#ddc2a3]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* 1. Sub-Header / Context Bar */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 bg-[#f4f3f1] p-8 sharp border border-[#e5e2dc] shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9e876b] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9e876b]">
              Atelier Intelligence &amp; Telemetry Engine &bull; Synchronized with Geneva Master Node
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#121314] font-normal tracking-tight leading-none">
            AI COMMAND CENTER
          </h1>
          <p className="text-xs sm:text-sm text-[#54524f] max-w-2xl font-normal leading-relaxed">
            Ask Hills Pavillion’s business intelligence layer anything about your operations. Unified natural-language telemetry across CRM, spatial inventory, and fiduciary milestones.
          </p>
        </div>

        {/* Telemetry & Fiduciary Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-2 bg-white text-[#121314] sharp border border-[#e5e2dc] shadow-sm text-xs">
            <span className="w-2 h-2 rounded-full bg-[#9e876b] animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Telemetry v2.4 &bull; Multi-Source Ingestion
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-white text-[#121314] sharp border border-[#e5e2dc] shadow-sm text-xs">
            <Shield className="w-3.5 h-3.5 text-[#9e876b]" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Role: Senior Partner (Tier 1)
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#e9e8e6] text-[#54524f] sharp border border-[#e5e2dc] shadow-sm text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9e876b]">Ping</span>
            <span className="font-mono text-xs font-bold text-[#121314]">142ms</span>
          </div>

          <button
            onClick={() => showToast('Full cryptographic audit log exported (SHA-256 signed CSV).')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#f4f3f1] text-[#121314] sharp border border-[#e5e2dc] transition-colors shadow-sm text-[10px] font-bold uppercase tracking-wider cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#54524f]" />
            <span>Audit Log Export</span>
          </button>
        </div>
      </section>

      {/* 2. Central Command Dispatch Input */}
      <section className="bg-white p-6 sm:p-8 sharp border border-[#e5e2dc] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-3 h-3 rounded-full bg-[#9e876b]/30 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e876b]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9e876b]">
              SYNCHRONIZED WITH LIVE FINANCIAL &amp; SPATIAL LEDGERS
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#54524f]">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Natural Language Parser</span>
            <span className="px-2 py-0.5 bg-[#f4f3f1] sharp border border-[#e5e2dc] text-[9px] font-bold text-[#121314]">
              FINMA-SIA 102 COMPLIANT
            </span>
          </div>
        </div>

        {/* Command Input Bar */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 bg-[#f4f3f1] p-2 sharp border border-[#e5e2dc]">
          <div className="relative flex-1 flex items-center pl-3 pr-2 py-2">
            <Terminal className="w-5 h-5 text-[#9e876b] mr-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunQuery(query)}
              placeholder="Ask about leads, inventory, sales, payments, or performance..."
              className="w-full bg-transparent text-[#121314] placeholder:text-[#848485] text-xs sm:text-sm focus:outline-none"
            />
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-white sharp border border-[#e5e2dc] text-[#54524f] text-[10px] font-mono shadow-sm flex-shrink-0">
              <kbd>⌘</kbd>
              <span>+</span>
              <kbd>K</kbd>
            </div>
          </div>

          <button
            onClick={() => handleRunQuery(query)}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#121314] text-white hover:bg-[#2b2c2d] disabled:opacity-60 transition-colors sharp text-xs font-semibold uppercase tracking-widest flex-shrink-0 shadow-sm cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>COMPUTING...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ddc2a3]" />
                <span>EXECUTE QUERY</span>
              </span>
            )}
          </button>
        </div>

        {/* Scope Pills / Portfolios */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[10px] uppercase font-bold text-[#54524f] mr-1">Query Scope:</span>
          {['All Portfolios', 'Leads & CRM', 'Spatial Inventory', 'Drawdowns & Escrow', 'Construction SLA'].map((sc) => (
            <button
              key={sc}
              onClick={() => setActiveScope(sc)}
              className={`px-3 py-1 sharp text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer border ${
                activeScope === sc
                  ? 'bg-[#121314] text-white border-[#121314]'
                  : 'bg-[#f4f3f1] text-[#54524f] hover:text-[#121314] border-[#e5e2dc]'
              }`}
            >
              {sc}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Suggested Directives / Telemetric Macros (Grid) */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-[#9e876b]">01</span>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#121314]">
              DIRECTIVE INVENTORY &bull; TELEMETRIC MACROS
            </h2>
          </div>
          <span className="text-[10px] uppercase font-semibold text-[#54524f]">
            Click directive to mount &amp; execute
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {suggestedDirectives.map((directive) => {
            const isSelected = query.trim() === directive.query.trim();

            return (
              <div
                key={directive.id}
                onClick={() => handleRunQuery(directive.query)}
                className={`p-6 sharp border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#121314] text-white border-[#121314] shadow-md'
                    : 'bg-white text-[#121314] border-[#e5e2dc] hover:border-[#9e876b] shadow-sm hover:bg-[#f4f3f1]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className={`font-serif text-sm ${isSelected ? 'text-[#ddc2a3]' : 'text-[#9e876b]'}`}>
                      {directive.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 sharp text-[9px] font-bold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#f7dbbb] text-[#745f46]'
                          : 'bg-[#f4f3f1] text-[#54524f] border border-[#e5e2dc]'
                      }`}
                    >
                      {directive.tag}
                    </span>
                  </div>
                  <p className="font-serif text-base sm:text-lg font-normal mb-5 leading-snug">
                    {directive.title}
                  </p>
                </div>

                <div
                  className={`flex items-center justify-between pt-3 border-t text-[10px] uppercase tracking-wider font-semibold ${
                    isSelected
                      ? 'border-white/20 text-[#ddc2a3]'
                      : 'border-[#f4f3f1] text-[#54524f] group-hover:text-[#121314]'
                  }`}
                >
                  <span>{isSelected ? 'ACTIVE SYNTHESIS MOUNTED' : directive.count}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Active Structured Response Area (Executive Briefing Dossier) */}
      {result && (
        <section className="bg-white p-6 sm:p-10 sharp border border-[#e5e2dc] shadow-md space-y-8">
          {/* Query Recap Metadata Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 bg-[#f4f3f1] p-4 sharp border border-[#e5e2dc]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#121314] rounded-full" />
              <span className="text-xs uppercase tracking-wider text-[#121314] font-medium">
                Query Formulation: <strong className="font-bold text-[#121314]">“{result.query}”</strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[#54524f] text-[10px] uppercase tracking-wider font-semibold">
              <span>{result.timestamp}</span>
              <span>&bull;</span>
              <span>{result.retrievedData.details}</span>
              <span>&bull;</span>
              <span className="text-[#9e876b] font-bold">{result.category}</span>
            </div>
          </div>

          {/* Executive Summary Verdict Banner */}
          <div
            className={`p-6 sharp border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
              result.urgencyLevel === 'CRITICAL'
                ? 'bg-[#f7dbbb]/40 border-[#9e876b]/40 text-[#745f46]'
                : result.urgencyLevel === 'WARNING'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-[#f4f3f1] border-[#e5e2dc] text-[#121314]'
            }`}
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-[#9e876b] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#9e876b]">
                  URGENCY DISPATCH ASSESSMENT &bull; STRATEGIC SYNTHESIS
                </div>
                <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#121314]">
                  {result.summary}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3 py-1 bg-white text-[#121314] sharp border border-[#e5e2dc] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                CONFIDENCE: {result.confidence}
              </span>
            </div>
          </div>

          {/* Clear Distinction: Retrieved Data vs AI Reasoning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f4f3f1] p-4 sharp border border-[#e5e2dc] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#54524f]">
                  Retrieved Business Data &bull; Verified Ledger Node
                </span>
              </div>
              <div className="text-sm font-semibold text-[#121314]">
                {result.retrievedData.label}: {result.retrievedData.count} Records Verified
              </div>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                Directly extracted from `demoStore` without external network synthesis.
              </p>
            </div>

            <div className="bg-[#f4f3f1] p-4 sharp border border-[#e5e2dc] space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#9e876b]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e876b]">
                  AI Reasoning &amp; Strategic Projection
                </span>
              </div>
              <div className="text-sm font-semibold text-[#121314]">
                Heuristic Intervention Model
              </div>
              <p className="text-[11px] text-[#54524f] leading-relaxed">
                {result.reasoning}
              </p>
            </div>
          </div>

          {/* Structured Output Cards: Leads / Properties / Drawdowns */}
          {result.cardsType === 'LEADS' && result.leads && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-normal text-[#121314]">
                  High-Intent Ledger &bull; Critical Escalation Cohort
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e876b]">
                  Displaying {result.leads.length} Prioritized Dossiers
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {result.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#f4f3f1] p-5 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#121314] text-white text-[9px] font-bold uppercase tracking-wider sharp">
                          Lead #{lead.id.slice(0, 7).toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 bg-[#f7dbbb] text-[#745f46] text-[9px] font-bold uppercase sharp">
                          AI Score: {lead.intentScore}/100
                        </span>
                      </div>

                      <div>
                        <div className="font-serif text-lg text-[#121314]">{lead.name}</div>
                        <div className="text-[10px] text-[#9e876b] font-semibold uppercase tracking-wider mt-0.5">
                          {lead.intentScore >= 85 ? 'Very High Intent &bull; Institutional Buyer' : 'High Intent &bull; Private Client'}
                        </div>
                      </div>

                      {/* Property Visual Snippet */}
                      <div className="relative h-28 sharp overflow-hidden border border-[#e5e2dc]">
                        <img
                          src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                          alt="Target Plot"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[8px] uppercase tracking-widest font-semibold sharp">
                          {lead.targetUnit || 'LP-104 North Promontory'}
                        </div>
                      </div>

                      <div className="space-y-1.5 bg-white p-3 sharp border border-[#e5e2dc] text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Project:</span>
                          <span className="font-medium text-[#121314]">{lead.targetProject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Budget:</span>
                          <span className="font-semibold text-[#121314]">{lead.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Telemetry:</span>
                          <span className="text-red-700 font-bold">
                            {lead.slaStatus === 'ATTENTION_REQUIRED' ? 'SLA Exceeded (+1h 14m)' : 'On Track'}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#54524f] leading-relaxed italic">
                        {lead.recommendedAction || 'Status: Qualified. Currently reviewing architectural engineering specifications.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e5e2dc] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#121314] text-white flex items-center justify-center text-[9px] font-bold">
                          A
                        </span>
                        <div className="text-[10px]">
                          <span className="text-[#54524f] uppercase block leading-none">Desk In Charge</span>
                          <span className="font-semibold text-[#121314]">Ali Vance</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            demo.selectLead(lead.id);
                            onNavigate(ROUTES.PLATFORM_LEADS);
                          }}
                          className="p-1.5 bg-white hover:bg-[#121314] hover:text-white sharp border border-[#e5e2dc] transition-colors cursor-pointer"
                          title="Open Dossier in CRM"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => showToast(`Direct WhatsApp dispatch sent for ${lead.name}`)}
                          className="p-1.5 bg-white hover:bg-[#121314] hover:text-white sharp border border-[#e5e2dc] transition-colors cursor-pointer"
                          title="Message Client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.cardsType === 'PROPERTIES' && result.units && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-normal text-[#121314]">
                  Spatial Ledger &bull; Property Allocation Candidates
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e876b]">
                  {result.units.length} Units Matching Query
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {result.units.map((unit) => (
                  <div
                    key={unit.id}
                    className="bg-[#f4f3f1] p-5 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-base text-[#121314]">
                          Unit {unit.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 sharp text-[9px] font-bold uppercase tracking-wider ${
                            unit.status === 'AVAILABLE'
                              ? 'bg-emerald-100 text-emerald-800'
                              : unit.status === 'RESERVED'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {unit.status}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#54524f]">
                        {unit.typology} &bull; {unit.level}
                      </div>

                      {/* Property Visual */}
                      <div className="relative h-28 sharp overflow-hidden border border-[#e5e2dc]">
                        <img
                          src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                          alt={unit.id}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[8px] uppercase tracking-widest font-semibold sharp">
                          {unit.sqm} m² &bull; {unit.sqft} sq ft
                        </div>
                      </div>

                      <div className="space-y-1.5 bg-white p-3 sharp border border-[#e5e2dc] text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Valuation:</span>
                          <span className="font-bold text-[#121314]">{unit.pricePKR}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Location:</span>
                          <span className="text-[#121314]">The Lacustrine Pavilions</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Orientation:</span>
                          <span className="text-[#121314]">Lakefront South</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#e5e2dc] flex items-center justify-between gap-2">
                      {unit.status === 'AVAILABLE' ? (
                        <button
                          onClick={() => {
                            demo.reserveUnit(unit.id);
                            showToast(`Unit ${unit.id} reserved via AI Command directive.`);
                          }}
                          className="flex-1 py-2 px-3 bg-[#121314] text-white hover:bg-[#2b2c2d] sharp text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Lock className="w-3 h-3 text-[#ddc2a3]" />
                          <span>Reserve (48h Hold)</span>
                        </button>
                      ) : (
                        <div className="flex-1 py-2 px-3 bg-amber-600 text-white sharp text-[10px] font-semibold uppercase tracking-wider text-center">
                          Hold Active
                        </div>
                      )}

                      <button
                        onClick={() => {
                          demo.selectUnit(unit.id);
                          onNavigate(ROUTES.PLATFORM_INVENTORY);
                        }}
                        className="py-2 px-3 bg-white hover:bg-[#e9e8e6] text-[#121314] sharp border border-[#e5e2dc] text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.cardsType === 'DRAWDOWNS' && result.drawdowns && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-normal text-[#121314]">
                  Fiduciary Escrow Milestones &bull; Active Vouchers
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e876b]">
                  3 Disbursements Audited
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {result.drawdowns.map((voucher, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f4f3f1] p-5 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#121314] text-white text-[9px] font-bold uppercase tracking-wider sharp">
                          VOUCHER #ESC-0{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase sharp">
                          {voucher.badge}
                        </span>
                      </div>

                      <div>
                        <div className="font-serif text-base text-[#121314]">{voucher.title}</div>
                        <div className="text-[10px] text-[#9e876b] font-semibold uppercase tracking-wider mt-0.5">
                          {voucher.stage}
                        </div>
                      </div>

                      <div className="bg-white p-3 sharp border border-[#e5e2dc] space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Amount:</span>
                          <span className="font-bold text-[#121314]">{voucher.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#54524f]">Authorized By:</span>
                          <span className="text-[#121314] truncate">{voucher.verifiedBy}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Milestone release voucher approved for ${voucher.amount}.`)}
                      className="w-full py-2.5 px-3 bg-[#121314] text-white hover:bg-[#2b2c2d] sharp text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ddc2a3]" />
                      <span>Authorize Release</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Action Suite */}
          <div className="pt-6 bg-[#f4f3f1] p-6 sharp border border-[#e5e2dc] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#54524f]">
                Batch Operations Suite:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <button
                onClick={() => onNavigate(ROUTES.PLATFORM_LEADS)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#121314] text-white hover:bg-[#2b2c2d] transition-colors sharp text-[10px] font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#ddc2a3]" />
                <span>View Leads in CRM ({demoState.leads.length})</span>
              </button>

              <button
                onClick={() => onNavigate(ROUTES.PLATFORM_INVENTORY)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#e9e8e6] text-[#121314] sharp border border-[#e5e2dc] transition-colors text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-[#9e876b]" />
                <span>View Spatial Inventory</span>
              </button>

              <button
                onClick={() => showToast('Escalation ticket #4811 assigned to Geneva Desk.')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#e9e8e6] text-[#121314] sharp border border-[#e5e2dc] transition-colors text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Auto-Assign Escalation Desk</span>
              </button>

              <button
                onClick={() => showToast('Dispatched automated calendar reminders for 3 critical clients.')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#e9e8e6] text-[#121314] sharp border border-[#e5e2dc] transition-colors text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#9e876b]" />
                <span>Schedule Priority Follow-ups</span>
              </button>

              <button
                onClick={() => showToast('Synthesized Executive Intelligence Briefing PDF downloaded.')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#e9e8e6] text-[#9e876b] sharp border border-[#e5e2dc] transition-colors text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export Dossier (PDF)</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. Cross-Functional Intelligence Telemetry (4 Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-[#9e876b]">02</span>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#121314]">
              CROSS-FUNCTIONAL INTELLIGENCE TELEMETRY
            </h2>
          </div>
          <span className="text-[10px] uppercase font-semibold text-[#54524f]">
            Real-time asynchronous computation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Sales Insight */}
          <div className="p-6 bg-white sharp border border-[#e5e2dc] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[#9e876b]">
                <span className="text-[10px] uppercase font-bold tracking-wider">SALES YIELD PULSE</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="font-sans text-3xl font-semibold text-[#121314] leading-none">PKR 48.2M</div>
              <div className="text-[10px] text-[#9e876b] uppercase font-bold tracking-wider">
                +14.8% MTD REALIZED YIELD
              </div>
            </div>
            <p className="text-xs text-[#54524f] leading-relaxed">
              Penthouse tier demand at The Lacustrine Pavilions is outstripping structural phase capacity by <strong>1.8×</strong>. Recommend accelerated opening of Phase II promontories.
            </p>
            <div className="pt-2.5 bg-[#f4f3f1] p-2 text-[9px] uppercase font-semibold text-[#54524f] flex items-center justify-between sharp border border-[#e5e2dc]">
              <span>SIA 102 Benchmark Passed</span>
              <span className="text-[#9e876b] font-bold">ALPHA RATE</span>
            </div>
          </div>

          {/* Lead Velocity Insight */}
          <div className="p-6 bg-white sharp border border-[#e5e2dc] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[#9e876b]">
                <span className="text-[10px] uppercase font-bold tracking-wider">INBOUND TRACTION</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-sans text-3xl font-semibold text-[#121314] leading-none">+32.0%</div>
              <div className="text-[10px] text-[#9e876b] uppercase font-bold tracking-wider">
                POST-ZENITH PRESS RELEASE
              </div>
            </div>
            <p className="text-xs text-[#54524f] leading-relaxed">
              Inbound velocity increased sharply post-Structural Zenith milestone announcement. Organic private referral conversion currently sits at a resilient <strong>64.2%</strong>.
            </p>
            <div className="pt-2.5 bg-[#f4f3f1] p-2 text-[9px] uppercase font-semibold text-[#54524f] flex items-center justify-between sharp border border-[#e5e2dc]">
              <span>Global Node Distribution</span>
              <span className="text-[#121314] font-bold">78 SITES</span>
            </div>
          </div>

          {/* Inventory Allocation Insight */}
          <div className="p-6 bg-white sharp border border-[#e5e2dc] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[#9e876b]">
                <span className="text-[10px] uppercase font-bold tracking-wider">SPATIAL COMMITMENT</span>
                <Building2 className="w-4 h-4" />
              </div>
              <div className="font-sans text-3xl font-semibold text-[#121314] leading-none">78.0%</div>
              <div className="text-[10px] text-[#9e876b] uppercase font-bold tracking-wider">
                BLOCK A (ALPINE PROMONTORY)
              </div>
            </div>
            <p className="text-xs text-[#54524f] leading-relaxed">
              18 reserved, 12 booked, and 18 legally registered. Only <strong>14 unencumbered allocations</strong> remain unassigned before master lottery close.
            </p>
            <div className="pt-2.5 bg-[#f4f3f1] p-2 text-[9px] uppercase font-semibold text-[#54524f] flex items-center justify-between sharp border border-[#e5e2dc]">
              <span>Ledger Encumbrance: Nil</span>
              <span className="text-[#9e876b] font-bold">STRICT ESCROW</span>
            </div>
          </div>

          {/* Financial & Escrow Insight */}
          <div className="p-6 bg-white sharp border border-[#e5e2dc] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[#9e876b]">
                <span className="text-[10px] uppercase font-bold tracking-wider">ESCROW MILESTONES</span>
                <Shield className="w-4 h-4" />
              </div>
              <div className="font-sans text-3xl font-semibold text-[#121314] leading-none">PKR 3.8M</div>
              <div className="text-[10px] text-red-700 uppercase font-bold tracking-wider">
                FLAGGED AS OVERDUE (3 ACCOUNTS)
              </div>
            </div>
            <p className="text-xs text-[#54524f] leading-relaxed">
              Milestone collections flagged across 3 syndicates. Escrow drawdown authorization of tranche E-04 is held pending Cantonal architectural clearance certificate.
            </p>
            <div className="pt-2.5 bg-[#f4f3f1] p-2 text-[9px] uppercase font-semibold text-[#54524f] flex items-center justify-between sharp border border-[#e5e2dc]">
              <span>Multi-Sig Protocol</span>
              <span className="text-[#121314] font-bold">TIER 1 REQ.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recent AI Directives & Generated Actions (Fiduciary Execution Audit) */}
      <section className="bg-white p-6 sm:p-8 sharp border border-[#e5e2dc] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2dc] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-[#9e876b]">03</span>
            <div>
              <h2 className="font-serif text-xl font-normal text-[#121314]">
                Fiduciary Execution Audit &bull; Command Ledger
              </h2>
              <p className="text-xs text-[#54524f]">
                Cryptographically anchored history of partner queries and autonomous system interventions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9e876b]" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#54524f]">
              Real-time Tamper-Evident SHA-256 Log
            </span>
          </div>
        </div>

        {/* Ledger Stream */}
        <div className="space-y-3 text-xs">
          {/* Row 1 */}
          <div className="p-4 bg-[#f4f3f1] sharp border border-[#e5e2dc] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:bg-[#e9e8e6] transition-colors">
            <div className="flex items-start md:items-center gap-4">
              <div className="p-2 bg-white text-[#121314] sharp border border-[#e5e2dc] shadow-sm flex-shrink-0">
                <Terminal className="w-4 h-4 text-[#9e876b]" />
              </div>
              <div className="space-y-0.5">
                <div className="font-medium text-[#121314]">
                  <span className="text-[#9e876b] font-bold">Alexander von Berg</span> queried: “Compare Lacustrine Pavilions Q3 run-rate to Villa Verona”
                </div>
                <div className="text-[10px] uppercase text-[#54524f] tracking-wider">
                  Autonomous Action: Generated Comparative Monograph &bull; Distributed to Investment Committee
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 text-[10px]">
              <span className="px-2 py-0.5 bg-white text-[#121314] sharp border border-[#e5e2dc] font-bold uppercase">
                12m ago
              </span>
              <span className="text-[#9e876b] font-bold uppercase">Verified Log</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="p-4 bg-[#f4f3f1] sharp border border-[#e5e2dc] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:bg-[#e9e8e6] transition-colors">
            <div className="flex items-start md:items-center gap-4">
              <div className="p-2 bg-white text-red-700 sharp border border-[#e5e2dc] shadow-sm flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div className="space-y-0.5">
                <div className="font-medium text-[#121314]">
                  <span className="font-bold text-[#121314]">System Intelligence</span> automatically flagged: “SLA Escalation Alert for Lead #HP-8942”
                </div>
                <div className="text-[10px] uppercase text-[#54524f] tracking-wider">
                  Autonomous Action: Pushed encrypted SMS notification to Ali Vance desk &bull; Escalation ticket #4811
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 text-[10px]">
              <span className="px-2 py-0.5 bg-white text-[#121314] sharp border border-[#e5e2dc] font-bold uppercase">
                34m ago
              </span>
              <span className="text-[#9e876b] font-bold uppercase">Automated Trigger</span>
            </div>
          </div>

          {/* Row 3: Reactive Activity from demoStore */}
          {demoState.activities.slice(0, 2).map((act) => (
            <div
              key={act.id}
              className="p-4 bg-[#f4f3f1] sharp border border-[#e5e2dc] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:bg-[#e9e8e6] transition-colors"
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="p-2 bg-white text-[#121314] sharp border border-[#e5e2dc] shadow-sm flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#9e876b]" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-medium text-[#121314]">{act.action}</div>
                  <div className="text-[10px] uppercase text-[#54524f] tracking-wider">
                    Ledger State: Cryptographically committed to {act.type} category
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 text-[10px]">
                <span className="px-2 py-0.5 bg-white text-[#121314] sharp border border-[#e5e2dc] font-bold uppercase">
                  {act.timestamp}
                </span>
                <span className="text-[#9e876b] font-bold uppercase">Live Mirror</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Fiduciary & Regulatory Safeguard Protocol Footer Notice */}
      <section className="p-6 sm:p-8 bg-[#e9e8e6] text-[#121314] space-y-3 sharp border border-[#e5e2dc] shadow-sm">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#9e876b]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#121314]">
            FIDUCIARY &amp; REGULATORY SAFEGUARD PROTOCOL &bull; [DEMO DATA]
          </span>
        </div>
        <p className="text-xs text-[#54524f] max-w-5xl leading-relaxed font-normal">
          AI synthesis and operational recommendations are computed deterministically from verified mock client records and property ledgers. Operations that alter ledger balances, re-allocate deeded spatial inventory, or override contractual milestones mandate <strong>Multi-Signature Partner Authorization (Tier 1)</strong> under Swiss SIA/FINMA fiduciary compliance standards. All natural-language queries are cataloged for statutory audit.
        </p>
        <div className="flex flex-wrap items-center gap-6 pt-2 text-[10px] uppercase tracking-wider text-[#54524f]">
          <span>Geneva Master Node #CHE-884-102</span>
          <span>&bull;</span>
          <span>Immutable Ledger Mirror Active</span>
          <span>&bull;</span>
          <span>Zero External Model Leakage Guarantee</span>
        </div>
      </section>
    </div>
  );
};
