import {
  MonitorCheck,
  Code2,
  Headset,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "TECHNICAL SUPPORT",
    icon: BarChart3,
    description: "Programming/Installation Assistance at ECI Office.",
  },
  {
    id: 2,
    title: "TRAINING",
    icon: MonitorCheck,
    description: "Magic XPA Developer Training 5 days Training at ECI Office.",
  },
  {
    id: 3,
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    icon: Code2,
    description:
      "ECI has the experience to help design, create, deploy, and maintain secure and reliable software applications tailored to specific business needs, on time and within the budget. Our approach integrates cybersecurity best practices throughout the development lifecycle to ensure protection from evolving threats.",
  },
  {
    id: 4,
    title: "CYBERSECURITY SERVICES",
    icon: Headset,
    description:
      "Vulnerability Assessment and Penetration Testing (VAPT) to identify and address security gaps. Cybersecurity Posture Assessment to evaluate and strengthen your organization’s overall security readiness.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-950 text-white relative">
      {/* Changed: 'flex-col' for mobile, 'lg:grid' for desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 max-w-7xl mx-auto">
        
        {/* LEFT — Header (Sticky on Desktop, Static on Mobile) */}
        {/* Changed: Added responsive padding, height, and font sizes */}
        <div className="relative flex flex-col justify-center px-6 py-12 lg:px-16 lg:sticky lg:top-0 lg:h-screen bg-slate-950 z-10">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            We Empower Your Business with Expert Support,{" "}
            <span className="text-blue-500">
              Training & Custom Software Solutions!
            </span>
          </p>
        </div>

        {/* RIGHT — Scrolling Content */}
        {/* Changed: Border is top on mobile, left on desktop */}
        <div className="border-t border-slate-800 lg:border-t-0 lg:border-l">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                // Changed: min-h-[50vh] for mobile (so it doesn't take full height if not needed), h-screen for desktop
                // Changed: px-6 for mobile, px-20 for desktop
                className="min-h-[60vh] lg:h-screen flex items-center px-6 py-10 lg:px-20 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  // Changed: Lowered threshold slightly so it triggers earlier on mobile
                  viewport={{ once: false, amount: 0.3 }} 
                  
                  // Changed: Mobile padding p-6, Desktop p-12
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 lg:p-12 hover:border-blue-500 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <Icon className="text-blue-500" size={42} />
                    <h3 className="text-xl lg:text-2xl font-semibold">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 leading-relaxed text-base lg:text-lg max-w-2xl">
                    {service.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}