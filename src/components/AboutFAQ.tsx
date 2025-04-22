import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "O que é o OpenDataAngola?",
    a: "Uma plataforma aberta para acesso, análise e uso de dados públicos sobre Angola.",
  },
  {
    q: "Como posso contribuir com dados?",
    a: "Entre em contato pelo e-mail ou GitHub para sugerir ou enviar novos conjuntos de dados.",
  },
  {
    q: "Preciso pagar para acessar os dados?",
    a: "Não. Todos os dados disponíveis são gratuitos e de acesso aberto.",
  },
  {
    q: "Posso usar os dados em projetos comerciais?",
    a: "Sim, desde que respeite as licenças e cite a fonte OpenDataAngola.",
  },
];

export default function AboutFAQ() {
  const [open, setOpen] = useState(-1);
  return (
    <section aria-labelledby="faq-title" className="my-12">
      <h2 id="faq-title" className="text-2xl font-bold mb-6 flex items-center gap-2"><HelpCircle className="text-angola-accent" />FAQ</h2>
      <ul className="space-y-4">
        {faqs.map((item, idx) => (
          <li key={idx} className="border rounded-md">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-angola-dark focus:outline-none focus:ring-2 focus:ring-angola-accent"
              onClick={() => setOpen(open === idx ? -1 : idx)}
              aria-expanded={open === idx}
              aria-controls={`faq-panel-${idx}`}
            >
              {item.q}
              {open === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {open === idx && (
              <div id={`faq-panel-${idx}`} className="px-4 pb-3 text-sm text-muted-foreground animate-fade-in">
                {item.a}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
