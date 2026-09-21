import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { useDemoState } from '../../hooks/useDemoState';
import type { DemoUnit } from '../../data/demoStore';
import {
  Sparkles,
  Download,
  Plus,
  Lock,
  FileText,
  Compass,
  Layers,
  MapPin,
  CheckCircle2,
  Clock,
  Shield,
  Search,
  ExternalLink,
  ChevronRight,
  X,
  Bookmark,
  Share2,
} from 'lucide-react';

interface InventoryPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();
  const [viewMode, setViewMode] = useState<'MATRIX' | 'TABLE' | 'MASTERPLAN'>('MATRIX');
  const [selectedTypology, setSelectedTypology] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  
  // Allocate Unit Modal
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [newUnitId, setNewUnitId] = useState('A-109');
  const [newUnitLevel, setNewUnitLevel] = useState('Level 01');
  const [newUnitTypology, setNewUnitTypology] = useState('10 Marla Sanctum Villa');
  const [newUnitPrice, setNewUnitPrice] = useState('PKR 32.5M');
  const [newUnitSqm, setNewUnitSqm] = useState(480);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Selected unit from demoState or fallback
  const selectedUnit: DemoUnit =
    demoState.units.find((u) => u.id === demoState.selectedUnitId) ||
    demoState.units.find((u) => u.id === 'A-102') ||
    demoState.units[0];

  const handleReserve = (unitId: string) => {
    demo.reserveUnit(unitId);
    showToast(`Unit ${unitId} placed on 48-Hour Partner Hold.`);
  };

  const handleCreateUnit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate allocation
    setIsAllocateModalOpen(false);
    showToast(`Unit ${newUnitId} allocated to Block A inventory ledger.`);
  };

  const filteredUnits = demoState.units.filter((u) => {
    const matchesSearch =
      u.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      u.typology.toLowerCase().includes(searchFilter.toLowerCase()) ||
      u.level.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesTypology =
      selectedTypology === 'ALL' || u.typology.toLowerCase().includes(selectedTypology.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'ALL' || u.status === selectedStatusFilter;

    return matchesSearch && matchesTypology && matchesStatus;
  });

  const levelGroups = [
    {
      level: 'Level 04',
      title: 'LEVEL 04 – Sky Penthouse & Panoramic Solarium Terraces',
      unitIds: ['A-401', 'A-402', 'A-403', 'A-404'],
    },
    {
      level: 'Level 03',
      title: 'LEVEL 03 – Horizon Cantilevered Duplexes',
      unitIds: ['A-301', 'A-302', 'A-303', 'A-304', 'A-305', 'A-306'],
    },
    {
      level: 'Level 02',
      title: 'LEVEL 02 – Cascading Terrace Residences',
      unitIds: ['A-201', 'A-202', 'A-203', 'A-204', 'A-205', 'A-206'],
    },
    {
      level: 'Level 01',
      title: 'LEVEL 01 – Waterfront Ground Sanctuary Private Pavilion Gardens',
      unitIds: ['A-101', 'A-102', 'A-103', 'A-104', 'A-105', 'A-106', 'A-107', 'A-108'],
    },
  ];

  const availableCount = demoState.units.filter((u) => u.status === 'AVAILABLE').length;
  const reservedCount = demoState.units.filter((u) => u.status === 'RESERVED').length;
  const bookedCount = demoState.units.filter((u) => u.status === 'BOOKED').length;
  const soldCount = demoState.units.filter((u) => u.status === 'SOLD').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-[#121314]">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121314] text-white px-5 py-3 sharp shadow-2xl border border-white/20 flex items-center gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-[#ddc2a3]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Allocate Unit Modal */}
      {isAllocateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white max-w-md w-full sharp border border-[#e5e2dc] shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9e876b]" />
                <h3 className="font-serif text-lg font-normal uppercase tracking-wider text-[#121314]">
                  Allocate New Unit
                </h3>
              </div>
              <button
                onClick={() => setIsAllocateModalOpen(false)}
                className="text-[#54524f] hover:text-[#121314] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUnit} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                  Unit Identifier
                </label>
                <input
                  type="text"
                  required
                  value={newUnitId}
                  onChange={(e) => setNewUnitId(e.target.value)}
                  className="w-full bg-[#f4f3f1] p-2 border border-[#e5e2dc] sharp text-[#121314] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                    Floor Level
                  </label>
                  <select
                    value={newUnitLevel}
                    onChange={(e) => setNewUnitLevel(e.target.value)}
                    className="w-full bg-[#f4f3f1] p-2 border border-[#e5e2dc] sharp text-[#121314] focus:outline-none"
                  >
                    <option value="Level 01">Level 01 (Ground)</option>
                    <option value="Level 02">Level 02</option>
                    <option value="Level 03">Level 03</option>
                    <option value="Level 04">Level 04 (Penthouse)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                    Gross Area (m²)
                  </label>
                  <input
                    type="number"
                    value={newUnitSqm}
                    onChange={(e) => setNewUnitSqm(Number(e.target.value))}
                    className="w-full bg-[#f4f3f1] p-2 border border-[#e5e2dc] sharp text-[#121314] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                  Architectural Typology
                </label>
                <input
                  type="text"
                  value={newUnitTypology}
                  onChange={(e) => setNewUnitTypology(e.target.value)}
                  className="w-full bg-[#f4f3f1] p-2 border border-[#e5e2dc] sharp text-[#121314] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#54524f] mb-1">
                  Benchmark Valuation
                </label>
                <input
                  type="text"
                  value={newUnitPrice}
                  onChange={(e) => setNewUnitPrice(e.target.value)}
                  className="w-full bg-[#f4f3f1] p-2 border border-[#e5e2dc] sharp text-[#121314] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e5e2dc]">
                <button
                  type="button"
                  onClick={() => setIsAllocateModalOpen(false)}
                  className="px-3 py-1.5 border border-[#e5e2dc] text-[#54524f] sharp uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#121314] text-white sharp uppercase tracking-wider font-semibold"
                >
                  Commit Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. Top Header Zone */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e2dc] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e876b]">
              Atelier Asset Registry
            </span>
            <span className="text-[#c5c6c9] text-[10px]">&bull;</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#54524f]">
              Real-Time Allocation Engine
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#121314] font-normal tracking-tight leading-none">
            INVENTORY &amp; SPATIAL MATRIX
          </h1>
          <p className="text-xs text-[#54524f] max-w-2xl pt-1 font-normal leading-relaxed">
            Manage property availability, reservations, bookings, and sales across active monument portfolios with cryptographically-anchored ledger status.
          </p>
        </div>

        {/* Action Cluster */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f4f3f1] border border-[#e5e2dc] sharp text-[10px] font-bold uppercase tracking-wider text-[#54524f]">
            <Shield className="w-3.5 h-3.5 text-[#9e876b]" />
            <span>ROLE: SENIOR PARTNER (HQ) &bull; WRITE PERMITS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Exporting Spatial Allocation Manifest (CSV)...')}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#f4f3f1] hover:bg-[#e9e8e6] transition-colors sharp text-[#121314] text-[11px] font-semibold uppercase tracking-wider cursor-pointer border border-[#e5e2dc]"
            >
              <Download className="w-3.5 h-3.5 text-[#9e876b]" />
              <span>Export Manifest</span>
            </button>
            <button
              onClick={() => setIsAllocateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#121314] text-white hover:bg-[#2b2c2d] transition-all sharp text-[11px] font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#ddc2a3]" />
              <span>Allocate New Unit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary 4 Allocation KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: AVAILABLE ALLOCATION */}
        <div className="bg-white p-5 sharp border border-[#e5e2dc] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Available Allocation
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 sharp flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Ready
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-sans text-3xl sm:text-4xl text-[#121314] font-semibold">
              {availableCount + 119}
            </span>
            <span className="text-xs text-[#54524f]">Units</span>
          </div>
          <div className="text-xs font-semibold text-[#121314]">
            Asset Value: PKR 7,840 Million
          </div>
          <div className="text-[10px] text-[#54524f] pt-1 border-t border-[#f4f3f1]">
            Unencumbered: 24.5% Total Inventory
          </div>
        </div>

        {/* Card 2: ACTIVE HOLDS */}
        <div className="bg-white p-5 sharp border border-[#e5e2dc] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Active Holds
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 sharp flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-700" />
              48H Window
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-sans text-3xl sm:text-4xl text-[#121314] font-semibold">
              {reservedCount + 16}
            </span>
            <span className="text-xs text-[#54524f]">Units</span>
          </div>
          <div className="text-xs font-semibold text-[#121314]">
            Pipeline: PKR 952 Million
          </div>
          <div className="text-[10px] text-[#54524f] pt-1 border-t border-[#f4f3f1]">
            Expiring &lt; 12h: 4 Allocations
          </div>
        </div>

        {/* Card 3: ESCROW IN-FLIGHT */}
        <div className="bg-white p-5 sharp border border-[#e5e2dc] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Escrow In-Flight
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 sharp flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-700" />
              Pending Deed
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-sans text-3xl sm:text-4xl text-[#121314] font-semibold">
              {bookedCount + 36}
            </span>
            <span className="text-xs text-[#54524f]">Units</span>
          </div>
          <div className="text-xs font-semibold text-[#121314]">
            Under Contract: PKR 2,640 Million
          </div>
          <div className="text-[10px] text-[#54524f] pt-1 border-t border-[#f4f3f1]">
            Avg. Closing Speed: 9.2 Days
          </div>
        </div>

        {/* Card 4: DEEDED & HANDED */}
        <div className="bg-white p-5 sharp border border-[#e5e2dc] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#54524f]">
              Deeded &amp; Handed
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#121314] px-2 py-0.5 sharp flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#ddc2a3]" />
              Secured
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-sans text-3xl sm:text-4xl text-[#121314] font-semibold">
              {soldCount + 308}
            </span>
            <span className="text-xs text-[#54524f]">Units</span>
          </div>
          <div className="text-xs font-semibold text-[#121314]">
            Realized Value: PKR 15.92 Billion
          </div>
          <div className="text-[10px] text-[#54524f] pt-1 border-t border-[#f4f3f1]">
            Target Realization: 104.2%
          </div>
        </div>
      </div>

      {/* 3. Filter Matrix Bar */}
      <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 text-xs">
          {/* Project Filter */}
          <select className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]">
            <option>The Lacustrine Pavilions</option>
            <option>Belvedere Enclave</option>
            <option>Villa Verona</option>
            <option>Aurelia Forum</option>
          </select>

          {/* Phase Filter */}
          <select className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]">
            <option>Phase 01 (North Promontory)</option>
            <option>Phase 02 (Alpine Bluff)</option>
            <option>Phase 03 (Estuary Peninsula)</option>
          </select>

          {/* Block Filter */}
          <select className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]">
            <option>Block A (Alpine Ridge)</option>
            <option>Block B (Lakeside Promenade)</option>
            <option>Block C (Forest Pine Preserve)</option>
          </select>

          {/* Typology Filter */}
          <select
            value={selectedTypology}
            onChange={(e) => setSelectedTypology(e.target.value)}
            className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]"
          >
            <option value="ALL">All (Villas, Duplexes, Penthouses)</option>
            <option value="Sanctum Villa">10 Marla Sanctum Villa</option>
            <option value="Horizon Duplex">Horizon Duplex</option>
            <option value="Penthouse">Crown Penthouse</option>
            <option value="Belvedere">Belvedere Residence</option>
          </select>

          {/* Footprint Filter */}
          <select className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]">
            <option>10 Marla - 20 Marla (450 - 900 m²)</option>
            <option>&lt; 450 m²</option>
            <option>&gt; 600 m²</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full bg-[#f4f3f1] px-3 py-2 text-[#121314] sharp focus:outline-none cursor-pointer border border-[#e5e2dc]"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available Only</option>
            <option value="RESERVED">Reserved (Hold)</option>
            <option value="BOOKED">Booked</option>
            <option value="SOLD">Deeded / Sold</option>
          </select>
        </div>

        {/* View Switcher and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#f4f3f1]">
          <div className="flex items-center bg-[#f4f3f1] p-1 sharp self-start border border-[#e5e2dc]">
            <button
              onClick={() => setViewMode('MATRIX')}
              className={`px-3 py-1.5 sharp text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'MATRIX'
                  ? 'bg-[#121314] text-white shadow-sm'
                  : 'text-[#54524f] hover:text-[#121314]'
              }`}
            >
              Visual Matrix
            </button>
            <button
              onClick={() => setViewMode('TABLE')}
              className={`px-3 py-1.5 sharp text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'TABLE'
                  ? 'bg-[#121314] text-white shadow-sm'
                  : 'text-[#54524f] hover:text-[#121314]'
              }`}
            >
              Table Directory
            </button>
            <button
              onClick={() => setViewMode('MASTERPLAN')}
              className={`px-3 py-1.5 sharp text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'MASTERPLAN'
                  ? 'bg-[#121314] text-white shadow-sm'
                  : 'text-[#54524f] hover:text-[#121314]'
              }`}
            >
              Masterplan Map
            </button>
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#54524f] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search unit by code or spec..."
              className="w-full bg-[#f4f3f1] pl-8 pr-3 py-1.5 text-xs text-[#121314] sharp border border-[#e5e2dc] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Dual Workspace: Left Visual Matrix / Table / Masterplan (xl:col-span-8) & Right Unit Drawer (xl:col-span-4) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: VISUAL ALLOCATION MATRIX (xl:col-span-8) */}
        <div className="xl:col-span-8 space-y-6">
          {viewMode === 'MATRIX' && (
            <div className="bg-white sharp border border-[#e5e2dc] shadow-sm p-6 space-y-6">
              {/* Block A Ledger Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2dc] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl text-[#121314] font-normal">
                      Block A – Alpine Promontory Ledger
                    </h2>
                    <span className="text-[10px] font-bold bg-[#e3e2e0] px-2 py-0.5 sharp text-[#54524f]">
                      24 UNITS
                    </span>
                  </div>
                  <p className="text-xs text-[#54524f] mt-0.5">
                    High-altitude southern-exposed direct lakefront facing overlooking Lake Lucerne estuary basin.
                  </p>
                </div>

                {/* Legend Chips */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#121314]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Available ({availableCount})
                  </span>
                  <span className="flex items-center gap-1.5 text-[#121314]">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Reserved ({reservedCount})
                  </span>
                  <span className="flex items-center gap-1.5 text-[#121314]">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Booked ({bookedCount})
                  </span>
                  <span className="flex items-center gap-1.5 text-[#121314]">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Sold ({soldCount})
                  </span>
                </div>
              </div>

              {/* Levels Container */}
              <div className="space-y-6">
                {levelGroups.map((group) => {
                  const groupUnits = demoState.units.filter((u) => group.unitIds.includes(u.id));

                  return (
                    <div key={group.level} className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#54524f] border-b border-[#f4f3f1] pb-1">
                        <span>{group.title}</span>
                        <span className="text-[10px] text-[#9e876b] font-bold">
                          {groupUnits.length} UNITS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                        {groupUnits.map((unit) => {
                          const isSelected = unit.id === selectedUnit.id;

                          return (
                            <div
                              key={unit.id}
                              onClick={() => demo.selectUnit(unit.id)}
                              className={`p-3 sharp border transition-all cursor-pointer relative flex flex-col justify-between min-h-[90px] ${
                                isSelected
                                  ? 'bg-[#f7dbbb]/20 border-[#121314] shadow-md ring-2 ring-[#121314]'
                                  : unit.status === 'AVAILABLE'
                                  ? 'bg-white border-[#e5e2dc] hover:border-[#9e876b]'
                                  : unit.status === 'RESERVED'
                                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400'
                                  : unit.status === 'BOOKED'
                                  ? 'bg-blue-50/40 border-blue-200 opacity-90'
                                  : 'bg-slate-50 border-slate-200 opacity-70'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#121314] text-[#ddc2a3] text-[8px] font-bold uppercase px-1.5 py-0.2 sharp tracking-wider shadow">
                                  Active Target
                                </div>
                              )}

                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono font-bold text-xs text-[#121314]">
                                  {unit.id}
                                </span>
                                <span
                                  className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 sharp ${
                                    unit.status === 'AVAILABLE'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : unit.status === 'RESERVED'
                                      ? 'bg-amber-100 text-amber-800'
                                      : unit.status === 'BOOKED'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-slate-200 text-slate-700'
                                  }`}
                                >
                                  {unit.status}
                                </span>
                              </div>

                              <div className="mt-1">
                                <div className="text-[10px] text-[#54524f] truncate">
                                  {unit.sqm} m² &bull; {unit.typology.split(' ')[0]}
                                </div>
                                <div className="text-xs font-semibold text-[#121314] mt-0.5">
                                  {unit.pricePKR}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'TABLE' && (
            <div className="bg-white sharp border border-[#e5e2dc] shadow-sm overflow-hidden">
              <div className="p-4 bg-[#f4f3f1] border-b border-[#e5e2dc] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#121314]">
                  Unit Directory Ledger &bull; {filteredUnits.length} Total Registered
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#f4f3f1] text-[#54524f] font-semibold text-[10px] uppercase tracking-wider border-b border-[#e5e2dc]">
                      <th className="py-3 px-4">Unit ID</th>
                      <th className="py-3 px-3">Level</th>
                      <th className="py-3 px-3">Typology</th>
                      <th className="py-3 px-3">Area (m²)</th>
                      <th className="py-3 px-3">Valuation (PKR)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e2dc]">
                    {filteredUnits.map((u) => (
                      <tr
                        key={u.id}
                        onClick={() => demo.selectUnit(u.id)}
                        className={`transition-colors cursor-pointer ${
                          u.id === selectedUnit.id ? 'bg-[#f7dbbb]/25 font-semibold' : 'hover:bg-[#f4f3f1]'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-[#121314]">{u.id}</td>
                        <td className="py-3 px-3 text-[#54524f]">{u.level}</td>
                        <td className="py-3 px-3 text-[#121314]">{u.typology}</td>
                        <td className="py-3 px-3 text-[#54524f]">{u.sqm} m²</td>
                        <td className="py-3 px-3 text-[#121314] font-medium">{u.pricePKR}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 sharp text-[9px] font-bold uppercase tracking-wider ${
                              u.status === 'AVAILABLE'
                                ? 'bg-emerald-100 text-emerald-800'
                                : u.status === 'RESERVED'
                                ? 'bg-amber-100 text-amber-800'
                                : u.status === 'BOOKED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              demo.selectUnit(u.id);
                            }}
                            className="text-[#9e876b] hover:text-[#121314] font-semibold text-[10px] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'MASTERPLAN' && (
            <div className="bg-white sharp border border-[#e5e2dc] shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-3">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#121314]">
                    Architectural Masterplan &bull; Axonometric Site Topography
                  </h3>
                  <p className="text-xs text-[#54524f] mt-0.5">
                    Click any spatial coordinate hotspot to focus inventory unit specs.
                  </p>
                </div>
                <Compass className="w-5 h-5 text-[#9e876b]" />
              </div>

              <div className="relative sharp overflow-hidden border border-[#e5e2dc] bg-[#121314]">
                <img
                  src="/images/stitch/Architectural_site_masterplan_axonometric_render_b__66d25f7075ce478eae67fa61ae2db7eb.png"
                  alt="Architectural Masterplan"
                  className="w-full h-auto object-cover opacity-90"
                />
                {/* Hotspot Markers */}
                <button
                  onClick={() => demo.selectUnit('A-102')}
                  className="absolute top-[48%] left-[45%] bg-[#121314] text-white p-2 sharp border border-emerald-400 shadow-xl flex items-center gap-1.5 text-[10px] font-bold hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Target Unit A-102 (Lakefront)</span>
                </button>

                <button
                  onClick={() => demo.selectUnit('A-404')}
                  className="absolute top-[28%] left-[62%] bg-[#121314] text-white p-2 sharp border border-white/40 shadow-xl flex items-center gap-1.5 text-[10px] font-bold hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Penthouse A-404</span>
                </button>
              </div>
            </div>
          )}

          {/* Adjacent Enclave Switcher Strip */}
          <div className="bg-white p-4 sharp border border-[#e5e2dc] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#9e876b]" />
              <div>
                <span className="font-semibold uppercase tracking-wider text-[#121314] block">
                  Block B &bull; Lakeside Promenade
                </span>
                <span className="text-[10px] text-[#54524f]">
                  60 Units Registered &bull; 52% Sold Out
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#54524f]" />
              <div>
                <span className="font-semibold uppercase tracking-wider text-[#121314] block">
                  Block C &bull; Forest Pine Preserve
                </span>
                <span className="text-[10px] text-[#54524f]">
                  72 Units &bull; Coming Soon (Phase 02)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE UNIT DRAWER & ALLOCATION DOSSIER (xl:col-span-4) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-white p-6 sharp border border-[#e5e2dc] shadow-sm space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl text-[#121314] font-normal">
                    Unit {selectedUnit.id}
                  </h2>
                  <span
                    className={`px-2 py-0.5 sharp text-[9px] font-bold uppercase tracking-wider ${
                      selectedUnit.status === 'AVAILABLE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedUnit.status === 'RESERVED'
                        ? 'bg-amber-100 text-amber-800'
                        : selectedUnit.status === 'BOOKED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selectedUnit.status}
                  </span>
                </div>
                <p className="text-xs text-[#54524f] mt-0.5">
                  The Lacustrine Pavilions &bull; Block A (North Promontory)
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#54524f]">
                <button
                  onClick={() => showToast(`Unit ${selectedUnit.id} bookmarked for partner client review.`)}
                  className="p-1 hover:text-[#121314] transition-colors"
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast(`Direct sharing link copied for Unit ${selectedUnit.id}.`)}
                  className="p-1 hover:text-[#121314] transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Partner Tier Notice */}
            <div className="bg-[#f4f3f1] p-2.5 sharp border border-[#e5e2dc] text-[10px] text-[#54524f] leading-relaxed flex items-start gap-2">
              <Shield className="w-3.5 h-3.5 text-[#9e876b] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Exclusive Partner Tier:</strong> Priority access window open. Allocation restricted after 48-hr private walk-through.
              </span>
            </div>

            {/* Unit Rendering Photo */}
            <div className="relative h-36 sharp overflow-hidden border border-[#e5e2dc]">
              <img
                src="/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png"
                alt={selectedUnit.id}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-3">
                <div className="text-white text-[10px] font-semibold uppercase tracking-wider">
                  SPECS: 4BR, 5BA + {selectedUnit.sqm}M² PRIVATE SOUTH-FACING SUNPARK
                </div>
              </div>
            </div>

            {/* Essential Registry Metrics (2-column table) */}
            <div className="space-y-2 border-t border-b border-[#e5e2dc] py-4 text-xs">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#54524f]">
                Essential Registry Metrics
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#54524f] uppercase block">Typology</span>
                  <span className="font-semibold text-[#121314]">{selectedUnit.typology}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#54524f] uppercase block">Gross Living Space</span>
                  <span className="font-semibold text-[#121314]">
                    {selectedUnit.sqft.toLocaleString()} sq ft / {selectedUnit.sqm} m²
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#54524f] uppercase block">Elevation / Level</span>
                  <span className="font-semibold text-[#121314]">{selectedUnit.level} (Lake Level)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#54524f] uppercase block">Target Delivery</span>
                  <span className="font-semibold text-[#121314]">Q4 2025 (On Schedule)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#54524f] uppercase block">Benchmark Valuation</span>
                  <span className="font-bold text-[#121314]">{selectedUnit.pricePKR}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#54524f] uppercase block">Rate / SQ FT</span>
                  <span className="font-semibold text-[#121314]">PKR 14,222 / sq ft</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#f4f3f1]">
                  <span className="text-[10px] text-[#54524f] uppercase block">Assigned Advisory Partner</span>
                  <span className="font-semibold text-[#121314]">Ali &bull; Private Client Concierge</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button: RESERVE UNIT (48H PARTNER HOLD) */}
            <div className="space-y-2">
              {selectedUnit.status === 'AVAILABLE' && (
                <button
                  onClick={() => handleReserve(selectedUnit.id)}
                  className="w-full py-3 px-4 bg-[#121314] text-white hover:bg-[#2b2c2d] sharp text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#ddc2a3]" />
                  <span>+ Reserve Unit (48H Partner Hold)</span>
                </button>
              )}

              {selectedUnit.status === 'RESERVED' && (
                <div className="w-full py-3 px-4 bg-amber-600 text-white sharp text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>48H Partner Hold Active</span>
                </div>
              )}

              {(selectedUnit.status === 'BOOKED' || selectedUnit.status === 'SOLD') && (
                <div className="w-full py-3 px-4 bg-[#54524f] text-white sharp text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ddc2a3]" />
                  <span>Allocation Secured ({selectedUnit.status})</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => showToast(`Assigning private partner desk for Unit ${selectedUnit.id}`)}
                  className="py-2 px-3 bg-[#f4f3f1] hover:bg-[#e9e8e6] text-[#121314] sharp font-semibold uppercase tracking-wider border border-[#e5e2dc] text-center cursor-pointer"
                >
                  Assign Desk
                </button>
                <button
                  onClick={() => showToast(`Direct Escrow contract generated for Unit ${selectedUnit.id}`)}
                  className="py-2 px-3 bg-[#f4f3f1] hover:bg-[#e9e8e6] text-[#121314] sharp font-semibold uppercase tracking-wider border border-[#e5e2dc] text-center cursor-pointer"
                >
                  Direct Escrow
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] text-[#9e876b] font-semibold uppercase tracking-wider">
                <button
                  onClick={() => showToast(`Downloading Architectural Blueprint for Unit ${selectedUnit.id}...`)}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>Floorplan Blueprint</span>
                </button>
                <button
                  onClick={() => showToast(`Generating Client Dossier PDF for Unit ${selectedUnit.id}...`)}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Client Dossier PDF</span>
                </button>
              </div>
            </div>

            {/* Milestone Payment Structure */}
            <div className="bg-[#f4f3f1] p-4 sharp border border-[#e5e2dc] space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#121314]">
                <span>Milestone Payment Structure</span>
                <span className="text-[#9e876b]">STANDARD ESCROW</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#54524f]">10% Reservation &amp; Booking</span>
                  <span className="font-semibold text-[#121314]">PKR 3.80M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#54524f]">15% Contract Execution</span>
                  <span className="font-semibold text-[#121314]">PKR 5.70M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#54524f]">40% Core Level Waterproof &amp; Trenches</span>
                  <span className="font-semibold text-[#121314]">PKR 15.20M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#54524f]">15% Thermal Facade Enclosure</span>
                  <span className="font-semibold text-[#121314]">PKR 5.70M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#54524f]">20% Handover &amp; Key Audit</span>
                  <span className="font-semibold text-[#121314]">PKR 7.60M</span>
                </div>
              </div>
            </div>

            {/* Linked Client Inquiries */}
            <div className="border-t border-[#e5e2dc] pt-4 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#54524f]">
                <span>Linked Client Inquiries</span>
                <span className="text-[#9e876b]">HIGH INTENT</span>
              </div>

              <div className="p-3 bg-[#f7dbbb]/20 border border-[#9e876b]/30 sharp flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-[#121314]">Tariq Al-Mansoor (91/100)</div>
                  <div className="text-[10px] text-[#54524f]">
                    Lead identified for {selectedUnit.id} via Geneva Private Desk
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(ROUTES.PLATFORM_LEADS)}
                  className="px-2.5 py-1 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-wider sharp hover:bg-[#2b2c2d] cursor-pointer"
                >
                  Connect &rarr;
                </button>
              </div>
            </div>

            {/* Verified Audit & Entitlement Log */}
            <div className="border-t border-[#e5e2dc] pt-4 space-y-2 text-[10px] text-[#54524f]">
              <div className="font-bold uppercase tracking-wider text-[#121314] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#9e876b]" />
                <span>Verified Audit &amp; Entitlement Log</span>
              </div>
              <ul className="space-y-1 list-disc list-inside leading-relaxed text-[#54524f]">
                <li>All Specs &amp; Elevational Data verified from Swiss architectural BIM model.</li>
                <li>Reservation 48-hr expires dynamically if Escrow not filed within 2 days.</li>
                <li>System Escrow Vault certified by Third-Party Settlement Custodian.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
