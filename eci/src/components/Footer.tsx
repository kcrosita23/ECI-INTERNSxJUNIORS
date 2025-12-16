const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#071a33] via-[#06122a] to-[#040c20] text-white">
      <div className="w-full mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

        {/* Left */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-slate-300">Developed by Student of</p>
          <p className="font-semibold">
            Batangas State University JPLPC – Malvar Campus
          </p>

          {/* Enhancement credit */}
        <p className="text-slate-300">
            Enhanced by students of Cagayan State University – Gonzaga Campus
          </p>
          
        </div>

        {/* Center (Logos) */}
        <div className="flex items-center justify-center gap-2">
          <img
            src="/bsu.webp"
            alt="Batangas State University Logo"
            className="h-10"
          />
          <img
            src="/logo1.webp"
            alt="ECI Logo"
            className="h-10"
          />
          <img
            src="/CSU-CICS logo.png"
            alt="Cagayan State University Logo"
            className="h-12"
          />
        </div>

        {/* Right */}
        <div className="text-center md:text-right">
          <p className="text-slate-300">
            All rights reserved {new Date().getFullYear()}
          </p>
          <p className="font-semibold">Everywhere Consulting Inc.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
