import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export function Contacts() {
  return (
    <section id="contacts" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Left Info Panel */}
          <div className="p-10 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4">Let’s Connect</h2>
              <p className="text-white/80 mb-10">
                Have a project in mind or just want to say hi?  
                Fill in the form and I’ll get back to you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6" />
                  <span>kimterrence.dev@gmail.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6" />
                  <span>+63 9XX XXX XXXX</span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6" />
                  <span>Philippines</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/60 mt-10">
              © {new Date().getFullYear()} Kim Terrence
            </p>
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
                  placeholder="Tell me about your project..."
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
  );
}
