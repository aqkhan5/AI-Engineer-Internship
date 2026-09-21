import React from 'react'
import { PAVILION_VILLAS, type Villa } from '../data/pavilion'
import { formatCurrency } from '../lib/utils'
import { Users, Maximize2, Check, Sparkles } from 'lucide-react'

interface VillasSectionProps {
  onSelectVilla: (villaId: string) => void
}

export const VillasSection: React.FC<VillasSectionProps> = ({ onSelectVilla }) => {
  return (
    <section id="villas" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 text-[#c99355] text-xs font-semibold uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Accommodations</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
          The Highland Residences
        </h2>
        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
          Each cantilever pavilion and alpine estate is engineered with floor-to-ceiling thermal glass,
          framing uninterrupted ridges while offering bespoke wellness amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PAVILION_VILLAS.map((villa: Villa) => (
          <div
            key={villa.id}
            className="group rounded-2xl overflow-hidden bg-[#0e1b15]/60 border border-white/10 hover:border-[#c99355]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
          >
            <div>
              {/* Villa Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={villa.featuredImage}
                  alt={villa.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b15] via-transparent to-black/30" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#ddaa6f] text-xs font-medium border border-white/10">
                  {formatCurrency(villa.pricePerNight)} <span className="text-stone-300 text-[10px]">/ night</span>
                </div>
              </div>

              {/* Villa Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-100 group-hover:text-[#eed09d] transition-colors">
                    {villa.title}
                  </h3>
                  <p className="text-xs text-[#c99355] tracking-wider uppercase mt-1">
                    {villa.subtitle}
                  </p>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {villa.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-stone-400 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#c99355]" />
                    <span>{villa.sqft} sq ft</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c99355]" />
                    <span>{villa.capacity}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  {villa.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-[#c99355] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectVilla(villa.id)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#c99355] text-stone-200 hover:text-stone-950 font-medium text-xs tracking-wider uppercase transition-all duration-300 border border-white/10 hover:border-[#c99355] cursor-pointer text-center"
              >
                Inquire & Book Villa
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
