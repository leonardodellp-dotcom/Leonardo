import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { LogIn, AlertCircle, CheckCircle } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Hardcoded credentials for admin
      const isValidAdmin =
        (username === "leoadm" && password === "leolindo") ||
        (username === "Leonardo" && password === "Leoleo13pps!");

      if (isValidAdmin) {
        setSuccess("Login realizado com sucesso!");
        localStorage.setItem("admin_token", "true");
        localStorage.setItem("admin_username", username);
        localStorage.setItem("admin_role", "supremo");

        // Create admin profile with full access
        const adminProfile = {
          isAdmin: true,
          name: "Admin Jucrisc",
          email: username === "Leonardo" ? "leonardo@jucrisc.admin" : "leoadm@jucrisc.admin",
          age: 25,
          group: "Jucrisc",
          bio: "Administrador supremo do Jucrisc com acesso a todas as funcionalidades.",
          joinedAt: "Janeiro 2023",
        };

        // Create admin game stats with everything unlocked
        const adminGameStats = {
          totalXP: 999999,
          level: 10,
          nextLevelXP: 999999,
          xpProgress: 100,
          profileLikes: 9999,
          badges: [],
          activitiesThisMonth: {
            forumPosts: 9999,
            forumReplies: 9999,
            challengesCompleted: 9999,
            coursesCompleted: 18,
            chatMessages: 9999,
          },
        };

        localStorage.setItem("admin_profile", JSON.stringify(adminProfile));
        localStorage.setItem("admin_game_stats", JSON.stringify(adminGameStats));

        setTimeout(() => {
          navigate("/meu-perfil");
        }, 1500);
      } else {
        setError("Usuário ou senha incorretos. Tente novamente!");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Admin Jucrisc</h1>
              <p className="text-muted-foreground">
                Acesse o painel de administração
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-500">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold mb-2"
                >
                  Usuário
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="leoadm"
                  className="w-full px-4 py-2.5 bg-black/40 border border-purple-500/30 hover:border-purple-500/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all hover:shadow-glow"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-black/40 border border-blue-600/30 hover:border-blue-600/50 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 transition-all hover:shadow-lg hover:shadow-blue-600/20"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-glow text-white font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Apenas administradores podem acessar esta área. Para obter
                acesso, entre em contato com o gerenciador do Jucrisc.
              </p>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
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
