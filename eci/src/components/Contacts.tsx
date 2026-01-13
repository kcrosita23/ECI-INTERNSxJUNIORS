import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
<<<<<<< HEAD
  type CountryCode,
} from "libphonenumber-js";
=======
  getExampleNumber,
  isValidNumberForRegion
} from "libphonenumber-js";
import MagicImageParticles from "./MagicImageParticles"; // Import your particle component
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e

/* ================= SERVICES ================= */
const SERVICES = [
  { id: 1, title: "Back Office Support" },
  { id: 2, title: "QA & Testing" },
  { id: 3, title: "App Development" },
  { id: 4, title: "Technical Helpdesk" },
  { id: 5, title: "IT Infrastructure" }
];

/* ================= COUNTRIES ================= */
const COUNTRIES = getCountries().map((c) => ({
  iso: c,
<<<<<<< HEAD
  code: +`${getCountryCallingCode(c)}`,
=======
  name: new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c,
  code: `+${getCountryCallingCode(c)}`
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
}));

const EMAIL_MAX_LENGTH = 254;

export default function Contacts() {
  const [countryISO, setCountryISO] = useState<CountryCode>("PH");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

<<<<<<< HEAD
  /* ================= NAME ================= */
=======
  const [department, setDepartment] = useState("Sales Management Group");
  const [service, setService] = useState("");

>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setFullName(value);
  };

<<<<<<< HEAD
  /* ================= PHONE (ENTERPRISE-GRADE) ================= */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatter = new AsYouType(countryISO);
    const formatted = formatter.input(raw);

    setPhone(formatted);

    const parsed = parsePhoneNumberFromString(formatted, countryISO);
    if (parsed && parsed.isValid()) {
=======
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = digits.slice(1);

    if (raw.startsWith("+")) {
      try {
        const parsed = parsePhoneNumberFromString(raw);
        if (parsed?.country) setCountryISO(parsed.country);
      } catch {}
    }

    let maxLength = 15;
    try {
      const example = getExampleNumber(countryISO);
      if (example) maxLength = example.nationalNumber.length;
    } catch {}

    digits = digits.slice(0, maxLength);

    const formatted = new AsYouType(countryISO).input(digits);
    setPhone(formatted);

    const parsed = parsePhoneNumberFromString(formatted, countryISO);
    if (parsed && parsed.isValid() && isValidNumberForRegion(parsed.number, countryISO)) {
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number for selected country.");
    }
  };

<<<<<<< HEAD
  /* ================= EMAIL ================= */
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(value)
=======
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
      ? ""
      : "Please enter a valid email address.";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, EMAIL_MAX_LENGTH);
    setEmail(value);
    setEmailError(value ? validateEmail(value) : "");
  };

<<<<<<< HEAD
  /* ================= MESSAGE ================= */
  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
=======
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
    const capitalized = e.target.value.replace(
      /(^\s*\w|[.!?]\s*\w)/g,
      (c) => c.toUpperCase()
    );
    setMessage(capitalized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
    const emailCheck = validateEmail(email);
    if (emailCheck) {
      setEmailError(emailCheck);
      return;
    }

    if (phoneError) {
      return;
    }

=======
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
    alert("Form submitted!");
  };

  return (
<<<<<<< HEAD
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
            {/* ================= LOCATION (INTERACTIVE RESPONSIVE MAP) ================= */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700">
              {/* Responsive Map Wrapper */}
              <div className="relative w-full aspect-[4/3] md:aspect-square">
                <iframe
                  title="Everywhere Consulting Inc Location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full border-0"
                  src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
                  allowFullScreen
                />
              </div>

              {/* Overlay Info (click-through safe) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md p-3 rounded-md text-white max-w-xs pointer-events-auto">
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
            </div>

            {/* ================= FORM ================= */}
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
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl text-white"
                >
                  <Send className="w-5 h-5" />
                  Send Message
=======
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* ===== Magic Particles Background ===== */}
      <MagicImageParticles />

      {/* ===== Gradient blobs & overlay ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* MAP */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 h-[300px] sm:h-[400px] md:h-auto">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
              />
            </div>

            {/* FORM */}
            <div className="p-6 sm:p-10 bg-slate-900">
              <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                <select value={department} onChange={(e)=>{setDepartment(e.target.value);setService("");}} className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base">
                  <option>Sales Management Group</option>
                  <option>Technical Support Group</option>
                  <option>Other</option>
                </select>

                {department === "Other" && (
                  <select value={service} onChange={(e)=>setService(e.target.value)} className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base">
                    <option value="">--- Services ---</option>
                    {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                  </select>
                )}

                <input value={fullName} onChange={handleNameChange} placeholder="Full Name" className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base"/>

                <div className="flex flex-col sm:flex-row gap-3">
                  <select value={countryISO} onChange={(e)=>setCountryISO(e.target.value)} className="px-3 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base">
                    {COUNTRIES.map(c => <option key={c.iso} value={c.iso}>{c.name} ({c.code})</option>)}
                  </select>
                  <input value={phone} onChange={handlePhoneChange} className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base"/>
                </div>

                {phoneError && <p className="text-red-400 text-sm">{phoneError}</p>}

                <input value={email} onChange={handleEmailChange} placeholder="Email" className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base"/>
                <textarea value={message} onChange={handleMessageChange} rows={4} className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white text-sm sm:text-base"/>

                <button className="w-full bg-indigo-600 py-4 rounded-xl text-white flex justify-center items-center gap-2">
                  <Send className="w-5 h-5"/> Send Message
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
                </button>
              </form>
            </div>
          </div>
        </motion.div>
<<<<<<< HEAD
      </section>
    </>
=======
      </div>
    </section>
>>>>>>> d21a87ecc13c9e563f63370032ab2ad9bf15cd8e
  );
}