# Configuração do Supabase

## Passo 1: Obter o Anon Key

1. Acesse: https://supabase.com/dashboard/project/ridztjcycoxqjiuwarvx
2. Vá em: **Settings** → **API**
3. Copie o valor de **`anon` `public`** (Project API keys)

## Passo 2: Executar o SQL

1. No dashboard do Supabase, vá em: **SQL Editor**
2. Clique em **New Query**
3. Cole todo o conteúdo do arquivo `supabase_schema.sql`
4. Clique em **Run** (ou pressione Ctrl+Enter)

## Passo 3: Atualizar o Código

No arquivo `app.js`, linha ~24, substitua:

```javascript
const SUPABASE_ANON_KEY = 'PLACEHOLDER';
```

Por:

```javascript
const SUPABASE_ANON_KEY = 'SEU_ANON_KEY_AQUI';
```

## Passo 4: Criar Usuário Admin no Supabase

Execute este SQL no SQL Editor:

```sql
-- Criar usuário admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@reidavsl.com',
  crypt('#reidavsl1243#', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  ''
);
```

## Verificação

Após configurar, o sistema irá:
- ✅ Salvar dados no Supabase automaticamente
- ✅ Sincronizar entre dispositivos
- ✅ Manter backup seguro no servidor
- ⚠️ Se Supabase falhar, usa localStorage como fallback

## Troubleshooting

**Erro: "Supabase not configured"**
- Verifique se o ANON_KEY foi substituído corretamente

**Erro: "Invalid API key"**
- Confirme que copiou a chave `anon` (não a `service_role`)

**Erro: "Row Level Security"**
- Certifique-se de que executou todo o SQL do schema
