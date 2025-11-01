import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex p-4 bg-destructive/10 rounded-xl mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>

          <h1 className="text-6xl font-bold mb-4 text-destructive">404</h1>

          <p className="text-xl font-semibold mb-2">Página não encontrada</p>

          <p className="text-muted-foreground mb-8">
            Desculpe, a página que você procura não existe. Verifique o URL ou
            retorne à página inicial.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
