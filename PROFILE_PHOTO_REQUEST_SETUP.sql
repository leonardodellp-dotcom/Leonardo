-- Profile Photo Change Requests Table
CREATE TABLE IF NOT EXISTS public.profile_photo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  rejection_reason TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profile_photo_requests_user_id ON public.profile_photo_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_profile_photo_requests_status ON public.profile_photo_requests(status);
CREATE INDEX IF NOT EXISTS idx_profile_photo_requests_requested_at ON public.profile_photo_requests(requested_at);

-- Add profile_photo_url to user_profiles if exists, otherwise create reference
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS profile_photo_url TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS photo_approved BOOLEAN DEFAULT false;

-- Enable RLS
ALTER TABLE public.profile_photo_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own photo requests" ON public.profile_photo_requests
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own photo requests" ON public.profile_photo_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update photo requests" ON public.profile_photo_requests
  FOR UPDATE USING (true);

-- Grant permissions
GRANT SELECT ON public.profile_photo_requests TO anon;
GRANT INSERT ON public.profile_photo_requests TO anon;
GRANT UPDATE ON public.profile_photo_requests TO anon;
