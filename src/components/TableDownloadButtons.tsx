import React from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

function convertToCSV(data: any[], columns: string[]): string {
  const header = columns.join(",");
  const rows = data.map(row => columns.map(col => JSON.stringify(row[col] ?? "")).join(","));
  return [header, ...rows].join("\n");
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

interface TableDownloadButtonsProps {
  data: any[];
  columns: string[];
  filename?: string;
}

const TableDownloadButtons: React.FC<TableDownloadButtonsProps> = ({ data, columns, filename = "dados-angola" }) => {
  const handleDownloadCSV = () => {
    const csv = convertToCSV(data, columns);
    downloadFile(`${filename}.csv`, csv, "text/csv");
  };

  const handleDownloadJSON = () => {
    downloadFile(`${filename}.json`, JSON.stringify(data, null, 2), "application/json");
  };

  const handleDownloadXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(data, { header: columns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    downloadFile(`${filename}.xlsx`, blob as any, "application/octet-stream");
  };

  return (
    <div className="flex gap-2 my-2">
      <button onClick={handleDownloadCSV} className="flex items-center gap-1 px-2 py-1 rounded bg-angola-accent/10 text-angola-accent text-xs font-semibold hover:bg-angola-accent/20" title="Baixar CSV">
        <Download size={16} /> CSV
      </button>
      <button onClick={handleDownloadXLSX} className="flex items-center gap-1 px-2 py-1 rounded bg-angola-accent/10 text-angola-accent text-xs font-semibold hover:bg-angola-accent/20" title="Baixar XLSX">
        <Download size={16} /> XLSX
      </button>
      <button onClick={handleDownloadJSON} className="flex items-center gap-1 px-2 py-1 rounded bg-angola-accent/10 text-angola-accent text-xs font-semibold hover:bg-angola-accent/20" title="Baixar JSON">
        <Download size={16} /> JSON
      </button>
    </div>
  );
};

export default TableDownloadButtons;
