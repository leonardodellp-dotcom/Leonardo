import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          username: string;
          password_hash: string;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          username: string;
          password_hash: string;
          created_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          username?: string;
          password_hash?: string;
          created_at?: string;
          last_login?: string | null;
        };
      };
      user_registrations: {
        Row: {
          id: string;
          name: string;
          age: number;
          group: string;
          email: string;
          phone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          age: number;
          group: string;
          email: string;
          phone: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          age?: number;
          group?: string;
          email?: string;
          phone?: string;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          created_at?: string;
          created_by?: string;
        };
      };
      mural_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author: string;
          image_url: string | null;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author: string;
          image_url?: string | null;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author?: string;
          image_url?: string | null;
          created_at?: string;
          created_by?: string;
        };
      };
      contact_suggestions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
      santos: {
        Row: {
          id: string;
          name: string;
          feast_day: string;
          biography: string;
          prayer: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          feast_day: string;
          biography: string;
          prayer: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          feast_day?: string;
          biography?: string;
          prayer?: string;
          image_url?: string | null;
          created_at?: string;
        };
      };
      bible_readings: {
        Row: {
          id: string;
          week: number;
          day_of_week: string;
          book: string;
          chapter: number;
          verses: string;
          title: string;
          reflection: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          week: number;
          day_of_week: string;
          book: string;
          chapter: number;
          verses: string;
          title: string;
          reflection: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          week?: number;
          day_of_week?: string;
          book?: string;
          chapter?: number;
          verses?: string;
          title?: string;
          reflection?: string;
          created_at?: string;
        };
      };
      testimonies: {
        Row: {
          id: string;
          author: string;
          title: string;
          content: string;
          age: number | null;
          image_url: string | null;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          author: string;
          title: string;
          content: string;
          age?: number | null;
          image_url?: string | null;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          author?: string;
          title?: string;
          content?: string;
          age?: number | null;
          image_url?: string | null;
          created_at?: string;
          created_by?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          description: string;
          youtube_url: string;
          category: string;
          duration_minutes: number | null;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          youtube_url: string;
          category: string;
          duration_minutes?: number | null;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          youtube_url?: string;
          category?: string;
          duration_minutes?: number | null;
          created_at?: string;
          created_by?: string;
        };
      };
      challenge_scores: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          score: number;
          difficulty: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_name: string;
          score: number;
          difficulty: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_name?: string;
          score?: number;
          difficulty?: string;
          created_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          age: number | null;
          group: string | null;
          avatar_url: string | null;
          bio: string | null;
          courses_completed: number;
          challenges_completed: number;
          total_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          age?: number | null;
          group?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          courses_completed?: number;
          challenges_completed?: number;
          total_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          age?: number | null;
          group?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          courses_completed?: number;
          challenges_completed?: number;
          total_score?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      forum_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author: string;
          category: string;
          replies_count: number;
          views_count: number;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author: string;
          category: string;
          replies_count?: number;
          views_count?: number;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author?: string;
          category?: string;
          replies_count?: number;
          views_count?: number;
          created_at?: string;
          created_by?: string;
        };
      };
      forum_replies: {
        Row: {
          id: string;
          post_id: string;
          content: string;
          author: string;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          content: string;
          author: string;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          content?: string;
          author?: string;
          created_at?: string;
          created_by?: string;
        };
      };
      photos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string;
          event_name: string;
          event_date: string;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_url: string;
          event_name: string;
          event_date: string;
          uploaded_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image_url?: string;
          event_name?: string;
          event_date?: string;
          uploaded_by?: string;
          created_at?: string;
        };
      };
      user_xp_stats: {
        Row: {
          id: string;
          user_id: string;
          total_xp: number;
          current_level: number;
          profile_likes: number;
          challenges_completed: number;
          courses_completed: number;
          forum_posts: number;
          forum_replies: number;
          chat_messages: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_xp?: number;
          current_level?: number;
          profile_likes?: number;
          challenges_completed?: number;
          courses_completed?: number;
          forum_posts?: number;
          forum_replies?: number;
          chat_messages?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_xp?: number;
          current_level?: number;
          profile_likes?: number;
          challenges_completed?: number;
          courses_completed?: number;
          forum_posts?: number;
          forum_replies?: number;
          chat_messages?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          badge_name: string;
          badge_icon: string;
          badge_description: string;
          earned_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          badge_name: string;
          badge_icon: string;
          badge_description: string;
          earned_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          badge_id?: string;
          badge_name?: string;
          badge_icon?: string;
          badge_description?: string;
          earned_at?: string;
          created_at?: string;
        };
      };
      user_challenges: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          challenge_title: string;
          difficulty: string;
          xp_reward: number;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_id: string;
          challenge_title: string;
          difficulty: string;
          xp_reward: number;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          challenge_id?: string;
          challenge_title?: string;
          difficulty?: string;
          xp_reward?: number;
          completed_at?: string;
          created_at?: string;
        };
      };
      user_course_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          course_title: string;
          lessons_completed: number;
          total_lessons: number;
          progress_percentage: number;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          course_title: string;
          lessons_completed?: number;
          total_lessons?: number;
          progress_percentage?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          course_title?: string;
          lessons_completed?: number;
          total_lessons?: number;
          progress_percentage?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profile_likes: {
        Row: {
          id: string;
          user_id: string;
          liked_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          liked_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          liked_by?: string;
          created_at?: string;
        };
      };
      user_activities: {
        Row: {
          id: string;
          user_id: string;
          activity_type: string;
          xp_earned: number;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: string;
          xp_earned?: number;
          description?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: string;
          xp_earned?: number;
          description?: string;
          created_at?: string;
        };
      };
      password_reset_tokens: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          reset_code: string;
          is_used: boolean;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          reset_code: string;
          is_used?: boolean;
          created_at?: string;
          expires_at: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          reset_code?: string;
          is_used?: boolean;
          created_at?: string;
          expires_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
