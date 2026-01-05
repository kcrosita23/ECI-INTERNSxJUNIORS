import React from "react";

const partners = [
  { name: "corporate Partner 1", logo: "/partners/corporate/baguio.webp" },
  { name: "corporate Partner 2", logo: "/partners/corporate/denso.webp" },
  { name: "corporate Partner 3", logo: "/partners/corporate/imarflex.webp" },
  { name: "corporate Partner 4", logo: "/partners/corporate/inno.webp" },
  { name: "corporate Partner 5", logo: "/partners/corporate/innobank.webp" },
  { name: "corporate Partner 6", logo: "/partners/corporate/rohm.webp" },
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
      </div>
    </section>
  );
};

export default Partners;
