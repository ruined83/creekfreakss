-- ============================================
-- CREEK FREAKS - AUDIO SYSTEM SETUP
-- ============================================

-- 1. Create Audio Table
CREATE TABLE IF NOT EXISTS public.chapter_audio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_number INTEGER NOT NULL UNIQUE,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.chapter_audio ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies

-- Allow public read access (anyone can listen)
DROP POLICY IF EXISTS "Anyone can listen to chapter audio" ON public.chapter_audio;
CREATE POLICY "Anyone can listen to chapter audio"
ON public.chapter_audio FOR SELECT
USING (true);

-- Allow admin insert (only admins can upload)
DROP POLICY IF EXISTS "Admins can upload chapter audio" ON public.chapter_audio;
CREATE POLICY "Admins can upload chapter audio"
ON public.chapter_audio FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admin update
DROP POLICY IF EXISTS "Admins can update chapter audio" ON public.chapter_audio;
CREATE POLICY "Admins can update chapter audio"
ON public.chapter_audio FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admin delete
DROP POLICY IF EXISTS "Admins can delete chapter audio" ON public.chapter_audio;
CREATE POLICY "Admins can delete chapter audio"
ON public.chapter_audio FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Storage Bucket Setup (Guidelines)
-- Note: You usually need to create the bucket in the Supabase Dashboard,
-- but we can try to insert into storage.buckets if permissions allow.
INSERT INTO storage.buckets (id, name, public)
VALUES ('chapter-audio', 'chapter-audio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Allow public access to files
DROP POLICY IF EXISTS "Give public access to chapter-audio" ON storage.objects;
CREATE POLICY "Give public access to chapter-audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'chapter-audio');

-- Allow admin uploads
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'chapter-audio' 
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admin updates
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'chapter-audio'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admin deletes
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'chapter-audio'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);
