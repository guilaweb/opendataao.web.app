import { Github, Twitter } from "lucide-react";

const team = [
  {
    name: "Eugénio Dianguila",
    role: "Coordenador",
    avatar: "/coordenador.jpg",
    github: "",
    twitter: ""
  }
];

export default function AboutTeam() {
  return (
    <section aria-labelledby="team-title" className="my-12">
      <h2 id="team-title" className="text-2xl font-bold mb-6">Equipe</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {team.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-angola-accent mb-2"
              loading="lazy"
            />
            <span className="font-bold text-lg text-angola-accent mt-2">{member.name}</span>
            <span className="text-sm text-angola-dark">{member.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
