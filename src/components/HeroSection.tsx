import React from "react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <div 
      className="bg-black text-white border-4 border-black p-6 md:p-12 relative overflow-hidden flex flex-col justify-between mb-8"
      id="hero_up_section"
    >
      {/* Background Subtle Accent Grids (Swiss/Editorial styling) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-difference">
        <div className="w-full h-full border-r border-b border-white grid grid-cols-6 grid-rows-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-t border-l border-white"></div>
          ))}
        </div>
      </div>

      {/* Main Grid: Responsive 3-columns on large screens, Stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* LEFT COLUMN: Large stark overlapping typography */}
        <div className="lg:col-span-5 flex flex-col justify-between select-none" id="hero_left_stack">
          <div className="space-y-0 tracking-tighter leading-none font-black text-white">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-7xl md:text-8xl xl:text-[9.5rem] font-syne uppercase select-none opacity-80"
              style={{ letterSpacing: "-0.05em" }}
            >
              Z961
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-7xl xl:text-[7.5rem] font-serif font-light tracking-normal italic text-white/90 select-none"
            >
              COMB
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-7xl md:text-8xl xl:text-[9.5rem] font-syne uppercase select-none opacity-80"
              style={{ letterSpacing: "-0.05em" }}
            >
              Z961
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-6xl xl:text-[6.5rem] font-serif tracking-normal leading-tight select-none font-bold uppercase"
            >
              COMBINATOR
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 lg:mt-16 text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-gray-400 font-bold"
          >
            WHERE INNOVATION MEETS INVESTMENTS
          </motion.div>
        </div>

        {/* CENTER COLUMN: Vertical high-fashion editorial monochrome image inside sharp border */}
        <div className="lg:col-span-3 flex items-center justify-center relative" id="hero_center_image_container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[280px] lg:max-w-none bg-zinc-900 border-2 border-white/40 p-1.5 shadow-[0px_0px_20px_rgba(255,255,255,0.05)] relative group overflow-hidden"
          >
            {/* Aspect ratio frame (3:4) */}
            <div className="aspect-[3/4] relative w-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
                alt="Z961 Combinator High Fashion Editorial model wearing structured tailored black coat"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Discrete tag overlay */}
              <div className="absolute bottom-3 left-3 bg-white/95 text-black text-[9px] font-mono tracking-widest uppercase py-0.5 px-1.5 font-black border border-black z-10">
                PLATEAU 01 / FORM
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Editorial summary & rotating asterisk star */}
        <div className="lg:col-span-4 flex flex-col justify-between pt-4 lg:pt-0" id="hero_right_editorial">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 max-w-sm"
          >
            <h3 className="font-serif italic text-xl md:text-2xl text-white tracking-wide border-b border-white/20 pb-2">
              961 Combinator: Fusion of Data and Form
            </h3>
            
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light text-justify">
              Algorithmic synthesis and procedural generation are the core principles of the 961 Combinator. The system leverages advanced artificial intelligence models and micro-operational frameworks to blend functional elegance with persistent offshore capital.
            </p>
            
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light text-justify">
              Our dedication to robust execution informs every single combination, creating a new borderless language of design and financial sovereignty for Lebanon’s premium tech-builders.
            </p>

            <div className="pt-2">
              <a 
                href="#dropdown_z961_menu_container"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-white hover:text-gray-300 transition-all hover:translate-x-1"
              >
                LEARN MORE <span className="text-sm font-sans">→</span>
              </a>
            </div>
          </motion.div>

          {/* Majestic Rotating 8-Point Asterisk Star at bottom right */}
          <div className="flex justify-end items-end mt-12 lg:mt-0" id="hero_asterisk_box">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 md:w-24 md:h-24 text-white shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="961 COMBINATOR CODES"
            >
              {/* Highly precise 8-spoke geometric flower/star SVG resembling the screenshot */}
              <svg 
                viewBox="0 0 100 100" 
                fill="currentColor" 
                className="w-full h-full"
              >
                <g transform="translate(50, 50)">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = i * 45;
                    return (
                      <rect 
                        key={i}
                        x="-6" 
                        y="-45" 
                        width="12" 
                        height="90" 
                        rx="6"
                        transform={`rotate(${angle})`}
                        className="text-white"
                      />
                    );
                  })}
                  <circle cx="0" cy="0" r="10" className="fill-black border-2 border-white" />
                </g>
              </svg>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
