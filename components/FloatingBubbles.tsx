"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = ["/images/image1.jpg", "/images/image2.jpg", "/images/image3.jpg", "/images/image4.jpg", "/images/image5.jpg"];

type Bubble = {
 id: number;
 x: number;
 y: number;
 size: number;
 image: string;
};

export default function FloatingBubbles() {
 const [bubbles, setBubbles] = useState<Bubble[]>([]);

 useEffect(() => {
  const createBubbles = () => {
   const newBubbles = Array.from({ length: 7 }).map((_, idx) => ({
    id: idx,
    x: Math.random() * 100, 
    y: Math.random() * 100, 
    size: 80 + Math.random() * 50, 
    image: images[Math.floor(Math.random() * images.length)],
   }));
   setBubbles(newBubbles);
  };
  createBubbles();
 }, []);

 return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
   {bubbles.map((bubble) => (
    <motion.div
     key={bubble.id}
     className="absolute rounded-full shadow-lg overflow-hidden border border-white/20"
     style={{
      width: bubble.size,
      height: bubble.size,
      top: `${bubble.y}%`,
      left: `${bubble.x}%`,
     }}
     animate={{
      x: ["0%", `${Math.random() * 200 - 100}%`],
      y: ["0%", `${Math.random() * 200 - 100}%`],
      rotate: [0, 360],
     }}
     transition={{
      duration: 20 + Math.random() * 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
     }}
    >
     <img src={bubble.image} alt="bubble" className="w-full h-full object-cover" />
    </motion.div>
   ))}
  </div>
 );
}
