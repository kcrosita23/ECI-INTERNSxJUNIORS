import { useState, useEffect, useRef } from 'react';

export default function Solutions() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const visibleCount = 1;

  const solutions = [
    {
    
      title: 'ELECTRIC METER READER',
      code: '(EMR200)',
      description: 'The Electric Meter Reader (EMR) is astate-of-the-art mobile application used to capture and store meter readings from electric or water meters. It also collects non-meter-reading information, including meter conditions, hazardous conditions, tamper data, survey responses, and high/low reading checks.',
      color: 'cyan'
    },
    {
    
      title: 'WAREHOUSING & INVENTORY SYSTEM',
      code: '(WIS2000)',
      description: 'The Warehousing & Inventory System (WIS) is designed to assist electric utilities in managing materials effectively. It generates essential inventory reports, such as material balances, summaries of releases, received materials (BIN Card), total project costs, and more.',
      color: 'blue'
    },
    {

      title: 'COMPUTERIZED ACCOUNTING SYSTEM',
      code: '(CAS2000)',
      description: 'The Computerized Accounting System (CAS) is an ACAM/BSUP-ready solution designed to effectively handle and manage the complex financial processes of Philippine electric utilities, thereby improving their operations and performance.',
      color: 'purple'
    },
    {
 
      title: 'CUSTOMER INFORMATION MANAGEMENT SYSTEM',
      code: '(CIMS200)',
      description: 'The Customer Information Management System (CIMS) seamlessly combines EBS2000 and CMS2000 to enhance billing precision, streamline customer data management, and boost service efficiency for both businesses and their customers.',
      color: 'teal'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(() => setCardIndex((p) => (p + 1) % solutions.length), 30000);
    return () => clearInterval(t);
  }, [isAutoPlaying, solutions.length]);

  // always show one card at a time
  const maxIndex = Math.max(0, solutions.length - visibleCount);
  const nextCard = () => setCardIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prevCard = () => setCardIndex((p) => (p <= 0 ? maxIndex : p - 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 50) prevCard();
    else if (dx < -50) nextCard();
  };
  return (
    <section
      id="solutions"
      className="relative text-white overflow-hidden py-20"
    >
      {/* Gradient background*/}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 py-20 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-4xl lg:text-[3rem] xl:text-6xl font-bold leading-tight">
            OUR <span className="text-blue-500">SOLUTIONS</span>
          </h1>
          <h2 className="text-xl md:text-1xl text-zinc-400 font-light mt-4 max-w-3xl mx-auto">
            Powerful software solutions designed to streamline operations and drive business growth.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10">

          {/* ================= Solution 1 ================= */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow duration-300">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/G4gylK0iTBA"
                  title="Electric Billing System"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                EBS2000
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                ELECTRIC BILLING SYSTEM
              </h3>
              <p className="text-zinc-300 text-justify">
                The Electric Billing System (EBS) is the most widely used billing and collection system among the various electric cooperatives across the Philippines. 
                Everywhere Consulting, Inc. designed, developed, and deployed EBS2000, which is based on the original DOS-based Electric Billing System previously implemented by Questronix Corporation, our parent company.
              </p>
            </div>
          </div>

          {/* carousel moved below (after Solution 5) */}

          {/* ================= Solution 2 (Reversed) ================= */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow duration-300">
            <div className="md:order-2">
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/wBCEAtdEmwE"
                  title="Consumer Management System"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                CMS2000
              </div>
            </div>

            <div className="md:order-1 space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                CONSUMER MANAGEMENT SYSTEM
              </h3>
              <p className="text-zinc-300 text-justify">
                The Consumer Management System (CMS) is an integrated solution that automates the manual processes of consumer application and records maintenance. 
                The system provides tools to accept consumer complaints and requests and to generate the necessary "Orders" required to address those complaints and/or requests. 
                It automatically updates consumer records based on the actions taken and the feedback provided by the crew. Reports can be generated for statistical analysis of crew performance, consumer maintenance history, and more.
              </p>
            </div>
          </div>

          {/* ================= Solution 3 ================= */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow duration-300">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ZJkKPV8dEsg"
                  title="General Accounting System"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                GAS2000
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                GENERAL ACCOUNTING SYSTEM
              </h3>
              <p className="text-zinc-300 text-justify">
                The General Accounting System (GAS) helps businesses efficiently record and manage financial transactions. 
                It includes features for purchasing, warehouse management, and file maintenance to track supplies and records. 
                The system also allows users to create lookup codes to streamline transaction processing. GAS2000 is integrated with CAS2000 and WIS2000 to provide a seamless accounting experience.
              </p>
            </div>
          </div> 

          {/* ================= Solution 4 (Reversed) ================= */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow duration-300">
            <div className="md:order-2">
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/KMbvA2LL4ks"
                  title="Inventory Management System"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                HRMIS2000
              </div>
            </div>

            <div className="md:order-1 space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                HUMAN RESOURCES MANAGEMENT INFORMATION SYSTEM
              </h3>
              <p className="text-zinc-300 text-justify">
               The Human Resources Management Information System (HRMIS) is an all-in-one human resource management and payroll system designed to streamline HR processes. 
               It helps businesses manage payroll, employee records, attendance tracking, and performance appraisals, ensuring efficient and organized HR operations. With its user-friendly interface, HRMIS2000 simplifies HR tasks and enhances workforce management.
              </p>
            </div>
          </div> 

          {/* ================= Solution 5 ================= */}
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl transition-shadow duration-300">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/oTOXbJBkzJY"
                  title="Demand Forecasting Solution"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                LSM2000
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                LOANS MANAGEMENT SYSTEM
              </h3>
              <p className="text-zinc-300 text-justify">
               The Loans Management System (LMS) is a loan management solution used by Philippine credit cooperatives to efficiently handle member loans and payments.
                It includes key features such as a security menu for managing user access, an audit trail for tracking system activities, loan history display, and member ledger inquiry for easy financial monitoring. 
                With its streamlined interface, LMS2000 enhances accuracy and simplifies loan management processes.
              </p>
            </div>
          </div>

          {/* ================= Bottom 4-card Carousel (moved here) ================= */}
          <div className="mt-12 max-w-7xl mx-auto w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Explore More <span className="text-blue-500">SOLUTIONS</span></h3>

            <div className="relative">
              <div
                className="rounded-2xl relative"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div className="relative min-h-[14rem]">
                  {solutions.map((solution, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                        idx === cardIndex ? 'opacity-100 relative z-10' : 'opacity-0 pointer-events-none'
                      }`}
                      aria-hidden={idx === cardIndex ? 'false' : 'true'}
                    >
                      <div className="mx-auto max-w-4xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/80 rounded-2xl p-10 h-full flex flex-col items-center justify-center gap-4 text-center">
                          <div className="text-2xl md:text-3xl font-bold">{solution.title}</div>
                          <div className="text-blue-400 font-semibold mt-2">{solution.code}</div>
                          <p className="text-zinc-300 mt-4 text-sm md:text-base max-w-2xl text-justify">{solution.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevCard}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm p-2 rounded-full border border-zinc-600 z-10"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextCard}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm p-2 rounded-full border border-zinc-600 z-10"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {solutions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCardIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === cardIndex ? 'w-12 h-3 bg-blue-500' : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
