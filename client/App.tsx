import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Versiculos from "./pages/Versiculos";
import Mural from "./pages/Mural";
import Oracoes from "./pages/Oracoes";
import AprenderRezar from "./pages/AprenderRezar";
import GuiaLeituraBiblia from "./pages/GuiaLeituraBiblia";
import Terco from "./pages/Terco";
import CalendarioLiturgico from "./pages/CalendarioLiturgico";
import Devocoes from "./pages/Devocoes";
import BibliotecaCatolica from "./pages/BibliotecaCatolica";
import CaridadeeMissao from "./pages/CaridadeeMissao";
import Calendario from "./pages/Calendario";
import PedidosOracao from "./pages/PedidosOracao";
import Agenda from "./pages/Agenda";
import Missoes from "./pages/Missoes";
import Desafios from "./pages/Desafios";
import Cursos from "./pages/Cursos";
import Contato from "./pages/Contato";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Igreja from "./pages/Igreja";
import SantosDoDia from "./pages/SantosDoDia";
import PlanoBiblia from "./pages/PlanoBiblia";
import Testemunhas from "./pages/Testemunhas";
import Videos from "./pages/Videos";
import PlacaDesafios from "./pages/PlacaDesafios";
import MeuPerfil from "./pages/MeuPerfil";
import Forum from "./pages/Forum";
import GaleriaFotos from "./pages/GaleriaFotos";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/esqueceu-senha" element={<ForgotPassword />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/igreja"
            element={
              <ProtectedRoute>
                <Igreja />
              </ProtectedRoute>
            }
          />
          <Route
            path="/versiculos"
            element={
              <ProtectedRoute>
                <Versiculos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mural"
            element={
              <ProtectedRoute>
                <Mural />
              </ProtectedRoute>
            }
          />
          <Route
            path="/oracoes"
            element={
              <ProtectedRoute>
                <Oracoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aprender-rezar"
            element={
              <ProtectedRoute>
                <AprenderRezar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guia-leitura-biblia"
            element={
              <ProtectedRoute>
                <GuiaLeituraBiblia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/terco"
            element={
              <ProtectedRoute>
                <Terco />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendario"
            element={
              <ProtectedRoute>
                <Calendario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendario-liturgico"
            element={
              <ProtectedRoute>
                <CalendarioLiturgico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devocoes"
            element={
              <ProtectedRoute>
                <Devocoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/biblioteca-catolica"
            element={
              <ProtectedRoute>
                <BibliotecaCatolica />
              </ProtectedRoute>
            }
          />
          <Route
            path="/caridade-missao"
            element={
              <ProtectedRoute>
                <CaridadeeMissao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos-oracao"
            element={
              <ProtectedRoute>
                <PedidosOracao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agenda"
            element={
              <ProtectedRoute>
                <Agenda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missoes"
            element={
              <ProtectedRoute>
                <Missoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/desafios"
            element={
              <ProtectedRoute>
                <Desafios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cursos"
            element={
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contato"
            element={
              <ProtectedRoute>
                <Contato />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/santos-do-dia"
            element={
              <ProtectedRoute>
                <SantosDoDia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plano-biblia"
            element={
              <ProtectedRoute>
                <PlanoBiblia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/testemunhas"
            element={
              <ProtectedRoute>
                <Testemunhas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <Videos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/placar-desafios"
            element={
              <ProtectedRoute>
                <PlacaDesafios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meu-perfil"
            element={
              <ProtectedRoute>
                <MeuPerfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/galeria-fotos"
            element={
              <ProtectedRoute>
                <GaleriaFotos />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const root = document.getElementById("root");
if (root && !root.hasChildNodes()) {
  createRoot(root).render(<App />);
}
