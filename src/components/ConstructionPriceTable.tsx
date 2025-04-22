
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PriceData {
  MaterialConstrucao: string;
  Ponderador2015: number;
  Ano: number;
  Mes: number;
  Indice: number;
}

const formatDate = (ano: number, mes: number) => {
  return `${mes.toString().padStart(2, "0")}/${ano}`;
};

interface ConstructionPriceTableProps {
  data: PriceData[];
}

const ConstructionPriceTable: React.FC<ConstructionPriceTableProps> = ({ data }) => {
  // Group data by material to show latest value for each
  const latestDataByMaterial = data.reduce((acc, curr) => {
    if (!acc[curr.MaterialConstrucao] || 
        (acc[curr.MaterialConstrucao].Ano < curr.Ano) ||
        (acc[curr.MaterialConstrucao].Ano === curr.Ano && acc[curr.MaterialConstrucao].Mes < curr.Mes)) {
      acc[curr.MaterialConstrucao] = curr;
    }
    return acc;
  }, {} as Record<string, PriceData>);

  const sortedMaterials = Object.values(latestDataByMaterial).sort(
    (a, b) => b.Ponderador2015 - a.Ponderador2015
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material</TableHead>
            <TableHead className="text-right">Ponderador 2015 (%)</TableHead>
            <TableHead className="text-right">Data</TableHead>
            <TableHead className="text-right">Índice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMaterials.map((row) => (
            <TableRow key={row.MaterialConstrucao}>
              <TableCell>{row.MaterialConstrucao}</TableCell>
              <TableCell className="text-right">{row.Ponderador2015}</TableCell>
              <TableCell className="text-right">{formatDate(row.Ano, row.Mes)}</TableCell>
              <TableCell className="text-right">{row.Indice.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConstructionPriceTable;
