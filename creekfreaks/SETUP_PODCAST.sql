-- PODCAST SETUP SCRIPT
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/iorgtikifkihxiwfbikx/editor/sql

-- 1. Create Podcast Episodes Table
CREATE TABLE IF NOT EXISTS public.podcast_episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  duration TEXT, -- Stores "5:00", "12:30" etc.
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable Security (RLS)
ALTER TABLE public.podcast_episodes ENABLE ROW LEVEL SECURITY;

-- 3. Policies: Everyone can read, Only Admins can edit
CREATE POLICY "Public can view episodes" 
ON public.podcast_episodes FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert episodes" 
ON public.podcast_episodes FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update episodes" 
ON public.podcast_episodes FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete episodes" 
ON public.podcast_episodes FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Create Storage Bucket for Audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('podcast-audio', 'podcast-audio', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies
CREATE POLICY "Public can listen to podcast"
ON storage.objects FOR SELECT
USING (bucket_id = 'podcast-audio');

CREATE POLICY "Admins can upload podcast audio"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'podcast-audio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update podcast audio"
ON storage.objects FOR UPDATE
USING (bucket_id = 'podcast-audio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete podcast audio"
ON storage.objects FOR DELETE
USING (bucket_id = 'podcast-audio' AND auth.uid() IS NOT NULL);
