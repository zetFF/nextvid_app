import { Wand2 } from "lucide-react";
import React from "react";

function NavBar() {
 return (
  <>
   <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/5 bg-black/10">
    <div className="mx-auto max-w-8xl px-6 py-4 flex items-center justify-between">
     <div className="flex items-center gap-2">
      <span className="font-semibold tracking-tight Ingl">NovaMotion</span>
     </div>
     <a
      href="#generator"
      className="inline-flex Ingl items-center gap-2 rounded-2xl border border-white/30 text-white px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
     >
      <Wand2 className="h-4 w-4" /> Start Free
     </a>
    </div>
   </header>
  </>
 );
}

export default NavBar;
