import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-angola-primary mb-4">404</h1>
        <p className="text-2xl text-angola-dark mb-6">Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild size="lg">
          <a href="/">Voltar para Página Inicial</a>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
