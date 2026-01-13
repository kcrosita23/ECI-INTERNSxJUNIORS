import { Send, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";


/* ================= GLOBAL COUNTRIES ================= */
const COUNTRIES = getCountries().map((c) => ({
  iso: c,
  name: new Intl.DisplayNames(["en"], { type: "region" }).of(c),
  code: `+${getCountryCallingCode(c)}`
}));


const EMAIL_MAX_LENGTH = 254;

/* ================= GLOBAL AUTO-CORRECT ================= */
const autoCorrectPhone = (countryISO: string, input: string) => {
  let digitsOnly = input.replace(/\D/g, "");
  if (digitsOnly.startsWith("0")) digitsOnly = digitsOnly.slice(1);
  return digitsOnly;
};

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

  /* ================= NAME ================= */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setFullName(value);
  };

  /* ================= PHONE ================= */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // Remove non-digits
    let digitsOnly = raw.replace(/\D/g, "");

    // Remove leading 0 if country uses it as national prefix
    if (digitsOnly.startsWith("0")) digitsOnly = digitsOnly.slice(1);

    // Auto-detect country if user types "+"
    if (raw.startsWith("+")) {
      try {
        const parsed = parsePhoneNumberFromString(raw);
        if (parsed?.country) setCountryISO(parsed.country);
      } catch {}
    }

    // Get max national length for the selected country
    let maxLength = 15; // fallback
    try {
      const example = getExampleNumber(countryISO);
      if (example) {
        maxLength = example.nationalNumber.length;
      }
    } catch {}

    // Limit input to the country-specific max digits
    digitsOnly = digitsOnly.slice(0, maxLength);

    // Format live
    const formatted = new AsYouType(countryISO).input(digitsOnly);
    setPhone(formatted);

    // Validate phone
    const parsedCheck = parsePhoneNumberFromString(formatted, countryISO);
    if (
      parsedCheck &&
      parsedCheck.isValid() &&
      isValidNumberForRegion(parsedCheck.number, countryISO)
    ) {
      setPhoneError("");
    } else {
      setPhoneError(`Phone number must be ${maxLength} digits for ${countryISO}.`);
    }
  };

  /* ================= EMAIL ================= */
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ? ""
      : "Please enter a valid email address.";

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) return setEmailError(validateEmail(email));
    if (phoneError) return;
    if (department === "Other" && !service) return alert("Please select a service.");

    console.log({
      fullName,
      department,
      service: department === "Other" ? service : null,
      phone,
      email,
      message
    });

    alert("Form submitted!");
  };

  return (
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

          {/* ================= MAP ================= */}
          <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-black/60 backdrop-blur-md text-white text-center text-lg font-semibold">
              Visit Us
            </div>

            <div className="relative w-full aspect-[4/3] md:aspect-square">
              <iframe
                title="Everywhere Consulting Inc Location"
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* ================= FORM ================= */}
          <div className="p-10 bg-slate-900">
            <h3 className="text-3xl font-semibold text-white mb-8">Inquiries</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setService("");
                }}
                className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
              >
                <option>Sales Management Group</option>
                <option>Technical Support Group</option>
                <option>Other</option>
              </select>

              {department === "Other" && (
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                >
                  <option value="">--- Services ---</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              )}

              <input
                value={fullName}
                onChange={handleNameChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
              />

              <div className="flex gap-2">
                <select
                  value={countryISO}
                  onChange={(e) => setCountryISO(e.target.value)}
                  className="px-3 bg-slate-800 rounded-xl text-white"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.iso}>
                      {c.name} ({c.code})
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

              {phoneError && <p className="text-sm text-red-400">{phoneError}</p>}

              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
              />

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
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
