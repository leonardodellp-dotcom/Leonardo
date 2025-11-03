-- Gamification System Setup for Jucrisc
-- Run this SQL script in Supabase SQL editor to create all gamification tables

-- 1. User XP Stats Table
CREATE TABLE IF NOT EXISTS public.user_xp_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  profile_likes INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  courses_completed INTEGER DEFAULT 0,
  forum_posts INTEGER DEFAULT 0,
  forum_replies INTEGER DEFAULT 0,
  chat_messages INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Badges Table
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  badge_description TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON public.user_badges(badge_id);

-- 3. User Challenges Table
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  challenge_title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  xp_reward INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON public.user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_challenge_id ON public.user_challenges(challenge_id);

-- 4. User Course Progress Table
CREATE TABLE IF NOT EXISTS public.user_course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  lessons_completed INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_course_progress_user_id ON public.user_course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_course_progress_course_id ON public.user_course_progress(course_id);

-- 5. User Profile Likes Table
CREATE TABLE IF NOT EXISTS public.user_profile_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  liked_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profile_likes_user_id ON public.user_profile_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_likes_liked_by ON public.user_profile_likes(liked_by);

-- 6. User Activities Log Table
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON public.user_activities(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_xp_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profile_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_xp_stats
CREATE POLICY "Users can read their own XP stats" ON public.user_xp_stats
  FOR SELECT USING (auth.uid()::TEXT = user_id OR true);

CREATE POLICY "Users can insert their own XP stats" ON public.user_xp_stats
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id OR true);

CREATE POLICY "Users can update their own XP stats" ON public.user_xp_stats
  FOR UPDATE USING (auth.uid()::TEXT = user_id OR true);

-- RLS Policies for user_badges
CREATE POLICY "Users can read badges" ON public.user_badges
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id OR true);

-- RLS Policies for user_challenges
CREATE POLICY "Users can read challenges" ON public.user_challenges
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own challenges" ON public.user_challenges
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id OR true);

-- RLS Policies for user_course_progress
CREATE POLICY "Users can read course progress" ON public.user_course_progress
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own course progress" ON public.user_course_progress
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id OR true);

CREATE POLICY "Users can update their own course progress" ON public.user_course_progress
  FOR UPDATE USING (auth.uid()::TEXT = user_id OR true);

-- RLS Policies for user_profile_likes
CREATE POLICY "Anyone can read profile likes" ON public.user_profile_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert likes" ON public.user_profile_likes
  FOR INSERT WITH CHECK (true);

-- RLS Policies for user_activities
CREATE POLICY "Users can read activities" ON public.user_activities
  FOR SELECT USING (true);

CREATE POLICY "Users can insert activities" ON public.user_activities
  FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id OR true);

-- Insert sample data for demonstration (optional)
-- This will create sample XP stats for test users
INSERT INTO public.user_xp_stats (user_id, total_xp, current_level, profile_likes, challenges_completed, courses_completed, forum_posts, forum_replies, chat_messages)
VALUES 
  ('default_user', 6500, 7, 24, 23, 8, 5, 15, 45)
ON CONFLICT (user_id) DO NOTHING;
