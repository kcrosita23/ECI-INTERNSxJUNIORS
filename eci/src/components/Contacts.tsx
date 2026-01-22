import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  isValidNumberForRegion,
  type CountryCode,
} from "libphonenumber-js";
import MagicImageParticles from "./MagicImageParticles";

/* ================= EMAILJS CONFIG ================= */
const EMAILJS_SERVICE_ID = "service_3rvqdj9";
const EMAILJS_TEMPLATE_ID = "template_iisswnz";
const EMAILJS_PUBLIC_KEY = "sqyS3A3Uv4WnSDvRx";

/* ================= SERVICES ================= */
const SERVICES = [
  { id: 1, title: "Back Office Support" },
  { id: 2, title: "QA & Testing" },
  { id: 3, title: "App Development" },
  { id: 4, title: "Technical Helpdesk" },
  { id: 5, title: "IT Infrastructure" },
];

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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const [department, setDepartment] = useState("Sales Management Group");
  const [service, setService] = useState("");

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  /* ================= NAME ================= */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    setFullName(value);
  };

  /* ================= PHONE ================= */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d+]/g, "");
    const formatter = new AsYouType(countryISO);
    const formatted = formatter.input(cleaned);

    setPhone(formatted);

    const digitsOnly = cleaned.replace(/\D/g, "");
    const countryDigits = getCountryCallingCode(countryISO);

    if (digitsOnly === countryDigits) {
      setPhoneError("");
      return;
    }

    const parsed = parsePhoneNumberFromString(formatted, countryISO);

    if (parsed && parsed.isValid() && isValidNumberForRegion(parsed.number, countryISO)) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number for selected country.");
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

    const emailCheck = validateEmail(email);
    if (emailCheck || phoneError) {
      setEmailError(emailCheck);
      return;
    }

    const templateParams = {
      full_name: fullName,
      email,
      phone,
      department,
      service: service || "N/A",
      message,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully!");
        setFullName("");
        setEmail("");
        setMessage("");
        setService("");
        setPhone(`+${getCountryCallingCode(countryISO)}`);
      })
      .catch(() => {
        alert("Failed to send message. Please try again.");
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
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
                      <option key={s.id}>{s.title}</option>
                    ))}
                  </select>
                )}

                <input
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

                <div className="flex gap-3 relative">
                  <div className="relative w-52">
                    <div
                      onClick={() => {
                        setCountryDropdownOpen(!countryDropdownOpen);
                        setCountrySearch("");
                      }}
                      className="px-3 py-3 bg-slate-800 rounded-xl text-white cursor-pointer"
                    >
                      {selectedCountry?.name}
                    </div>

                    {countryDropdownOpen && (
                      <div className="absolute mt-1 w-full bg-slate-800 rounded-xl text-white max-h-60 overflow-auto z-10">
                        <input
                          autoFocus
                          placeholder="Search country..."
                          className="w-full px-3 py-2 bg-slate-700"
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
                            className="px-3 py-2 cursor-pointer hover:bg-slate-700"
                          >
                            {c.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone"
                    className="flex-1 px-4 py-3 bg-slate-800 rounded-xl text-white"
                  />
                </div>

                {phoneError && <p className="text-red-400 text-sm">{phoneError}</p>}

                <input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

                {emailError && <p className="text-red-400 text-sm">{emailError}</p>}

                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  rows={4}
                  placeholder="Message"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

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
