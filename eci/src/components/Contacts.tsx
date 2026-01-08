import { Send, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { createClient } from "@supabase/supabase-js";
import process from "process";

/* ================= GLOBAL COUNTRIES ================= */
const COUNTRIES = getCountries().map((c) => ({
  iso: c,
  code: `+${getCountryCallingCode(c)}`,
}));

/* ================= SUPABASE CLIENT ================= */
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

const EMAIL_MAX_LENGTH = 254;

export default function Contacts() {
  const [countryISO, setCountryISO] = useState<CountryCode>("PH");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= NAME ================= */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setFullName(value);
  };

  /* ================= PHONE ================= */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatter = new AsYouType(countryISO);
    const formatted = formatter.input(raw);
    setPhone(formatted);

    const parsed = parsePhoneNumberFromString(formatted, countryISO);
    if (parsed && parsed.isValid()) setPhoneError("");
    else setPhoneError("Invalid phone number for selected country.");
  };

  /* ================= EMAIL ================= */
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(value)
      ? ""
      : "Please enter a valid email address.";
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, EMAIL_MAX_LENGTH);
    setEmail(value);
    setEmailError(value ? validateEmail(value) : "");
  };

  /* ================= MESSAGE ================= */
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const capitalized = e.target.value.replace(
      /(^\s*\w|[.!?]\s*\w)/g,
      (c) => c.toUpperCase()
    );
    setMessage(capitalized);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailCheck = validateEmail(email);
    if (emailCheck) return setEmailError(emailCheck);
    if (phoneError) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("contacts").insert([
      {
        full_name: fullName,
        phone: phone,
        country_iso: countryISO,
        email: email,
        message: message,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      alert("Failed to submit. Please try again.");
      console.error(error);
    } else {
      alert("Form submitted successfully!");
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }
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
                Everywhere Consulting Inc. is a professional IT consulting and
                solutions firm headquartered in Makati City, Metro Manila,
                Philippines.
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
              <div className="relative w-full aspect-[4/3] md:aspect-square">
                <iframe
                  title="Everywhere Consulting Inc Location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                  src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 text-white">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  Makati City, Metro Manila, Philippines
                </div>
                <a
                  href="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati"
                  target="_blank"
                  rel="noopener noreferrer"
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
                <input
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

                <div className="flex gap-2">
                  <select
                    value={countryISO}
                    onChange={(e) => setCountryISO(e.target.value as CountryCode)}
                    className="px-3 bg-slate-800 rounded-xl text-white"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.iso} value={c.iso}>
                        {c.iso} ({c.code})
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone number"
                    className="flex-1 px-4 py-3 bg-slate-800 rounded-xl text-white"
                  />
                </div>
                {phoneError && (
                  <p className="text-sm text-red-400">{phoneError}</p>
                )}

                <input
                  type="email"
                  value={email}
                  maxLength={EMAIL_MAX_LENGTH}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />
                {emailError && (
                  <p className="text-sm text-red-400">{emailError}</p>
                )}

                <textarea
                  rows={4}
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Message"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl text-white disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
