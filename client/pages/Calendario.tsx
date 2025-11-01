import Layout from "@/components/Layout";
import { Calendar, Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useState } from "react";
import { isUserAuthenticated } from "@/lib/security";

interface Event {
  id: string;
  date: string;
  day: number;
  month: number;
  title: string;
  time: string;
  location: string;
  recurring?: "sunday" | "saturday" | "none";
}

export default function Calendario() {
  const [activeTab, setActiveTab] = useState<"liturgical" | "jucrisc">("liturgical");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState(false);
  const [formData, setFormData] = useState({ title: "", time: "", location: "" });
  const isAdmin = isUserAuthenticated();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Gerar eventos recorrentes para o mês selecionado
  const generateRecurringEvents = (month: number, year: number = 2025): Event[] => {
    const recurringEvents: Event[] = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();

      // Domingo (0) = Santo Antonio + Laboratório
      if (dayOfWeek === 0) {
        recurringEvents.push({
          id: `sunday-main-${day}`,
          date: `${day}/${month}`,
          day,
          month,
          title: "Santo Antonio",
          time: "18:30",
          location: "Paróquia Santo Antonio",
          recurring: "sunday",
        });
        recurringEvents.push({
          id: `sunday-lab-${day}`,
          date: `${day}/${month}`,
          day,
          month,
          title: "Laboratório (Atividade)",
          time: "19:45",
          location: "Paróquia Santo Antonio",
          recurring: "sunday",
        });
      }

      // Sábado (6) = Cantinho Fraterno + Ensaio
      if (dayOfWeek === 6) {
        recurringEvents.push({
          id: `saturday-1-${day}`,
          date: `${day}/${month}`,
          day,
          month,
          title: "Cantinho Fraterno / Missa no Asilo",
          time: "16:00",
          location: "Asilo da Comunidade",
          recurring: "saturday",
        });
        recurringEvents.push({
          id: `saturday-2-${day}`,
          date: `${day}/${month}`,
          day,
          month,
          title: "Ensaio de Instrumentos e Canto",
          time: "17:30",
          location: "Asilo da Comunidade",
          recurring: "saturday",
        });
      }
    }

    return recurringEvents;
  };

  // Eventos Jucrisc (exemplo - em produção viria do banco)
  const [events, setEvents] = useState<Event[]>([]);

  // Gerar eventos do mês selecionado
  const monthEvents = generateRecurringEvents(selectedMonth).sort((a, b) => {
    if (a.day === b.day) {
      return a.time.localeCompare(b.time);
    }
    return a.day - b.day;
  });

  const handleAddEvent = () => {
    if (formData.title && formData.time) {
      const newId = Date.now().toString();
      setEvents([...events, {
        id: newId,
        date: `${selectedMonth}/${new Date().getDate()}`,
        day: new Date().getDate(),
        month: selectedMonth,
        ...formData,
        recurring: "none"
      }]);
      setFormData({ title: "", time: "", location: "" });
      setNewEvent(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // Combinar eventos recorrentes + eventos customizados
  const allMonthEvents = [...monthEvents, ...events.filter(e => e.month === selectedMonth)]
    .sort((a, b) => {
      if (a.day === b.day) {
        return a.time.localeCompare(b.time);
      }
      return a.day - b.day;
    });

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Calendário</h1>
            <p className="text-lg text-muted-foreground">
              Visualize eventos litúrgicos e programações da Jucrisc
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("liturgical")}
              className={`px-6 py-3 font-semibold text-sm transition-all ${
                activeTab === "liturgical"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              📿 Calendário Litúrgico
            </button>
            <button
              onClick={() => setActiveTab("jucrisc")}
              className={`px-6 py-3 font-semibold text-sm transition-all ${
                activeTab === "jucrisc"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              📅 Calendário Jucrisc
            </button>
          </div>

          {/* Tab 1: Calendário Litúrgico */}
          {activeTab === "liturgical" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Calendário Litúrgico 2025</h2>

              {/* Legend */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">Tipos de Celebração</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <div>
                      <p className="font-semibold text-sm">Solenidade</p>
                      <p className="text-xs text-muted-foreground">Celebração de máxima importância</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="font-semibold text-sm">Festa</p>
                      <p className="text-xs text-muted-foreground">Celebração de grande importância</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <div>
                      <p className="font-semibold text-sm">Memória</p>
                      <p className="text-xs text-muted-foreground">Celebração obrigatória</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <div>
                      <p className="font-semibold text-sm">Dia Comum</p>
                      <p className="text-xs text-muted-foreground">Dia ordinário</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Month */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">Selecione o Mês</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {monthNames.map((month, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMonth(idx + 1)}
                      className={`p-3 rounded-lg font-semibold text-sm transition-colors ${
                        selectedMonth === idx + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Liturgical Dates */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{monthNames[selectedMonth - 1]} de 2025</h3>
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    Para visualizar as celebrações litúrgicas do mês selecionado, 
                    <a href="/calendario-liturgico" className="underline font-semibold hover:text-blue-600 dark:hover:text-blue-300 ml-1">
                      clique aqui para acessar o Calendário Litúrgico completo
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Calendário Jucrisc */}
          {activeTab === "jucrisc" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Programações Jucrisc 2025</h2>
                {isAdmin && (
                  <button
                    onClick={() => setNewEvent(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Novo Evento
                  </button>
                )}
              </div>

              {/* Select Month for Jucrisc */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">Selecione o Mês</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {monthNames.map((month, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMonth(idx + 1)}
                      className={`p-3 rounded-lg font-semibold text-sm transition-colors ${
                        selectedMonth === idx + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Event Modal */}
              {newEvent && isAdmin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 mb-8">
                  <div className="bg-card border border-border rounded-2xl max-w-md w-full p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Novo Evento</h3>
                      <button
                        onClick={() => setNewEvent(false)}
                        className="text-2xl text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Título do Evento</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Ex: Reunião Semanal"
                          className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Horário</label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Local</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="Ex: Paróquia Santo Antonio"
                          className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleAddEvent}
                          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Salvar
                        </button>
                        <button
                          onClick={() => setNewEvent(false)}
                          className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar Grid */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-6">{monthNames[selectedMonth - 1]} de 2025</h3>

                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                    <div key={day} className="text-center font-bold text-sm p-2 text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {(() => {
                    const firstDay = new Date(2025, selectedMonth - 1, 1).getDay();
                    const daysInMonth = new Date(2025, selectedMonth, 0).getDate();
                    const days = [];

                    // Empty cells before first day
                    for (let i = 0; i < firstDay; i++) {
                      days.push(
                        <div key={`empty-${i}`} className="aspect-square p-2 bg-muted/30 rounded-lg"></div>
                      );
                    }

                    // Day cells
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dayEvents = monthEvents.filter(e => e.day === day);
                      const dayOfWeek = new Date(2025, selectedMonth - 1, day).getDay();
                      const isSunday = dayOfWeek === 0;
                      const isSaturday = dayOfWeek === 6;

                      days.push(
                        <div
                          key={day}
                          className={`aspect-square p-2 rounded-lg border-2 transition-colors ${
                            isSunday
                              ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-700"
                              : isSaturday
                              ? "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-700"
                              : "bg-muted/30 border-muted hover:border-primary/50"
                          }`}
                        >
                          <p className={`font-bold text-sm mb-1 ${isSunday || isSaturday ? "text-primary" : ""}`}>
                            {day}
                          </p>
                          {dayEvents.length > 0 && (
                            <div className="space-y-0.5">
                              {dayEvents.slice(0, 2).map((event) => (
                                <p key={event.id} className="text-xs text-muted-foreground truncate">
                                  {event.time}
                                </p>
                              ))}
                              {dayEvents.length > 2 && (
                                <p className="text-xs text-primary font-semibold">+{dayEvents.length - 2}</p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return days;
                  })()}
                </div>

                <div className="mt-6 flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700 rounded"></div>
                    <span>Domingo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900 border-2 border-purple-200 dark:border-purple-700 rounded"></div>
                    <span>Sábado</span>
                  </div>
                </div>
              </div>

              {/* Events List */}
              {allMonthEvents.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Programações de {monthNames[selectedMonth - 1]}</h3>
                  {allMonthEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`bg-card border rounded-xl p-6 hover:border-primary/50 transition-all ${
                        event.recurring === "sunday"
                          ? "border-blue-200 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-950/30"
                          : event.recurring === "saturday"
                          ? "border-purple-200 dark:border-purple-700 bg-purple-50/30 dark:bg-purple-950/30"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-bold">{event.title}</h4>
                            {event.recurring && event.recurring !== "none" && (
                              <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                                {event.recurring === "sunday" ? "Todo domingo" : "Todo sábado"}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>📅 Dia {event.day} - 🕐 {event.time}</p>
                            <p>📍 {event.location}</p>
                          </div>
                        </div>
                        {isAdmin && !event.recurring && (
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => setEditingId(event.id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Nenhum evento programado para {monthNames[selectedMonth - 1]}</p>
                </div>
              )}
            </div>
          )}

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
