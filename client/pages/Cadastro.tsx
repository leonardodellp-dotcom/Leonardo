import { useState } from "react";
import Layout from "@/components/Layout";
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@shared/supabase";
import { isValidEmail, isValidPhone, isValidFullName } from "@/lib/security";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    group: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "group") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setFormData((prev) => ({
        ...prev,
        [name]: capitalizedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const formatPhone = (phone: string) => {
    return phone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate fields
      if (
        !formData.name ||
        !formData.age ||
        !formData.group ||
        !formData.email ||
        !formData.phone
      ) {
        setError("Por favor, preencha todos os campos!");
        setLoading(false);
        return;
      }

      // Validate full name (first and last name required)
      if (!isValidFullName(formData.name)) {
        setError(
          "Por favor, insira seu nome completo (nome e sobrenome, mínimo 2 nomes)!"
        );
        setLoading(false);
        return;
      }

      // Validate email
      if (!isValidEmail(formData.email)) {
        setError("Por favor, insira um email válido!");
        setLoading(false);
        return;
      }

      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from("user_registrations")
        .select("id")
        .eq("email", formData.email.toLowerCase())
        .limit(1);

      if (existingEmail && existingEmail.length > 0) {
        setError(
          "Este email já está cadastrado! Use um email diferente ou recupere sua conta."
        );
        setLoading(false);
        return;
      }

      // Validate age
      const age = parseInt(formData.age);
      if (age < 13 || age > 100) {
        setError("Idade deve estar entre 13 e 100 anos!");
        setLoading(false);
        return;
      }

      // Validate phone
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        setError("Por favor, insira um telefone válido com DDD!");
        setLoading(false);
        return;
      }

      if (!isValidPhone(formData.phone)) {
        setError(
          "Telefone inválido! Verifique se não há números repetidos ou sequências estranhas."
        );
        setLoading(false);
        return;
      }

      // Insert into Supabase
      const { data, error: dbError } = await supabase
        .from("user_registrations")
        .insert([
          {
            name: formData.name.trim(),
            age: age,
            group: formData.group.trim(),
            email: formData.email.toLowerCase().trim(),
            phone: formData.phone.trim(),
          },
        ])
        .select();

      if (dbError) {
        throw dbError;
      }

      setSuccess("Cadastro realizado com sucesso! Bem-vindo ao Jucrisc! 🎉");
      setFormData({
        name: "",
        age: "",
        group: "",
        email: "",
        phone: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err);

      let errorMessage =
        "Erro ao cadastrar. Por favor, tente novamente mais tarde.";

      // Extrair mensagem de erro corretamente
      if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error?.message) {
        errorMessage = err.error.message;
      } else if (err?.details) {
        errorMessage = err.details;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      // Log detalhado para debug
      console.error("Detalhes do erro:", {
        message: err?.message,
        errorMessage,
        fullError: JSON.stringify(err),
      });

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Cadastro Jucrisc</h1>
              <p className="text-muted-foreground">
                Faça parte de nossa comunidade de jovens
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nome */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                  >
                    Nome Completo <span className="text-xs text-muted-foreground">(Nome + Sobrenome)</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full px-4 py-2.5 bg-black/40 border border-purple-500/30 hover:border-purple-500/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all hover:shadow-glow"
                    disabled={loading}
                  />
                </div>

                {/* Idade */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-semibold mb-2"
                  >
                    Idade
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="18"
                    min="13"
                    max="100"
                    className="w-full px-4 py-2.5 bg-black/40 border border-green-500/30 hover:border-green-500/50 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/20"
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
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

                {/* Telefone */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold mb-2"
                  >
                    Telefone (com DDD)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        phone: formatted,
                      }));
                    }}
                    placeholder="(11) 98765-4321"
                    maxLength="15"
                    className="w-full px-4 py-2.5 bg-black/40 border border-green-600/30 hover:border-green-600/50 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/30 transition-all hover:shadow-lg hover:shadow-green-600/20"
                    disabled={loading}
                  />
                </div>

                {/* Grupo */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="group"
                    className="block text-sm font-semibold mb-2"
                  >
                    De qual grupo você faz parte?
                  </label>
                  <input
                    id="group"
                    type="text"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    placeholder="Ex: Grupo de Jovens"
                    className="w-full px-4 py-2.5 bg-black/40 border border-blue-600/30 hover:border-blue-600/50 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 transition-all hover:shadow-lg hover:shadow-blue-600/20"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-glow text-white font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8 hover:scale-105"
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Seus dados serão armazenados com segurança e apenas usados para
                comunicações do Jucrisc.
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
