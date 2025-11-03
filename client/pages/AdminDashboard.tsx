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
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

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
  ];

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
        </div>
      </div>
    </Layout>
  );
}
