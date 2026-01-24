import { useState, useEffect } from "react";
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
  Zap,
  Heart,
  MessageCircle,
  TrendingUp,
  Lock,
  CheckCircle,
  RotateCcw,
  Image as ImageIcon,
  X,
} from "lucide-react";
import ProfilePhotoUploader from "@/components/ProfilePhotoUploader";
import {
  calculateLevel,
  getXPProgress,
  getNextLevelThreshold,
  getLevelTitle,
  getLevelColor,
  getBadges,
  type UserGameStats,
  type BadgeDefinition,
} from "@/lib/gamification";
import { getCurrentYear } from "@/lib/security";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  group: string;
  bio: string;
  joinedAt: string;
}


const mockGameStats: UserGameStats = {
  totalXP: 6500,
  level: 7,
  nextLevelXP: 7700,
  xpProgress: 65,
  profileLikes: 24,
  badges: [],
  activitiesThisMonth: {
    forumPosts: 5,
    forumReplies: 15,
    challengesCompleted: 23,
    coursesCompleted: 8,
    chatMessages: 45,
  },
};

const dailyVerse = {
  id: "1",
  reference: "João 3:16",
  text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
  book: "Evangelho de João",
  chapter: 3,
  verse: "16",
  reflection:
    "Este versículo encapsula o coração do Evangelho: o amor incondicional de Deus por nós. Reflete como o sacrifício de Jesus é uma prova do amor divino que nos salva da perdição eterna.",
  xpReward: 50,
};

export default function MeuPerfil() {
  const currentYear = getCurrentYear();

  const mockUserProfile: UserProfile = {
    id: "user123",
    name: "João Silva",
    email: "joao@example.com",
    age: 21,
    group: "Grupo Jucrisc",
    bio: "Apaixonado por Jesus e pela comunidade. Buscando crescer espiritualmente cada dia.",
    joinedAt: `Janeiro ${currentYear}`,
  };

  const [isEditing, setIsEditing] = useState(false);

  // Check if user is admin
  const isAdmin = localStorage.getItem("admin_token") === "true";
  const adminProfile = isAdmin
    ? JSON.parse(localStorage.getItem("admin_profile") || "{}")
    : null;
  const adminGameStats = isAdmin
    ? JSON.parse(localStorage.getItem("admin_game_stats") || "{}")
    : null;

  // Use admin data if logged in as admin, otherwise use mock data
  const [profile, setProfile] = useState(
    isAdmin && adminProfile
      ? {
          id: "admin",
          name: adminProfile.name,
          email: adminProfile.email,
          age: adminProfile.age,
          group: adminProfile.group,
          bio: adminProfile.bio,
          joinedAt: adminProfile.joinedAt,
          profilePhoto: adminProfile.profilePhoto,
        }
      : mockUserProfile,
  );

  const [formData, setFormData] = useState(profile);
  const [activeTab, setActiveTab] = useState<
    | "visao-geral"
    | "insignias"
    | "desafios"
    | "cursos"
    | "atividades"
    | "tarefa-dia"
  >("visao-geral");
  const [taskInput, setTaskInput] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [profileRefresh, setProfileRefresh] = useState(0);

  // Initialize game stats with admin data if available
  const initialGameStats =
    isAdmin && adminGameStats ? adminGameStats : mockGameStats;
  const [gameStats, setGameStats] = useState<UserGameStats>({
    ...initialGameStats,
    badges: getBadges(
      isAdmin && adminGameStats ? adminGameStats : mockGameStats,
    ),
  });

  useEffect(() => {
    const updatedLevel = calculateLevel(gameStats.totalXP);
    const nextLevelThreshold = getNextLevelThreshold(gameStats.totalXP);
    const xpProgress = getXPProgress(gameStats.totalXP);

    // If admin, unlock all badges
    const allBadges = isAdmin
      ? getBadges(gameStats).map((badge) => ({
          ...badge,
          unlocked: true,
          unlockedDate: "Admin Access",
        }))
      : getBadges(gameStats);

    setGameStats((prev) => ({
      ...prev,
      level: updatedLevel,
      nextLevelXP: nextLevelThreshold,
      xpProgress: xpProgress,
      badges: allBadges,
    }));
  }, [gameStats.totalXP, isAdmin]);

  const handleSave = () => {
    setProfile(formData);

    // Persist to localStorage if admin
    if (isAdmin) {
      const adminProfile = JSON.parse(
        localStorage.getItem("admin_profile") || "{}",
      );
      const updatedProfile = {
        ...adminProfile,
        name: formData.name,
        bio: formData.bio,
        age: formData.age,
        group: formData.group,
        email: formData.email,
        joinedAt: formData.joinedAt,
      };
      localStorage.setItem("admin_profile", JSON.stringify(updatedProfile));
    }

    setIsEditing(false);
  };

  const courseProgressPercentage = Math.min(
    (gameStats.activitiesThisMonth.coursesCompleted / 12) * 100,
    100,
  );

  const levelColor = getLevelColor(gameStats.level);
  const levelTitle = getLevelTitle(gameStats.level);
  const unlockedBadges = gameStats.badges.filter((b) => b.unlocked);

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

          {/* Admin Badge */}
          {isAdmin && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/50 rounded-lg flex items-center justify-center gap-2">
              <span className="text-2xl">👑</span>
              <span className="font-bold text-yellow-400">
                Perfil Administrador com Acesso Total
              </span>
            </div>
          )}

          {/* Main Profile Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="text-center md:text-left">
                {(profile as any).profilePhoto ? (
                  <img
                    src={(profile as any).profilePhoto}
                    alt={profile.name}
                    className="w-32 h-32 mx-auto md:mx-0 rounded-full object-cover mb-6 border-4 border-yellow-600"
                  />
                ) : (
                  <div
                    className={`w-32 h-32 mx-auto md:mx-0 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-6 ${
                      isAdmin
                        ? "bg-gradient-to-br from-yellow-600 to-orange-600"
                        : "bg-gradient-to-br from-blue-600 to-purple-600"
                    }`}
                  >
                    {isAdmin ? "👑" : profile.name.charAt(0)}
                  </div>
                )}

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
                        onClick={() => setShowPhotoUpload(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Trocar Foto
                      </button>
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
                        placeholder="Escreva algo sobre você"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">
                        Idade
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            age: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">
                        Grupo
                      </label>
                      <input
                        type="text"
                        value={formData.group}
                        onChange={(e) =>
                          setFormData({ ...formData, group: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600"
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

          {/* Level and XP Card */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-5xl font-bold ${levelColor} mb-2`}>
                  {gameStats.level}
                </div>
                <p className="text-sm text-muted-foreground">
                  Nível Atual: {levelTitle}
                </p>
              </div>

              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-semibold text-foreground">
                      Progressão de Nível
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {gameStats.totalXP.toLocaleString()} /{" "}
                    {gameStats.nextLevelXP.toLocaleString()} XP
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-4 mb-2">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${gameStats.xpProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {gameStats.xpProgress}% para o próximo nível
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-xs mb-1">Cursos</p>
              <p className="text-2xl font-bold text-blue-400">
                {gameStats.activitiesThisMonth.coursesCompleted}
              </p>
              <p className="text-xs text-muted-foreground mt-1">de 12</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-xs mb-1">Desafios</p>
              <p className="text-2xl font-bold text-yellow-400">
                {gameStats.activitiesThisMonth.challengesCompleted}
              </p>
              <p className="text-xs text-muted-foreground mt-1">completos</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Zap className="w-5 h-5 text-orange-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-xs mb-1">XP Total</p>
              <p className="text-2xl font-bold text-orange-400">
                {gameStats.totalXP.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">pontos</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Heart className="w-5 h-5 text-red-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-xs mb-1">Curtidas</p>
              <p className="text-2xl font-bold text-red-400">
                {gameStats.profileLikes}
              </p>
              <p className="text-xs text-muted-foreground mt-1">do perfil</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Award className="w-5 h-5 text-purple-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-xs mb-1">Insígnias</p>
              <p className="text-2xl font-bold text-purple-400">
                {unlockedBadges.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                de {gameStats.badges.length}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto border-b border-border">
            {[
              { id: "visao-geral" as const, label: "Visão Geral" },
              { id: "tarefa-dia" as const, label: "📖 Tarefa do Dia" },
              { id: "insignias" as const, label: "Insígnias" },
              { id: "desafios" as const, label: "Desafios" },
              { id: "cursos" as const, label: "Cursos" },
              { id: "atividades" as const, label: "Atividades" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}

          {/* Tarefa do Dia Tab */}
          {activeTab === "tarefa-dia" && (
            <div className="space-y-6">
              {/* Daily Verse Card */}
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Versículo do Dia
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dailyVerse.reference} - {dailyVerse.book}
                    </p>
                  </div>
                  {taskCompleted && (
                    <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                      <Trophy className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">
                        +{dailyVerse.xpReward} XP
                      </span>
                    </div>
                  )}
                </div>

                <blockquote className="border-l-4 border-purple-500 pl-4 py-4 mb-6">
                  <p className="text-lg text-foreground italic mb-4">
                    "{dailyVerse.text}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dailyVerse.reflection}
                  </p>
                </blockquote>
              </div>

              {/* Task Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Sua Tarefa
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reflita sobre o versículo acima e escreva o que você entendeu
                  ou aprendeu com ele. Como você pode aplicar esse ensinamento
                  em sua vida hoje?
                </p>

                <div className="space-y-4">
                  <textarea
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Escreva suas reflexões sobre o versículo..."
                    disabled={taskCompleted}
                    className={`w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-600 resize-none h-32 ${
                      taskCompleted ? "opacity-60" : ""
                    }`}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (taskInput.trim().length > 0) {
                          setTaskCompleted(true);
                          setGameStats((prev) => ({
                            ...prev,
                            totalXP: prev.totalXP + dailyVerse.xpReward,
                          }));
                        }
                      }}
                      disabled={taskCompleted || taskInput.trim().length === 0}
                      className={`flex-1 flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg transition-colors ${
                        taskCompleted
                          ? "bg-green-600 text-white cursor-default opacity-75"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {taskCompleted
                        ? "Tarefa Concluída!"
                        : "Registrar Reflexão"}
                    </button>
                    {taskCompleted && (
                      <button
                        onClick={() => {
                          setTaskInput("");
                          setTaskCompleted(false);
                        }}
                        className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Refazer
                      </button>
                    )}
                  </div>
                </div>

                {taskCompleted && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-400 font-semibold">
                      ✓ Parabéns! Você completou a Tarefa do Dia e ganhou{" "}
                      {dailyVerse.xpReward} XP
                    </p>
                  </div>
                )}
              </div>

              {/* Tips Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  💡 Dicas para uma Reflexão Significativa
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">1.</span>
                    <p className="text-sm text-muted-foreground">
                      Leia o versículo várias vezes para compreender seu
                      significado profundo
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">2.</span>
                    <p className="text-sm text-muted-foreground">
                      Pesquise o contexto histórico e cultural do verso
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">3.</span>
                    <p className="text-sm text-muted-foreground">
                      Pergunte-se: Como isso se aplica à minha vida hoje?
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">4.</span>
                    <p className="text-sm text-muted-foreground">
                      Ore pedindo iluminação do Espírito Santo
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-bold">5.</span>
                    <p className="text-sm text-muted-foreground">
                      Compartilhe suas reflexões com a comunidade
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Visão Geral Tab */}
          {activeTab === "visao-geral" && (
            <div className="space-y-8">
              {/* Course Progress */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Progresso nos Cursos
                </h3>
                <div className="w-full bg-background rounded-full h-4 mb-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${courseProgressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {gameStats.activitiesThisMonth.coursesCompleted} de 12 cursos
                  completados ({Math.round(courseProgressPercentage)}%)
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Atividades Recentes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Mensagens do Fórum
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {gameStats.activitiesThisMonth.forumReplies}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Mensagens no Chat
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {gameStats.activitiesThisMonth.chatMessages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Badges */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Insígnias Destaques
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {unlockedBadges.slice(0, 3).map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-background/50 border border-yellow-600/30 rounded-lg p-3 text-center"
                    >
                      <div className="text-3xl mb-1">{badge.icon}</div>
                      <p className="text-xs font-semibold text-foreground">
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Insígnias Tab */}
          {activeTab === "insignias" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gameStats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`rounded-lg p-4 text-center transition-all ${
                      badge.unlocked
                        ? "bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-600/50"
                        : "bg-background/30 border border-border/30 opacity-60"
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {badge.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {badge.unlocked ? (
                        <span className="text-green-400">
                          ✓ {badge.unlockedDate || "Desbloqueada"}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1">
                          <Lock className="w-3 h-3" /> Bloqueada
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desafios Tab */}
          {activeTab === "desafios" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Estatísticas de Desafios
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total</p>
                    <p className="text-3xl font-bold text-yellow-400">
                      {gameStats.activitiesThisMonth.challengesCompleted}
                    </p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Fácil</p>
                    <p className="text-2xl font-bold text-green-400">8</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Médio</p>
                    <p className="text-2xl font-bold text-yellow-400">10</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Difícil
                    </p>
                    <p className="text-2xl font-bold text-red-400">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <a
                  href="/desafios"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  <Trophy className="w-5 h-5" />
                  Ir para Desafios
                </a>
              </div>
            </div>
          )}

          {/* Cursos Tab */}
          {activeTab === "cursos" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Progresso dos Cursos
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Introdução à Fé", progress: 100 },
                    { title: "Os Sacramentos", progress: 75 },
                    { title: "Oração Contemplativa", progress: 50 },
                    { title: "Virtudes Católicas", progress: 25 },
                    { title: "Evangelização", progress: 0 },
                  ].map((course, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-foreground">
                          {course.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            course.progress === 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <a
                  href="/cursos"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Ir para Cursos
                </a>
              </div>
            </div>
          )}

          {/* Atividades Tab */}
          {activeTab === "atividades" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Resumo de Atividades
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-foreground">
                        Respostas no Fórum
                      </span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {gameStats.activitiesThisMonth.forumReplies}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-foreground">
                        Desafios Completados
                      </span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {gameStats.activitiesThisMonth.challengesCompleted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span className="text-foreground">
                        Lições de Cursos Concluídas
                      </span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {gameStats.activitiesThisMonth.coursesCompleted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-foreground">Mensagens no Chat</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {gameStats.activitiesThisMonth.chatMessages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/desafios"
              className="bg-card border border-border hover:border-yellow-600/50 rounded-lg p-4 text-center transition-all hover:shadow-lg"
            >
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Novos Desafios</p>
              <p className="text-xs text-muted-foreground">
                Continue treinando
              </p>
            </a>
            <a
              href="/cursos"
              className="bg-card border border-border hover:border-blue-600/50 rounded-lg p-4 text-center transition-all hover:shadow-lg"
            >
              <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Cursos</p>
              <p className="text-xs text-muted-foreground">
                Continue aprendendo
              </p>
            </a>
            <a
              href="/forum"
              className="bg-card border border-border hover:border-purple-600/50 rounded-lg p-4 text-center transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Fórum</p>
              <p className="text-xs text-muted-foreground">
                Participe da comunidade
              </p>
            </a>
          </div>
        </div>

        {/* Photo Upload Modal */}
        {showPhotoUpload && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Trocar Foto de Perfil</h2>
                </div>
                <button
                  onClick={() => setShowPhotoUpload(false)}
                  className="p-1 hover:bg-background rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProfilePhotoUploader
                isAdmin={isAdmin}
                userId={profile.id}
                userEmail={profile.email}
                userName={profile.name}
                onSuccess={() => {
                  // Refresh profile data from localStorage
                  if (isAdmin) {
                    const updatedAdminProfile = JSON.parse(
                      localStorage.getItem("admin_profile") || "{}",
                    );
                    setProfile({
                      ...profile,
                      profilePhoto: updatedAdminProfile.profilePhoto,
                    });
                  }
                  setShowPhotoUpload(false);
                  setProfileRefresh((prev) => prev + 1);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
