import { useState, useEffect, useRef } from "react";

/* ================= TYPES ================= */
type TeamMember = {
  id: number;
  name: string;   // Nickname / Handle
  flname: string; // Full Name
  role: string;
  position: string;
  image: string;
};

/* ================= DATA ================= */
const team: TeamMember[] = [
  { id: 1, name: "John Rafael", flname: "John Rafael B. Piñero", position: "System Engineer", role:"Technical", image: "/team_eci_nobg/ab.png" },
  { id: 2, name: "Don Ricardo Jose", flname: "Don Ricardo Jose M. Roces", position: "System Engineer",role:"Technical", image: "/team_eci_nobg/donn.png" },
  { id: 3, name: "Mark Jayson", flname: "Mark Jayson C. Gonzales", position: "System Engineer", role:"Technical", image: "/team_eci_nobg/jaysonn.png" },
  { id: 4, name: "Karl Joseph", flname: "Karl Joseph P. Ramirez", position: "System Engineer",role:"Technical", image: "/team_eci_nobg/Karll.png" },
  { id: 5, name: "Rudy", flname: "Rudy B. Andrade", position: "Liason Officer",role:"Technical", image: "/team_eci_nobg/koya rudy.png" },
  { id: 6, name: "Alexander", flname:"Alexander P. Alonzo", position: "Sr. System Engr. / TSG. Supervisor", role:"Technical", image: "/team_eci_nobg/sir_AA.png" },
  { id: 7, name: "Joseph", flname: "Joseph D. Rullan", position: "OIC-General Manager", role:"Sales", image: "/team_eci_nobg/sir.Jo.png" },
  { id: 8, name: "Shirley", flname: "Shirley F. Santos", position: "Admin & Finance Officer", role:"Sales", image: "/team_eci_nobg/madama sherrr.png" },
  { id: 9, name: "Oscar", flname: "Oscar A. Sabanal", position: "System Engineer", role:"Technical", image: "/team_eci_nobg/Oassss.png" },
  { id: 10, name: "Kim Carlo", flname:"Kim Carlo S. Rosita", position: "System Engineer", role:"Technical", image: "/team_eci_nobg/kimm.png" },
  { id: 11, name: "Rachelle", flname:"Rachelle M. Bautista", position: "Sr. System Engr./Q.A and DA Head", role:"Sales", image: "/team_eci_nobg/cheche.png" },
  { id: 12, name: "Jaimier Paul", flname:"Jaimier Paul Ranara", position: "System Engineer", role:"Technical", image: "/team_eci_nobg/jaymirr.png" },
  { id: 13, name: "Daniel", flname:"Daniel D. Robleza", position: "Sr. System Engineer", role:"Technical", image: "/team_eci_nobg/daniel.png" }, 
  { id: 14, name: "Philip", flname:"Philip S. Taguba", position: "Channels Account Manager", role:"Sales", image: "/team_eci_nobg/philip.png" },
];

/* ================= COMPONENT ================= */
export default function About() {
  // DATA PREP
  const extendedTeam = [...team, ...team, ...team];
  const singleSetCount = team.length;

  // STATE
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  
  const roleOrder = ["Sales", "Technical"];
  const [openFolders, setOpenFolders] = useState<string[]>([]); 

  // REFS
  const itemsRef = useRef<Map<number, HTMLDivElement> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  /**
   * HELPER: Safe Scroll
   * Calculates the exact center position inside the container and scrolls ONLY the container.
   * This prevents the main browser window from jumping up and down.
   */
  const scrollToItem = (index: number, instant: boolean = false) => {
    const map = getMap();
    const node = map.get(index);
    const container = containerRef.current;

    if (node && container) {
      // Calculate position to center the image within the container
      const scrollLeft = node.offsetLeft - (container.clientWidth / 2) + (node.clientWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: instant ? "auto" : "smooth"
      });
    }
  };

  // EFFECT 0: Initial Mount - Start in the Middle Set (Instant jump, no animation)
  useEffect(() => {
    const middleStartIndex = singleSetCount;
    setActiveIndex(middleStartIndex);
    // Use instant scroll on mount
    scrollToItem(middleStartIndex, true); 
  }, [singleSetCount]);

  // EFFECT 1: Auto-Scroll Logic (Triggered by activeIndex change)
  useEffect(() => {
    if (activeIndex !== null && !isResettingRef.current) {
      // 1. Smooth scroll to the selected item
      scrollToItem(activeIndex, false);

      // 2. Infinite Loop Check
      const timeout = setTimeout(() => {
          if (activeIndex < singleSetCount) {
              // Too far left -> Jump to Middle
              isResettingRef.current = true;
              const newIndex = activeIndex + singleSetCount;
              setActiveIndex(newIndex);
              scrollToItem(newIndex, true); // Instant jump
          } else if (activeIndex >= singleSetCount * 2) {
              // Too far right -> Jump to Middle
              isResettingRef.current = true;
              const newIndex = activeIndex - singleSetCount;
              setActiveIndex(newIndex);
              scrollToItem(newIndex, true); // Instant jump
          }
      }, 500); // Wait for smooth scroll to finish

      return () => clearTimeout(timeout);
    }
    
    // Reset flag after a jump
    if (isResettingRef.current) {
        isResettingRef.current = false;
    }
  }, [activeIndex, singleSetCount]);

  const toggleFolder = (role: string) => {
    setOpenFolders((prev) => 
      prev.includes(role) 
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  // HELPER: Handle clicking a list item (IDE)
  const handleListClick = (id: number) => {
    setActiveId(id === activeId ? null : id);
  };

  // HELPER: Handle Carousel Interaction (Click Only)
  const handleCarouselInteract = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="about" className="relative w-full min-h-screen py-12 md:py-24 px-4 md:px-6 bg-slate-950 overflow-x-hidden text-slate-200 font-sans">
      
      {/* INJECTED STYLES */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col">
        
        {/* ================= COMPANY INFO SECTION ================= */}
        <div className="mb-24 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* COMPANY HEADER */}
            <div className="text-center space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-300 text-[10px] md:text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                   Trusted System Integrator
                </div>
                <h1 className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-200 to-blue-400 tracking-tight pb-2">
                    Everywhere Consulting
                </h1>
                <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-xl leading-relaxed">
                   We are a recognized system integrator and software solutions provider in the IT industry, offering comprehensive Cybersecurity services and exclusive distribution of Magic Software and Actian Zen.
                </p>
                <p className="text-blue-400 font-mono text-xs md:text-sm tracking-widest uppercase mt-2">
                   Build. Connect. Manage with Ease.
                </p>
            </div>

            {/* MISSION & VISION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* MISSION CARD */}
                <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-blue-500">
                            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-3.7 2.881-8.199 5.264-13.254 5.264a.75.75 0 01-.75-.75c0-5.055 2.383-9.554 6.084-12.435zm.895 5.763c-1.6 1.244-3.517 2.268-5.652 2.964.787-2.008 1.956-3.793 3.374-5.212l2.278 2.248z" clipRule="evenodd" />
                            <path d="M11.25 12a.75.75 0 00-1.5 0v3c0 .414.336.75.75.75h3a.75.75 0 000-1.5h-2.25V12z" />
                            <path d="M4.646 12.306l-1.952 1.951a.75.75 0 001.06 1.061l1.952-1.952a.75.75 0 00-1.06-1.06zM7.25 15.75a.75.75 0 000 1.5h2.25a.75.75 0 000-1.5H7.25z" />
                         </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                            <h2 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">Our Mission</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            To empower businesses with expert support, training, and custom software solutions. We aim to share the knowledge and skills necessary for clients to pursue their goals in developing and securing information technology.
                        </p>
                    </div>
                </div>

                {/* VISION CARD */}
                <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 hover:bg-slate-900 hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-amber-500">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                            <h2 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">Our Vision</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            To serve as a trusted partner that understands client requirements exactly, delivering solutions that work to streamline operations, drive growth, and protect critical assets from evolving threats.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] md:text-xs font-bold tracking-widest uppercase">
            Personnel Directory
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Meet the Team
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg">
            The core processors behind our operations.
          </p>
        </div>

        {/* IMAGES PREVIEW PANE */}
        <div className="sticky top-2 z-30 mb-6 -mx-4 px-4 md:static md:mb-8 md:mx-0">
          <div className="bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800/50 shadow-2xl">
            <div 
                ref={containerRef}
                className="flex gap-4 overflow-x-auto py-4 px-4 no-scrollbar items-end h-[200px] md:h-[280px] scroll-smooth snap-x snap-mandatory"
            >
              {extendedTeam.map((member, index) => {
                
                // Determine if this specific item is the "centered" one based on activeIndex
                const isCentered = activeIndex === index;

                return (
                <div
                  key={`${member.id}-${index}`}
                  ref={(node) => {
                    const map = getMap();
                    if (node) map.set(index, node);
                    else map.delete(index);
                  }}
                  // MODIFIED: Removed onMouseEnter, kept onClick
                  onClick={() => handleCarouselInteract(index)}
                  className={`snap-center min-w-[120px] md:min-w-[140px] scroll-m-20 sm:scroll-m-5 relative transition-all duration-500 ease-out flex items-end justify-center cursor-pointer group
                    ${isCentered 
                        ? "opacity-100 scale-110 md:scale-125 z-10 grayscale-0 -translate-y-2" 
                        : "opacity-60 scale-90 grayscale hover:opacity-100 hover:grayscale-0"
                    }
                  `}
                >
                  <div className={`absolute top-2 bg-blue-600 text-white text-[10px] md:text-xs px-2 py-1 rounded transition-opacity duration-300 shadow-lg shadow-blue-900/50 whitespace-nowrap 
                    ${isCentered ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {/* Display Handle/Name in Carousel Tooltip */}
                    {member.name}
                  </div>

                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-36 md:h-48 object-contain transition-all duration-500 
                      ${isCentered ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "drop-shadow-none"}`}
                  />
                </div>
              )})}
            </div>
            <div className="text-center text-[10px] text-slate-500 pb-2 md:hidden uppercase tracking-widest">
                Tap to scroll
            </div>
          </div>
        </div>

        {/* IDE WINDOW CONTAINER */}
        <div className="w-full mx-auto bg-slate-900 rounded-xl shadow-2xl shadow-black/50 border border-slate-800 overflow-hidden font-mono text-sm mb-12">
          
          {/* WINDOW TITLE BAR */}
          <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 border border-red-500/20"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80 border border-amber-500/20"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 border border-green-500/20"></div>
            </div>
            <div className="text-slate-500 text-[10px] md:text-xs font-medium tracking-wide truncate ml-2">team_structure.tsx</div>
            <div className="w-4"></div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="p-4 md:p-8 bg-slate-900 relative min-h-[400px]">
            
            {/* ROOT BREADCRUMB */}
            <div className="flex flex-wrap items-center text-slate-500 mb-6 select-none border-b border-slate-800 pb-4 text-xs md:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <span className="font-bold text-slate-300">./root/</span>
              {activeId && (
                 <span className="ml-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 rounded truncate max-w-[150px]">
                   -- accessing id: {activeId}
                 </span>
              )}
            </div>

            {/* --- LAYOUT: VERTICAL STACK --- */}
            <div className="flex flex-col space-y-6">

                {roleOrder.map((role) => {
                    const membersInRole = team.filter((m) => m.role === role);
                    if (membersInRole.length === 0) return null;

                    const innerGridClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
                    const isOpen = openFolders.includes(role);

                    return (
                        <div key={role} className="relative group w-full">
                            
                            {/* CLICKABLE ROLE FOLDER HEADER */}
                            <div 
                                onClick={() => toggleFolder(role)}
                                className="flex items-center mb-2 pb-2 pt-2 border-b border-slate-800 cursor-pointer active:bg-slate-800 md:hover:bg-slate-800 rounded px-2 transition-colors select-none"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor" 
                                    className={`w-4 h-4 text-slate-500 mr-1 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
                                >
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500 mr-2">
                                    <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
                                </svg>
                                <span className="font-bold text-slate-200 text-sm md:text-base">{role}</span>
                                <span className="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                                    {membersInRole.length}
                                </span>
                            </div>

                            {/* COLLAPSIBLE CONTENTS */}
                            {isOpen && (
                                <div className={`grid ${innerGridClass} gap-3 animate-in fade-in slide-in-from-top-2 duration-200 pl-2 md:pl-4`}>
                                    {membersInRole.map((member) => {
                                        const isActive = activeId === member.id;
                                        return (
                                            <div
                                                key={member.id}
                                                // MODIFIED: Only sets ID, doesn't scroll carousel
                                                onClick={() => handleListClick(member.id)}
                                                className={`
                                                    relative cursor-pointer p-3 rounded-lg border transition-all duration-200
                                                    ${isActive 
                                                        ? "bg-slate-800/80 border-blue-500/50 ring-1 ring-blue-500/30 col-span-1 md:col-span-2 row-span-2" 
                                                        : "bg-slate-800/40 border-slate-800 active:bg-slate-800 md:hover:border-slate-600 md:hover:bg-slate-800"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    {/* Status Dot */}
                                                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-slate-600"}`} />
                                                    
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex justify-between items-center">
                                                          {/* MODIFIED: Display FLNAME (Full Name) here */}
                                                          <p className={`text-sm font-semibold truncate ${isActive ? "text-blue-300" : "text-slate-300"}`}>
                                                              {member.flname}
                                                          </p>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-0.5">
                                                           {/* Display Handle/Nickname */}
                                                           <p className="text-[10px] text-slate-500 font-mono truncate">
                                                              const {member.name}
                                                           </p>
                                                           <p className="text-[9px] text-slate-600 truncate ml-2">
                                                              ID: {member.id.toString().padStart(4, '0')}
                                                           </p>
                                                        </div>

                                                        {/* MODIFIED: Directory Image Reveal */}
                                                        {isActive && (
                                                          <div className="mt-2 pt-2 border-t border-slate-700/50 animate-in zoom-in-95 duration-300">
                                                            <div className="bg-slate-950/50 rounded p-2 flex justify-center">
                                                              <img 
                                                                src={member.image} 
                                                                alt={member.name} 
                                                                className="h-32 w-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
                                                              />
                                                            </div>
                                                            <div className="mt-2 text-[12px] text-center text-slate-400 font-mono">
                                                              <p className="font-bold">
                                                                {member.position}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {!isOpen && (
                                <div className="ml-4 h-8 bg-slate-900 border border-dashed border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-600 italic">
                                    ... contents hidden ...
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

          </div>

          <div className="bg-slate-950 text-slate-500 border-t border-slate-800 px-4 py-2 flex justify-between text-[9px] md:text-[10px] uppercase tracking-wider select-none">
              <div className="flex space-x-4">
               <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                  {activeId ? "File Open" : "System Ready"}
               </span>
              </div>
              <div>
                 {activeId ? `Reading: ${activeId}` : "Idle"}
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}