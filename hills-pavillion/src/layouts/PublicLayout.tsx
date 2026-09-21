import React, { useState } from 'react';
import { PUBLIC_NAV_LINKS, ROUTES, type RoutePath } from '../lib/constants';
import { ArchitecturalButton } from '../components/common/ArchitecturalButton';
import { Menu, X } from 'lucide-react';

export interface PublicLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  currentPath,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7] text-[#121314] selection:bg-[#121314] selection:text-white">
      {/* Top Architectural Header */}
      <header className="sticky top-0 z-40 bg-[#faf9f7]/90 backdrop-blur-md border-b border-[#e5e2dc] transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          {/* Brand Wordmark */}
          <div
            onClick={() => onNavigate(ROUTES.HOME)}
            className="cursor-pointer group flex flex-col"
          >
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-[#121314] group-hover:text-[#9e876b] transition-colors">
              HILLS PAVILLION
            </span>
            <span className="text-[9px] font-semibold tracking-[0.25em] text-[#9e876b] uppercase">
              Atelier / Architecture
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {PUBLIC_NAV_LINKS.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer relative py-1 ${
                    isActive ? 'text-[#121314]' : 'text-[#54524f] hover:text-[#121314]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#121314]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Platform Portal Switcher */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Quick switcher to Internal Platform */}
            <button
              onClick={() => onNavigate(ROUTES.PLATFORM_DASHBOARD)}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9e876b] hover:text-[#121314] px-3 py-1.5 border border-[#9e876b]/30 hover:border-[#121314] transition-all cursor-pointer sharp"
              title="Switch to Internal Business Platform"
            >
              Atelier Portal &rarr;
            </button>

            <ArchitecturalButton
              variant="primary"
              size="sm"
              onClick={() => onNavigate(ROUTES.ADVISORY)}
            >
              Book a Visit
            </ArchitecturalButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#121314]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#faf9f7] border-b border-[#e5e2dc] px-6 py-6 space-y-4">
            {PUBLIC_NAV_LINKS.map((link) => (
              <div
                key={link.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(link.path);
                }}
                className="block text-xs uppercase tracking-widest text-[#54524f] hover:text-[#121314] py-2 border-b border-[#e5e2dc]/50 cursor-pointer"
              >
                {link.label}
              </div>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(ROUTES.PLATFORM_DASHBOARD);
                }}
                className="w-full text-center py-2.5 text-xs uppercase tracking-widest text-[#9e876b] border border-[#9e876b] sharp font-semibold"
              >
                Atelier Business Portal &rarr;
              </button>
              <ArchitecturalButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(ROUTES.ADVISORY);
                }}
              >
                Book a Visit
              </ArchitecturalButton>
            </div>
          </div>
        )}
      </header>

      {/* Primary Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Monograph Global Footer */}
      <footer className="bg-[#121314] text-white border-t border-white/10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Manifesto */}
            <div className="md:col-span-4 space-y-4">
              <span className="font-serif text-2xl tracking-wide uppercase text-white block">
                Hills Pavillion
              </span>
              <p className="text-xs text-stone-400 font-normal leading-relaxed max-w-sm">
                Quiet architectural permanence, spatial contemplation, and structural substance engineered for generations.
              </p>
              <div className="text-[10px] text-[#9e876b] uppercase tracking-[0.2em] pt-2">
                Hills Pavillion Prototype &bull; Stitch 2026
              </div>
            </div>

            {/* Portfolio Links */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9e876b] font-semibold">
                Portfolio
              </div>
              <ul className="space-y-2 text-xs text-stone-300">
                <li onClick={() => onNavigate(ROUTES.PROJECTS)} className="hover:text-white cursor-pointer">
                  All Projects
                </li>
                <li onClick={() => onNavigate(ROUTES.PROJECT_DETAIL)} className="hover:text-white cursor-pointer">
                  The Lacustrine Pavilions
                </li>
                <li onClick={() => onNavigate(ROUTES.DISCOVERY)} className="hover:text-white cursor-pointer">
                  Property Discovery
                </li>
                <li onClick={() => onNavigate(ROUTES.CONSTRUCTION)} className="hover:text-white cursor-pointer">
                  Construction Status
                </li>
              </ul>
            </div>

            {/* Atelier Inquiries */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9e876b] font-semibold">
                Advisory
              </div>
              <ul className="space-y-2 text-xs text-stone-300">
                <li onClick={() => onNavigate(ROUTES.ADVISORY)} className="hover:text-white cursor-pointer">
                  Private Client Concierge
                </li>
                <li onClick={() => onNavigate(ROUTES.PLATFORM_DASHBOARD)} className="hover:text-[#9e876b] cursor-pointer">
                  Internal Operations
                </li>
              </ul>
            </div>

            {/* Inscription Module */}
            <div className="md:col-span-4 space-y-4 bg-white/5 p-6 border border-white/10 sharp">
              <div className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
                Confidential Inquiries
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Private client representation, technical monographs, and tailored portfolio allocations.
              </p>
              {subscribed ? (
                <div className="text-xs text-[#9e876b] tracking-wider py-2 font-medium">
                  Inquiry logged. Concierge desk will connect shortly.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (emailInput) setSubscribed(true);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    placeholder="ENTER TELEPHONE / EMAIL"
                    className="w-full bg-[#1c1d1f] border border-white/15 px-4 py-2.5 text-xs text-white placeholder:text-stone-500 tracking-wider focus:outline-none focus:border-[#9e876b] sharp"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-white text-[#121314] hover:bg-[#eae5d8] text-[11px] font-bold uppercase tracking-[0.2em] transition-all sharp cursor-pointer"
                  >
                    Transmit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sub-Footer */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
            <div>
              &copy; 2026 Hills Pavillion. Building Places. Creating Legacies.
            </div>
            <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase">
              <span className="hover:text-white cursor-pointer">Confidentiality</span>
              <span className="hover:text-white cursor-pointer">Technical Monograph</span>
              <button
                onClick={() => onNavigate(ROUTES.PLATFORM_DASHBOARD)}
                className="text-[#9e876b] hover:underline"
              >
                Access Platform Desk
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
