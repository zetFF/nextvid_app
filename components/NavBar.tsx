"use client";

import { Wand2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function NavBar() {
 const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
   setScrolled(window.scrollY > 100);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
  <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/5 bg-black/10">
   <motion.div
    animate={{
     maxWidth: scrolled ? "64rem" : "",
     justifyContent: scrolled ? "space-around" : "space-between",
     paddingTop: scrolled ? "0.5rem" : "1rem",
     paddingBottom: scrolled ? "0.5rem" : "1rem",
     scale: scrolled ? 0.95 : 1, 
    }}
    transition={{
     type: "spring",
     stiffness: 300,
     damping: 20,
     bounce: 0.4, 
    }}
    className="mx-auto flex items-center px-3"
   >
    <div className="flex items-center gap-2">
     <span className="font-semibold tracking-tight Ingl text-white">NovaMotion</span>
    </div>
    <a
     href="#generator"
     className="inline-flex Ingl items-center gap-2 rounded-2xl border border-white/30 text-white px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
    >
     <Wand2 className="h-4 w-4" /> Start Free
    </a>
   </motion.div>
  </header>
 );
}

export default NavBar;
