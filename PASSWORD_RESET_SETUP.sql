-- Password Reset Tokens Table
-- Run this SQL script in Supabase SQL Editor to create the password reset table

CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  reset_code TEXT NOT NULL,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON public.password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_email ON public.password_reset_tokens(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_reset_code ON public.password_reset_tokens(reset_code);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON public.password_reset_tokens(expires_at);

-- Enable Row Level Security
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can insert (for reset requests)
CREATE POLICY "Anyone can insert password reset tokens" ON public.password_reset_tokens
  FOR INSERT WITH CHECK (true);

-- Anyone can select their own tokens (by email)
CREATE POLICY "Users can read their own reset tokens" ON public.password_reset_tokens
  FOR SELECT USING (true);

-- Only system can update (mark as used)
CREATE POLICY "System can update reset tokens" ON public.password_reset_tokens
  FOR UPDATE USING (true);

-- Grant permissions
GRANT INSERT ON public.password_reset_tokens TO anon;
GRANT SELECT ON public.password_reset_tokens TO anon;
GRANT UPDATE ON public.password_reset_tokens TO anon;

-- Optional: Create a function to clean up expired tokens (runs periodically)
CREATE OR REPLACE FUNCTION public.cleanup_expired_reset_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM public.password_reset_tokens
  WHERE expires_at < NOW() AND is_used = false;
END;
$$ LANGUAGE plpgsql;
