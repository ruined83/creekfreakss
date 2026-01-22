-- Add RLS policy to allow public access to tree_tributes through the view
-- The view filters to only public/confirmed tributes, and the RLS allows that specific access
CREATE POLICY "Public can view confirmed public tributes via view"
ON public.tree_tributes
FOR SELECT
USING (is_public = true AND payment_confirmed = true);