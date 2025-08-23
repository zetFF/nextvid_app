import { ChevronRight } from "lucide-react";

export function FAQSection() {
 return (
  <section id="faq" className="relative py-20 md:py-28">
   <div className="mx-auto max-w-4xl px-6">
    <h2 className="text-center text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
    <div className="mt-10 space-y-4">
     <FAQItem
      q="Can I use more than 4 images?"
      a="The current version is optimized for 4 images to keep the flow short and engaging. Support for more images is on our roadmap."
     />
     <FAQItem q="Where should the music come from?" a="Please use a music URL you have rights to. We recommend royalty-free sources." />
     <FAQItem q="What output format do you provide?" a="MP4 (H.264), 1080p for Pro plans and above, 720p for the Free plan." />
    </div>
   </div>
  </section>
 );
}

export function FAQItem({ q, a }: { q: string; a: string }) {
 return (
  <details className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5">
   <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
    <span>{q}</span>
    <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
   </summary>
   <p className="mt-3 text-sm text-white/70">{a}</p>
  </details>
 );
}
