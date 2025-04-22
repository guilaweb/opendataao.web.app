import { useParams } from "react-router-dom";
import { useState } from "react";
import { datasets, economicData, energySourcesData, populationByProvinceData, constructionPriceData } from "@/data/mock-data";
import ChartComponent from "@/components/ChartComponent";
import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import ConstructionPriceTable from "@/components/ConstructionPriceTable";

const DatasetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  const dataset = datasets.find((ds) => ds.id === id);
  
  if (!dataset) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="container mx-auto px-4 py-12 flex-grow">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Conjunto de dados não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              O conjunto de dados que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <a href="/datasets">Voltar para conjuntos de dados</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  let chartData;
  let pieData;
  
  switch (dataset.id) {
    case "economic-indicators":
      chartData = economicData;
      pieData = null;
      break;
    case "energy-consumption":
      chartData = null;
      pieData = energySourcesData;
      break;
    case "census-2024":
      chartData = populationByProvinceData;
      pieData = null;
      break;
    default:
      chartData = economicData;
      pieData = null;
  }

  const renderMetadata = () => {
    if (dataset.id === "construction-price-index") {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Título Geral</h4>
            <p>Índice de Preços de Material de Construção (IPMC) - Angola (Mar 2024 - Mar 2025)</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Editor / Autoridade</h4>
            <p>Instituto Nacional de Estatística (INE), Angola</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Fonte Original</h4>
            <p>Relatório "IPMC - Índice de Preços de Material de Construção - Março 2025", publicado pelo INE Angola</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Cobertura</h4>
            <p><strong>Geográfica:</strong> Angola</p>
            <p><strong>Temporal:</strong> Março de 2024 a Março de 2025</p>
            <p><strong>Frequência de Atualização:</strong> Mensal</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Contacto da Fonte Original (INE)</h4>
            <p>Departamento de Informação e Difusão - INE</p>
            <p>Email: geral@ine.gov.ao / geraline9@gmail.com</p>
            <p>Telefone: (+244) 924 354 015</p>
            <p>Website: <a href="https://www.ine.gov.ao" className="text-angola-accent hover:underline" target="_blank" rel="noopener noreferrer">www.ine.gov.ao</a></p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Metodologia</h4>
            <p>Os dados são derivados do Inquérito aos Preços de Materiais de Construção realizado pelo INE. Os índices utilizam ponderadores baseados na estrutura de custos de 2015. Para detalhes metodológicos completos, consultar a publicação original do INE ou a documentação metodológica associada.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Licença de Utilização</h4>
            <p>Reprodução autorizada, excepto para fins comerciais, com indicação da fonte bibliográfica © INE. Luanda, Angola – 2025.</p>
            <p className="text-sm text-yellow-600 mt-2">
              <strong>Nota Importante:</strong> Esta licença NÃO é uma licença Open Data padrão, pois restringe o uso comercial. 
              É crucial que os utilizadores respeitem esta restrição imposta pela fonte original (INE).
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Especificações Técnicas</h4>
            <p><strong>Formato:</strong> CSV (Comma Separated Values)</p>
            <p><strong>Codificação:</strong> UTF-8</p>
            <p><strong>Idioma:</strong> Português (pt)</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Observações de Qualidade/Processamento</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dados extraídos do relatório PDF original utilizando tecnologia de Reconhecimento Óptico de Caracteres (OCR).</li>
              <li>Pode haver erros residuais resultantes do processo de OCR ou da interpretação da estrutura das tabelas. Recomenda-se a verificação cruzada com o relatório original para usos críticos.</li>
              <li>Os dados foram reestruturados para um formato "longo" (tidy data) para facilitar a análise.</li>
              <li>Os separadores decimais originais (vírgula) foram convertidos para ponto (.) nos ficheiros CSV.</li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Informações do Conjunto de Dados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Título</h4>
            <p>{dataset.title}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Categoria</h4>
            <p>{dataset.category}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Data de Atualização</h4>
            <p>{dataset.updatedAt}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Formato</h4>
            <p>CSV, JSON, XLSX</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Licença</h4>
            <p>Creative Commons Attribution 4.0</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Fonte</h4>
            <p>Instituto Nacional de Estatística de Angola</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-muted-foreground">Descrição</h4>
            <p>{dataset.description}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderVisualize = () => {
    if (dataset.id === "construction-price-index") {
      return (
        <div className="space-y-8">
          {/* 1. APRESENTAÇÃO */}
          <section className="mt-2">
            <h2 className="text-lg font-semibold text-angola-accent mb-2">1. APRESENTAÇÃO</h2>
            <p>O Instituto Nacional de Estatística (INE) põe à disposição dos seus usuários, a “Folha de Informação Rápida” com os resultados mensais do Índice de Preços de Material de Construção (IPMC) do mês de Janeiro de 2023. Os resultados apresentados compreendem o período de Janeiro de 2022 a Janeiro de 2023. Os mercados e estabelecimentos de recolha são formais e informais onde são comercializados os materiais destinados à construção de Habitações, Edifícios residenciais e não residenciais, Estradas e outras obras de infra-estruturas.</p>
            <p>O preço dos materiais de construção é um importante indicador para o mercado da construção, pois é através da sua variação que se consegue identificar o grau de intensidade das actividades do sector da construção. Este indicador tem como objectivos os seguintes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Medir a evolução dos preços dos materiais de origem nacional e importado que participam na actividade da Construção e que são comercializados no mercado nacional.</li>
              <li>Servir como elemento fundamental para a actualização dos orçamentos das obras da construção, utilizando fórmulas polinomiais para cada tipo de obra.</li>
              <li>Servir como deflector dos valores nominais ou correntes relacionados com a actividade da Construção.</li>
              <li>Construir séries de preços para elaborar índices elementares de materiais da construção e índices agregados dos mesmos.</li>
            </ul>
            <p>Aproveitamos a oportunidade para expressar os nossos agradecimentos a todas as entidades que, em tempo oportuno, concederam o apoio necessário à realização desta operação estatística, bem como as unidades empresariais que responderam ao questionário contribuindo deste modo para o aumento da produção estatística oficial do país.</p>
            <p>Eventuais pedidos de esclarecimentos, comentários ou sugestões, para melhorar a presente publicação, podem ser dirigidos ao Instituto Nacional de Estatística, Departamento de Informação e Difusão, no seguinte endereço: <a href="mailto:geral@ine.gov.ao" className="text-angola-accent underline">geral@ine.gov.ao</a>.</p>
          </section>

          {/* 2. SINAIS CONVENCIONAIS E ABREVIATURAS */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-angola-accent mb-2">2. SINAIS CONVENCIONAIS E ABREVIATURAS</h2>
            <ul className="grid md:grid-cols-2 gap-4 text-sm">
              <li><b>INE</b>: Instituto Nacional de Estatística</li>
              <li><b>IPMC</b>: Índice de Preços de Materiais de Construção</li>
              <li><b>SPINE</b>: Serviços Provinciais do Instituto Nacional de Estatística</li>
              <li><b>CAE Rev.2</b>: Classificação das Actividades Económica Revisão 2</li>
              <li><b>CNBS Rev. 1</b>: Classificação Nacional de Bens e Serviços Revisão 1</li>
              <li><b>DEEF</b>: Departamento de Estatísticas Económicas e Financeiras</li>
              <li><b>DEI</b>: Domínio de Estatísticas Industriais</li>
              <li><b>…</b>: Dado confidencial</li>
              <li><b>Nd</b>: Dados não disponíveis</li>
              <li><b>n.e</b>: Não especificado</li>
              <li><b>%</b>: Percentagem</li>
              <li><b>_</b>: Valor nulo</li>
              <li><b>Nº</b>: Número</li>
              <li><b>Kz.</b>: Kwanza</li>
            </ul>
          </section>

          {/* 3. SÍNTESE DOS PRINCIPAIS RESULTADOS */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-angola-accent mb-2">3. SÍNTESE DOS PRINCIPAIS RESULTADOS</h2>
            <p>O Índice de Preços dos Materiais de Construção (IPMC) apresentou uma variação de 0,8% em Janeiro de 2023 em relação ao mês de Dezembro de 2022, pelo que não se verificou quase nenhuma variação em relação à registada no mês anterior. A taxa de variação homóloga do IPMC, Janeiro de 2023 em relação ao Dezembro de 2022, fixou-se em 10,6%.</p>
            <p>Nas variações homólogas, entre os grupos de Materiais de Construção, “Madeira e Contraplacado” foi o que registou maior aumento nos preços com 16,5%, seguidos pelos “Areia”, “Pedra britada e Mármore” e Blocos” todos com 14,1,%, “Vidros e Artigos de vidro“ com 13,9%, “Outros Produtos Sintéticos” com 13,5%, “Tubagens e Acessórios de Plásticos” com 13,4%, “Betão pronto” com 12,9%, “Produtos Sintéticos” com 12,8%, “Vigas, Vigotas e Ripas” com 12,7%, “Tijolos” com 11,9%, “Alumino” com 11,6%, “Aço” com 11,4%, e “Cimento e Aglomerantes” com 5,5%.</p>
            <p>Os Grupos de materiais que mais contribuíram na variação do IPMC do mês de Janeiro são: “Aço” com 0,4% seguido do “Betão pronto e Cimentos e Aglomerantes” com 0,1 pontos percentuais, cada.</p>
            <div className="mt-4">
              <b>Quadro 1 - Principais Materiais de Construção</b>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-1 border">Material</th>
                      <th className="p-1 border">Variação Mensal (%)</th>
                      <th className="p-1 border">Variação Homóloga (%)</th>
                      <th className="p-1 border">Contribuição (p.p)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-1">Total Material de Construção</td><td className="border p-1">0,8</td><td className="border p-1">10,6</td><td className="border p-1">0,8</td></tr>
                    <tr><td className="border p-1">Aço</td><td className="border p-1">1,3</td><td className="border p-1">11,4</td><td className="border p-1">0,4</td></tr>
                    <tr><td className="border p-1">Alumínio</td><td className="border p-1">0,2</td><td className="border p-1">11,6</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Areia</td><td className="border p-1">0,8</td><td className="border p-1">14,1</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Betão pronto</td><td className="border p-1">0,5</td><td className="border p-1">12,9</td><td className="border p-1">0,1</td></tr>
                    <tr><td className="border p-1">Pedra britada e Mármore</td><td className="border p-1">0,9</td><td className="border p-1">14,1</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Tijolos</td><td className="border p-1">0,2</td><td className="border p-1">11,9</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Tubagens e Acessórios de Plásticos</td><td className="border p-1">0,9</td><td className="border p-1">13,4</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Cimento e Aglomerantes</td><td className="border p-1">0,4</td><td className="border p-1">5,5</td><td className="border p-1">0,1</td></tr>
                    <tr><td className="border p-1">Produtos Sintéticos</td><td className="border p-1">1,0</td><td className="border p-1">12,8</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Outros produtos sintéticos</td><td className="border p-1">0,4</td><td className="border p-1">13,5</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Vidros e Artigos de vidro</td><td className="border p-1">0,8</td><td className="border p-1">13,9</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Blocos</td><td className="border p-1">0,5</td><td className="border p-1">14,1</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Madeira e Contraplacado</td><td className="border p-1">1,0</td><td className="border p-1">16,5</td><td className="border p-1">0,0</td></tr>
                    <tr><td className="border p-1">Vigas, Vigotas e Ripas</td><td className="border p-1">0,3</td><td className="border p-1">12,7</td><td className="border p-1">0,0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. CONCEITOS E RESUMO METODOLÓGICO */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-angola-accent mb-2">4. CONCEITOS E RESUMO METODOLÓGICO</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><b>Índice de Preços de Materiais de Construção:</b> Indicador económico que reflecte a variação dos preços dos principais materiais que intervêm na actividade de construção e transformação de edifícios para qualquer fim e a Promoção imobiliária, Engenharia civil, trabalhos especializados de construção como demolição e preparação dos locais de construção, instalação eléctrica, acabamento de edifícios e outras obras, excluindo a promoção imobiliária, os custos da mão-de-obra e aluguer de equipamento, inerentes aos custos da construção.</li>
              <li><b>Estabelecimentos:</b> Unidade de observação cuja actividade económica é produtora ou comercial, que comercializa produtos que são utilizados na construção.</li>
              <li><b>Estrutura de Ponderação:</b> Reflecte a importância dos produtos que entram na composição do cabaz do IPMC, obtida através dos valores da produção nacional e das importações.</li>
              <li><b>Amostra:</b> O tamanho da amostra é de 140 diferentes tipos de materiais para a construção, de origem nacional e importado.</li>
              <li><b>Seleção dos Produtos:</b> Utilizaram-se diferentes fontes de informação: Contas Nacionais, Inquéritos de Produção industrial e dados de Comércio Externo do INE.</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Para detalhes completos, consulte o <a href="https://www.ine.gov.ao/Arquivos/arquivosCarregados//Carregados/Publicacao_638121009053431397.pdf" target="_blank" rel="noopener noreferrer" className="text-angola-accent underline">relatório original do INE</a>.
            </p>
          </section>

          {/* 5. Gráfico do Quadro 1 + Interpretação */}
          <ChartComponent
            type="bar"
            data={[
              { name: "Total Material de Construção", value: 0.8 },
              { name: "Aço", value: 1.3 },
              { name: "Alumínio", value: 0.2 },
              { name: "Areia", value: 0.8 },
              { name: "Betão pronto", value: 0.5 },
              { name: "Pedra britada e Mármore", value: 0.9 },
              { name: "Tijolos", value: 0.2 },
              { name: "Tubagens e Acessórios de Plásticos", value: 0.9 },
              { name: "Cimento e Aglomerantes", value: 0.4 },
              { name: "Produtos Sintéticos", value: 1.0 },
              { name: "Outros produtos sintéticos", value: 0.4 },
              { name: "Vidros e Artigos de vidro", value: 0.8 },
              { name: "Blocos", value: 0.5 },
              { name: "Madeira e Contraplacado", value: 1.0 },
              { name: "Vigas, Vigotas e Ripas", value: 0.3 },
            ]}
            title="Variação Mensal (%) - Quadro 1: Principais Materiais de Construção"
            dataKey="value"
            categoryKey="name"
          />

          <section className="bg-amber-50 border-l-4 border-angola-accent p-6 rounded-xl mt-6">
            <h2 className="text-lg font-bold text-angola-accent mb-2">Interpretação dos Resultados</h2>
            <p>
              O gráfico acima apresenta a variação percentual mensal dos principais materiais de construção. Observa-se que materiais como aço, madeira e produtos sintéticos tiveram as maiores variações no período analisado, indicando forte influência destes insumos no custo total da construção. O monitoramento dessas variações é fundamental para o planejamento de obras e definição de políticas de preços.
            </p>
            <p>
              Destaca-se que o aço, além de apresentar a maior variação mensal, também é um dos materiais com maior ponderação no índice, o que potencializa seu impacto no resultado geral do IPMC. Esse comportamento pode estar relacionado à dependência de importação e à volatilidade dos preços internacionais.
            </p>
            <p>
              Materiais como areia, betão pronto e pedra britada, embora apresentem variações menores, são essenciais para a construção civil e podem indicar estabilidade de oferta ou políticas de preços mais controladas no mercado nacional.
            </p>
            <p>
              A presença de variações próximas de zero em alguns materiais, como tijolos e blocos, sugere estabilidade ou pouca influência de fatores externos no curto prazo. Já os produtos sintéticos e madeira, com variações elevadas, podem refletir oscilações na cadeia de suprimentos ou mudanças na demanda do setor.
            </p>
            <p>
              Em síntese, a análise detalhada dos materiais permite identificar tendências e antecipar possíveis pressões inflacionárias, sendo uma ferramenta estratégica para gestores públicos, empresários e demais agentes da construção civil.
            </p>
            <div className="mt-4 text-right font-semibold text-angola-accent">
              Prof. Eugénio Dianguila<br/>
              Autor
            </div>
          </section>

          {/* Tabela detalhada dos materiais (final) */}
          <ConstructionPriceTable data={constructionPriceData} />
        </div>
      );
    }
    
    return (
      <div className="p-12 border rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">
          Ferramentas de visualização avançadas serão adicionadas em breve.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{dataset.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Categoria: {dataset.category}</span>
              <span>•</span>
              <span>Atualizado: {dataset.updatedAt}</span>
            </div>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              JSON
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Baixar Todos
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">{dataset.description}</p>

        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="visualize">Visualizar</TabsTrigger>
            <TabsTrigger value="metadata">Metadados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="border rounded-md p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-angola-accent mb-2">Resumo</h2>
              <p>
                O Índice de Preços de Materiais de Construção (IPMC) é um importante indicador econômico que reflete as variações nos custos dos principais insumos utilizados no setor da construção em Angola. Nos últimos meses, o IPMC apresentou tendência de crescimento, impulsionada principalmente pela elevação nos preços do aço, madeira e produtos sintéticos. Esses materiais, além de terem grande peso no índice, são fundamentais para obras de infraestrutura e habitação.
              </p>
              <p>
                Apesar das variações mais acentuadas em alguns insumos, materiais como areia, betão pronto e pedra britada mantiveram estabilidade, contribuindo para um cenário de relativa previsibilidade em parte do setor. A análise detalhada do IPMC permite identificar tendências, antecipar pressões inflacionárias e subsidiar decisões estratégicas para gestores públicos, empresários e demais agentes da construção civil.
              </p>
              <p className="mt-2 text-right font-semibold text-angola-accent">
                Prof. Eugénio Dianguila<br/>
                Autor
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="visualize">
            {renderVisualize()}
          </TabsContent>
          
          <TabsContent value="metadata">
            <div className="border rounded-md p-6">
              {renderMetadata()}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DatasetDetail;
