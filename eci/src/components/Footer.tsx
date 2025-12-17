import Base from "./Base";

const Footer = () => {
  return (
    <Base>
    <footer className="w-full px-10 bg-gradient-to-r from-[#071a33] via-[#06122a] to-[#040c20] text-white">

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />
      <div className="mx-auto w-full px-6 md:px-0 py-8">

        <div
          className="
            flex flex-col gap-6 text-sm
            md:grid md:grid-cols-3 md:items-center
          "
        >

          {/* LOGOS */}
          <div className="order-1 md:order-2 flex items-center justify-center gap-4">
            <img
              src="/bsu.webp"
              alt="Batangas State University Logo"
              className="
                h-10 md:h-12 object-contain
                transition-all duration-300
                hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
              "
            />
            <img
              src="/logo1.webp"
              alt="ECI Logo"
              className="
                h-10 md:h-12 object-contain
                transition-all duration-300
                hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]
              "
            />
            <img
              src="/CSU-CICS logo.png"
              alt="Cagayan State University Logo"
              className="
                h-11 md:h-14 object-contain
                transition-all duration-300
                hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]
              "
            />
          </div>

          {/* DEVELOPED BY */}
          <div className="order-2 md:order-1 text-center md:text-left space-y-1">
            <p className="text-slate-300">Developed by Student of</p>
            <p className="font-semibold">
              Batangas State University JPLPC – Malvar Campus
            </p>
          </div>

          {/* ENHANCED BY */}
          <div className="order-3 md:order-3 text-center md:text-right space-y-1">
            <p className="text-slate-300">Enhanced by Students of</p>
            <p className="font-semibold">
              Cagayan State University – Gonzaga Campus
            </p>
          </div>
        </div>

        {/* ALL RIGHTS RESERVED */}
        <div className="order-4 mt-6 text-center text-sm text-slate-300">
          <p>
            © All rights reserved {new Date().getFullYear()} —{" "}
            <span className="font-semibold text-white">
              Everywhere Consulting Inc.
            </span>
          </p>
        </div>

      </div>
    </footer>
    </Base>
  );
};

export default Footer;
