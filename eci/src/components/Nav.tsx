import { useState, useRef, useEffect } from 'react'
import {
  Disclosure,
  DisclosureButton,
} from '@headlessui/react'
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Base from './Base'

type NavItem =
  | { name: string; href: string }
  | {
      name: string
      children: { name: string; href: string }[]
    }

const navigation: NavItem[] = [
  { name: 'Home', href: '#' },
  {
    name: 'Products',
    children: [
      { name: 'Solutions', href: '#solutions' },
      { name: 'Services', href: '#services' },
    ],
  },
  { name: 'Partners', href: '#' },
  { name: 'Contacts', href: '#' },
]

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const [projectsOpen, setProjectsOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  return (
    <Disclosure as="nav" className="fixed inset-x-0 top-0 z-50 bg-white/5 backdrop-blur-md">

      {({ open, close }) => {
          useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
              if (
                open &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
              ) {
                close()
              }
            }
            if (open) {
              document.body.style.overflow = 'hidden'
            } else {
              document.body.style.overflow = ''
            }

            document.addEventListener('mousedown', handleClickOutside)

            return () => {
              document.removeEventListener('mousedown', handleClickOutside)
              document.body.style.overflow = ''
            }
          }, [open, close])

        return (
          <Base>
            {/* TOP BAR */}
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">

                <div className="flex items-center space-x-2">
                  <img src="logo1.webp" alt="ECI logo" className="h-8 w-auto" />
                  <span className="text-white font-semibold text-lg hidden sm:inline">
                    EVERYWHERE CONSULTING INC.
                  </span>
                </div>

                {/* Desktop menu */}
                <div className="hidden sm:flex items-center space-x-6">
                  {navigation.map((item) =>
                    'children' in item ? (
                      <div key={item.name} className="relative group">
                        <button
                          type="button"
                          className="flex items-center gap-1 text-gray-300 hover:text-white"
                        >
                          {item.name}
                          <ChevronDown className="size-4" />
                        </button>

                        <div className="absolute left-0 mt-2 w-40 rounded-md bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition">
                          {item.children.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    ),
                  )}
                </div>

                {/*hamburger */}
                <div className="sm:hidden">
                  <DisclosureButton className="p-2 text-gray-300 hover:text-white">
                    {open ? <X className="size-6" /> : <MenuIcon className="size-6" />}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            {/* MOBILE OVERLAY + SIDE MENU */}
            <AnimatePresence>
              {open && (
                <>
                  {/* Overlay */}
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => close()}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                  />

                  {/* Side Menu */}
                  <motion.aside
                    ref={menuRef}
                    key="sidemenu"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-[70%] bg-gray-900/95 backdrop-blur sm:hidden"
                  >
                    <div className="flex flex-col p-6 space-y-4">
                      <span className="text-white font-semibold text-lg mb-4">
                        EVERYWHERE CONSULTING INC.
                      </span>

                      {navigation.map((item) =>
                        'children' in item ? (
                          <div key={item.name}>
                            <button
                              type="button"
                              onClick={() => setProjectsOpen((v) => !v)}
                              className="flex w-full items-center justify-between text-lg text-gray-300 hover:text-white"
                            >
                              {item.name}
                              <ChevronDown
                                className={classNames(
                                  projectsOpen && 'rotate-180',
                                  'size-4 transition-transform',
                                )}
                              />
                            </button>

                            {projectsOpen && (
                              <div className="mt-2 ml-4 space-y-2">
                                {item.children.map((child) => (
                                  <a
                                    key={child.name}
                                    href={child.href}
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
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => close()}
                            className="text-lg text-gray-300 hover:text-white"
                          >
                            {item.name}
                          </a>
                        ),
                      )}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </Base>
        )
      }}
    </Disclosure>
  )
}
