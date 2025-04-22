import React, { useEffect, useState } from "react";
import { FaDatabase, FaUsers, FaCommentDots, FaLightbulb } from "react-icons/fa";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export interface Metrics {
  datasets: number;
  users: number;
  comments: number;
  suggestions: number;
  datasetsGrowth?: number; // %
  usersGrowth?: number; // %
}

export default function AdminDashboardMetrics({
  getMetrics
}: {
  getMetrics: () => Promise<Metrics>;
}) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getMetrics().then(m => {
      setMetrics(m);
      setChartData([
        { name: "Datasets", value: m.datasets },
        { name: "Usuários", value: m.users },
        { name: "Comentários", value: m.comments },
        { name: "Sugestões", value: m.suggestions },
      ]);
    }).finally(() => setLoading(false));
  }, [getMetrics]);

  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <KpiCard title="Datasets" value={metrics?.datasets ?? "-"} icon={<FaDatabase size={28} className="text-blue-600" />} growth={metrics?.datasetsGrowth} />
        <KpiCard title="Usuários" value={metrics?.users ?? "-"} icon={<FaUsers size={28} className="text-green-600" />} growth={metrics?.usersGrowth} />
        <KpiCard title="Comentários" value={metrics?.comments ?? "-"} icon={<FaCommentDots size={28} className="text-yellow-600" />} />
        <KpiCard title="Sugestões" value={metrics?.suggestions ?? "-"} icon={<FaLightbulb size={28} className="text-purple-600" />} />
      </div>
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h3 className="font-bold text-lg mb-3">Visão Geral</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function KpiCard({ title, value, icon, growth }: { title: string; value: number | string; icon: React.ReactNode; growth?: number }) {
  return (
    <div className="bg-white rounded-lg shadow flex flex-col items-center p-4">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-gray-900">{value}</div>
      <div className="font-semibold text-gray-600 text-sm mb-1">{title}</div>
      {growth !== undefined && (
        <div className={"text-xs font-bold " + (growth >= 0 ? "text-green-600" : "text-red-600")}>{growth >= 0 ? "+" : ""}{growth}%</div>
      )}
    </div>
  );
}
