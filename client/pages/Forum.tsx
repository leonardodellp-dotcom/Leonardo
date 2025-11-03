import { useState } from "react";
import Layout from "@/components/Layout";
import {
  MessageCircle,
  Heart,
  Clock,
  User,
  Plus,
  X,
  Filter,
  Search,
} from "lucide-react";

interface ForumReply {
  id: string;
  author: string;
  profilePhoto?: string;
  content: string;
  timestamp: string;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  profilePhoto?: string;
  category: string;
  replies: ForumReply[];
  likes: number;
  views: number;
  timestamp: string;
}

const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Como manter a fé em tempos de dificuldade?",
    content:
      "Venho passando por um momento muito difícil na minha vida e estou com dificuldade de manter minha fé. Como vocês conseguem se manter firmes quando tudo parece estar caindo?",
    author: "Maria Santos",
    category: "Fé e Espiritualidade",
    likes: 24,
    views: 156,
    timestamp: "2 horas atrás",
    replies: [
      {
        id: "r1",
        author: "Pedro Oliveira",
        content:
          "Maria, durante meus momentos difíceis, oração constante me salvou. Tente rezar o rosário diariamente e confie que Deus tem um plano.",
        timestamp: "1 hora atrás",
      },
      {
        id: "r2",
        author: "Beatriz Costa",
        content:
          "Você não está sozinha. Nossas dificuldades nos aproximam de Deus. Procure o padre para conversar e participe dos encontros do grupo.",
        timestamp: "30 minutos atrás",
      },
    ],
  },
];

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  // Check if user is admin
  const userSession = localStorage.getItem("user_session");
  const isAdmin = userSession && JSON.parse(userSession).email === "leoadm";

  const categories = [
    "Todos",
    "Fé e Espiritualidade",
    "Evangelização",
    "Recursos",
    "Sacramentos",
    "Moral e Ética",
  ];

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Fórum Comunitário
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Um espaço seguro para discutir fé, compartilhar dúvidas e crescer
              juntos
            </p>
            {isAdmin ? (
              <button
                onClick={() => setShowNewPostModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Nova Discussão
              </button>
            ) : (
              <button
                onClick={() => setShowSuggestionModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Sugerir Discussão
              </button>
            )}
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar discussões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Category Filter */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Filter className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-foreground">
                  Filtrar por Categoria
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-card border border-border text-foreground hover:border-blue-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhuma discussão encontrada. Seja o primeiro a criar uma!
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-card border border-border rounded-lg p-6 hover:border-blue-600/50 hover:shadow-lg transition-all cursor-pointer relative"
                >
                  {/* Badge Exemplo */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-blue-600/30 border border-blue-500/50 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                      ⭐ Exemplo
                    </span>
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 hover:text-blue-400">
                        {post.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.timestamp}
                        </span>
                        <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground line-clamp-2 mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 hover:text-blue-400">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies.length} respostas
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.views} visualizações
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Post Detail Modal */}
          {selectedPost && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex-1">
                    {selectedPost.title}
                  </h2>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  {/* Original Post */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {selectedPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {selectedPost.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedPost.timestamp}
                        </p>
                      </div>
                      <span className="ml-auto text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                        {selectedPost.category}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed mb-4">
                      {selectedPost.content}
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                      <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                        <Heart className="w-4 h-4" />
                        {selectedPost.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {selectedPost.replies.length}
                      </span>
                    </div>
                  </div>

                  {/* Replies */}
                  {selectedPost.replies.length > 0 && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-bold text-foreground">
                        Respostas ({selectedPost.replies.length})
                      </h3>
                      {selectedPost.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-background/50 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                              {reply.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm">
                                {reply.author}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {reply.timestamp}
                              </p>
                            </div>
                          </div>
                          <p className="text-foreground text-sm">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  <div className="mt-6 border-t border-border pt-6">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Sua Resposta
                        </label>
                        <textarea
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600 resize-none h-20"
                          placeholder="Digite sua resposta..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Enviar Resposta
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Post Modal (Admin Only) */}
          {showNewPostModal && isAdmin && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Nova Discussão
                  </h2>
                  <button
                    onClick={() => setShowNewPostModal(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Categoria
                    </label>
                    <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-blue-600">
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
                      placeholder="Ex: Como...?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Sua Discussão
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600 resize-none h-32"
                      placeholder="Digite sua pergunta ou reflexão..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewPostModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-colors"
                    >
                      Criar Discussão
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Suggestion Modal (For Regular Users) */}
          {showSuggestionModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Sugerir uma Discussão
                  </h2>
                  <button
                    onClick={() => setShowSuggestionModal(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-muted-foreground mb-6">
                  Sua sugestão será enviada ao administrador do fórum, que poderá criar a discussão se considerar relevante.
                </p>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Título da Discussão Sugerida
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-green-600"
                      placeholder="Qual é o tema que você gostaria de discutir?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Descrição da Sugestão
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-green-600 resize-none h-32"
                      placeholder="Por que você acha que este tema seria bom para discutir?"
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowSuggestionModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-colors"
                    >
                      Enviar Sugestão
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
