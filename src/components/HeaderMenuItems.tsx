import { Link } from "react-router-dom";

const menuItems = [
  { label: "Início", to: "/" },
  { label: "Conjuntos de Dados", to: "/datasets" },
  { label: "Indicadores de Angola", to: "/angolaindicators" },
  { label: "Artigos", to: "/articles" },
  { label: "Sobre", to: "/about" },
];

export default function HeaderMenuItems({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {menuItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className="group relative px-4 py-2 font-medium text-base transition-colors duration-200 text-gray-100 dark:text-gray-100 hover:text-angola-accent focus:text-angola-accent"
            onClick={onClick}
          >
            <span className="relative z-10">{item.label}</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-angola-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
          </Link>
        </li>
      ))}
    </>
  );
}
