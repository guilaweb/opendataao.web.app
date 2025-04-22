import ChartComponent from "../components/ChartComponent";
import { Award, BarChart2, TrendingUp, TrendingDown } from "lucide-react";

const negociosData = [
  { name: "Confiança Empresarial", value: 9, previous: 8, high: 31, low: -34, unit: "pontos", date: "Set/24" },
  { name: "Produção industrial", value: 2.2, previous: 3.4, high: 12.2, low: -9.9, unit: "%", date: "Dez/24" },
  { name: "Mãe da Produção Industrial", value: -0.2, previous: 3.3, high: 7.4, low: -6.1, unit: "%", date: "Dez/24" },
  { name: "Produção Industrial", value: 11.9, previous: 11.1, high: 34, low: -19.5, unit: "%", date: "Dez/24" },
  { name: "Produção de Mineração", value: -3.1, previous: 0.4, high: 13.8, low: -12.9, unit: "%", date: "Dez/24" },
];

export default function ArticleNegociosSetorIndustrial() {
  return (
    <article className="prose max-w-3xl mx-auto py-10 px-4 bg-card text-card-foreground">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-angola-accent mb-2 flex items-center gap-2">
          <BarChart2 className="inline text-angola-accent" size={28} />
          Panorama do Setor de Negócios e Indústria em Angola (2024)
        </h1>
        <p className="text-muted-foreground text-sm">
          Análise dos principais indicadores empresariais e industriais de Angola no final de 2024, com ênfase em confiança empresarial e desempenho produtivo.
        </p>
      </header>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Resumo Visual dos Indicadores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-angola-light rounded p-4 flex flex-col items-center">
            <span className="font-bold text-angola-accent text-3xl">{negociosData[0].value}</span>
            <span className="text-xs text-muted-foreground">Confiança Empresarial (Set/24)</span>
            <Award className="mt-2 text-angola-accent" size={24} />
          </div>
          <div className="bg-angola-light rounded p-4 flex flex-col items-center">
            <span className="font-bold text-angola-accent text-3xl">{negociosData[1].value}%</span>
            <span className="text-xs text-muted-foreground">Produção Industrial (Dez/24)</span>
            <TrendingUp className="mt-2 text-angola-accent" size={24} />
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Evolução dos Indicadores Industriais</h2>
        <ChartComponent
          type="bar"
          data={negociosData}
          title="Indicadores Industriais e Empresariais"
          dataKey="value"
          categoryKey="name"
        />
        <p className="text-xs text-muted-foreground mt-2">Fonte: Indicadores de Angola, Dez/24</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Análise Profunda</h2>
        <p>
          O ambiente de negócios em Angola apresenta sinais de recuperação, com a confiança empresarial atingindo 9 pontos em setembro de 2024. Apesar de oscilações, a produção industrial mostra crescimento consistente, embora o ritmo tenha desacelerado em relação ao ano anterior. O setor de mineração, por sua vez, enfrenta desafios, refletidos no desempenho negativo recente.
        </p>
        <p>
          Gráficos de barras destacam a evolução dos principais indicadores, permitindo rápida visualização de tendências e comparações históricas. Recomenda-se o uso de cores contrastantes e legendas claras para facilitar a interpretação dos dados.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Sugestões Visuais para Apresentação</h2>
        <ul className="list-disc pl-5">
          <li>Utilize gráficos de barras para comparar valores atuais, anteriores e extremos históricos.</li>
          <li>Inclua ícones temáticos (ex: troféu para confiança, seta para tendências) para reforçar a mensagem visual.</li>
          <li>Destaque os dados mais recentes com cores de destaque (amarelo/laranja).</li>
          <li>Disponibilize a tabela completa dos indicadores para consulta detalhada.</li>
        </ul>
      </section>
      <footer className="mt-10 text-xs text-muted-foreground">
        Publicado em abril de 2025. Dados: Indicadores de Angola.
      </footer>
    </article>
  );
}
