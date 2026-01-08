import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-react";

type Product = {
  image: string;
  title: string;
  tagline: string;
  description: string;
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);

  const products: Product[] = [
    {
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      title: "MAGIC XPA - LOW CODE PLATFORM",
      tagline: "Single Business Logic, Deploy Everywhere.",
      description:
        "Our Magic XPA solution enables rapid creation of cross-platform business applications for desktop, web and mobile.",
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      title: "MAGIC XPI - INTEGRATION PLATFORM",
      tagline: "Sync. Streamline. Scale.",
      description:
        "Magic XPI offers a new standard in system integration across cloud, on-prem, and hybrid deployments.",
    },
    {
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
      title: "ACTIAN ZEN (PSQL)",
      tagline: "Reliable, Fast, and Scalable DBMS",
      description:
        "Actian Zen is a high-performance DBMS purpose-built for Edge, Mobile, and IoT environments.",
    },
  ];

  /* Disable autoplay on mobile */
  useEffect(() => {
    if (window.innerWidth < 768) setIsAutoPlaying(false);
  }, []);

  /* IntersectionObserver — autoplay only when visible */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsAutoPlaying(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Desktop autoplay */
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-zinc-900 text-white overflow-hidden"
    >
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="relative z-10 px-6 py-20 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-500">
            Our Products
          </h1>
          <p className="text-lg text-zinc-400">
            Build, Connect, and Manage with Ease
          </p>
        </div>

        {/* 3D Orbiting Carousel */}
        <div className="max-w-7xl mx-auto relative flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="hidden md:flex items-center justify-center
              w-14 h-14 rounded-full
              bg-blue-600 text-white text-2xl
              hover:bg-blue-500 active:scale-95
              shadow-lg transition z-20"
          >
            <ArrowLeftToLine />
          </button>

          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full h-[320px] md:h-[440px] flex items-center justify-center" style={{ perspective: "1000px" }}>
              {products.map((product, index) => {
                const theta = ((index - activeIndex) * (2 * Math.PI)) / products.length;
                const depth = Math.cos(theta);
                const x = Math.sin(theta) * 260;
                const y = depth * 28;
                const scale = 0.6 + ((depth + 1) / 2) * 0.4;
                const opacity = 0.5 + ((depth + 1) / 2) * 0.5;
                const zIndex = Math.round((depth + 1) * 50);
                const blur = depth < 0.2 ? `blur(${Math.abs(depth - 0.2) * 4}px)` : "blur(0px)";

                const style = { x, y, scale, opacity, zIndex, filter: blur };
                const isFront = zIndex > 40;

                return (
                  <motion.div
                    key={index}
                    animate={style}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                    className={cn(
                      "absolute w-[320px] md:w-[520px] h-[220px] md:h-[300px] rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center text-left select-none cursor-pointer transition-colors duration-300",
                      "bg-zinc-800/50 border shadow-2xl",
                      isFront ? "border-blue-500/50 border-b-4 border-b-blue-500" : "border-zinc-700"
                    )}
                    onClick={() => setActiveIndex(index)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full md:w-1/2 h-28 md:h-full object-cover rounded-2xl" 
                    />
                    <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
                      <h3 className={cn(
                        "text-xl md:text-2xl font-bold", 
                        isFront ? "text-white" : "text-zinc-400"
                      )}>
                        {product.title}
                      </h3>
                      <p className="text-blue-400 font-semibold mt-1">{product.tagline}</p>
                      <p className={cn(
                        "text-zinc-300 mt-2 text-sm md:text-base", 
                        isFront ? "opacity-100" : "opacity-70"
                      )}>
                        {product.description}
                      </p>
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
              shadow-lg transition z-20"
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
        </div>
      </div>
    </section>
  );
}