// Utilitário para exportar arrays de objetos para CSV e acionar download no browser
export function exportToCsv<T extends object>(data: T[], filename: string) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const csvContent = [
    keys.join(","),
    ...data.map(row => keys.map(k => '"'+String((row as any)[k]).replace(/"/g, '""')+'"').join(","))
  ].join("\n");

  // Cria o blob e dispara o download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
