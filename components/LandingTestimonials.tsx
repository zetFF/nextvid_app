export function Testimonials() {
 return (
  <section className="relative py-20 md:py-28">
   <div className="mx-auto max-w-6xl px-6">
    <div className="grid md:grid-cols-3 gap-6">
     <Testimonial quote="Creating daily menu content is now quick. Just snap, upload, done!" name="Alya" role="Cafe Owner" />
     <Testimonial quote="Smooth transitions, clear captions. Perfect for my store's Reels." name="Rama" role="Fashion SME" />
     <Testimonial quote="Our social team can produce 5x faster. Incredible value." name="Sinta" role="Content Agency" />
    </div>
   </div>
  </section>
 );
}

export function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
 return (
  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
   <p className="text-white/80">“{quote}”</p>
   <div className="mt-4 text-sm text-white/60">
    — {name}, {role}
   </div>
  </div>
 );
}
