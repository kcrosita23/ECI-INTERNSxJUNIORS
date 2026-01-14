import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  isValidNumberForRegion,
  type CountryCode,
} from "libphonenumber-js";
import MagicImageParticles from "./MagicImageParticles";

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

/* ================= PHONE MAX LENGTHS ================= */
const COUNTRY_MAX_LENGTH: Record<string, number> = {
  PH: 10, // Philippines mobile numbers (without country code)
  US: 10,
  IN: 10,
  // add other countries if you want
};

export default function Contacts() {
  const [countryISO, setCountryISO] = useState<CountryCode>("PH");
  const [phone, setPhone] = useState(COUNTRIES.find((c) => c.iso === "PH")?.code || "");
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
  const selectedCountry = COUNTRIES.find((c) => c.iso === countryISO);
  if (!selectedCountry) return;

  const code = selectedCountry.code; // e.g., "+63"
  let raw = e.target.value;

  // Ensure input always starts with country code
  if (!raw.startsWith(code)) raw = code;

  // Remove non-digit characters after the code
  let numberPart = raw.slice(code.length).replace(/\D/g, "");

  // Limit digits based on country
  const maxDigits = COUNTRY_MAX_LENGTH[countryISO] || 15;
  numberPart = numberPart.slice(0, maxDigits);

  // Add spacing / partition for PH numbers
  let formattedNumber = numberPart;
  if (countryISO === "PH") {
    if (numberPart.length > 3 && numberPart.length <= 6) {
      formattedNumber = `${numberPart.slice(0,3)} ${numberPart.slice(3)}`;
    } else if (numberPart.length > 6) {
      formattedNumber = `${numberPart.slice(0,3)} ${numberPart.slice(3,6)} ${numberPart.slice(6)}`;
    }
  } else {
    // For other countries, just keep as continuous digits
    formattedNumber = numberPart;
  }

  const formatted = code + " " + formattedNumber;
  setPhone(formatted);

  // Validate phone number (remove spaces for validation)
  const parsed = parsePhoneNumberFromString(code + numberPart, countryISO);
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
    const capitalized = e.target.value.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) =>
      c.toUpperCase()
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
    alert("Form submitted!");
  };

  const selectedCountry = COUNTRIES.find((c) => c.iso === countryISO);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch) ||
      c.shortName.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <MagicImageParticles />

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-10">
        {/* ABOUT US */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
          <p className="text-white/80 text-lg">
            Everywhere Consulting Inc. provides top-notch IT services and business solutions
            to help companies grow efficiently. Our team specializes in back office support,
            QA & testing, app development, technical helpdesk, and IT infrastructure management.
          </p>
        </div>

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* MAP */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 h-[300px] md:h-auto">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps?q=Everywhere+Consulting+Inc+Makati&output=embed"
              />
            </div>

            {/* FORM */}
            <div className="p-6 sm:p-10 bg-slate-900">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Department */}
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

                {/* Full Name */}
                <input
                  value={fullName}
                  onChange={handleNameChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

                {/* Country + Phone */}
                <div className="flex gap-3 relative">
                  {/* Country Dropdown */}
                  <div className="relative w-32">
                    <div
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      className="px-3 py-3 bg-slate-800 rounded-xl text-white cursor-pointer"
                    >
                      {selectedCountry?.name} ({selectedCountry?.code})
                    </div>

                    {countryDropdownOpen && (
                      <div className="absolute mt-1 w-full bg-slate-800 rounded-xl text-white shadow-lg max-h-60 overflow-auto z-10">
                        <input
                          type="text"
                          placeholder="Search country..."
                          className="w-full px-3 py-2 mb-2 rounded bg-slate-700 text-white"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                        />
                        <ul>
                          {filteredCountries.map((c) => (
                            <li
                              key={c.iso}
                              onClick={() => {
                                setCountryISO(c.iso);
                                setPhone(c.code); // only +63, +1 etc.
                                setCountryDropdownOpen(false);
                                setCountrySearch("");
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-slate-700"
                            >
                              {c.name} ({c.code})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <input
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone"
                    className="flex-1 px-4 py-3 bg-slate-800 rounded-xl text-white"
                  />
                </div>

                {phoneError && (
                  <p className="text-red-400 text-sm mt-1">{phoneError}</p>
                )}

                {/* Email */}
                <input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

                {emailError && (
                  <p className="text-red-400 text-sm">{emailError}</p>
                )}

                {/* Message */}
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  rows={4}
                  placeholder="Message"
                  className="w-full px-4 py-3 bg-slate-800 rounded-xl text-white"
                />

                {/* Submit */}
                <button className="w-full bg-indigo-600 py-4 rounded-xl text-white flex justify-center items-center gap-2">
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
