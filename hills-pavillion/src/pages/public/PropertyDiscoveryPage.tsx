import React, { useState } from 'react';
import { ROUTES, type RoutePath } from '../../lib/constants';
import { useDemoState } from '../../hooks/useDemoState';
import { ArchitecturalButton } from '../../components/common/ArchitecturalButton';
import { MetricCounter } from '../../components/common/MetricCounter';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface PropertyDiscoveryPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const PropertyDiscoveryPage: React.FC<PropertyDiscoveryPageProps> = ({ onNavigate }) => {
  const [demoState, demo] = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterTypology, setFilterTypology] = useState('ALL');
  const [viewMode, setViewMode] = useState<'GRID' | 'TABLE'>('GRID');

  const handleSelectUnit = (unitId: string) => {
    demo.selectUnit(unitId);
    onNavigate(ROUTES.ADVISORY);
  };

  // Filter units
  const filteredUnits = demoState.units.filter((unit) => {
    if (filterLevel !== 'ALL' && !unit.level.toUpperCase().includes(filterLevel.toUpperCase())) {
      return false;
    }
    if (filterStatus !== 'ALL' && unit.status !== filterStatus) {
      return false;
    }
    if (filterTypology !== 'ALL' && !unit.typology.toLowerCase().includes(filterTypology.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        unit.id.toLowerCase().includes(q) ||
        unit.typology.toLowerCase().includes(q) ||
        unit.level.toLowerCase().includes(q) ||
        unit.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const availableCount = demoState.units.filter((u) => u.status === 'AVAILABLE').length;
  const reservedCount = demoState.units.filter((u) => u.status === 'RESERVED').length;

  const unitImages: Record<string, string> = {
    'A-101': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
    'A-102': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
    'A-103': '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
    'A-104': '/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png',
    'A-105': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
    'A-106': '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
    'A-107': '/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png',
    'A-108': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
    'A-201': '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
    'A-202': '/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png',
    'A-204': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
    'A-301': '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
    'A-302': '/images/stitch/Editorial_luxury_modern_architectural_villa_exteri__7390662bc7bc40d4b30070bd022ae5d4.png',
    'A-304': '/images/stitch/Modern_architectural_luxury_commercial_flagship_pa__be4b3c0104bb4c6b8fc459ec37a92fc6.png',
    'A-401': '/images/stitch/Monumental_ultra-luxury_modern_architectural_resid__b25a779cbcfe4e80820e84f8a8a88072.png',
    'A-404': '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png',
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] text-[#121314]">
      {/* 1. Header Section */}
      <section className="border-b border-[#e5e2dc] bg-[#faf9f7] pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9e876b]">
              Atelier Asset Registry &bull; Verified Inventory
            </span>
            <div className="flex items-center gap-3 text-xs text-[#54524f] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {availableCount} Available
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                {reservedCount} 48H Hold
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#121314] leading-[1.08]">
                PROPERTY DISCOVERY & <br />
                <span className="italic font-normal text-[#9e876b]">SPECIMEN LEDGER.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#54524f] font-normal leading-relaxed">
                Query available spatial holdings, private alpine penthouses, and monolithic estates across verified developments.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#f4f3f1] p-1 border border-[#e5e2dc] sharp">
              <button
                onClick={() => setViewMode('GRID')}
                className={`p-2 sharp transition-colors cursor-pointer ${
                  viewMode === 'GRID' ? 'bg-[#121314] text-white' : 'text-[#54524f] hover:text-[#121314]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('TABLE')}
                className={`p-2 sharp transition-colors cursor-pointer ${
                  viewMode === 'TABLE' ? 'bg-[#121314] text-white' : 'text-[#54524f] hover:text-[#121314]'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Benchmark Metrics Strip */}
          <div className="pt-8 border-t border-[#e5e2dc] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <MetricCounter
              value={`${demoState.units.length}`}
              label="Cataloged Units"
              sublabel="Block A Ledger"
              theme="light"
              borderRight
            />
            <MetricCounter
              value="PKR 28M – 92M"
              label="Valuation Spectrum"
              sublabel="Freehold Title"
              theme="light"
              borderRight
            />
            <MetricCounter
              value="100%"
              label="Geothermal Energy"
              sublabel="All Archetypes"
              theme="light"
              borderRight
            />
            <MetricCounter
              value="48-Hour"
              label="Partner Hold Window"
              sublabel="Direct Allocation"
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* 2. Multi-Parameter Filter Controls */}
      <section className="border-b border-[#e5e2dc] bg-[#f4f3f1] sticky top-16 z-30 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#54524f]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search unit code or spec..."
                className="w-full bg-white text-xs pl-9 pr-3 py-2 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
              />
            </div>

            {/* Level Select */}
            <div>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full bg-white text-xs px-3 py-2 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
              >
                <option value="ALL">All Levels</option>
                <option value="Level 01">Level 01 (Promontory)</option>
                <option value="Level 02">Level 02 (Orchard)</option>
                <option value="Level 03">Level 03 (Hillside)</option>
                <option value="Level 04">Level 04 (Sky)</option>
              </select>
            </div>

            {/* Status Select */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-white text-xs px-3 py-2 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
              >
                <option value="ALL">All Statuses</option>
                <option value="AVAILABLE">Available</option>
                <option value="RESERVED">48H Reservation Hold</option>
                <option value="BOOKED">Booked</option>
                <option value="SOLD">Sold</option>
              </select>
            </div>

            {/* Typology Select */}
            <div>
              <select
                value={filterTypology}
                onChange={(e) => setFilterTypology(e.target.value)}
                className="w-full bg-white text-xs px-3 py-2 sharp border border-[#e5e2dc] focus:outline-none focus:border-[#9e876b]"
              >
                <option value="ALL">All Typologies</option>
                <option value="Sanctum">Sanctum Villa</option>
                <option value="Solarium">Solarium Duplex</option>
                <option value="Courtyard">Courtyard Residence</option>
                <option value="Monolith">Monolith Penthouse</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilterLevel('ALL');
                  setFilterStatus('ALL');
                  setFilterTypology('ALL');
                }}
                className="w-full h-full min-h-[34px] bg-white text-[#54524f] hover:text-[#121314] text-[11px] font-semibold uppercase tracking-wider sharp border border-[#e5e2dc] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#faf9f7]"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Units Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {filteredUnits.length === 0 ? (
          <div className="bg-white border border-[#e5e2dc] sharp p-16 text-center space-y-4">
            <Compass className="w-8 h-8 text-[#9e876b] mx-auto" />
            <h3 className="font-serif text-2xl text-[#121314]">No Specimens Match Active Filters</h3>
            <p className="text-xs text-[#54524f] max-w-md mx-auto">
              Please adjust your search criteria or reset filters to explore available holdings across other levels.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterLevel('ALL');
                setFilterStatus('ALL');
                setFilterTypology('ALL');
              }}
              className="px-4 py-2 bg-[#121314] text-white text-xs font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'GRID' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUnits.map((unit) => {
              const imageSrc =
                unitImages[unit.id] ||
                '/images/stitch/Cinematic_architectural_photography_of_a_monumenta__9045852a1a984d93943bc71d94a9625b.png';

              return (
                <div
                  key={unit.id}
                  className="bg-white border border-[#e5e2dc] sharp space-y-5 p-6 flex flex-col justify-between hover:border-[#9e876b] transition-all group shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Render Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#121314] sharp">
                      <img
                        src={imageSrc}
                        alt={`Unit ${unit.id}`}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-[#121314]/85 backdrop-blur-sm px-2.5 py-1 sharp text-white text-[10px] font-mono uppercase tracking-wider border border-white/10">
                        {unit.id}
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 sharp text-[9px] font-semibold tracking-wider uppercase backdrop-blur-md ${
                            unit.status === 'AVAILABLE'
                              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                              : unit.status === 'RESERVED'
                              ? 'bg-amber-950/90 text-amber-300 border border-amber-500/30'
                              : 'bg-stone-900/90 text-stone-300 border border-stone-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              unit.status === 'AVAILABLE'
                                ? 'bg-emerald-400'
                                : unit.status === 'RESERVED'
                                ? 'bg-amber-400'
                                : 'bg-stone-400'
                            }`}
                          />
                          {unit.status === 'RESERVED' ? '48H Hold' : unit.status}
                        </span>
                      </div>
                    </div>

                    {/* Specimen Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9e876b]">
                          {unit.block} &bull; {unit.level}
                        </span>
                        <span className="text-[#54524f] font-mono text-[11px]">
                          {unit.sqft.toLocaleString()} sq.ft
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-[#121314] uppercase tracking-tight">
                        {unit.typology}
                      </h3>

                      <p className="text-xs text-[#54524f] font-normal leading-relaxed">
                        {unit.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#e5e2dc] text-xs">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#54524f] block">Dimensions</span>
                        <span className="font-medium text-[#121314]">{unit.sqm} m² Net Interior</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#54524f] block">Geothermal</span>
                        <span className="font-medium text-[#121314]">Closed-Loop 100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#e5e2dc]">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#54524f] block">
                        Valuation
                      </span>
                      <span className="font-sans text-base font-semibold text-[#121314]">
                        {unit.pricePKR}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono block">
                        {unit.priceUSD}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelectUnit(unit.id)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest sharp transition-colors cursor-pointer flex items-center gap-1.5 ${
                        unit.status === 'AVAILABLE'
                          ? 'bg-[#121314] text-white hover:bg-[#9e876b]'
                          : 'bg-[#f4f3f1] text-[#54524f] hover:bg-[#e5e2dc] border border-[#e5e2dc]'
                      }`}
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table Ledger View */
          <div className="bg-white border border-[#e5e2dc] sharp overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e5e2dc] bg-[#f4f3f1] text-[#54524f] font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Unit ID</th>
                  <th className="py-3 px-4">Typology</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Living Area</th>
                  <th className="py-3 px-4">Valuation (PKR)</th>
                  <th className="py-3 px-4">Valuation (USD)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e2dc]/60">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-[#f4f3f1]/60 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-[#121314]">{unit.id}</td>
                    <td className="py-4 px-4 text-sm font-medium text-[#121314]">
                      {unit.typology}
                    </td>
                    <td className="py-4 px-4 text-[#54524f]">{unit.level}</td>
                    <td className="py-4 px-4 font-mono text-[#54524f]">
                      {unit.sqft.toLocaleString()} sq.ft ({unit.sqm} m²)
                    </td>
                    <td className="py-4 px-4 font-mono text-[#9e876b] font-semibold">
                      {unit.pricePKR}
                    </td>
                    <td className="py-4 px-4 font-mono text-[#54524f]">{unit.priceUSD}</td>
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
                        {unit.status === 'RESERVED' ? '48H Hold' : unit.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleSelectUnit(unit.id)}
                        className="px-3 py-1 bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-widest sharp hover:bg-[#9e876b] transition-colors cursor-pointer"
                      >
                        Inquire &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom Concierge Banner */}
        <div className="mt-16 bg-[#121314] text-white sharp p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#ddc2a3]">
              Private Client Acquisition
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white uppercase tracking-tight">
              Looking for a custom floorplan or unlisted plot?
            </h3>
            <p className="text-xs text-stone-300 font-normal leading-relaxed">
              Our acquisitions desk manages confidential partner allocations, full-floor combinations, and private architectural commissions.
            </p>
          </div>

          <ArchitecturalButton
            variant="primary"
            size="md"
            className="bg-[#ddc2a3] text-[#121314] hover:bg-white"
            onClick={() => onNavigate(ROUTES.ADVISORY)}
            arrow
          >
            Schedule Private Advisory
          </ArchitecturalButton>
        </div>
      </div>
    </div>
  );
};
