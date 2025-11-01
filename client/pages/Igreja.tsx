import Layout from "@/components/Layout";
import { Church, Clock, MapPin, Phone, Calendar } from "lucide-react";

export default function Igreja() {
  const massSchedule = [
    {
      day: "Terça a Sexta",
      time: "19h",
      type: "Missa Vespertina",
      icon: Clock,
    },
    {
      day: "Sábado",
      time: "18h30",
      type: "Vigília Dominical",
      icon: Clock,
    },
    {
      day: "Domingo",
      times: ["7h", "9h", "18h30"],
      type: "Missas Dominicais",
      icon: Calendar,
    },
  ];

  const features = [
    {
      title: "Confissão",
      description:
        "Disponível antes das missas ou por agendamento. Prepare seu coração!",
      icon: Church,
    },
    {
      title: "Primeira Comunhão",
      description:
        "Catecismo infantil aos domingos pela manhã. Traga a criança!",
      icon: Calendar,
    },
    {
      title: "Batismo",
      description:
        "Agende com a secretaria paroquial para informações e preparação.",
      icon: Church,
    },
    {
      title: "Casamento",
      description:
        "Consulte os pré-requisitos e agende com antecedência de 3 meses.",
      icon: Church,
    },
  ];

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Church className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Nossa Comunidade
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Igreja Santo Antonio
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bem-vindo à nossa paróquia! Aqui você encontra informações sobre
              as missas, sacramentos e a vida comunitária.
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-card border border-border rounded-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Localização</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Endereço</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Sallum - Vila Prado
                        <br />
                        São Carlos - SP
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Contato</p>
                      <p className="text-sm text-muted-foreground">
                        (16) 3372-XXXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.5873087543857!2d-47.889563!3d-22.016023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8769b7b7b7b7b%3A0x7b7b7b7b7b7b7b7b!2sAv.%20Sallum%20-%20Vila%20Prado%2C%20S%C3%A3o%20Carlos%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Mass Schedule */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Horários de Missas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {massSchedule.map((schedule, idx) => {
                const Icon = schedule.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">{schedule.day}</h3>
                    </div>

                    <div className="mb-3">
                      {schedule.time ? (
                        <p className="text-3xl font-bold text-primary">
                          {schedule.time}
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {schedule.times?.map((time) => (
                            <p
                              key={time}
                              className="text-2xl font-bold text-primary"
                            >
                              {time}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {schedule.type}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 border border-border text-center">
            <h3 className="text-2xl font-bold mb-4">
              Tenha Dúvidas ou Necessidades?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para mais informações sobre sacramentos,
              grupos pastorais ou qualquer outra necessidade espiritual.
            </p>
            <a
              href="/contato"
              className="inline-flex px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              Envie uma Mensagem
            </a>
          </div>

          {/* Community Groups */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Grupos e Ministérios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Coro Paroquial",
                "Grupo de Jovens (Jucrisc)",
                "Pastoral da Catequese",
                "Grupo de Oração",
                "Catolicismo Social",
                "Ministério de Liturgia",
              ].map((group, idx) => (
                <div
                  key={idx}
                  className="bg-muted/30 border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all"
                >
                  <p className="font-semibold">{group}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
