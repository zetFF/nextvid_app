"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NavBar from "@/components/NavBar";
import { Hero } from "../components/LandingHero";
import { HowItWorks } from "../components/LandingHowItWorks";
import { Pricing } from "../components/LandingPricing";
import { Footer } from "../components/LandingFooter";

export default function Page() {
 const [formData, setFormData] = useState({
  title: "",
  musicUrl: "",
  captions: ["", "", "", ""],
  imageUrls: ["", "", "", ""],
 });
 const [loading, setLoading] = useState(false);
 const [result, setResult] = useState<null | { videoUrl: string; videoId: string; message: string }>(null);
 const [error, setError] = useState<string | null>(null);

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setResult(null);
  try {
   const response = await fetch("/api/generate-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     title: formData.title,
     musicUrl: formData.musicUrl,
     captions: formData.captions,
     imageUrls: formData.imageUrls,
    }),
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Failed to generate video");
   setResult(data);
  } catch (err: any) {
   setError(err.message);
  } finally {
   setLoading(false);
  }
 };

//  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx?: number, key?: "captions" | "imageUrls") => {
//   const { name, value } = e.target;
//   if (typeof idx === "number" && key) {
//    setFormData((prev) => ({
//     ...prev,
//     [key]: prev[key].map((item, i) => (i === idx ? value : item)),
//    }));
//   } else {
//    setFormData((prev) => ({ ...prev, [name]: value }));
//   }
//  };

 return (
  <div className="relative min-h-screen bg-[#101012] text-white overflow-clip">
   
   <NavBar />
   <Hero />
   <HowItWorks />
   {/* <GeneratorSection formData={formData} loading={loading} error={error} result={result} onChange={handleInputChange} onSubmit={handleSubmit} /> */}
   <Pricing />
   <Footer />
  </div>
 );
}
