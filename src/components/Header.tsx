import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import HeaderMenuItems from "@/components/HeaderMenuItems";

const Header = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(
      newTheme === "dark" ? "Tema escuro ativado!" : "Tema claro ativado!"
    );
  };

  return (
    <header className="bg-primary text-white py-4 shadow-md transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-angola-accent"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <h1 className="text-2xl font-bold">OpenDataAngola</h1>
        </div>
        {/* Botão de menu hamburguer para mobile */}
        <button
          className="md:hidden ml-4 focus:outline-none"
          aria-label="Abrir menu de navegação"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav>
          <ul
            className={`flex-col md:flex-row md:flex md:space-x-2 fixed md:static top-0 right-0 z-40 bg-primary dark:bg-gray-900 h-full md:h-auto w-4/5 max-w-xs md:max-w-none shadow-xl md:shadow-none p-8 md:p-0 transition-transform duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'} md:flex rounded-l-2xl md:rounded-none border-l-4 border-angola-accent/40 md:border-none backdrop-blur-lg md:backdrop-blur-0`}
            style={menuOpen ? { minHeight: '100vh' } : {}}
          >
            <li className="md:hidden mb-8 flex justify-end">
              <button aria-label="Fechar menu" onClick={() => setMenuOpen(false)} className="p-2 hover:bg-angola-accent/10 rounded-full">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
            <HeaderMenuItems onClick={() => setMenuOpen(false)} />
            <li className="mt-4 md:mt-0">
              <Link to="/doar" className="ml-2 px-4 py-2 rounded-full bg-angola-accent text-angola-dark font-semibold shadow-lg hover:bg-angola-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-angola-accent block md:inline text-base md:text-sm border-2 border-angola-accent/40">
                Doar
              </Link>
            </li>
            <li className="mt-2 md:mt-0">
              <button
                aria-label="Alternar tema escuro/claro"
                onClick={() => { handleToggleTheme(); setMenuOpen(false); }}
                className="ml-2 p-2 rounded-full transition-colors duration-200 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-angola-accent/10 dark:hover:bg-angola-accent/20 block md:inline shadow-md border border-angola-accent/10"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </button>
            </li>
          </ul>
        </nav>
        {/* Overlay para fechar o menu ao clicar fora */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
