import Layout from "@/components/Layout";
import { Heart, BookOpen, Zap, Music } from "lucide-react";
import { useState } from "react";

interface Devotion {
  id: string;
  title: string;
  description: string;
  days: number;
  type: "novena" | "rosary" | "litany";
  content: string[];
  icon: React.ReactNode;
}

export default function Devocoes() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const devotions: Devotion[] = [
    {
      id: "1",
      title: "Novena a Nossa Senhora",
      description: "Novena de 9 dias para pedir proteção e graças maternais",
      days: 9,
      type: "novena",
      icon: <Heart className="w-6 h-6" />,
      content: [
        "Dia 1: Invoco a proteção de Nossa Senhora, Mãe de Deus. Reze 3 Ave-Marias e reflexione sobre a maternidade divina.",
        "Dia 2: Peço a intercessão de Maria em minhas dificuldades. Reze 3 Ave-Marias pedindo paz e consolo.",
        "Dia 3: Confio em Maria como intermediária junto a Jesus. Reze 3 Ave-Marias com confiança total.",
        "Dia 4: Busco a compaixão de Maria para com meus sofrimentos. Reze 3 Ave-Marias pela misericórdia.",
        "Dia 5: Aprendo a ser devoto como Maria foi devota a Deus. Reze 3 Ave-Marias pedindo fidelidade.",
        "Dia 6: Peço a Maria que interceda por minha família. Reze 3 Ave-Marias pela união familiar.",
        "Dia 7: Confio em Maria para guiar meu caminho espiritual. Reze 3 Ave-Marias pedindo direção.",
        "Dia 8: Celebro a vitória de Maria sobre o pecado e morte. Reze 3 Ave-Marias com alegria.",
        "Dia 9: Agradeço a Maria por suas graças. Reze 3 Ave-Marias com gratidão sincera.",
      ],
    },
    {
      id: "2",
      title: "Novena a Santo Antônio",
      description: "Novena de 9 dias para encontrar objetos perdidos e impossíveis",
      days: 9,
      type: "novena",
      icon: <Zap className="w-6 h-6" />,
      content: [
        "Dia 1: Peço a Santo Ant��nio, amigo dos necessitados. Reze 3 Pai Nossos com fé genuína.",
        "Dia 2: Confio na intercessão do santo dos impossíveis. Reze 3 Pai Nossos pedindo ajuda.",
        "Dia 3: Santo Antônio protege os viajantes e necessitados. Reze 3 Pai Nossos pela proteção.",
        "Dia 4: Peço auxílio para encontrar o que foi perdido. Reze 3 Pai Nossos com confiança.",
        "Dia 5: Santo Antônio ensinou generosidade e caridade. Reze 3 Pai Nossos pedindo compaixão.",
        "Dia 6: Celebro a sabedoria do santo milagreiro. Reze 3 Pai Nossos pedindo sabedoria.",
        "Dia 7: Santo Antônio nunca desamparou os fiéis. Reze 3 Pai Nossos pela fidelidade.",
        "Dia 8: Confio na poderosa intercessão de Santo Antônio. Reze 3 Pai Nossos com esperança.",
        "Dia 9: Agradeço Santo Antônio por suas graças. Reze 3 Pai Nossos com gratidão.",
      ],
    },
    {
      id: "3",
      title: "Novena ao Espírito Santo",
      description: "Novena de 9 dias antes do Pentecostes para dons espirituais",
      days: 9,
      type: "novena",
      icon: <Music className="w-6 h-6" />,
      content: [
        "Dia 1: Invoco o Espírito Santo, Paráclito. Reze 3 Glória ao Pai pedindo unção do Espírito.",
        "Dia 2: Peço coragem e força do Espírito Santo. Reze 3 Glória ao Pai pela fortaleza.",
        "Dia 3: Busco a sabedoria que só vem do Espírito. Reze 3 Glória ao Pai pedindo conhecimento.",
        "Dia 4: Peço o dom do conselho do Espírito Santo. Reze 3 Glória ao Pai pela orientação.",
        "Dia 5: Invoco a fortaleza do Espírito para minhas fraquezas. Reze 3 Glória ao Pai.",
        "Dia 6: Peço o dom da Piedade e temor de Deus. Reze 3 Glória ao Pai pela reverência.",
        "Dia 7: Busco a inteligência das coisas de Deus. Reze 3 Glória ao Pai pedindo entendimento.",
        "Dia 8: Peço o Espírito Santo para habitar em meu coração. Reze 3 Glória ao Pai.",
        "Dia 9: Recebo os dons pentecostais do Espírito Santo. Reze 3 Glória ao Pai com alegria.",
      ],
    },
    {
      id: "4",
      title: "Guia do Rosário Diário",
      description: "Aprenda a rezar o rosário completo com meditação nos mistérios",
      days: 7,
      type: "rosary",
      icon: <BookOpen className="w-6 h-6" />,
      content: [
        "Introdução ao Rosário: O rosário é uma conversa com Deus através da intercessão de Maria. Comece com o Sinal da Cruz e o Credo.",
        "As Contas: Conheca a estrutura - 59 contas divididas em 5 mistérios de 10 Ave-Marias cada.",
        "Oração Preparatória: Reze um Pai Nosso, três Ave-Marias, um Glória ao Pai para disposição.",
        "Primeira Década: Reze um Pai Nosso na conta grande, 10 Ave-Marias nas contas pequenas.",
        "Segunda a Quinta Décadas: Repita o processo mudando os mistérios do dia.",
        "Encerramento: Termine com a Salve Rainha e suas intenções pessoais.",
        "Prática Constante: Reze diariamente para manter a comunhão com Deus e Maria.",
      ],
    },
    {
      id: "5",
      title: "Litania de Todos os Santos",
      description: "Invocação poderosa de todos os santos para intercessão",
      days: 1,
      type: "litany",
      icon: <Heart className="w-6 h-6" />,
      content: [
        "Senhor, tende piedade de nós.",
        "Cristo, tende piedade de nós.",
        "Deus, Pai celeste, tende piedade de nós.",
        "Santo Deus, Santo Forte, Santo Imortal, livrai-nos.",
        "Santa Maria, rogai por nós.",
        "Santa Mãe de Deus, rogai por nós.",
        "Santa Virgem das virgens, rogai por nós.",
        "São Miguel, rogai por nós.",
        "São Gabriel, rogai por nós.",
        "São Rafael, rogai por nós.",
        "Santos Anjos de Deus, rogai por nós.",
        "São João Batista, rogai por nós.",
        "São José, rogai por nós.",
        "Todos os Santos Apóstolos, rogai por nós.",
        "Todos os Santos Evangelistas, rogai por nós.",
        "Todos os Santos Mártires, rogai por nós.",
        "Todos os Santos Confessores, rogai por nós.",
        "Todas as Santas Virgens, rogai por nós.",
        "Todos os Santos de Deus, rogai por nós.",
      ],
    },
    {
      id: "6",
      title: "Litania do Sagrado Coração",
      description: "Invocação ao Sagrado Coração de Jesus para devoção pessoal",
      days: 1,
      type: "litany",
      icon: <Zap className="w-6 h-6" />,
      content: [
        "Senhor, tende piedade de nós.",
        "Cristo, tende piedade de nós.",
        "Coração de Jesus, cheio de bondade, piedade de nós.",
        "Coração de Jesus, Templo de Deus, piedade de nós.",
        "Coração de Jesus, Tabernáculo do Altíssimo, piedade de nós.",
        "Coração de Jesus, Casa de Deus, piedade de nós.",
        "Coração de Jesus, Forno divino de caridade, piedade de nós.",
        "Coração de Jesus, abismo de virtudes, piedade de nós.",
        "Coração de Jesus, digno de louvor, piedade de nós.",
        "Coração de Jesus, Rei e centro de todos os corações, piedade de nós.",
        "Coração de Jesus, no qual habitam todos os tesouros de sabedoria, piedade de nós.",
        "Coração de Jesus, no qual habita toda plenitude da divindade, piedade de nós.",
        "Coração de Jesus, no qual o Pai Se complaceu, piedade de nós.",
        "Coração de Jesus, de cuja plenitude todos nós recebemos, piedade de nós.",
        "Coração de Jesus, desejado de todas as nações, piedade de nós.",
        "Coração de Jesus, misericordioso e propício aos pecadores, piedade de nós.",
        "Coração de Jesus, digno de amor infinito, piedade de nós.",
      ],
    },
  ];

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Devoções Católicas</h1>
            <p className="text-lg text-muted-foreground">
              Práticas sagradas para aprofundar sua espiritualidade: Novenas, Rosário e Litanias
            </p>
          </div>

          {/* Devotions Grid */}
          <div className="space-y-4 mb-12">
            {devotions.map((devotion) => (
              <div
                key={devotion.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
              >
                <button
                  onClick={() => toggleExpanded(devotion.id)}
                  className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-primary mt-1">{devotion.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{devotion.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{devotion.description}</p>
                        <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                          {devotion.days} dia{devotion.days > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className={`text-2xl transition-transform ${expandedId === devotion.id ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>
                </button>

                {expandedId === devotion.id && (
                  <div className="border-t border-border px-6 py-6 bg-muted/20">
                    <div className="space-y-4">
                      {devotion.content.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed pt-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">✨ Benefícios das Devoções</h3>
            <ul className="space-y-3 text-purple-800 dark:text-purple-200 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Fortalecer a ligação com Deus e Maria</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Obter intercessão dos santos para suas necessidades</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Desenvolver disciplina espiritual e fé profunda</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Experimentar paz, consolação e milagres</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Integrar-se na tradição milenar da Igreja Católica</span>
              </li>
            </ul>
          </div>

          {/* Footer Link */}
          <div className="text-center">
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
