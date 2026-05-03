"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    id: "hero",
    title: "Understand Elections.\nVisually.",
    description: "From your vote to final results — simplified.",
    align: "center",
  },
  {
    id: "registration",
    step: "Step 1",
    title: "Register as a Voter",
    description: "Secure identity verification ensures every vote counts.",
    align: "left",
  },
  {
    id: "campaign",
    step: "Step 2",
    title: "Campaign & Awareness",
    description: "Candidates present ideas. Voters make informed choices.",
    align: "right",
  },
  {
    id: "voting",
    step: "Step 3",
    title: "Cast Your Vote",
    description: "Simple. Secure. Confidential.",
    align: "left",
  },
  {
    id: "counting",
    step: "Step 4",
    title: "Counting & Verification",
    description: "Transparent systems ensure accuracy.",
    align: "right",
  },
  {
    id: "result",
    title: "Results That Reflect the People",
    description: "Every vote matters. Every voice counts.",
    align: "center",
    isFinal: true,
  },
];

export default function ScrollSections() {
  return (
    <div className="relative z-10 w-full">
      {SECTIONS.map((section, index) => (
        <SectionBlock key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}

function SectionBlock({ section, index }: { section: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade in as it approaches the center, fade out as it leaves
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.95, 1, 1, 0.95]);

  return (
    <div
      ref={ref}
      id={section.id}
      className={cn(
        "min-h-[150vh] flex items-center justify-center px-6 md:px-20 w-full",
        index === 0 ? "min-h-[100vh] pt-20" : "" // Hero takes less height initially
      )}
    >
      <motion.div
        style={{ opacity, y, scale }}
        className={cn(
          "max-w-3xl w-full",
          section.align === "center" ? "text-center mx-auto" : "",
          section.align === "left" ? "text-left mr-auto" : "",
          section.align === "right" ? "text-right ml-auto" : ""
        )}
      >
        <div className="p-8 md:p-12 rounded-3xl bg-[#0A0A0C]/40 backdrop-blur-xl border border-white/5 shadow-2xl inline-block w-full">
          {section.step && (
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#0050FF]/20 border border-[#0050FF]/50 text-[#00D6FF] text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(0,80,255,0.3)]">
              {section.step}
            </div>
          )}
          
          <h2 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight leading-tight mb-6 whitespace-pre-line drop-shadow-lg">
            {section.title}
          </h2>
          
          <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            {section.description}
          </p>

          {section.isFinal && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,80,255,0.4)] w-full sm:w-auto">
                Explore More
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform w-full sm:w-auto">
                View Full Process
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
