import React, { useState } from "react";
import { FaDatabase, FaUsers, FaCommentDots, FaLightbulb, FaTachometerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SIDEBAR_LINKS = [
  { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt size={22} /> },
  { key: "datasets", label: "Datasets", icon: <FaDatabase size={22} /> },
  { key: "users", label: "Usuários", icon: <FaUsers size={22} /> },
  { key: "comments", label: "Comentários", icon: <FaCommentDots size={22} /> },
  { key: "suggestions", label: "Sugestões", icon: <FaLightbulb size={22} /> },
];

export default function AdminSidebar({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <aside className={`h-full bg-gradient-to-b from-blue-900 to-blue-700 shadow-xl flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} min-h-[500px] rounded-xl mr-6`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-800">
        {!collapsed && <span className="text-white font-bold text-xl tracking-wide">Admin</span>}
        <button
          className="text-white p-1 rounded hover:bg-blue-800 transition"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? "Expandir menu" : "Colapsar menu"}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-1 mt-2">
        {SIDEBAR_LINKS.map(link => (
          <div key={link.key} className="relative">
            <button
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-all text-base w-full text-left ${tab === link.key ? 'bg-blue-600 text-white shadow' : 'text-blue-100 hover:bg-blue-800 hover:text-white'}`}
              onClick={() => setTab(link.key)}
              aria-label={link.label}
              onMouseEnter={() => setHovered(link.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <span>{link.icon}</span>
              {!collapsed && <span>{link.label}</span>}
            </button>
            {collapsed && hovered === link.key && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg z-50 whitespace-nowrap pointer-events-none animate-fade-in">
                {link.label}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="flex-1" />
      {/* Espaço para avatar, logout, etc. */}
    </aside>
  );
}
