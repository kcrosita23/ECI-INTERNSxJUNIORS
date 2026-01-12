import Base from "./Base";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Product = {
  image: string;
  title: string;
  tagline: string;
  description: string;
};

export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const products: Product[] = [
    {
      image: "low-code.webp",
      title: "MAGIC XPA - LOW CODE PLATFORM",
      tagline: "Single Business Logic, Deploy Everywhere.",
      description:
        "Our Magic XPA solution enables rapid creation of cross-platform business applications for desktop, web and mobile.",
    },
    {
      image: "Magic-xpi.webp",
      title: "MAGIC XPI - INTEGRATION PLATFORM",
      tagline: "Sync. Streamline. Scale.",
      description:
        "Magic XPI offers a new standard in system integration across cloud, on-prem, and hybrid deployments.",
    },
    {
      image: "actian.webp",
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

  useEffect(() => {
  if (!sectionRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (window.innerWidth < 768) return;
      setIsAutoPlaying(entry.isIntersecting);
    },
    { threshold: 0.5 }
  );

  observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);


  /* Desktop autoplay */
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
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
  }, []);

  /* Mobile swipe → update dots */
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const scrollX = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.offsetWidth;
    setCurrentSlide(Math.round(scrollX / width));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  /* Product Card */
  function ProductCard({ product }: { product: Product }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8
          bg-zinc-800/50 border border-zinc-700/50
          rounded-3xl p-6 md:p-12"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 sm:h-56 md:h-96 object-cover rounded-2xl"
        />
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold">{product.title}</h3>
          <p className="text-blue-400 font-semibold">{product.tagline}</p>
          <p className="text-zinc-300">{product.description}</p>
        </div>
      </motion.div>
    );
  }
  return (
    <Base>
      <section
        id="products"
        ref={sectionRef}
        className="relative text-white overflow-hidden"
      >

        {/* Gradient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
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

          {/* Carousel Wrapper */}
          <div className="max-w-7xl mx-auto relative flex items-center gap-6">

            {/* LEFT ARROW (OUTSIDE CARD) */}
            <button
              onClick={prevSlide}
              className="hidden md:flex items-center justify-center
                w-14 h-14 rounded-full
                bg-zinc-800/80 text-white text-2xl
                hover:bg-zinc-700 backdrop-blur-sm active:scale-95 p-3
                shadow-lg transition"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* SLIDER */}
             <div className="flex-1 overflow-hidden rounded-3xl">

              {/* MOBILE */}
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 snap-center px-2"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <motion.div
                className="hidden md:flex"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {products.map((product, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT ARROW (OUTSIDE CARD) */}
            <button
              onClick={nextSlide}
              className="hidden md:flex items-center justify-center
                w-14 h-14 rounded-full
                bg-zinc-800/80 text-white text-2xl
                hover:bg-zinc-700 backdrop-blur-sm active:scale-95
                shadow-lg transition"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 h-3 bg-blue-500"
                    : "w-3 h-3 bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
}