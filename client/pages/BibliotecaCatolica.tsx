import Layout from "@/components/Layout";
import { BookOpen, Download, ExternalLink, Star } from "lucide-react";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  category: "book" | "pdf" | "link";
  author?: string;
  description: string;
  link: string;
  image?: string;
  rating?: number;
  featured?: boolean;
}

export default function BibliotecaCatolica() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const resources: Resource[] = [
    {
      id: "1",
      title: "Catecismo da Igreja Católica",
      category: "pdf",
      author: "Igreja Católica",
      description: "Documento oficial contendo toda a doutrina católica, sacramentos, mandamentos e moral cristã.",
      link: "https://www.vatican.va/archive/cod-cic-eng/index_en.html",
      rating: 5,
      featured: true,
    },
    {
      id: "2",
      title: "Confissões de Santo Agostinho",
      category: "book",
      author: "Santo Agostinho",
      description: "Um dos mais influentes escritos da espiritualidade cristã. Autobiografia teológica de profunda reflexão espiritual.",
      link: "https://www.amazon.com/Confessions-Augustine-Classics-Christianity/dp/0140449523",
      rating: 5,
      featured: true,
    },
    {
      id: "3",
      title: "Divina Comédia",
      category: "book",
      author: "Dante Alighieri",
      description: "Obra-prima da literatura que descreve a jornada espiritual através do Inferno, Purgatório e Paraíso.",
      link: "https://www.amazon.com/Divine-Comedy-Dante-Alighieri/dp/0486427897",
      rating: 5,
    },
    {
      id: "4",
      title: "Imitação de Cristo",
      category: "book",
      author: "Tomás de Kempis",
      description: "Clássico espiritual sobre como viver uma vida cristã verdadeira, seguindo o exemplo de Cristo.",
      link: "https://www.amazon.com/Imitation-Christ-Thomas-Kempis/dp/0486434990",
      rating: 5,
      featured: true,
    },
    {
      id: "5",
      title: "Summa Theologiae - Resumido",
      category: "pdf",
      author: "Santo Tomás de Aquino",
      description: "Resumo acessível da principal obra teológica católica. Aborda Deus, fé, virtudes e sacramentos.",
      link: "https://www.ewtn.com/catholicism/library/summa-theologiae-6256",
      rating: 4,
    },
    {
      id: "6",
      title: "Introdução à Vida Devota",
      category: "book",
      author: "São Francisco de Sales",
      description: "Guia prático para crescimento espiritual na vida cotidiana, com conselhos para oração e virtude.",
      link: "https://www.amazon.com/Introduction-Devout-Life-Saint-Francis/dp/0486446573",
      rating: 5,
    },
    {
      id: "7",
      title: "Os Mistérios do Rosário - Guia Completo",
      category: "pdf",
      author: "Jornada Católica",
      description: "PDF gratuito explicando os mistérios gozosos, dolorosos e gloriosos com meditações.",
      link: "#",
      featured: true,
    },
    {
      id: "8",
      title: "Documentos da Igreja - Encíclicas Papais",
      category: "link",
      description: "Coleção oficial de todas as encíclicas e documentos publicados pelos Papas.",
      link: "https://www.vatican.va/content/vatican/pt.html",
      rating: 5,
    },
    {
      id: "9",
      title: "Santo Tomás de Aquino - Orações Selecionadas",
      category: "pdf",
      author: "Santo Tomás de Aquino",
      description: "Coletânea de orações e reflexões espirituais do grande doutor da Igreja.",
      link: "#",
    },
    {
      id: "10",
      title: "Vida dos Santos - 365 Dias",
      category: "book",
      author: "Diversos autores",
      description: "Um santo diferente para cada dia do ano, com sua história e lições espirituais.",
      link: "https://www.amazon.com/Saints-Their-Lives-Lessons-Christians/dp/0879737808",
      rating: 4,
      featured: true,
    },
    {
      id: "11",
      title: "Apologia da Fé Católica",
      category: "book",
      author: "Padre Gerson Totti",
      description: "Defesa sistemática da fé católica contra objeções comuns, com argumentos teológicos e históricos.",
      link: "https://www.amazon.com/s?k=apologia+fe+catolica",
      rating: 4,
    },
    {
      id: "12",
      title: "Peregrinação Espiritual - Mapa de Fé",
      category: "pdf",
      author: "Centro Católico Digital",
      description: "Guia ilustrado mostrando o caminho da conversão, salvação e comunhão com Deus.",
      link: "#",
    },
  ];

  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  const categories = [
    { id: "all", label: "Todos", count: resources.length },
    { id: "book", label: "Livros", count: resources.filter(r => r.category === "book").length },
    { id: "pdf", label: "PDFs", count: resources.filter(r => r.category === "pdf").length },
    { id: "link", label: "Links", count: resources.filter(r => r.category === "link").length },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/20 border border-primary/30 rounded-xl mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-3 text-gradient">Biblioteca Católica</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acesse uma coleção curada de livros, documentos PDF e recursos para aprofundar seu conhecimento da fé católica
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow hover:scale-105"
                    : "bg-black/40 border border-primary/20 text-foreground hover:border-primary/40 hover:bg-primary/10"
                }`}
              >
                {cat.label} <span className="text-xs ml-2">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Featured Resources */}
          {selectedCategory === "all" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">⭐ Destaques</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.filter(r => r.featured).map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glow hover:scale-105"
                  >
                    <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl">
                        {resource.category === "pdf" ? "📄" : resource.category === "book" ? "📖" : "🔗"}
                      </div>
                      {resource.rating && (
                        <div className="flex gap-1">
                          {[...Array(resource.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                      )}
                    </div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{resource.title}</h3>
                      {resource.author && <p className="text-sm text-muted-foreground mb-2">{resource.author}</p>}
                      <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "all" ? "Todos os Recursos" : `${categories.find(c => c.id === selectedCategory)?.label}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glow hover:scale-105 flex flex-col"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">
                        {resource.category === "pdf" ? "📄" : resource.category === "book" ? "📖" : "🔗"}
                      </div>
                      {resource.featured && (
                        <span className="px-2 py-1 bg-accent/20 border border-accent/40 text-accent text-xs font-bold rounded">
                          ⭐ Destaque
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{resource.title}</h3>
                    {resource.author && <p className="text-sm text-muted-foreground mb-2">{resource.author}</p>}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{resource.description}</p>

                    <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      {resource.category === "pdf" ? (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Baixar PDF</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          <span>Abrir</span>
                        </>
                      )}
                    </div>

                    {resource.rating && (
                      <div className="flex gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < resource.rating ? "fill-accent text-accent" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-xl p-8 mt-12 shadow-glow">
            <h3 className="text-xl font-bold text-gradient mb-3">📚 Sobre Esta Biblioteca</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nossa Biblioteca Católica contém os clássicos mais importantes da espiritualidade cristã, desde os Padres da Igreja até
              documentos modernos do Vaticano. Todos os recursos foram selecionados para ajudar você a aprofundar sua fé, compreender
              melhor a doutrina católica e encontrar orientação espiritual. Muitos estão disponíveis para download gratuito.
            </p>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-12">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
