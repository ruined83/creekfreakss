-- ============================================
-- CREEK FREAKS - COMPLETE DATABASE SETUP
-- ============================================
-- Run this entire script in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/nryduglepeblvvlynjwn/sql/new

-- ============================================
-- STEP 1: Create User Roles System
-- ============================================

-- Create role enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policy for viewing roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- STEP 2: Grant Admin Access to Your Email
-- ============================================

-- Auto-grant trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IN ('creekfreak@creek-freaks.com', 'ruinedshaman@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant admin to existing user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'ruinedshaman@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- ============================================
-- STEP 3: Create Chapters Table
-- ============================================

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create chapters table
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "Anyone can view chapters" ON public.chapters;
CREATE POLICY "Anyone can view chapters"
ON public.chapters FOR SELECT
USING (true);

-- Admin-only write access
DROP POLICY IF EXISTS "Admins can insert chapters" ON public.chapters;
CREATE POLICY "Admins can insert chapters"
ON public.chapters FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update chapters" ON public.chapters;
CREATE POLICY "Admins can update chapters"
ON public.chapters FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can delete chapters" ON public.chapters;
CREATE POLICY "Admins can delete chapters"
ON public.chapters FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Auto-update timestamp trigger
DROP TRIGGER IF EXISTS update_chapters_updated_at ON public.chapters;
CREATE TRIGGER update_chapters_updated_at
BEFORE UPDATE ON public.chapters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- DONE! 
-- ============================================
-- Next steps:
-- 1. Log in at http://localhost:8080/admin/auth
-- 2. Go to Admin Dashboard
-- 3. Create your first chapter!
