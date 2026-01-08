import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Solutions from "./components/Solutions";
import Services from "./components/Services";
import Partners from "./components/Partners";
import Contacts from "./components/Contacts";
import ContactsDashboard from "./components/ContactsDashboard"; // <-- import here

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Solutions />
      <Services />
      <Partners />
    </>
  );
}

export default function App() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts-dashboard" element={<ContactsDashboard />} /> {/* <-- new route */}
      </Routes>
      <Footer />
    </>
  );
}
