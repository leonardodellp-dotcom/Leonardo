import { useState } from "react";
import Layout from "@/components/Layout";
import { BookOpen, Calendar, Bookmark, Target } from "lucide-react";

interface BibleReading {
  week: number;
  day: string;
  book: string;
  chapter: number;
  verses: string;
  title: string;
  reflection: string;
}

const bibleReadings: BibleReading[] = [
  {
    week: 1,
    day: "Segunda",
    book: "Mateus",
    chapter: 1,
    verses: "1-25",
    title: "Genealogia de Jesus",
    reflection:
      "Conhecemos a história genealógica de Jesus, mostrando como Deus cumpriu suas promessas através das gerações. Reflita sobre como Deus trabalha através de nossa história pessoal.",
  },
  {
    week: 1,
    day: "Terça",
    book: "Mateus",
    chapter: 2,
    verses: "1-12",
    title: "A Visita dos Magos",
    reflection:
      "Os magos viajam longo caminho para conhecer Jesus. O que nos move a buscar Jesus? Como somos magos em nossa própria jornada espiritual?",
  },
  {
    week: 1,
    day: "Quarta",
    book: "Mateus",
    chapter: 3,
    verses: "1-17",
    title: "Batismo de Jesus",
    reflection:
      "Jesus é batizado por João e recebe a confirmação do Pai. Lembremos de nosso próprio batismo como começar de nossa jornada com Cristo.",
  },
  {
    week: 1,
    day: "Quinta",
    book: "Mateus",
    chapter: 4,
    verses: "1-11",
    title: "Tentações no Deserto",
    reflection:
      "Jesus enfrenta tentações como nós também enfrentamos. Como podemos resistir às tentações com a força de Deus?",
  },
  {
    week: 1,
    day: "Sexta",
    book: "Mateus",
    chapter: 5,
    verses: "1-12",
    title: "As Bem-aventuranças",
    reflection:
      "As bem-aventuranças revelam o caminho da verdadeira felicidade em Cristo. Qual bem-aventurança mais ressoa em seu coração?",
  },
  {
    week: 1,
    day: "Sábado",
    book: "Mateus",
    chapter: 5,
    verses: "13-20",
    title: "Sal e Luz do Mundo",
    reflection:
      "Somos chamados a ser sal e luz. Como podemos refletir a luz de Cristo no mundo ao nosso redor?",
  },
  {
    week: 1,
    day: "Domingo",
    book: "Mateus",
    chapter: 5,
    verses: "21-48",
    title: "Lei Antiga e Lei Nova",
    reflection:
      "Jesus aprofunda os mandamentos, pedindo transformação interior. O que significa amar como Cristo ama?",
  },
  {
    week: 2,
    day: "Segunda",
    book: "Marcos",
    chapter: 1,
    verses: "1-20",
    title: "Chamado dos Primeiros Discípulos",
    reflection:
      "Jesus chama Pedro, André, Tiago e João deixando suas redes. Respondemos quando Jesus nos chama?",
  },
  {
    week: 2,
    day: "Terça",
    book: "Marcos",
    chapter: 2,
    verses: "1-12",
    title: "Cura do Paralítico",
    reflection:
      "Os amigos trazem o paralítico a Jesus. Somos mediadores de cura para outros através de nossa intercessão?",
  },
  {
    week: 2,
    day: "Quarta",
    book: "Marcos",
    chapter: 3,
    verses: "1-19",
    title: "Eleição dos Doze",
    reflection:
      "Jesus escolhe doze para estar com Ele. Qual é sua vocação específica no corpo de Cristo?",
  },
  {
    week: 2,
    day: "Quinta",
    book: "Lucas",
    chapter: 1,
    verses: "1-38",
    title: "Anunciação a Maria",
    reflection:
      "Maria responde 'faça-se em mim segundo tua palavra'. Como respondemos aos planos de Deus para nossas vidas?",
  },
  {
    week: 2,
    day: "Sexta",
    book: "Lucas",
    chapter: 1,
    verses: "39-80",
    title: "Visita de Maria e Nascimento de João",
    reflection:
      "Maria visita Isabel. Como expressamos alegria e comunhão com outros cristãos?",
  },
  {
    week: 2,
    day: "Sábado",
    book: "Lucas",
    chapter: 2,
    verses: "1-20",
    title: "Nascimento de Jesus",
    reflection:
      "Jesus nasce em humildade. Reconhecemos a presença do Divino nas coisas simples?",
  },
  {
    week: 2,
    day: "Domingo",
    book: "João",
    chapter: 1,
    verses: "1-18",
    title: "Prólogo de João",
    reflection:
      "A Palavra se fez carne e habitou entre nós. Como o Verbo Eterno se manifesta em sua vida?",
  },
];

export default function PlanoBiblia() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const weekReadings = bibleReadings.filter((r) => r.week === selectedWeek);
  const weeks = Array.from(new Set(bibleReadings.map((r) => r.week)));

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Plano de Leitura Bíblica
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Uma jornada de dois meses pelos Evangelhos com reflexões diárias
            </p>
          </div>

          {/* Week Selector */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-400" />
              Selecione a Semana
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {weeks.map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`py-3 px-3 rounded-lg font-semibold transition-all text-center ${
                    selectedWeek === week
                      ? "bg-blue-600 text-white scale-105"
                      : "bg-card border border-border text-foreground hover:bg-slate-700"
                  }`}
                >
                  Semana {week}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Readings */}
          <div className="space-y-4">
            {weekReadings.map((reading) => {
              const dayKey = `${reading.week}-${reading.day}`;
              const isExpanded = expandedDay === dayKey;

              return (
                <div
                  key={dayKey}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-blue-600/50 transition-colors"
                >
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : dayKey)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-700/30"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                        {reading.day}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reading.book} {reading.chapter}:{reading.verses}
                      </p>
                    </div>
                    <div
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <Bookmark className="w-5 h-5 text-blue-400" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-border bg-background/50">
                      <h4 className="text-base font-semibold text-foreground mt-4 mb-3">
                        {reading.title}
                      </h4>
                      <div className="bg-blue-600/10 border-l-4 border-blue-600 p-4 rounded">
                        <p className="text-sm text-foreground leading-relaxed text-justify">
                          {reading.reflection}
                        </p>
                      </div>
                      <div className="mt-4 p-3 bg-background rounded border border-border text-sm text-muted-foreground">
                        <strong>Leitura:</strong> {reading.book}{" "}
                        {reading.chapter}:{reading.verses}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              Dicas para sua Leitura Diária
            </h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>✦ Dedique 15-20 minutos para ler e refletir cada dia</li>
              <li>
                ✦ Anote suas percepções pessoais e como a Palavra fala a você
              </li>
              <li>
                ✦ Reze antes de ler, abrindo seu coração ao Espírito Santo
              </li>
              <li>✦ Compartilhe suas reflexões com amigos ou sua comunidade</li>
              <li>✦ Coloque em prática o que aprendeu no seu dia a dia</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
