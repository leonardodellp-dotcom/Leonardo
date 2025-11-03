# 🔐 Guia de Implementação - Sistema de Recuperação de Senha

## Visão Geral

Um novo sistema de "Esqueceu a Senha?" foi implementado com as seguintes funcionalidades:

- ✅ **Página de Recuperação** (`/esqueceu-senha`)
- ✅ **Validação de Email**
- ✅ **Geração de Código de Reset** (6 caracteres, válido por 1 hora)
- ✅ **Redefinição de Senha** com código
- ✅ **Banco de Dados** pronto para armazenar tokens
- ⚠️ **Envio de Email** (precisa ser implementado com serviço de email)

---

## 📋 Passos de Instalação

### Passo 1: Criar Tabela no Supabase

1. Vá para [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto Jucrisc
3. Clique em **SQL Editor**
4. Cole o conteúdo de `PASSWORD_RESET_SETUP.sql`
5. Clique em **Run**

Isso criará:
- Tabela `password_reset_tokens`
- Índices para performance
- Políticas de segurança (RLS)
- Função para limpeza de tokens expirados

### Passo 2: Verificar Rotas

A rota `/esqueceu-senha` já foi adicionada em `client/App.tsx`.

A página de Login agora tem um link "Esqueceu a senha?" que leva para `/esqueceu-senha`.

### Passo 3: Implementar Envio de Email (Importante!)

Atualmente, o sistema gera um código de reset, mas **não envia email**. Para um ambiente de produção, você precisa:

#### Opção A: Usar Supabase Auth (Recomendado)

```typescript
// Em ForgotPassword.tsx, substituir a seção de envio de código:

const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/redefinir-senha`,
});
```

#### Opção B: Usar Netlify Functions + SendGrid

1. **Instalar SendGrid**
```bash
npm install @sendgrid/mail
```

2. **Criar função Netlify** (`netlify/functions/send-reset-email.ts`):
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const { email, resetCode } = JSON.parse(event.body);
  
  const msg = {
    to: email,
    from: 'noreply@jucrisc.com',
    subject: 'Recuperação de Senha - Jucrisc',
    html: `
      <h2>Recuperação de Senha</h2>
      <p>Seu código de reset é: <strong>${resetCode}</strong></p>
      <p>Este código é válido por 1 hora.</p>
      <p>Se não solicitou essa recuperação, ignore este email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
```

3. **Chamar função de ForgotPassword.tsx**:
```typescript
// Após gerar o código
const response = await fetch('/.netlify/functions/send-reset-email', {
  method: 'POST',
  body: JSON.stringify({ email, resetCode: code }),
});
```

#### Opção C: Usar Resend

1. **Instalar Resend**
```bash
npm install resend
```

2. **Criar rota API** para enviar email

#### Opção D: Usar Gmail SMTP

Configurar variáveis de ambiente e usar `nodemailer`.

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `password_reset_tokens`

```sql
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,              -- ID do usuário
  email TEXT NOT NULL,                 -- Email para reset
  reset_code TEXT NOT NULL,            -- Código (ex: "ABC123")
  is_used BOOLEAN DEFAULT false,       -- Marca como usado
  created_at TIMESTAMP DEFAULT NOW(),  -- Quando foi criado
  expires_at TIMESTAMP NOT NULL        -- Quando expira (1 hora)
);
```

---

## 🔄 Fluxo do Sistema

### 1. Usuário Esqueceu a Senha
```
1. Clica em "Esqueceu a senha?" no Login
2. Insere seu email em /esqueceu-senha
3. Sistema verifica se email existe
4. Gera código de reset (ex: "ABC123")
5. Salva em password_reset_tokens com expires_at = now() + 1 hour
6. [PRECISA] Envia código via email (não implementado)
```

### 2. Usuário Recebe Email
```
1. Recebe email com código: "ABC123"
2. Email tem link: /esqueceu-senha?email=user@example.com
3. Ou copia manualmente o código
```

### 3. Usuário Redefine Senha
```
1. Insere código no campo "Código de Reset"
2. Insere nova senha
3. Clica "Redefinir Senha"
4. Sistema valida código:
   - Existe?
   - Não expirou?
   - Não foi usado antes?
5. Se válido:
   - Atualiza senha em user_registrations
   - Marca token como is_used = true
   - Redireciona para /auth
```

---

## 🛡️ Segurança Implementada

✅ **Validação de Email** - Verifica formato com isValidEmail()
✅ **Expiração de Código** - Token válido por apenas 1 hora
✅ **Um uso só** - Marca token como is_used = true
✅ **Rate Limiting** - Pode ser adicionado em produção
✅ **RLS (Row Level Security)** - Configurado no Supabase
✅ **Hash de Senha** - Recomenda-se usar bcrypt em produção

---

## 🚀 Próximos Passos

1. **[OBRIGATÓRIO] Implementar Envio de Email**
   - Escolher serviço (SendGrid, Resend, etc)
   - Testar fluxo completo

2. **Melhorias Sugeridas**
   - Adicionar Rate Limiting (máx 3 tentativas/hora)
   - Hash de senha com bcrypt
   - Logs de auditoria
   - Notificação de segurança por email
   - QR code ou link automático no email

3. **Página de Confirmação**
   - Criar página `ResetPasswordConfirm.tsx` para link automático

4. **Admin Dashboard**
   - Ver logs de resets de senha
   - Gerenciar tokens expirados

---

## 📝 Variáveis de Ambiente Necessárias

Para implementar o envio de email, adicione em `.env`:

```env
# SendGrid
VITE_SENDGRID_API_KEY=sua_chave_aqui

# Resend
VITE_RESEND_API_KEY=sua_chave_aqui

# Email remetente
VITE_EMAIL_FROM=noreply@jucrisc.com
```

---

## 🧪 Testando Localmente

### Sem Email Real

1. Ir para `/esqueceu-senha`
2. Inserir email de usuário existente
3. Código será mostrado no console do navegador (F12)
4. Usar esse código para redefinir senha

### Com Email Real

1. Conectar serviço de email
2. Receber email com código
3. Usar código para redefinir

---

## 🐛 Troubleshooting

### "Email não encontrado"
- Verifique se usuário existe em `user_registrations`
- Confirme o email está escrito corretamente

### "Código inválido ou expirado"
- Código venceu após 1 hora
- Solicite novo código
- Verifique se é maiúsculo

### "As senhas não coincidem"
- Redigite a nova senha
- Confirme que está digitando a mesma senha

### Token não está sendo criado
- Verifique se tabela `password_reset_tokens` foi criada
- Confirme permissões no Supabase RLS

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do Supabase (SQL Editor → Logs)
2. Verifique console do navegador (F12)
3. Confirme se tabela foi criada com sucesso
4. Teste a conexão com Supabase
