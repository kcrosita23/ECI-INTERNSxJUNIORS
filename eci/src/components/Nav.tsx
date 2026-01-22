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
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Our Team", href: "/about" },
      { name: "Our Company", href: "/about" },
    ],
  },

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
  const [projectsOpen, setProjectsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Helper: If we are NOT on home, prepend '/' to hash links (e.g., "#products" -> "/#products")
  const resolveHref = (href: string) => {
    if (href.startsWith("#") && location.pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  // Helper: Check if a link is active
  const isCurrent = (href: string) => {
    if (href === "/contacts" && location.pathname === "/contacts") return true;
    if (href === "#home" && location.pathname === "/") return true;
    return false;
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
                          className="flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer"
                        >
                          {item.name}
                          <ChevronDown className="size-4" />
                        </a>

                        <div className="absolute left-0 mt-2 w-40 rounded-md bg-gray-800 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          {item.children.map((child) => (
                            <a
                              key={child.name}
                              href={resolveHref(child.href)}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        to={resolveHref(item.href)}
                        // If it's a hash link on the same page, we use standard a tag behavior via 'to'
                        // logic in React Router usually handles this, but for simple hashes
                        // sometimes native anchors are smoother. However, Link is safer for routing.
                        className={classNames(
                          "text-gray-300 hover:text-white",
                          isCurrent(item.href) ? "text-blue-400" : false,
                        )}
                      >
                        {item.name}
                      </Link>
                    ),
                  )}
                </div>

                {/* HAMBURGER */}
                <div className="sm:hidden">
                  <DisclosureButton className="p-2 text-gray-300 hover:text-white">
                    {open ? (
                      <X className="size-6" />
                    ) : (
                      <MenuIcon className="size-6" />
                    )}
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
                      {navigation.map((item) =>
                        "children" in item ? (
                          <div key={item.name}>
                            <button
                              onClick={() => setProjectsOpen(!projectsOpen)}
                              className="flex w-full items-center justify-between text-lg text-gray-300 hover:text-white"
                            >
                              {item.name}
                              <ChevronDown
                                className={classNames(
                                  projectsOpen && "rotate-180",
                                  "size-4 transition-transform",
                                )}
                              />
                            </button>

                            {projectsOpen && (
                              <div className="mt-2 ml-4 space-y-2">
                                {item.children.map((child) => (
                                  <a
                                    key={child.name}
                                    href={resolveHref(child.href)}
                                    onClick={() => close()}
                                    className="block text-gray-400 hover:text-white"
                                  >
                                    {child.name}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            key={item.name}
                            to={resolveHref(item.href)}
                            onClick={() => close()}
                            className={classNames(
                              "text-lg text-gray-300 hover:text-white block",
                              isCurrent(item.href) ? "text-blue-400" : false,
                            )}
                          >
                            {item.name}
                          </Link>
                        ),
                      )}
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
