import { Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Joana P.",
    text: "A plataforma facilitou muito meu trabalho como pesquisadora. Os dados são confiáveis e fáceis de acessar!"
  },
  {
    name: "Miguel L.",
    text: "Uso o OpenDataAngola para criar reportagens com dados oficiais. Recomendo a todos jornalistas!"
  },
  {
    name: "Sara M.",
    text: "Excelente iniciativa para promover transparência e inovação em Angola. Parabéns à equipe!"
  }
];

export default function AboutTestimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="my-12">
      <h2 id="testimonials-title" className="text-2xl font-bold mb-6 flex items-center gap-2"><Sparkles className="text-angola-accent" />Depoimentos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-angola-accent/5 rounded-lg p-4 shadow flex flex-col gap-2">
            <div className="text-angola-dark italic">“{t.text}”</div>
            <div className="text-xs text-angola-accent font-bold mt-2">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
