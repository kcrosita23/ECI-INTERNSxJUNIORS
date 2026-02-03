import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Solutions() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const videoSolutions = [
    {
      title: "ELECTRIC BILLING SYSTEM",
      code: "EBS2000",
      video: "https://www.youtube.com/embed/G4gylK0iTBA",
      description:
        "The Electric Billing System (EBS) is the most widely used billing and collection system among the various electric cooperatives across the Philippines. Everywhere Consulting, Inc. designed, developed, and deployed EBS2000, which is based on the original DOS-based Electric Billing System previously implemented by Questronix Corporation, our parent company.",
    },
    {
      title: "CONSUMER MANAGEMENT SYSTEM",
      code: "CMS2000",
      video: "https://www.youtube.com/embed/wBCEAtdEmwE",
      description:
        "The Consumer Management System (CMS) is an integrated solution that automates the manual processes of consumer application and records maintenance. The system provides tools to accept consumer complaints and requests and to generate the necessary \"Orders\" required to address those complaints and/or requests. It automatically updates consumer records based on the actions taken and the feedback provided by the crew. Reports can be generated for statistical analysis of crew performance, consumer maintenance history, and more.",
    },
    {
      title: "GENERAL ACCOUNTING SYSTEM",
      code: "GAS2000",
      video: "https://www.youtube.com/embed/ZJkKPV8dEsg",
      description:
        "The General Accounting System (GAS) helps businesses efficiently record and manage financial transactions. It includes features for purchasing, warehouse management, and file maintenance to track supplies and records. The system also allows users to create lookup codes to streamline transaction processing. GAS2000 is integrated with CAS2000 and WIS2000 to provide a seamless accounting experience.",
    },
    {
      title: "HUMAN RESOURCES MANAGEMENT INFORMATION SYSTEM",
      code: "HRMIS2000",
      video: "https://www.youtube.com/embed/KMbvA2LL4ks",
      description:
        "The Human Resources Management Information System (HRMIS) is an all-in-one human resource management and payroll system designed to streamline HR processes. It helps businesses manage payroll, employee records, attendance tracking, and performance appraisals, ensuring efficient and organized HR operations. With its user-friendly interface, HRMIS2000 simplifies HR tasks and enhances workforce management.",
    },
    {
      title: "LOANS MANAGEMENT SYSTEM",
      code: "LMS2000",
      video: "https://www.youtube.com/embed/oTOXbJBkzJY",
      description:
        "The Loans Management System (LMS) is a loan management solution used by Philippine credit cooperatives to efficiently handle member loans and payments. It includes key features such as a security menu for managing user access, an audit trail for tracking system activities, loan history display, and member ledger inquiry for easy financial monitoring. With its streamlined interface, LMS2000 enhances accuracy and simplifies loan management processes.",
    },
    {
      title: "ELECTRIC METER READER",
      code: "EMR200",
      video: "https://www.youtube.com/embed/9iNsJb6YdLk?si=GtRphcDmMhmGlX2Q",
      description:
        "The Electric Meter Reader (EMR) is a state-of-the-art mobile application used to capture and store meter readings from electric or water meters. It also collects non-meter-reading information, including meter conditions, hazardous conditions, tamper data, survey responses, and high/low reading checks.",
    },
    {
      title: "WAREHOUSING & INVENTORY SYSTEM",
      code: "WIS2000",
      video: "https://www.youtube.com/embed/9iNsJb6YdLk?si=GtRphcDmMhmGlX2Q",
      description:
        "The Warehousing & Inventory System (WIS) is designed to assist electric utilities in managing materials effectively. It generates essential inventory reports, such as material balances, summaries of releases, received materials (BIN Card), total project costs, and more.",
    },
    {
      title: "COMPUTERIZED ACCOUNTING SYSTEM",
      code: "CAS2000",
      video: "https://www.youtube.com/embed/9iNsJb6YdLk?si=GtRphcDmMhmGlX2Q",
      description:
        "The Computerized Accounting System (CAS) is an ACAM/BSUP-ready solution designed to effectively handle and manage the complex financial processes of Philippine electric utilities, thereby improving their operations and performance.",
    },
    {
      title: "CUSTOMER INFORMATION MANAGEMENT SYSTEM",
      code: "CIMS200",
      video: "https://www.youtube.com/embed/9iNsJb6YdLk?si=GtRphcDmMhmGlX2Q",
      description:
        "The Customer Information Management System (CIMS) seamlessly combines EBS2000 and CMS2000 to enhance billing precision, streamline customer data management, and boost service efficiency for both businesses and their customers.",
    },
  ];

  return (
    <section id="solutions" className="relative py-20 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            OUR <span className="text-blue-500">SOLUTIONS</span>
          </h1>
          <p className="text-xl text-zinc-400 mt-4 max-w-3xl mx-auto">
            Powerful software solutions designed to streamline operations and drive business growth.
          </p>
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {videoSolutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-6 shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Video */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={item.video}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Title */}
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                <p className="text-blue-400 font-semibold mt-1">{item.code}</p>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => toggleCard(index)}
                className="mt-4 w-full text-sm font-medium text-blue-400 hover:text-blue-300 transition flex items-center justify-center gap-2"
              >
                {expandedCard === index ? "Hide details" : "View details"}
                <motion.span
                  animate={{ rotate: expandedCard === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>

              {/* Animated Description */}
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-4 overflow-hidden"
                  >
                    <p className="text-zinc-300 text-lg text-justify leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
