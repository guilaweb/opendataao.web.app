import { Clock, Sparkles } from "lucide-react";

const timeline = [
  { year: "2022", title: "Início da Ideia", desc: "Discussão inicial sobre a necessidade de dados abertos em Angola." },
  { year: "2023", title: "Prototipagem", desc: "Primeiro protótipo da plataforma e coleta de dados públicos." },
  { year: "2024", title: "Lançamento Beta", desc: "Lançamento público da versão beta com datasets iniciais." },
  { year: "2025", title: "Expansão e Parcerias", desc: "Novos recursos, infográficos, parcerias e comunidade ativa." },
];

export default function AboutTimeline() {
  return (
    <section aria-labelledby="timeline-title" className="my-12">
      <h2 id="timeline-title" className="text-2xl font-bold mb-6 flex items-center gap-2"><Clock className="text-angola-accent" />Linha do tempo</h2>
      <ol className="relative border-l-2 border-angola-accent/20 pl-6">
        {timeline.map((item, idx) => (
          <li key={idx} className="mb-8 ml-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block bg-angola-accent/10 text-angola-accent px-2 py-0.5 rounded text-xs font-bold">{item.year}</span>
              <span className="font-semibold text-angola-dark">{item.title}</span>
              {idx === timeline.length - 1 && <Sparkles className="text-angola-accent" size={16} />}
            </div>
            <p className="text-sm text-muted-foreground ml-1">{item.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
