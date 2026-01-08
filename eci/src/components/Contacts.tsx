import { Send, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const COUNTRIES = [
  { name: "Philippines", code: "+63", max: 10 },
  { name: "United States", code: "+1", max: 10 },
  { name: "United Kingdom", code: "+44", max: 10 },
  { name: "Australia", code: "+61", max: 9 },
  { name: "Japan", code: "+81", max: 10 },
];

const EMAIL_MAX_LENGTH = 254;

export default function Contacts() {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    setFullName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setPhone(digitsOnly.slice(0, country.max));
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, EMAIL_MAX_LENGTH);
    setEmail(value);

    if (!value) {
      setEmailError("");
      return;
    }

    setEmailError(validateEmail(value));
  };

  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    const capitalized = value.replace(
      /(^\s*\w|[.!?]\s*\w)/g,
      (char) => char.toUpperCase()
    );

    setMessage(capitalized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationResult = validateEmail(email);
    if (emailValidationResult) {
      setEmailError(emailValidationResult);
      return;
    }

    alert("Form submitted!");
    // TODO: send form data to backend
  };

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
            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Company Overview
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Everywhere Consulting Inc. is a professional Information
                Technology consulting and solutions firm headquartered in Makati
                City, Metro Manila, Philippines.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Our Services
              </h3>
              <p className="text-slate-300 leading-relaxed">
                IT consulting, custom software development, system integration,
                cybersecurity support, and technology implementation services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Our Mission
              </h3>
              <p className="text-slate-300 leading-relaxed">
                To deliver reliable, scalable, and secure technology solutions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                Core Values
              </h3>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>Client-Centric Engagement</li>
                <li>Integrity and Accountability</li>
                <li>Innovation and Excellence</li>
                <li>Reliability and Quality</li>
              </ul>
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
            {/* LOCATION */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700">
              <iframe
                className="w-full h-full min-h-[450px]"
                loading="lazy"
                src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 text-white">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  Makati City, Metro Manila, Philippines
                </div>
                <a
                  href="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati"
                  target="_blank"
                  className="mt-2 inline-flex items-center gap-1 text-xs underline"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* FORM */}
            <div className="p-10 bg-slate-900">
              <h3 className="text-3xl font-semibold text-white mb-8">
                Send a Message
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-slate-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={handleNameChange}
                    placeholder="Juan Dela Cruz"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={country.code}
                      onChange={(e) =>
                        setCountry(
                          COUNTRIES.find((c) => c.code === e.target.value)!
                        )
                      }
                      className="px-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      inputMode="numeric"
                      placeholder="Phone number"
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    maxLength={EMAIL_MAX_LENGTH}
                    onChange={handleEmailChange}
                    placeholder="delacruzjuan@example.com"
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl focus:ring-2 focus:outline-none text-white ${
                      emailError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-700 focus:ring-indigo-500"
                    }`}
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-400">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
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
