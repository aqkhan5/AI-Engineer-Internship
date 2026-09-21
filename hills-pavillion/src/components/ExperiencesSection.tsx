import React from 'react'
import { RESORT_EXPERIENCES } from '../data/pavilion'
import { Compass, Sparkles, Mountain, SunMedium } from 'lucide-react'

export const ExperiencesSection: React.FC = () => {
  return (
    <section id="experiences" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[#c99355] text-xs font-semibold uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5" />
            <span>Highland Rituals</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100">
            Unscripted Discoveries
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Curated daily expeditions and meditative immersions crafted exclusively for residents of Hills Pavilion.
          </p>
        </div>

        <div className="text-xs uppercase tracking-widest text-stone-400 hidden md:flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c99355]" />
          <span>All seasonal gear provided</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RESORT_EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="p-8 rounded-2xl bg-[#0c1813]/60 border border-white/10 hover:border-[#c99355]/40 transition-all space-y-6 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-widest uppercase bg-[#2a5243]/40 text-[#ddaa6f] border border-[#c99355]/20">
                  {exp.tag}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Mountain className="w-3 h-3 text-[#c99355]" />
                  {exp.elevation}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-stone-100 group-hover:text-[#eed09d] transition-colors">
                {exp.title}
              </h3>

              <p className="text-xs text-stone-400 leading-relaxed">
                {exp.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5 text-[#c99355]" />
                {exp.duration}
              </span>
              <span className="text-[#c99355] tracking-wider uppercase font-medium group-hover:translate-x-1 transition-transform">
                Details &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
