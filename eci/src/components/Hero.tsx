export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Content wrapper */}
      <div className="relative flex z-10 w-full mx-auto px-6 sm:px-10 lg:px-20  gap-12 items-center">
        {/* Text content */}
        <div className="text-center md:text-left md:w-4/8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-blue-400">Empowering Innovation</span>
            <br className="hidden sm:block" />
            &nbsp;Delivering Solutions
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 w-full">
            Everywhere Consulting Inc. (ECI) is a recognized system integrator and software
            solutions provider in the IT industry, offering solutions that work for clients.
            ECI is the exclusive distributor of Magic Software and Actian Zen (PSQL).
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition shadow-lg">
              About Us
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
              View Services
            </button>
          </div>
        </div>

        {/* Logo / Image */}
        {/* Logo / Background image */}
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center md:static md:pointer-events-auto md:justify-end z-5 -left-30">
          <div className="relative opacity-10 md:opacity-100">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl" />
            <img
              src="logo1.webp"
              alt="ECI Logo"
              className="relative w-60 sm:w-96 md:w-80 lg:w-100 rounded-full mx-auto sm:bg-white"
            />
          </div>
        </div>

         <div className="pointer-events-none fixed inset-0 flex items-center justify-center  md:pointer-events-auto md:justify-end md:top-90 md:right-40 top-60 -right-50">
          <div className="relative opacity-10 md:opacity-100">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl" />
            <img
              src="logo2.webp"
              alt="Magic Logo"
              className="relative w-40 sm:w-96 md:w-80 lg:w-70 rounded-full mx-auto bg-white"
            />
          </div>
        </div>
      </div>
      
    </section>
  );
}
