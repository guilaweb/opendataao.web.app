import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { datasets, statsData, economicData, energySourcesData, populationByProvinceData } from "@/data/mock-data";
import StatCard from "@/components/StatCard";
import DatasetCard from "@/components/DatasetCard";
import ChartComponent from "@/components/ChartComponent";
import PopulationHeatMap from "@/components/PopulationHeatMap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const featuredDatasets = datasets.slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowNoResults(false);
    // Simula busca com delay para mostrar loader
    setTimeout(() => {
      const results = datasets.filter(ds =>
        ds.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
      setShowNoResults(results.length === 0);
      if (results.length > 0) {
        window.location.href = `/datasets?search=${encodeURIComponent(searchTerm)}`;
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section aprimorado */}
      <section className="bg-angola-dark text-white py-20 relative overflow-hidden">
        {/* Fundo decorativo */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none" aria-hidden="true">
          <img src="https://cdn.pixabay.com/photo/2020/01/21/17/45/africa-4788327_1280.png" alt="Mapa decorativo" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
            Dados Abertos para Angola
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-medium drop-shadow">
            Acesse, explore e utilize dados públicos de Angola para pesquisa, jornalismo e desenvolvimento de políticas públicas.
          </p>
          <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto flex"
            aria-label="Pesquisar conjuntos de dados"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar conjuntos de dados..."
                className="pl-10 h-12 rounded-r-none border-r-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus-visible:ring-angola-accent focus-visible:outline-angola-accent"
                aria-label="Pesquisar conjuntos de dados"
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 rounded-l-none bg-angola-accent text-angola-dark hover:bg-angola-accent/80 focus-visible:ring-angola-accent focus-visible:outline-angola-accent"
              aria-label="Pesquisar"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Pesquisar"}
            </Button>
          </form>
          {loading && (
            <div className="mt-4 flex justify-center">
              <Loader2 className="animate-spin text-angola-accent" size={32} />
              <span className="ml-2 text-angola-accent font-medium">Buscando dados...</span>
            </div>
          )}
          {showNoResults && (
            <div className="mt-4 text-angola-accent font-semibold">Nenhum conjunto de dados encontrado.</div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold"><Search size={16}/> Busca instantânea</span>
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold">+100 conjuntos de dados</span>
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold">API aberta</span>
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold">Visualizações interativas</span>
          </div>
        </div>
      </section>
      {/* Stats Section aprimorada */}
      <section className="py-12 bg-angola-light/70">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Featured Datasets aprimorado */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-angola-accent/20 text-angola-accent px-2 py-1 rounded font-semibold text-lg">Destaques</span>
              Conjuntos de Dados em Destaque
            </h2>
            <Button asChild variant="outline">
              <Link to="/datasets">Ver Todos</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDatasets.map((dataset, idx) => (
              <div key={dataset.id} className="transition-transform duration-300 hover:scale-105 fade-in">
                <DatasetCard {...dataset} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Data Visualizations aprimorada */}
      <section className="py-12 bg-angola-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-angola-accent">Visualizações Interativas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:col-span-2">
            <div className="flex flex-col items-center">
              <ChartComponent 
                type="pie" 
                data={energySourcesData} 
                title="Matriz Energética de Angola" 
              />
              <span className="text-xs mt-2 block">
                Fonte: <a href="https://www.mirempet.gov.ao" target="_blank" rel="noopener noreferrer" className="underline text-angola-accent">mirempet.gov.ao</a>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-angola-accent">Crescimento do PIB de Angola (%)</h2>
              <iframe 
                src="https://tradingeconomics.com/embed/?s=agofygg&v=202503251345V20230410&lang=all&h=300&w=600&ref=/angola/full-year-gdp-growth&type=column&d1=2015-01-01&d2=2024-01-01"
                height="300"
                width="100%"
                style={{ minWidth: 0, border: 0, borderRadius: '0.75rem', maxWidth: '600px' }}
                frameBorder="0"
                scrolling="no"
                title="Crescimento do PIB de Angola (%)"
                allowFullScreen
              ></iframe>
              <span className="text-xs mt-2">
                Fonte: <a href="https://pt.tradingeconomics.com/angola/full-year-gdp-growth" target="_blank" rel="noopener noreferrer" className="underline text-angola-accent">tradingeconomics.com</a>
              </span>
            </div>
          </div>
          <div className="lg:col-span-2 mt-10">
            <h2 className="text-2xl font-bold mb-8 text-angola-accent">Distribuição Populacional por Província</h2>
            <PopulationHeatMap />
          </div>
        </div>
      </section>
      {/* Call to Action aprimorado */}
      <section className="py-16 bg-angola-dark text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none" aria-hidden="true">
          <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/africa-2027466_1280.png" alt="Mapa decorativo" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-4 drop-shadow">Contribua com o OpenDataAngola</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-medium drop-shadow">
            Junte-se a nós para promover a transparência e o acesso a dados em Angola.
            Compartilhe conjuntos de dados, sugira melhorias ou desenvolva soluções.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-angola-accent text-angola-dark hover:bg-angola-accent/80 focus-visible:ring-angola-accent focus-visible:outline-angola-accent">
              <Link to="/about">Saiba Mais</Link>
            </Button>
            <Button asChild size="lg" className="bg-angola-accent text-angola-dark hover:bg-angola-accent/90 focus-visible:ring-angola-accent focus-visible:outline-angola-accent">
              <Link to="/datasets">Explorar Dados</Link>
            </Button>
            <Button asChild size="lg" className="bg-angola-accent text-angola-dark hover:bg-angola-accent/90 focus-visible:ring-angola-accent focus-visible:outline-angola-accent">
              <Link to="/doar">Doar</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-angola-accent text-angola-dark shadow-lg hover:bg-angola-accent/90 focus:outline-none focus:ring-2 focus:ring-angola-accent transition"
        aria-label="Voltar ao topo"
      >
        ↑
      </button>
    </main>
  );
};

export default Index;
