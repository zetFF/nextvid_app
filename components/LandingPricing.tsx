import { CheckCircle2 } from "lucide-react";

export function Pricing() {
 return (
  <section id="pricing" className="relative py-20 md:py-10 tracking-tight">
   <div className="mx-auto max-w-5xl px-6">
    <h2 className="text-center text-3xl md:text-4xl Bron tracking-tight font-medium max-w-lg mx-auto">the most relevant and affordable price</h2>
    <p className="text-center text-sm Ingl tracking-tight mt-5 text-neutral-200 max-w-2xl mx-auto">Select the plan that best fits your needs</p>
    <div className="mt-10 grid md:grid-cols-3 Ingl gap-6 items-stretch">
     <PricingCard
      name="Free"
      price="$0"
      tagline="Try it out and feel the benefits"
      features={["Small watermark", "720p export", "Limit 20 videos/month"]}
      cta="Start"
     />
     <PricingCard
      highlight
      name="Pro"
      price="$10"
      tagline="For active creators & small businesses"
      features={["No watermark", "1080p export", "60 videos/month", "Priority queue"]}
      cta="Upgrade"
     />
     <PricingCard
      name="Business"
      price="Contact us"
      tagline="Custom solutions & team collaboration"
      features={["Brand kit & fonts", "API access", "Unlimited projects"]}
      cta="Contact Sales"
     />
    </div>
   </div>
  </section>
 );
}

export function PricingCard({
 name,
 price,
 tagline,
 features,
 cta,
 highlight,
}: {
 name: string;
 price: string;
 tagline: string;
 features: string[];
 cta: string;
 highlight?: boolean;
}) {
 return (
  <div
   className={`relative rounded-3xl border ${
    highlight ? "border-yellow-400/50" : "border-white/10"
   } bg-white/[0.03] p-6 shadow-xl flex flex-col h-full`}
  >
   {highlight && (
    <div className="absolute -top-3 left-6 text-white rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-medium text-black">
     Most Popular
    </div>
   )}
   <h3 className="text-xl Bron font-semibold">{name}</h3>
   <p className="mt-1 text-white/70">{tagline}</p>
   <div className="mt-4 text-3xl font-bold">
    {price}
    <span className="text-base font-normal text-white/60">/month</span>
   </div>
   <ul className="mt-4 space-y-2 flex-1">
    {features.map((f) => (
     <li key={f} className="flex items-center gap-2 text-sm text-white/80">
      <CheckCircle2 className="h-4 w-4" /> {f}
     </li>
    ))}
   </ul>
   <a
    href="#generator"
    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 font-medium ${
     highlight ? "bg-gradient-to-r from-yellow-500 via-yellow-500 to-orange-500 text-black" : "bg-white text-black"
    }`}
   >
    <div className="text-sm">{cta}</div>
   </a>
  </div>
 );
}
