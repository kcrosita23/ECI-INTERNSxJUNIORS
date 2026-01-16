import { useState, useEffect, useRef } from "react";

/* ================= TYPES ================= */
type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

/* ================= DATA ================= */
const team: TeamMember[] = [
  { id: 1, name: "Abdul", role: "Technical", image: "/team_eci_nobg/ab.png" },
  { id: 2, name: "don", role: "Technical", image: "/team_eci_nobg/donn.png" },
  { id: 3, name: "jayson", role: "Technical", image: "/team_eci_nobg/jaysonn.png" },
  { id: 4, name: "karl", role: "Technical", image: "/team_eci_nobg/Karll.png" },
  { id: 5, name: "koya rudy", role: "Sales", image: "/team_eci_nobg/koya rudy.png" },
  { id: 6, name: "sirAA", role: "Technical", image: "/team_eci_nobg/sir_AA.png" },
  { id: 7, name: "sirJo", role: "Sales", image: "/team_eci_nobg/sir.Jo.png" },
  { id: 8, name: "madamsher", role: "Technical", image: "/team_eci_nobg/madama sherrr.png" },
  { id: 9, name: "oasss", role: "Technical", image: "/team_eci_nobg/Oassss.png" },
  { id: 10, name: "kimm", role: "Technical", image: "/team_eci_nobg/kimm.png" },
  { id: 11, name: "cheche", role: "Sales", image: "/team_eci_nobg/cheche.png" },
  { id: 12, name: "jaymir", role: "Technical", image: "/team_eci_nobg/jaymirr.png" },
];

/* ================= COMPONENT ================= */
export default function About() {
  const [activeId, setActiveId] = useState<number | null>(null);
  
  const roleOrder = ["Sales", "Technical"];
  const [openFolders, setOpenFolders] = useState<string[]>([]); 

  // REFS
  const itemsRef = useRef<Map<number, HTMLDivElement> | null>(null);
  const lastInteraction = useRef<"image" | "list" | null>(null);

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  // EFFECT 1: Auto-Scroll Image into View
  useEffect(() => {
    if (activeId && lastInteraction.current === "list") {
      const map = getMap();
      const node = map.get(activeId);
      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest", // changed to nearest for better mobile behavior
          inline: "center", 
        });
      }
    }
  }, [activeId]);

  // EFFECT 2: Auto-expand folder
  useEffect(() => {
    if (activeId && lastInteraction.current === "image") {
      const member = team.find((m) => m.id === activeId);
      if (member && !openFolders.includes(member.role)) {
        setOpenFolders((prev) => [...prev, member.role]);
      }
    }
  }, [activeId, openFolders]);

  const toggleFolder = (role: string) => {
    setOpenFolders((prev) => 
      prev.includes(role) 
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  return (
    <section className="relative w-full min-h-screen py-12 md:py-24 px-4 md:px-6 bg-slate-950 overflow-x-hidden text-slate-200 font-sans">
      
      {/* INJECTED STYLES to hide scrollbar */}
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

      <div className="w-full max-w-[95%] mx-auto relative z-10 flex flex-col">
        
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-300 text-[10px] md:text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            Everywhere Consulting
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
            Meet the Team
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg">
            The core processors behind our operations.
          </p>
        </div>

        {/* IMAGES PREVIEW PANE - MOBILE STICKY */}
        {/* Added sticky positioning and z-index for mobile friendliness */}
        <div className="sticky top-2 z-30 mb-6 -mx-4 px-4 md:static md:mb-8 md:mx-0">
          <div className="bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800/50 shadow-2xl">
            <div className="flex gap-4 overflow-x-auto py-4 px-4 no-scrollbar items-end h-[180px] md:h-[240px] scroll-smooth snap-x snap-mandatory">
              {team.map((member) => (
                <div
                  key={member.id}
                  ref={(node) => {
                    const map = getMap();
                    if (node) map.set(member.id, node);
                    else map.delete(member.id);
                  }}
                  // Tap/Click handler for mobile to select image
                  onClick={() => {
                      lastInteraction.current = "image";
                      setActiveId(member.id === activeId ? null : member.id);
                  }}
                  onMouseEnter={() => {
                    // Only use hover on devices that support it to prevent sticky hover states on mobile
                    if (window.matchMedia('(hover: hover)').matches) {
                        lastInteraction.current = "image";
                        setActiveId(member.id);
                    }
                  }}
                  onMouseLeave={() => {
                     if (window.matchMedia('(hover: hover)').matches) {
                        setActiveId(null);
                     }
                  }}
                  className={`snap-center min-w-[120px] md:min-w-[140px] scroll-m-20 sm:scroll-m-5 relative transition-all duration-300 ease-out flex items-end justify-center cursor-pointer group
                    ${
                      activeId === member.id
                        ? "scale-105 -translate-y-2 opacity-100 z-20"
                        : activeId
                        ? "opacity-30 grayscale scale-90 blur-[1px]"
                        : "opacity-80 md:hover:opacity-100 scale-100 grayscale md:hover:grayscale-0"
                    }`}
                >
                  <div className={`absolute -top-8 bg-blue-600 text-white text-[10px] md:text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 shadow-lg shadow-blue-900/50 whitespace-nowrap ${activeId === member.id ? "opacity-100" : "group-hover:opacity-100"}`}>
                    {member.name}
                  </div>

                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-36 md:h-48 object-contain transition-all duration-500 
                      ${activeId === member.id ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" : "drop-shadow-none"}`}
                  />
                </div>
              ))}
            </div>
            {/* Mobile Helper Text */}
            <div className="text-center text-[10px] text-slate-500 pb-2 md:hidden uppercase tracking-widest">
                Swipe to browse • Tap to select
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
                 <span className="ml-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 rounded animate-pulse truncate max-w-[150px]">
                   -- locating id: {activeId}...
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
                            
                            {/* CLICKABLE ROLE FOLDER HEADER - Increased Touch Target */}
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
                                                // Handle Interaction: Tap on mobile, Hover on desktop
                                                onClick={() => {
                                                    lastInteraction.current = "list";
                                                    setActiveId(isActive ? null : member.id);
                                                }}
                                                onMouseEnter={() => {
                                                   if (window.matchMedia('(hover: hover)').matches) {
                                                      lastInteraction.current = "list";
                                                      setActiveId(member.id);
                                                   }
                                                }}
                                                onMouseLeave={() => {
                                                   if (window.matchMedia('(hover: hover)').matches) {
                                                      setActiveId(null);
                                                   }
                                                }}
                                                className={`
                                                    relative cursor-pointer p-3 rounded-lg border transition-all duration-200
                                                    ${isActive 
                                                        ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30 scale-[1.02] md:scale-105 z-10" 
                                                        : "bg-slate-800/40 border-slate-800 active:bg-slate-800 md:hover:border-slate-600 md:hover:bg-slate-800 md:hover:shadow-md"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" : "bg-slate-600"}`} />
                                                    <div className="min-w-0 flex-1">
                                                        <p className={`text-sm font-semibold truncate ${isActive ? "text-blue-300" : "text-slate-300"}`}>
                                                            {member.name}
                                                        </p>
                                                        <p className="text-[10px] text-slate-500 truncate">
                                                            ID: {member.id.toString().padStart(4, '0')}
                                                        </p>
                                                    </div>
                                                    {isActive && (
                                                        <div className="text-[10px] font-bold text-blue-300 bg-blue-500/20 border border-blue-500/20 px-1.5 py-0.5 rounded animate-bounce">
                                                            FOUND
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* COLLAPSED STATE PLACEHOLDER */}
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
                  {activeId ? "Target Acquired" : "System Online"}
               </span>
             </div>
             <div>
                {activeId ? `ID: ${activeId}` : "Waiting..."}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}