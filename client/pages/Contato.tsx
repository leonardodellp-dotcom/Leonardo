import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Music,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { supabase } from "@shared/supabase";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.subject ||
        !formData.message
      ) {
        setError("Por favor, preencha todos os campos!");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Por favor, insira um email válido!");
        setLoading(false);
        return;
      }

      const { error: dbError } = await supabase
        .from("contact_suggestions")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          },
        ])
        .select();

      if (dbError) {
        throw dbError;
      }

      setSuccess(
        "Mensagem enviada com sucesso! Responderemos em breve. 🙏"
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err: any) {
      console.error("Erro ao enviar mensagem:", err);
      setError(
        err?.message ||
          "Erro ao enviar mensagem. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Fale Conosco
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Contato</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos aqui para ouvir você! Compartilhe dúvidas, sugestões e
              entre em contato conosco.
            </p>
          </div>

          {/* Social Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/jucrisc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Instagram</h3>
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Siga-nos no Instagram para estar sempre atualizado sobre nossos
                eventos, notícias e conteúdo inspirador.
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                @jucrisc
                <span className="ml-2">→</span>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@jucrisc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-8 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">TikTok</h3>
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Music className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Acompanhe nossos vídeos curtos, conteúdo divertido e mensagens
                inspiradoras no TikTok.
              </p>
              <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
                @jucrisc
                <span className="ml-2">→</span>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-8 h-fit sticky top-20">
                <h3 className="text-xl font-bold mb-6">Informações</h3>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0 h-fit">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Localização</p>
                      <p className="text-sm text-muted-foreground">
                        Sua Igreja Local, Sua Cidade
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="font-semibold mb-4">Redes Sociais</p>
                    <div className="space-y-3">
                      <a
                        href="https://www.instagram.com/jucrisc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                      >
                        <Instagram className="w-4 h-4" />
                        <span className="text-primary">Instagram</span>
                      </a>
                      <a
                        href="https://www.tiktok.com/@jucrisc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                      >
                        <Music className="w-4 h-4" />
                        <span className="text-accent">TikTok</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Envie uma Sugestão</h3>

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

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      disabled={loading}
                    />
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Telefone
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
                        className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Assunto
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Qual é o assunto da sua mensagem?"
                      className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      disabled={loading}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Compartilhe sua sugestão, dúvida ou comentário..."
                      rows={5}
                      className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                      disabled={loading}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {loading ? "Enviando..." : "Enviar Sugestão"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
