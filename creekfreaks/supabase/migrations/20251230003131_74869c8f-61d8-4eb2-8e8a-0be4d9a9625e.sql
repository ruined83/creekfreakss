-- Create table for tree planting tributes
CREATE TABLE public.tree_tributes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  honoree_name TEXT NOT NULL,
  dedication_message TEXT,
  honoree_photo_url TEXT,
  birth_date DATE,
  passing_date DATE,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donation_amount DECIMAL(10,2),
  payment_method TEXT,
  payment_confirmed BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tree_tributes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view public tributes (for memorial wall)
CREATE POLICY "Anyone can view public tributes"
ON public.tree_tributes
FOR SELECT
USING (is_public = true AND payment_confirmed = true);

-- Allow anyone to insert tributes (donation submissions)
CREATE POLICY "Anyone can submit tributes"
ON public.tree_tributes
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for honoree photos
INSERT INTO storage.buckets (id, name, public) VALUES ('honoree-photos', 'honoree-photos', true);

-- Storage policy for public read access
CREATE POLICY "Anyone can view honoree photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'honoree-photos');

-- Storage policy for uploads
CREATE POLICY "Anyone can upload honoree photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'honoree-photos');

-- Enable realtime for tributes
ALTER PUBLICATION supabase_realtime ADD TABLE public.tree_tributes;