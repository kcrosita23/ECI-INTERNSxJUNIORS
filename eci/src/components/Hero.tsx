import { motion, easeInOut } from "framer-motion";


export default function HeroSection() {

const floatAnimation = {
  animate: {
    y: [0, -15, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: easeInOut,
  },
};



  return (
    
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full md:w-4/6 mx-auto px-6 sm:px-10 lg:px-20 pt-20">
        {/* Text content */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-blue-400">Empowering Innovation&nbsp;</span>
            <br className="hidden sm:block" />
            Delivering Solutions
          </h1>
          <p className="mt-6 text-base sm:text-lg text-zinc-300">
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
      </div>

      {/* Logos - Background on mobile, right side on desktop */}
      <div className="absolute inset-0 md:relative w-full md:w-1/2 md:h-[420px] flex items-center justify-center md:justify-end opacity-20 md:opacity-100 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center md:block">
          {/* Logo 1 */}
          <motion.div
  {...floatAnimation}
  transition={{ ...floatAnimation.transition, duration: 5 }}
  className="absolute w-full top-120 left-52 -translate-x-1/2 -translate-y-1/2 md:top-12 md:right-0 md:left-10 md:translate-x-0 md:translate-y-0 z-10"
>
  <div className="relative opacity-30 md:opacity-100">
    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl" />
    <img
      src="logo1.webp"
      alt="ECI Logo"
      className="relative w-60 md:w-72 rounded-full bg-white"
    />
  </div>
</motion.div>

          {/* Logo 2 */}
          <motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 0.5,
  }}
  className="absolute w-full top-150 left-102 -translate-x-1/2 -translate-y-1/2 md:top-60 md:right-0 md:left-70 md:translate-x-0 md:translate-y-0"
>
  <div className="relative opacity-30 md:opacity-100">
    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl" />
    <img
      src="logo2.webp"
      alt="Magic Logo"
      className="relative w-32 md:w-52 rounded-full bg-white"
    />
  </div>
</motion.div>

        </div>
      </div>

    </section>
  );
}