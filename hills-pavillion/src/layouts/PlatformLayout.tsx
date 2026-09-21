import React, { useState } from 'react';
import { ROUTES, PLATFORM_NAV_LINKS, type RoutePath } from '../lib/constants';
import { useDemoState } from '../hooks/useDemoState';
import { Search, Bell, Plus, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export interface PlatformLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({
  children,
  currentPath,
  onNavigate,
}) => {
  const [demoState] = useDemoState();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const attentionLeadsCount = demoState.leads.filter((l) => l.slaStatus === 'ATTENTION_REQUIRED').length;

  return (
    <div className="min-h-screen flex bg-[#faf9f7] text-[#121314]">
      {/* Left Sidebar (Dark Carbon #121314) */}
      <aside
        className={`bg-[#121314] text-white flex flex-col justify-between transition-all duration-300 z-30 shrink-0 border-r border-white/10 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Atelier Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            {!collapsed && (
              <div
                onClick={() => onNavigate(ROUTES.PLATFORM_DASHBOARD)}
                className="cursor-pointer space-y-0.5"
              >
                <span className="font-serif text-lg tracking-wider text-white block uppercase">
                  Hills Pavillion
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#9e876b] block uppercase">
                  Internal Atelier Desk
                </span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 text-stone-400 hover:text-white rounded-none hover:bg-white/5 mx-auto"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-6 px-3 space-y-8">
            {/* Core Section */}
            <div className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-[0.25em] text-stone-500">
                  Core Management
                </div>
              )}
              {PLATFORM_NAV_LINKS.core.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs tracking-wider transition-colors cursor-pointer sharp ${
                      isActive
                        ? 'bg-white/10 text-white font-medium border-l-2 border-[#9e876b]'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-base text-[#9e876b]">
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest bg-[#ba1a1a]/20 text-[#ffdad6] border border-[#ba1a1a]/40 sharp">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Intelligence Section */}
            <div className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-[0.25em] text-stone-500">
                  Intelligence & Strategy
                </div>
              )}
              {PLATFORM_NAV_LINKS.intelligence.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs tracking-wider transition-colors cursor-pointer sharp ${
                      isActive
                        ? 'bg-white/10 text-white font-medium border-l-2 border-[#9e876b]'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-base text-[#9e876b]">
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wider bg-[#f7dbbb]/20 text-[#ddaa6f] border border-[#9e876b]/30 sharp">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Switcher & Status */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {!collapsed && (
            <div className="p-3 bg-white/5 border border-white/5 text-[10px] text-stone-400 space-y-1 sharp">
              <div className="flex items-center justify-between font-semibold text-[#9e876b] uppercase tracking-wider">
                <span>Demo Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <p>Deterministic local data mode active.</p>
            </div>
          )}

          <button
            onClick={() => onNavigate(ROUTES.HOME)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-[11px] uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 border border-white/15 transition-all sharp cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#9e876b]" />
            {!collapsed && <span>Public Atelier</span>}
          </button>
        </div>
      </aside>

      {/* Main Operational Window */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Control Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#faf9f7] border-b border-[#e5e2dc] px-6 sm:px-8 flex items-center justify-between gap-4">
          {/* Search bar */}
          <div className="flex-1 max-w-lg relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search estates, leads, parameters... (⌘K)"
                className="w-full bg-[#f4f3f1] border border-[#e5e2dc] pl-9 pr-4 py-2 text-xs text-[#121314] placeholder:text-stone-400 focus:outline-none focus:border-[#121314] sharp tracking-wide"
              />
            </div>
          </div>

          {/* Right Header Cluster */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest bg-[#efeeec] border border-[#d3cfca] text-[#54524f] sharp">
              Scope: All Portfolios
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationToast(!showNotificationToast)}
                className="p-2 text-[#121314] hover:bg-[#f4f3f1] border border-[#e5e2dc] sharp relative cursor-pointer"
                title="View SLA Alerts"
              >
                <Bell className="w-4 h-4 text-[#121314]" />
                {attentionLeadsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[9px] font-bold flex items-center justify-center">
                    {attentionLeadsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotificationToast && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#e5e2dc] p-4 shadow-xl z-50 sharp space-y-3">
                  <div className="flex items-center justify-between border-b border-[#e5e2dc] pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ba1a1a]">
                      Active SLA Alerts
                    </span>
                    <span className="text-[10px] text-stone-400">Real-time</span>
                  </div>
                  <div className="space-y-2 text-xs text-[#54524f]">
                    <p className="font-medium text-[#121314]">
                      {attentionLeadsCount} leads require attention past our 4-hour SLA standard.
                    </p>
                    <button
                      onClick={() => {
                        setShowNotificationToast(false);
                        onNavigate(ROUTES.PLATFORM_LEADS);
                      }}
                      className="text-[10px] font-semibold text-[#9e876b] uppercase tracking-wider hover:underline"
                    >
                      Review Leads Desk &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => onNavigate(ROUTES.PLATFORM_LEADS)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-widest bg-[#121314] text-white hover:bg-[#2c2d30] sharp cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record</span>
            </button>

            {/* User Profile */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#e5e2dc]">
              <div className="w-8 h-8 bg-[#121314] text-white font-serif text-sm flex items-center justify-center sharp font-medium">
                P
              </div>
              <div className="text-left text-[10px] leading-tight">
                <span className="font-bold uppercase tracking-wider block text-[#121314]">
                  Partner Desk
                </span>
                <span className="text-stone-500 uppercase tracking-widest">
                  Senior Partner
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#faf9f7]">
          {children}
        </main>
      </div>
    </div>
  );
};
