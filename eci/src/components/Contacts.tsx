import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  isValidNumberForRegion
} from "libphonenumber-js";
import MagicImageParticles from "./MagicImageParticles"; // Import your particle component

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
  name: new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c,
  code: `+${getCountryCallingCode(c)}`
}));

const EMAIL_MAX_LENGTH = 254;

export default function Contacts() {
  const [countryISO, setCountryISO] = useState<string>("PH");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const [department, setDepartment] = useState("Sales Management Group");
  const [service, setService] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setFullName(value);
  };

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
      setPhoneError("");
    } else {
      setPhoneError(`Phone number must be ${maxLength} digits for ${countryISO}.`);
    }
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ? ""
      : "Please enter a valid email address.";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, EMAIL_MAX_LENGTH);
    setEmail(value);
    setEmailError(value ? validateEmail(value) : "");
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const capitalized = e.target.value.replace(
      /(^\s*\w|[.!?]\s*\w)/g,
      (c) => c.toUpperCase()
    );
    setMessage(capitalized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) return setEmailError(validateEmail(email));
    if (phoneError) return;
    if (department === "Other" && !service) return alert("Please select a service.");

    alert("Form submitted!");
  };

  return (
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
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
