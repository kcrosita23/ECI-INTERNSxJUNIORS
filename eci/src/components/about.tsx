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
  { id: 1, name: "Abdul", role: "tech support", image: "/team_eci_nobg/ab.png" },
  { id: 2, name: "don", role: "tech support", image: "/team_eci_nobg/donn.png" },
  { id: 3, name: "jayson", role: "tech support", image: "/team_eci_nobg/jaysonn.png" },
  { id: 4, name: "karl", role: "tech support", image: "/team_eci_nobg/Karll.png" },
  { id: 5, name: "koya rudy", role: "Sales", image: "/team_eci_nobg/koya rudy.png" },
  { id: 6, name: "sirAA", role: "tech support", image: "/team_eci_nobg/sir_AA.png" },
  { id: 7, name: "sirJo", role: "Sales", image: "/team_eci_nobg/sir.Jo.png" },
  { id: 8, name: "madamsher", role: "tech support", image: "/team_eci_nobg/madama sherrr.png" },
  { id: 9, name: "oasss", role: "tech support", image: "/team_eci_nobg/Oassss.png" },
  { id: 10, name: "kimm", role: "tech support", image: "/team_eci_nobg/kimm.png" },
  { id: 11, name: "cheche", role: "Sales", image: "/team_eci_nobg/cheche.png" },
  { id: 12, name: "jaymir", role: "tech support", image: "/team_eci_nobg/jaymirr.png" },
];

/* ================= COMPONENT ================= */
export default function About() {
  const [activeId, setActiveId] = useState<number | null>(null);
  
  // STATE: Track which folders are open. 
  const roleOrder = ["Sales", "tech support"];
  const [openFolders, setOpenFolders] = useState<string[]>(roleOrder);

  // REFS: For Auto-Scrolling logic
  const itemsRef = useRef<Map<number, HTMLDivElement> | null>(null);
  const lastInteraction = useRef<"image" | "list" | null>(null);

  // Helper to manage the map of image DOM elements
  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  // EFFECT 1: Auto-Scroll Image into View
  useEffect(() => {
    // Only scroll if an ID is active AND the user triggered it from the list (not hovering the image itself)
    if (activeId && lastInteraction.current === "list") {
      const map = getMap();
      const node = map.get(activeId);
      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center", // This centers the image horizontally
        });
      }
    }
  }, [activeId]);

  // EFFECT 2: Auto-expand folder if an image is hovered
  useEffect(() => {
    if (activeId && lastInteraction.current === "image") {
      const member = team.find((m) => m.id === activeId);
      if (member && !openFolders.includes(member.role)) {
        setOpenFolders((prev) => [...prev, member.role]);
      }
    }
  }, [activeId, openFolders]);

  // TOGGLE FUNCTION
  const toggleFolder = (role: string) => {
    setOpenFolders((prev) => 
      prev.includes(role) 
        ? prev.filter((r) => r !== role) // Remove (Collapse)
        : [...prev, role] // Add (Expand)
    );
  };

  return (
    <section className="relative w-full min-h-screen py-24 px-6 bg-slate-50 overflow-hidden text-slate-800">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase">
            Everywhere Consulting
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Meet the Team
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            The core processors behind our operations.
          </p>
        </div>

        {/* IMAGES PREVIEW PANE */}
        <div className="flex gap-4 overflow-x-auto pb-8 mb-8 px-4 no-scrollbar items-end h-[240px] scroll-smooth">
          {team.map((member) => (
            <div
              key={member.id}
              // Ref Callback to store DOM element
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(member.id, node);
                } else {
                  map.delete(member.id);
                }
              }}
              // Interaction Handlers
              onMouseEnter={() => {
                lastInteraction.current = "image"; // Mark interaction source
                setActiveId(member.id);
              }}
              onMouseLeave={() => setActiveId(null)}
              className={`min-w-[140px] relative transition-all duration-500 ease-out flex items-end justify-center cursor-pointer group
                ${
                  activeId === member.id
                    ? "scale-110 -translate-y-2 opacity-100 z-20"
                    : activeId
                    ? "opacity-30 grayscale scale-90 blur-[1px]"
                    : "opacity-80 hover:opacity-100 scale-100 grayscale hover:grayscale-0"
                }`}
            >
              {/* Tooltip */}
              <div className={`absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 ${activeId === member.id ? "opacity-100" : "group-hover:opacity-100"}`}>
                {member.name}
              </div>

              <img
                src={member.image}
                alt={member.name}
                className={`w-full h-48 object-contain transition-all duration-500
                  ${activeId === member.id ? "drop-shadow-[0_10px_20px_rgba(59,130,246,0.4)]" : "drop-shadow-none"}`}
              />
            </div>
          ))}
        </div>

        {/* IDE WINDOW CONTAINER */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden font-mono text-sm">
          
          {/* WINDOW TITLE BAR */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></div>
            </div>
            <div className="text-slate-400 text-xs font-medium tracking-wide">team_structure.tsx — Live Search</div>
            <div className="w-10"></div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="p-6 md:p-8 bg-white/50 relative">
            
            {/* ROOT BREADCRUMB */}
            <div className="flex items-center text-slate-500 mb-6 select-none border-b border-slate-100 pb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <span className="font-bold text-slate-700">./root/</span>
              {activeId && (
                 <span className="ml-2 text-blue-500 bg-blue-50 px-2 rounded animate-pulse">
                    -- locating member id: {activeId}...
                 </span>
              )}
            </div>

            {/* --- LAYOUT: VERTICAL STACK --- */}
            <div className="flex flex-col space-y-6">

                {roleOrder.map((role) => {
                    const membersInRole = team.filter((m) => m.role === role);
                    if (membersInRole.length === 0) return null;

                    const innerGridClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
                    const isOpen = openFolders.includes(role);

                    return (
                        <div key={role} className="relative group w-full">
                            
                            {/* CLICKABLE ROLE FOLDER HEADER */}
                            <div 
                                onClick={() => toggleFolder(role)}
                                className="flex items-center mb-2 pb-2 border-b border-slate-100 cursor-pointer hover:bg-slate-50 rounded px-2 transition-colors select-none"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor" 
                                    className={`w-4 h-4 text-slate-400 mr-1 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
                                >
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-400 mr-2">
                                    <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
                                </svg>
                                <span className="font-bold text-slate-700">{role}</span>
                                <span className="ml-auto text-xs bg-slate-100 text-slate-400 px-2 rounded-full">
                                    {membersInRole.length}
                                </span>
                            </div>

                            {/* COLLAPSIBLE CONTENTS */}
                            {isOpen && (
                                <div className={`grid ${innerGridClass} gap-3 animate-in fade-in slide-in-from-top-2 duration-200 pl-4`}>
                                    {membersInRole.map((member) => {
                                        const isActive = activeId === member.id;
                                        return (
                                            <div
                                                key={member.id}
                                                // Interaction Handlers for List
                                                onMouseEnter={() => {
                                                  lastInteraction.current = "list"; // Mark interaction source
                                                  setActiveId(member.id);
                                                }}
                                                onMouseLeave={() => setActiveId(null)}
                                                onClick={() => setActiveId(isActive ? null : member.id)}
                                                className={`
                                                    relative cursor-pointer p-3 rounded-lg border transition-all duration-200
                                                    ${isActive 
                                                        ? "bg-blue-50 border-blue-400 shadow-md ring-1 ring-blue-200 scale-105 z-10" 
                                                        : "bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50 hover:shadow-sm"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    {/* Status Dot */}
                                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-blue-500 animate-pulse" : "bg-slate-300"}`} />
                                                    
                                                    <div className="min-w-0 flex-1">
                                                        <p className={`text-sm font-semibold truncate ${isActive ? "text-blue-700" : "text-slate-700"}`}>
                                                            {member.name}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 truncate">
                                                            ID: {member.id.toString().padStart(4, '0')}
                                                        </p>
                                                    </div>

                                                    {/* LOCATED INDICATOR */}
                                                    {isActive && (
                                                        <div className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded animate-bounce">
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
                                <div className="ml-4 h-8 bg-slate-50/50 border border-dashed border-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400 italic">
                                    ... contents hidden ...
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

          </div>

          {/* STATUS BAR FOOTER */}
          <div className="bg-slate-800 text-slate-400 px-4 py-1.5 flex justify-between text-[10px] uppercase tracking-wider select-none">
             <div className="flex space-x-4">
               <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  {activeId ? "Target Acquired" : "System Online"}
               </span>
             </div>
             <div>
                {activeId ? `LOCATING: Member_ID_${activeId}` : "Waiting for input..."}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}