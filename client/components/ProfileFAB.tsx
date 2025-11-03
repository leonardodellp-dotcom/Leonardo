import { Link } from "react-router-dom";

export default function ProfileFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        to="/meu-perfil"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white font-bold shadow-glow hover:shadow-glow hover:scale-110 transition-all duration-300 border border-primary/50 hover:border-primary"
        title="Meu Perfil"
      >
        <span className="text-lg">J</span>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 bg-card border border-border rounded-lg px-4 py-2 text-xs font-semibold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Meu Perfil
        </div>

        {/* Pulsing dot indicator */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
      </Link>
    </div>
  );
}
