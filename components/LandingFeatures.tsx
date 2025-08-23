import { Wand2, Music, ImageIcon, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export function Features() {
 return (
  <section id="features" className="relative py-20 md:py-28">
   <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
   <div className="mx-auto max-w-7xl px-6">
    <div className="grid md:grid-cols-3 gap-6">
     <FeatureCard
      icon={<Wand2 className="h-5 w-5" />}
      title="Simple Drag‑and‑Drop"
      desc="Minimal form, focused on results. Just 4 images + captions."
     />
     <FeatureCard icon={<Music className="h-5 w-5" />} title="Music Sync" desc="Light beat-matching for smoother transitions." />
     <FeatureCard
      icon={<ImageIcon className="h-5 w-5" />}
      title="Smooth Transitions"
      desc="Automatic dissolve, parallax, and zoom for polished visuals."
     />
     <FeatureCard icon={<MessageSquare className="h-5 w-5" />} title="Sharp Captions" desc="High-contrast text, perfect for Reels & TikTok." />
     <FeatureCard icon={<ShieldCheck className="h-5 w-5" />} title="HD Output" desc="Export MP4 1080p, safe to share across all platforms." />
     <FeatureCard icon={<Zap className="h-5 w-5" />} title="Fast & Stable" desc="Efficient pipeline, minimal wait—keep your content flowing." />
    </div>
   </div>
  </section>
 );
}

export function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
 return (
  <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-lg transition hover:bg-white/[0.06]">
   <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/30 via-indigo-500/30 to-cyan-400/30 ring-1 ring-white/10">
    {icon}
   </div>
   <h3 className="text-lg font-semibold">{title}</h3>
   <p className="mt-2 text-sm text-white/70">{desc}</p>
  </div>
 );
}
