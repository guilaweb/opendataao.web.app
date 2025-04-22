// Utilitário para importar Google Sheets (pública ou via API)
export type SheetColumnMap = {
  name: string;
  description: string;
  status: string;
};

export interface GoogleSheetImportOptions {
  sheetUrl: string;
  sheetName?: string; // Nome da aba
  columnMap?: Partial<SheetColumnMap>; // Permitir customizar nomes das colunas
  apiKey?: string; // Para autenticação de sheets privadas
}

// Função para importar dados de uma aba do Google Sheets
export async function importDatasetsFromGoogleSheetsAdvanced(
  options: GoogleSheetImportOptions
): Promise<any[]> {
  const { sheetUrl, sheetName, columnMap, apiKey } = options;
  // Extrai o ID da planilha
  const regex = /\/d\/([a-zA-Z0-9-_]+)/;
  const match = sheetUrl.match(regex);
  const sheetId = match ? match[1] : sheetUrl;

  // Se API key fornecida, usa Google Sheets API (para sheets privadas ou múltiplas abas)
  if (apiKey) {
    // Descobre o nome da aba, se não fornecido pega a primeira
    let range = 'A1:Z1000';
    if (sheetName) {
      range = `${encodeURIComponent(sheetName)}!A1:Z1000`;
    }
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Falha ao acessar Google Sheets API');
    const data = await res.json();
    const [header, ...rows] = data.values;
    return rows.map((row: string[], i: number) => {
      const obj: any = { id: Date.now().toString() + i };
      header.forEach((k: string, idx: number) => {
        // Aplica o mapeamento de colunas se fornecido
        let key = k.trim();
        if (columnMap) {
          for (const [std, custom] of Object.entries(columnMap)) {
            if (custom && key.toLowerCase() === custom.toLowerCase()) key = std;
          }
        }
        obj[key] = row[idx];
      });
      return obj;
    });
  }

  // Caso público: busca CSV (apenas primeira aba)
  let csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
  if (sheetName) {
    // sheets públicas: sheet=nome
    csvUrl += `&sheet=${encodeURIComponent(sheetName)}`;
  }
  const res = await fetch(csvUrl);
  if (!res.ok) throw new Error('Falha ao acessar Google Sheets CSV');
  const text = await res.text();
  const [header, ...lines] = text.trim().split("\n");
  const keys = header.split(",").map(k => k.trim());
  return lines.map((line, i) => {
    const values = line.split(",");
    const obj: any = { id: Date.now().toString() + i };
    keys.forEach((k, idx) => {
      // Aplica o mapeamento de colunas se fornecido
      let key = k;
      if (columnMap) {
        for (const [std, custom] of Object.entries(columnMap)) {
          if (custom && k.toLowerCase() === custom.toLowerCase()) key = std;
        }
      }
      obj[key] = values[idx];
    });
    return obj;
  });
}
