import { useState } from "react";
import Layout from "@/components/Layout";
import { Zap, CheckCircle, XCircle, Trophy, RotateCcw, Lock } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "fácil" | "médio" | "difícil" | "impossível";
}

interface QuizState {
  level: "fácil" | "médio" | "difícil" | "impossível" | null;
  currentQuestion: number;
  score: number;
  answered: boolean;
  selectedAnswer: number | null;
  finished: boolean;
  questions: Question[];
}

const questionBank: Question[] = [
  // Fácil
  {
    id: "f1",
    question: "Quantos sacramentos existem na Igreja Católica?",
    options: ["5", "7", "9", "3"],
    correctAnswer: 1,
    explanation: "Os sete sacramentos são: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem Sagrada e Matrimônio.",
    difficulty: "fácil",
  },
  {
    id: "f2",
    question: "Qual é o mandamento maior segundo Jesus?",
    options: ["Não matarás", "Amar a Deus e ao próximo", "Guardar o sábado", "Honrar os pais"],
    correctAnswer: 1,
    explanation: "Jesus respondeu: 'Amarás ao Senhor, teu Deus, de todo o coração... e amarás ao teu próximo como a ti mesmo.'",
    difficulty: "fácil",
  },
  {
    id: "f3",
    question: "Quem foi mãe de Jesus?",
    options: ["Maria Madalena", "Maria de Nazaré", "Martha", "Salomé"],
    correctAnswer: 1,
    explanation: "Maria de Nazaré é a mãe de Jesus Cristo e Rainha dos Céus na tradição católica.",
    difficulty: "fácil",
  },
  {
    id: "f4",
    question: "Em qual livro da Bíblia encontramos o Pai Nosso?",
    options: ["Marcos", "Mateus", "Lucas", "Ambos Mateus e Lucas"],
    correctAnswer: 3,
    explanation: "O Pai Nosso aparece em Mateus 6:9-13 e Lucas 11:2-4 com variações menores.",
    difficulty: "fácil",
  },
  {
    id: "f5",
    question: "Qual sacramento marca a entrada de uma pessoa na Igreja?",
    options: ["Confirmação", "Batismo", "Penitência", "Eucaristia"],
    correctAnswer: 1,
    explanation: "O Batismo é o sacramento que marca a entrada de uma pessoa na comunidade eclesial.",
    difficulty: "fácil",
  },
  {
    id: "f6",
    question: "Quantas vezes o rosário se repete?",
    options: ["1", "2", "3", "5"],
    correctAnswer: 3,
    explanation: "O rosário completo consiste em 5 décadas (sets de 10 Ave-Marias), divididas em mistérios.",
    difficulty: "fácil",
  },

  // Médio
  {
    id: "m1",
    question: "Em qual concílio foi definido o conceito de transubstanciação?",
    options: ["Concílio de Niceia", "Concílio de Trento", "Concílio Vaticano II", "Concílio de Éfeso"],
    correctAnswer: 1,
    explanation: "O Concílio de Trento (1545-1563) confirmou e definiu a doutrina da transubstanciação na Eucaristia.",
    difficulty: "médio",
  },
  {
    id: "m2",
    question: "Qual é o nome do instrumento de penitência usado em algumas tradições católicas?",
    options: ["Cilício", "Escapulário", "Scapular", "Disciplina"],
    correctAnswer: 0,
    explanation: "O cilício é uma veste áspera ou corrente usada como forma de mortificação penitencial.",
    difficulty: "médio",
  },
  {
    id: "m3",
    question: "Qual papa iniciou a Reforma Católica?",
    options: ["Papa João Paulo II", "Papa Pio XII", "Papa Paulo III", "Papa Clemente VII"],
    correctAnswer: 2,
    explanation: "Papa Paulo III (1534-1549) iniciou a Reforma Católica convocando o Concílio de Trento.",
    difficulty: "médio",
  },
  {
    id: "m4",
    question: "Quantos evangelhos canônicos existem no Novo Testamento?",
    options: ["3", "4", "5", "7"],
    correctAnswer: 1,
    explanation: "Existem 4 evangelhos canônicos: Mateus, Marcos, Lucas e João.",
    difficulty: "médio",
  },
  {
    id: "m5",
    question: "Qual é a oração central da missa católica?",
    options: ["Oração Eucarística", "Credo", "Pai Nosso", "Ave-Maria"],
    correctAnswer: 0,
    explanation: "A Oração Eucarística (também chamada Canon) é o centro da celebração eucarística.",
    difficulty: "médio",
  },

  // Difícil
  {
    id: "d1",
    question: "Em qual sínodo o papa João Paulo II estabeleceu a Jornada Mundial da Juventude?",
    options: ["Sínodo de 1985", "Sínodo de 1987", "Sínodo de 1989", "Nunca foi estabelecido em um sínodo"],
    correctAnswer: 3,
    explanation: "A Jornada Mundial da Juventude foi iniciada pelo Papa João Paulo II em 1984 e se tornou tradição, mas não através de um sínodo específico.",
    difficulty: "difícil",
  },
  {
    id: "d2",
    question: "Qual é o nome da doutrina que explica como graça e livre arbítrio coexistem?",
    options: ["Semipelagianismo", "Molinismo", "Determinismo", "Arminianismo"],
    correctAnswer: 1,
    explanation: "O Molinismo, desenvolvido por Luís de Molina, é a posição católica sobre a compatibilidade entre graça divina e livre arbítrio.",
    difficulty: "difícil",
  },
  {
    id: "d3",
    question: "Em qual ano foi proclamado o dogma da Assunção de Maria?",
    options: ["1854", "1950", "1965", "1980"],
    correctAnswer: 1,
    explanation: "O papa Pio XII proclamou solemnemente o dogma da Assunção de Maria em 1950 (Munificentissimus Deus).",
    difficulty: "difícil",
  },
  {
    id: "d4",
    question: "Qual cardenal foi o redator principal da Constituição Gaudium et Spes do Vaticano II?",
    options: ["Cardenal Ratzinger", "Cardenal Wojtyla", "Cardenal Suenens", "Cardenal Leraro"],
    correctAnswer: 3,
    explanation: "O Cardenal Giacomo Lercaro foi um dos redatores principais da Constituição Gaudium et Spes.",
    difficulty: "difícil",
  },

  // Impossível
  {
    id: "i1",
    question: "Qual é a velocidade da luz em vacum segundo Santo Tomás de Aquino?",
    options: [
      "Imediata (infinita)",
      "A mesma de hoje",
      "Santo Tomás não discutiu isso",
      "Variável conforme Deus permitia",
    ],
    correctAnswer: 2,
    explanation: "Santo Tomás de Aquino não discutiu a velocidade da luz, pois a ciência moderna ainda não havia desenvolvido esse conceito.",
    difficulty: "impossível",
  },
  {
    id: "i2",
    question: "Quantas horas de oração São Bento exigiu diariamente em sua Regra?",
    options: ["Não quantificou", "8 horas", "12 horas", "Conforme a capacidade"],
    correctAnswer: 3,
    explanation: "Na Regra de São Bento, o tempo era determinado 'conforme a capacidade' individual, não sendo fixo em horas.",
    difficulty: "impossível",
  },
  {
    id: "i3",
    question: "Qual é a fórmula matemática para calcular o grau de santidade de uma pessoa?",
    options: [
      "Não existe tal fórmula",
      "Virtudes x Obras / Pecados",
      "Tempo de Oração + Caridade",
      "Estabelecido pelo Vaticano em 1456",
    ],
    correctAnswer: 0,
    explanation: "Não existe fórmula matemática para medir santidade. A canonização é baseada em investigação teológica e milagres verificados.",
    difficulty: "impossível",
  },
];

export default function Desafios() {
  const [quizState, setQuizState] = useState<QuizState>({
    level: null,
    currentQuestion: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    finished: false,
    questions: [],
  });

  const startQuiz = (level: "fácil" | "médio" | "difícil" | "impossível") => {
    const filteredQuestions = questionBank.filter((q) => q.difficulty === level);
    const shuffled = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setQuizState({
      level,
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      finished: false,
      questions: shuffled,
    });
  };

  const handleAnswer = (index: number) => {
    if (quizState.answered) return;

    const isCorrect =
      index === quizState.questions[quizState.currentQuestion].correctAnswer;

    setQuizState({
      ...quizState,
      selectedAnswer: index,
      answered: true,
      score: isCorrect ? quizState.score + 1 : quizState.score,
    });
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion + 1 < quizState.questions.length) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answered: false,
        selectedAnswer: null,
      });
    } else {
      setQuizState({
        ...quizState,
        finished: true,
      });
    }
  };

  const resetQuiz = () => {
    setQuizState({
      level: null,
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      finished: false,
      questions: [],
    });
  };

  if (quizState.level === null) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Teste seu Conhecimento
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Desafios Católicos
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Participe de quizzes desafiadores sobre fé, história da Igreja e doutrina católica. 
                Escolha um nível e teste seu conhecimento!
              </p>
            </div>

            {/* Level Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  level: "fácil",
                  title: "🟢 Fácil",
                  description: "Perguntas básicas sobre a fé católica",
                  color: "from-green-500/10 via-green-500/5 to-transparent border-green-500/30",
                },
                {
                  level: "médio",
                  title: "🟡 Médio",
                  description: "Conhecimento intermediário necessário",
                  color: "from-yellow-500/10 via-yellow-500/5 to-transparent border-yellow-500/30",
                },
                {
                  level: "difícil",
                  title: "🔴 Difícil",
                  description: "Para os mais conhecedores",
                  color: "from-red-500/10 via-red-500/5 to-transparent border-red-500/30",
                },
                {
                  level: "impossível",
                  title: "⚫ Impossível",
                  description: "Apenas para os maiores especialistas",
                  color: "from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30",
                },
              ].map(({ level, title, description, color }) => (
                <button
                  key={level}
                  onClick={() =>
                    startQuiz(level as "fácil" | "médio" | "difícil" | "impossível")
                  }
                  className={`bg-gradient-to-br ${color} border rounded-xl p-8 text-left hover:shadow-lg transition-all hover:scale-105 active:scale-95`}
                >
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground mb-4">{description}</p>
                  <div className="text-primary font-semibold">
                    Começar →
                  </div>
                </button>
              ))}
            </div>

            {/* Info Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">📝 Como Funciona</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  Escolha um nível de dificuldade
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  Responda 5 perguntas aleatórias do banco de questões
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  Cada resposta correta vale 1 ponto
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  Veja a explicação após sua resposta
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">5.</span>
                  Descubra seu placar ao final!
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (quizState.finished) {
    const percentage = (quizState.score / quizState.questions.length) * 100;
    let message = "";
    let icon = null;

    if (percentage === 100) {
      message = "🏆 Perfeito! Você é um especialista!";
      icon = <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />;
    } else if (percentage >= 80) {
      message = "⭐ Excelente desempenho!";
      icon = <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />;
    } else if (percentage >= 60) {
      message = "✓ Bom resultado! Continue aprendendo";
      icon = <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
    } else {
      message = "💪 Desafio aceito! Tente novamente";
      icon = <Zap className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse" />;
    }

    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              {icon}
              <h2 className="text-4xl font-bold mb-4">Resultado Final</h2>
              <p className="text-2xl font-bold text-primary mb-2">
                {quizState.score} de {quizState.questions.length}
              </p>
              <p className="text-3xl font-bold text-accent mb-6">{Math.round(percentage)}%</p>
              <p className="text-xl mb-8">{message}</p>

              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Tentar Novamente
              </button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (quizState.questions.length === 0) {
    return <div>Carregando...</div>;
  }

  const question = quizState.questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-primary">
                Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
              </span>
              <span className="text-sm font-semibold">Pontuação: {quizState.score}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  question.difficulty === "fácil"
                    ? "bg-green-500/20 text-green-400"
                    : question.difficulty === "médio"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : question.difficulty === "difícil"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {question.difficulty.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = quizState.selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = quizState.answered;

                let buttonClass =
                  "w-full text-left p-4 border rounded-lg transition-all font-medium";

                if (!showResult) {
                  buttonClass +=
                    " bg-muted hover:bg-muted/80 border-border hover:border-primary cursor-pointer";
                } else if (isCorrect) {
                  buttonClass +=
                    " bg-green-500/20 border-green-500/50 text-green-400";
                } else if (isSelected && !isCorrect) {
                  buttonClass +=
                    " bg-destructive/20 border-destructive/50 text-destructive";
                } else {
                  buttonClass += " bg-muted border-border opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={quizState.answered}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-current opacity-20 rounded">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="w-5 h-5 ml-auto text-green-500" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 ml-auto text-destructive" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {quizState.answered && (
              <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg">
                <p className="font-semibold mb-2">💡 Explicação:</p>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          {quizState.answered && (
            <button
              onClick={nextQuestion}
              className="w-full px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all"
            >
              {quizState.currentQuestion + 1 === quizState.questions.length
                ? "Ver Resultado"
                : "Próxima Pergunta"}
            </button>
          )}
        </div>
      </section>
    </Layout>
  );
}
