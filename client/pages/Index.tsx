import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Heart,
  BookOpen,
  Users,
  Flame,
  Target,
  Calendar,
  MessageCircle,
  Compass,
  Award,
  ArrowRight,
  Church,
} from "lucide-react";

export default function Index() {
  const services = [
    {
      icon: BookOpen,
      title: "Versículos Diários",
      description: "Reflita sobre a Palavra de Deus todos os dias",
      path: "/versiculos",
    },
    {
      icon: Heart,
      title: "Orações",
      description: "Eleve suas preces em comunidade",
      path: "/oracoes",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Conecte-se com jovens de fé semelhante",
      path: "/mural",
    },
    {
      icon: Flame,
      title: "Desafios Espirituais",
      description: "Cresça na fé através de desafios práticos",
      path: "/desafios",
    },
    {
      icon: Calendar,
      title: "Calendário Litúrgico",
      description: "Acompanhe as celebrações litúrgicas",
      path: "/calendario-liturgico",
    },
    {
      icon: Compass,
      title: "Aprender a Rezar",
      description: "Aprenda diferentes formas de oração",
      path: "/aprender-rezar",
    },
  ];

  const highlights = [
    {
      icon: MessageCircle,
      title: "Pedidos de Oração",
      description:
        "Compartilhe seus pedidos e interceda pelos irmãos da comunidade",
      path: "/pedidos-oracao",
    },
    {
      icon: Target,
      title: "Missões",
      description: "Participe de projetos missionários e sirva a comunidade",
      path: "/missoes",
    },
    {
      icon: Award,
      title: "Cursos Católicos",
      description: "Aprofunde seu conhecimento da fé através de cursos",
      path: "/cursos",
    },
    {
      icon: Calendar,
      title: "Agenda",
      description: "Confira os próximos encontros e eventos",
      path: "/agenda",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">
                Bem-vindo ao Jucrisc
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Grupo de Jovens </span>
              <span className="text-gradient">Jucrisc</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Somos um grupo dedicado ao crescimento espiritual, comunidade e
              vivência da fé católica. Aqui você encontra recursos, apoio e
              amizade para sua jornada espiritual.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/cadastro"
                className="px-8 py-3 bg-gradient-to-r from-accent to-yellow-500 hover:shadow-glow-accent-lg text-accent-foreground font-semibold rounded-xl transition-all active:scale-95 hover:scale-105"
              >
                Faça seu Cadastro
              </Link>
              <Link
                to="/agenda"
                className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 hover:shadow-glow-lg text-primary-foreground font-semibold rounded-xl transition-all active:scale-95 hover:scale-105"
              >
                Próximos Eventos
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                500+
              </div>
              <p className="text-sm text-muted-foreground">Membros Ativos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                50+
              </div>
              <p className="text-sm text-muted-foreground">Eventos por Ano</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                35+ Anos
              </div>
              <p className="text-sm text-muted-foreground">De Comunidade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-card/30 via-background to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Nossos Recursos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore uma variedade de ferramentas e recursos para aprofundar
              sua fé e conectar-se com a comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.path}
                  to={service.path}
                  className="group card-glow hover:scale-105"
                >
                  <div className="p-6">
                    <div className="mb-4 inline-flex p-3 bg-primary/15 border border-primary/30 rounded-lg group-hover:bg-primary/25 group-hover:border-primary/50 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      Acessar <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-card/20 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Destaques</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Conheça as principais iniciativas e programas do Jucrisc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <Link
                  key={highlight.path}
                  to={highlight.path}
                  className="group card-accent hover:scale-105"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/15 border border-accent/30 rounded-lg group-hover:bg-accent/25 group-hover:border-accent/50 transition-all flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                          {highlight.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {highlight.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 via-purple-900/30 to-accent/20 border-y border-primary/30 shadow-glow">
        <div className="container mx-auto text-center">
          <div className="inline-flex p-4 bg-primary/10 border border-primary/30 rounded-2xl mb-6">
            <Church className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Pronto para sua Jornada Espiritual?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Junte-se à nossa comunidade de jovens comprometidos com a fé e o
            crescimento espiritual. Temos um lugar para você.
          </p>
          <Link
            to="/contato"
            className="inline-flex px-8 py-3 bg-gradient-to-r from-accent to-yellow-500 hover:shadow-glow-accent-lg text-accent-foreground font-semibold rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Fazer Parte
          </Link>
        </div>
      </section>
    </Layout>
  );
}
