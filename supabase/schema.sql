-- Pulso Verde — Script SQL Completo para Supabase (Seções 4 e 7 do CONTEXT.md)
-- Execute este script no SQL Editor do seu dashboard Supabase antes do seed.sql.

-- 1. Tabela profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL DEFAULT 'São Paulo',
  bairro TEXT NOT NULL DEFAULT 'Vila Mariana',
  pontos INTEGER DEFAULT 380 NOT NULL,
  streak INTEGER DEFAULT 7 NOT NULL,
  ultimo_dia_ativo TIMESTAMPTZ DEFAULT NOW(),
  consentimento_lgpd BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela missions (catálogo das 24 missões do ano)
CREATE TABLE IF NOT EXISTS public.missions (
  id TEXT PRIMARY KEY,
  mes INTEGER NOT NULL,
  numero INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  eixo TEXT NOT NULL,
  pontos INTEGER DEFAULT 10 NOT NULL
);

-- 3. Tabela user_missions (progresso do usuário)
CREATE TABLE IF NOT EXISTS public.user_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mission_id TEXT REFERENCES public.missions(id) ON DELETE CASCADE NOT NULL,
  mes INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_validacao', 'concluida')),
  foto_url TEXT,
  validada_por UUID REFERENCES public.profiles(id),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela badges (emblemas conquistados pelo usuário)
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mes INTEGER NOT NULL,
  ano INTEGER NOT NULL DEFAULT 2026,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, mes, ano)
);

-- 5. Tabela bracelet_claims (resgate de pulseiras físicas)
CREATE TABLE IF NOT EXISTS public.bracelet_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  marco INTEGER NOT NULL CHECK (marco IN (3, 6, 12)),
  status TEXT NOT NULL DEFAULT 'pedida' CHECK (status IN ('disponivel', 'pedida', 'em_producao', 'enviada')),
  endereco TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela donations (simulada no MVP)
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  valor NUMERIC NOT NULL,
  destino TEXT DEFAULT 'Mudas e arborização comunitária',
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Habilitação de RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bracelet_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- 8. Políticas de RLS
-- Profiles
DROP POLICY IF EXISTS "Usuários autenticados podem ver perfis" ON public.profiles;
CREATE POLICY "Usuários autenticados podem ver perfis"
  ON public.profiles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Usuários podem criar seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem criar seu próprio perfil"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Missions (Leitura pública para qualquer visitante ou autenticado)
DROP POLICY IF EXISTS "Missões têm leitura pública" ON public.missions;
CREATE POLICY "Missões têm leitura pública"
  ON public.missions FOR SELECT USING (true);

-- User Missions
DROP POLICY IF EXISTS "Usuários podem ver suas próprias missões" ON public.user_missions;
CREATE POLICY "Usuários podem ver suas próprias missões"
  ON public.user_missions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem gerenciar suas próprias missões" ON public.user_missions;
CREATE POLICY "Usuários podem gerenciar suas próprias missões"
  ON public.user_missions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Badges
DROP POLICY IF EXISTS "Usuários podem ver seus próprios badges" ON public.badges;
CREATE POLICY "Usuários podem ver seus próprios badges"
  ON public.badges FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem registrar badges" ON public.badges;
CREATE POLICY "Usuários podem registrar badges"
  ON public.badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Bracelet Claims
DROP POLICY IF EXISTS "Usuários podem gerenciar seus resgates" ON public.bracelet_claims;
CREATE POLICY "Usuários podem gerenciar seus resgates"
  ON public.bracelet_claims FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Donations
DROP POLICY IF EXISTS "Usuários podem ver e fazer doações" ON public.donations;
CREATE POLICY "Usuários podem ver e fazer doações"
  ON public.donations FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 9. Trigger para criar perfil automaticamente no signup (inclusive via Google OAuth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, cidade, bairro, consentimento_lgpd, pontos, streak)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'nome',
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(NEW.raw_user_meta_data->>'cidade', 'São Paulo'),
    COALESCE(NEW.raw_user_meta_data->>'bairro', 'Vila Mariana'),
    COALESCE((NEW.raw_user_meta_data->>'consentimento_lgpd')::boolean, true),
    380,
    7
  )
  ON CONFLICT (id) DO UPDATE SET
    nome = EXCLUDED.nome,
    cidade = COALESCE(NULLIF(EXCLUDED.cidade, ''), profiles.cidade),
    bairro = COALESCE(NULLIF(EXCLUDED.bairro, ''), profiles.bairro);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
