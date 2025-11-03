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
  {
    id: "2",
    author: "João dos Santos",
    title: "Vocação Religiosa Descoberta na Comunidade",
    age: 20,
    date: "10 de novembro de 2024",
    content:
      "Cresci em uma família católica, mas nunca tinha levado minha fé a sério. Quando entrei no grupo de jovens, comecei a sentir um chamado diferente. Através das homilias, dos amigos e da oração comunitária, Deus me revelou que Ele me estava chamando para o seminário. No início tive medo, pensei em uma vida normal, namorada, profissão comum. Mas quando apresentei minha vocação ao grupo, senti tanta alegria no coração que não conseguia resistir. Agora estou no primeiro ano de seminário e cada dia descubro mais sobre o amor de Cristo. Meu desejo é servir a Igreja e ajudar outros jovens a encontrar Jesus.",
  },
  {
    id: "3",
    author: "Ana Carolina",
    title: "Cura Milagrosa Através da Intercessão",
    age: 21,
    date: "5 de novembro de 2024",
    content:
      "Aos 19 anos fui diagnosticada com um tumor cerebral. Os médicos disseram que tinha 30% de chance de sobreviver à cirurgia. Minha família inteira orou, fizemos novenas, rezei o terço diariamente. No dia da cirurgia, eu sentia a paz de Cristo envolvendo meu coração. Quando acordei, a cirurgia tinha sido um sucesso. Mas a coisa mais milagrosa? O tumor tinha desaparecido completamente nos exames pós-operatórios. Os médicos ficaram chocados e não sabem explicar. Para mim foi resposta de oração. Hoje estou 100% saudável e dedicada a ajudar outros a fortalecer sua fé. A ciência é importante, mas Deus está acima de tudo.",
  },
  {
    id: "4",
    author: "Pedro Oliveira",
    title: "Da Indiferença Religiosa ao Apostolado",
    age: 23,
    date: "1º de novembro de 2024",
    content:
      "Eu era aquele tipo de jovem que ia à missa por obrigação, por pressão dos pais. Não tinha interesse em religião, meu foco era festas, diversão e conquistas pessoais. Mas um dia tudo mudou quando participei de um retiro que meu pai praticamente me obrigou a ir. Lá aprendi sobre o amor sacrificial de Cristo, sobre redenção, sobre propósito real. Meu coração foi tocado profundamente. Desde então, comecei a estudar a fé, participar ativamente de grupos apostólicos e hoje ajudo a trazer outros jovens para Cristo. Meu maior prazer agora é ver alguém encontrar Jesus. A vida tem significado real quando servimos algo maior que nós mesmos.",
  },
  {
    id: "5",
    author: "Beatriz Ferreira",
    title: "Superando a Depressão com o Apoio da Comunidade",
    age: 20,
    date: "28 de outubro de 2024",
    content:
      "Durante dois anos sofri silenciosamente com depressão profunda. Tentei esconder de todos, inclusive de minha família. Meu corpo funcionava, mas minha alma estava morta. Um dia, uma colega do grupo de jovens percebeu que algo estava errado comigo. Ela conversou comigo e me apresentou um sacerdote que era muito compreensivo. Com a ajuda dele, terapia e oração, comecei a reconstruir meu relacionamento com Deus. A comunidade me cercou de amor, as amigas rezavam comigo, o grupo me incluía em tudo. Aprendi que depressão é uma doença real, mas Deus nunca abandona. Hoje sou monitora do grupo e ajudo outras meninas que enfrentam situações similares.",
  },
  {
    id: "6",
    author: "Lucas Alves",
    title: "Milagre na Reconciliação Familiar",
    age: 24,
    date: "20 de outubro de 2024",
    content:
      "Meu pai abandonou nossa família quando eu tinha 5 anos. Durante 19 anos, guardei raiva, ódio e dor. Minha mãe trabalhou dobrado, chorou de madrugada, mas sempre rezava pelo meu pai. Quando comecei a frequentar o grupo de jovens, aprendi sobre perdão, sobre como a falta de perdão nos envergonha mais que aquele que nos magoou. Conforme aprendi mais sobre o Evangelho, decidi procurar meu pai e oferecer-lhe perdão genuíno. Após 19 anos sem contato, nos reencontramos. Chorei muito, ele também. Hoje meu pai está retomando sua vida com Deus e nossa relação está sendo restaurada lentamente. Não é perfeito, mas existe esperança e amor. Graças a Deus.",
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
