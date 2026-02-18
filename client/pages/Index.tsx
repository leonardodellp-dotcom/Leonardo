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
  Trophy,
  Image,
  Video,
  User,
  MessageSquare,
  Zap,
} from "lucide-react";
import { SERVICES, HIGHLIGHTS } from "@/constants/ui";

export default function Index() {
  const services = SERVICES;
  const highlights = HIGHLIGHTS;

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
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 hover:border-accent/60 transition-all shadow-lg hover:shadow-accent/20 group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Membros Ativos</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 hover:border-primary/60 transition-all shadow-lg hover:shadow-primary/20 group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                50+
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Eventos por Ano</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 hover:border-purple-500/60 transition-all shadow-lg hover:shadow-purple-500/20 group">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                35+
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Anos de História</p>
            </div>
          </div>
        </div>
      </section>

      {/* Santos do Dia Preview */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Link to="/santos-do-dia" className="group block relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-8 md:p-12 hover:border-primary/50 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Heart className="w-32 h-32 text-red-500" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30 mb-4">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Destaque do Dia</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Santos do Dia</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Conheça a história inspiradora, a biografia e a oração do santo que a Igreja celebra hoje. Uma dose diária de inspiração para sua caminhada.
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  Conhecer o Santo de Hoje <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full md:w-auto flex justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border-4 border-white/10 group-hover:border-primary/30 transition-all shadow-2xl">
                  <span className="text-6xl group-hover:scale-110 transition-transform">🙏</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-card/30 via-background to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Nossos Recursos
            </h2>
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
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Destaques
            </h2>
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

      {/* New Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-purple-900/10 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">
                Novas Funcionalidades
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Novas Seções da Comunidade
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore recursos inovadores para fortalecer sua fé e conectar-se
              com a comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Santos do Dia */}
            <Link
              to="/santos-do-dia"
              className="group card-glow hover:scale-105"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-red-500/15 border border-red-500/30 rounded-lg group-hover:bg-red-500/25 transition-all">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-red-400 transition-colors">
                  Santos do Dia
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Conheça a vida e devoção de santos católicos
                </p>
                <div className="flex items-center gap-2 text-red-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Explorar <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Plano de Leitura Bíblica */}
            <Link
              to="/plano-biblia"
              className="group card-glow hover:scale-105"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-blue-500/15 border border-blue-500/30 rounded-lg group-hover:bg-blue-500/25 transition-all">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  Plano de Leitura Bíblica
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Acompanhe uma jornada de 2 meses pelos Evangelhos
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Começar <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Testemunhas */}
            <Link to="/testemunhas" className="group card-glow hover:scale-105">
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-pink-500/15 border border-pink-500/30 rounded-lg group-hover:bg-pink-500/25 transition-all">
                  <MessageCircle className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-pink-400 transition-colors">
                  Testemunhas de Fé
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Leia histórias reais de transformação em Cristo
                </p>
                <div className="flex items-center gap-2 text-pink-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Ler <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Videos */}
            <Link to="/videos" className="group card-glow hover:scale-105">
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-red-600/15 border border-red-600/30 rounded-lg group-hover:bg-red-600/25 transition-all">
                  <Video className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
                  Vídeos e Homilias
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Assista a conteúdo católico formativo e inspirador
                </p>
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium group-hover:gap-3 transition-all">
                  Assistir <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Placar de Desafios */}
            <Link
              to="/placar-desafios"
              className="group card-glow hover:scale-105"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-yellow-500/15 border border-yellow-500/30 rounded-lg group-hover:bg-yellow-500/25 transition-all">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                  Placar de Desafios
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Veja o ranking dos melhores desempenhos
                </p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Ver Ranking <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Meu Perfil */}
            <Link to="/meu-perfil" className="group card-glow hover:scale-105">
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-green-500/15 border border-green-500/30 rounded-lg group-hover:bg-green-500/25 transition-all">
                  <User className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                  Meu Perfil
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Acompanhe seu progresso e conquistas espirituais
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Ver Perfil <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Forum */}
            <Link
              to="/forum"
              className="group card-glow hover:scale-105 md:col-span-2 lg:col-span-1"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-blue-600/15 border border-blue-600/30 rounded-lg group-hover:bg-blue-600/25 transition-all">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-500 transition-colors">
                  Fórum Comunitário
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Discuta fé, compartilhe dúvidas e conselhos
                </p>
                <div className="flex items-center gap-2 text-blue-500 text-sm font-medium group-hover:gap-3 transition-all">
                  Participar <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Galeria de Fotos */}
            <Link
              to="/galeria-fotos"
              className="group card-glow hover:scale-105 md:col-span-2 lg:col-span-1"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex p-3 bg-purple-500/15 border border-purple-500/30 rounded-lg group-hover:bg-purple-500/25 transition-all">
                  <Image className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                  Galeria de Fotos
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Veja momentos especiais da comunidade
                </p>
                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Ver Galeria <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
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
