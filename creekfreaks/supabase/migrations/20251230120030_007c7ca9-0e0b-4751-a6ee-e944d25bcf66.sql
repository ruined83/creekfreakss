-- Create a secure view with only non-sensitive tribute data
CREATE VIEW public.public_tributes AS
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

-- Grant access to the view for public/anonymous users
GRANT SELECT ON public.public_tributes TO anon, authenticated;

-- Remove the policy that exposes sensitive data
DROP POLICY IF EXISTS "Anyone can view public tributes" ON public.tree_tributes;