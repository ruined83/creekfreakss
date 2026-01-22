-- ============================================
-- CREEK FREAKS - FIX PUBLIC ACCESS
-- ============================================

-- 1. Fix Chapters Public Access
DROP POLICY IF EXISTS "Anyone can view chapters" ON public.chapters;
CREATE POLICY "Anyone can view chapters"
ON public.chapters FOR SELECT
USING (true);

-- 2. Fix Audio Table Public Access
DROP POLICY IF EXISTS "Anyone can listen to chapter audio" ON public.chapter_audio;
CREATE POLICY "Anyone can listen to chapter audio"
ON public.chapter_audio FOR SELECT
USING (true);

-- 3. Fix Storage Bucket Public Access
-- Ensure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('chapter-audio', 'chapter-audio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 4. Fix Storage Objects Public Access
DROP POLICY IF EXISTS "Give public access to chapter-audio" ON storage.objects;
CREATE POLICY "Give public access to chapter-audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'chapter-audio');

-- 5. Force refresh of schema cache (sometimes needed)
NOTIFY pgrst, 'reload schema';
