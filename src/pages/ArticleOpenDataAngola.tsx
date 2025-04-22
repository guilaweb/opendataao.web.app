import { BarChart2, Globe, Users, Eye, Award, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleOpenDataAngola() {
  return (
    <article className="max-w-3xl mx-auto py-8 px-4 bg-card text-card-foreground rounded-lg shadow-lg">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-angola-accent">Por que Dados Abertos são Importantes para Angola?</h1>
        <p className="text-lg text-muted-foreground">Descubra como dados abertos impulsionam transparência, inovação e desenvolvimento sustentável em Angola.</p>
      </header>

      {/* Infográfico 1: Benefícios em destaque */}
      <section aria-labelledby="beneficios" className="mb-10">
        <h2 id="beneficios" className="sr-only">Benefícios dos Dados Abertos</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          <li className="flex flex-col items-center text-center" tabIndex={0} aria-label="Transparência e Prestação de Contas">
            <Eye className="text-angola-accent mb-2" size={38} aria-hidden="true" />
            <span className="font-semibold">Transparência</span>
            <span className="text-xs text-muted-foreground">Governo aberto e prestação de contas à sociedade</span>
          </li>
          <li className="flex flex-col items-center text-center" tabIndex={0} aria-label="Inovação e Novos Negócios">
            <Award className="text-angola-accent mb-2" size={38} aria-hidden="true" />
            <span className="font-semibold">Inovação</span>
            <span className="text-xs text-muted-foreground">Startups e soluções digitais usando dados públicos</span>
          </li>
          <li className="flex flex-col items-center text-center" tabIndex={0} aria-label="Participação Social e Cidadania">
            <Users className="text-angola-accent mb-2" size={38} aria-hidden="true" />
            <span className="font-semibold">Cidadania</span>
            <span className="text-xs text-muted-foreground">Sociedade mais engajada e informada</span>
          </li>
        </ul>
      </section>

      {/* Infográfico 2: Impactos práticos */}
      <section aria-labelledby="impactos" className="mb-10">
        <h2 id="impactos" className="text-xl font-bold mb-4">Impactos Reais dos Dados Abertos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Acesso a serviços melhores</strong>
              <p className="text-sm text-muted-foreground">Dados abertos permitem monitorar saúde, educação, segurança e infraestrutura, ajudando o governo a tomar decisões mais eficazes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Combate à corrupção</strong>
              <p className="text-sm text-muted-foreground">Transparência nos gastos públicos e contratos reduz oportunidades para corrupção e desvios.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Desenvolvimento econômico</strong>
              <p className="text-sm text-muted-foreground">Empreendedores e pesquisadores usam dados abertos para criar negócios, aplicativos e pesquisas que beneficiam a economia nacional.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Inclusão e igualdade</strong>
              <p className="text-sm text-muted-foreground">Dados sobre diferentes regiões e grupos sociais ajudam a identificar desigualdades e promover políticas públicas mais justas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Infográfico 3: Angola no mundo dos dados abertos */}
      <section aria-labelledby="angola-mundo" className="mb-10">
        <h2 id="angola-mundo" className="text-xl font-bold mb-4">Angola no Contexto Global</h2>
        <div className="flex items-center gap-4">
          <Globe className="text-angola-accent" size={40} aria-hidden="true" />
          <p className="text-muted-foreground text-sm">
            Países que investem em dados abertos avançam mais rápido em inovação, transparência e qualidade de vida. Angola está dando passos importantes para se inserir nesse movimento global.
          </p>
        </div>
      </section>

      <section aria-labelledby="como-participar" className="mb-10">
        <h2 id="como-participar" className="text-xl font-bold mb-4">Como Participar?</h2>
        <ul className="list-disc pl-6 space-y-2" role="list">
          <li tabIndex={0}>Acesse e explore <Link className="underline text-angola-accent" to="/datasets">conjuntos de dados públicos</Link>.</li>
          <li tabIndex={0}>Compartilhe informações e incentive o uso de dados abertos em sua comunidade.</li>
          <li tabIndex={0}>Sugira novos conjuntos de dados e colabore para melhorar a plataforma.</li>
        </ul>
      </section>

      <footer className="mt-10 border-t pt-6 text-center text-muted-foreground text-xs">
        Artigo produzido por OpenDataAngola • Acessível para leitores de tela • Última atualização: Abril/2025
      </footer>
    </article>
  );
}
