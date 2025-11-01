import Layout from "@/components/Layout";
import { Heart, Calendar } from "lucide-react";
import { useState } from "react";

interface RosaryDay {
  id: string;
  day: string;
  mysteries: string[];
  readings: string[];
  color: string;
}

interface RosaryBead {
  name: string;
  description: string;
  prayer: string;
  count: number;
}

export default function Terco() {
  const [expandedDayId, setExpandedDayId] = useState<string | null>(null);

  const rosaryBeads: RosaryBead[] = [
    {
      name: "Crucifixo",
      description: "A bolinha maior no final do cordão, geralmente uma cruz",
      prayer: "Sinal da Cruz + Credo Apostólico",
      count: 1
    },
    {
      name: "Bolinhas Grandes (Contas Maiores)",
      description: "As 5 bolinhas grandes, uma para cada mistério do rosário",
      prayer: "Pai Nosso",
      count: 5
    },
    {
      name: "Bolinhas Pequenas (Contas Menores)",
      description: "Grupos de 10 bolinhas pequenas entre as bolinhas grandes",
      prayer: "Ave-Maria (10 para cada mistério)",
      count: 50
    },
    {
      name: "Bolinha Grande Central",
      description: "Bolinha grande no meio do rosário que divide os dois lados",
      prayer: "Glória ao Pai / Salve Rainha",
      count: 1
    }
  ];

  const dailyRosaries: RosaryDay[] = [
    {
      id: "monday",
      day: "Segunda-feira",
      mysteries: ["Mistérios Gozosos", "Anunciação", "Visitação", "Nascimento de Jesus", "Apresentação de Jesus no Templo", "Encontro de Jesus no Templo"],
      readings: ["Lucas 1:26-38 (Anunciação)", "Lucas 1:39-56 (Visitação)", "Lucas 2:1-20 (Nascimento)", "Lucas 2:22-38 (Apresentação)", "Lucas 2:41-52 (Encontro no Templo)"],
      color: "border-blue-200 dark:border-blue-700"
    },
    {
      id: "tuesday",
      day: "Terça-feira",
      mysteries: ["Mistérios Dolorosos", "Agonia no Horto", "Flagelação do Senhor", "Coroação de Espinhos", "Jesus Carrega a Cruz", "Crucificação"],
      readings: ["Mateus 26:36-46 (Agonia)", "Mateus 27:24-26 (Flagelação)", "Mateus 27:27-31 (Coroação)", "Mateus 27:31-33 (Caminho da Cruz)", "Mateus 27:33-56 (Crucificação)"],
      color: "border-red-200 dark:border-red-700"
    },
    {
      id: "wednesday",
      day: "Quarta-feira",
      mysteries: ["Mistérios Gloriosos", "Ressurreição de Jesus", "Ascensão de Jesus", "Descida do Espírito Santo", "Assunção de Maria", "Coroação de Maria"],
      readings: ["Mateus 28:1-10 (Ressurreição)", "Atos 1:6-11 (Ascensão)", "Atos 2:1-21 (Pentecostes)", "Lucas 1:46-55 e Apocalipse 12:1 (Assunção)", "Apocalipse 12:1 (Coroação)"],
      color: "border-yellow-200 dark:border-yellow-700"
    },
    {
      id: "thursday",
      day: "Quinta-feira",
      mysteries: ["Mistérios Gozosos", "Anunciação", "Visitação", "Nascimento de Jesus", "Apresentação de Jesus no Templo", "Encontro de Jesus no Templo"],
      readings: ["Lucas 1:26-38 (Anunciação)", "Lucas 1:39-56 (Visitação)", "Lucas 2:1-20 (Nascimento)", "Lucas 2:22-38 (Apresentação)", "Lucas 2:41-52 (Encontro no Templo)"],
      color: "border-blue-200 dark:border-blue-700"
    },
    {
      id: "friday",
      day: "Sexta-feira",
      mysteries: ["Mistérios Dolorosos", "Agonia no Horto", "Flagelação do Senhor", "Coroação de Espinhos", "Jesus Carrega a Cruz", "Crucificação"],
      readings: ["Mateus 26:36-46 (Agonia)", "Mateus 27:24-26 (Flagelação)", "Mateus 27:27-31 (Coroação)", "Mateus 27:31-33 (Caminho da Cruz)", "Mateus 27:33-56 (Crucificação)"],
      color: "border-red-200 dark:border-red-700"
    },
    {
      id: "saturday",
      day: "Sábado",
      mysteries: ["Mistérios Gozosos", "Anunciação", "Visitação", "Nascimento de Jesus", "Apresentação de Jesus no Templo", "Encontro de Jesus no Templo"],
      readings: ["Lucas 1:26-38 (Anunciação)", "Lucas 1:39-56 (Visitação)", "Lucas 2:1-20 (Nascimento)", "Lucas 2:22-38 (Apresentação)", "Lucas 2:41-52 (Encontro no Templo)"],
      color: "border-blue-200 dark:border-blue-700"
    },
    {
      id: "sunday",
      day: "Domingo",
      mysteries: ["Mistérios Gloriosos", "Ressurreição de Jesus", "Ascensão de Jesus", "Descida do Espírito Santo", "Assunção de Maria", "Coroação de Maria"],
      readings: ["Mateus 28:1-10 (Ressurreição)", "Atos 1:6-11 (Ascensão)", "Atos 2:1-21 (Pentecostes)", "Lucas 1:46-55 e Apocalipse 12:1 (Assunção)", "Apocalipse 12:1 (Coroação)"],
      color: "border-purple-200 dark:border-purple-700"
    }
  ];

  const toggleDayExpanded = (id: string) => {
    setExpandedDayId(expandedDayId === id ? null : id);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">O Terço - Guia Completo</h1>
            <p className="text-lg text-muted-foreground">
              Aprenda tudo sobre o Terço (Rosário): as bolinhas, os mistérios de cada dia e as leituras recomendadas
            </p>
          </div>

          {/* Rosary Beads Explanation */}
          <div className="bg-card border border-border rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary" />
              O que Cada Bolinha do Terço Significa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rosaryBeads.map((bead, idx) => (
                <div key={idx} className="border border-border rounded-lg p-5 bg-muted/30 dark:bg-muted/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary">
                        <span className="text-lg font-bold">●</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">{bead.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{bead.description}</p>
                      <p className="text-xs font-semibold text-primary">Oração: {bead.prayer}</p>
                      <p className="text-xs text-muted-foreground mt-1">Total: {bead.count} {bead.count === 1 ? 'bolinha' : 'bolinhas'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Pray the Rosary */}
          <div className="bg-card border border-border rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">📿 Como Rezar o Terço</h2>
            <ol className="space-y-3">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">1</span>
                <span className="text-muted-foreground"><strong>Sinal da Cruz:</strong> Faça o sinal da cruz</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">2</span>
                <span className="text-muted-foreground"><strong>Credo Apostólico:</strong> Reze na bolinha maior (crucifixo)</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">3</span>
                <span className="text-muted-foreground"><strong>Pai Nosso:</strong> Reze na primeira bolinha grande</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">4</span>
                <span className="text-muted-foreground"><strong>Três Ave-Marias:</strong> Reze nas próximas três bolinhas pequenas (intenção: fé, esperança e caridade)</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">5</span>
                <span className="text-muted-foreground"><strong>Glória ao Pai:</strong> Reze na bolinha grande seguinte</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">6</span>
                <span className="text-muted-foreground"><strong>Anuncie o Mistério:</strong> Diga qual mistério você vai meditar</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">7</span>
                <span className="text-muted-foreground"><strong>Pai Nosso:</strong> Reze na próxima bolinha grande</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">8</span>
                <span className="text-muted-foreground"><strong>Dez Ave-Marias:</strong> Reze nas dez bolinhas pequenas enquanto medita no mistério</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">9</span>
                <span className="text-muted-foreground"><strong>Glória ao Pai:</strong> Reze ao final de cada mistério</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">10</span>
                <span className="text-muted-foreground"><strong>Repita:</strong> Continue com os próximos mistérios (total de 5)</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">11</span>
                <span className="text-muted-foreground"><strong>Salve Rainha:</strong> Termine com a Salve Rainha</span>
              </li>
            </ol>
          </div>

          {/* Daily Rosary Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary" />
              O Terço de Cada Dia
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {dailyRosaries.map((day) => (
                <div
                  key={day.id}
                  className={`bg-card border ${day.color} rounded-xl overflow-hidden hover:border-primary/50 transition-all`}
                >
                  <button
                    onClick={() => toggleDayExpanded(day.id)}
                    className="w-full p-6 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{day.day}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {day.mysteries[0]} - Clique para ver os mistérios e leituras
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {day.mysteries.slice(1, 3).map((mystery, i) => (
                            <span key={i} className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                              {mystery}
                            </span>
                          ))}
                          {day.mysteries.length > 3 && (
                            <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                              +{day.mysteries.length - 3} mais...
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className={`text-2xl transition-transform ${expandedDayId === day.id ? 'rotate-180' : ''}`}>
                          ▼
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedDayId === day.id && (
                    <div className="border-t border-border px-6 py-6 bg-muted/20 dark:bg-muted/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mysteries */}
                        <div>
                          <h4 className="font-bold text-lg mb-4 text-primary">📿 Mistérios</h4>
                          <div className="space-y-3">
                            {day.mysteries.slice(1).map((mystery, i) => (
                              <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-foreground">{mystery}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Readings */}
                        <div>
                          <h4 className="font-bold text-lg mb-4 text-primary">📖 Leituras Recomendadas</h4>
                          <div className="space-y-3">
                            {day.readings.map((reading, i) => (
                              <div key={i} className="flex gap-3 text-sm">
                                <span className="flex-shrink-0 text-primary font-bold">➤</span>
                                <p className="text-muted-foreground">{reading}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info about Rosary Mysteries */}
          <div className="bg-primary/10 dark:bg-primary/10 border border-primary/30 dark:border-primary/30 rounded-xl p-6 mb-12">
            <h3 className="text-2xl font-bold text-primary mb-4">💡 Os Tipos de Mistérios</h3>
            <div className="space-y-4">
              <div className="bg-blue-200 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-50 mb-2">Mistérios Gozosos 🎉</h4>
                <p className="text-sm text-blue-800 dark:text-slate-100">Meditam sobre a alegria e esperança trazidas pelo nascimento de Jesus. Incluem a Anunciação, Visitação, Nascimento de Jesus, Apresentação no Templo e Encontro de Jesus no Templo.</p>
              </div>
              <div className="bg-blue-200 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-50 mb-2">Mistérios Dolorosos 💔</h4>
                <p className="text-sm text-blue-800 dark:text-slate-100">Refletem sobre o sofrimento de Cristo pela salvação do mundo. Incluem a Agonia no Horto, Flagelação, Coroação de Espinhos, Jesus Carregando a Cruz e a Crucificação.</p>
              </div>
              <div className="bg-blue-200 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-50 mb-2">Mistérios Gloriosos ✨</h4>
                <p className="text-sm text-blue-800 dark:text-slate-100">Celebram a vitória de Cristo sobre a morte e a glória de Maria. Incluem a Ressurreição, Ascensão, Descida do Espírito Santo, Assunção de Maria e Coroação de Maria.</p>
              </div>
              <div className="bg-blue-200 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-50 mb-2">Mistérios Luminosos ⭐ (Opcional)</h4>
                <p className="text-sm text-blue-800 dark:text-slate-100">Adicionados pelo Papa João Paulo II, focam na vida pública de Jesus. Muitos fiéis rezam esses mistérios nas quintas-feiras ou conforme sua devoção pessoal.</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">🙏 Benefícios da Prática do Terço</h3>
            <ul className="space-y-3 text-green-800 dark:text-green-200 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Fortalece a fé e a confiança em Deus</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Promove meditação profunda sobre a vida de Jesus e Maria</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Oferece paz espiritual e tranquilidade</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Intercede pelas necessidades e intenções pessoais</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Conecta você com séculos de tradição católica</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>Desenvolve uma rotina de oração consistente</span>
              </li>
            </ul>
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
