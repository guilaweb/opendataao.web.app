import { useState, useMemo } from "react";
import { Newspaper, Eye, Award, Users, Download, BarChart2, Globe, Youtube, ChevronRight, Sparkles, Star, StarOff, Search as SearchIcon, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import AdsenseInArticle from "@/components/AdsenseInArticle";

const initialArticles = [
  {
    title: "Por que Dados Abertos são Importantes para Angola?",
    summary:
      "Veja como a disponibilização de dados públicos contribui para a transparência, inovação e desenvolvimento social no país.",
    url: "/article/por-que-dados-abertos-angola",
    infographic: <div className="flex gap-2" aria-hidden="true"><Eye className="text-angola-accent" /><Award className="text-angola-accent" /><Users className="text-angola-accent" /></div>,
    highlights: ["Transparência", "Inovação", "Cidadania"],
    badge: "Destaque"
  },
  {
    title: "Como Encontrar e Utilizar Dados Públicos?",
    summary:
      "Aprenda onde localizar conjuntos de dados relevantes e dicas de uso para diversas áreas de atuação.",
    url: "/article/como-encontrar-utilizar-dados-publicos",
    infographic: <div className="flex gap-2" aria-hidden="true"><Globe className="text-angola-accent" /><Download className="text-angola-accent" /><BarChart2 className="text-angola-accent" /><Youtube className="text-angola-accent" /></div>,
    highlights: ["Ferramentas", "Exemplos práticos", "Vídeo"],
    badge: null
  },
  {
    title: "Panorama do Setor de Negócios e Indústria em Angola (2024)",
    summary: "Análise visual e profunda dos principais indicadores empresariais e industriais de Angola no final de 2024, incluindo gráficos e sugestões visuais.",
    url: "/article/negocios-setor-industrial",
    infographic: <div className="flex gap-2" aria-hidden="true"><BarChart2 className="text-angola-accent" /><Award className="text-angola-accent" /><TrendingUp className="text-angola-accent" /></div>,
    highlights: ["Negócios", "Indústria", "Gráficos"],
    badge: "Novo"
  },
];

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favoriteArticles") || "[]");
  } catch {
    return [];
  }
}

function setFavorites(favs) {
  localStorage.setItem("favoriteArticles", JSON.stringify(favs));
}

const Articles = () => {
  const [query, setQuery] = useState("");
  const [favorites, setFavoritesState] = useState(getFavorites());

  const articles = useMemo(() => {
    return initialArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        (a.highlights && a.highlights.some((h) => h.toLowerCase().includes(query.toLowerCase())))
    );
  }, [query]);

  function toggleFavorite(url) {
    let favs = [...favorites];
    if (favs.includes(url)) {
      favs = favs.filter((f) => f !== url);
    } else {
      favs.push(url);
    }
    setFavoritesState(favs);
    setFavorites(favs);
  }

  return (
    <main className="min-h-screen bg-background text-foreground max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-8">
        <Newspaper className="text-angola-accent" size={28} />
        <h2 className="text-2xl font-bold">Artigos</h2>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="search"
            className="w-full border rounded-md py-2 pl-10 pr-3 focus:ring-angola-accent focus:border-angola-accent text-sm"
            placeholder="Buscar artigo por título, resumo ou tema..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar artigo"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-angola-accent" size={18} aria-hidden="true" />
        </div>
        <button
          className={`ml-2 px-3 py-2 rounded bg-angola-accent/10 text-angola-accent text-xs font-semibold flex items-center gap-1 ${favorites.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-angola-accent/20'}`}
          disabled={favorites.length === 0}
          onClick={() => setQuery("") || setFavoritesState(getFavorites())}
          aria-label="Ver favoritos"
        >
          <Star className="text-angola-accent" size={16} /> Favoritos
        </button>
      </div>
      <ul className="space-y-6">
        {articles.map((article, idx) => (
          <>
            <li key={idx} className={`bg-card text-card-foreground border rounded-md p-5 shadow hover:shadow-lg transition flex gap-4 items-center group focus-within:ring-2 focus-within:ring-angola-accent ${favorites.includes(article.url) ? 'border-angola-accent/60' : ''}`}>
              <div className="hidden md:flex flex-col items-center justify-center min-w-[48px]">{article.infographic}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <a href={article.url} className="text-lg font-semibold hover:text-angola-accent group-hover:underline focus:outline-none text-angola-accent" tabIndex={0} aria-label={article.title}>
                    {article.title}
                  </a>
                  {article.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-angola-accent/10 text-angola-accent text-xs font-bold ml-1">
                      <Sparkles size={14} /> {article.badge}
                    </span>
                  )}
                  <button
                    className="ml-2 p-1 rounded hover:bg-angola-accent/10 focus:outline-none focus:ring-2 focus:ring-angola-accent"
                    aria-label={favorites.includes(article.url) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    onClick={() => toggleFavorite(article.url)}
                    tabIndex={0}
                  >
                    {favorites.includes(article.url) ? (
                      <Star className="text-angola-accent fill-angola-accent" size={18} />
                    ) : (
                      <StarOff className="text-angola-accent" size={18} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {article.highlights?.map((h, i) => (
                    <span key={i} className="inline-block bg-angola-light text-angola-dark px-2 py-0.5 rounded text-xs font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={article.url}
                className="ml-auto flex items-center gap-1 text-angola-accent font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-angola-accent px-2 py-1 rounded transition"
                tabIndex={0}
                aria-label={`Ler artigo: ${article.title}`}
              >
                Ler <ChevronRight size={18} />
              </Link>
            </li>
            {/* ADSENSE PUBLICIDADE ENTRE OS ARTIGOS */}
            {idx === 0 && (
              <li key="adsense" className="flex justify-center my-4">
                <AdsenseInArticle />
              </li>
            )}
          </>
        ))}
        {articles.length === 0 && (
          <li className="text-center text-muted-foreground py-8">Nenhum artigo encontrado.</li>
        )}
      </ul>
      <div className="mt-10 text-center text-xs text-muted-foreground">
        <span className="inline-block bg-angola-accent/10 text-angola-accent px-2 py-1 rounded font-semibold mr-2"><Sparkles size={14} className="inline" /> Novidade</span>
        Busca instantânea, favoritos, infográficos, destaques e visual moderno!
      </div>
    </main>
  );
};

export default Articles;
