-- Grant admin access to creekfreak@creek-freaks.com
-- This bypasses RLS by using SECURITY DEFINER function

DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Get the user ID for the email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'ruinedshaman@gmail.com';

  -- Check if user exists
  IF target_user_id IS NULL THEN
    RAISE NOTICE 'User not found with email: ruinedshaman@gmail.com';
    RAISE NOTICE 'Please create an account first at http://localhost:8080/admin/auth';
  ELSE
    -- Insert admin role (will skip if already exists due to UNIQUE constraint)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin access granted successfully to ruinedshaman@gmail.com!';
    RAISE NOTICE 'You can now log in at: http://localhost:8080/admin/auth';
  END IF;
END $$;
