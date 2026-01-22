-- Create table for chapter audio files
CREATE TABLE public.chapter_audio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_number INTEGER NOT NULL UNIQUE,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chapter_audio ENABLE ROW LEVEL SECURITY;

-- Anyone can view chapter audio (public content)
CREATE POLICY "Anyone can view chapter audio"
ON public.chapter_audio
FOR SELECT
USING (true);

-- Only admins can manage chapter audio
CREATE POLICY "Admins can insert chapter audio"
ON public.chapter_audio
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update chapter audio"
ON public.chapter_audio
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete chapter audio"
ON public.chapter_audio
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for chapter audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('chapter-audio', 'chapter-audio', true);

-- Storage policies for chapter audio bucket
CREATE POLICY "Anyone can view chapter audio files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'chapter-audio');

CREATE POLICY "Admins can upload chapter audio files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'chapter-audio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update chapter audio files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'chapter-audio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete chapter audio files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'chapter-audio' AND auth.uid() IS NOT NULL);