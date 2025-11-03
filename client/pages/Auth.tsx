import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Heart } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<"login" | "signup" | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Jucrisc
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Grupo de Jovens Católicos
          </p>
          <p className="text-gray-400">
            Conectando fé, comunidade e crescimento espiritual
          </p>
        </div>

        {/* Auth Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Login Card */}
          <div
            onMouseEnter={() => setHoveredCard("login")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/login")}
            className="relative cursor-pointer group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl transition-all duration-300 ${
                hoveredCard === "login" ? "blur-xl" : "blur-sm"
              }`}
            ></div>
            <div
              className={`relative bg-slate-800/80 backdrop-blur border border-green-500/30 rounded-2xl p-8 md:p-12 transition-all duration-300 ${
                hoveredCard === "login"
                  ? "border-green-500/80 shadow-lg shadow-green-500/20 scale-105"
                  : "hover:border-green-500/50"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/10 rounded-xl">
                  <LogIn className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4 text-white">
                Já sou Membro
              </h2>
              <p className="text-gray-400 text-center mb-8">
                Acesse sua conta e continue conectado à comunidade Jucrisc
              </p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-green-500/30 active:scale-95">
                Fazer Login
              </button>
            </div>
          </div>

          {/* Signup Card */}
          <div
            onMouseEnter={() => setHoveredCard("signup")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/cadastro")}
            className="relative cursor-pointer group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl transition-all duration-300 ${
                hoveredCard === "signup" ? "blur-xl" : "blur-sm"
              }`}
            ></div>
            <div
              className={`relative bg-slate-800/80 backdrop-blur border border-purple-500/30 rounded-2xl p-8 md:p-12 transition-all duration-300 ${
                hoveredCard === "signup"
                  ? "border-purple-500/80 shadow-lg shadow-purple-500/20 scale-105"
                  : "hover:border-purple-500/50"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-500/10 rounded-xl">
                  <UserPlus className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4 text-white">
                Sou Novo Aqui
              </h2>
              <p className="text-gray-400 text-center mb-8">
                Junte-se à nossa comunidade de jovens católicos e faça parte da
                Jucrisc
              </p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/30 active:scale-95">
                Me Cadastrar
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-2">
                +500
              </div>
              <p className="text-gray-400 text-sm">Membros Ativos</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-2">12</div>
              <p className="text-gray-400 text-sm">Cursos Disponíveis</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400 mb-2">24/7</div>
              <p className="text-gray-400 text-sm">Comunidade Ativa</p>
            </div>
          </div>

          {/* Admin Login Button */}
          <div className="flex justify-center pt-4 border-t border-gray-700">
            <button
              onClick={() => navigate("/admin-login")}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
    </div>
  );
}
