// XP thresholds for each level (cumulative)
export const LEVEL_THRESHOLDS = [
  0, // Level 1: 0 XP
  500, // Level 2: 500 XP
  1200, // Level 3: 1200 XP
  2100, // Level 4: 2100 XP
  3200, // Level 5: 3200 XP
  4500, // Level 6: 4500 XP
  6000, // Level 7: 6000 XP
  7700, // Level 8: 7700 XP
  9600, // Level 9: 9600 XP
  12000, // Level 10: 12000 XP
];

// XP rewards for different activities
export const XP_REWARDS = {
  CHALLENGE_COMPLETED_EASY: 50,
  CHALLENGE_COMPLETED_MEDIUM: 100,
  CHALLENGE_COMPLETED_HARD: 200,
  CHALLENGE_COMPLETED_IMPOSSIBLE: 500,
  COURSE_COMPLETED: 300,
  FORUM_POST: 25,
  FORUM_REPLY: 15,
  FORUM_REPLY_ACCEPTED: 50,
  FORUM_LIKE_RECEIVED: 5,
  PROFILE_LIKE_RECEIVED: 10,
  CHAT_MESSAGE: 5,
  CHAT_MESSAGE_LIKED: 20,
  TESTIMONY_SHARED: 100,
  PRAYER_REQUEST_ANSWERED: 30,
  SUGGESTION_APPROVED: 100,
};

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  unlocked: boolean;
  unlockedDate?: string;
  category: 'activity' | 'milestone' | 'social' | 'challenge' | 'learning';
}

export interface UserGameStats {
  totalXP: number;
  level: number;
  nextLevelXP: number;
  xpProgress: number; // percentage to next level
  profileLikes: number;
  badges: BadgeDefinition[];
  activitiesThisMonth: {
    forumPosts: number;
    forumReplies: number;
    challengesCompleted: number;
    coursesCompleted: number;
    chatMessages: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'fácil' | 'médio' | 'difícil' | 'impossível';
  xpReward: number;
  completed: boolean;
  completedDate?: string;
}

export interface CourseProgress {
  id: string;
  courseId: string;
  title: string;
  progress: number; // 0-100
  lessonsCompleted: number;
  totalLessons: number;
  completed: boolean;
  completedDate?: string;
}

// Calculate current level from total XP
export function calculateLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

// Calculate XP needed for next level
export function getNextLevelThreshold(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 5000; // Max level
  }
  return LEVEL_THRESHOLDS[currentLevel];
}

// Calculate progress percentage to next level
export function getXPProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = LEVEL_THRESHOLDS[currentLevel - 1];
  const nextLevelXP = getNextLevelThreshold(totalXP);
  
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return 100; // Max level reached
  }
  
  const progressInLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  
  return Math.round((progressInLevel / xpNeededForLevel) * 100);
}

// Get all available badges and their unlock status
export function getBadges(userStats: Partial<UserGameStats>): BadgeDefinition[] {
  const badges: BadgeDefinition[] = [
    // Activity badges
    {
      id: 'iniciante-espiritual',
      name: 'Iniciante Espiritual',
      description: 'Completou primeiro desafio',
      icon: '🌱',
      category: 'milestone',
      criteria: 'challenges_completed >= 1',
      unlocked: (userStats.activitiesThisMonth?.challengesCompleted || 0) >= 1,
      unlockedDate: userStats.badges?.find(b => b.id === 'iniciante-espiritual')?.unlockedDate,
    },
    {
      id: 'estudioso-da-fe',
      name: 'Estudioso da Fé',
      description: 'Completou 5 cursos',
      icon: '📚',
      category: 'learning',
      criteria: 'courses_completed >= 5',
      unlocked: (userStats.activitiesThisMonth?.coursesCompleted || 0) >= 5,
      unlockedDate: userStats.badges?.find(b => b.id === 'estudioso-da-fe')?.unlockedDate,
    },
    {
      id: 'campeao-desafios',
      name: 'Campeão dos Desafios',
      description: 'Completou 20 desafios',
      icon: '🏆',
      category: 'challenge',
      criteria: 'challenges_completed >= 20',
      unlocked: (userStats.activitiesThisMonth?.challengesCompleted || 0) >= 20,
      unlockedDate: userStats.badges?.find(b => b.id === 'campeao-desafios')?.unlockedDate,
    },
    {
      id: 'aprendiz-evangelho',
      name: 'Aprendiz do Evangelho',
      description: 'Leu o Plano de Leitura Bíblica completo',
      icon: '✝️',
      category: 'learning',
      criteria: 'bible_plan_completed',
      unlocked: (userStats.activitiesThisMonth?.coursesCompleted || 0) >= 1,
      unlockedDate: userStats.badges?.find(b => b.id === 'aprendiz-evangelho')?.unlockedDate,
    },
    {
      id: 'guerreiro-oracao',
      name: 'Guerreiro da Oração',
      description: 'Rezou 100 orações na comunidade',
      icon: '🙏',
      category: 'activity',
      criteria: 'prayers >= 100',
      unlocked: false,
      unlockedDate: undefined,
    },
    {
      id: 'missionario-amor',
      name: 'Missionário do Amor',
      description: 'Participou de 5 atividades de caridade',
      icon: '❤️',
      category: 'social',
      criteria: 'charity_activities >= 5',
      unlocked: false,
      unlockedDate: undefined,
    },
    // Social badges
    {
      id: 'respondeu-chat',
      name: 'Voz na Comunidade',
      description: 'Respondeu as pessoas no chat',
      icon: '💬',
      category: 'social',
      criteria: 'forum_replies >= 10',
      unlocked: (userStats.activitiesThisMonth?.forumReplies || 0) >= 10,
      unlockedDate: userStats.badges?.find(b => b.id === 'respondeu-chat')?.unlockedDate,
    },
    {
      id: 'ganhou-coracoes',
      name: 'Coração Querido',
      description: 'Ganhou 50 corações/likes',
      icon: '💕',
      category: 'social',
      criteria: 'likes_received >= 50',
      unlocked: (userStats.profileLikes || 0) >= 50,
      unlockedDate: userStats.badges?.find(b => b.id === 'ganhou-coracoes')?.unlockedDate,
    },
    {
      id: 'ideia-aprovada',
      name: 'Idealizador',
      description: 'Sua sugestão de chat foi aprovada',
      icon: '💡',
      category: 'social',
      criteria: 'suggestion_approved',
      unlocked: false,
      unlockedDate: undefined,
    },
    {
      id: 'conectador',
      name: 'Conectador',
      description: 'Participou de 10 discussões do fórum',
      icon: '🔗',
      category: 'social',
      criteria: 'forum_posts >= 10',
      unlocked: (userStats.activitiesThisMonth?.forumPosts || 0) >= 10,
      unlockedDate: userStats.badges?.find(b => b.id === 'conectador')?.unlockedDate,
    },
    {
      id: 'mensageiro-palavra',
      name: 'Mensageiro da Palavra',
      description: '50 mensagens no chat com respostas úteis',
      icon: '📢',
      category: 'social',
      criteria: 'useful_messages >= 50',
      unlocked: (userStats.activitiesThisMonth?.chatMessages || 0) >= 50,
      unlockedDate: userStats.badges?.find(b => b.id === 'mensageiro-palavra')?.unlockedDate,
    },
    // Learning badges
    {
      id: 'devorador-conhecimento',
      name: 'Devorador de Conhecimento',
      description: 'Completou 10 cursos',
      icon: '📖',
      category: 'learning',
      criteria: 'courses_completed >= 10',
      unlocked: (userStats.activitiesThisMonth?.coursesCompleted || 0) >= 10,
      unlockedDate: userStats.badges?.find(b => b.id === 'devorador-conhecimento')?.unlockedDate,
    },
    // Milestone badges
    {
      id: 'nivel-5',
      name: 'Ascendente',
      description: 'Alcançou Nível 5',
      icon: '⭐',
      category: 'milestone',
      criteria: 'level >= 5',
      unlocked: (userStats.level || 1) >= 5,
      unlockedDate: userStats.badges?.find(b => b.id === 'nivel-5')?.unlockedDate,
    },
    {
      id: 'nivel-10',
      name: 'Iluminado',
      description: 'Alcançou Nível 10 - O Máximo!',
      icon: '🌟',
      category: 'milestone',
      criteria: 'level >= 10',
      unlocked: (userStats.level || 1) >= 10,
      unlockedDate: userStats.badges?.find(b => b.id === 'nivel-10')?.unlockedDate,
    },
    {
      id: '1000-xp',
      name: 'Acumulador de Poder',
      description: 'Acumulou 1000 XP',
      icon: '⚡',
      category: 'milestone',
      criteria: 'total_xp >= 1000',
      unlocked: (userStats.totalXP || 0) >= 1000,
      unlockedDate: userStats.badges?.find(b => b.id === '1000-xp')?.unlockedDate,
    },
  ];

  return badges;
}

// Get level name/title based on level number
export function getLevelTitle(level: number): string {
  const titles = [
    'Aprendiz',
    'Iniciante',
    'Crente',
    'Discípulo',
    'Servo',
    'Campeão',
    'Campeão Sênior',
    'Mestre',
    'Sábio',
    'Iluminado',
  ];
  return titles[Math.min(level - 1, titles.length - 1)] || 'Iluminado';
}

// Get level color based on level
export function getLevelColor(level: number): string {
  const colors = [
    'text-gray-400',      // Level 1
    'text-blue-400',      // Level 2
    'text-green-400',     // Level 3
    'text-yellow-400',    // Level 4
    'text-orange-400',    // Level 5
    'text-red-400',       // Level 6
    'text-pink-400',      // Level 7
    'text-purple-400',    // Level 8
    'text-indigo-400',    // Level 9
    'text-amber-300',     // Level 10
  ];
  return colors[Math.min(level - 1, colors.length - 1)];
}
