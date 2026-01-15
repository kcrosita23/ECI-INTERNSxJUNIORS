import { useState } from "react";

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
  { id: 5, name: "koya rudy", role: "tech support", image: "/team_eci_nobg/koya rudy.png" },
  { id: 6, name: "sirAA", role: "tech support", image: "/team_eci_nobg/sir_AA.png" },
  { id: 7, name: "sirJo", role: "tech support", image: "/team_eci_nobg/sir.Jo.png" },
  { id: 8, name: "madamsher", role: "tech support", image: "/team_eci_nobg/madama sherrr.png" },
  { id: 9, name: "oasss", role: "tech support", image: "/team_eci_nobg/Oassss.png" },
  { id: 10, name: "kimm", role: "tech support", image: "/team_eci_nobg/kimm.png" },
  { id: 11, name: "cheche", role: "tech support", image: "/team_eci_nobg/cheche.png" },
  { id: 12, name: "jaymir", role: "tech support", image: "/team_eci_nobg/jaymirr.png" },
];

/* ================= COMPONENT ================= */
export default function About() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Our Team
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Meet the people behind our work.
        </p>
      </div>

      {/* IMAGES – HORIZONTAL */}
      <div className="flex gap-6 overflow-x-auto pb-4 mb-16">
        {team.map((member) => (
          <div
            key={member.id}
            className={`min-w-[160px] relative overflow-hidden rounded-2xl transition-all duration-300
              ${
                activeId === member.id
                  ? "scale-105 ring-4 ring-blue-500 shadow-xl"
                  : activeId
                  ? "opacity-40 grayscale"
                  : ""
              }`}
          >
            <img
              src={member.image}
              alt={`Team member ${member.id}`}
              className="w-full h-48 object-contain bg-gray-100"
            />
          </div>
        ))}
      </div>

      {/* NAMES – HIERARCHY */}
      <div className="max-w-md mx-auto flex flex-col space-y-8 relative">
        {team.map((member, index) => (
          <div
            key={member.id}
            onMouseEnter={() => setActiveId(member.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() =>
              setActiveId(activeId === member.id ? null : member.id)
            }
            className="relative cursor-pointer pl-10"
          >
            {/* Vertical line */}
            {index !== team.length - 1 && (
              <span className="absolute left-4 top-6 h-full w-px bg-gray-300" />
            )}

            {/* Dot */}
            <span
              className={`absolute left-3 top-2 w-3 h-3 rounded-full
                ${
                  activeId === member.id
                    ? "bg-blue-500"
                    : "bg-gray-400"
                }`}
            />

            <p
              className={`text-xl font-semibold transition-colors
                ${
                  activeId === member.id
                    ? "text-blue-500"
                    : "text-gray-800 hover:text-blue-500"
                }`}
            >
              {member.name || `Member ${member.id}`}
            </p>

            <p className="text-gray-500 text-sm">
              {member.role || " "}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
