-- RUN THIS IN YOUR SUPABASE DASHBOARD SQL EDITOR
-- Link: https://supabase.com/dashboard/project/iorgtikifkihxiwfbikx/editor/sql

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'ruinedshaman@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verification query (run this after to check):
SELECT u.email, ur.role 
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'ruinedshaman@gmail.com';
