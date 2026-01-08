export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative bg-zinc-900 text-white overflow-hidden py-20"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-500">
            Solutions
          </h2>
          <p className="text-lg text-zinc-400 mt-4 max-w-3xl mx-auto">
            Powerful software solutions designed to streamline operations and
            drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">

          {/* ================= Solution 1 ================= */}
          <div className="bg-zinc-800/30 border border-blue-500/30 border-b-4 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl ring-1 ring-blue-500/10 transition-shadow duration-300">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_1"
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
              <p className="text-zinc-300">
                The Electric Billing System (EBS) is widely used by electric
                cooperatives across the Philippines for efficient billing,
                collection, and reporting.
              </p>
            </div>
          </div>

          {/* ================= Solution 2 (Reversed) ================= */}
          <div className="bg-zinc-800/30 border border-blue-500/30 border-b-4 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl ring-1 ring-blue-500/10 transition-shadow duration-300">
            <div className="md:order-2">
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_2"
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
              <p className="text-zinc-300">
                CMS automates consumer applications, complaints, and record
                management to improve service efficiency and reporting.
              </p>
            </div>
          </div>

          {/* ================= Solution 3 ================= */}
          <div className="bg-zinc-800/30 border border-blue-500/30 border-b-4 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl ring-1 ring-blue-500/10 transition-shadow duration-300">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_3"
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
              <p className="text-zinc-300">
                GAS manages financial transactions, purchasing, inventory, and
                reporting with seamless system integration.
              </p>
            </div>
          </div> 

          {/* ================= Solution 4 (Reversed) ================= */}
          <div className="bg-zinc-800/30 border border-blue-500/30 border-b-4 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl ring-1 ring-blue-500/10 transition-shadow duration-300">
            <div className="md:order-2">
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_4"
                  title="Inventory Management System"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                IMS200
              </div>
            </div>

            <div className="md:order-1 space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                INVENTORY MANAGEMENT SYSTEM
              </h3>
              <p className="text-zinc-300">
                IMS provides real-time inventory tracking, stock control, and
                warehouse operation management.
              </p>
            </div>
          </div> 

          {/* ================= Solution 5 ================= */}
          <div className="bg-zinc-800/30 border border-blue-500/30 border-b-4 rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl ring-1 ring-blue-500/10 transition-shadow duration-300">
            <div>
              <div className="w-full rounded-3xl overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID_5"
                  title="Demand Forecasting Solution"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-blue-400 font-semibold">
                DFS200
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-bold">
                DEMAND FORECASTING SOLUTION
              </h3>
              <p className="text-zinc-300">
                DFS uses predictive analytics to forecast demand and optimize
                procurement, production, and planning.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
