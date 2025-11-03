import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  LogOut,
  Plus,
  Calendar,
  FileText,
  Settings,
  Users,
  MessageSquare,
  Check,
  X,
  Image,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [suggestions, setSuggestions] = useState([
    {
      id: "1",
      title: "Como aprofundar minha fé?",
      description: "Gostaria de uma discussão sobre técnicas de oração e meditação para aprofundar a fé.",
      author: "João Silva",
      email: "joao@email.com",
      date: "15 de novembro",
      status: "pending",
    },
    {
      id: "2",
      title: "Desafios na vida universitária",
      description: "Seria bom conversar sobre como manter a fé durante a vida universitária.",
      author: "Maria Santos",
      email: "maria@email.com",
      date: "14 de novembro",
      status: "pending",
    },
    {
      id: "3",
      title: "Relacionamentos saudáveis",
      description: "Discussão sobre como ter relacionamentos que respeitem os valores católicos.",
      author: "Pedro Costa",
      email: "pedro@email.com",
      date: "13 de novembro",
      status: "approved",
    },
  ]);

  const [photoRequests, setPhotoRequests] = useState([
    {
      id: "1",
      userName: "João Silva",
      userEmail: "joao@email.com",
      photoUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2335a7eb' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='50' fill='white' text-anchor='middle' dy='.3em'%3EJ%3C/text%3E%3C/svg%3E",
      date: "15 de novembro",
      status: "pending",
    },
    {
      id: "2",
      userName: "Maria Santos",
      userEmail: "maria@email.com",
      photoUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ec4899' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='50' fill='white' text-anchor='middle' dy='.3em'%3EM%3C/text%3E%3C/svg%3E",
      date: "14 de novembro",
      status: "rejected",
      rejectionReason: "Imagem não apropriada para comunidade",
    },
  ]);

  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_username");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    setUsername(user || "");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    navigate("/");
  };

  const menuItems = [
    {
      id: "overview",
      label: "Visão Geral",
      icon: Settings,
    },
    {
      id: "photos",
      label: "Fotos de Perfil",
      icon: Image,
    },
    {
      id: "events",
      label: "Eventos & Agenda",
      icon: Calendar,
    },
    {
      id: "mural",
      label: "Mural",
      icon: FileText,
    },
    {
      id: "users",
      label: "Usuários",
      icon: Users,
    },
    {
      id: "suggestions",
      label: "Sugestões de Chat",
      icon: MessageSquare,
    },
  ];

  const approvePhoto = (id: string) => {
    setPhotoRequests(
      photoRequests.map((p) =>
        p.id === id ? { ...p, status: "approved" } : p
      )
    );
  };

  const rejectPhoto = (id: string, reason: string) => {
    setPhotoRequests(
      photoRequests.map((p) =>
        p.id === id ? { ...p, status: "rejected", rejectionReason: reason } : p
      )
    );
    setSelectedPhotoId(null);
    setRejectionReason("");
  };

  const approveSuggestion = (id: string) => {
    setSuggestions(
      suggestions.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
  };

  const rejectSuggestion = (id: string) => {
    setSuggestions(suggestions.filter((s) => s.id !== id));
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Painel Admin</h1>
              <p className="text-muted-foreground">
                Bem-vindo,{" "}
                <span className="text-primary font-semibold">{username}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-destructive/10 hover:bg-destructive/20 text-destructive font-semibold rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border pb-4 flex-wrap">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total de Usuários", value: "128", icon: Users },
                { label: "Eventos Agendados", value: "8", icon: Calendar },
                { label: "Posts no Mural", value: "45", icon: FileText },
                { label: "Taxa de Engajamento", value: "92%", icon: Settings },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-muted-foreground text-sm font-medium">
                        {card.label}
                      </p>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold">{card.value}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Profile Photos Tab */}
          {activeTab === "photos" && (
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Solicitudes de Mudança de Foto</h2>

              {photoRequests.length === 0 ? (
                <p className="text-muted-foreground">Nenhuma solicitação de foto.</p>
              ) : (
                <div className="space-y-4">
                  {photoRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-background border border-border rounded-lg p-4"
                    >
                      <div className="flex gap-4">
                        {/* Photo Preview */}
                        <div className="flex-shrink-0">
                          <img
                            src={request.photoUrl}
                            alt={request.userName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {request.userName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {request.userEmail}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                request.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : request.status === "approved"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {request.status === "pending"
                                ? "Pendente"
                                : request.status === "approved"
                                  ? "Aprovado"
                                  : "Rejeitado"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            {request.date}
                          </p>

                          {/* Rejection Reason */}
                          {request.status === "rejected" && request.rejectionReason && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-3">
                              <p className="text-xs text-red-500">
                                <strong>Motivo:</strong> {request.rejectionReason}
                              </p>
                            </div>
                          )}

                          {/* Actions */}
                          {request.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => approvePhoto(request.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all"
                              >
                                <Check className="w-4 h-4" />
                                Aprovar
                              </button>

                              {selectedPhotoId === request.id ? (
                                <div className="flex-1 flex gap-2">
                                  <input
                                    type="text"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Motivo da rejeição..."
                                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-red-600"
                                  />
                                  <button
                                    onClick={() => rejectPhoto(request.id, rejectionReason || "Rejeitado pelo admin")}
                                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all"
                                  >
                                    Confirmar
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setSelectedPhotoId(request.id)}
                                  className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all"
                                >
                                  <X className="w-4 h-4" />
                                  Rejeitar
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gerenciar Eventos</h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30">
                  <Plus className="w-5 h-5" />
                  Novo Evento
                </button>
              </div>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento. Em breve você poderá
                adicionar, editar e deletar eventos da agenda.
              </p>
            </div>
          )}

          {/* Mural Tab */}
          {activeTab === "mural" && (
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gerenciar Mural</h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30">
                  <Plus className="w-5 h-5" />
                  Novo Post
                </button>
              </div>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento. Em breve você poderá
                adicionar, editar e deletar posts do mural.
              </p>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Usuários Registrados</h2>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento. Em breve você poderá
                visualizar, editar e gerenciar todos os usuários registrados.
              </p>
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === "suggestions" && (
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Sugestões de Discussão</h2>

              {suggestions.length === 0 ? (
                <p className="text-muted-foreground">Nenhuma sugestão pendente.</p>
              ) : (
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="border border-border rounded-lg p-6 hover:border-blue-600/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-foreground">
                              {suggestion.title}
                            </h3>
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                suggestion.status === "approved"
                                  ? "bg-green-600/30 text-green-300 border border-green-500/50"
                                  : "bg-yellow-600/30 text-yellow-300 border border-yellow-500/50"
                              }`}
                            >
                              {suggestion.status === "approved"
                                ? "✓ Aprovado"
                                : "⏳ Pendente"}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {suggestion.description}
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>👤 {suggestion.author}</span>
                            <span>📧 {suggestion.email}</span>
                            <span>📅 {suggestion.date}</span>
                          </div>
                        </div>
                      </div>

                      {suggestion.status === "pending" && (
                        <div className="flex gap-3 pt-4 border-t border-border">
                          <button
                            onClick={() => approveSuggestion(suggestion.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 font-semibold rounded-lg transition-all border border-green-500/30"
                          >
                            <Check className="w-4 h-4" />
                            Aprovar
                          </button>
                          <button
                            onClick={() => rejectSuggestion(suggestion.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold rounded-lg transition-all border border-red-500/30"
                          >
                            <X className="w-4 h-4" />
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
