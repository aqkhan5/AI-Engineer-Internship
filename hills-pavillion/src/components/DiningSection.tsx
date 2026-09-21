import React from 'react'
import { DINING_EXPERIENCES } from '../data/pavilion'
import { Utensils, Clock, Flame } from 'lucide-react'

export const DiningSection: React.FC = () => {
  return (
    <section id="dining" className="py-24 px-6 bg-[#070e0b]/80 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Section Introduction */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#c99355] text-xs font-semibold uppercase tracking-[0.25em]">
              <Utensils className="w-3.5 h-3.5" />
              <span>Wild & Foraged Gastronomy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 leading-tight">
              Culinary Artistry <br />
              <span className="italic font-normal text-[#ddaa6f]">
                At Cloud Level
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Every evening unfolds a narrative of the surrounding mountain terroir. 
              Our culinary team works intimately with regional foresters, wild apiaries, 
              and organic orchards to produce tasting journeys celebrating seasonal metamorphosis.
            </p>

            <div className="p-5 rounded-xl bg-[#142820]/50 border border-[#c99355]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#c99355] uppercase tracking-wider">
                <Flame className="w-4 h-4 text-[#c99355]" />
                <span>Woodfire & Cellar Sommelier</span>
              </div>
              <p className="text-xs text-stone-400">
                Cellar collection featuring over 1,400 curated biodynamic natural vintages and rare highland distillations.
              </p>
            </div>
          </div>

          {/* Dining Cards */}
          <div className="lg:col-span-7 space-y-6">
            {DINING_EXPERIENCES.map((dining) => (
              <div
                key={dining.id}
                className="p-8 rounded-2xl bg-[#0c1813]/70 border border-white/10 hover:border-[#c99355]/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-stone-100">
                      {dining.name}
                    </h3>
                    <span className="text-xs text-[#c99355] tracking-wider uppercase">
                      {dining.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 bg-white/5 px-3 py-1.5 rounded-full self-start">
                    <Clock className="w-3.5 h-3.5 text-[#c99355]" />
                    <span>{dining.hours}</span>
                  </div>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed">
                  {dining.description}
                </p>

                <div className="text-xs italic text-stone-400 border-l-2 border-[#c99355] pl-3 py-0.5">
                  "{dining.chefNote}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
