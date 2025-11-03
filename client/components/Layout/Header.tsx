import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    // Ensure dark mode is always active
    const root = document.documentElement;
    root.classList.remove("light");
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem("user_session");
    if (session) {
      try {
        setUserSession(JSON.parse(session));
      } catch (e) {
        setUserSession(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    setUserSession(null);
    navigate("/");
  };

  const mainNavItems = [
    { label: "Início", path: "/" },
    { label: "Igreja", path: "/igreja" },
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

  const comunidadeSubmenu = [
    { label: "Testemunhas", path: "/testemunhas" },
    { label: "Fórum", path: "/forum" },
    { label: "Galeria de Fotos", path: "/galeria-fotos" },
  ];

  const conhecimentoSubmenu = [
    { label: "Santos do Dia", path: "/santos-do-dia" },
    { label: "Plano de Leitura Bíblica", path: "/plano-biblia" },
    { label: "Vídeos e Homilias", path: "/videos" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-card/80 border-b border-primary/20 shadow-glow">
      <nav className="container mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-base">✝️</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Jucrisc
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                Grupo de Jovens
              </p>
            </div>
          </Link>

          {/* Main Navigation - Grouped */}
          <div className="flex items-center gap-1 flex-1 px-6">
            {/* Top Level Items */}
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/15 hover:text-primary border border-transparent rounded transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-border mx-1"></div>

            {/* Dropdowns Group 1 */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 flex items-center gap-0.5 active:scale-95 whitespace-nowrap">
                Oração <ChevronDown className="w-3 h-3" />
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

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 flex items-center gap-0.5 active:scale-95 whitespace-nowrap">
                Recursos <ChevronDown className="w-3 h-3" />
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

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 flex items-center gap-0.5 active:scale-95 whitespace-nowrap">
                Formação <ChevronDown className="w-3 h-3" />
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

            {/* Divider */}
            <div className="w-px h-5 bg-border mx-1"></div>

            {/* Dropdowns Group 2 */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 flex items-center gap-0.5 active:scale-95 whitespace-nowrap">
                Comunidade <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {comunidadeSubmenu.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 flex items-center gap-0.5 active:scale-95 whitespace-nowrap">
                Conhecimento <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {conhecimentoSubmenu.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/calendario"
              className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              📅 Cal
            </Link>
          </div>

          {/* CTA Buttons & Controls */}
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            {userSession ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-3 py-1.5 bg-gradient-to-r from-green-600/30 to-green-500/30 hover:shadow-glow border border-green-500/40 text-green-400 font-semibold rounded text-xs transition-all hover:scale-105 whitespace-nowrap flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {userSession.name?.split(" ")[0]}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{userSession.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/meu-perfil">Meu Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 bg-gradient-to-r from-green-600/30 to-green-500/30 hover:shadow-glow border border-green-500/40 text-green-400 font-semibold rounded text-xs transition-all hover:scale-105 whitespace-nowrap"
                >
                  Login
                </Link>
              </>
            )}
            <Link
              to="/admin-login"
              className="px-3 py-1.5 bg-gradient-to-r from-primary/30 to-purple-500/30 hover:shadow-glow border border-primary/40 text-primary font-semibold rounded text-xs transition-all hover:scale-105 whitespace-nowrap"
            >
              Admin
            </Link>
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
              className="p-2 hover:bg-primary/20 border border-primary/30 rounded-lg transition-all hover:shadow-glow"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun
                  className="w-5 h-5 text-accent animate-spin"
                  style={{ animationDuration: "20s" }}
                />
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
              {userSession ? (
                <>
                  <Link
                    to="/meu-perfil"
                    className="block px-4 py-3 bg-gradient-to-r from-green-600/20 to-green-500/20 hover:shadow-glow border border-green-500/30 hover:border-green-500/60 text-green-400 font-semibold rounded-lg transition-all text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    👤 Meu Perfil ({userSession.name?.split(" ")[0]})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-600/20 to-red-500/20 hover:shadow-glow border border-red-500/30 hover:border-red-500/60 text-red-400 font-semibold rounded-lg transition-all text-sm text-left"
                  >
                    🚪 Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 bg-gradient-to-r from-green-600/20 to-green-500/20 hover:shadow-glow border border-green-500/30 hover:border-green-500/60 text-green-400 font-semibold rounded-lg transition-all text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
              <Link
                to="/admin-login"
                className="block px-4 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 hover:shadow-glow border border-primary/30 hover:border-primary/60 text-primary font-semibold rounded-lg transition-all text-sm"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </div>

            {/* Mobile Oração & Devoção Menu */}
            <details className="group">
              <summary className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 cursor-pointer list-none">
                Oração & Devoção
              </summary>
              <div className="pl-4 mt-2 space-y-2">
                {oracaoDevocaoSubmenu.map((item) => (
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

            {/* Mobile Calendário */}
            <Link
              to="/calendario"
              className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              📅 Calendário
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
