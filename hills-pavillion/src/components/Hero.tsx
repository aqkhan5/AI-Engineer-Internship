import { ArrowRight, Mountain } from 'lucide-react'

interface HeroProps {
  onOpenBooking: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85"
          alt="Hills Pavilion alpine peaks"
          className="w-full h-full object-cover object-center scale-105 transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e0b] via-[#0c1813]/70 to-[#070e0b]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070e0b]/40 to-[#070e0b]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#c99355]/30 backdrop-blur-md text-[#ddaa6f] text-xs uppercase tracking-[0.2em]">
          <Mountain className="w-3.5 h-3.5 text-[#c99355]" />
          <span>Elevation 2,450m • High Mountain Sanctuary</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-100 leading-[1.1]">
          Where Solitude Meets <br />
          <span className="italic font-normal bg-gradient-to-r from-stone-100 via-[#eed09d] to-[#c99355] bg-clip-text text-transparent">
            Alpine Grandeur
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300/90 font-normal leading-relaxed">
          Secluded cantilever glass pavilions nestled amidst ancient pine forests. Experience 
          private thermal baths, foraging gastronomy, and pristine dark sky constellations.
        </p>

        {/* Action button cluster */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#c99355] hover:bg-[#ddaa6f] text-stone-950 font-semibold text-xs tracking-widest uppercase transition-all shadow-xl hover:shadow-[#c99355]/30 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Inquire Availability</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#villas"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-stone-200 border border-white/15 text-xs tracking-widest uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2"
          >
            Explore Residences
          </a>
        </div>

        {/* Accolade markers */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center text-xs uppercase tracking-wider text-stone-400">
          <div className="space-y-1">
            <span className="block text-stone-200 font-serif text-lg text-stone-100 font-semibold">400+</span>
            <span className="text-[10px] text-stone-400 tracking-widest">Protected Acres</span>
          </div>
          <div className="space-y-1 border-x border-white/10">
            <span className="block text-stone-200 font-serif text-lg text-stone-100 font-semibold">100%</span>
            <span className="text-[10px] text-stone-400 tracking-widest">Geothermal Energy</span>
          </div>
          <div className="space-y-1">
            <span className="block text-stone-200 font-serif text-lg text-stone-100 font-semibold">Dark Sky</span>
            <span className="text-[10px] text-stone-400 tracking-widest">Tier 1 Certified</span>
          </div>
        </div>
      </div>
    </section>
  )
}
