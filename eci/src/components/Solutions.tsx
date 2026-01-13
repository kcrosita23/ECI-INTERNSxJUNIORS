import { useState, useEffect, useRef } from 'react';

export default function Solutions() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const solutions = [
    {
      title: 'ELECTRIC METER READER',
      code: '(EMR200)',
      description:
        'The Electric Meter Reader (EMR) is a state-of-the-art mobile application used to capture and store meter readings from electric or water meters. It also collects non-meter-reading information, including meter conditions, hazardous conditions, tamper data, survey responses, and high/low reading checks.',
    },
    {
      title: 'WAREHOUSING & INVENTORY SYSTEM',
      code: '(WIS2000)',
      description:
        'The Warehousing & Inventory System (WIS) is designed to assist electric utilities in managing materials effectively. It generates essential inventory reports, such as material balances, summaries of releases, received materials (BIN Card), total project costs, and more.',
    },
    {
      title: 'COMPUTERIZED ACCOUNTING SYSTEM',
      code: '(CAS2000)',
      description:
        'The Computerized Accounting System (CAS) is an ACAM/BSUP-ready solution designed to effectively handle and manage the complex financial processes of Philippine electric utilities, thereby improving their operations and performance.',
    },
    {
      title: 'CUSTOMER INFORMATION MANAGEMENT SYSTEM',
      code: '(CIMS200)',
      description:
        'The Customer Information Management System (CIMS) seamlessly combines EBS2000 and CMS2000 to enhance billing precision, streamline customer data management, and boost service efficiency for both businesses and their customers.',
    },
  ];

  // Detect mobile → control autoplay & swipe hint
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsAutoPlaying(!isMobile);
    setShowSwipeHint(isMobile);
  }, []);

  // Auto-hide swipe hint after ~4–5 seconds
  useEffect(() => {
    if (!showSwipeHint) return;
    const timer = setTimeout(() => setShowSwipeHint(false), 4800);
    return () => clearTimeout(timer);
  }, [showSwipeHint]);

  // Autoplay logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % solutions.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, solutions.length]);

  const pauseAutoplay = () => setIsAutoPlaying(false);

  const nextCard = () => {
    pauseAutoplay();
    setCardIndex((prev) => (prev + 1) % solutions.length);
  };

  const prevCard = () => {
    pauseAutoplay();
    setCardIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  // Mobile scroll ref + handler (match Products behavior)
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;

    const scrollX = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.offsetWidth;

    setCardIndex(Math.round(scrollX / width));
    setShowSwipeHint(false);
  };

  return (
    <section id="solutions" className="relative text-white overflow-hidden py-20">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="relative z-10 min-h-[80vh] max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            OUR <span className="text-blue-500">SOLUTIONS</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light mt-4 max-w-3xl mx-auto">
            Powerful software solutions designed to streamline operations and drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:gap-16">
          {/* Electric Billing System */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow hover:shadow-blue-500/10">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/G4gylK0iTBA"
                  title="Electric Billing System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">EBS2000</div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">ELECTRIC BILLING SYSTEM</h3>
              <p className="text-zinc-300 text-justify">
                The Electric Billing System (EBS) is the most widely used billing and collection system among the various electric cooperatives across the Philippines. Everywhere Consulting, Inc. designed, developed, and deployed EBS2000, which is based on the original DOS-based Electric Billing System previously implemented by Questronix Corporation, our parent company.
              </p>
            </div>
          </div>

          {/* Consumer Management System (reversed) */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow hover:shadow-blue-500/10">
            <div className="md:order-2">
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/wBCEAtdEmwE"
                  title="Consumer Management System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">CMS2000</div>
            </div>
            <div className="md:order-1 space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">CONSUMER MANAGEMENT SYSTEM</h3>
              <p className="text-zinc-300 text-justify">
                The Consumer Management System (CMS) is an integrated solution that automates the manual processes of consumer application and records maintenance. The system provides tools to accept consumer complaints and requests and to generate the necessary "Orders" required to address those complaints and/or requests.
              </p>
            </div>
          </div>

          {/* General Accounting System */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow hover:shadow-blue-500/10">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ZJkKPV8dEsg"
                  title="General Accounting System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">GAS2000</div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">GENERAL ACCOUNTING SYSTEM</h3>
              <p className="text-zinc-300 text-justify">
                The General Accounting System (GAS) helps businesses efficiently record and manage financial transactions. It includes features for purchasing, warehouse management, and file maintenance to track supplies and records.
              </p>
            </div>
          </div>

          {/* HRMIS (reversed) */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow hover:shadow-blue-500/10">
            <div className="md:order-2">
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/KMbvA2LL4ks"
                  title="Inventory Management System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">HRMIS2000</div>
            </div>
            <div className="md:order-1 space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                HUMAN RESOURCES MANAGEMENT INFORMATION SYSTEM
              </h3>
              <p className="text-zinc-300 text-justify">
                The Human Resources Management Information System (HRMIS) is an all-in-one human resource management and payroll system designed to streamline HR processes.
              </p>
            </div>
          </div>

          {/* Loans Management System */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow hover:shadow-blue-500/10">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/oTOXbJBkzJY"
                  title="Demand Forecasting Solution"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">LSM2000</div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">LOANS MANAGEMENT SYSTEM</h3>
              <p className="text-zinc-300 text-justify">
                The Loans Management System (LMS) is a loan management solution used by Philippine credit cooperatives to efficiently handle member loans and payments.
              </p>
            </div>
          </div>

          {/* Carousel: Explore More Solutions */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
              Explore More <span className="text-blue-500">SOLUTIONS</span>
            </h3>

            <div className="relative overflow-hidden">
              {/* Mobile swipe hint */}
              {showSwipeHint && (
                <div className="md:hidden absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md px-8 py-4 rounded-full border border-zinc-700 text-zinc-200 text-base font-medium shadow-xl">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Swipe to explore</span>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Mobile: horizontal scroll + snap */}
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory
                  [-ms-overflow-style:none] [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden"
              >
                {solutions.map((solution, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 snap-center px-4 sm:px-6">
                    <div className="mx-auto w-full max-w-3xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/80 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[14rem] sm:min-h-[18rem] md:min-h-[16rem]">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{solution.title}</div>
                      <div className="text-blue-400 font-semibold text-base md:text-lg">{solution.code}</div>
                      <p className="text-zinc-300 text-sm sm:text-sm lg:text-base max-w-3xl text-justify leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop sliding track */}
              <div
                className="hidden md:flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${cardIndex * 100}%)` }}
              >
                {solutions.map((solution, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4 sm:px-6">
                    <div className="mx-auto w-full max-w-3xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/80 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[14rem] sm:min-h-[18rem] md:min-h-[16rem]">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{solution.title}</div>
                      <div className="text-blue-400 font-semibold text-base md:text-lg">{solution.code}</div>
                      <p className="text-zinc-300 text-sm sm:text-sm lg:text-base max-w-3xl text-justify leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop arrows */}
              <button
                onClick={prevCard}
                className="hidden md:flex w-12 h-12 absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm shadow-lg border border-zinc-600 z-10 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous solution"
              >
                <svg className="w-5 h-5 m-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextCard}
                className="hidden md:flex w-12 h-12 absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm shadow-lg border border-zinc-600 z-10 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next solution"
              >
                <svg className="w-5 h-5 m-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {solutions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCardIndex(i);
                    pauseAutoplay();
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === cardIndex
                      ? 'w-12 h-3 bg-blue-500'
                      : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to solution ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}