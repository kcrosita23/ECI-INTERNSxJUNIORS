import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  image: string;
  title: string;
  tagline: string;
  description: string;
};

export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const products: Product[] = [
    {
      image: "low-code.webp",
      title: "MAGIC XPA-LOW CODE PLATFORM",
      tagline: "Single Business Logic, Deploy Everywhere.",
      description:
        "Our Magic XPA solution enables rapid creation of cross-platform business applications for desktop, web and mobile. To take advantage of new business opportunities quickly and on-demand.",
    },
    {
      image: "Magic-xpi.webp",
      title: "MAGIC XPI-INTEGRATION PLATFORM",
      tagline: "Sync. Streamline. Scale.",
      description:
        "Magic XPI offers a new standard in system integration. With a code-free, low maintenance approach, Magic xpi integrates all of your business systems on the cloud, on-premises or in hybrid deployments so your company can maximize its opportunities.",
    },
    {
      image: "actian.webp",
      title: "ACTIAN ZEN (PSQL)",
      tagline: "Reliable, Fast, and Scalable DBMS",
      description:
        "Actian Zen database family is the most reliable, small-footprint, low-maintenance, high-performance database management system (DBMS) in the world. Purpose-built for Edge data management whether in the Cloud, remote and branch offices or in Mobile and IoT settings.",
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 768) setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);

    return () => clearTimeout(timer);
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

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;

    const scrollX = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.offsetWidth;

    setCurrentSlide(Math.round(scrollX / width));
    setShowSwipeHint(false);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-20 text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold">
            Our <span className="text-blue-400">Products</span>
          </h1>
          <p className="text-lg text-zinc-400">
            Build, Connect, and Manage with Ease
          </p>
        </motion.div>

        <div className="relative flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="hidden md:flex w-14 h-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group flex-shrink-0"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative h-[450px] md:h-[500px] overflow-hidden rounded-2xl flex-1">
            {showSwipeHint && (
              <div className="md:hidden absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-sm"
                >
                  <span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                  <span>Swipe to explore</span>
                  <span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.div>
              </div>
            )}

            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll} 
              className="flex md:hidden h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {products.map((product, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 snap-center">
                  <ProductCard product={product} isMobile={true} />
                </div>
              ))}
            </div>

            <div className="hidden md:block h-full">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 },
                  }}
                  className="absolute inset-0"
                >
                  <ProductCard product={products[currentSlide]} isMobile={false} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="hidden md:flex w-14 h-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group flex-shrink-0"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full duration-300 ${
                index === currentSlide
                  ? "w-8 h-3 bg-blue-500"
                  : "w-3 h-3 bg-zinc-600"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, isMobile }: { product: Product; isMobile: boolean }) {
  const [expanded, setExpanded] = useState(false);

  if (isMobile) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-light tracking-wide mb-3">{product.title}</h3>
            <p className="text-lg text-blue-400 font-light mb-4">{product.tagline}</p>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expanded ? "max-h-60 opacity-100 mb-4" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-light text-white/70 hover:text-white transition flex items-center gap-2"
            >
              {expanded ? "Hide details" : "View details"}
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">{product.title}</h2>
          <p className="text-xl md:text-2xl text-blue-400 font-light mb-6">{product.tagline}</p>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
            {product.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}