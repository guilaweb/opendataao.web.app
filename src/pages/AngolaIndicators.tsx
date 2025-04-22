import React, { useState } from "react";
import TableDownloadButtons from "@/components/TableDownloadButtons";

const indicators = [
  { category: "PIB", name: "Produto Interno Bruto (USD Bilhões)", value: "74.37", last: "2023" },
  { category: "Inflação", name: "Taxa de Inflação (YoY %)", value: "23.1", last: "Mar 2024" },
  { category: "Desemprego", name: "Taxa de Desemprego (%)", value: "31.6", last: "2023" },
  { category: "Dívida Pública", name: "Dívida Pública (% do PIB)", value: "85.8", last: "2023" },
  { category: "Taxa de Juro", name: "Taxa de Juro Básica (%)", value: "19.50", last: "2024" },
  { category: "Câmbio", name: "USD/AOA", value: "845.00", last: "Abr 2024" },
  { category: "Conta Corrente", name: "Conta Corrente (USD Milhões)", value: "-2,600", last: "2023" },
  { category: "Reservas", name: "Reservas Internacionais (USD Bilhões)", value: "14.2", last: "2024" },
  { category: "PIB per capita", name: "PIB per capita (USD)", value: "2,020", last: "2023" },
  { category: "População", name: "População (milhões)", value: "36.7", last: "2023" },
  { category: "Balança Comercial", name: "Balança Comercial (USD Milhões)", value: "+4,200", last: "2023" },
  { category: "Exportações", name: "Exportações (USD Milhões)", value: "39,600", last: "2023" },
  { category: "Importações", name: "Importações (USD Milhões)", value: "35,400", last: "2023" },
  { category: "PIB Crescimento", name: "Crescimento do PIB (%)", value: "0.9", last: "2023" },
  { category: "Déficit Orçamental", name: "Déficit Orçamental (% do PIB)", value: "-2.2", last: "2023" },
  { category: "Taxa de Pobreza", name: "Taxa de Pobreza (%)", value: "32.3", last: "2022" },
];

const overviewIndicators = [
  { name: "Moeda", current: "918", previous: "921", high: "966", low: "92,33", unit: "", last: "Abr/25" },
  { name: "Taxa de crescimento do PIB", current: "0,1", previous: "2.2", high: "23.2", low: "-9,5", unit: "por cento", last: "Dez/24" },
  { name: "Taxa de crescimento anual do PIB", current: "3.6", previous: "5.5", high: "23.2", low: "-11,8", unit: "por cento", last: "Dez/24" },
  { name: "Taxa de desemprego", current: "30.4", previous: "30,8", high: "35", low: "19,9", unit: "por cento", last: "Dez/24" },
  { name: "Taxa de inflação", current: "23,85", previous: "25.26", high: "241", low: "6,89", unit: "por cento", last: "Mar/25" },
  { name: "Taxa de inflação mensal", current: "1,38", previous: "1,59", high: "4.26", low: "0,41", unit: "por cento", last: "Mar/25" },
  { name: "Taxa de juro", current: "19,5", previous: "19,5", high: "150", low: "8,75", unit: "por cento", last: "Mar/25" },
  { name: "Balança comercial", current: "4788", previous: "5915", high: "42932", low: "958", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Conta corrente", current: "6277", previous: "4185", high: "13841", low: "-10273", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Conta Corrente em relação ao PIB", current: "6.7", previous: "3.8", high: "31.1", low: "-17,8", unit: "porcentagem do PIB", last: "Dez/24" },
  { name: "Dívida Pública em relação ao PIB", current: "60,5", previous: "50,7", high: "118", low: "16.1", unit: "porcentagem do PIB", last: "Dez/23" },
  { name: "Orçamento do Governo", current: "-1,5", previous: "-0,1", high: "11.4", low: "-7", unit: "porcentagem do PIB", last: "Dez/24" },
  { name: "Confiança Empresarial", current: "9", previous: "8", high: "31", low: "-34", unit: "pontos", last: "Set/24" },
  { name: "Taxa de imposto corporativo", current: "25", previous: "25", high: "35", low: "25", unit: "por cento", last: "Dez/25" },
  { name: "Taxa de imposto de renda pessoal", current: "25", previous: "25", high: "25", low: "15", unit: "por cento", last: "Dez/25" },
];

const pibIndicators = [
  { name: "Taxa de crescimento do PIB", current: "0,1", previous: "2.2", high: "23.2", low: "-9,5", unit: "por cento", last: "Dez/24" },
  { name: "Taxa de crescimento anual do PIB", current: "3.6", previous: "5.5", high: "23.2", low: "-11,8", unit: "por cento", last: "Dez/24" },
  { name: "PIB", current: "84,82", previous: "104", high: "136", low: "4,43", unit: "Bilhões de dólares americanos", last: "Dez/23" },
  { name: "PIB per capita", current: "2333", previous: "2382", high: "3301", low: "1530", unit: "USD", last: "Dez/23" },
  { name: "PIB per capita PPP", current: "7245", previous: "7397", high: "10251", low: "4751", unit: "USD", last: "Dez/23" },
  { name: "Crescimento do PIB anual", current: "4.4", previous: "1.1", high: "8,5", low: "-5,6", unit: "por cento", last: "Dez/24" },
  { name: "PIB Preços Constantes", current: "423359", previous: "403529", high: "444149", low: "305924", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB da Agricultura", current: "20131", previous: "25307", high: "27075", low: "352", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB da Construção", current: "40443", previous: "34620", high: "56147", low: "224", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB da Indústria", current: "19920", previous: "16849", high: "19920", low: "241", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB da Mineração", current: "15789", previous: "13305", high: "15789", low: "5156", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB da Administração Pública", current: "36626", previous: "38517", high: "46488", low: "21852", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB de Serviços", current: "68869", previous: "65044", high: "79632", low: "32726", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB dos Transportes", current: "17016", previous: "8427", high: "19332", low: "2084", unit: "AOA milhões", last: "Dez/24" },
  { name: "PIB de serviços públicos", current: "3937", previous: "3374", high: "3992", low: "1522", unit: "AOA milhões", last: "Dez/24" },
];

const trabalhoIndicators = [
  { name: "Taxa de desemprego", current: "30.4", previous: "30,8", high: "35", low: "19,9", unit: "por cento", last: "Dez/24" },
  { name: "Salários mínimos", current: "32181", previous: "32181", high: "32181", low: "3757", unit: "AOA/Mês", last: "Dez/25" },
  { name: "População", current: "36,68", previous: "35,59", high: "36,68", low: "5.36", unit: "Milhão", last: "Dez/23" },
  { name: "Pessoas Empregadas", current: "12582", previous: "12315", high: "12582", low: "9073", unit: "Mil", last: "Dez/24" },
  { name: "Taxa de emprego", current: "62,8", previous: "62", high: "63,1", low: "59,7", unit: "por cento", last: "Dez/24" },
  { name: "Taxa de Participação da Força de Trabalho", current: "90,2", previous: "89,7", high: "91,8", low: "86,5", unit: "por cento", last: "Dez/24" },
  { name: "Pessoas desempregadas", current: "5501", previous: "5482", high: "5764", low: "3676", unit: "Milhares", last: "Dez/24" },
  { name: "Taxa de desemprego juvenil", current: "54,4", previous: "56,6", high: "63,5", low: "49,2", unit: "%", last: "Dez/24" },
];

const precosIndicators = [
  { name: "Taxa de inflação", current: "23,85", previous: "25.26", high: "241", low: "6,89", unit: "por cento", last: "Mar/25" },
  { name: "Taxa de inflação mensal", current: "1,38", previous: "1,59", high: "4.26", low: "0,41", unit: "por cento", last: "Mar/25" },
  { name: "Índice de Preços ao Consumidor (IPC)", current: "232", previous: "229", high: "232", low: "29,48", unit: "pontos", last: "Mar/25" },
  { name: "Inflação Alimentar", current: "29.1", previous: "30,5", high: "137", low: "5,94", unit: "por cento", last: "25/janeiro" },
  { name: "Serviços Públicos de Habitação CPI", current: "161", previous: "160", high: "161", low: "41,56", unit: "pontos", last: "25/janeiro" },
  { name: "Transporte CPI", current: "170", previous: "169", high: "170", low: "39,67", unit: "pontos", last: "25/janeiro" },
  { name: "Preços ao produtor", current: "783", previous: "771", high: "783", low: "94,82", unit: "pontos", last: "Fev/25" },
  { name: "Mudança nos Preços ao Produtor", current: "28.01", previous: "29,78", high: "36,66", low: "6.05", unit: "por cento", last: "Fev/25" },
];

const dinheiroIndicators = [
  { name: "Taxa de juro", current: "19,5", previous: "19,5", high: "150", low: "8,75", unit: "por cento", last: "Mar/25" },
  { name: "Taxa Interbancária", current: "18,94", previous: "19,47", high: "22.16", low: "7.24", unit: "por cento", last: "Mar/25" },
  { name: "Taxa de juros de depósito", current: "7.4", previous: "6,88", high: "147", low: "3.15", unit: "por cento", last: "Dez/24" },
  { name: "Índice de Reserva de Caixa", current: "22", previous: "22", high: "22", low: "15", unit: "por cento", last: "Mar/25" },
  { name: "Balanço do Banco Central", current: "18427", previous: "18344", high: "19195", low: "46,49", unit: "AOA bilhões", last: "Mar/25" },
  { name: "Reservas Cambiais", current: "15266", previous: "15296", high: "34017", low: "13350", unit: "Milhões de dólares americanos", last: "Mar/25" },
  { name: "Taxa de empréstimo", current: "20,5", previous: "20,5", high: "25", low: "9,75", unit: "por cento", last: "Mar/25" },
  { name: "Empréstimos para bancos", current: "374317", previous: "231365", high: "1149499", low: "145378", unit: "AOA milhões", last: "Mar/25" },
  { name: "Empréstimos ao Setor Privado", current: "6934763", previous: "6789688", high: "6934763", low: "1806943", unit: "AOA milhões", last: "Mar/25" },
  { name: "Oferta de moeda M1", current: "9102105", previous: "8641044", high: "10848137", low: "1441166", unit: "AOA milhões", last: "Mar/25" },
  { name: "Oferta de moeda M2", current: "16760118", previous: "16338980", high: "16846333", low: "2126263", unit: "AOA milhões", last: "Mar/25" },
  { name: "Oferta de moeda M3", current: "16760118", previous: "16338980", high: "16846333", low: "2427697", unit: "AOA milhões", last: "Mar/25" },
];

const tradeIndicators = [
  { name: "Balança comercial", current: "4788", previous: "5915", high: "42932", low: "958", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Conta corrente", current: "6277", previous: "4185", high: "13841", low: "-10273", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Conta Corrente em relação ao PIB", current: "6.7", previous: "3.8", high: "31.1", low: "-17,8", unit: "porcentagem do PIB", last: "Dez/24" },
  { name: "Exportações", current: "8866", previous: "9573", high: "63914", low: "3457", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Importações", current: "4078", previous: "3659", high: "22660", low: "2103", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Fluxos de Capital", current: "-1478", previous: "-7846", high: "8447", low: "-7846", unit: "Milhões de dólares americanos", last: "Dez/23" },
  { name: "Dívida externa", current: "50260", previous: "52066", high: "52066", low: "7595", unit: "Milhões de dólares americanos", last: "Dez/23" },
  { name: "Investimento Estrangeiro Direto", current: "4080", previous: "7009", high: "16581", low: "389", unit: "Milhões de dólares americanos", last: "Dez/23" },
  { name: "Remessas", current: "3.07", previous: "3,67", high: "3,91", low: "1,05", unit: "Milhões de dólares americanos", last: "Dez/24" },
  { name: "Índice de Terrorismo", current: "1,66", previous: "2,25", high: "6,35", low: "0", unit: "Pontos", last: "Dez/24" },
];

const governoIndicators = [
  { name: "Dívida Pública em relação ao PIB", current: "60,5", previous: "50,7", high: "118", low: "16.1", unit: "porcentagem do PIB", last: "Dez/23" },
  { name: "Orçamento do Governo", current: "-1,5", previous: "-0,1", high: "11.4", low: "-7", unit: "porcentagem do PIB", last: "Dez/24" },
  { name: "Receitas do Governo", current: "13462", previous: "13371", high: "13462", low: "395", unit: "AOA bilhões", last: "Dez/23" },
  { name: "Despesa Fiscal", current: "12902", previous: "11899", high: "12902", low: "468", unit: "AOA bilhões", last: "Dez/23" },
  { name: "Índice de Corrupção", current: "32", previous: "33", high: "33", low: "15", unit: "Pontos", last: "Dez/24" },
  { name: "Classificação de Corrupção", current: "121", previous: "121", high: "168", low: "85", unit: "", last: "Dez/24" },
  { name: "Classificação de crédito", current: "25", previous: "", high: "", low: "", unit: "", last: "Abr/25" },
  { name: "Valor do Orçamento do Governo", current: "560", previous: "1472", high: "1788", low: "-1140", unit: "AOA bilhões", last: "Dez/23" },
  { name: "Gastos do Governo", current: "9769", previous: "9663", high: "9769", low: "391", unit: "AOA bilhões", last: "Dez/23" },
  { name: "Despesas militares", current: "1270", previous: "1623", high: "6846", low: "160", unit: "Milhões de dólares americanos", last: "Dez/23" },
  { name: "Taxa de imposto corporativo", current: "25", previous: "25", high: "35", low: "25", unit: "por cento", last: "Dez/25" },
  { name: "Taxa de imposto de renda pessoal", current: "25", previous: "25", high: "25", low: "15", unit: "por cento", last: "Dez/25" },
  { name: "Taxa de imposto sobre vendas", current: "14", previous: "14", high: "14", low: "10", unit: "por cento", last: "Dez/25" },
  { name: "Taxa de retenção na fonte", current: "15", previous: "15", high: "15", low: "15", unit: "por cento", last: "Dez/24" },
  { name: "Taxa de Segurança Social", current: "11", previous: "11", high: "11", low: "11", unit: "por cento", last: "Dez/25" },
  { name: "Taxa de Segurança Social para Empresas", current: "8", previous: "8", high: "8", low: "8", unit: "por cento", last: "Dez/25" },
  { name: "Taxa de Segurança Social para Empregados", current: "3", previous: "3", high: "3", low: "3", unit: "por cento", last: "Dez/25" },
];

const negociosIndicators = [
  { name: "Confiança Empresarial", current: "9", previous: "8", high: "31", low: "-34", unit: "pontos", last: "Set/24" },
  { name: "Produção industrial", current: "2.2", previous: "3.4", high: "12.2", low: "-9,9", unit: "por cento", last: "Dez/24" },
  { name: "Mãe da Produção Industrial", current: "-0,2", previous: "3.3", high: "7.4", low: "-6,1", unit: "por cento", last: "Dez/24" },
  { name: "Produção Industrial", current: "11,9", previous: "11.1", high: "34", low: "-19,5", unit: "por cento", last: "Dez/24" },
  { name: "Produção de Mineração", current: "-3,1", previous: "0,4", high: "13.8", low: "-12,9", unit: "por cento", last: "Dez/24" },
];

const consumidorIndicators = [
  { name: "Taxa de empréstimo bancário", current: "21,29", previous: "20,37", high: "24,98", low: "9,66", unit: "por cento", last: "Mar/25" },
];

const energiaIndicators = [
  { name: "Plataformas de petróleo bruto", current: "2", previous: "2", high: "18", low: "0", unit: "", last: "Mar/25" },
];

export default function AngolaIndicators() {
  const [tab, setTab] = useState<'overview' | 'table' | 'pib' | 'trabalho' | 'precos' | 'dinheiro' | 'trade' | 'governo' | 'negocios' | 'consumidor' | 'energia'>("overview");
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-angola-accent mb-6">Indicadores de Angola</h1>
      <div className="mb-6">
        <button
          className={`px-4 py-2 rounded-l border border-angola-accent font-semibold ${tab === "overview" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("overview")}
        >
          Visão Geral
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "pib" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("pib")}
        >
          PIB
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "trabalho" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("trabalho")}
        >
          Trabalho
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "precos" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("precos")}
        >
          Preços
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "dinheiro" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("dinheiro")}
        >
          Dinheiro
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "trade" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("trade")}
        >
          Trade
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "governo" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("governo")}
        >
          Governo
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "negocios" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("negocios")}
        >
          Negócios
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "consumidor" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("consumidor")}
        >
          Consumidor
        </button>
        <button
          className={`px-4 py-2 border-t border-b border-angola-accent font-semibold ${tab === "energia" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("energia")}
        >
          Energia
        </button>
        <button
          className={`px-4 py-2 rounded-r border-t border-b border-r border-angola-accent font-semibold ${tab === "table" ? "bg-angola-accent text-white" : "bg-gray-100 text-angola-accent"}`}
          onClick={() => setTab("table")}
        >
          Tabela Completa
        </button>
      </div>
      {tab === "overview" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={overviewIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-overview" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {overviewIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "pib" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={pibIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-pib" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {pibIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "trabalho" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={trabalhoIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-trabalho" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {trabalhoIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "precos" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={precosIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-precos" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {precosIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "dinheiro" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={dinheiroIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-dinheiro" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {dinheiroIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "trade" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={tradeIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-trade" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {tradeIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "governo" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={governoIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-governo" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {governoIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "negocios" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={negociosIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-negocios" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {negociosIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "consumidor" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={consumidorIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-consumidor" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {consumidorIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "energia" ? (
        <div className="overflow-x-auto">
          <TableDownloadButtons data={energiaIndicators} columns={["name","current","previous","high","low","unit","last"]} filename="indicadores-energia" />
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-card text-card-foreground">
                <th className="border p-2 text-left">Indicador</th>
                <th className="border p-2 text-right">Atual</th>
                <th className="border p-2 text-right">Anterior</th>
                <th className="border p-2 text-right">Mais alto</th>
                <th className="border p-2 text-right">Mais baixo</th>
                <th className="border p-2 text-center">Unidade</th>
                <th className="border p-2 text-center">Ano/Mês</th>
              </tr>
            </thead>
            <tbody>
              {energiaIndicators.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-right font-semibold">{item.current}</td>
                  <td className="border p-2 text-right">{item.previous}</td>
                  <td className="border p-2 text-right">{item.high}</td>
                  <td className="border p-2 text-right">{item.low}</td>
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2 text-center">{item.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            Fonte: <a href="https://tradingeconomics.com/angola/indicators" target="_blank" rel="noopener noreferrer" className="underline text-angola-accent">Trading Economics</a> — Última atualização: abril de 2024
          </p>
          <div className="overflow-x-auto">
            <TableDownloadButtons data={indicators} columns={["name","value","last"]} filename="indicadores-resumo" />
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-card text-card-foreground">
                  <th className="border p-2 text-left">Indicador</th>
                  <th className="border p-2 text-right">Valor</th>
                  <th className="border p-2 text-center">Ano/Mês</th>
                </tr>
              </thead>
              <tbody>
                {indicators.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2 text-right font-semibold">{item.value}</td>
                    <td className="border p-2 text-center">{item.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-xs text-muted-foreground">
            <p>
              Estes dados são meramente informativos e podem variar conforme novas atualizações oficiais. Consulte sempre fontes oficiais para decisões estratégicas.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
