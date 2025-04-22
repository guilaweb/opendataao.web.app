import { useState } from "react";
import AdminDatasets from "./AdminDatasets";
import AdminUsers from "./AdminUsers";
import AdminComments from "./AdminComments";
import AdminSuggestions from "./AdminSuggestions";
import AdminDashboardHeader from "@/components/AdminDashboardHeader";
import AdminDashboardMetrics from "@/components/AdminDashboardMetrics";
import AdminSidebar from "@/components/AdminSidebar";
import { datasets as mockDatasets } from "@/data/mock-data";

// Temporário: arrays vazios para evitar erro de importação
const mockUsers: any[] = [];
const mockComments: any[] = [];
const mockSuggestions: any[] = [];

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "datasets", label: "Datasets" },
  { key: "users", label: "Usuários" },
  { key: "comments", label: "Comentários" },
  { key: "suggestions", label: "Sugestões" },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");

  // Função para calcular métricas (mock)
  async function getMetrics() {
    // No futuro, buscar do backend
    return {
      datasets: mockDatasets.length,
      users: mockUsers.length,
      comments: mockComments.length,
      suggestions: mockSuggestions.length,
      datasetsGrowth: 5, // Exemplo: +5%
      usersGrowth: 2 // Exemplo: +2%
    };
  }

  return (
    <div className="container mx-auto px-2 md:px-6 py-8">
      <div className="flex gap-4">
        <AdminSidebar tab={tab} setTab={setTab} />
        <div className="flex-1">
          <AdminDashboardHeader />
          <div className="mb-6" />
          <div className="bg-white/90 p-4 md:p-8 rounded-xl shadow-xl min-h-[400px]">
            {tab === "dashboard" && <AdminDashboardMetrics getMetrics={getMetrics} />}
            {tab === "datasets" && <AdminDatasets />}
            {tab === "users" && <AdminUsers />}
            {tab === "comments" && <AdminComments />}
            {tab === "suggestions" && <AdminSuggestions />}
          </div>
        </div>
      </div>
    </div>
  );
}
