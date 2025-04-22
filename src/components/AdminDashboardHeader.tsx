import React from "react";

export default function AdminDashboardHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-6 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg shadow-lg">
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1 drop-shadow-lg">Painel de Administração</h1>
        <p className="text-blue-100 text-lg font-medium">Gerencie datasets, usuários, comentários e sugestões com facilidade e segurança.</p>
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Configurações</button>
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold shadow transition">Sair</button>
      </div>
    </header>
  );
}
