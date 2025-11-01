import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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

  const mainNavItems = [
    { label: "Início", path: "/" },
    { label: "Igreja", path: "/igreja" },
    { label: "Mural", path: "/mural" },
    { label: "Agenda", path: "/agenda" },
    { label: "Contato", path: "/contato" },
  ];

  const missaoSubmenu = [
    { label: "Nossas Missões", path: "/missoes" },
    { label: "Caridade & Missão", path: "/caridade-missao" },
  ];

  const recursosSubmenu = [
    { label: "Versículos Diários", path: "/versiculos" },
    { label: "Como Ler a Bíblia", path: "/guia-leitura-biblia" },
    { label: "Biblioteca Católica", path: "/biblioteca-catolica" },
  ];

  const oracaoDevocaoSubmenu = [
    { label: "Orações Sagradas", path: "/oracoes" },
    { label: "Aprender a Rezar", path: "/aprender-rezar" },
    { label: "O Terço", path: "/terco" },
    { label: "Devoções", path: "/devocoes" },
    { label: "Pedidos de Oração", path: "/pedidos-oracao" },
  ];

  const cursosSubmenu = [
    { label: "Cursos Católicos", path: "/cursos" },
    { label: "Desafios", path: "/desafios" },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group mr-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-lg">✝️</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Jucrisc
              </h1>
              <p className="text-xs text-muted-foreground">Grupo de Jovens</p>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="flex items-center gap-2 flex-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 active:scale-95"
              >
                {item.label}
              </Link>
            ))}

            {/* Dropdown: Oração & Devoção */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 flex items-center gap-1 active:scale-95">
                Oração & Devoção <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {oracaoDevocaoSubmenu.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dropdown: Recursos */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 flex items-center gap-1 active:scale-95">
                Recursos <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {recursosSubmenu.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dropdown: Cursos */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 flex items-center gap-1 active:scale-95">
                Formação <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {cursosSubmenu.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Calendário Litúrgico */}
            <Link
              to="/calendario-liturgico"
              className="px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 active:scale-95"
            >
              📅 Calendário
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 ml-4">
            <Link
              to="/cadastro"
              className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent font-semibold rounded-lg transition-all text-sm"
            >
              Cadastro
            </Link>
            <Link
              to="/admin-login"
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-all text-sm"
            >
              Admin
            </Link>

            {/* Theme Toggle */}
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
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
              ✝️
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Jucrisc
              </h1>
              <p className="text-xs text-muted-foreground">Jovens</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
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

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="border-t border-border pt-4 mt-4 space-y-2">
              <Link
                to="/cadastro"
                className="block px-4 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-semibold rounded-lg transition-all text-sm"
                onClick={() => setIsOpen(false)}
              >
                Cadastro
              </Link>
              <Link
                to="/admin-login"
                className="block px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-all text-sm"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </div>

            {/* Mobile Orações Menu */}
            <details className="group">
              <summary className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 cursor-pointer list-none">
                Orações
              </summary>
              <div className="pl-4 mt-2 space-y-2">
                {oracoesSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Recursos Menu */}
            <details className="group">
              <summary className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 cursor-pointer list-none">
                Recursos
              </summary>
              <div className="pl-4 mt-2 space-y-2">
                {recursosSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Cursos Menu */}
            <details className="group">
              <summary className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 cursor-pointer list-none">
                Formação
              </summary>
              <div className="pl-4 mt-2 space-y-2">
                {cursosSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        )}
      </nav>
    </header>
  );
}
