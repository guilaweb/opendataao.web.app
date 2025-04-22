import React from "react";
import CopyCodeBlock from "@/components/CopyCodeBlock";

const examplePython = `import requests\nresp = requests.get('https://opendataao.web.app/api/datasets')\ndata = resp.json()\nprint(data)`;
const exampleCurl = `curl https://opendataao.web.app/api/datasets`;
const exampleJS = `fetch('https://opendataao.web.app/api/datasets')\n  .then(res => res.json())\n  .then(data => console.log(data));`;
const exampleDatasetDetail = `GET https://opendataao.web.app/api/dataset/ID_DO_DATASET`;

const Docs: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl bg-background text-foreground">
      <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-angola-accent mb-6">Documentação OpenDataAngola</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Bem-vindo à documentação oficial da plataforma OpenDataAngola. Aqui você encontra informações para explorar, consumir e contribuir com os dados abertos de Angola.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Como acessar os dados</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>
              Navegue até a página <a href="/datasets" className="underline text-angola-accent">Conjuntos de Dados</a> para visualizar e baixar datasets em formatos CSV, XLSX e JSON.
            </li>
            <li>
              Use a barra de pesquisa para encontrar conjuntos de dados específicos por nome ou tema.
            </li>
            <li>
              Cada conjunto de dados possui uma página detalhada com metadados, visualizações e opções de download.
            </li>
            <li>
              Explore os <a href="/angolaindicators" className="underline text-angola-accent">Indicadores de Angola</a> para análises econômicas rápidas.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">API Pública</h2>
          <p className="mb-2">Acesse os dados programaticamente via nossa API REST:</p>
          <CopyCodeBlock code={"GET https://opendataao.web.app/api/datasets"} language="" className="mb-3" />
          <ul className="list-disc pl-6 space-y-2 text-base mb-4">
            <li>Retorna a lista de datasets disponíveis em formato JSON.</li>
            <li>Para detalhes de um dataset: <CopyCodeBlock code={exampleDatasetDetail} language="" className="inline-block align-middle" /></li>
          </ul>
          <p className="mb-2 font-semibold">Exemplo em Python:</p>
          <CopyCodeBlock code={examplePython} language="python" className="mb-3" />
          <p className="mb-2 font-semibold">Exemplo em JavaScript:</p>
          <CopyCodeBlock code={exampleJS} language="javascript" className="mb-3" />
          <p className="mb-2 font-semibold">Exemplo com cURL:</p>
          <CopyCodeBlock code={exampleCurl} language="bash" className="mb-3" />
          <h3 className="text-lg font-bold mt-8 mb-2 text-angola-accent">Endpoints disponíveis</h3>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li><span className="font-mono font-semibold">GET /api/datasets</span>: Lista todos os datasets.</li>
            <li><span className="font-mono font-semibold">GET /api/dataset/:id</span>: Detalhes de um dataset específico.</li>
            <li><span className="font-mono font-semibold">GET /api/indicators</span>: Lista de indicadores econômicos.</li>
            <li><span className="font-mono font-semibold">GET /api/indicator/:id</span>: Detalhes de um indicador econômico.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Formatos de Dados Suportados</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>CSV: Para uso em Excel, Google Sheets e ferramentas de BI.</li>
            <li>XLSX: Planilhas compatíveis com Excel.</li>
            <li>JSON: Fácil integração com aplicações web e scripts.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Contribuindo com Dados</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Envie novos conjuntos de dados pelo e-mail <a href="mailto:guilaweb@gmail.com" className="underline text-angola-accent">guilaweb@gmail.com</a> ou pelo formulário na página <a href="/about" className="underline text-angola-accent">Sobre</a>.</li>
            <li>Os dados enviados serão avaliados e publicados conforme as diretrizes de qualidade da plataforma.</li>
            <li>Você pode sugerir correções ou melhorias para dados já existentes.</li>
            <li>Colabore com visualizações, artigos ou tutoriais utilizando os dados da plataforma.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Dúvidas Frequentes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li><strong>Os dados são gratuitos?</strong> Sim, todos os dados publicados são de acesso livre e gratuito.</li>
            <li><strong>Posso usar os dados para fins comerciais?</strong> Sim, desde que respeitada a licença de cada conjunto de dados (majoritariamente Creative Commons).</li>
            <li><strong>Como cito a fonte dos dados?</strong> Recomendamos citar "OpenDataAngola.org" e a fonte original informada em cada dataset.</li>
            <li><strong>Como reportar um erro nos dados?</strong> Utilize o e-mail de contato ou o formulário para relatar problemas.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Boas Práticas ao Usar Dados Abertos</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Verifique sempre a fonte e a atualização dos dados antes de usar em projetos críticos.</li>
            <li>Respeite a privacidade e a legislação de dados pessoais.</li>
            <li>Compartilhe suas análises e cite as fontes corretamente.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Contato e Suporte</h2>
          <p>Para dúvidas, sugestões ou suporte técnico, envie um e-mail para <a href="mailto:guilaweb@gmail.com" className="underline text-angola-accent">guilaweb@gmail.com</a>.</p>
        </section>
      </div>
    </main>
  );
};

export default Docs;
