import { Link } from "react-router-dom";
import { MapPin, Instagram, Music } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-card to-card/50 border-t border-primary/20 shadow-glow mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Jucrisc</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Grupo de jovens dedicado à fé católica e crescimento espiritual em
              comunidade.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/jucrisc/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/20 border border-primary/30 rounded-lg transition-all hover:shadow-glow text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@jucrisc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-accent/20 border border-accent/30 rounded-lg transition-all hover:shadow-glow-accent text-muted-foreground hover:text-accent"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Início
                </Link>
              </li>
              <li>
                <Link
                  to="/igreja"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Igreja
                </Link>
              </li>
              <li>
                <Link
                  to="/mural"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Mural
                </Link>
              </li>
              <li>
                <Link
                  to="/agenda"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Agenda
                </Link>
              </li>
            </ul>
          </div>

          {/* Orações & Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Orações & Recursos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/oracoes"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Orações Sagradas
                </Link>
              </li>
              <li>
                <Link
                  to="/versiculos"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Versículos Diários
                </Link>
              </li>
              <li>
                <Link
                  to="/aprender-rezar"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Aprender a Rezar
                </Link>
              </li>
              <li>
                <Link
                  to="/calendario-liturgico"
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block"
                >
                  → Calendário Litúrgico
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">Localização</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <span>Sua Igreja, Cidade</span>
              </li>
              <li className="text-muted-foreground mt-6 pt-6 border-t border-border">
                <p className="font-semibold text-foreground mb-2">
                  Redes Sociais
                </p>
                <p className="text-xs">
                  📱{" "}
                  <a
                    href="https://www.instagram.com/jucrisc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Instagram
                  </a>{" "}
                  |
                  <a
                    href="https://www.tiktok.com/@jucrisc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    TikTok
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © Jucrisc - Grupo de Jovens. Criado com ❤️ por{" "}
            <span className="text-primary font-semibold">By Leo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
