# 🎮 Sistema de Gamificação do Jucrisc

## Visão Geral

O sistema de gamificação foi implementado para tornar o envolvimento na comunidade Jucrisc mais motivador e divertido. Ele inclui:

- **Nível de Usuário** (1-10)
- **Sistema de XP** (Experiência)
- **Insígnias/Badges** (16+ diferentes)
- **Rastreamento de Desafios**
- **Progresso de Cursos**
- **Curtidas do Perfil**
- **Atividades Registradas**

---

## 📊 Como Funciona

### Nível e XP

Cada usuário começa no **Nível 1** e pode avançar até o **Nível 10 (Iluminado)**.

**Limites XP por Nível:**

- Nível 1: 0 XP
- Nível 2: 500 XP
- Nível 3: 1.200 XP
- Nível 4: 2.100 XP
- Nível 5: 3.200 XP
- Nível 6: 4.500 XP
- Nível 7: 6.000 XP
- Nível 8: 7.700 XP
- Nível 9: 9.600 XP
- Nível 10: 12.000+ XP

### XP por Atividade

Os usuários ganham XP fazendo várias atividades:

```
Desafios:
  - Desafio Fácil: 50 XP
  - Desafio Médio: 100 XP
  - Desafio Difícil: 200 XP
  - Desafio Impossível: 500 XP

Cursos:
  - Curso Completo: 300 XP

Fórum & Chat:
  - Criar Tópico: 25 XP
  - Responder: 15 XP
  - Resposta Aceita: 50 XP
  - Like Recebido: 5 XP

Perfil:
  - Like no Perfil: 10 XP

Chat:
  - Mensagem: 5 XP
  - Mensagem Curtida: 20 XP

Testemunhas:
  - Compartilhar Testemunha: 100 XP
  - Responder Pedido de Oração: 30 XP

Sugestões:
  - Sugestão Aprovada: 100 XP
```

### 🏆 Insígnias Disponíveis

#### 🌱 Insígnias de Atividade (Iniciais)

- **Iniciante Espiritual** - Completou primeiro desafio
- **Voz na Comunidade** - Respondeu as pessoas no chat (10+ respostas)
- **Conectador** - Participou de 10 discussões do fórum

#### 📚 Insígnias de Aprendizado

- **Estudioso da Fé** - Completou 5 cursos
- **Aprendiz do Evangelho** - Leu o Plano de Leitura Bíblica completo
- **Devorador de Conhecimento** - Completou 10 cursos

#### 🏅 Insígnias de Desafio

- **Campeão dos Desafios** - Completou 20 desafios

#### 💕 Insígnias Sociais

- **Coração Querido** - Ganhou 50 corações/likes
- **Idealizador** - Sua sugestão de chat foi aprovada
- **Mensageiro da Palavra** - 50 mensagens no chat com respostas úteis
- **Guerreiro da Oração** - Rezou 100 orações na comunidade
- **Missionário do Amor** - Participou de 5 atividades de caridade

#### ⭐ Insígnias de Marcos

- **Ascendente** - Alcançou Nível 5
- **Iluminado** - Alcançou Nível 10 (Máximo!)
- **Acumulador de Poder** - Acumulou 1.000 XP

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas Criadas

#### 1. `user_xp_stats`

Rastreia estatísticas gerais de XP e nível do usuário

```sql
CREATE TABLE user_xp_stats (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  total_xp INTEGER,
  current_level INTEGER,
  profile_likes INTEGER,
  challenges_completed INTEGER,
  courses_completed INTEGER,
  forum_posts INTEGER,
  forum_replies INTEGER,
  chat_messages INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### 2. `user_badges`

Registra insígnias desbloqueadas

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  badge_description TEXT NOT NULL,
  earned_at TIMESTAMP,
  created_at TIMESTAMP
);
```

#### 3. `user_challenges`

Rastreia desafios completados

```sql
CREATE TABLE user_challenges (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  challenge_title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  xp_reward INTEGER NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP
);
```

#### 4. `user_course_progress`

Rastreia progresso em cursos

```sql
CREATE TABLE user_course_progress (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  lessons_completed INTEGER,
  total_lessons INTEGER,
  progress_percentage INTEGER,
  completed_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### 5. `user_profile_likes`

Rastreia curtidas recebidas

```sql
CREATE TABLE user_profile_likes (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  liked_by TEXT NOT NULL,
  created_at TIMESTAMP
);
```

#### 6. `user_activities`

Log de todas as atividades para auditoria

```sql
CREATE TABLE user_activities (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  xp_earned INTEGER,
  description TEXT,
  created_at TIMESTAMP
);
```

---

## 📋 Configuração

### Passo 1: Executar Script SQL

1. Vá para o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto Jucrisc
3. Vá para **SQL Editor**
4. Cole o conteúdo do arquivo `GAMIFICATION_SETUP.sql`
5. Clique em **Run**

Isso criará todas as tabelas necessárias com políticas de RLS configuradas.

### Passo 2: Atualizar Supabase Types

Os tipos TypeScript já foram atualizados em `shared/supabase.ts` com as novas tabelas.

### Passo 3: Usar o Sistema

A página "Meu Perfil" agora exibe:

- Nível atual e XP
- Barra de progresso para o próximo nível
- Insígnias desbloqueadas
- Estatísticas de atividades
- Progresso de cursos

---

## 🛠️ Implementação na Aplicação

### Arquivo: `client/lib/gamification.ts`

Contém funções utilitárias para:

- Calcular nível a partir de XP
- Calcular progresso XP
- Obter insígnias disponíveis
- Obter títulos e cores de nível
- Definir recompensas de XP

**Funções Principais:**

```typescript
calculateLevel(totalXP: number): number
getNextLevelThreshold(totalXP: number): number
getXPProgress(totalXP: number): number
getBadges(userStats: Partial<UserGameStats>): BadgeDefinition[]
getLevelTitle(level: number): string
getLevelColor(level: number): string
```

### Arquivo: `client/pages/MeuPerfil.tsx`

Página de perfil com 5 abas:

1. **Visão Geral** - Dashboard com estatísticas principais
2. **Insígnias** - Grid de todas as insígnias disponíveis
3. **Desafios** - Estatísticas de desafios completados
4. **Cursos** - Progresso de cursos em andamento
5. **Atividades** - Resumo de atividades recentes

---

## 🚀 Como Integrar com Outras Páginas

### Quando um Desafio é Completado

```typescript
// Adicionar XP ao usuário
const xpEarned = XP_REWARDS.CHALLENGE_COMPLETED_MEDIUM; // 100 XP
const newTotalXP = userStats.totalXP + xpEarned;

// Registrar atividade
await supabase.from("user_activities").insert({
  user_id: userId,
  activity_type: "challenge_completed",
  xp_earned: xpEarned,
  description: `Completou desafio: ${challengeTitle}`,
});

// Atualizar stats
await supabase
  .from("user_xp_stats")
  .update({
    total_xp: newTotalXP,
    current_level: calculateLevel(newTotalXP),
    challenges_completed: userStats.activitiesThisMonth.challengesCompleted + 1,
  })
  .eq("user_id", userId);
```

### Quando uma Resposta é Postada no Fórum

```typescript
// Adicionar XP
const xpEarned = XP_REWARDS.FORUM_REPLY; // 15 XP
await supabase.from("user_activities").insert({
  user_id: userId,
  activity_type: "forum_reply",
  xp_earned: xpEarned,
  description: `Respondeu no fórum`,
});

// Atualizar stats
await supabase
  .from("user_xp_stats")
  .update({
    total_xp: newTotalXP,
    forum_replies: userStats.activitiesThisMonth.forumReplies + 1,
  })
  .eq("user_id", userId);
```

### Quando um Usuário Curte um Perfil

```typescript
// Registrar like
await supabase.from("user_profile_likes").insert({
  user_id: targetUserId,
  liked_by: currentUserId,
});

// Adicionar XP para quem foi curtido
const xpEarned = XP_REWARDS.PROFILE_LIKE_RECEIVED; // 10 XP
await supabase
  .from("user_xp_stats")
  .update({
    total_xp: newTotalXP,
    profile_likes: userStats.profileLikes + 1,
  })
  .eq("user_id", targetUserId);
```

---

## 🎯 Próximos Passos

Para completar a integração:

1. **Forum.tsx** - Adicionar contador de respostas e registrar XP
2. **Desafios.tsx** - Registrar conclusão de desafios
3. **Cursos.tsx** - Rastrear progresso e conclusão
4. **AdminDashboard.tsx** - Ver estatísticas de usuários
5. **Integração de Chat** - Registrar mensagens

---

## 📊 Exemplo de Dashboard Esperado

```
┌─────────────────────────────────────────┐
│         Meu Perfil - João Silva         │
├─────────────────────────────────────────┤
│                                         │
│  Nível: 7 (Campeão) - 6.500 XP          │
│  ████████████████░░░░░░░░░░░░░░░░ 65%  │
│  (6.500 / 7.700 XP para o próximo nível) │
│                                         │
│  Cursos: 8/12  Desafios: 23  Curtidas: 24 │
│  Insígnias: 9/14 desbloqueadas          │
│                                         │
├─────────────────────────────────────────┤
│  [Visão Geral] [Insígnias] [Desafios]  │
│  [Cursos] [Atividades]                  │
│                                         │
│  Progresso nos Cursos: 67%              │
│  ████████████░░░░░░░░░░░░░░░░░░░░ 67%  │
│                                         │
│  Insígnias Destaques:                   │
│  🌱 Iniciante  📚 Estudioso  🏆 Campeão │
└─────────────────────────────────────────┘
```

---

## 💡 Personalizações Possíveis

Você pode facilmente adicionar:

1. **Novos Níveis** - Estender `LEVEL_THRESHOLDS`
2. **Novas Insígnias** - Adicionar em `getBadges()`
3. **Novos XP** - Adicionar em `XP_REWARDS`
4. **Leaderboard** - Criar página `/placar` ordenando por XP
5. **Achievements Notifications** - Notificar quando desbloquear insígnia
6. **Seasonal Challenges** - Adicionar desafios sazonais com bônus XP

---

## 🔐 Segurança

Todas as tabelas têm RLS (Row Level Security) configurado:

- Usuários só veem seus próprios dados
- Mas podem ver badges e atividades de outros (público)
- Dados de XP são protegidos

---

## 📞 Suporte

Se encontrar algum problema:

1. Verifique se todas as tabelas foram criadas em Supabase
2. Confirme que o `user_id` está sendo passado corretamente
3. Verifique os logs do navegador (F12) para erros
4. Confirme que o `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão corretos
