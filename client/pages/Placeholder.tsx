import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Sparkles } from "lucide-react";

interface PlaceholderProps {
  title?: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  const params = useParams();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            {title || "Página em Construção"}
          </h1>

          <p className="text-muted-foreground mb-8">
            {description ||
              "Esta página está sendo desenvolvida. Continue acompanhando para novidades!"}
          </p>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              Gostaria de adicionar conteúdo a esta página? Fale conosco!
            </p>
            <Link
              to="/contato"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Envie uma sugestão
            </Link>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </Layout>
  );
}
