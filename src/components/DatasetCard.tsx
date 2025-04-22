import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaChartBar, FaBolt, FaUsers, FaMoneyBill, FaDatabase, FaStethoscope, FaBook, FaSeedling, FaGlobeAfrica, FaCity, FaLeaf } from "react-icons/fa";

interface DatasetCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  updatedAt: string;
}

// Ícones específicos para cada categoria real dos datasets
const categoryIcons: Record<string, JSX.Element> = {
  "Economia": <FaMoneyBill className="text-angola-accent" size={26} />, // Economia
  "Saúde": <FaStethoscope className="text-angola-accent" size={26} />, // Saúde
  "Educação": <FaBook className="text-angola-accent" size={26} />, // Educação
  "Demografia": <FaUsers className="text-angola-accent" size={26} />, // Demografia
  "Agricultura": <FaSeedling className="text-angola-accent" size={26} />, // Agricultura
  "Energia": <FaBolt className="text-angola-accent" size={26} />, // Energia
  "Infraestrutura": <FaCity className="text-angola-accent" size={26} />, // Infraestrutura
  "Ambiente": <FaLeaf className="text-angola-accent" size={26} />, // Ambiente
  "Geral": <FaDatabase className="text-angola-accent" size={26} /> // fallback
};

const DatasetCard = ({ id, title, description, category, updatedAt }: DatasetCardProps) => {
  const icon = categoryIcons[category] || <FaDatabase className="text-angola-accent" size={26} />;
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-angola-light text-angola-dark">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <span className="text-xs text-muted-foreground">
          Atualizado: {updatedAt}
        </span>
        <Button asChild variant="outline" size="sm">
          <Link to={`/dataset/${id}`}>Explorar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatasetCard;
