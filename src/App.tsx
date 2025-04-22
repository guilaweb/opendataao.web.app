import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Datasets from "./pages/Datasets";
import DatasetDetail from "./pages/DatasetDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard"; // Import AdminDashboard
import ArticleOpenDataAngola from "@/pages/ArticleOpenDataAngola";
import ArticleHowToUsePublicData from "@/pages/ArticleHowToUsePublicData";
import Donate from "@/pages/Donate";
import AngolaIndicators from "@/pages/AngolaIndicators";
import ArticleNegociosSetorIndustrial from "./pages/ArticleNegociosSetorIndustrial";
import Docs from "./pages/Docs"; // Import Docs
import Api from "./pages/Api";
import TermsAndConditions from "./pages/TermsAndConditions"; // Import TermsAndConditions
import Contact from "./pages/Contact"; // Import Contact
import { useEffect } from "react";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        if (location.pathname !== "/doar") {
          navigate("/doar");
        }
      }
    };
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 fade-in">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/dataset/:id" element={<DatasetDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/por-que-dados-abertos-angola" element={<ArticleOpenDataAngola />} />
          <Route path="/article/como-encontrar-utilizar-dados-publicos" element={<ArticleHowToUsePublicData />} />
          <Route path="/article/negocios-setor-industrial" element={<ArticleNegociosSetorIndustrial />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/angolaindicators" element={<AngolaIndicators />} />
          <Route path="/doar" element={<Donate />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/api" element={<Api />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
