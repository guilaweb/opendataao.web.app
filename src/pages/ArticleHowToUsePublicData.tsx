import { Search, Download, BarChart2, Users, BookOpen, Lightbulb, Globe, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleSampleChart from "@/components/ArticleSampleChart";

export default function ArticleHowToUsePublicData() {
  return (
    <article className="max-w-3xl mx-auto py-8 px-4 bg-card text-card-foreground rounded-lg shadow-lg">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-angola-accent">Como Encontrar e Utilizar Dados Públicos?</h1>
        <p className="text-lg text-muted-foreground">Guia prático para localizar, baixar e aproveitar dados abertos em Angola para pesquisa, negócios e cidadania.</p>
      </header>

      {/* Infográfico 1: Onde encontrar dados públicos */}
      <section aria-labelledby="onde-encontrar" className="mb-10">
        <h2 id="onde-encontrar" className="text-xl font-bold mb-4">1. Onde Encontrar Dados?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          <li className="flex flex-col items-center text-center" tabIndex={0} aria-label="Portais Oficiais">
            <Globe className="text-angola-accent mb-2" size={38} aria-hidden="true" />
            <span className="font-semibold">Portais Oficiais</span>
            <span className="text-xs text-muted-foreground">Ex: <Link to="/datasets" className="underline">OpenDataAngola</Link>, INE, ministérios</span>
          </li>
          <li className="flex flex-col items-center text-center" tabIndex={0} aria-label="Órgãos Públicos">
            <Users className="text-angola-accent mb-2" size={38} aria-hidden="true" />
            <span className="font-semibold">Órgãos Públicos</span>
            <span className="text-xs text-muted-foreground">Solicite dados diretamente a instituições do governo</span>
          </li>
          <li className="flex flex-col items-center text-center" tabIndex={0} aria-label="Projetos e Comunidades">
            <Lightbulb className="text-angola-accent mb-2" size={38} aria-hidden="true" />
            <span className="font-semibold">Projetos e Comunidades</span>
            <span className="text-xs text-muted-foreground">ONGs, universidades e iniciativas abertas</span>
          </li>
        </ul>
      </section>

      {/* Infográfico 2: Como baixar e usar */}
      <section aria-labelledby="como-baixar" className="mb-10">
        <h2 id="como-baixar" className="text-xl font-bold mb-4">2. Como Baixar e Utilizar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Download className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Escolha o formato adequado</strong>
              <p className="text-sm text-muted-foreground">Prefira formatos abertos como CSV, JSON ou XLSX, que facilitam análise e integração.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BarChart2 className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Ferramentas para análise</strong>
              <p className="text-sm text-muted-foreground">Use Excel, Google Sheets, Python (pandas), R ou plataformas de BI para explorar os dados.</p>
              <ul className="list-disc pl-5 mt-1 text-xs text-angola-accent">
                <li><a href="https://pandas.pydata.org/" target="_blank" rel="noopener noreferrer">Python pandas</a></li>
                <li><a href="https://www.r-project.org/" target="_blank" rel="noopener noreferrer">R Project</a></li>
                <li><a href="https://powerbi.microsoft.com/" target="_blank" rel="noopener noreferrer">Power BI</a></li>
                <li><a href="https://lookerstudio.google.com/" target="_blank" rel="noopener noreferrer">Google Looker Studio</a></li>
                <li><a href="https://public.tableau.com/" target="_blank" rel="noopener noreferrer">Tableau Public</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico real de exemplo */}
      <section aria-labelledby="grafico-exemplo" className="mb-10">
        <h2 id="grafico-exemplo" className="text-xl font-bold mb-4">Exemplo Prático: Visualização de Dados</h2>
        <ArticleSampleChart />
      </section>

      {/* Infográfico 3: Boas práticas */}
      <section aria-labelledby="boas-praticas" className="mb-10">
        <h2 id="boas-praticas" className="text-xl font-bold mb-4">3. Boas Práticas ao Utilizar Dados</h2>
        <ul className="list-disc pl-6 space-y-2" role="list">
          <li tabIndex={0}><strong>Verifique a fonte:</strong> Utilize dados de portais confiáveis e cite sempre a origem.</li>
          <li tabIndex={0}><strong>Respeite a privacidade:</strong> Não utilize dados pessoais sem autorização ou anonimização.</li>
          <li tabIndex={0}><strong>Documente suas análises:</strong> Compartilhe resultados e métodos para promover transparência.</li>
          <li tabIndex={0}><strong>Colabore:</strong> Compartilhe feedback e contribua para melhorar a qualidade dos dados públicos.</li>
        </ul>
      </section>

      {/* Infográfico 4: Exemplos de uso */}
      <section aria-labelledby="exemplos-uso" className="mb-10">
        <h2 id="exemplos-uso" className="text-xl font-bold mb-4">4. Exemplos de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <BookOpen className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Pesquisa acadêmica</strong>
              <p className="text-sm text-muted-foreground">Estudos sobre saúde, educação, economia e ambiente usando dados abertos.</p>
              <span className="text-xs text-angola-accent block mt-1">Exemplo: <a href="https://www.ine.gov.ao/estatisticas/estatisticas-demograficas-e-indicadores-sociais" target="_blank" rel="noopener noreferrer">Indicadores Sociais INE Angola</a></span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Search className="text-angola-accent mt-1" aria-hidden="true" />
            <div>
              <strong>Jornalismo de dados</strong>
              <p className="text-sm text-muted-foreground">Reportagens investigativas e visualizações para informar a sociedade.</p>
              <span className="text-xs text-angola-accent block mt-1">Exemplo: <a href="https://www.jornaldeangola.ao/ao/noticias/dados-abertos-para-o-desenvolvimento/" target="_blank" rel="noopener noreferrer">Dados abertos no Jornal de Angola</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeo explicativo */}
      <section aria-labelledby="video-explicativo" className="mb-10">
        <h2 id="video-explicativo" className="text-xl font-bold mb-4 flex items-center gap-2"><Youtube className="text-angola-accent" aria-hidden="true" />Vídeo: O que são Dados Abertos?</h2>
        <div className="w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden border shadow">
          <iframe
            title="Como Encontrar e Utilizar Dados Públicos"
            src="https://www.youtube.com/embed/VNTmwmZI_So"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full min-h-[320px]"
            style={{ minHeight: 320 }}
          ></iframe>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Fonte: Canal Multiplicidade Mobilidade Urbana</p>
      </section>

      {/* Tradução inglês */}
      <section aria-labelledby="english-version" className="mb-10">
        <h2 id="english-version" className="text-xl font-bold mb-4">English Summary</h2>
        <p className="text-sm text-muted-foreground">
          <strong>How to Find and Use Public Data?</strong> <br />
          This article presents a practical guide for finding, downloading, and analyzing open data in Angola. It covers official portals, recommended tools (Excel, Python pandas, Power BI, Tableau, etc.), best practices, and real-world examples for research, journalism, and civic engagement. Watch the video above for a quick introduction to open data!
        </p>
      </section>

      <footer className="mt-10 border-t pt-6 text-center text-muted-foreground text-xs">
        Artigo produzido por OpenDataAngola • Acessível para leitores de tela • Última atualização: Abril/2025
      </footer>
    </article>
  );
}
