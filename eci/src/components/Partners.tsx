import React from "react";

// --- Data ---
const partners = [
  { name: "corporate Partner 1", logo: "/partners/corporate/baguio.webp" },
  { name: "corporate Partner 2", logo: "/partners/corporate/denso.webp" },
  { name: "corporate Partner 3", logo: "/partners/corporate/imarflex.webp" },
  { name: "corporate Partner 4", logo: "/partners/corporate/inno.webp" },
  { name: "corporate Partner 5", logo: "/partners/corporate/innobank.webp" },
  { name: "corporate Partner 6", logo: "/partners/corporate/rohm.webp" },
  { name: "corporate Partner 7", logo: "/partners/corporate/gillamac.webp" },
  { name: "corporate Partner 8", logo: "/partners/corporate/misyubibi.webp" },
  { name: "corporate Partner 9", logo: "/partners/corporate/mizuho.webp" },
  { name: "corporate Partner 10", logo: "/partners/corporate/phimco.webp" },
  { name: "corporate Partner 11", logo: "/partners/corporate/prince.webp" },
  { name: "corporate Partner 12", logo: "/partners/corporate/silang.webp" },
];

const partners_pub = [
  { name: "public-sector Partner 1", logo: "/partners/public-sector/pdea.webp" },
  { name: "public-sector Partner 2", logo: "/partners/public-sector/pnp.webp" },
];

const partners_util = [
  { name: "utility Partner 1", logo: "/partners/utility/cagelco.webp" },
  { name: "utility Partner 2", logo: "/partners/utility/canereco.webp" },
  { name: "utility Partner 3", logo: "/partners/utility/catelco.webp" },
  { name: "utility Partner 4", logo: "/partners/utility/cepalcooo.webp" },
  { name: "utility Partner 5", logo: "/partners/utility/daneco.webp" },
  { name: "utility Partner 6", logo: "/partners/utility/esmelco.webp" },
  { name: "utility Partner 7", logo: "/partners/utility/fibeco.webp" },
  { name: "utility Partner 8", logo: "/partners/utility/la union.webp" },
  { name: "utility Partner 9", logo: "/partners/utility/laneco.webp" },
  { name: "utility Partner 10", logo: "/partners/utility/neeco.webp" },
  { name: "utility Partner 11", logo: "/partners/utility/oedc.webp" },
  { name: "utility Partner 12", logo: "/partners/utility/ormeco.webp" },
  { name: "utility Partner 13", logo: "/partners/utility/panelco.webp" },
  { name: "utility Partner 14", logo: "/partners/utility/pelco.webp" },
  { name: "utility Partner 15", logo: "/partners/utility/samelco.webp" },
  { name: "utility Partner 16", logo: "/partners/utility/satelco.webp" },
  { name: "utility Partner 17", logo: "/partners/utility/surneco.webp" },
  { name: "utility Partner 18", logo: "/partners/utility/tarelco.webp" },
  { name: "utility Partner 19", logo: "/partners/utility/zambeco.webp" },
];

// --- Reusable Component for Section Rendering ---
const PartnerGroup = ({ title, items }: { title: string; items: { name: string; logo: string }[] }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-20">
      {/* Section Divider & Title */}
      <div className="relative flex py-5 items-center mb-8">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink-0 mx-4 text-lg font-bold text-blue-400 uppercase tracking-widest">
          {title}
        </span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 justify-items-center items-center">
        {items.map((partner, index) => (
          <div
            key={index}
            className="group flex items-center justify-center w-full"
          >
            <div className="h-20 w-full flex items-center justify-center relative">
              <img
                src={partner.logo}
                alt={partner.name}
                // KEY CHANGE: Removed 'bg-white'
                // ADDED: drop-shadow-[0_0_2px_#fff] -> This creates the white outline/stroke effect
                className="max-h-full max-w-full object-contain 
                  grayscale opacity-80 
                  drop-shadow-[0_0_2px_#fff] 
                  group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 
                  transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Partners: React.FC = () => {
  return (
    <section id="partners" className="bg-slate-950 py-20 lg:py-28 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Trusted <span className="text-blue-500">Partners</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed">
            We collaborate with industry leaders to deliver exceptional solutions. 
            Together, we innovate and drive success for our clients nationwide.
          </p>
        </div>

        {/* Partner Sections */}
        <PartnerGroup title="Corporate Partners" items={partners} />
        <PartnerGroup title="Public-Sector Partners" items={partners_pub} />
        <PartnerGroup title="Utility Partners" items={partners_util} />

      </div>
    </section>
  );
};

export default Partners;