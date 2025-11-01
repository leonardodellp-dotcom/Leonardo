import Layout from "@/components/Layout";
import { Heart, Hand, Zap, Music, BookOpen, Flame } from "lucide-react";
import { useState } from "react";

interface PrayerMethod {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
  duration: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
}

export default function AprenderRezar() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const prayerMethods: PrayerMethod[] = [
    {
      id: "1",
      title: "O Rosário",
      icon: <Heart className="w-6 h-6" />,
      description:
        "Uma das práticas mais tradicionais da Igreja Católica, o rosário é uma meditação estruturada sobre a vida de Jesus e Maria através de seus mistérios.",
      steps: [
        "Comece com o Sinal da Cruz",
        "Reze o Credo Apostólico no crucifixo",
        "Reze um Pai Nosso na primeira conta grande",
        "Reze três Ave-Marias nas próximas contas pequenas (intenção: fé, esperança e caridade)",
        "Reze um Glória ao Pai",
        "Anuncie o primeiro mistério do dia e reze um Pai Nosso",
        "Reze dez Ave-Marias enquanto medita profundamente sobre o mistério",
        "Reze um Glória ao Pai ao final de cada mistério",
        "Repita o processo para os cinco mistérios designados para o dia",
        "Termine com a Salve Rainha",
      ],
      duration: "15-30 minutos",
      difficulty: "Iniciante",
    },
    {
      id: "2",
      title: "Leitura Espiritual (Lectio Divina)",
      icon: <BookOpen className="w-6 h-6" />,
      description:
        "Uma forma antiga de oração que envolve a leitura contemplativa da Escritura, permitindo que Deus fale ao seu coração.",
      steps: [
        "Lectio (Leitura): Leia lentamente um trecho da Bíblia",
        "Meditatio (Meditação): Reflita sobre o significado do texto",
        "Oratio (Oração): Responda a Deus sobre o que descobriu",
        "Contemplatio (Contemplação): Descanse em silêncio na presença de Deus",
      ],
      duration: "15-30 minutos",
      difficulty: "Intermediário",
    },
    {
      id: "3",
      title: "Oração de Adoração",
      icon: <Zap className="w-6 h-6" />,
      description:
        "Uma forma de oração focada em louvar e adorar a Deus por quem Ele é, independentemente das circunstâncias.",
      steps: [
        "Coloque-se em uma posição de reverência (ajoelhado ou em pé)",
        "Comece reconhecendo a grandeza de Deus",
        "Expresse sua admiração por Seus atributos",
        "Louvo-o por Seu poder, amor, bondade e sabedoria",
        "Deixe seu coração ser preenchido com gratidão",
      ],
      duration: "10-20 minutos",
      difficulty: "Iniciante",
    },
    {
      id: "4",
      title: "Oração Contemplativa (Meditação)",
      icon: <Music className="w-6 h-6" />,
      description:
        "Uma prática silenciosa que envolve abrir seu coração a Deus, permitindo que Ele comunique de forma profunda.",
      steps: [
        "Encontre um lugar tranquilo e confortável",
        "Sente-se em uma posição relaxada",
        "Feche os olhos e respire profundamente",
        "Esvazia sua mente de pensamentos mundanos",
        "Convide a presença de Deus",
        "Permita-se ser envolvido pela paz divina",
        "Deixe o Espírito Santo guiar seus pensamentos",
      ],
      duration: "15-30 minutos",
      difficulty: "Avançado",
    },
    {
      id: "5",
      title: "Oração Intercessória",
      icon: <Hand className="w-6 h-6" />,
      description:
        "Interceder significa orar em favor de outros, levando suas necessidades e intenções diante de Deus.",
      steps: [
        "Traga à mente as pessoas por quem deseja interceder",
        "Apresente suas necessidades específicas a Deus",
        "Ore pela graça e bênção na vida deles",
        "Confie que Deus ouvirá e responderá",
        "Expresse gratidão antecipada pelas respostas",
      ],
      duration: "10-30 minutos",
      difficulty: "Intermediário",
    },
    {
      id: "6",
      title: "Oração Espontânea (Do Coração)",
      icon: <Flame className="w-6 h-6" />,
      description:
        "Uma conversa honesta e espontânea com Deus, expressando seus sentimentos reais, dúvidas, gratidão e esperança.",
      steps: [
        "Encontre um lugar privado e confortável",
        "Fale com Deus como faria com um amigo próximo",
        "Expresse seus verdadeiros sentimentos e emoções",
        "Partilhe suas preocupações e alegrias",
        "Permita-se ser vulnerável e autêntico",
        "Escute o que Deus está dizendo ao seu coração",
      ],
      duration: "5-30 minutos",
      difficulty: "Iniciante",
    },
  ];

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Hand className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Guia Espiritual
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Aprender a Rezar
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra diferentes formas e técnicas de oração. Desde o Rosário
              tradicional até a meditação contemplativa, encontre o método que
              toca seu coração.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {prayerMethods.map((method) => (
              <div
                key={method.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
              >
                <button
                  onClick={() => toggleExpanded(method.id)}
                  className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {method.description}
                        </p>
                        <div className="flex gap-3 text-xs">
                          <span className="px-2 py-1 bg-muted rounded text-muted-foreground">
                            ⏱️ {method.duration}
                          </span>
                          <span
                            className={`px-2 py-1 rounded font-semibold ${
                              method.difficulty === "Iniciante"
                                ? "bg-green-500/20 text-green-400"
                                : method.difficulty === "Intermediário"
                                  ? "bg-blue-600/20 text-blue-300"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {method.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {expandedId === method.id && (
                  <div className="border-t border-border px-6 py-4 bg-muted/20">
                    <h4 className="font-semibold mb-3 text-sm">
                      Como Praticar:
                    </h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {method.steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>


          {/* Tips Section */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border mb-12">
            <h3 className="text-2xl font-bold mb-6">
              ✨ Dicas para Aprofundar sua Oração
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">
                  🕯️ Crie um Espaço Sagrado
                </h4>
                <p className="text-sm text-muted-foreground">
                  Encontre um local tranquilo onde você possa se concentrar,
                  longe de distrações. Pode ser seu quarto, a Igreja ou um lugar
                  na natureza.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⏰ Estabeleça uma Rotina</h4>
                <p className="text-sm text-muted-foreground">
                  Dedique um tempo específico cada dia para orar. A consistência
                  aprofunda sua relação com Deus.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📖 Comece com a Bíblia</h4>
                <p className="text-sm text-muted-foreground">
                  Use passagens bíblicas como ponto de partida para sua
                  meditação e oração.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🤝 Ore em Comunidade</h4>
                <p className="text-sm text-muted-foreground">
                  Participe de grupos de oração. A comunidade enriquece e
                  fortalece a vida espiritual.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🕯️ Use Ajudas Visuais</h4>
                <p className="text-sm text-muted-foreground">
                  Uma vela, ícone religioso ou cruz podem ajudar a manter o foco
                  durante a oração.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  🎵 Integre Música Sagrada
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hinos e músicas litúrgicas podem elevar sua alma durante a
                  meditação e oração.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              "Oração não é pedir o que você quer. É desejo do que Deus quer
              para você." — São Tiago, Apóstolo
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
