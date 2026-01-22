-- Remove the policy that exposes sensitive columns - the view handles public access now
DROP POLICY IF EXISTS "Public can view confirmed public tributes via view" ON public.tree_tributes;