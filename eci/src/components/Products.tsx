<<<<<<< HEAD
import Base from "./Base";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 
=======
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
>>>>>>> 8535f02d8f4d9e8c506d09028e68eb3787019eee

function Base({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default function Products() {
<<<<<<< HEAD
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
=======
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);
>>>>>>> 8535f02d8f4d9e8c506d09028e68eb3787019eee

  const products = [
    {
      image: "low-code.webp",
      title: "MAGIC XPA - LOW CODE PLATFORM",
      tagline: "Single Business Logic, Deploy Everywhere.",
      description: "Our Magic XPA solution enables rapid creation of cross-platform business applications for desktop, web and mobile. To take advantage of new business opportunities quickly and on-demand.",
      color: "cyan"
    },
    {
      image: "Magic-xpi.webp",
      title: "MAGIC XPI - INTEGRATION PLATFORM",
      tagline: "Sync. Streamline. Scale.",
      description: "Magic XPI offers a new standard in system integration. With a code-free, low maintenance approach, Magic xpi integrates all of your business systems on the cloud, on-premises or in hybrid deployments so your company can maximize its opportunities.",
      color: "blue"
    },
    {
      image: "actian.webp",
      title: "ACTIAN ZEN (PSQL)",
      tagline: "Reliable, Fast, and Scalable DBMS",
      description: "Actian Zen database family is the most reliable, small-footprint, low-maintenance, high-performance database management system (DBMS) in the world. Purpose-built for Edge data management whether in the Cloud, remote and branch offices or in Mobile and IoT settings.",
      color: "purple"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const nextSlide = () => {
<<<<<<< HEAD
    setActiveIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  }; 
=======
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
>>>>>>> 8535f02d8f4d9e8c506d09028e68eb3787019eee

  return (
    <Base>
      <section
        id="products"
        className="relative text-white overflow-hidden"
      >
        {/* Gradient background*/}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
        </div>

        <div className="relative z-10 min-h-screen px-6 py-20 md:px-12 lg:px-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-4xl lg:text-[3rem] xl:text-6xl font-bold leading-tight">
              OUR <span className="text-blue-500">PRODUCTS</span>
            </h1>
            <h2 className="text-xl md:text-1xl text-zinc-400 font-light">
              Build, Connect, and Manage with Ease
            </h2>
          </div>

<<<<<<< HEAD
          {/* 3D Orbiting Carousel */}

          {/* 3D configuration */}
          {/* placed just before the markup so it's easy to tweak */}
          
          {/* helper to compute 3D transform values */}
          {/* Note: we compute these in the render map below using getCardStyle */}

          <div className="max-w-7xl mx-auto relative flex items-center gap-6">
            <button
              onClick={prevSlide}
              className="hidden md:flex items-center justify-center
                w-14 h-14 rounded-full
                bg-blue-600 text-white text-2xl
                hover:bg-blue-500 active:scale-95
                shadow-lg transition"
            >
              <ArrowLeftToLine />
            </button>

            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-full h-[320px] md:h-[440px] flex items-center justify-center perspective-1000">
                {products.map((product, index) => {
                  const theta = ((index - activeIndex) * (2 * Math.PI)) / products.length;
                  const depth = Math.cos(theta);
                  const x = Math.sin(theta) * 260;
                  const y = depth * 28;
                  const scale = 0.6 + ((depth + 1) / 2) * 0.4;
                  const opacity = 0.5 + ((depth + 1) / 2) * 0.5;
                  const zIndex = Math.round((depth + 1) * 50);
                  const blur = depth < 0.2 ? `blur(${Math.abs(depth - 0.2) * 4}px)` : "blur(0px)";

                  const style = { x, y, scale, opacity, zIndex, filter: blur } as any;
                  const isFront = zIndex > 40;

                  return (
                    <motion.div
                      key={index}
                      animate={style}
                      transition={{ type: "spring", stiffness: 140, damping: 20 }}
                      className={cn(
                        "absolute w-[320px] md:w-[520px] h-[220px] md:h-[300px] rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center text-left select-none cursor-pointer transition-colors duration-300",
                        "bg-zinc-800/50 border border-zinc-700/50 shadow-2xl",
                        isFront ? "border-blue-500/50 border-b-4 border-b-blue-500" : "border-zinc-700"
                      )}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-28 md:h-full object-cover rounded-2xl" />
                      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
                        <h3 className={cn("text-xl md:text-2xl font-bold", isFront ? "text-white" : "text-zinc-400")}>{product.title}</h3>
                        <p className="text-blue-400 font-semibold mt-1">{product.tagline}</p>
                        <p className={cn("text-zinc-300 mt-2 text-sm md:text-base", isFront ? "opacity-100" : "opacity-70")}>{product.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="hidden md:flex items-center justify-center
                w-14 h-14 rounded-full
                bg-blue-600 text-white text-2xl
                hover:bg-blue-500 active:scale-95
                shadow-lg transition"
            >
              <ArrowRightToLine />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 h-3 bg-blue-500"
                    : "w-3 h-3 bg-zinc-600"
                }`}
              />
            ))}
=======
          {/* Carousel Container */}
          <div className="max-w-7xl mx-auto">
            {/* Main Carousel */}
            <div className="relative mb-12 px-12 md:px-16">
              <div className="rounded-3xl relative">
                {products.map((product, index) => (
                  <div 
                    key={index} 
                    className={`w-full transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 md:p-12">
                      {/* Image Side */}
                      <div 
                        className={`relative group transition-all duration-700 ${
                          index === currentSlide 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: index === currentSlide ? '100ms' : '0ms' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="relative w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Side */}
                      <div className="space-y-6">
                        <div>
                          <h3 
                            className={`text-3xl md:text-4xl font-bold text-white mb-4 leading-tight transition-all duration-700 ${
                              index === currentSlide 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: index === currentSlide ? '200ms' : '0ms' }}
                          >
                            {product.title}
                          </h3>
                          <p 
                            className={`text-xl text-blue-400 font-semibold mb-4 transition-all duration-700 ${
                              index === currentSlide 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: index === currentSlide ? '300ms' : '0ms' }}
                          >
                            {product.tagline}
                          </p>
                        </div>
                        <p 
                          className={`text-zinc-300 text-lg leading-relaxed transition-all duration-700 ${
                            index === currentSlide 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-8'
                          }`}
                          style={{ transitionDelay: index === currentSlide ? '400ms' : '0ms' }}
                        >
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm p-3 md:p-4 rounded-full border border-zinc-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 z-10"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm p-3 md:p-4 rounded-full border border-zinc-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 z-10"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mb-12">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? 'w-12 h-3 bg-blue-500' 
                      : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
>>>>>>> 8535f02d8f4d9e8c506d09028e68eb3787019eee
          </div>
        </div>
      </section>
    </Base>
  );
}