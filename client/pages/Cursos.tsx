import Layout from "@/components/Layout";
import {
  BookOpen,
  Link as LinkIcon,
  Clock,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  institution: string;
  duration?: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  format: "Online" | "Presencial" | "Híbrido";
  link: string;
  topics?: string[];
  hasReview?: boolean;
  reviewLessons?: ReviewLesson[];
}

interface ReviewLesson {
  id: string;
  title: string;
  questions: ReviewQuestion[];
}

interface ReviewQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function Cursos() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [currentReviewLesson, setCurrentReviewLesson] =
    useState<ReviewLesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showReview, setShowReview] = useState(false);

  const courses: Course[] = [
    {
      id: "1",
      title: "História da Igreja Católica no Brasil",
      description:
        "Aprenda sobre a fascinante história da Igreja Católica no Brasil, desde a chegada dos portugueses até os dias atuais. Entenda como a fé moldou a cultura e a sociedade brasileira.",
      institution: "Adequa Cursos",
      level: "Intermediário",
      format: "Online",
      link: "https://adequacursos.com.br/curso/ciencias-humanas-e-sociais/historia-da-igreja-catolica-no-brasil",
      topics: [
        "Período Colonial",
        "Independência do Brasil",
        "Século XX e XXI",
      ],
    },
    {
      id: "2",
      title: "Introdução à Teologia Católica",
      description:
        "Explore os fundamentos da fé católica através de uma teologia acessível. Aprenda sobre Deus, a Trindade, os sacramentos e a moral cristã.",
      institution: "Universidade Católica Virtual",
      level: "Iniciante",
      format: "Online",
      link: "#",
      topics: ["Dogmática", "Teologia Moral", "Sacramentologia"],
    },
    {
      id: "3",
      title: "Bíblia: Leitura e Interpretação",
      description:
        "Aprenda técnicas para ler e interpretar a Sagrada Escritura. Descubra os contextos históricos, linguísticos e teológicos dos textos bíblicos.",
      institution: "Seminário Diocesano",
      level: "Intermediário",
      format: "Online",
      link: "#",
      topics: ["Antigo Testamento", "Novo Testamento", "Hermenêutica Bíblica"],
    },
    {
      id: "4",
      title: "Vida Sacramental da Igreja",
      description:
        "Aprofunde seu conhecimento sobre os sete sacramentos da Igreja Católica e seu significado espiritual. Entenda como os sacramentos transformam nossas vidas.",
      institution: "Centro de Formação Cristã",
      level: "Iniciante",
      format: "Híbrido",
      link: "#",
      topics: ["Batismo", "Eucaristia", "Penitência", "Unção dos Enfermos"],
    },
    {
      id: "5",
      title: "Espiritualidade e Oração Contemplativa",
      description:
        "Desenvolva uma vida de oração mais profunda. Aprenda sobre diferentes formas de meditação, contemplação e comunhão com Deus.",
      institution: "Instituto de Espiritualidade",
      level: "Intermediário",
      format: "Online",
      link: "#",
      topics: ["Lectio Divina", "Mística Cristã", "Devoção Mariana"],
    },
    {
      id: "6",
      title: "Doutrina Social Católica",
      description:
        "Conheça o ensinamento social da Igreja e como aplicar os princípios católicos nas questões sociais contemporâneas.",
      institution: "Caritas Brasil",
      level: "Avançado",
      format: "Online",
      link: "#",
      topics: ["Justiça Social", "Direitos Humanos", "Ecologia Integral"],
    },
    {
      id: "7",
      title: "Liderança Cristã para Jovens",
      description:
        "Desenvolva habilidades de liderança baseadas em valores cristãos. Aprenda como ser um testemunho de fé na sua comunidade.",
      institution: "Jucrisc",
      level: "Intermediário",
      format: "Presencial",
      link: "#",
      topics: ["Carisma e Missão", "Comunicação", "Gestão de Grupos"],
    },
    {
      id: "8",
      title: "Catolicismo no Mundo Moderno",
      description:
        "Explore como a fé católica responde aos desafios modernos. Discussões sobre tecnologia, pluralismo, secularismo e evangelização.",
      institution: "Universidade Católica",
      level: "Avançado",
      format: "Híbrido",
      link: "#",
      topics: ["Inculturação", "Diálogo Interreligioso", "Novos Movimentos"],
    },
    {
      id: "9",
      title: "Os Dez Mandamentos na Vida Cristã",
      description:
        "Aprofunde-se nos Dez Mandamentos e sua aplicação prática na vida moderna. Entenda como esses preceitos divinos guiam nossa moral e relacionamentos.",
      institution: "Jucrisc",
      level: "Iniciante",
      format: "Online",
      link: "#",
      topics: ["Lei Divina", "Ética Cristã", "Confissão e Arrependimento"],
      hasReview: true,
      reviewLessons: [
        {
          id: "r1",
          title: "Revisão: Os Primeiros Cinco Mandamentos",
          questions: [
            {
              id: "q1",
              question: "Qual é o primeiro mandamento?",
              options: [
                "Amar a Deus sobre todas as coisas",
                "Honrar pai e mãe",
                "Não roubar",
                "Não matar",
              ],
              correctAnswer: 0,
              explanation:
                "O primeiro mandamento nos ensina a colocar Deus em primeiro lugar em nossas vidas.",
            },
            {
              id: "q2",
              question: "O terceiro mandamento refere-se a:",
              options: [
                "Guardar o dia de descanso",
                "Respeitar o nome de Deus",
                "Obedecer aos pais",
                "Não cometer adultério",
              ],
              correctAnswer: 1,
              explanation:
                "O terceiro mandamento nos ordena a guardar o nome de Deus como sagrado.",
            },
          ],
        },
        {
          id: "r2",
          title: "Revisão: Os Últimos Cinco Mandamentos",
          questions: [
            {
              id: "q3",
              question: "O sexto mandamento diz respeito a:",
              options: [
                "Justiça social",
                "Pureza sexual",
                "Honestidade",
                "Caridade",
              ],
              correctAnswer: 1,
              explanation:
                "O sexto mandamento nos ensina a manter a pureza e o respeito no uso do corpo.",
            },
          ],
        },
      ],
    },
    {
      id: "10",
      title: "Virtudes Católicas: Fé, Esperança e Caridade",
      description:
        "Conheça as três virtudes teologais que são o fundamento da vida cristã. Aprenda como cultivá-las no dia a dia para crescimento espiritual.",
      institution: "Jucrisc",
      level: "Intermediário",
      format: "Online",
      link: "#",
      topics: ["Virtudes Teologais", "Prática da Fé", "Vida em Graça"],
      hasReview: true,
      reviewLessons: [
        {
          id: "r3",
          title: "Revisão: As Virtudes Teologais",
          questions: [
            {
              id: "q4",
              question:
                "A caridade é descrita em qual livro como 'o maior dos dons'?",
              options: ["Mateus", "1 Coríntios", "João", "Romanos"],
              correctAnswer: 1,
              explanation:
                "Em 1 Coríntios 13, o apóstolo Paulo exalta a caridade como a maior virtude.",
            },
          ],
        },
      ],
    },
    {
      id: "11",
      title: "Evangelização e Testemunho de Fé",
      description:
        "Aprenda como compartilhar sua fé de forma autêntica. Descubra técnicas práticas para evangelizar no dia a dia sem agressividade ou imposição.",
      institution: "Jucrisc",
      level: "Intermediário",
      format: "Presencial",
      link: "#",
      topics: [
        "Comunicação Eficaz",
        "Testemunho Pessoal",
        "Respeito ao Próximo",
      ],
      hasReview: true,
      reviewLessons: [
        {
          id: "r4",
          title: "Revisão: Métodos de Evangelização",
          questions: [
            {
              id: "q5",
              question: "Qual é o método mais eficaz de evangelização?",
              options: [
                "Pregar na rua",
                "Testemunho pessoal",
                "Distribuir panfletos",
                "Crítica às outras religiões",
              ],
              correctAnswer: 1,
              explanation:
                "O testemunho pessoal é o método mais poderoso, pois mostra a transformação real da fé.",
            },
          ],
        },
      ],
    },
    {
      id: "12",
      title: "Vida Sacramental Aprofundada",
      description:
        "Estude detalhadamente cada um dos sete sacramentos. Compreenda sua origem, significado teológico e importância para a salvação.",
      institution: "Jucrisc",
      level: "Avançado",
      format: "Online",
      link: "#",
      topics: ["Sacramentos", "Graça Sacramental", "Liturgia"],
      hasReview: true,
      reviewLessons: [
        {
          id: "r5",
          title: "Revisão: Os Sete Sacramentos",
          questions: [
            {
              id: "q6",
              question: "Quantos são os sacramentos na Igreja Católica?",
              options: ["5", "6", "7", "8"],
              correctAnswer: 2,
              explanation:
                "A Igreja Católica reconhece sete sacramentos: Batismo, Crisma, Eucaristia, Penitência, Unção dos Enfermos, Ordem e Matrimônio.",
            },
          ],
        },
      ],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediário":
        return "bg-blue-600/20 text-blue-300 border-blue-600/30";
      case "Avançado":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "Online":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Presencial":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Híbrido":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
    const course = courses.find((c) => c.id === courseId);
    if (course?.hasReview && course?.reviewLessons) {
      setCurrentReviewLesson(course.reviewLessons[0]);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowReview(true);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (
      currentReviewLesson &&
      currentQuestionIndex < currentReviewLesson.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCompleteCourse = () => {
    if (selectedCourse && !completedCourses.includes(selectedCourse)) {
      setCompletedCourses([...completedCourses, selectedCourse]);
    }
    setShowReview(false);
    setSelectedCourse(null);
  };

  const calculateScore = () => {
    if (!currentReviewLesson) return 0;
    let correct = 0;
    currentReviewLesson.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / currentReviewLesson.questions.length) * 100);
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Formação Contínua
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Cursos Católicos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aprofunde seu conhecimento da fé católica através de cursos
              estruturados e confiáveis. Escolha o seu nível e comece a aprender
              hoje!
            </p>
          </div>

          {/* Filter Info */}
          <div className="mb-12 p-6 bg-muted/30 border border-border rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
              <div>
                <p className="font-bold text-accent">8+ Cursos</p>
                <p className="text-muted-foreground">Disponíveis</p>
              </div>
              <div>
                <p className="font-bold text-primary">Todos os Níveis</p>
                <p className="text-muted-foreground">Iniciante a Avançado</p>
              </div>
              <div>
                <p className="font-bold text-blue-400">Online</p>
                <p className="text-muted-foreground">+ Presencial</p>
              </div>
              <div>
                <p className="font-bold text-green-400">Gratuito</p>
                <p className="text-muted-foreground">+ Pago</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                Iniciante
              </span>
              <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                Intermediário
              </span>
              <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                Avançado
              </span>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Course Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-accent font-medium mb-3">
                    {course.institution}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Topics */}
                {course.topics && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      Tópicos:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, idx) => {
                        const topicColors = [
                          "bg-purple-500/20 text-purple-300 border border-purple-500/30",
                          "bg-blue-500/20 text-blue-300 border border-blue-500/30",
                          "bg-green-500/20 text-green-300 border border-green-500/30",
                          "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
                        ];
                        return (
                          <span
                            key={topic}
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${topicColors[idx % topicColors.length]}`}
                          >
                            {topic}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getLevelColor(
                      course.level,
                    )}`}
                  >
                    {course.level}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getFormatColor(
                      course.format,
                    )}`}
                  >
                    {course.format}
                  </span>
                  {course.duration && (
                    <span className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-2">
                  {course.link && course.link !== "#" ? (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Acessar Curso
                    </a>
                  ) : (
                    <p className="text-primary font-semibold text-sm">
                      ✓ Conheça este curso
                    </p>
                  )}
                  {course.hasReview && (
                    <button
                      onClick={() => handleCourseClick(course.id)}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm transition-colors ml-2 px-3 py-1 bg-accent/10 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Revisar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Quer Mais Recomendações?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para sugestões personalizadas de cursos
              baseadas no seu nível de conhecimento e interesses.
            </p>
            <a
              href="/contato"
              className="inline-flex px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Peça uma Recomendação
            </a>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReview && currentReviewLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {currentReviewLesson.title}
              </h2>
              <button
                onClick={() => setShowReview(false)}
                className="text-2xl text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold">
                  Pergunta {currentQuestionIndex + 1} de{" "}
                  {currentReviewLesson.questions.length}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(
                    ((currentQuestionIndex + 1) /
                      currentReviewLesson.questions.length) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / currentReviewLesson.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            {currentReviewLesson.questions[currentQuestionIndex] && (
              <div>
                <h3 className="text-lg font-bold mb-6">
                  {currentReviewLesson.questions[currentQuestionIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentReviewLesson.questions[
                    currentQuestionIndex
                  ].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleAnswerSelect(
                          currentReviewLesson.questions[currentQuestionIndex]
                            .id,
                          idx,
                        )
                      }
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        answers[
                          currentReviewLesson.questions[currentQuestionIndex].id
                        ] === idx
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            answers[
                              currentReviewLesson.questions[
                                currentQuestionIndex
                              ].id
                            ] === idx
                              ? "border-primary bg-primary"
                              : "border-muted"
                          }`}
                        >
                          {answers[
                            currentReviewLesson.questions[currentQuestionIndex]
                              .id
                          ] === idx && (
                            <span className="text-primary-foreground text-sm font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Explanation (if answered) */}
                {answers[
                  currentReviewLesson.questions[currentQuestionIndex].id
                ] !== undefined && (
                  <div
                    className={`p-4 rounded-lg mb-8 ${
                      answers[
                        currentReviewLesson.questions[currentQuestionIndex].id
                      ] ===
                      currentReviewLesson.questions[currentQuestionIndex]
                        .correctAnswer
                        ? "bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100"
                        : "bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100"
                    }`}
                  >
                    <p className="font-semibold mb-2">
                      {answers[
                        currentReviewLesson.questions[currentQuestionIndex].id
                      ] ===
                      currentReviewLesson.questions[currentQuestionIndex]
                        .correctAnswer
                        ? "✓ Correto!"
                        : "✗ Incorreto"}
                    </p>
                    <p className="text-sm">
                      {
                        currentReviewLesson.questions[currentQuestionIndex]
                          .explanation
                      }
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Anterior
                  </button>

                  {currentQuestionIndex ===
                  currentReviewLesson.questions.length - 1 ? (
                    <button
                      onClick={handleCompleteCourse}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
                    >
                      Finalizar Revisão
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      disabled={
                        answers[
                          currentReviewLesson.questions[currentQuestionIndex].id
                        ] === undefined
                      }
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                    >
                      Próxima →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
