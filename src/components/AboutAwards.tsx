import { Award } from "lucide-react";

const awards = [
  { year: "2024", title: "Iniciativa de Dados Abertos do Ano", org: "Data Science Angola" },
  { year: "2025", title: "Reconhecimento em Inovação Social", org: "Open Knowledge Brasil" },
];

export default function AboutAwards() {
  return (
    <section aria-labelledby="awards-title" className="my-12">
      <h2 id="awards-title" className="text-2xl font-bold mb-6 flex items-center gap-2"><Award className="text-angola-accent" />Prêmios</h2>
      <ul className="space-y-4">
        {awards.map((a, idx) => (
          <li key={idx} className="flex items-center gap-4 bg-angola-accent/5 rounded p-4">
            <Award className="text-angola-accent" size={28} />
            <div>
              <div className="font-bold text-angola-dark">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.org} &bull; {a.year}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
