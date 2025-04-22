import { useState } from "react";
import { datasets, categories } from "@/data/mock-data";
import SearchAndFilter from "@/components/SearchAndFilter";
import DatasetCard from "@/components/DatasetCard";

const Datasets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      selectedCategory === "all" || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {/* HERO/BANNER */}
      <section className="mb-10 bg-angola-dark/95 text-white rounded-2xl shadow-lg px-6 py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none" aria-hidden="true">
          <img src="https://cdn.pixabay.com/photo/2020/01/21/17/45/africa-4788327_1280.png" alt="Mapa decorativo" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex flex-col items-center gap-2">
            <span className="bg-angola-accent/20 text-angola-accent px-2 py-1 rounded font-semibold text-lg">Explorar</span>
            <span>Conjuntos de Dados</span>
          </h1>
          <p className="text-lg mb-4 max-w-2xl">
            Descubra, filtre e acesse conjuntos de dados abertos sobre Angola para pesquisa, inovação e cidadania.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold">+100 conjuntos de dados</span>
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold">API aberta</span>
            <span className="inline-flex items-center gap-1 bg-angola-accent/10 text-angola-accent px-4 py-1 rounded-full text-sm font-semibold">Visualizações interativas</span>
          </div>
        </div>
      </section>
      {/* BARRA DE BUSCA E FILTROS */}
      <section className="mb-8">
        <SearchAndFilter 
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      </section>
      {/* LISTAGEM DE DATASETS */}
      {filteredDatasets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum conjunto de dados encontrado com os filtros atuais.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} {...dataset} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Datasets;
