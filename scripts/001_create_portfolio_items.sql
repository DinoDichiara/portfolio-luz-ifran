-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id SERIAL PRIMARY KEY,
  title_key TEXT NOT NULL,
  category_key TEXT NOT NULL CHECK (category_key IN ('video', 'modeling', 'ugc')),
  image TEXT NOT NULL,
  is_video BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access (portfolio is public content)
CREATE POLICY "Allow public read access" ON public.portfolio_items
  FOR SELECT USING (true);

-- Insert initial portfolio data
INSERT INTO public.portfolio_items (id, title_key, category_key, image, is_video, sort_order) VALUES
  (1, 'Retrato', 'video', 'https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F50d3539a-b7fc-41ea-95a4-56908c6c0bcb/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAL33m50osmANwD06u-8S5CbmdgEQurNi8bWy3sDA2Gy0&exp=1770180962&osig=AAAAAAAAAAAAAAAAAAAAALmV1KvNeZAZ3A3UggYxRDci63qedkjAizp-jfil0p9j&signer=media-rpc&x-canva-quality=screen_2x', false, 1),
  (2, 'Retrato', 'modeling', 'https://media.canva.com/v2/image-resize/format:JPG/height:2400/quality:92/uri:ifs%3A%2F%2FM%2F72fa0531-2873-49d5-ad64-836ba4932807/watermark:F/width:1350?csig=AAAAAAAAAAAAAAAAAAAAANjt3gE1tjH_wRItzmnGVtgX5uQSkT59FZTgA_6mULdI&exp=1770179490&osig=AAAAAAAAAAAAAAAAAAAAAFIX_J1Exy6hAtxYEf5R5dQhJ6ifwk9QzNSQhQrFftsv&signer=media-rpc&x-canva-quality=screen_3x', false, 2),
  (3, 'skincareUgc', 'modeling', 'https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F8579d837-fc15-4264-8d9f-887bb319a877/watermark:F/width:1200?csig=AAAAAAAAAAAAAAAAAAAAALayJ_7EjdplQOTn5U2rVB_0yWyVhGpQ2yMrxkE6WNEm&exp=1770180800&osig=AAAAAAAAAAAAAAAAAAAAAIlxQhvecXOpn_7xQNVROwEjST4ke0EzF5iKTUVoUy3L&signer=media-rpc&x-canva-quality=screen_2x', false, 3),
  (4, 'summerCollection', 'modeling', 'https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2Ffc1ab485-998d-403e-81ee-2f9fa29b1c0f/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAFb6MjZ_SYzh_XwaM0WaOrDep076VI6MsK5xikuMvo4g&exp=1770182598&osig=AAAAAAAAAAAAAAAAAAAAABlBAKt2W1IlsAYVlwfg4Oq2f-BLDQwhZm48BAmyLwW5&signer=media-rpc&x-canva-quality=screen_2x', false, 4),
  (5, 'productLaunch', 'modeling', 'https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F764bae7c-ca95-4e46-94c4-8efeb3a74f13/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAABuLdzEAMSDmesyNtgFjMsNvlfO93kjixFDDJCH4ZaEj&exp=1770180319&osig=AAAAAAAAAAAAAAAAAAAAAFMBWPtlDNMnuZlaIIAkxNvi-NQa4LDnSoki9oR2-GY-&signer=media-rpc&x-canva-quality=screen_2x', false, 5),
  (6, 'lifestyleContent', 'ugc', 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800&auto=format&fit=crop', false, 6),
  (7, 'beautyCampaign', 'modeling', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop', false, 7),
  (8, 'travelVlog', 'video', 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop', true, 8)
ON CONFLICT (id) DO NOTHING;
