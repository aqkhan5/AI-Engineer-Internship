import React, { useState, useEffect } from 'react'
import { Trees, Compass, Calendar, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenBooking: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0c1813]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-[#c99355]/40 flex items-center justify-center text-[#c99355] group-hover:border-[#c99355] transition-all">
            <Trees className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl tracking-wider text-stone-100 font-semibold uppercase block">
              Hills Pavilion
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#c99355] uppercase block -mt-1">
              Highland Sanctuary
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-stone-300">
          <a href="#villas" className="hover:text-[#ddaa6f] transition-colors">
            Residences
          </a>
          <a href="#dining" className="hover:text-[#ddaa6f] transition-colors">
            Gastronomy
          </a>
          <a href="#experiences" className="hover:text-[#ddaa6f] transition-colors">
            Experiences
          </a>
          <a href="#location" className="hover:text-[#ddaa6f] transition-colors flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#c99355]" />
            Location
          </a>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-[#2a5243] to-[#1e3c31] text-stone-100 border border-[#c99355]/40 hover:border-[#c99355] shadow-lg hover:shadow-[#c99355]/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c99355]" />
            Reserve Stay
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-200 hover:text-white"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1813] border-b border-white/10 px-6 py-6 space-y-4">
          <a
            href="#villas"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-stone-300 hover:text-[#ddaa6f]"
          >
            Residences
          </a>
          <a
            href="#dining"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-stone-300 hover:text-[#ddaa6f]"
          >
            Gastronomy
          </a>
          <a
            href="#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-stone-300 hover:text-[#ddaa6f]"
          >
            Experiences
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest text-stone-300 hover:text-[#ddaa6f]"
          >
            Location
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenBooking()
            }}
            className="w-full mt-2 py-3 rounded-md bg-[#2a5243] border border-[#c99355]/50 text-white text-xs uppercase tracking-widest font-semibold"
          >
            Reserve Stay
          </button>
        </div>
      )}
    </header>
  )
}
