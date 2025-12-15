const Footer = () => {
  return (
    <footer className="max w-full bg-gradient-to-r from-[#071a33] via-[#06122a] to-[#040c20] text-white">
      <div className="max w-full mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

        {/* Left */}
        <div className="text-center md:text-left">
          <p className="text-slate-300">Developed by Student of</p>
          <p className="font-semibold">
            Batangas State University JPLPC – Malvar Campus
          </p>
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="ECI Logo"
            className="h-10"
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
