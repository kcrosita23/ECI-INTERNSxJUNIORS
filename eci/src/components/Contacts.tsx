import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";
import MagicImageParticles from "./MagicImageParticles";

/* ================= EMAILJS CONFIG ================= */
const EMAILJS_SERVICE_ID = "service_3rvqdj9";
const EMAILJS_TEMPLATE_ID = "template_iisswnz";
const EMAILJS_PUBLIC_KEY = "sqyS3A3Uv4WnSDvRx";

/* ================= SERVICES ================= */


/* ================= COUNTRIES ================= */
const COUNTRIES = getCountries().map((c) => ({
  iso: c,
  name: new Intl.DisplayNames(["en"], { type: "region" }).of(c) || c,
  code: `+${getCountryCallingCode(c)}`,
  shortName: c.toUpperCase(),
}));

const EMAIL_MAX_LENGTH = 254;

export default function Contacts() {
  const [countryISO, setCountryISO] = useState<CountryCode>("PH");
  const [phone, setPhone] = useState(`+${getCountryCallingCode("PH")}`);
  const [phoneError, setPhoneError] = useState("");

  const [fullName, setFullName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const [service, setService] = useState("");

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  /* ================= HANDLERS ================= */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setFullName(value);
  };
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setCompanyName(value);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d+]/g, "");
    const formatter = new AsYouType(countryISO);
    const formatted = formatter.input(cleaned);
    setPhone(formatted);

    const parsed = parsePhoneNumberFromString(formatted, countryISO);
    parsed && parsed.isValid()
      ? setPhoneError("")
      : setPhoneError("Invalid phone number for selected country.");
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

    const emailCheck = validateEmail(email);
    if (emailCheck || phoneError) {
      setEmailError(emailCheck);
      return;
    }

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          full_name: fullName,
          email,
          phone,
          company_name: CompanyName,
          service: service || "N/A",
          message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully!");
        setFullName("");
        setEmail("");
        setMessage("");
        setService("");
        setPhone(`+${getCountryCallingCode(countryISO)}`);
      });
  };

  const selectedCountry = COUNTRIES.find((c) => c.iso === countryISO);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.shortName.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <section id="contacts" className="relative py-20 lg:py-28 overflow-hidden">
      <MagicImageParticles />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-white">
            Connect to <span className="text-indigo-400">ECI</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Let’s talk about how we can support your business and build something
            great together.
          </p>
        </motion.div>

        {/* ================= CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* MAP */}
            <div className="relative h-[300px] md:h-auto">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
              />
            </div>

            {/* FORM */}
           <div className="p-6 sm:p-10 bg-slate-900">
  <form className="space-y-6" onSubmit={handleSubmit}>

    {/* Full Name */}
    <div className="relative">
      <input
        value={fullName}
        onChange={handleNameChange}
        placeholder=" "
        className="peer w-full px-4 py-3 bg-slate-800 rounded-xl text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label className="floating-label">Full Name</label>
    </div>

    {/* Company Name */}
    <div className="relative">
      <input
        value={CompanyName}
        onChange={handleCompanyNameChange}
        placeholder=" "
        className="peer w-full px-4 py-3 bg-slate-800 rounded-xl text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label className="floating-label">Company Name</label>
    </div>

    {/* Country + Phone */}
    <div className="flex gap-3">
      {/* Country Selector */}
      <div className="relative w-52">
        <div
          onClick={() => {
            setCountryDropdownOpen(!countryDropdownOpen);
            setCountrySearch("");
          }}
          className="px-4 py-3 bg-slate-800 rounded-xl text-white cursor-pointer"
        >
          {selectedCountry?.name}
        </div>

        {countryDropdownOpen && (
          <div className="absolute mt-1 w-full bg-slate-800 rounded-xl max-h-60 overflow-auto z-10">
            <input
              autoFocus
              placeholder="Search country..."
              className="w-full px-3 py-2 bg-slate-700 text-white outline-none"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
            />

            {filteredCountries.map((c) => (
              <div
                key={c.iso}
                onClick={() => {
                  setCountryISO(c.iso);
                  setPhone(`+${getCountryCallingCode(c.iso)}`);
                  setPhoneError("");
                  setCountryDropdownOpen(false);
                }}
                className="px-3 py-2 hover:bg-slate-700 cursor-pointer"
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="relative flex-1">
        <input
          value={phone}
          onChange={handlePhoneChange}
          placeholder=" "
          className="peer w-full px-4 py-3 bg-slate-800 rounded-xl text-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="floating-label">Phone Number</label>
      </div>
    </div>

    {phoneError && (
      <p className="text-red-400 text-sm">{phoneError}</p>
    )}

    {/* Email */}
    <div className="relative">
      <input
        value={email}
        onChange={handleEmailChange}
        placeholder=" "
        className="peer w-full px-4 py-3 bg-slate-800 rounded-xl text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label className="floating-label">Email</label>
    </div>

    {emailError && (
      <p className="text-red-400 text-sm">{emailError}</p>
    )}

    {/* Message */}
    <div className="relative">
      <textarea
        value={message}
        onChange={handleMessageChange}
        rows={4}
        placeholder=" "
        className="peer w-full px-4 py-3 bg-slate-800 rounded-xl text-white resize-none
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label className="floating-label">Message</label>
    </div>




                <button
                  type="submit"
                  className="w-full bg-indigo-600 py-4 rounded-xl text-white flex justify-center items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
