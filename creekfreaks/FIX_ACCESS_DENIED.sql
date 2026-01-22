-- FIX ADMIN ACCESS DENIED ISSUE
-- The reason you are "Access Denied" is that the database hides your admin status from the app for security.
-- We need to tell the database: "It's okay for a user to see if they are an admin."

-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/iorgtikifkihxiwfbikx/editor/sql

-- 1. Enable users to read their own role
CREATE POLICY "Users can view their own role" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Verify it's fixed
-- After running this, refresh your app.
