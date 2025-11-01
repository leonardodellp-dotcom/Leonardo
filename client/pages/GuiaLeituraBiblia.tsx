import Layout from "@/components/Layout";
import {
  BookOpen,
  Lightbulb,
  CheckCircle,
  Heart,
  MapPin,
  Zap,
} from "lucide-react";

export default function GuiaLeituraBiblia() {
  const readingPlans = [
    {
      title: "Plano de 365 Dias",
      duration: "1 ano",
      description:
        "Leia a Bíblia inteira em um ano, um ou dois capítulos por dia",
      difficulty: "Moderado",
      estimate: "15-30 min por dia",
    },
    {
      title: "Evangelhos em Foco",
      duration: "3 meses",
      description:
        "Leia os quatro Evangelhos profundamente, focando na vida de Jesus",
      difficulty: "Fácil",
      estimate: "10-20 min por dia",
    },
    {
      title: "Novo Testamento",
      duration: "6 meses",
      description: "Estude todo o Novo Testamento e suas cartas",
      difficulty: "Moderado",
      estimate: "20-40 min por dia",
    },
    {
      title: "Livros Sapienciais",
      duration: "2-3 meses",
      description:
        "Medite nos livros de sabedoria: Salmos, Provérbios, Eclesiastes, Sabedoria",
      difficulty: "Fácil",
      estimate: "10-15 min por dia",
    },
  ];

  const tips = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Escolha um Lugar Tranquilo",
      description:
        "Encontre um espaço confortável, livre de distrações, onde possa se concentrar na leitura.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Comece Devagar",
      description:
        "Não tente ler a Bíblia toda de uma vez. Comece com um livro curto como o Evangelho de Marcos.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Leia com Oração",
      description:
        "Comece pedindo ao Espírito Santo que abra seu coração e mente para entender a Palavra.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Faça Anotações",
      description:
        "Escreva seus pensamentos, perguntas e o que Deus está falando ao seu coração.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Use Recursos Auxiliares",
      description:
        "Explore notas de rodapé, dicionários bíblicos e comentários para melhor compreensão.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Leia Consistentemente",
      description:
        "Estabeleça uma rotina diária. Até 10-15 minutos consistentes valem mais que longas sessões esporádicas.",
    },
  ];

  const sections = [
    {
      title: "Como Começar",
      items: [
        "Escolha uma tradução que você compreenda bem (Bíblia na Linguagem de Hoje, Nova Tradução na Linguagem de Hoje, etc)",
        "Comece com um dos Evangelhos (Mateus, Marcos, Lucas ou João)",
        "Separe um tempo fixo cada dia para ler (manhã, à noite, etc)",
        "Leia em voz alta para absorver melhor a mensagem",
        "Não se preocupe em entender tudo imediatamente",
      ],
    },
    {
      title: "Estrutura da Bíblia",
      items: [
        "Antigo Testamento: História de Deus com o povo judeu e profecias sobre Jesus",
        "Novo Testamento: Vida de Jesus e cartas para as primeiras comunidades cristãs",
        "Evangelhos: Mateus, Marcos, Lucas e João - histórias de Jesus",
        "Cartas: Mensagens dos Apóstolos sobre como viver como cristão",
        "Apocalipse: Profecia sobre os últimos tempos",
      ],
    },
    {
      title: "Método Prático de Leitura",
      items: [
        "OBSERVE: Leia o texto e observe os detalhes - quem fala? O quê acontece?",
        "INTERPRETE: O que o texto significa? Qual é a mensagem principal?",
        "APLIQUE: Como isto se aplica à minha vida hoje?",
        "RESPONDA: Qual é minha resposta a esta Palavra de Deus?",
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">
              Como Começar a Ler a Bíblia
            </h1>
            <p className="text-lg text-muted-foreground">
              Um guia prático e acessível para quem deseja começar sua jornada
              de leitura bíblica
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-card border border-border rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Por Que Ler a Bíblia?</h2>
            <p className="text-muted-foreground mb-4">
              A Bíblia é a Palavra de Deus para conosco. Ler a Escritura Sagrada
              nos ajuda a:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Conhecer a vontade de Deus para nossas vidas</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Fortalecer nossa fé e relação com Cristo</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Encontrar consolo, esperança e orientação</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Meditar na Palavra de Deus diariamente</span>
              </li>
            </ul>
          </div>

          {/* Section Details */}
          <div className="space-y-8 mb-12">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Reading Plans */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Planos de Leitura</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {readingPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="font-semibold">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tempo Diário:
                      </span>
                      <span className="font-semibold">{plan.estimate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nível:</span>
                      <span className="font-semibold">{plan.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Dicas Práticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-muted/30 border border-border rounded-lg p-6"
                >
                  <div className="text-primary mb-3">{tip.icon}</div>
                  <h3 className="font-bold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Books */}
          <div className="bg-primary/10 dark:bg-primary/10 border border-primary/30 dark:border-primary/30 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              📚 Livros Recomendados para Começar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  Evangelhos (Comece por aqui!)
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • <strong>Evangelho de Marcos</strong> - Mais curto e direto
                    (inicio perfeito)
                  </li>
                  <li>
                    • <strong>Evangelho de João</strong> - Profundo e espiritual
                  </li>
                  <li>
                    • <strong>Evangelho de Lucas</strong> - Narrativa rica em
                    detalhes
                  </li>
                  <li>
                    • <strong>Evangelho de Mateus</strong> - Completo e bem
                    estruturado
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  Após os Evangelhos
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • <strong>Salmos</strong> - Orações e reflexões poéticas
                  </li>
                  <li>
                    • <strong>Romanos</strong> - Teologia profunda mas acessível
                  </li>
                  <li>
                    • <strong>1 Coríntios</strong> - Respostas a questões
                    práticas
                  </li>
                  <li>
                    • <strong>Atos dos Apóstolos</strong> - História dos
                    primeiros cristãos
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prayer for Start */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center mb-12">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Oração Antes de Começar</h3>
            <p className="text-muted-foreground italic">
              "Senhor, abra meu coração e mente para entender Sua Palavra. Que o
              Espírito Santo me guie nesta leitura. Ajude-me a encontrar em Suas
              páginas a sabedoria, consolo e direção que preciso. Amém."
            </p>
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
