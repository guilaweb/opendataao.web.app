import React from "react";
import CopyCodeBlock from "@/components/CopyCodeBlock";

const examplePython = `import requests\nresp = requests.get('https://opendataao.web.app/api/datasets')\ndata = resp.json()\nprint(data)`;
const exampleCurl = `curl https://opendataao.web.app/api/datasets`;
const exampleJS = `fetch('https://opendataao.web.app/api/datasets')\n  .then(res => res.json())\n  .then(data => console.log(data));`;
const exampleDatasetDetail = `GET https://opendataao.web.app/api/dataset/ID_DO_DATASET`;
const exampleR = `library(httr)\nlibrary(jsonlite)\nresp <- GET('https://opendataao.web.app/api/datasets')\ndata <- fromJSON(content(resp, as='text'))\nprint(data)`;
const exampleJava = `import java.net.*;\nimport java.io.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    URL url = new URL("https://opendataao.web.app/api/datasets");\n    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));\n    String inputLine;\n    while ((inputLine = in.readLine()) != null)\n      System.out.println(inputLine);\n    in.close();\n  }\n}`;
const examplePHP = `<?php\n$response = file_get_contents('https://opendataao.web.app/api/datasets');\n$data = json_decode($response, true);\nprint_r($data);\n?>`;
const exampleAuth = `fetch('https://opendataao.web.app/api/datasets', {\n  headers: {\n    'Authorization': 'Bearer SEU_TOKEN_AQUI'\n  }\n})\n  .then(res => res.json())\n  .then(data => console.log(data));`;

const Api: React.FC = () => {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="bg-card text-card-foreground max-w-3xl mx-auto rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-angola-accent mb-6">API Pública OpenDataAngola</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Acesse dados abertos de Angola de forma programática via nossa API REST. Ideal para integrações, automações, dashboards e análises avançadas.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Endpoints disponíveis</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-4">
            <li><span className="font-mono font-semibold">GET /api/datasets</span>: Lista todos os datasets disponíveis.</li>
            <li><span className="font-mono font-semibold">GET /api/dataset/:id</span>: Detalhes de um dataset específico.</li>
            <li><span className="font-mono font-semibold">GET /api/indicators</span>: Lista de indicadores econômicos.</li>
            <li><span className="font-mono font-semibold">GET /api/indicator/:id</span>: Detalhes de um indicador econômico.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Exemplos de Uso</h2>
          <p className="mb-2 font-semibold">Python:</p>
          <CopyCodeBlock code={examplePython} language="python" className="mb-3" />
          <p className="mb-2 font-semibold">JavaScript (fetch):</p>
          <CopyCodeBlock code={exampleJS} language="javascript" className="mb-3" />
          <p className="mb-2 font-semibold">cURL:</p>
          <CopyCodeBlock code={exampleCurl} language="bash" className="mb-3" />
          <p className="mb-2 font-semibold">R:</p>
          <CopyCodeBlock code={exampleR} language="r" className="mb-3" />
          <p className="mb-2 font-semibold">Java:</p>
          <CopyCodeBlock code={exampleJava} language="java" className="mb-3" />
          <p className="mb-2 font-semibold">PHP:</p>
          <CopyCodeBlock code={examplePHP} language="php" className="mb-3" />
          <p className="mb-2 font-semibold">Detalhes de dataset:</p>
          <CopyCodeBlock code={exampleDatasetDetail} language="" className="mb-3" />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Autenticação (Opcional)</h2>
          <p className="mb-2">A maioria dos dados é pública e não requer autenticação. No entanto, para endpoints restritos ou recursos avançados, utilize um token JWT no header <code>Authorization</code>:</p>
          <CopyCodeBlock code={exampleAuth} language="javascript" className="mb-3" />
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Solicite seu token pelo e-mail <a href="mailto:guilaweb@gmail.com" className="underline text-angola-accent">guilaweb@gmail.com</a> caso necessário.</li>
            <li>Inclua o token em <code>Authorization: Bearer SEU_TOKEN_AQUI</code>.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Formato de Resposta</h2>
          <p>Todos os endpoints retornam dados em formato JSON, facilitando a integração com aplicações web, scripts e ferramentas de análise.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Limites e Uso Responsável</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Evite realizar requisições em massa desnecessárias para não sobrecarregar a plataforma.</li>
            <li>Utilize cache local sempre que possível.</li>
            <li>Caso precise de acesso especial, entre em contato pelo e-mail <a href="mailto:guilaweb@gmail.com" className="underline text-angola-accent">guilaweb@gmail.com</a>.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-angola-accent">Detalhes Técnicos</h2>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Base URL: <span className="font-mono">https://opendataao.web.app/api/</span></li>
            <li>Formato de resposta: <span className="font-mono">application/json</span></li>
            <li>Suporta CORS para aplicações web.</li>
            <li>Limite de requisições: 60 por minuto por IP (para uso público).</li>
            <li>Tempo de resposta médio: &lt; 500ms para endpoints públicos.</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Api;
