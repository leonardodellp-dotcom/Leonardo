import { useState } from "react";
import Layout from "@/components/Layout";
import {
  User,
  Mail,
  Cake,
  Users,
  BookOpen,
  Trophy,
  Award,
  Edit,
  LogOut,
  Calendar,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  group: string;
  bio: string;
  coursesCompleted: number;
  challengesCompleted: number;
  totalScore: number;
  joinedAt: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

const mockUserProfile: UserProfile = {
  id: "user123",
  name: "João Silva",
  email: "joao@example.com",
  age: 21,
  group: "Grupo Jucrisc",
  bio: "Apaixonado por Jesus e pela comunidade. Buscando crescer espiritualmente cada dia.",
  coursesCompleted: 8,
  challengesCompleted: 23,
  totalScore: 6500,
  joinedAt: "Janeiro 2023",
};

const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Iniciante Espiritual",
    description: "Completou primeiro desafio",
    icon: "🌱",
    earnedDate: "15 de jan, 2023",
  },
  {
    id: "2",
    name: "Estudioso da Fé",
    description: "Completou 5 cursos",
    icon: "📚",
    earnedDate: "20 de fev, 2023",
  },
  {
    id: "3",
    name: "Campeão dos Desafios",
    description: "Completou 20 desafios",
    icon: "🏆",
    earnedDate: "10 de mar, 2023",
  },
  {
    id: "4",
    name: "Aprendiz do Evangelho",
    description: "Leu o Plano de Leitura Bíblica completo",
    icon: "✝️",
    earnedDate: "25 de abr, 2023",
  },
  {
    id: "5",
    name: "Guerreiro da Oração",
    description: "Rezou 100 orações na comunidade",
    icon: "🙏",
    earnedDate: "12 de mai, 2023",
  },
  {
    id: "6",
    name: "Missionário do Amor",
    description: "Participou de 5 atividades de caridade",
    icon: "❤️",
    earnedDate: "30 de jun, 2023",
  },
];

export default function MeuPerfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const progressPercentage = Math.min((profile.coursesCompleted / 12) * 100, 100);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
              <User className="w-8 h-8 text-blue-500" />
              Meu Perfil
            </h1>
          </div>

          {/* Main Profile Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="text-center md:text-left">
                <div className="w-32 h-32 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-6">
                  {profile.name.charAt(0)}
                </div>

                {!isEditing && (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      {profile.name}
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Cake className="w-4 h-4" />
                      {profile.age} anos
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {profile.group}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Membro desde {profile.joinedAt}
                    </p>
                  </div>
                )}
              </div>

              {/* Bio and Actions */}
              <div className="flex-1">
                {!isEditing && (
                  <>
                    <div className="bg-background/50 p-4 rounded-lg mb-6">
                      <p className="text-foreground italic">"{profile.bio}"</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Editar Perfil
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  </>
                )}

                {isEditing && (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">
                        Bio
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600 resize-none h-20"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(profile);
                          setIsEditing(false);
                        }}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Cursos</p>
              <p className="text-3xl font-bold text-blue-400">
                {profile.coursesCompleted}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                de 12 completos
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Desafios</p>
              <p className="text-3xl font-bold text-yellow-400">
                {profile.challengesCompleted}
              </p>
              <p className="text-xs text-muted-foreground mt-2">completados</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Pontuação</p>
              <p className="text-3xl font-bold text-purple-400">
                {profile.totalScore.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">total</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <User className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Nível</p>
              <p className="text-3xl font-bold text-green-400">
                {Math.floor(profile.totalScore / 1000) + 1}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Aprendiz</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Progresso nos Cursos
            </h3>
            <div className="w-full bg-background rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {profile.coursesCompleted} de 12 cursos completados (
              {Math.round(progressPercentage)}%)
            </p>
          </div>

          {/* Badges */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Insignias Conquistadas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-background/50 border border-border rounded-lg p-4 text-center hover:border-yellow-600/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {badge.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {badge.earnedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/desafios"
              className="bg-card border border-border hover:border-blue-600/50 rounded-lg p-4 text-center transition-all hover:shadow-lg"
            >
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Novos Desafios</p>
              <p className="text-xs text-muted-foreground">Continue treinando</p>
            </a>
            <a
              href="/cursos"
              className="bg-card border border-border hover:border-blue-600/50 rounded-lg p-4 text-center transition-all hover:shadow-lg"
            >
              <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Cursos</p>
              <p className="text-xs text-muted-foreground">Continue aprendendo</p>
            </a>
            <a
              href="/placar-desafios"
              className="bg-card border border-border hover:border-blue-600/50 rounded-lg p-4 text-center transition-all hover:shadow-lg"
            >
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Placar</p>
              <p className="text-xs text-muted-foreground">Veja o ranking</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
