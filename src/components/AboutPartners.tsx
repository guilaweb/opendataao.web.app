import { Users, Award } from "lucide-react";

const partners = [
  { name: "Open Knowledge Brasil", url: "https://ok.org.br/", logo: "https://ok.org.br/wp-content/uploads/2021/11/okbr-logo-azul.png" },
  { name: "Data Science Angola", url: "https://www.datascienceangola.org/", logo: "https://www.datascienceangola.org/wp-content/uploads/2022/06/logo-dsa.png" },
  { name: "INE Angola", url: "https://www.ine.gov.ao/", logo: "https://www.ine.gov.ao/images/logo.png" },
];

export default function AboutPartners() {
  return (
    <section aria-labelledby="partners-title" className="my-12">
      <h2 id="partners-title" className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="text-angola-accent" />Parceiros</h2>
      <div className="flex flex-wrap gap-6 items-center">
        {partners.map((p, idx) => (
          <a key={idx} href={p.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group min-w-[120px]">
            <img src={p.logo} alt={`Logo ${p.name}`} className="w-20 h-12 object-contain mb-2 rounded shadow group-hover:scale-105 transition" loading="lazy" />
            <span className="text-xs text-angola-dark group-hover:underline">{p.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
