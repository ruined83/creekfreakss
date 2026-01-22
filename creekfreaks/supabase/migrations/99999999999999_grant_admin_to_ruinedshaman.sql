-- Grant admin access to ruinedshaman@gmail.com
-- Run this migration to grant yourself admin access

-- Update the trigger function to include your email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Auto-assign admin role for site owners
  IF NEW.email IN ('creekfreak@creek-freaks.com', 'ruinedshaman@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Grant admin to existing user if they already signed up
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'ruinedshaman@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
