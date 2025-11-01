import Layout from "@/components/Layout";
import { Heart, Users, Hand, Target, MapPin, Clock } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "food" | "education" | "health" | "shelter" | "elderly" | "youth";
  status: "active" | "planning" | "completed";
  volunteers: number;
  impact: string;
  icon: React.ReactNode;
}

interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  frequency: string;
  time: string;
  location: string;
  requirements: string[];
}

export default function CaridadeeMissao() {
  const projects: Project[] = [
    {
      id: "1",
      title: "Distribuição de Alimentos",
      description:
        "Todo mês, coletamos alimentos para distribuir às famílias carentes da comunidade.",
      category: "food",
      status: "active",
      volunteers: 45,
      impact: "250 famílias alimentadas mensalmente",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      id: "2",
      title: "Catequese para Crianças Carentes",
      description:
        "Educação religiosa e valores cristãos para crianças de baixa renda.",
      category: "education",
      status: "active",
      volunteers: 32,
      impact: "150 crianças atendidas",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "3",
      title: "Clínica de Saúde Comunitária",
      description:
        "Atendimento médico e odontológico gratuito para a população sem acesso a saúde.",
      category: "health",
      status: "active",
      volunteers: 28,
      impact: "500 atendimentos/mês",
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: "4",
      title: "Casa de Acolhida para Idosos",
      description:
        "Abrigo, cuidados e companhia para idosos em situação de abandono.",
      category: "elderly",
      status: "active",
      volunteers: 55,
      impact: "35 idosos acolhidos",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      id: "5",
      title: "Programa de Mentoria Juvenil",
      description:
        "Orientação espiritual e profissional para jovens em risco social.",
      category: "youth",
      status: "active",
      volunteers: 20,
      impact: "80 jovens em formação",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "6",
      title: "Projeto de Moradia Emergencial",
      description:
        "Construção e reforma de casas para famílias em situação de rua.",
      category: "shelter",
      status: "planning",
      volunteers: 15,
      impact: "30 famílias abrigadas este ano",
      icon: <Hand className="w-6 h-6" />,
    },
  ];

  const opportunities: VolunteerOpportunity[] = [
    {
      id: "1",
      title: "Voluntário na Distribuição de Alimentos",
      description:
        "Ajude a separar, embalar e distribuir alimentos para famílias carentes.",
      frequency: "Segundo sábado de cada mês",
      time: "8h - 12h",
      location: "Paróquia Santo Antonio - Av. Sallum, 100",
      requirements: [
        "Disponibilidade de 4 horas",
        "Disposição para trabalho físico",
      ],
    },
    {
      id: "2",
      title: "Professor de Catequese",
      description:
        "Ensine valores cristãos e catecismo para crianças de 6-10 anos.",
      frequency: "Terças e quintas-feiras",
      time: "14h - 15h30",
      location: "Sala de Catequese da Paróquia",
      requirements: [
        "Formação religiosa básica",
        "Paciência com crianças",
        "Compromisso mínimo: 3 meses",
      ],
    },
    {
      id: "3",
      title: "Visitante de Idosos",
      description:
        "Visite idosos acolhidos, preste companhia, converse e ouça suas histórias.",
      frequency: "Fins de semana",
      time: "14h - 17h",
      location: "Casa de Acolhida - Rua da Misericórdia, 250",
      requirements: ["Empatia e paciência", "Disponibilidade de 3 horas"],
    },
    {
      id: "4",
      title: "Profissional de Saúde (Médico/Enfermeiro)",
      description:
        "Atenda pacientes na clínica de saúde comunitária uma vez por mês.",
      frequency: "Primeiro domingo do mês",
      time: "9h - 13h",
      location: "Clínica Comunitária",
      requirements: [
        "Registro profissional ativo",
        "Experiência em atendimento básico",
      ],
    },
    {
      id: "5",
      title: "Mentor para Jovens",
      description:
        "Oriente jovens em questões de fé, carreira e desenvolvimento pessoal.",
      frequency: "Semanal (flexível)",
      time: "A combinar",
      location: "Paróquia ou online",
      requirements: [
        "Experiência de vida",
        "Formação religiosa sólida",
        "Disponibilidade semanal",
      ],
    },
    {
      id: "6",
      title: "Carpinteiro/Pedreiro",
      description:
        "Ajude na construção e reforma de casas para famílias sem moradia.",
      frequency: "Fins de semana (conforme projeto)",
      time: "8h - 16h",
      location: "Local do projeto (comunidades)",
      requirements: [
        "Experiência em construção",
        "Ferramentas próprias (opcional)",
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Caridade e Missão</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Viva o amor de Cristo através do serviço. Conheça nossos projetos
              sociais e ajude a transformar vidas
            </p>
          </div>

          {/* Projects Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">🤝 Nossos Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-xl p-6 border transition-all hover:border-primary/50 ${
                    project.status === "active"
                      ? "bg-card border-border"
                      : project.status === "planning"
                        ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
                        : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-3 rounded-lg ${
                        project.status === "active"
                          ? "bg-primary/10"
                          : project.status === "planning"
                            ? "bg-blue-600/20 dark:bg-blue-600/20"
                            : "bg-green-600/20 dark:bg-green-600/20"
                      } text-primary`}
                    >
                      {project.icon}
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        project.status === "active"
                          ? "bg-green-600/20 text-green-300 dark:bg-green-600/20 dark:text-green-300"
                          : project.status === "planning"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {project.status === "active"
                        ? "Ativo"
                        : project.status === "planning"
                          ? "Planejamento"
                          : "Concluído"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        <strong>{project.volunteers}</strong> voluntários
                        envolvidos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {project.impact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">
              ✨ Oportunidades de Voluntariado
            </h2>
            <div className="space-y-6">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold">{opp.title}</h3>
                    <Hand className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {opp.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Frequência
                        </p>
                        <p className="font-semibold text-sm">{opp.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Horário</p>
                        <p className="font-semibold text-sm">{opp.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {opp.location}
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      REQUISITOS:
                    </p>
                    <ul className="space-y-1">
                      {opp.requirements.map((req, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                    Interesse em Participar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold mb-3">Como Ajudar</h3>
            <p className="text-muted-foreground mb-6">
              Existem muitas formas de servir a Deus através do próximo. Escolha
              uma oportunidade acima e entre em contato conosco.
            </p>
            <a
              href="/contato"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Fale Conosco
            </a>
          </div>

          {/* Stats */}
          <div className="bg-card border border-border rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">
              📊 Nosso Impacto
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">195</p>
                <p className="text-sm text-muted-foreground">
                  Voluntários ativos
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">
                  Projetos em ação
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">1200+</p>
                <p className="text-sm text-muted-foreground">
                  Vidas impactadas
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Anos de missão</p>
              </div>
            </div>
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
