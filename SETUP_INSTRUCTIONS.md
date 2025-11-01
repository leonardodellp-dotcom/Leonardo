# Setup Instructions - Jucrisc Admin Panel

## ✅ Pré-requisitos

- ✓ Supabase Project criado
- ✓ URL: `https://jncgqbvxyyxcypqfnlwh.supabase.co`
- ✓ Anon Key configurada
- ✓ Variáveis de ambiente definidas

## 🗄️ Criar Tabelas no Supabase

Acesse: **https://jncgqbvxyyxcypqfnlwh.supabase.co**

1. Clique em **SQL Editor** (lado esquerdo)
2. Clique em **New Query**
3. Cole o SQL abaixo:

```sql
-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Create user_registrations table
CREATE TABLE IF NOT EXISTS user_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  group TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Create mural_posts table
CREATE TABLE IF NOT EXISTS mural_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Create contact_suggestions table
CREATE TABLE IF NOT EXISTS contact_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE mural_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_registrations (public insert, public read)
CREATE POLICY "Allow public insert" ON user_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON user_registrations FOR SELECT USING (true);

-- Create policies for contact_suggestions (public insert, public read)
CREATE POLICY "Allow public insert" ON contact_suggestions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON contact_suggestions FOR SELECT USING (true);

-- Create policies for events (public read, admin write)
CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);

-- Create policies for mural_posts (public read, admin write)
CREATE POLICY "Allow public read" ON mural_posts FOR SELECT USING (true);
```

4. Clique em **Run** (botão verde no topo direito)

✅ Pronto! As tabelas foram criadas com sucesso!

## 🔐 Credenciais do Admin

**Username:** `leoadm`  
**Password:** `leolindo`

Acesse em: `/admin-login`

## 🎯 Funcionalidades Implementadas

### 📱 Usuário Final
- ✅ Cadastro com: Nome, Idade, Grupo, Email, Telefone
- ✅ Formulário de Contato com sugestões
- ✅ Links diretos para TikTok e Instagram
- ✅ Versículos diários
- ✅ Ora��ões e como rezar

### 👨‍💼 Admin
- ✅ Login seguro (leoadm / leolindo)
- ✅ Painel de administração
- ✅ Gerenciamento de eventos (em desenvolvimento)
- ✅ Gerenciamento de mural (em desenvolvimento)
- ✅ Visualização de usuários (em desenvolvimento)

## 📝 Dados Salvos no Banco

### user_registrations
- `id` - UUID único
- `name` - Nome do usuário
- `age` - Idade (13-100)
- `group` - Grupo que pertence
- `email` - Email
- `phone` - Telefone com DDD
- `created_at` - Data de registro

### contact_suggestions
- `id` - UUID único
- `name` - Nome
- `email` - Email
- `phone` - Telefone
- `subject` - Assunto
- `message` - Mensagem
- `created_at` - Data do envio

### events (para admin)
- `id` - UUID único
- `title` - Título do evento
- `description` - Descrição
- `date` - Data
- `time` - Horário
- `location` - Local
- `created_by` - Criado por (admin)
- `created_at` - Data de criação

### mural_posts (para admin)
- `id` - UUID único
- `title` - Título
- `content` - Conteúdo
- `author` - Autor
- `image_url` - URL da imagem (opcional)
- `created_by` - Criado por (admin)
- `created_at` - Data de criação

## 🚀 Próximas Funcionalidades

- [ ] Integração de email com código de verificação
- [ ] Dashboard admin completo (CRUD de eventos e mural)
- [ ] Notificações de novos cadastros
- [ ] Exportação de dados de usuários
- [ ] Analytics e estatísticas

---

**Site criado por By Leo** ❤️
