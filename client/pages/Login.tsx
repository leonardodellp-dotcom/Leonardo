import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { LogIn, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@shared/supabase";
import { isValidEmail } from "@/lib/security";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate fields
      if (!formData.email || !formData.password) {
        setError("Por favor, preencha email e senha!");
        setLoading(false);
        return;
      }

      // Validate email format
      if (!isValidEmail(formData.email)) {
        setError("Por favor, insira um email válido!");
        setLoading(false);
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        setError("Senha deve ter no mínimo 6 caracteres!");
        setLoading(false);
        return;
      }

      // Query database for user
      const { data: users, error: queryError } = await supabase
        .from("user_registrations")
        .select("*")
        .eq("email", formData.email.toLowerCase())
        .limit(1);

      if (queryError) {
        throw queryError;
      }

      if (!users || users.length === 0) {
        setError(
          "Email não encontrado. Verifique ou faça um novo cadastro!"
        );
        setLoading(false);
        return;
      }

      const user = users[0];

      // Simple password check (in production, should use bcrypt)
      // For now, we'll check if password matches stored password
      if (user.password !== formData.password) {
        setError("Senha incorreta. Tente novamente!");
        setLoading(false);
        return;
      }

      setSuccess("Login realizado com sucesso!");
      
      // Save session to localStorage
      localStorage.setItem(
        "user_session",
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          group: user.group,
          phone: user.phone,
        })
      );

      setTimeout(() => {
        navigate("/meu-perfil");
      }, 1500);
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao fazer login. Tente novamente mais tarde.");
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
              <h1 className="text-3xl font-bold mb-2">Login Jucrisc</h1>
              <p className="text-muted-foreground">
                Acesse sua conta da comunidade
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2.5 bg-black/40 border border-blue-500/30 hover:border-blue-500/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/20"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                Não tem cadastro ainda? 
                <a
                  href="/cadastro"
                  className="text-primary hover:underline ml-1"
                >
                  Faça seu cadastro
                </a>
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
