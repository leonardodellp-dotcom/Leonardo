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
import Cadastro from "./pages/Cadastro";
import Igreja from "./pages/Igreja";
import SantosDoDia from "./pages/SantosDoDia";
import PlanoBiblia from "./pages/PlanoBiblia";
import Testemunhas from "./pages/Testemunhas";
import Videos from "./pages/Videos";
import PlacaDesafios from "./pages/PlacaDesafios";
import MeuPerfil from "./pages/MeuPerfil";
import Forum from "./pages/Forum";
import GaleriaFotos from "./pages/GaleriaFotos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/igreja" element={<Igreja />} />
          <Route path="/versiculos" element={<Versiculos />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/oracoes" element={<Oracoes />} />
          <Route path="/aprender-rezar" element={<AprenderRezar />} />
          <Route path="/guia-leitura-biblia" element={<GuiaLeituraBiblia />} />
          <Route path="/terco" element={<Terco />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route
            path="/calendario-liturgico"
            element={<CalendarioLiturgico />}
          />
          <Route path="/devocoes" element={<Devocoes />} />
          <Route path="/biblioteca-catolica" element={<BibliotecaCatolica />} />
          <Route path="/caridade-missao" element={<CaridadeeMissao />} />
          <Route path="/pedidos-oracao" element={<PedidosOracao />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/missoes" element={<Missoes />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
