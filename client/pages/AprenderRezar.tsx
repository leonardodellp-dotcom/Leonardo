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

          {/* Highlight: Daily Rosary Section */}
          <div className="bg-gradient-to-r from-red-500/10 via-purple-500/10 to-red-500/10 rounded-xl p-8 border border-red-200/30 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-lg text-red-600">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">O Terço do Dia - Mistérios do Rosário</h2>
                <p className="text-muted-foreground">
                  A tradição da Igreja recomenda rezar mistérios diferentes de acordo com o dia da semana. Cada mistério nos convida a meditar sobre momentos específicos da vida de Jesus e Maria.
                </p>
              </div>
            </div>
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
                                  ? "bg-yellow-500/20 text-yellow-400"
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

          {/* Daily Rosary Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary" />
              Terço de Cada Dia - Mistérios Recomendados
            </h2>

            {/* Rosary Beads Explanation */}
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                O que Cada Bolinha do Terço Significa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rosaryBeads.map((bead, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-5 bg-muted/30 dark:bg-muted/20">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary">
                          <span className="text-lg font-bold">●</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">{bead.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{bead.description}</p>
                        <p className="text-xs font-semibold text-primary">Oração: {bead.prayer}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total: {bead.count} {bead.count === 1 ? 'bolinha' : 'bolinhas'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Rosary Cards */}
            <div className="grid grid-cols-1 gap-4">
              {dailyRosaries.map((day) => (
                <div
                  key={day.id}
                  className={`bg-card border ${day.color} rounded-xl overflow-hidden hover:border-primary/50 transition-all`}
                >
                  <button
                    onClick={() => toggleDayExpanded(day.id)}
                    className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{day.day}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {day.mysteries[0]} - Clique para ver os mistérios e leituras
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {day.mysteries.slice(1, 3).map((mystery, i) => (
                            <span key={i} className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                              {mystery}
                            </span>
                          ))}
                          {day.mysteries.length > 3 && (
                            <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                              +{day.mysteries.length - 3} mais...
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className={`text-2xl transition-transform ${expandedDayId === day.id ? 'rotate-180' : ''}`}>
                          ▼
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedDayId === day.id && (
                    <div className="border-t border-border px-6 py-6 bg-muted/20 dark:bg-muted/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mysteries */}
                        <div>
                          <h4 className="font-bold text-lg mb-4 text-primary">📿 Mistérios</h4>
                          <div className="space-y-3">
                            {day.mysteries.slice(1).map((mystery, i) => (
                              <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-foreground">{mystery}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Readings */}
                        <div>
                          <h4 className="font-bold text-lg mb-4 text-primary">📖 Leituras Recomendadas</h4>
                          <div className="space-y-3">
                            {day.readings.map((reading, i) => (
                              <div key={i} className="flex gap-3 text-sm">
                                <span className="flex-shrink-0 text-primary font-bold">➤</span>
                                <p className="text-muted-foreground">{reading}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Info about Rosary */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-8">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">💡 Sobre os Mistérios do Rosário</h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>• <strong>Mistérios Gozosos</strong>: Meditam sobre a alegria e esperança trazidas pelo nascimento de Jesus</li>
                <li>• <strong>Mistérios Dolorosos</strong>: Refletem sobre o sofrimento de Cristo pela salvação do mundo</li>
                <li>• <strong>Mistérios Gloriosos</strong>: Celebram a vitória de Cristo sobre a morte e a glória de Maria</li>
                <li>• <strong>Mistérios Luminosos</strong>: (Opcional) Adicionados pelo Papa João Paulo II, focam na vida pública de Jesus</li>
              </ul>
            </div>
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
