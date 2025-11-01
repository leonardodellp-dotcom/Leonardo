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
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
