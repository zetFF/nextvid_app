import { Wand2, Sparkles, PlayCircle, ChevronRight, Zap, ShieldCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "@/app/globals.css";

export function Hero() {
 const words = ["stunning videos", "social-ready clips", "HD exports"];
 const [currentWord, setCurrentWord] = useState("");
 const [index, setIndex] = useState(0);
 const [charIndex, setCharIndex] = useState(0);
 const [isTyping, setIsTyping] = useState(true);

 useEffect(() => {
  let typingTimeout: NodeJS.Timeout;

  if (isTyping) {
   typingTimeout = setTimeout(() => {
    setCurrentWord(words[index].slice(0, charIndex + 1));
    setCharIndex((prev) => prev + 1);
   }, 50);

   if (charIndex === words[index].length) {
    setIsTyping(false);
    setTimeout(() => {
     setCharIndex(0);
     setIndex((prev) => (prev + 1) % words.length);
     setIsTyping(true);
    }, 7500);
   }
  }

  return () => clearTimeout(typingTimeout);
 }, [charIndex, index, isTyping]);

 return (
  <section className="relative text-center -mt-40">
   <div className="absolute inset-0 z-0">
    <img
     src="/bg.jpg"
     alt="Background"
     className="w-full h-full object-cover opacity-50 select-none pointer-events-none"
     style={{ filter: "brightness(0.7)" }}
    />
    <div
     className="absolute inset-0"
     style={{
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgb(16, 16, 18)100%)",
     }}
    />
   </div>
   <div className=" inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
   <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 flex flex-col items-center justify-center">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
     <span className="inline-flex Ingl mt-48 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <Sparkles className="h-3.5 w-3.5" /> AI Video Generator
     </span>
     <h1 className="mt-6 relative Bron text-4xl md:text-7xl text-white font-medium tracking-tight leading-tighter">
      Turn images & text into{" "}
      <span
       className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent inline-block"
       style={{ minWidth: "15ch", display: "inline-block" }}
      >
       {currentWord}
      </span>
     </h1>
     <p className="mt-6 Ingl text-white/70 max-w-xl mx-auto tracking-tight">
      Just add a title, music, captions, and 4 images. Let the AI do the rest. Fast content, professional results—no editing drama.
     </p>
     <div className="mt-8 flex Ingl flex-wrap items-center justify-center gap-4">
      <a
       href="#generator"
       className="inline-flex tracking-tight text-white items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-500 via-yellow-500 to-orange-500 px-5 py-3 font-medium text-black"
      >
       <PlayCircle className="h-5 w-5" /> Try Now
      </a>
      <a href="#features" className="inline-flex tracking-tight items-center gap-2 text-white/80 hover:text-white">
       See Features <ChevronRight className="h-4 w-4" />
      </a>
     </div>
     <div className="mt-8 flex Ingl items-center mb-40 tracking-tight justify-center gap-6 text-xs text-white/60">
      <div className="flex items-center gap-2">
       <Zap className="h-4 w-4" /> Super fast
      </div>
      <div className="flex items-center gap-2">
       <ShieldCheck className="h-4 w-4" /> HD export
      </div>
      <div className="flex items-center gap-2">
       <Rocket className="h-4 w-4" /> Social-ready
      </div>
     </div>
    </motion.div>
   </div>
  </section>
 );
}
