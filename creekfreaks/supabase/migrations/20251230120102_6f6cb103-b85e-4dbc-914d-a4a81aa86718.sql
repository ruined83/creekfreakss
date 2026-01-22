-- Fix: Change view to use SECURITY INVOKER (the default, but being explicit)
-- This ensures the view respects the querying user's permissions
DROP VIEW IF EXISTS public.public_tributes;

CREATE VIEW public.public_tributes 
WITH (security_invoker = true) AS
SELECT 
  id,
  honoree_name,
  honoree_photo_url,
  birth_date,
  passing_date,
  dedication_message,
  created_at
FROM public.tree_tributes
WHERE is_public = true AND payment_confirmed = true;

-- Grant access to the view
GRANT SELECT ON public.public_tributes TO anon, authenticated;