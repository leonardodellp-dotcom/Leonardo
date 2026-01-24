import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, Church, Heart } from "lucide-react";
import { getCurrentYear } from "@/lib/security";

interface LiturgicalDate {
  date: string;
  name: string;
  type: "solemn" | "feast" | "memorial" | "ordinary";
  month: number;
  day: number;
}

export default function CalendarioLiturgico() {
  const currentYear = getCurrentYear();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const liturgicalDates: LiturgicalDate[] = [
    // January
    {
      date: "1º de janeiro",
      name: "Circuncisão do Senhor",
      type: "solemn",
      month: 1,
      day: 1,
    },
    {
      date: "6 de janeiro",
      name: "Epifania do Senhor",
      type: "solemn",
      month: 1,
      day: 6,
    },
    {
      date: "22 de janeiro",
      name: "São Vicente",
      type: "memorial",
      month: 1,
      day: 22,
    },

    // February
    {
      date: "2 de fevereiro",
      name: "Apresentação do Senhor (Candelária)",
      type: "feast",
      month: 2,
      day: 2,
    },
    {
      date: "14 de fevereiro",
      name: "São Valentim",
      type: "memorial",
      month: 2,
      day: 14,
    },

    // March
    {
      date: "19 de março",
      name: "São José",
      type: "solemn",
      month: 3,
      day: 19,
    },
    {
      date: "25 de março",
      name: "Anunciação do Senhor",
      type: "solemn",
      month: 3,
      day: 25,
    },

    // April (Easter varies - 2025: April 20)
    {
      date: "20 de abril",
      name: "Domingo de Ramos",
      type: "solemn",
      month: 4,
      day: 17,
    },
    {
      date: "24 de abril",
      name: "Quinta-feira Santa",
      type: "solemn",
      month: 4,
      day: 17,
    },
    {
      date: "25 de abril",
      name: "Sexta-feira Santa",
      type: "solemn",
      month: 4,
      day: 18,
    },
    {
      date: "20 de abril",
      name: "Páscoa (Domingo de Ressurreição)",
      type: "solemn",
      month: 4,
      day: 20,
    },

    // May
    {
      date: "1º de maio",
      name: "São José Operário",
      type: "feast",
      month: 5,
      day: 1,
    },
    {
      date: "29 de maio",
      name: "Ascensão do Senhor",
      type: "solemn",
      month: 5,
      day: 29,
    },

    // June
    {
      date: "8 de junho",
      name: "Pentecostes (Domingo de Pentecostes)",
      type: "solemn",
      month: 6,
      day: 8,
    },
    {
      date: "19 de junho",
      name: "Corpus Christi",
      type: "feast",
      month: 6,
      day: 19,
    },
    {
      date: "29 de junho",
      name: "São Pedro e São Paulo",
      type: "solemn",
      month: 6,
      day: 29,
    },

    // July
    {
      date: "25 de julho",
      name: "São Tiago Apóstolo",
      type: "feast",
      month: 7,
      day: 25,
    },

    // August
    {
      date: "6 de agosto",
      name: "Transfiguração do Senhor",
      type: "feast",
      month: 8,
      day: 6,
    },
    {
      date: "15 de agosto",
      name: "Assunção de Maria",
      type: "solemn",
      month: 8,
      day: 15,
    },
    {
      date: "29 de agosto",
      name: "Degolação de São João Batista",
      type: "feast",
      month: 8,
      day: 29,
    },

    // September
    {
      date: "8 de setembro",
      name: "Natividade de Maria",
      type: "feast",
      month: 9,
      day: 8,
    },

    // October
    {
      date: "12 de outubro",
      name: "Nossa Senhora Aparecida (Padroeira do Brasil)",
      type: "solemn",
      month: 10,
      day: 12,
    },
    {
      date: "28 de outubro",
      name: "São Judas Tadeu e São Simão",
      type: "feast",
      month: 10,
      day: 28,
    },

    // November
    {
      date: "1º de novembro",
      name: "Todos os Santos",
      type: "solemn",
      month: 11,
      day: 1,
    },
    {
      date: "2 de novembro",
      name: "Finados (Commemoração de Todos os Fiéis Defuntos)",
      type: "ordinary",
      month: 11,
      day: 2,
    },
    {
      date: "30 de novembro",
      name: "Santo André Apóstolo",
      type: "feast",
      month: 11,
      day: 30,
    },

    // December
    {
      date: "8 de dezembro",
      name: "Imaculada Conceição",
      type: "solemn",
      month: 12,
      day: 8,
    },
    {
      date: "25 de dezembro",
      name: "Natal do Senhor",
      type: "solemn",
      month: 12,
      day: 25,
    },
    {
      date: "26 de dezembro",
      name: "Santo Estêvão (1º Mártir)",
      type: "feast",
      month: 12,
      day: 26,
    },
  ];

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const monthDates = liturgicalDates.filter(
    (date) => date.month === selectedMonth,
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "solemn":
        return "bg-red-600/20 text-red-300 border-red-600/40";
      case "feast":
        return "bg-blue-600/20 text-blue-300 border-blue-600/40";
      case "memorial":
        return "bg-green-600/20 text-green-300 border-green-600/40";
      default:
        return "bg-primary/20 text-primary border-primary/40";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "solemn":
        return "Solenidade";
      case "feast":
        return "Festa";
      case "memorial":
        return "Memória";
      default:
        return "Dia Comum";
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Calendário Litúrgico</h1>
            <p className="text-lg text-muted-foreground mb-2">
              Celebrações, festas e tempos especiais da Igreja Católica
            </p>
            <p className="text-sm text-muted-foreground">
              Acompanhe as datas importantes do ano litúrgico
            </p>
          </div>

          {/* Legend */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Church className="w-5 h-5" />
              Tipos de Celebração
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <div>
                  <p className="font-semibold text-sm">Solenidade</p>
                  <p className="text-xs text-muted-foreground">
                    Celebração de máxima importância
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div>
                  <p className="font-semibold text-sm">Festa</p>
                  <p className="text-xs text-muted-foreground">
                    Celebração de grande importância
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <div>
                  <p className="font-semibold text-sm">Memória</p>
                  <p className="text-xs text-muted-foreground">
                    Celebração obrigatória
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div>
                  <p className="font-semibold text-sm">Dia Comum</p>
                  <p className="text-xs text-muted-foreground">
                    Dia ordinário do calendário
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Month Selector */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4">Selecione o Mês</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {monthNames.map((month, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMonth(index + 1)}
                  className={`p-3 rounded-lg font-semibold text-sm transition-colors ${
                    selectedMonth === index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Dates */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">
              {monthNames[selectedMonth - 1]} de 2025
            </h2>

            {monthDates.length > 0 ? (
              <div className="grid gap-4">
                {monthDates.map((date, index) => (
                  <div
                    key={index}
                    className={`border-l-4 rounded-lg p-5 bg-card border border-border transition-all hover:shadow-md ${
                      date.type === "solemn"
                        ? "border-l-red-500"
                        : date.type === "feast"
                          ? "border-l-blue-500"
                          : date.type === "memorial"
                            ? "border-l-green-500"
                            : "border-l-gray-400"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          {date.date}
                        </p>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {date.name}
                        </h3>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap ${getTypeColor(
                          date.type,
                        )}`}
                      >
                        {getTypeLabel(date.type)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhuma celebração especial neste mês
                </p>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-12">
            <h3 className="font-semibold mb-3 text-primary">
              📖 Sobre o Calendário Litúrgico
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O calendário litúrgico é o conjunto de celebrações, festas e
              tempos especiais que a Igreja Católica celebra ao longo do ano.
              Cada data marca momentos importantes da vida de Cristo, de Maria e
              dos santos. As solenidades são as celebrações mais importantes,
              seguidas pelas festas e memórias. Acompanhe este calendário para
              participar das principais celebrações em nossa paróquia.
            </p>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-12">
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
