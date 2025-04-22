
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAndFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

const SearchAndFilter = ({
  onSearchChange,
  onCategoryChange,
  categories,
}: SearchAndFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquisar conjuntos de dados..."
          className="pl-9 w-full"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
