-- FORCE GRANT ADMIN ACCESS
-- This will definitely work

-- First, let's see what users exist
SELECT email, id FROM auth.users WHERE email LIKE '%ruined%' OR email LIKE '%creek%';

-- If you see your email above, copy the ID and use it below
-- Otherwise, you need to sign up first at http://localhost:8080/admin/auth

-- Replace YOUR_USER_ID_HERE with the actual UUID from the query above
-- Example: INSERT INTO public.user_roles (user_id, role) VALUES ('123e4567-e89b-12d3-a456-426614174000', 'admin');

-- OPTION 1: If you found your user ID above, uncomment and replace:
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('YOUR_USER_ID_HERE', 'admin')
-- ON CONFLICT (user_id, role) DO NOTHING;

-- OPTION 2: If your email is ruinedshaman@gmail.com, this should work:
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'ruinedshaman@gmail.com';

-- Check if it worked:
SELECT u.email, ur.role 
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'ruinedshaman@gmail.com';
