-- =============================================
-- SUPABASE SCHEMA - SAFE VERSION
-- Só cria o que não existe
-- =============================================

-- 1. Create influencers table (IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  perfil_ig TEXT,
  youtube TEXT,
  perfil_tiktok TEXT,
  site TEXT,
  email TEXT,
  whatsapp TEXT,
  nicho TEXT,
  media_views BIGINT DEFAULT 0,
  relevancia TEXT CHECK (relevancia IN ('Baixa', 'Média', 'Alta')),
  contato_ig TEXT CHECK (contato_ig IN ('Sim', 'Não')),
  teve_retorno TEXT CHECK (teve_retorno IN ('Sim', 'Não')),
  converteu TEXT CHECK (converteu IN ('Sim', 'Não')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Create column_schemas table (IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS column_schemas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  schema_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create indexes (IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_influencers_user_id ON influencers(user_id);
CREATE INDEX IF NOT EXISTS idx_influencers_nome ON influencers(nome);
CREATE INDEX IF NOT EXISTS idx_influencers_created_at ON influencers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_column_schemas_user_id ON column_schemas(user_id);

-- 4. Enable RLS (safe to run multiple times)
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE column_schemas ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "Users can view own influencers" ON influencers;
DROP POLICY IF EXISTS "Users can insert own influencers" ON influencers;
DROP POLICY IF EXISTS "Users can update own influencers" ON influencers;
DROP POLICY IF EXISTS "Users can delete own influencers" ON influencers;
DROP POLICY IF EXISTS "Users can view own schemas" ON column_schemas;
DROP POLICY IF EXISTS "Users can insert own schemas" ON column_schemas;
DROP POLICY IF EXISTS "Users can update own schemas" ON column_schemas;
DROP POLICY IF EXISTS "Users can delete own schemas" ON column_schemas;

-- 6. Create policies
CREATE POLICY "Users can view own influencers"
  ON influencers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own influencers"
  ON influencers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own influencers"
  ON influencers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own influencers"
  ON influencers FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own schemas"
  ON column_schemas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own schemas"
  ON column_schemas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schemas"
  ON column_schemas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own schemas"
  ON column_schemas FOR DELETE
  USING (auth.uid() = user_id);

-- 7. Create or replace function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Drop existing triggers if they exist, then recreate
DROP TRIGGER IF EXISTS update_influencers_updated_at ON influencers;
DROP TRIGGER IF EXISTS update_column_schemas_updated_at ON column_schemas;

CREATE TRIGGER update_influencers_updated_at
    BEFORE UPDATE ON influencers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_column_schemas_updated_at
    BEFORE UPDATE ON column_schemas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
