import React from "react";

// --- Data ---
const partners = [
  {
    name: "Baguio Benguet Electric Cooperative",
    logo: "/partners/corporate/baguio.webp",
    website: "https://bbccconline.com/website/",
  },
  {
    name: "Denso Ten",
    logo: "/partners/corporate/denso.webp",
    website: "https://www.denso.com",
  },
  {
    name: "Imarflex Battery MFG Corporation",
    logo: "/partners/corporate/imarflex.webp",
    website: "http://imarflexbattery.com.ph/",
  },
  {
    name: "Innovative Investors Corporation Inc.",
    logo: "/partners/corporate/inno.webp",
    website: "https://innovative.com.ph/",
  },
  {
    name: "Innobank",
    logo: "/partners/corporate/innobank.webp",
    website: "https://www.innobankph.com/",
  },
  {
    name: "ROHM Semiconductor",
    logo: "/partners/corporate/rohm.webp",
    website: "https://www.rohm.com",
  },
  {
    name: "Gillamac",
    logo: "/partners/corporate/gillamac.webp",
    website: "https://www.gillamac.com",
  },
  {
    name: "Mitsubishi Motors",
    logo: "/partners/corporate/misyubibi.webp",
    website: "https://www.mitsubishi-motors.com.ph/",
  },
  {
    name: "Mizuho",
    logo: "/partners/corporate/mizuho.webp",
    website: "https://www.mizuhogroup.com",
  },
  {
    name: "Phimco Industries Inc.",
    logo: "/partners/corporate/phimco.webp",
    website: "https://www.phimco.com.ph",
  },
  {
    name: "Prince Warehouse Club",
    logo: "/partners/corporate/prince.webp",
    website: "https://www.princehypermart.com",
  },
  {
    name: "Silang Water District",
    logo: "/partners/corporate/silang.webp",
    website: "https://www.silangwaterdistrict.com/",
  },
];

const partners_pub = [
  {
    name: "Philippine Drug Enforcement Agency",
    logo: "/partners/public-sector/pdea.webp",
    website: "https://pdea.gov.ph",
  },
  {
    name: "Philippine National Police",
    logo: "/partners/public-sector/pnp.webp",
    website: "https://pnp.gov.ph",
  },
];

const partners_util = [
  { name: "CAGELCO", logo: "/partners/utility/cagelco.webp", website: "https://www.cagelco1.org.ph/" },
  { name: "CANORECO", logo: "/partners/utility/canereco.webp", website: "https://canoreco.com.ph/pms/" },
  { name: "COTELCO", logo: "/partners/utility/catelco.webp", website: "https://cotelco.com.ph/" },
  { name: "CEPALCO", logo: "/partners/utility/cepalcooo.webp", website: "https://www.cepalco.com.ph" },
  { name: "DANECO", logo: "/partners/utility/daneco.webp", website: "https://www.daneco.com.ph" },
  { name: "ESMELCO", logo: "/partners/utility/esmelco.webp", website: "https://www.esmelco.com.ph" },
  { name: "FIBECO", logo: "/partners/utility/fibeco.webp", website: "https://www.fibeco.ph" },
  { name: "LUELCO", logo: "/partners/utility/la union.webp", website: "https://www.luelco.com.ph" },
  { name: "LANECO", logo: "/partners/utility/laneco.webp", website: "https://www.laneco.ph" },
  { name: "NEECO", logo: "/partners/utility/neeco.webp", website: "https://www.neeco.ph" },
  { name: "OEDC", logo: "/partners/utility/oedc.webp", website: "https://www.oedc.com.ph" },
  { name: "ORMECO", logo: "/partners/utility/ormeco.webp", website: "https://www.ormeco.com.ph" },
  { name: "PANELCO", logo: "/partners/utility/panelco.webp", website: "https://www.panelco.com.ph" },
  { name: "PELCO", logo: "/partners/utility/pelco.webp", website: "https://www.pelco1.com" },
  { name: "SAMELCO", logo: "/partners/utility/samelco.webp", website: "https://www.samelco2.com.ph" },
  { name: "SATELCO", logo: "/partners/utility/satelco.webp", website: "https://www.satelco.com.ph" },
  { name: "SURNECO", logo: "/partners/utility/surneco.webp", website: "https://www.surneco.com.ph" },
  { name: "TARELCO", logo: "/partners/utility/tarelco.webp", website: "https://www.tarelco1.com.ph" },
  { name: "ZAMBECO", logo: "/partners/utility/zambeco.webp", website: "https://www.zambeco.com.ph" },
];

// --- Reusable Component ---
const PartnerGroup = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; logo: string; website: string }[];
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="relative flex py-5 items-center mb-8">
        <div className="flex-grow border-t border-zinc-800" />
        <span className="mx-4 text-lg font-bold text-blue-400 uppercase tracking-widest">
          {title}
        </span>
        <div className="flex-grow border-t border-zinc-800" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 items-center">
        {items.map((partner, index) => (
          <a
            key={index}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${partner.name} website`}
            className="group flex items-center justify-center w-32 md:w-40 cursor-pointer"
          >
            <div className="h-20 w-full flex items-center justify-center relative">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain
                  drop-shadow-[0_0_0.5px_#fff]
                  group-hover:scale-110 group-hover:brightness-110
                  transition-all duration-300 ease-in-out
                  bg-transparent bg-white rounded-lg md:bg-transparent"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Trusted <span className="text-blue-500">Partners</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            We collaborate with industry leaders to deliver exceptional solutions nationwide.
          </p>
        </div>

        <PartnerGroup title="Corporate" items={partners} />
        <PartnerGroup title="Utility" items={partners_util} />
        <PartnerGroup title="Public-Sector" items={partners_pub} />
      </div>
    </section>
  );
};

export default Partners;
