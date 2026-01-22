-- Create a function to auto-assign admin role for the site owner
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Auto-assign admin role for the site owner
  IF NEW.email = 'creekfreak@creek-freaks.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to run after user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();