import { useState } from "react";
import Layout from "@/components/Layout";
import { Trophy, Medal, Flame, Target } from "lucide-react";

interface ScoreEntry {
  rank: number;
  name: string;
  score: number;
  difficulty: "fácil" | "médio" | "difícil" | "impossível";
  completedAt: string;
  avatar: string;
}

const leaderboard: ScoreEntry[] = [
  {
    rank: 1,
    name: "Lucas Silva",
    score: 9500,
    difficulty: "impossível",
    completedAt: "15 de nov",
    avatar: "LS",
  },
  {
    rank: 2,
    name: "Maria Santos",
    score: 9200,
    difficulty: "impossível",
    completedAt: "14 de nov",
    avatar: "MS",
  },
  {
    rank: 3,
    name: "Pedro Oliveira",
    score: 8800,
    difficulty: "difícil",
    completedAt: "13 de nov",
    avatar: "PO",
  },
  {
    rank: 4,
    name: "Beatriz Costa",
    score: 8500,
    difficulty: "difícil",
    completedAt: "12 de nov",
    avatar: "BC",
  },
  {
    rank: 5,
    name: "João Alves",
    score: 8200,
    difficulty: "difícil",
    completedAt: "11 de nov",
    avatar: "JA",
  },
  {
    rank: 6,
    name: "Ana Carolina",
    score: 7900,
    difficulty: "médio",
    completedAt: "10 de nov",
    avatar: "AC",
  },
  {
    rank: 7,
    name: "Gabriel Ferreira",
    score: 7600,
    difficulty: "médio",
    completedAt: "9 de nov",
    avatar: "GF",
  },
  {
    rank: 8,
    name: "Fernanda Lima",
    score: 7300,
    difficulty: "médio",
    completedAt: "8 de nov",
    avatar: "FL",
  },
  {
    rank: 9,
    name: "Rafael Souza",
    score: 7000,
    difficulty: "fácil",
    completedAt: "7 de nov",
    avatar: "RS",
  },
  {
    rank: 10,
    name: "Sophia Martins",
    score: 6700,
    difficulty: "fácil",
    completedAt: "6 de nov",
    avatar: "SM",
  },
];

const getDifficultyColor = (
  difficulty: "fácil" | "médio" | "difícil" | "impossível"
) => {
  switch (difficulty) {
    case "fácil":
      return "bg-green-600/20 text-green-300 border-green-600/30";
    case "médio":
      return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
    case "difícil":
      return "bg-orange-600/20 text-orange-300 border-orange-600/30";
    case "impossível":
      return "bg-red-600/20 text-red-300 border-red-600/30";
  }
};

const getMedalIcon = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

export default function PlacaDesafios() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "Todos" | "fácil" | "médio" | "difícil" | "impossível"
  >("Todos");

  const filteredLeaderboard =
    selectedDifficulty === "Todos"
      ? leaderboard
      : leaderboard.filter((entry) => entry.difficulty === selectedDifficulty);

  const stats = {
    totalParticipants: leaderboard.length,
    averageScore: Math.round(
      leaderboard.reduce((sum, entry) => sum + entry.score, 0) /
        leaderboard.length
    ),
    topScore: leaderboard[0].score,
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Placar de Desafios
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Veja os melhores desempenhos e compita com outros membros da comunidade
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Maior Pontuação</p>
              <p className="text-2xl font-bold text-yellow-400">
                {stats.topScore.toLocaleString()}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Pontuação Média</p>
              <p className="text-2xl font-bold text-blue-400">
                {stats.averageScore.toLocaleString()}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Flame className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Participantes</p>
              <p className="text-2xl font-bold text-red-400">
                {stats.totalParticipants}
              </p>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Medal className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-foreground">
                Filtrar por Dificuldade
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Todos", "fácil", "médio", "difícil", "impossível"].map(
                (difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() =>
                      setSelectedDifficulty(
                        difficulty as
                          | "Todos"
                          | "fácil"
                          | "médio"
                          | "difícil"
                          | "impossível"
                      )
                    }
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedDifficulty === difficulty
                        ? "bg-blue-600 text-white"
                        : "bg-card border border-border text-foreground hover:border-blue-600"
                    }`}
                  >
                    {difficulty === "Todos"
                      ? "Todos"
                      : difficulty.charAt(0).toUpperCase() +
                        difficulty.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 bg-slate-700/50 p-6 font-semibold text-foreground border-b border-border">
              <div className="col-span-1 text-center">Posição</div>
              <div className="col-span-4 flex items-center gap-2">
                <span>Jogador</span>
              </div>
              <div className="col-span-3 text-center">Pontuação</div>
              <div className="col-span-2 text-center">Dificuldade</div>
              <div className="col-span-2 text-center">Data</div>
            </div>

            {/* Entries */}
            <div className="divide-y divide-border">
              {filteredLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="p-4 md:p-6 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="md:hidden mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center font-bold">
                        {getMedalIcon(entry.rank)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {entry.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.completedAt}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-yellow-400">
                      {entry.score.toLocaleString()}
                    </p>
                  </div>

                  <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      <span className="text-lg font-bold">
                        {getMedalIcon(entry.rank)}
                      </span>
                    </div>

                    {/* Player */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {entry.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {entry.name}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-3 text-center">
                      <p className="text-lg font-bold text-yellow-400">
                        {entry.score.toLocaleString()}
                      </p>
                    </div>

                    {/* Difficulty */}
                    <div className="col-span-2 text-center">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded border ${getDifficultyColor(
                          entry.difficulty
                        )}`}
                      >
                        {entry.difficulty.charAt(0).toUpperCase() +
                          entry.difficulty.slice(1)}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-center text-sm text-muted-foreground">
                      {entry.completedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quer se tornar um campeão?
            </h3>
            <p className="text-muted-foreground mb-6">
              Participe dos desafios espirituais e chegue ao topo do placar!
            </p>
            <a
              href="/desafios"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Ir para Desafios
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
