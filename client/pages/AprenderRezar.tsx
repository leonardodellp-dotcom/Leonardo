import Layout from "@/components/Layout";
import { Heart, Hand, Zap, Music, BookOpen, Flame, Calendar, Star } from "lucide-react";
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

interface RosaryDay {
  day: string;
  mysteries: string[];
  readings: string[];
  color: string;
  id: string;
}

interface RosaryBead {
  name: string;
  description: string;
  prayer: string;
  count: number;
}

export default function AprenderRezar() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const dailyRosaries: RosaryDay[] = [
    {
      day: "Segunda-feira",
      mysteries: ["Joyful Mysteries (Mistérios Gozosos)", "Anunciação", "Visitação", "Nascimento de Jesus", "Apresentação de Jesus no Templo", "Encontro de Jesus no Templo"],
      readings: ["Lucas 1:26-38 (Anunciação)", "Lucas 1:39-56 (Visitação)", "Lucas 2:1-20 (Nascimento)", "Lucas 2:22-38 (Apresentação)", "Lucas 2:41-52 (Encontro no Templo)"],
      color: "bg-white border-white"
    },
    {
      day: "Terça-feira",
      mysteries: ["Sorrowful Mysteries (Mistérios Dolorosos)", "Agonia no Horto", "Flagelação do Senhor", "Coroação de Espinhos", "Jesus Carrega a Cruz", "Crucificação"],
      readings: ["Mateus 26:36-46 (Agonia)", "Mateus 27:24-26 (Flagelação)", "Mateus 27:27-31 (Coroação)", "Mateus 27:31-33 (Caminho da Cruz)", "Mateus 27:33-56 (Crucificação)"],
      color: "bg-red-50 border-red-200"
    },
    {
      day: "Quarta-feira",
      mysteries: ["Glorious Mysteries (Mistérios Gloriosos)", "Ressurreição de Jesus", "Ascensão de Jesus", "Descida do Espírito Santo", "Assunção de Maria", "Coroação de Maria"],
      readings: ["Mateus 28:1-10 (Ressurreição)", "Atos 1:6-11 (Ascensão)", "Atos 2:1-21 (Pentecostes)", "Lucas 1:46-55 e Apocalipse 12:1 (Assunção)", "Apocalipse 12:1 (Coroação)"],
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      day: "Quinta-feira",
      mysteries: ["Joyful Mysteries (Mistérios Gozosos)", "Anunciação", "Visitação", "Nascimento de Jesus", "Apresentação de Jesus no Templo", "Encontro de Jesus no Templo"],
      readings: ["Lucas 1:26-38 (Anunciação)", "Lucas 1:39-56 (Visitação)", "Lucas 2:1-20 (Nascimento)", "Lucas 2:22-38 (Apresentação)", "Lucas 2:41-52 (Encontro no Templo)"],
      color: "bg-white border-white"
    },
    {
      day: "Sexta-feira",
      mysteries: ["Sorrowful Mysteries (Mistérios Dolorosos)", "Agonia no Horto", "Flagelação do Senhor", "Coroação de Espinhos", "Jesus Carrega a Cruz", "Crucificação"],
      readings: ["Mateus 26:36-46 (Agonia)", "Mateus 27:24-26 (Flagelação)", "Mateus 27:27-31 (Coroação)", "Mateus 27:31-33 (Caminho da Cruz)", "Mateus 27:33-56 (Crucificação)"],
      color: "bg-red-50 border-red-200"
    },
    {
      day: "Sábado",
      mysteries: ["Joyful Mysteries (Mistérios Gozosos)", "Anunciação", "Visitação", "Nascimento de Jesus", "Apresentação de Jesus no Templo", "Encontro de Jesus no Templo"],
      readings: ["Lucas 1:26-38 (Anunciação)", "Lucas 1:39-56 (Visitação)", "Lucas 2:1-20 (Nascimento)", "Lucas 2:22-38 (Apresentação)", "Lucas 2:41-52 (Encontro no Templo)"],
      color: "bg-white border-white"
    },
    {
      day: "Domingo",
      mysteries: ["Glorious Mysteries (Mistérios Gloriosos)", "Ressurreição de Jesus", "Ascensão de Jesus", "Descida do Espírito Santo", "Assunção de Maria", "Coroação de Maria"],
      readings: ["Mateus 28:1-10 (Ressurreição)", "Atos 1:6-11 (Ascensão)", "Atos 2:1-21 (Pentecostes)", "Lucas 1:46-55 e Apocalipse 12:1 (Assunção)", "Apocalipse 12:1 (Coroação)"],
      color: "bg-blue-50 border-blue-200"
    }
  ];

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
            <div className="grid grid-cols-1 gap-6">
              {dailyRosaries.map((day, idx) => (
                <div key={idx} className={`border rounded-xl p-6 ${day.color} border-opacity-30`}>
                  <h3 className="text-xl font-bold mb-4">{day.day}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mysteries */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase">Mistérios</h4>
                      <ul className="space-y-2">
                        {day.mysteries.map((mystery, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            {i === 0 ? (
                              <span className="font-bold text-primary min-w-fit">{mystery}</span>
                            ) : (
                              <>
                                <span className="text-primary font-bold min-w-fit">•</span>
                                <span>{mystery}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Readings */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase">Leituras Recomendadas</h4>
                      <ul className="space-y-2">
                        {day.readings.map((reading, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-primary font-bold min-w-fit">📖</span>
                            <span>{reading}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
