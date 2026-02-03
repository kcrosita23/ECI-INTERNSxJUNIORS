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
import About from "./components/about";

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Solutions />
      <Services />
      <Partners />
      <Contacts />
    </>
  );
}

export default function App() {
  const { pathname, hash, key } = useLocation();

  // FIX: Scroll to hash element when location changes
  useEffect(() => {
    // If there is a hash, scroll to it
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If no hash (e.g. clicking "Home"), scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}