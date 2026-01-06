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
        {/* Updated border color to match Zinc theme */}
        <div className="flex-grow border-t border-zinc-800"></div>
        <span className="flex-shrink-0 mx-4 text-lg font-bold text-blue-400 uppercase tracking-widest">
          {title}
        </span>
        <div className="flex-grow border-t border-zinc-800"></div>
      </div>

      {/* Flex container for centering */}
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 items-center">
        {items.map((partner, index) => (
          <div
            key={index}
            className="group flex items-center justify-center w-32 md:w-40"
          >
            <div className="h-20 w-full flex items-center justify-center relative">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain 
                   opacity-100 
                   drop-shadow-[0_0_0.5px_#fff] 
                   group-hover:opacity-100 group-hover:scale-110 
                   transition-all duration-300 ease-in-out bg-transparent bg-white rounded-lg md:bg-transparent"
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
    // Changed main BG to zinc-900 to match Products
    <section id="partners" className=" py-20 lg:py-28 relative overflow-hidden">
      
      {/* --- BACKGROUND FROM PRODUCTS COMPONENT --- */}
      <div className="pointer-events-none absolute inset-0">
         {/* Top Left Orb */}
         <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
         
         {/* Bottom Right Orb */}
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
         
         {/* Center Orb */}
         <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
         
         {/* Gradient Overlay to blend edges */}
         <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>
      {/* ------------------------------------------ */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Trusted <span className="text-blue-500">Partners</span>
          </h2>
          {/* Updated text color to zinc-400 */}
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            We collaborate with industry leaders to deliver exceptional solutions. 
            Together, we innovate and drive success for our clients nationwide.
          </p>
        </div>

        {/* Partner Sections */}
        <PartnerGroup title="Corporate" items={partners} />
        <PartnerGroup title="Utility" items={partners_util} />
        <PartnerGroup title="Public-Sector" items={partners_pub} />

      </div>
    </section>
  );
};

export default Partners;