import { useState } from "react";
import Layout from "@/components/Layout";
import { Heart, User, Calendar, MessageCircle, Plus, X } from "lucide-react";

interface Testimony {
  id: string;
  author: string;
  title: string;
  content: string;
  age: number;
  date: string;
}

const testimonies: Testimony[] = [
  {
    id: "1",
    author: "Maria Silva",
    title: "Como a Fé me Salvou do Vício",
    age: 22,
    date: "15 de novembro de 2024",
    content:
      "Meu nome é Maria e por três anos lutei contra o vício em álcool e drogas. Aos 19 anos, estava completamente perdida, minha família desesperada. Um dia, uma amiga me convidou para um encontro de jovens cristãos. Lá, conheci a palavra de Deus e senti o amor de Jesus transformando meu coração. Comecei a frequentar missas, confiar em Deus e abraçar a comunidade. Hoje, com 22 anos, sou livre! Minha vida mudou 180 graus. Graças a Deus, minha família foi restaurada e descobri meu propósito. Para quem sofre, digo: Jesus é a resposta. Você é amado.",
  },
];

export default function Testemunhas() {
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Testemunhas de Fé
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Histórias reais de jovens que encontraram Jesus e transformaram
              suas vidas
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Compartilhe Sua Testemunha
            </button>
          </div>

          {/* Testimonies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonies.map((testimony) => (
              <div
                key={testimony.id}
                onClick={() => setSelectedTestimony(testimony)}
                className="bg-card border border-border rounded-lg p-6 hover:border-blue-600/50 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                    {testimony.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {testimony.author}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {testimony.age} anos
                    </p>
                  </div>
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">
                  {testimony.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {testimony.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {testimony.date}
                  </span>
                  <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                    <MessageCircle className="w-3 h-3" />
                    Ler mais
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal - Full Testimony */}
          {selectedTestimony && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold">
                      {selectedTestimony.author.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {selectedTestimony.author}
                      </h2>
                      <p className="text-blue-100 text-sm">
                        {selectedTestimony.age} anos
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTestimony(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {selectedTestimony.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedTestimony.date}
                  </p>
                  <p className="text-foreground leading-relaxed text-justify whitespace-pre-wrap">
                    {selectedTestimony.content}
                  </p>

                  <div className="mt-8 p-4 bg-blue-600/10 border-l-4 border-blue-600 rounded">
                    <p className="text-sm text-foreground italic">
                      "Se alguém está em Cristo, é nova criatura; as coisas
                      antigas já passaram, eis que tudo se fez novo." - 2
                      Coríntios 5:17
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal - Share Testimony */}
          {showModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Compartilhe Sua Testemunha
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Sua Idade
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
                        placeholder="Digite sua idade"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
                        placeholder="Ex: Como Jesus mudou minha vida"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Sua Testemunha
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600 h-32 resize-none"
                      placeholder="Conte sua história de fé..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-colors"
                    >
                      Compartilhar Testemunha
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
