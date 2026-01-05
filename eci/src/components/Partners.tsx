import React from "react";

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
  { name: "utility Partner 18", logo: "/partners/utility/taraelco.webp" },
  { name: "utility Partner 19", logo: "/partners/utility/zambeco.webp" },
];

const Partners: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Our Trusted Partners
        </h2>
        <p className="mt-3 text-gray-500">
          We collaborate with industry leaders to deliver exceptional solutions. Together, we innovate and drive success for our clients nationwide
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          Corporate Partners
        </h2>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Public-Sector Partners
        </h2>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          {partners_pub.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>


        <h2 className="text-3xl font-bold text-gray-900">
          Utility Partners
        </h2>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          {partners_util.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;
