-- Check if your user has admin role
-- Run this in Supabase SQL Editor to verify

SELECT 
  u.email,
  u.id as user_id,
  ur.role,
  ur.created_at as role_granted_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'ruinedshaman@gmail.com';

-- This should return a row showing:
-- email: ruinedshaman@gmail.com
-- role: admin
-- If role is NULL, admin wasn't granted properly
