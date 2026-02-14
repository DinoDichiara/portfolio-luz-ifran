-- Create a table to store contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the contact form is public, no auth required)
CREATE POLICY "Allow public insert" ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only allow server-side (service role) to read submissions
CREATE POLICY "Allow service role read" ON public.contact_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');
