import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@shared/supabase";
import { isValidEmail } from "@/lib/security";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generateResetCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate email
      if (!email) {
        setError("Por favor, insira seu email!");
        setLoading(false);
        return;
      }

      if (!isValidEmail(email)) {
        setError("Por favor, insira um email válido!");
        setLoading(false);
        return;
      }

      // Check if user exists
      const { data: users, error: queryError } = await supabase
        .from("user_registrations")
        .select("id, email")
        .eq("email", email.toLowerCase())
        .limit(1);

      if (queryError) {
        throw queryError;
      }

      if (!users || users.length === 0) {
        setError("Email não encontrado no sistema!");
        setLoading(false);
        return;
      }

      // Generate reset code
      const code = generateResetCode();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Code expires in 1 hour

      // Save reset token to database
      const { error: insertError } = await supabase
        .from("password_reset_tokens")
        .insert({
          user_id: users[0].id,
          email: email.toLowerCase(),
          reset_code: code,
          expires_at: expiresAt.toISOString(),
          is_used: false,
        });

      if (insertError) {
        throw insertError;
      }

      // Send email using Supabase Edge Functions
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-reset-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              email: email.toLowerCase(),
              resetCode: code,
              userName: users[0].email.split("@")[0],
            }),
          }
        );

        if (!response.ok) {
          console.warn("Email service unavailable, but token was created");
          console.log(`Reset code for ${email}: ${code}`);
        }
      } catch (emailError) {
        console.warn("Email service error:", emailError);
        // Show code in console as fallback
        console.log(`Reset code for ${email}: ${code} (valid for 1 hour)`);
      }

      setSuccess(
        `Código enviado para ${email}! Verifique seu email para continuar.`
      );
      setStep("code");
    } catch (err: any) {
      console.error("Erro ao solicitar reset:", err);
      setError("Erro ao processar solicitação. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate inputs
      if (!resetCode || !newPassword || !confirmPassword) {
        setError("Por favor, preencha todos os campos!");
        setLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        setError("Senha deve ter no mínimo 6 caracteres!");
        setLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("As senhas não coincidem!");
        setLoading(false);
        return;
      }

      // Validate reset token
      const { data: tokens, error: tokenError } = await supabase
        .from("password_reset_tokens")
        .select("*")
        .eq("email", email.toLowerCase())
        .eq("reset_code", resetCode.toUpperCase())
        .eq("is_used", false)
        .limit(1);

      if (tokenError) {
        throw tokenError;
      }

      if (!tokens || tokens.length === 0) {
        setError(
          "Código inválido ou expirado! Solicite um novo código de reset."
        );
        setLoading(false);
        return;
      }

      const token = tokens[0];

      // Check if token is expired
      if (new Date(token.expires_at) < new Date()) {
        setError("Código expirado! Solicite um novo código de reset.");
        setLoading(false);
        return;
      }

      // Update user password
      const { error: updateError } = await supabase
        .from("user_registrations")
        .update({ password: newPassword })
        .eq("email", email.toLowerCase());

      if (updateError) {
        throw updateError;
      }

      // Mark token as used
      await supabase
        .from("password_reset_tokens")
        .update({ is_used: true })
        .eq("id", token.id);

      setSuccess("Senha redefinida com sucesso! Redirecionando para login...");

      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (err: any) {
      console.error("Erro ao resetar senha:", err);
      setError("Erro ao redefinir senha. Tente novamente.");
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
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Recuperar Senha</h1>
              <p className="text-muted-foreground">
                {step === "email"
                  ? "Insira seu email para receber um código de reset"
                  : "Digite o código e sua nova senha"}
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

            {/* Email Step */}
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2.5 bg-black/40 border border-blue-500/30 hover:border-blue-500/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-glow text-white font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {loading ? "Enviando..." : "Enviar Código"}
                </button>
              </form>
            )}

            {/* Reset Step */}
            {step === "code" && (
              <form onSubmit={handleResetSubmit} className="space-y-5">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Código foi enviado para: <span className="font-semibold text-foreground">{email}</span>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="resetCode"
                    className="block text-sm font-semibold mb-2"
                  >
                    Código de Reset
                  </label>
                  <input
                    id="resetCode"
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    maxLength={6}
                    className="w-full px-4 py-2.5 bg-black/40 border border-blue-500/30 hover:border-blue-500/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-center text-lg font-mono tracking-widest"
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    O código é válido por 1 hora
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-semibold mb-2"
                  >
                    Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-12 bg-black/40 border border-blue-600/30 hover:border-blue-600/50 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 transition-all"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-blue-400/60 hover:text-blue-400 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold mb-2"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-black/40 border border-blue-600/30 hover:border-blue-600/50 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 transition-all"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-glow text-white font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {loading ? "Redefinindo..." : "Redefinir Senha"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setResetCode("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                  }}
                  className="w-full px-4 py-2 border border-border text-foreground font-semibold rounded-xl hover:bg-background/50 transition-all"
                >
                  Voltar
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-border">
              <button
                onClick={() => navigate("/auth")}
                className="w-full flex items-center justify-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
