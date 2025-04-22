import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-angola-dark text-white py-8 mt-auto transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="fade-in">
            <div className="mb-4">
              <span className="block font-bold text-angola-accent text-lg">OpenDataAngola</span>
              <span className="block text-sm text-muted-foreground mb-2">
                Plataforma de dados abertos para Angola, fornecendo acesso a dados públicos para cidadãos, pesquisadores e formuladores de políticas.
              </span>
              <a
                href="/doar"
                className="inline-block mt-1 px-4 py-2 bg-angola-accent text-white rounded font-semibold shadow hover:bg-angola-accent/90 transition"
              >
                Doar
              </a>
            </div>
          </div>
          <div className="fade-in">
            {/* Menus do footer organizados em três colunas responsivas e distribuídas */}
            <div className="flex flex-col gap-8 w-full md:flex-row md:justify-evenly md:items-start">
              <div className="w-full md:w-1/3 max-w-xs mb-4 md:mb-0">
                <h3 className="font-bold text-base mb-2 text-angola-accent">Recursos</h3>
                <ul className="space-y-1 text-sm">
                  <li><Link to="/datasets" className="hover:text-angola-accent transition-colors duration-200">Conjuntos de Dados</Link></li>
                  <li><Link to="/api" className="hover:text-angola-accent transition-colors duration-200">API</Link></li>
                  <li><Link to="/docs" className="hover:text-angola-accent transition-colors duration-200">Documentação</Link></li>
                  <li><Link to="/contact" className="hover:text-angola-accent transition-colors duration-200">Contato</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 max-w-xs mb-4 md:mb-0">
                <h3 className="font-bold text-base mb-2 text-angola-accent">Links Úteis</h3>
                <ul className="space-y-1 text-sm">
                  <li><Link to="/terms" className="hover:text-angola-accent transition-colors duration-200">Termos & Condições</Link></li>
                  <li><a href="https://apd.ao/" target="_blank" rel="noopener noreferrer" className="hover:text-angola-accent transition-colors duration-200">Agência de Proteção de Dados</a></li>
                  <li><a href="https://apd.ao/fotos/frontend_1/editor2/110617_lei_22-11_de_17_junho-proteccao_dados_pessoais.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-angola-accent transition-colors duration-200">Lei de Prot. de Dados</a></li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 max-w-xs">
                <h3 className="font-bold text-base mb-2 text-angola-accent">Contato</h3>
                <ul className="space-y-1 text-sm">
                  <li>Email: <a href="mailto:info@opendataangola.org" className="hover:text-angola-accent transition-colors duration-200">info@opendataangola.org</a></li>
                  <li>Twitter: <a href="https://twitter.com/OpenDataAngola" target="_blank" rel="noopener noreferrer" className="hover:text-angola-accent transition-colors duration-200">@OpenDataAngola</a></li>
                  <li>GitHub: <a href="https://github.com/opendataangola" target="_blank" rel="noopener noreferrer" className="hover:text-angola-accent transition-colors duration-200">github.com/opendataangola</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400 dark:text-gray-500 transition-colors duration-200">
          <p>&copy; {new Date().getFullYear()} OpenDataAngola. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
