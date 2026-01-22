-- Add server-side input validation constraints for tree_tributes table

-- Add length constraints and NOT NULL enforcement
ALTER TABLE public.tree_tributes
ADD CONSTRAINT honoree_name_length CHECK (char_length(honoree_name) BETWEEN 1 AND 200);

ALTER TABLE public.tree_tributes
ADD CONSTRAINT dedication_message_length CHECK (dedication_message IS NULL OR char_length(dedication_message) <= 2000);

ALTER TABLE public.tree_tributes
ADD CONSTRAINT donor_name_length CHECK (char_length(donor_name) BETWEEN 1 AND 200);

ALTER TABLE public.tree_tributes
ADD CONSTRAINT donor_email_format CHECK (donor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.tree_tributes
ADD CONSTRAINT donor_email_length CHECK (char_length(donor_email) BETWEEN 5 AND 255);

-- Donation amount must be positive if provided
ALTER TABLE public.tree_tributes
ADD CONSTRAINT donation_amount_positive CHECK (donation_amount IS NULL OR donation_amount > 0);

-- Payment method must be one of the allowed values
ALTER TABLE public.tree_tributes
ADD CONSTRAINT payment_method_valid CHECK (payment_method IS NULL OR payment_method IN ('venmo', 'cashapp'));

-- Birth date cannot be in the future
ALTER TABLE public.tree_tributes
ADD CONSTRAINT birth_date_not_future CHECK (birth_date IS NULL OR birth_date <= CURRENT_DATE);

-- Passing date cannot be in the future
ALTER TABLE public.tree_tributes
ADD CONSTRAINT passing_date_not_future CHECK (passing_date IS NULL OR passing_date <= CURRENT_DATE);

-- Passing date must be after or equal to birth date if both are provided
ALTER TABLE public.tree_tributes
ADD CONSTRAINT passing_after_birth CHECK (
  birth_date IS NULL OR passing_date IS NULL OR passing_date >= birth_date
);