export function HowItWorks() {
 return (
  <section id="how" className="relative py-20 md:py-28 tracking-tight">
   <div className="mx-auto max-w-5xl px-6">
    <h2 className="text-center text-3xl Bron md:text-4xl font-semibold">Simple to use</h2>
    <ol className="mt-10 grid md:grid-cols-3 gap-6">
     <StepCard step={1} title="Input" desc="Enter the title, music link, captions, and 4 images." />
     <StepCard step={2} title="Generate" desc="AI automatically arranges order, transitions, and timing." />
     <StepCard step={3} title="Download & Share" desc="Get the video link and ID for management." />
    </ol>
   </div>
  </section>
 );
}

export function StepCard({ step, title, desc }: { step: number; title: string; desc: string }) {
 return (
  <li className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
   <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black px-3 py-1 text-xs">
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-black font-semibold">{step}</span>
    <span className="text-white/70 Ingl">Step</span>
   </div>
   <h3 className="mt-4 text-lg Bron font-semibold">{title}</h3>
   <p className="mt-2 text-sm Ingl text-white/70">{desc}</p>
  </li>
 );
}
