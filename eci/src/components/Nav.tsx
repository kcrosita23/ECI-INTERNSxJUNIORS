import { useState, useRef, useEffect } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Base from "./Base";

type NavItem =
  | { name: string; href: string }
  | { name: string; href: string; children: { name: string; href: string }[] };

const navigation: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "/about" },
  { name: "Products", href: "#products" },
  { name: "Solutions", href: "#solutions" },
  { name: "Services", href: "#services" },
  { name: "Partners", href: "#partners" },
  { name: "Contact Us", href: "#contacts" },
];

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Resolve hash links when not on home
  const resolveHref = (href: string) => {
    if (href.startsWith("#") && location.pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  // Scroll-spy for home sections
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  // Active link logic
  const isCurrent = (href: string) => {
    if (href.startsWith("#") && location.pathname === "/") {
      return activeSection === href.replace("#", "");
    }
    return location.pathname === href;
  };

  return (
    <Disclosure
      as="nav"
      className="fixed inset-x-0 top-0 z-50 bg-white/5 backdrop-blur-md"
    >
      {({ open, close }) => {
        useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
            if (
              open &&
              menuRef.current &&
              !menuRef.current.contains(event.target as Node)
            ) {
              close();
            }
          }

          document.body.style.overflow = open ? "hidden" : "";
          document.addEventListener("mousedown", handleClickOutside);

          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "";
          };
        }, [open, close]);

        return (
          <Base>
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="flex items-center space-x-2">
                  <img src="logo1.webp" alt="ECI logo" className="h-8 w-auto" />
                  <span className="text-white font-semibold text-lg hidden sm:inline">
                    EVERYWHERE CONSULTING INC.
                  </span>
                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden sm:flex items-center space-x-6">
                  {navigation.map((item) =>
                    "children" in item ? (
                      <div key={item.name} className="relative group">
                        <a
                          href={resolveHref(item.href)}
                          className="flex items-center gap-1 text-gray-300 transition-colors hover:text-white"
                        >
                          {item.name}
                          <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                        </a>
                      </div>
                    ) : (
                      <motion.div
                        key={item.name}
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link
                          to={resolveHref(item.href)}
                          className={classNames(
                            "relative text-gray-300 transition-all duration-300 hover:text-white",
                            "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full",
                            isCurrent(item.href) && "text-blue-400 after:w-full"
                          )}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>

                {/* HAMBURGER */}
                <div className="sm:hidden">
                  <DisclosureButton className="p-2 text-gray-300 hover:text-white">
                    {open ? <X className="size-6" /> : <MenuIcon className="size-6" />}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
              {open && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => close()}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                  />

                  <motion.aside
                    ref={menuRef}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-[70%] bg-gray-900/95 backdrop-blur sm:hidden"
                  >
                    <div className="flex flex-col p-6 space-y-4">
                      <span className="text-white font-semibold text-lg mb-4">
                        EVERYWHERE CONSULTING INC.
                      </span>

                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={resolveHref(item.href)}
                          onClick={() => close()}
                          className={classNames(
                            "text-lg text-gray-300 transition hover:text-white",
                            isCurrent(item.href) && "text-blue-400"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </Base>
        );
      }}
    </Disclosure>
  );
}
