import { motion, easeInOut, easeOut } from "framer-motion";
import Base from "./Base";
import type { Variants } from "framer-motion";
import MagicImageParticles from "./MagicImageParticles";

export default function HeroSection() {

  // Logo floating animation
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

  // Logo fade-up animation
  const logoVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: easeOut, delay: 1 }
    },
  };

  // Text fade-up animation
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    },
  }



  return (
    <Base>
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-hidden scroll-mt-16">
       <MagicImageParticles />
        {/* Background effects */}
        <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        {/* Content wrapper */}
        <div className="relative z-10 max-w-full md:w-4/6 px-6 mx-auto pr-6 sm:pl-10 md:pl-10 lg:pl-15 xl:pl-20 pt-20">
          {/* Text content */}
    
          <motion.div
            className="text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              className="text-4xl md:text-4xl lg:text-[3rem] xl:text-6xl font-bold leading-tight"
              variants={fadeUp}
            >
              <span className="text-blue-400">Empowering Innovation&nbsp;</span>
              <br className="hidden sm:block" />
              Delivering Solutions
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg text-zinc-300 font-light"
              variants={fadeUp}
            >
              Everywhere Consulting Inc. (ECI) is a recognized system integrator and software
              solutions provider in the IT industry, offering solutions that work for clients.
              ECI is the exclusive distributor of Magic Software and Actian Zen (PSQL).
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={fadeUp}
            >
              <motion.button
                className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition shadow-lg"
              >
                About Us
              </motion.button>
              <motion.button
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                View Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Logos Wrapper */}
        <motion.div
          className="absolute inset-0 md:relative w-full md:w-1/2 md:h-[420px] flex items-center justify-center md:justify-end pointer-events-none"
          variants={logoVariants}
          initial="hidden"
          animate="show"
        >
          <div className="relative w-full h-full flex items-center justify-center md:block">
            {/* Logo 1 */}
            <motion.div
              {...floatAnimation}
              className="absolute left-[40%] top-[65%] sm:left-[40%] sm:top-[60%] md:left-[30%] md:top-[20%] xl:left-[30%] xl:top-[10%] -translate-x-1/2 z-10"
            >
              <div className="relative opacity-10 md:opacity-100">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl" />
                <img
                  src="logo1.webp"
                  alt="ECI Logo"
                  className="w-60 sm:w-58 md:w-56 xl:w-74 rounded-full bg-white"
                />
              </div>
            </motion.div>

            {/* Logo 2 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: easeInOut,
                delay: 0.5,
              }}
              className="absolute left-[70%] top-[85%] sm:left-[65%] sm:top-[85%] md:left-[65%] md:top-[55%] xl:left-[65%] xl:top-[55%] -translate-x-1/2"
            >
              <div className="relative opacity-10 md:opacity-100">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-3xl" />
                <img
                  src="logo2.webp"
                  alt="Magic Logo"
                  className="w-30 sm:w-28 md:w-36 xl:w-44 rounded-full bg-white"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* bottom transition */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900" />


      </section>
    </Base>
  );
}