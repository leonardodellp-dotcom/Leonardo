import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [isDark]);

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Versículo", path: "/versiculos" },
    { label: "Mural", path: "/mural" },
    { label: "Orações", path: "/oracoes" },
    { label: "Aprender a Rezar", path: "/aprender-rezar" },
    { label: "Calendário Litúrgico", path: "/calendario-liturgico" },
    { label: "Pedidos de Oração", path: "/pedidos-oracao" },
    { label: "Agenda", path: "/agenda" },
    { label: "Missões", path: "/missoes" },
    { label: "Desafios", path: "/desafios" },
    { label: "Cursos Católicos", path: "/cursos" },
    { label: "Contato", path: "/contato" },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✝️</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Jucrisc
            </h1>
            <p className="text-xs text-muted-foreground">Grupo de Jovens</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors block"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
