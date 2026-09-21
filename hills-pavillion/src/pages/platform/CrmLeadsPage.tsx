import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { useDemoState } from '../../hooks/useDemoState';
import type { DemoLead } from '../../data/demoStore';
import {
  Search,
  FileDown,
  Send,
  Plus,
  Inbox,
  Sparkles,
  Clock,
  TrendingUp,
  Table as TableIcon,
  Kanban,
  Phone,
  MessageSquare,
  Calendar,
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
  Zap,
  ArrowRight,
  Building2,
  X,
} from 'lucide-react';

interface CrmLeadsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const CrmLeadsPage: React.FC<CrmLeadsPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();
  const [searchFilter, setSearchFilter] = useState('');
  const [viewFormat, setViewFormat] = useState<'TABLE' | 'KANBAN'>('TABLE');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('ALL');
  const [projectFilter, setProjectFilter] = useState<string>('ALL');
  const [scoreFilter, setScoreFilter] = useState<string>('ALL');
  const [partnerFilter, setPartnerFilter] = useState<string>('ALL');
  
  // Note textarea state
  const [currentNoteText, setCurrentNoteText] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  
  // Add Lead Modal state
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadProject, setNewLeadProject] = useState('The Lacustrine Pavilions');
  const [newLeadBudget, setNewLeadBudget] = useState('PKR 35M - 45M');
  const [newLeadPhone, setNewLeadPhone] = useState('+92 300 1234567');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Find currently selected lead or fallback to first
  const selectedLead: DemoLead =
    demoState.leads.find((l) => l.id === demoState.selectedLeadId) ||
    demoState.leads[0] || {
      id: 'lead-01',
      name: 'Ahmed Khan',
      targetProject: 'The Lacustrine Pavilions',
      targetUnit: 'Unit A-102',
      budget: 'PKR 35M',
      status: 'QUALIFIED',
      intentScore: 87,
      lastContact: '2 days ago',
      slaStatus: 'ATTENTION_REQUIRED',
      recommendedAction: 'Initial contact required.',
      phone: '+92 300 8451122',
      notes: 'Indicated preference for south-facing lakefront aspect.',
    };

  // Filter leads
  const filteredLeads = demoState.leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.targetProject.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (l.targetUnit && l.targetUnit.toLowerCase().includes(searchFilter.toLowerCase())) ||
      l.id.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStage =
      selectedStageFilter === 'ALL' ||
      l.status === selectedStageFilter;

    const matchesProject =
      projectFilter === 'ALL' ||
      l.targetProject.toLowerCase().includes(projectFilter.toLowerCase());

    const matchesScore =
      scoreFilter === 'ALL' ||
      (scoreFilter === 'HIGH' && l.intentScore >= 80) ||
      (scoreFilter === 'MID' && l.intentScore >= 50 && l.intentScore < 80) ||
      (scoreFilter === 'LOW' && l.intentScore < 50);

    return matchesSearch && matchesStage && matchesProject && matchesScore;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    demo.addLead({
      name: newLeadName,
      targetProject: newLeadProject,
      budget: newLeadBudget,
      phone: newLeadPhone,
      notes: newLeadNotes || 'Created directly via Atelier CRM rapid intake.',
    });

    setIsAddLeadOpen(false);
    setNewLeadName('');
    setNewLeadNotes('');
    showToast(`New client dossier created for ${newLeadName}.`);
  };

  const handleSaveNote = () => {
    if (!currentNoteText.trim()) return;
    demo.addLeadNote(selectedLead.id, currentNoteText);
    setCurrentNoteText('');
    showToast(`Confidential memo appended to ${selectedLead.name}'s dossier.`);
  };

  const handleAdvanceStatus = (newStatus: DemoLead['status']) => {
    demo.updateLeadStatus(selectedLead.id, newStatus);
    showToast(`${selectedLead.name} transitioned to ${newStatus}.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-[#121314]">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121314] text-white px-5 py-3 sharp shadow-2xl border border-white/20 flex items-center gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-[#ddc2a3]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white max-w-lg w-full sharp border border-[#e5e2dc] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9e876b]" />
                <h3 className="font-serif text-lg font-normal uppercase tracking-wider text-[#121314]">
                  Record Client Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsAddLeadOpen(false)}
                className="text-[#54524f] hover:text-[#121314] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Tariq Mansoor"
                  className="w-full bg-[#f4f3f1] p-2.5 border border-[#e5e2dc] text-[#121314] sharp focus:outline-none focus:border-[#121314]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                    Target Portfolio
                  </label>
                  <select
                    value={newLeadProject}
                    onChange={(e) => setNewLeadProject(e.target.value)}
                    className="w-full bg-[#f4f3f1] p-2.5 border border-[#e5e2dc] text-[#121314] sharp focus:outline-none focus:border-[#121314]"
                  >
                    <option value="The Lacustrine Pavilions">The Lacustrine Pavilions</option>
                    <option value="Belvedere Enclave">Belvedere Enclave</option>
                    <option value="Villa Verona">Villa Verona</option>
                    <option value="Aurelia Forum">Aurelia Forum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                    Acquisition Budget
                  </label>
                  <input
                    type="text"
                    value={newLeadBudget}
                    onChange={(e) => setNewLeadBudget(e.target.value)}
                    placeholder="PKR 35M"
                    className="w-full bg-[#f4f3f1] p-2.5 border border-[#e5e2dc] text-[#121314] sharp focus:outline-none focus:border-[#121314]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                  Direct Telephone / WhatsApp
                </label>
                <input
                  type="text"
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="+92 300 0000000"
                  className="w-full bg-[#f4f3f1] p-2.5 border border-[#e5e2dc] text-[#121314] sharp focus:outline-none focus:border-[#121314]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                  Private Advisory Notes
                </label>
                <textarea
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  rows={3}
                  placeholder="Specific architectural preferences, desired view orientations, payment structuring..."
                  className="w-full bg-[#f4f3f1] p-2.5 border border-[#e5e2dc] text-[#121314] sharp focus:outline-none focus:border-[#121314]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 border border-[#e5e2dc] text-[#54524f] hover:bg-[#f4f3f1] sharp text-xs uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#121314] text-white hover:bg-[#2b2c2d] sharp text-xs uppercase tracking-wider font-semibold"
                >
                  Save Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. Top Command & Header Zone */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e2dc] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b]">
              Atelier CRM &amp; Client Desk
            </span>
            <span className="text-[#c5c6c9] text-[10px]">/</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#54524f]">
              Active Pipeline
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9e876b] ml-1 animate-pulse" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#121314] font-normal tracking-tight leading-none">
            LEADS &amp; CLIENT PIPELINE
          </h1>
          <p className="text-xs text-[#54524f] max-w-2xl pt-1 font-normal leading-relaxed">
            Manage, qualify and follow up with prospective clients across active monument portfolios with AI intent scoring and audit trails.
          </p>
        </div>

        {/* Action Cluster */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => showToast('Exporting Lead Ledger CSV...')}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#f4f3f1] hover:bg-[#e9e8e6] transition-colors sharp text-[#121314] text-[11px] font-semibold uppercase tracking-wider cursor-pointer border border-[#e5e2dc]"
          >
            <FileDown className="w-4 h-4 text-[#9e876b]" />
            <span>Export Ledger</span>
          </button>
          <button
            onClick={() => showToast('Bulk advisory dispatch initiated for 14 active clients.')}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#f4f3f1] hover:bg-[#e9e8e6] transition-colors sharp text-[#121314] text-[11px] font-semibold uppercase tracking-wider cursor-pointer border border-[#e5e2dc]"
          >
            <Send className="w-4 h-4 text-[#9e876b]" />
            <span>Bulk Dispatch</span>
          </button>
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121314] text-white hover:bg-[#2b2c2d] transition-all sharp text-[11px] font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#ddc2a3]" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* 2. Metrics Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Total Inbound
            </span>
            <Inbox className="w-4 h-4 text-[#9e876b]" />
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold">
              {demoState.leads.length + 119}
            </span>
            <span className="text-[10px] text-[#9e876b] font-medium">+8 this week</span>
          </div>
        </div>

        <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              AI High-Intent (&gt;80)
            </span>
            <Sparkles className="w-4 h-4 text-[#9e876b]" />
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold">
              {demoState.leads.filter((l) => l.intentScore >= 80).length + 34}
            </span>
            <span className="text-[10px] text-[#745f46] bg-[#f7dbbb]/60 px-1.5 py-0.5 sharp font-medium">
              31.2% Rate
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Pending Follow-up
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold">14</span>
            <span className="text-[10px] text-red-700 bg-red-100 px-1.5 py-0.5 sharp font-medium">
              3 Overdue
            </span>
          </div>
        </div>

        <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Conversion Velocity
            </span>
            <TrendingUp className="w-4 h-4 text-[#9e876b]" />
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-sans text-2xl sm:text-3xl text-[#121314] font-semibold">18.4</span>
            <span className="text-[10px] text-[#54524f] font-medium">Days to Close</span>
          </div>
        </div>
      </div>

      {/* 3. Visual Pipeline Progression Bar (7 Stages) */}
      <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#121314]">
              Pipeline Cadence
            </span>
            <span className="text-[#c5c6c9] text-xs">•</span>
            <span className="text-[10px] text-[#54524f]">
              Total Active Value: PKR 470M
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#9e876b] uppercase tracking-wider font-semibold">
              Weighted Yield: 64.2%
            </span>
            {selectedStageFilter !== 'ALL' && (
              <button
                onClick={() => setSelectedStageFilter('ALL')}
                className="text-[10px] text-[#121314] underline hover:text-[#9e876b] cursor-pointer"
              >
                Clear Stage Filter
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {/* Stage 1: NEW */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'NEW' ? 'ALL' : 'NEW')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'NEW'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f4f3f1] hover:bg-[#efeeec] border-[#e5e2dc] text-[#121314]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">1. NEW</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'NEW').length + 24} Leads
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedStageFilter === 'NEW' ? 'text-[#ddc2a3]' : 'text-[#9e876b]'}`}>
              PKR 74M
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-slate-500 h-full w-full" />
            </div>
          </div>

          {/* Stage 2: CONTACTED */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'CONTACTED' ? 'ALL' : 'CONTACTED')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'CONTACTED'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f4f3f1] hover:bg-[#efeeec] border-[#e5e2dc] text-[#121314]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">2. CONTACTED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9e876b]" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'CONTACTED').length + 32} Leads
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedStageFilter === 'CONTACTED' ? 'text-[#ddc2a3]' : 'text-[#9e876b]'}`}>
              PKR 98M
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-[#9e876b] h-full w-[85%]" />
            </div>
          </div>

          {/* Stage 3: QUALIFIED */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'QUALIFIED' ? 'ALL' : 'QUALIFIED')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'QUALIFIED'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f7dbbb]/30 hover:bg-[#f7dbbb]/50 border-[#9e876b]/40 text-[#121314]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#745f46]">3. QUALIFIED</span>
              <span className="w-2 h-2 rounded-full bg-[#9e876b] animate-ping" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'QUALIFIED').length + 20} Leads
            </div>
            <div className="text-[10px] mt-0.5 text-[#745f46] font-semibold">
              PKR 82M
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-[#9e876b] h-full w-full" />
            </div>
          </div>

          {/* Stage 4: VISIT_SCHEDULED */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'VISIT_SCHEDULED' ? 'ALL' : 'VISIT_SCHEDULED')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'VISIT_SCHEDULED'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f4f3f1] hover:bg-[#efeeec] border-[#e5e2dc] text-[#121314]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">4. SITE VISIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'VISIT_SCHEDULED').length + 10} Leads
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedStageFilter === 'VISIT_SCHEDULED' ? 'text-[#ddc2a3]' : 'text-[#9e876b]'}`}>
              PKR 56M
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-[#9e876b] h-full w-[50%]" />
            </div>
          </div>

          {/* Stage 5: NEGOTIATION */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'NEGOTIATION' ? 'ALL' : 'NEGOTIATION')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'NEGOTIATION'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f4f3f1] hover:bg-[#efeeec] border-[#e5e2dc] text-[#121314]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">5. NEGOTIATION</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'NEGOTIATION').length + 7} Leads
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedStageFilter === 'NEGOTIATION' ? 'text-[#ddc2a3]' : 'text-[#9e876b]'}`}>
              PKR 48M
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-[#9e876b] h-full w-[35%]" />
            </div>
          </div>

          {/* Stage 6: WON */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'WON' ? 'ALL' : 'WON')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'WON'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f4f3f1] hover:bg-[#efeeec] border-[#e5e2dc] text-[#121314]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">6. WON</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'WON').length + 13} Deals
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedStageFilter === 'WON' ? 'text-[#ddc2a3]' : 'text-[#9e876b]'}`}>
              PKR 112M
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-[#121314] h-full w-full" />
            </div>
          </div>

          {/* Stage 7: ARCHIVED / LOST */}
          <div
            onClick={() => setSelectedStageFilter(selectedStageFilter === 'LOST' ? 'ALL' : 'LOST')}
            className={`p-2.5 sharp transition-all cursor-pointer border ${
              selectedStageFilter === 'LOST'
                ? 'bg-[#121314] text-white border-[#121314]'
                : 'bg-[#f4f3f1] hover:bg-[#efeeec] border-[#e5e2dc] text-[#121314] opacity-75'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">7. ARCHIVED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="mt-2 text-sm font-medium">
              {demoState.leads.filter((l) => l.status === 'LOST').length + 4} Lost
            </div>
            <div className="text-[10px] mt-0.5 text-[#54524f]">
              Disqualified
            </div>
            <div className="w-full bg-[#e3e2e0] h-1 sharp mt-2 overflow-hidden">
              <div className="bg-slate-300 h-full w-[15%]" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Filter & Control Matrix Bar */}
      <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Universal Search Field */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#54524f] w-4 h-4" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by client name, telephone, dossier ref, project..."
              className="w-full bg-[#f4f3f1] pl-10 pr-4 py-2 text-[#121314] placeholder:text-[#848485] text-xs sharp focus:bg-white focus:outline-none border border-transparent focus:border-[#121314] transition-colors"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#54524f] hover:text-[#121314]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Switcher: Table View vs. Kanban */}
          <div className="flex items-center bg-[#f4f3f1] p-1 sharp self-start lg:self-auto border border-[#e5e2dc]">
            <button
              onClick={() => setViewFormat('TABLE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sharp text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                viewFormat === 'TABLE'
                  ? 'bg-white text-[#121314] shadow-sm'
                  : 'text-[#54524f] hover:text-[#121314]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setViewFormat('KANBAN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sharp text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                viewFormat === 'KANBAN'
                  ? 'bg-white text-[#121314] shadow-sm'
                  : 'text-[#54524f] hover:text-[#121314]'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Pipeline</span>
            </button>
          </div>
        </div>

        {/* Granular Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 pt-1 text-xs">
          {/* Project Filter */}
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]"
          >
            <option value="ALL">All Projects</option>
            <option value="The Lacustrine Pavilions">The Lacustrine Pavilions</option>
            <option value="Belvedere Enclave">Belvedere Enclave</option>
            <option value="Villa Verona">Villa Verona</option>
            <option value="Aurelia Forum">Aurelia Forum</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New Inbound</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">AI Qualified</option>
            <option value="VISIT_SCHEDULED">Site Visit</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost / Archived</option>
          </select>

          {/* Score Filter */}
          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]"
          >
            <option value="ALL">All Intent Scores</option>
            <option value="HIGH">High Intent (&ge;80)</option>
            <option value="MID">Moderate (50-79)</option>
            <option value="LOW">Exploratory (&lt;50)</option>
          </select>

          {/* Partner Filter */}
          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]"
          >
            <option value="ALL">Assigned: All Partners</option>
            <option value="Ali">Partner: Ali</option>
            <option value="Julian">Partner: Julian Vance</option>
            <option value="Sofia">Partner: Sofia Conti</option>
            <option value="Farhan">Partner: Farhan S.</option>
          </select>

          {/* Source Filter */}
          <select className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]">
            <option>All Sources</option>
            <option>Private Atelier Web</option>
            <option>VIP WhatsApp Concierge</option>
            <option>Partner Referral</option>
            <option>Direct Heli Desk</option>
          </select>

          {/* Timeline Filter */}
          <select className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]">
            <option>Follow-up: All</option>
            <option>Follow-up: Today</option>
            <option>Follow-up: Tomorrow</option>
            <option>Follow-up: This Week</option>
            <option>Follow-up: Overdue</option>
          </select>
        </div>
      </div>

      {/* 5. Dual-Pane CRM Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: LEAD DIRECTORY TABLE OR KANBAN (xl:col-span-7) */}
        <div className="xl:col-span-7 bg-white sharp border border-[#e5e2dc] shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 bg-[#f4f3f1] border-b border-[#e5e2dc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#121314]">
                Qualified Pipeline Directory
              </span>
              <span className="px-2 py-0.5 sharp text-[10px] font-bold bg-[#e3e2e0] text-[#54524f]">
                {filteredLeads.length} MATCHES
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast('All visible pipeline items selected for batch operation.')}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#9e876b] hover:underline cursor-pointer"
              >
                Select All
              </button>
              <SlidersHorizontal className="w-4 h-4 text-[#54524f] cursor-pointer hover:text-[#121314]" />
            </div>
          </div>

          {/* View Format Content */}
          {viewFormat === 'TABLE' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f4f3f1] text-[#54524f] font-semibold text-[10px] uppercase tracking-wider border-b border-[#e5e2dc]">
                    <th className="py-3 px-4">Lead</th>
                    <th className="py-3 px-3">Interest / Project</th>
                    <th className="py-3 px-3">AI Score</th>
                    <th className="py-3 px-3">Partner</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Follow-up</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e2dc]">
                  {filteredLeads.map((lead) => {
                    const isSelected = lead.id === selectedLead.id;
                    const initials = lead.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => demo.selectLead(lead.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#f7dbbb]/25 hover:bg-[#f7dbbb]/35 font-medium'
                            : 'hover:bg-[#f4f3f1]'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#121314] text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-[#121314] truncate">
                                  {lead.name}
                                </span>
                                {lead.intentScore >= 85 && (
                                  <span className="px-1.5 py-0.2 bg-[#121314] text-white text-[8px] font-bold uppercase tracking-wider sharp">
                                    VIP
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-[#54524f] mt-0.5 tracking-wider truncate">
                                #{lead.id.slice(0, 8)} &bull; {lead.budget}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="truncate max-w-[130px] font-medium text-[#121314]">
                            {lead.targetUnit || 'Direct Inquiry'}
                          </div>
                          <div className="text-[10px] text-[#9e876b] truncate">
                            {lead.targetProject}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f7dbbb] text-[#745f46] sharp text-[10px] font-bold">
                            <Zap className="w-3 h-3 text-[#9e876b]" />
                            <span>{lead.intentScore}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#e3e2e0] text-[9px] flex items-center justify-center text-[#121314] font-bold">
                              A
                            </span>
                            <span className="text-[#121314] text-xs truncate">Ali</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 sharp text-[9px] uppercase tracking-wider font-bold ${
                              lead.status === 'QUALIFIED'
                                ? 'bg-[#9e876b]/20 text-[#745f46]'
                                : lead.status === 'WON'
                                ? 'bg-emerald-100 text-emerald-800'
                                : lead.status === 'NEW'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-[#e3e2e0] text-[#54524f]'
                            }`}
                          >
                            {lead.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-medium text-xs text-red-700">
                            {lead.lastContact}
                          </div>
                          <div className="text-[9px] text-[#54524f]">
                            {lead.slaStatus === 'ATTENTION_REQUIRED' ? 'Action Req.' : 'On Track'}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1 text-[#54524f]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`Direct WhatsApp link activated for ${lead.name}`);
                              }}
                              className="p-1.5 hover:text-[#121314] hover:bg-white sharp transition-colors cursor-pointer"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`Initiating secure call to ${lead.name}`);
                              }}
                              className="p-1.5 hover:text-[#121314] hover:bg-white sharp transition-colors cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                demo.selectLead(lead.id);
                              }}
                              className="p-1.5 text-[#121314] hover:bg-white sharp transition-colors cursor-pointer"
                              title="Inspect Dossier"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* KANBAN PIPELINE VIEW */
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[600px]">
              {(['NEW', 'CONTACTED', 'QUALIFIED', 'VISIT_SCHEDULED', 'NEGOTIATION', 'WON'] as const).map((stage) => {
                const stageLeads = filteredLeads.filter((l) => l.status === stage);
                return (
                  <div key={stage} className="bg-[#f4f3f1] p-3 sharp border border-[#e5e2dc] flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#121314]">
                        {stage.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-bold bg-[#e3e2e0] px-1.5 py-0.2 sharp text-[#54524f]">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2 min-h-[140px]">
                      {stageLeads.map((ld) => (
                        <div
                          key={ld.id}
                          onClick={() => demo.selectLead(ld.id)}
                          className={`p-3 sharp border transition-all cursor-pointer ${
                            ld.id === selectedLead.id
                              ? 'bg-white border-[#121314] shadow-sm ring-1 ring-[#121314]'
                              : 'bg-white border-[#e5e2dc] hover:border-[#9e876b]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-xs text-[#121314] truncate">
                              {ld.name}
                            </span>
                            <span className="text-[9px] font-bold text-[#9e876b]">
                              {ld.intentScore}pt
                            </span>
                          </div>
                          <div className="text-[10px] text-[#54524f] truncate mt-0.5">
                            {ld.targetProject}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f4f3f1]">
                            <span className="text-[9px] font-semibold text-[#121314]">
                              {ld.budget}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextMap: Record<DemoLead['status'], DemoLead['status']> = {
                                  NEW: 'CONTACTED',
                                  CONTACTED: 'QUALIFIED',
                                  QUALIFIED: 'VISIT_SCHEDULED',
                                  VISIT_SCHEDULED: 'NEGOTIATION',
                                  NEGOTIATION: 'WON',
                                  WON: 'WON',
                                  LOST: 'NEW',
                                };
                                const nextSt = nextMap[ld.status];
                                demo.updateLeadStatus(ld.id, nextSt);
                                showToast(`Moved ${ld.name} to ${nextSt}`);
                              }}
                              className="text-[9px] font-semibold uppercase tracking-wider text-[#9e876b] hover:text-[#121314] flex items-center gap-0.5 cursor-pointer"
                              title="Advance Pipeline Stage"
                            >
                              <span>Advance</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table Footer / Pagination */}
          <div className="p-4 bg-[#f4f3f1] border-t border-[#e5e2dc] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#54524f]">
            <div className="flex items-center gap-2">
              <span>Showing 1 to {filteredLeads.length} of {demoState.leads.length + 119} records</span>
              <span className="text-[#c5c6c9]">•</span>
              <span className="text-[#9e876b] font-medium">Sorted by AI Intent Velocity</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => showToast('Displaying page 1')}
                className="px-2.5 py-1 bg-[#e3e2e0] sharp text-[#54524f] hover:text-[#121314] transition-colors cursor-pointer"
              >
                Prev
              </button>
              <button className="px-2.5 py-1 bg-[#121314] text-white sharp font-bold">1</button>
              <button
                onClick={() => showToast('Displaying page 2')}
                className="px-2.5 py-1 bg-[#e3e2e0] sharp text-[#121314] hover:bg-[#dadad8] transition-colors cursor-pointer"
              >
                2
              </button>
              <button
                onClick={() => showToast('Displaying page 3')}
                className="px-2.5 py-1 bg-[#e3e2e0] sharp text-[#121314] hover:bg-[#dadad8] transition-colors cursor-pointer"
              >
                3
              </button>
              <button
                onClick={() => showToast('Displaying page 2')}
                className="px-2.5 py-1 bg-[#e3e2e0] sharp text-[#121314] hover:bg-[#dadad8] transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: ACTIVE LEAD DOSSIER & AI INTELLIGENCE PANEL (xl:col-span-5) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          {/* Dossier Header & Quick Toolbar Card */}
          <div className="bg-white p-6 sharp border border-[#e5e2dc] shadow-sm flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9e876b]">
                    DOSSIER #{selectedLead.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 sharp text-[10px] font-bold uppercase tracking-wider bg-[#f7dbbb] text-[#745f46]">
                    {selectedLead.status}
                  </span>
                </div>
                <h2 className="font-serif text-2xl text-[#121314] font-normal mt-1">
                  {selectedLead.name}
                </h2>
                <p className="text-xs text-[#54524f] mt-0.5">
                  Target: <button onClick={() => onNavigate(ROUTES.PLATFORM_INVENTORY)} className="text-[#121314] font-semibold hover:underline cursor-pointer">{selectedLead.targetUnit || 'Unassigned Unit'}</button> &bull; {selectedLead.targetProject}
                </p>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#54524f] font-semibold">
                  Assigned Partner
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="w-6 h-6 rounded-full bg-[#121314] text-white flex items-center justify-center text-[10px] font-bold">
                    A
                  </span>
                  <span className="text-xs font-semibold text-[#121314]">Ali</span>
                </div>
              </div>
            </div>

            {/* Quick Status Advance Control */}
            <div className="flex items-center justify-between p-2.5 bg-[#f4f3f1] sharp border border-[#e5e2dc] text-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#54524f]">
                Advance Lead Lifecycle:
              </span>
              <div className="flex items-center gap-1.5">
                {(['CONTACTED', 'QUALIFIED', 'VISIT_SCHEDULED', 'WON'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleAdvanceStatus(st)}
                    className={`px-2 py-1 sharp text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                      selectedLead.status === st
                        ? 'bg-[#121314] text-white'
                        : 'bg-white text-[#54524f] hover:text-[#121314] border border-[#e5e2dc]'
                    }`}
                  >
                    {st === 'VISIT_SCHEDULED' ? 'VISIT' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Thumbnail Snippet */}
            <div
              onClick={() => onNavigate(ROUTES.PLATFORM_INVENTORY)}
              className="relative h-28 sharp overflow-hidden border border-[#e5e2dc] cursor-pointer group"
              title="Inspect in Spatial Inventory"
            >
              <img
                src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                alt="Selected Architectural Unit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3">
                <div className="text-white flex items-center justify-between w-full text-xs">
                  <span className="text-[10px] tracking-widest uppercase text-[#ddc2a3] font-semibold">
                    {selectedLead.targetUnit || 'LP-104 North Promontory'} &rarr;
                  </span>
                  <span className="text-[10px] bg-black/60 px-2 py-0.5 sharp backdrop-blur font-semibold">
                    Est. {selectedLead.budget}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast(`VIP WhatsApp channel initialized for ${selectedLead.name}.`)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#121314] text-white sharp text-xs font-semibold uppercase tracking-wider hover:bg-[#2b2c2d] transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#ddc2a3]" />
                <span>WhatsApp Concierge</span>
              </button>
              <button
                onClick={() => showToast(`Secured voice call connected to ${selectedLead.phone || selectedLead.name}.`)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#f4f3f1] hover:bg-[#e9e8e6] text-[#121314] sharp text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#e5e2dc]"
              >
                <Phone className="w-3.5 h-3.5 text-[#9e876b]" />
                <span>Direct Call</span>
              </button>
              <button
                onClick={() => showToast(`Site visit invitation sent to ${selectedLead.name}.`)}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#f4f3f1] hover:bg-[#e9e8e6] text-[#121314] sharp text-[10px] uppercase tracking-wider transition-colors cursor-pointer border border-[#e5e2dc]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Visit</span>
              </button>
              <button
                onClick={() => showToast('Re-assigning partner: Sofia Conti assigned as lead advisor.')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#f4f3f1] hover:bg-[#e9e8e6] text-[#121314] sharp text-[10px] uppercase tracking-wider transition-colors cursor-pointer border border-[#e5e2dc]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-Assign Partner</span>
              </button>
            </div>
          </div>

          {/* AI Lead Scoring & Telemetry Module */}
          <div className="bg-white p-6 sharp border border-[#e5e2dc] shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9e876b]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#121314]">
                  AI Intent Telemetry
                </span>
              </div>
              <span className="text-[10px] text-[#745f46] bg-[#f7dbbb]/50 px-2 py-0.5 sharp font-semibold">
                v2.4 Telemetry Engine
              </span>
            </div>

            {/* Prominent Score Display Card */}
            <div className="bg-[#f4f3f1] p-4 sharp flex items-center justify-between gap-4 border border-[#e5e2dc]">
              <div className="flex items-center gap-4">
                {/* Circular SVG Gauge */}
                <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e3e2e0]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#9e876b]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${selectedLead.intentScore}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-sans text-lg font-bold text-[#121314] leading-none">
                      {selectedLead.intentScore}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#121314]">
                    {selectedLead.intentScore >= 80 ? 'High Intent (Stage 2+)' : 'Exploratory Intent'}
                  </div>
                  <div className="text-[10px] text-[#9e876b] mt-0.5">
                    96.4% confidence &bull; 18 behavioral signals
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-[#54524f] block font-semibold">
                  Status
                </span>
                <span className="text-[11px] text-[#121314] font-bold">
                  {selectedLead.slaStatus === 'ATTENTION_REQUIRED' ? 'Priority Follow' : 'On Track'}
                </span>
              </div>
            </div>

            {/* Diagnostic Scoring Factors Breakdown */}
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-[#54524f] font-bold">
                Telemetry Attribution
              </div>

              {/* Budget Match */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#121314] font-medium">Budget Match</span>
                  <span className="font-semibold text-[#121314]">92%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-1.5 sharp overflow-hidden">
                  <div className="bg-[#9e876b] h-full w-[92%]" />
                </div>
                <span className="text-[9px] text-[#54524f] block mt-0.5">
                  Liquid allocation verified within {selectedLead.budget} bracket
                </span>
              </div>

              {/* Property Match */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#121314] font-medium">Property Specification Match</span>
                  <span className="font-semibold text-[#121314]">88%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-1.5 sharp overflow-hidden">
                  <div className="bg-[#9e876b] h-full w-[88%]" />
                </div>
                <span className="text-[9px] text-[#54524f] block mt-0.5">
                  Requested specifications match available unit inventory in {selectedLead.targetProject}
                </span>
              </div>

              {/* Engagement Velocity */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#121314] font-medium">Engagement Velocity</span>
                  <span className="font-semibold text-[#121314]">85%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-1.5 sharp overflow-hidden">
                  <div className="bg-[#9e876b] h-full w-[85%]" />
                </div>
                <span className="text-[9px] text-[#54524f] block mt-0.5">
                  Downloaded Monograph PDF, viewed Masterplan 4 times in 48h
                </span>
              </div>

              {/* Response History */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#121314] font-medium">Response History</span>
                  <span className="font-semibold text-[#121314]">84%</span>
                </div>
                <div className="w-full bg-[#e3e2e0] h-1.5 sharp overflow-hidden">
                  <div className="bg-[#9e876b] h-full w-[84%]" />
                </div>
                <span className="text-[9px] text-[#54524f] block mt-0.5">
                  Average reply latency 14 mins on VIP WhatsApp concierge channel
                </span>
              </div>
            </div>

            {/* AI Recommendation Highlight Callout */}
            <div className="bg-[#f7dbbb]/30 p-4 sharp border border-[#9e876b]/30 flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#9e876b] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#745f46] tracking-wider">
                    Recommended Intervention
                  </div>
                  <p className="text-xs text-[#121314] leading-relaxed">
                    {selectedLead.recommendedAction ||
                      `High-intent lead. Follow up today and offer a site visit to ${selectedLead.targetProject}. Client reviewed architectural engineering specifications twice this morning.`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  demo.updateLeadStatus(selectedLead.id, 'VISIT_SCHEDULED');
                  showToast(`Site visit invitation dispatched for ${selectedLead.name}.`);
                }}
                className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#121314] text-white hover:bg-[#2b2c2d] sharp text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#ddc2a3]" />
                <span>Dispatch Site Visit Invite</span>
              </button>
            </div>
          </div>

          {/* Activity Timeline (Interaction Ledger) */}
          <div className="bg-white p-6 sharp border border-[#e5e2dc] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#121314]">
                Interaction Ledger
              </span>
              <span className="text-[10px] text-[#54524f] font-semibold">
                5 EVENTS LOGGED
              </span>
            </div>

            <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#e5e2dc]">
              {/* Event 1 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#9e876b]" />
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-[#121314]">Next Planned Event</span>
                  <span className="text-[10px] text-red-700 font-bold">Today, 14:00</span>
                </div>
                <p className="text-xs text-[#54524f] mt-0.5">
                  Site visit helicopter flyover scheduling briefing with Ali.
                </p>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-400" />
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-[#121314]">Document Telemetry</span>
                  <span className="text-[10px] text-[#54524f]">Today, 09:15</span>
                </div>
                <p className="text-xs text-[#54524f] mt-0.5">
                  Viewed Construction Progress &amp; Geothermal Vault spec sheet (4 mins dwell time).
                </p>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-400" />
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-[#121314]">Discovery Phone Call</span>
                  <span className="text-[10px] text-[#54524f]">Yesterday, 17:40</span>
                </div>
                <p className="text-xs text-[#54524f] mt-0.5">
                  12-minute briefing logged with Ali; confirmed private equity backing for acquisition.
                </p>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-400" />
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-[#121314]">WhatsApp VIP Dossier</span>
                  <span className="text-[10px] text-[#54524f]">Yesterday, 14:25</span>
                </div>
                <p className="text-xs text-[#54524f] mt-0.5">
                  Automated VIP Monograph dispatched and read receipts verified.
                </p>
              </div>

              {/* Event 5 */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-400" />
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-[#121314]">Website Acquisition Inquiry</span>
                  <span className="text-[10px] text-[#54524f]">Yesterday, 14:20</span>
                </div>
                <p className="text-xs text-[#54524f] mt-0.5">
                  Completed bespoke concierge form with villa preference in {selectedLead.targetProject}.
                </p>
              </div>
            </div>
          </div>

          {/* Automations & Quick Notes Section */}
          <div className="bg-white p-6 sharp border border-[#e5e2dc] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#121314]">
                Automations &amp; Protocol
              </span>
              <Building2 className="w-4 h-4 text-[#9e876b]" />
            </div>

            {/* Active Reminders & Drone Protocol */}
            <div className="space-y-2.5 text-xs">
              <div className="bg-[#f4f3f1] p-3 sharp border border-[#e5e2dc] flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#9e876b] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#121314]">
                      Follow up with {selectedLead.name}
                    </div>
                    <div className="text-[10px] text-[#54524f] mt-0.5">
                      Tomorrow at 11:00 AM &bull; Auto-Sync Outlook &amp; Calendar
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 sharp text-[9px] font-bold bg-[#e3e2e0] text-[#121314]">
                  Active
                </span>
              </div>

              <div className="bg-[#f4f3f1] p-3 sharp border border-[#e5e2dc] flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#9e876b] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#121314]">Dynamic Drone Protocol</div>
                    <div className="text-[10px] text-[#54524f] mt-0.5 leading-relaxed">
                      If no response within 24h &rarr; Auto-send private drone walk-through preview via WhatsApp Concierge
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 sharp text-[9px] font-bold bg-[#f7dbbb] text-[#745f46]">
                  Trigger Armed
                </span>
              </div>
            </div>

            {/* Confidential Partner Notes */}
            <div className="pt-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-[#54524f] tracking-wider">
                Confidential Partner Notes &bull; {selectedLead.name}
              </label>
              <div className="text-xs bg-[#f4f3f1] p-3 sharp border border-[#e5e2dc] text-[#121314] italic">
                {selectedLead.notes || 'No confidential observations logged yet.'}
              </div>
              <textarea
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                rows={2}
                placeholder="Append confidential memo..."
                className="w-full bg-[#f4f3f1] p-3 text-[#121314] text-xs sharp focus:bg-white focus:outline-none border border-[#e5e2dc] focus:border-[#121314] transition-colors"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#54524f]">
                  Logged with partner cryptographic key
                </span>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-4 py-1.5 bg-[#121314] text-white hover:bg-[#2b2c2d] sharp text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
