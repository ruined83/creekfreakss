-- AFFILIATE SHOP SETUP
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/iorgtikifkihxiwfbikx/editor/sql

-- 1. Create Affiliate Items Table
CREATE TABLE IF NOT EXISTS public.affiliate_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price TEXT, -- e.g. "$29.99"
  affiliate_url TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Gear',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable Security
ALTER TABLE public.affiliate_items ENABLE ROW LEVEL SECURITY;

-- 3. Policies
CREATE POLICY "Public can view affiliate items" 
ON public.affiliate_items FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage affiliate items" 
ON public.affiliate_items FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('affiliate-images', 'affiliate-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies
CREATE POLICY "Public view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'affiliate-images');

CREATE POLICY "Admin upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'affiliate-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin update images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'affiliate-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'affiliate-images' AND auth.uid() IS NOT NULL);
