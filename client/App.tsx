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
import CalendarioLiturgico from "./pages/CalendarioLiturgico";
import PedidosOracao from "./pages/PedidosOracao";
import Agenda from "./pages/Agenda";
import Missoes from "./pages/Missoes";
import Desafios from "./pages/Desafios";
import Cursos from "./pages/Cursos";
import Contato from "./pages/Contato";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/versiculos" element={<Versiculos />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/oracoes" element={<Oracoes />} />
          <Route path="/aprender-rezar" element={<AprenderRezar />} />
          <Route
            path="/calendario-liturgico"
            element={<CalendarioLiturgico />}
          />
          <Route path="/pedidos-oracao" element={<PedidosOracao />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/missoes" element={<Missoes />} />
          <Route path="/desafios" element={<Desafios />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/contato" element={<Contato />} />
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
