import Layout from "@/components/Layout";
import { Calendar, Plus, Edit2, Trash2, Save, X, Church } from "lucide-react";
import { useState } from "react";
import { isUserAuthenticated, getCurrentYear } from "@/lib/security";
import { MONTH_NAMES, DAYS_OF_WEEK } from "@/constants/date";

interface LiturgicalDate {
  date: string;
  name: string;
  type: "solemn" | "feast" | "memorial" | "ordinary";
  month: number;
  day: number;
}

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
  const currentYear = getCurrentYear();
  const [activeTab, setActiveTab] = useState<"liturgical" | "jucrisc">(
    "liturgical",
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    location: "",
  });
  const isAdmin = isUserAuthenticated();

  // Dados do Calendário Litúrgico
  const liturgicalDates = LITURGICAL_DATES;

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

  // Gerar eventos recorrentes para o mês selecionado
  const generateRecurringEvents = (
    month: number,
    year: number = currentYear,
  ): Event[] => {
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
      const today = new Date();
      setEvents([
        ...events,
        {
          id: newId,
          date: `${today.getDate()}/${selectedMonth}`,
          day: today.getDate(),
          month: selectedMonth,
          ...formData,
          recurring: "none",
        },
      ]);
      setFormData({ title: "", time: "", location: "" });
      setNewEvent(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  // Combinar eventos recorrentes + eventos customizados
  const allMonthEvents = [
    ...monthEvents,
    ...events.filter((e) => e.month === selectedMonth),
  ].sort((a, b) => {
    if (a.day === b.day) {
      return a.time.localeCompare(b.time);
    }
    return a.day - b.day;
  });

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] bg-background px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3 text-foreground">
              Calendário
            </h1>
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
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">
                  Calendário Litúrgico {currentYear}
                </h2>
              </div>

              {/* Hidden line placeholder
              <h2 className="text-2xl font-bold mb-6">Calendário Litúrgico 2025</h2>

              {/* Legend */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4 text-foreground">
                  Tipos de Celebração
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Solenidade
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Celebração de máxima importância
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Festa
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Celebração de grande importância
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Memória
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Celebração obrigatória
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Dia Comum
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dia ordinário
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Month */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4 text-foreground">
                  Selecione o Mês
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {MONTH_NAMES.map((month, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMonth(idx + 1)}
                      className={`p-3 rounded-lg font-semibold text-sm transition-colors ${
                        selectedMonth === idx + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-slate-800 text-foreground hover:bg-slate-700 border border-border"
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Liturgical Dates */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">
                  {MONTH_NAMES[selectedMonth - 1]} de {currentYear}
                </h3>
                <div className="space-y-4">
                  {liturgicalDates.filter(
                    (date) => date.month === selectedMonth,
                  ).length > 0 ? (
                    liturgicalDates
                      .filter((date) => date.month === selectedMonth)
                      .map((date) => (
                        <div
                          key={date.date}
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
                              className={`px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap ${getTypeColor(date.type)}`}
                            >
                              {getTypeLabel(date.type)}
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Nenhuma celebração especial neste mês
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Calendário Jucrisc */}
          {activeTab === "jucrisc" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-2">
                  Programações do Calendário Jucrisc
                </h2>
                <p className="text-lg text-muted-foreground">
                  Confira todas as atividades do nosso grupo
                </p>
              </div>

              {isAdmin && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => setNewEvent(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-colors shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Novo Evento
                  </button>
                </div>
              )}

              {/* Select Month Selector */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 mb-8 shadow-lg">
                <h3 className="font-semibold mb-4 text-white">
                  Selecione o Mês
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {MONTH_NAMES.map((month, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMonth(idx + 1)}
                      className={`p-3 rounded-lg font-semibold text-sm transition-all ${
                        selectedMonth === idx + 1
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                          : "bg-slate-700/60 text-slate-200 hover:bg-slate-600 border border-slate-600 hover:border-slate-500"
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Event Modal */}
              {newEvent && isAdmin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
                        <label className="block text-sm font-semibold mb-2">
                          Título do Evento
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          placeholder="Ex: Reunião Semanal"
                          className="w-full px-4 py-2 bg-black/40 border border-purple-500/30 hover:border-purple-500/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all hover:shadow-glow"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Horário
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-black/40 border border-blue-500/30 hover:border-blue-500/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Local
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="Ex: Paróquia Santo Antonio"
                          className="w-full px-4 py-2 bg-black/40 border border-green-500/30 hover:border-green-500/50 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/20"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleAddEvent}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-glow font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105"
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

              {/* Edit Event Modal */}
              {editingId && isAdmin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-card border border-border rounded-2xl max-w-md w-full p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Editar Evento</h3>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-2xl text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>

                    {(() => {
                      const eventToEdit = allMonthEvents.find(
                        (e) => e.id === editingId,
                      );
                      if (!eventToEdit) return null;

                      return (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {eventToEdit.recurring &&
                            eventToEdit.recurring !== "none"
                              ? "Este é um evento recorrente. Você pode criar exceções para datas específicas."
                              : "Edite os detalhes deste evento."}
                          </p>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Título
                            </label>
                            <input
                              type="text"
                              defaultValue={eventToEdit.title}
                              placeholder="Título do evento"
                              className="w-full px-4 py-2 bg-black/40 border border-purple-500/30 hover:border-purple-500/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all hover:shadow-glow"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Horário
                            </label>
                            <input
                              type="time"
                              defaultValue={eventToEdit.time}
                              className="w-full px-4 py-2 bg-black/40 border border-blue-500/30 hover:border-blue-500/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Local
                            </label>
                            <input
                              type="text"
                              defaultValue={eventToEdit.location}
                              placeholder="Local do evento"
                              className="w-full px-4 py-2 bg-black/40 border border-green-500/30 hover:border-green-500/50 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/20"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-glow font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105"
                            >
                              <Save className="w-4 h-4" />
                              Salvar
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Cancelar
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Calendar Grid */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-8 mb-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-8 text-white">
                  {monthNames[selectedMonth - 1]} de {currentYear}
                </h3>

                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {DAYS_OF_WEEK.map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-bold text-sm p-3 text-slate-300 bg-slate-700/40 rounded-lg"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {(() => {
                    const firstDay = new Date(
                      currentYear,
                      selectedMonth - 1,
                      1,
                    ).getDay();
                    const daysInMonth = new Date(
                      currentYear,
                      selectedMonth,
                      0,
                    ).getDate();
                    const days = [];

                    // Empty cells before first day
                    for (let i = 0; i < firstDay; i++) {
                      days.push(
                        <div
                          key={`empty-${i}`}
                          className="aspect-square p-2 bg-muted/30 rounded-lg"
                        ></div>,
                      );
                    }

                    // Day cells
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dayEvents = monthEvents.filter(
                        (e) => e.day === day,
                      );
                      const dayOfWeek = new Date(
                        currentYear,
                        selectedMonth - 1,
                        day,
                      ).getDay();
                      const isSunday = dayOfWeek === 0;
                      const isSaturday = dayOfWeek === 6;

                      days.push(
                        <div
                          key={day}
                          className={`aspect-square p-2 rounded-lg border-2 transition-all hover:shadow-md ${
                            isSunday
                              ? "bg-blue-900/40 border-blue-500/60 hover:border-blue-400"
                              : isSaturday
                                ? "bg-purple-900/40 border-purple-500/60 hover:border-purple-400"
                                : "bg-slate-700/40 border-slate-600 hover:border-slate-500"
                          }`}
                        >
                          <p
                            className={`font-bold text-sm mb-1 ${
                              isSunday || isSaturday
                                ? "text-blue-300"
                                : "text-slate-200"
                            }`}
                          >
                            {day}
                          </p>
                          {dayEvents.length > 0 && (
                            <div className="space-y-0.5">
                              {dayEvents.slice(0, 2).map((event) => (
                                <p
                                  key={event.id}
                                  className="text-xs text-slate-300 truncate font-medium"
                                >
                                  {event.time}
                                </p>
                              ))}
                              {dayEvents.length > 2 && (
                                <p className="text-xs text-purple-300 font-semibold">
                                  +{dayEvents.length - 2}
                                </p>
                              )}
                            </div>
                          )}
                        </div>,
                      );
                    }

                    return days;
                  })()}
                </div>

                <div className="mt-8 flex gap-6 text-sm pt-6 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500/40 border-2 border-blue-500 rounded"></div>
                    <span className="text-slate-300">Domingo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500/40 border-2 border-purple-500 rounded"></div>
                    <span className="text-slate-300">Sábado</span>
                  </div>
                </div>
              </div>

              {/* Events List */}
              {allMonthEvents.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Atividades de {MONTH_NAMES[selectedMonth - 1]}
                  </h3>
                  {allMonthEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-xl p-6 border-l-4 transition-all hover:shadow-xl ${
                        event.recurring === "sunday"
                          ? "bg-blue-900/30 border-l-blue-500 border border-blue-600/40 hover:border-blue-500/60"
                          : event.recurring === "saturday"
                            ? "bg-purple-900/30 border-l-purple-500 border border-purple-600/40 hover:border-purple-500/60"
                            : "bg-slate-800/50 border border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`text-2xl ${
                                event.title.includes("Missa") ||
                                event.title.includes("Santo")
                                  ? "🙏"
                                  : event.title.includes("Ensaio") ||
                                      event.title.includes("Canto")
                                    ? "🎵"
                                    : event.title.includes("Laboratório")
                                      ? "🔬"
                                      : "📅"
                              }`}
                            ></div>
                            <div>
                              <h4 className="text-lg font-bold leading-tight">
                                {event.title}
                              </h4>
                              {event.recurring &&
                                event.recurring !== "none" && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {event.recurring === "sunday"
                                      ? "🔄 Todos os domingos"
                                      : "🔄 Todos os sábados"}
                                  </p>
                                )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">📅</span>
                              <div>
                                <p className="text-muted-foreground text-xs">
                                  Data
                                </p>
                                <p className="font-semibold">Dia {event.day}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">🕐</span>
                              <div>
                                <p className="text-muted-foreground text-xs">
                                  Horário
                                </p>
                                <p className="font-semibold">{event.time}</p>
                              </div>
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <span className="text-xl">📍</span>
                              <div>
                                <p className="text-muted-foreground text-xs">
                                  Local
                                </p>
                                <p className="font-semibold">
                                  {event.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {isAdmin && (
                          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                            {event.recurring && event.recurring !== "none" ? (
                              <button
                                onClick={() => setEditingId(event.id)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
                                title="Alterar este evento específico"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                            ) : (
                              <>
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
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
                  <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
                  <p className="text-slate-400">
                    Nenhum evento adicional programado para{" "}
                    {MONTH_NAMES[selectedMonth - 1]}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Os eventos recorrentes (domingos e sábados) aparecem no
                    calendário acima
                  </p>
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
