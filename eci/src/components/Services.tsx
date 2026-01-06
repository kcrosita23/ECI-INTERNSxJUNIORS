import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MonitorCheck, 
  Code2, 
  Headset, 
  Server, 
  BarChart3,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const services = [
  {
    id: 1,
    title: "Back Office Support",
    icon: BarChart3,
    description: "Data analysis and administrative workflow optimization.",
  },
  {
    id: 2,
    title: "QA & Testing",
    icon: MonitorCheck,
    description: "Comprehensive automated and manual software testing.",
  },
  {
    id: 3,
    title: "App Development",
    icon: Code2,
    description: "Full-cycle mobile and web application engineering.",
  },
  {
    id: 4,
    title: "Technical Helpdesk",
    icon: Headset,
    description: "24/7 technical support and issue resolution.",
  },
  {
    id: 5,
    title: "IT Infrastructure",
    icon: Server,
    description: "Cloud management and server maintenance.",
  },
];

const OrbitingCarouselDark = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // --- Configuration ---
  const X_RADIUS = 380; 
  const Y_OFFSET = 60;   // Positive Y_OFFSET makes the front card dip lower
  const TOTAL = services.length;

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handlePrev = () => setActiveIndex((prev) => prev - 1);

  // --- 3D Logic ---
  const getCardStyle = (index: number) => {
    const theta = ((index - activeIndex) * (2 * Math.PI)) / TOTAL;

    // 1. DEPTH (Cos): -1 (Back) to 1 (Front)
    const depth = Math.cos(theta);
    
    // 2. X POSITION (Sin): -1 (Left) to 1 (Right)
    const x = Math.sin(theta) * X_RADIUS;

    // 3. Y POSITION (Tilt): 
    // Positive Depth (Front) * Y_OFFSET = Positive Y (Down)
    const y = depth * Y_OFFSET;

    // 4. SCALE: Front = 1.0, Back = 0.6
    const scale = 0.6 + ((depth + 1) / 2) * 0.4;

    // 5. OPACITY: Front = 1, Back = 0.5
    const opacity = 0.5 + ((depth + 1) / 2) * 0.5;

    // 6. Z-INDEX
    const zIndex = Math.round((depth + 1) * 50);

    // 7. BLUR
    const blur = depth < 0.2 ? `blur(${Math.abs(depth - 0.2) * 5}px)` : "blur(0px)";

    return { x, y, scale, opacity, zIndex, filter: blur };
  };

  return (
    // Main container changed to dark slate background and white text
    <div className="w-full min-h-[600px] bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden py-20 relative">
      
      {/* Background Decor - Dark Blue/Cyan blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 to-slate-950 pointer-events-none" />


      {/* Heading - White and Blue text */}
      <div className="mb-20 text-center z-10 relative">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          OUR <span className="text-blue-500">SERVICES</span>
        </h2>
        <p className="text-gray-400 mt-2">Comprehensive IT Solutions</p>
      </div>

      {/* 3D Stage */}
      <div className="relative w-full max-w-5xl h-[400px] mt-[-50px] flex items-center justify-center perspective-1000">
        {services.map((service, index) => {
          const style = getCardStyle(index);
          const isFront = style.zIndex > 80;

          return (
            <motion.div
              key={service.id}
              animate={style}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 1,
              }}
              // Card Styles - Dark theme colors
              className={cn(
                "absolute w-[280px] h-[340px] rounded-2xl p-6 flex flex-col items-center justify-center text-center select-none cursor-pointer transition-colors duration-300",
                // Base dark card style
                "bg-slate-900 border shadow-2xl shadow-blue-900/20",
                // Conditional borders for active vs inactive
                isFront 
                  ? "border-blue-500/50 border-b-4 border-b-blue-500" 
                  : "border-slate-800 border-b-4 border-b-slate-700 hover:border-slate-700",
                 isFront && "hover:brightness-110"
              )}
              onClick={() => {
                const diff = (index - (activeIndex % TOTAL) + TOTAL) % TOTAL;
                if (diff === 1) handleNext();
                if (diff === TOTAL - 1) handlePrev();
              }}
            >
              {/* Icon Area */}
              <div className="flex-1 flex items-center justify-center w-full relative">
                {isFront && (
                  // Blue glow for front item
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-75 blur-md" />
                )}
                
                <div className={cn("relative z-10 transition-colors duration-300", isFront ? "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "text-slate-600")}>
                   <service.icon size={isFront ? 70 : 50} strokeWidth={1.5} />
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-4">
                <h3 className={cn("text-lg font-bold uppercase tracking-wide transition-colors duration-300", isFront ? "text-white" : "text-slate-500")}>
                  {service.title}
                </h3>
                <p className={cn("text-xs mt-2 leading-relaxed transition-opacity duration-300", isFront ? "text-gray-300 opacity-100" : "text-gray-500 opacity-0")}>
                  {service.description}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingCarouselDark;