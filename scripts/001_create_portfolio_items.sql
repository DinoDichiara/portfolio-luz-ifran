-- Drop table if exists to recreate cleanly
DROP TABLE IF EXISTS public.portfolio_items;

-- Create portfolio_items table for managing media
CREATE TABLE public.portfolio_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('video', 'modeling', 'ugc')),
  media_url TEXT NOT NULL,
  is_video BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access (portfolio is public content)
CREATE POLICY "Allow public read access" ON public.portfolio_items
  FOR SELECT USING (true);
