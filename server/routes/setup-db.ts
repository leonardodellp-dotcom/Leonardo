import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

export const setupDatabase: RequestHandler = async (req, res) => {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(400).json({
        success: false,
        message: "Missing Supabase credentials",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create admin_users table
    await supabase
      .rpc("sql", {
        sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          last_login TIMESTAMP
        );
      `,
      })
      .catch(() => {
        // Table might already exist
      });

    // Create user_registrations table
    await supabase
      .rpc("sql", {
        sql: `
        CREATE TABLE IF NOT EXISTS user_registrations (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          group TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
      })
      .catch(() => {
        // Table might already exist
      });

    // Create events table
    await supabase
      .rpc("sql", {
        sql: `
        CREATE TABLE IF NOT EXISTS events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          location TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          created_by TEXT NOT NULL
        );
      `,
      })
      .catch(() => {
        // Table might already exist
      });

    // Create mural_posts table
    await supabase
      .rpc("sql", {
        sql: `
        CREATE TABLE IF NOT EXISTS mural_posts (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          author TEXT NOT NULL,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          created_by TEXT NOT NULL
        );
      `,
      })
      .catch(() => {
        // Table might already exist
      });

    // Create contact_suggestions table
    await supabase
      .rpc("sql", {
        sql: `
        CREATE TABLE IF NOT EXISTS contact_suggestions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
      })
      .catch(() => {
        // Table might already exist
      });

    return res.json({
      success: true,
      message: "Database setup completed successfully",
    });
  } catch (error: any) {
    console.error("Database setup error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to setup database",
    });
  }
};
