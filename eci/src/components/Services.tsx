import { useState, useEffect } from 'react';
import { Wrench, GraduationCap, Code, Shield, ChevronRight } from 'lucide-react';

// Base component
const Base = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`w-full max-w-[1680px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Wrench,
      title: 'Technical Support',
      color: 'from-blue-500 to-cyan-500',
      items: ['Programming/Installation Assistance at ECI Office'],
      description: 'Expert technical assistance for all your programming and installation needs'
    },
    {
      icon: GraduationCap,
      title: 'Training',
      color: 'from-purple-500 to-pink-500',
      items: ['Magic XPA Developer Training 5 days at ECI Office'],
      description: 'Comprehensive training programs to elevate your team\'s capabilities'
    },
    {
      icon: Code,
      title: 'Custom Software Development',
      color: 'from-emerald-500 to-teal-500',
      items: [
        'Design, create, deploy, and maintain secure software applications',
        'Tailored to specific business needs',
        'On time and within budget',
        'Integrated cybersecurity best practices'
      ],
      description: 'End-to-end software solutions with security at the core'
    },
    {
      icon: Shield,
      title: 'Cybersecurity Services',
      color: 'from-orange-500 to-red-500',
      items: [
        'Vulnerability Assessment and Penetration Testing (VAPT)',
        'Cybersecurity Posture Assessment',
        'Security readiness evaluation'
      ],
      description: 'Comprehensive security services to protect your digital assets'
    }
  ];

  return (
    <Base>
      <section id="services" className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-hidden scroll-mt-16">
        {/* Background effects */}
        <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 px-6 lg:px-8 py-20">
          {/* Header */}
          <div 
            id="services-header" 
            data-animate 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['services-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              We Empower Your Business
            </h2>
            <p className="text-xl md:text-2xl text-blue-400 font-light">
              with Expert Support, Training & Custom Software Solutions
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  id={`service-${index}`}
                  data-animate
                  className={`group relative bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer ${
                    isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveService(index)}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-zinc-400 mb-6 font-light">{service.description}</p>
                    
                    {/* Items List */}
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3 group/item">
                          <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover/item:translate-x-1 transition-transform" />
                          <span className="text-zinc-300 font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div 
            id="nav-buttons" 
            data-animate
            className={`mt-16 transition-all duration-1000 ${
              isVisible['nav-buttons'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Primary CTA */}
            <div className="text-center mb-8">
              <a 
                href="#contacts"
                className="inline-block px-10 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/50 font-medium transform hover:scale-105 duration-300"
              >
                Contact Us
              </a>
            </div>

            {/* Secondary Navigation */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#home"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-light text-sm"
              >
                Back to Home
              </a>
              <a
                href="#products"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-light text-sm"
              >
                View Products
              </a>
              <a
                href="#solutions"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-light text-sm"
              >
                Our Solutions
              </a>
              <a
                href="#partners"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-light text-sm"
              >
                Partners
              </a>
            </div>
          </div>
        </div>

        {/* Bottom transition gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900" />
      </section>
    </Base>
  );
}