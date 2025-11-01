import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Jucrisc</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Grupo de jovens dedicado à fé católica e crescimento espiritual em comunidade.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Início
                </Link>
              </li>
              <li>
                <Link to="/mural" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Mural
                </Link>
              </li>
              <li>
                <Link to="/agenda" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Agenda
                </Link>
              </li>
              <li>
                <Link to="/missoes" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Missões
                </Link>
              </li>
            </ul>
          </div>

          {/* Orações & Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Orações & Recursos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/oracoes" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Orações Sagradas
                </Link>
              </li>
              <li>
                <Link to="/versiculos" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Versículos Diários
                </Link>
              </li>
              <li>
                <Link to="/aprender-rezar" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Aprender a Rezar
                </Link>
              </li>
              <li>
                <Link to="/calendario-liturgico" className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 block">
                  → Calendário Litúrgico
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-muted-foreground">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="mailto:contato@jucrisc.com" className="hover:text-primary transition-colors">
                  contato@jucrisc.com
                </a>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="tel:+5511999999999" className="hover:text-primary transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                <span>Sua Igreja, Cidade</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Jucrisc - Grupo de Jovens. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
