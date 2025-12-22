import Base from "./Base";
import { useEffect, useState } from "react";
export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const products = [
    {
      image: "low-code.webp",
      title: "MAGIC XPA - LOW CODE PLATFORM",
      tagline: "Single Business Logic, Deploy Everywhere.",
      description: "Our Magic XPA solution enables rapid creation of cross-platform business applications for desktop, web and mobile. To take advantage of new business opportunities quickly and on-demand.",
      color: "blue"
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
      color: "blue"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <Base>
      <section
        id="products"
        className="relative bg-zinc-900 text-white overflow-hidden"
      >
        {/* Gradient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
        </div>

        <div className="relative z-10 min-h-90 px-6 py-20 md:px-12 lg:px-20 mb-auto">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-blue-500 ">
              Our Products
            </h1>
            <h2 className="text-xl md:text-1xl text-zinc-400 font-light mb-3 p-0">
              Build, Connect, and Manage with Ease
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="max-w-7xl mx-auto">
            {/* Main Carousel */}
            <div className="relative mb-12">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {products.map((product, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-2 gap-8 items-center bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 md:p-12">
                        {/* Image Side */}
                        <div className="relative group">
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
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                              {product.title}
                            </h3>
                            <p className="text-xl font-semibold mb-4">
                              {product.tagline}
                            </p>
                          </div>
                          <p className="text-zinc-300 text-lg leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full transition-all duration-300 hover:bg-zinc-700 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-zinc-700 p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
                          {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mb-4 mt-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentSlide
                      ? 'w-8 h-3 bg-blue-500'
                      : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
                    }`}
                />
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
