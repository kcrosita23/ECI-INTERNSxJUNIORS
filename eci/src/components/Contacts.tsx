import {    Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contacts() {
  return (
    <>  
      {/* ================= ABOUT US ================= */}
      <section
        id="about"
        className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-12"
        >
          <h2 className="text-4xl font-bold text-white mb-10">
            About Everywhere Consulting Inc.
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Company Overview */}
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Company Overview
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Everywhere Consulting Inc. is a professional Information
                Technology consulting and solutions firm headquartered in Makati
                City, Metro Manila, Philippines. We deliver strategic,
                technology-driven services to organizations seeking to enhance
                operational efficiency, security, and digital capability.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Our Services
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We provide IT consulting, custom software development, system
                integration, cybersecurity support, and technology
                implementation services aligned with business objectives and
                industry best practices.
              </p>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Our Mission
              </h3>
              <p className="text-slate-300 leading-relaxed">
                To deliver reliable, scalable, and secure technology solutions
                that enable organizations to adapt, innovate, and sustain
                long-term success in an increasingly digital environment.
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Core Values
              </h3>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>Client-Centric Engagement</li>
                <li>Integrity, Transparency, and Accountability</li>
                <li>Excellence through Innovation</li>
                <li>Reliability, Quality, and Continuous Improvement</li>
              </ul>
            </div>
          </div>

          {/* Vision */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Corporate Vision
            </h3>
            <p className="text-slate-300 leading-relaxed">
              To be a trusted and respected technology consulting partner,
              recognized for delivering impactful digital solutions that support
              sustainable growth and operational excellence across industries.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Company Milestones
            </h3>

            <div className="space-y-4 text-slate-300">
              <div>
                <span className="font-semibold text-white">Establishment</span> –
                Founded to provide professional IT consulting and advisory
                services.
              </div>
              <div>
                <span className="font-semibold text-white">
                  Service Expansion
                </span>{" "}
                – Expanded capabilities to include software development, system
                integration, and cybersecurity solutions.
              </div>
              <div>
                <span className="font-semibold text-white">Present Day</span> –
                Supporting organizations with secure, scalable, and future-ready
                technology solutions.
              </div>
            </div>
          </div>

          {/* ================= KEY SERVICES ================= */}
<div className="mt-12">
  <h3 className="text-2xl font-semibold text-white mb-6">
    Key Services
  </h3>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-indigo-400 mb-2">
        IT Consulting
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed">
        Strategic technology consulting to align IT solutions with business
        goals and operational requirements.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-indigo-400 mb-2">
        Software Development
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed">
        Custom web and application development using modern, scalable, and
        secure technologies.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-indigo-400 mb-2">
        System Integration
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed">
        Seamless integration of systems and platforms to improve efficiency
        and data consistency.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-indigo-400 mb-2">
        Cybersecurity Solutions
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed">
        Security assessments, implementation, and support to protect systems,
        data, and infrastructure.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-indigo-400 mb-2">
        Technology Implementation
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed">
        End-to-end deployment and configuration of enterprise technology
        solutions.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-lg font-semibold text-indigo-400 mb-2">
        Ongoing Support & Maintenance
      </h4>
      <p className="text-slate-300 text-sm leading-relaxed">
        Continuous system monitoring, maintenance, and technical support for
        long-term reliability.
      </p>
    </div>
  </div>
</div>

        </motion.div>
      </section>

      {/* ================= CONTACTS ================= */}
      <section
        id="contacts"
        className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Info Panel */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-between">
              <iframe className="h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1604.6209261494116!2d121.0109533794569!3d14.550722225337761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c95fce6140a1%3A0xb4dd46c13f812c2f!2sEverywhere%20Consulting%2C%20Inc.!5e0!3m2!1sen!2sph!4v1767671311605!5m2!1sen!2sph" width="600" height="450"  loading="lazy" ></iframe>
            </div>

            {/* Right Form */}
            <div className="p-10 bg-slate-900">
              <h3 className="text-3xl font-semibold text-white mb-8">
                Send a Message
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-slate-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your inquiry or project requirements..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-4 text-white font-semibold shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
