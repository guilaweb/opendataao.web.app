import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { year: '2020', valor: 120 },
  { year: '2021', valor: 180 },
  { year: '2022', valor: 220 },
  { year: '2023', valor: 300 },
  { year: '2024', valor: 350 },
];

export default function ArticleSampleChart() {
  return (
    <div className="w-full h-64" aria-label="Gráfico de exemplo de uso de dados públicos">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground text-center mt-2">Exemplo: Crescimento de downloads de dados públicos em Angola (2020-2024)</p>
    </div>
  );
}
