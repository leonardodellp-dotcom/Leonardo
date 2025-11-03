# 📧 Guia de Configuração - Envio de Emails com Supabase

## 🎯 Sistema de Recuperação de Senha com Email

Implementei o envio de emails para recuperação de senha usando **Netlify Functions + Mailgun**.

---

## 🚀 Opção 1: Mailgun (RECOMENDADO - Free Tier)

### Passo 1: Criar conta no Mailgun

1. Vá para https://mailgun.com
2. Clique em **Sign up Free**
3. Crie conta com seu email
4. Confirme o email

### Passo 2: Configurar Domínio

1. No dashboard, vá para **Domains**
2. Você verá um domínio sandbox automaticamente criado (ex: `sandbox123abc.mailgun.org`)
3. Guarde este domínio para o próximo passo

### Passo 3: Obter API Key

1. Vá para **API Keys**
2. Copie a **Private API Key** (começa com `key-`)
3. Guarde-a em local seguro

### Passo 4: Configurar Variáveis de Ambiente

Adicione ao seu `.env` ou no Netlify:

```env
MAILGUN_API_KEY=key-seu_api_key_aqui
MAILGUN_DOMAIN=sandboxabc123.mailgun.org
```

**Para Netlify:**
1. Vá para Site settings → Build & deploy → Environment
2. Clique em **Edit variables**
3. Adicione as variáveis acima
4. Salve

### Passo 5: Testar

1. Vá para http://localhost:8080/cadastro
2. Clique em "Esqueceu a senha? Recuperar a conta"
3. Insira um email válido existente
4. Você receberá um email com o código! 🎉

---

## 🚀 Opção 2: Resend (Moderno e Fácil)

### Passo 1: Criar conta

1. Vá para https://resend.com
2. Sign up com seu email
3. Confirme

### Passo 2: Obter API Key

1. Vá para API Keys
2. Copie a chave
3. Adicione ao `.env`:

```env
RESEND_API_KEY=seu_api_key_aqui
```

### Passo 3: Usar em Netlify Function

Substitua o código em `netlify/functions/send-reset-email.ts`:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const { error } = await resend.emails.send({
  from: "noreply@jucrisc.com",
  to: email,
  subject: "Recuperação de Senha - Jucrisc",
  html: emailHtml,
});
```

---

## 🚀 Opção 3: SendGrid

### Passo 1: Criar conta

1. Vá para https://sendgrid.com
2. Sign up
3. Crie API Key em **Settings → API Keys**

### Passo 2: Configurar

```env
SENDGRID_API_KEY=seu_api_key_aqui
```

### Passo 3: Código para Netlify Function

```typescript
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: email,
  from: "noreply@jucrisc.com",
  subject: "Recuperação de Senha - Jucrisc",
  html: emailHtml,
});
```

---

## 🚀 Opção 4: Gmail SMTP (Básico)

### Passo 1: Criar Senha de App

1. Vá para myaccount.google.com
2. Security → 2-Step Verification (configure se não tiver)
3. Security → App passwords
4. Gere senha para "Mail" + "Windows Computer"
5. Copie a senha (será como: `xxxx xxxx xxxx xxxx`)

### Passo 2: Configurar

```env
GMAIL_USER=seu_email@gmail.com
GMAIL_PASS=xxxx_xxxx_xxxx_xxxx
```

### Passo 3: Código para Netlify Function

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: email,
  subject: "Recuperação de Senha - Jucrisc",
  html: emailHtml,
});
```

---

## 📊 Comparação das Opções

| Opção    | Custo      | Facilidade | Limite Livre | Recomendação |
|----------|-----------|-----------|-------------|--------------|
| Mailgun  | $0.50/1000 | ⭐⭐⭐⭐   | 100/mês     | ✅ MELHOR   |
| Resend   | $0.25/1000 | ⭐⭐⭐⭐⭐  | Limitado    | ✅ FÁCIL   |
| SendGrid | $0.10/1000 | ⭐⭐⭐    | 100/dia     | ✅ Popular  |
| Gmail    | Grátis     | ⭐⭐     | Limitado    | ⚠️ Básico   |

---

## 🧪 Testando Localmente

### Sem Email Real (Desenvolvimento)

1. Vá para http://localhost:8080/cadastro
2. Clique em "Recuperar a conta"
3. Insira um email existente
4. **Abra o Console (F12)** para ver o código
5. Use o código para redefinir senha

```
Output do Console:
Reset code for leonardodellp@gmail.com: ABC123 (valid for 1 hour)
```

### Com Email Real (Produção)

1. Configurar variáveis de ambiente (passo acima)
2. Deploy no Netlify
3. O email será enviado automaticamente

---

## 🛠️ Solução de Problemas

### "Email service unavailable"

**Solução:**
- Verifique se MAILGUN_API_KEY está configurada
- Confirme que o domínio está correto
- Tente usar um email diferente

### "Failed to send email"

**Solução:**
- Verifique credenciais da API
- Confirme que email é válido
- Veja logs do Netlify para mais detalhes

### Email não chega

**Solução:**
- Verifique pasta de spam
- Aguarde até 5 minutos
- Confira se email foi enviado (veja logs)

---

## 📝 Template do Email

O email enviado contém:

```
Assunto: Recuperação de Senha - Jucrisc

Olá [nome_usuario],

Recebemos uma solicitação para redefinir sua senha.

Seu código: ABC123

Este código é válido por 1 hora.

Instruções:
1. Vá para recuperar a conta
2. Insira o código: ABC123
3. Digite e confirme sua nova senha

Segurança: Se não solicitou, ignore este email.
```

---

## 🔄 Fluxo Completo

```
1. Usuário clica em "Recuperar a conta"
   ↓
2. Insere email
   ↓
3. Sistema verifica se email existe
   ↓
4. Gera código de 6 caracteres
   ↓
5. Salva token com expiração de 1 hora
   ↓
6. Envia email com código (via Mailgun/Resend/SendGrid)
   ↓
7. Usuário recebe email com código
   ↓
8. Insere código + nova senha
   ↓
9. Sistema valida código
   ↓
10. Atualiza senha no banco de dados
    ↓
11. Marca token como usado
    ↓
12. Sucesso! Pode fazer login com nova senha
```

---

## 🚀 Deploy no Netlify

1. Push suas mudanças para GitHub
2. Netlify detecta automaticamente as Netlify Functions
3. Vá para Site settings → Build & deploy → Environment
4. Adicione as variáveis de ambiente
5. Faz um novo deploy (ou push novamente)

---

## 📞 Suporte

Se encontrar problemas:

1. **Verificar logs do Netlify:**
   - Vá para Functions → Logs
   - Procure por erros

2. **Verificar console do navegador:**
   - Abra F12
   - Vá para Console
   - Procure por mensagens de erro

3. **Testar localmente:**
   - Use `pnpm run dev`
   - Abra console (F12)
   - Veja o código gerado

---

## ✅ Checklist de Implementação

- [ ] Escolher provedor de email (Mailgun recomendado)
- [ ] Criar conta no provedor
- [ ] Obter API Key
- [ ] Configurar variáveis de ambiente
- [ ] Testar localmente (F12 para ver código)
- [ ] Deploy no Netlify
- [ ] Configurar variáveis no Netlify
- [ ] Testar envio de email real
- [ ] Validar recebimento do email

---

## 💡 Próximos Passos

1. **[AGORA]** Configure Mailgun (fácil e grátis)
2. **[DEPOIS]** Adicione branding customizado ao email
3. **[DEPOIS]** Adicione logs de auditoria
4. **[DEPOIS]** Implemente 2FA (autenticação de dois fatores)

---

## 📊 Status Atual

✅ **Código de recuperação implementado**
✅ **Validação de senha implementada**
✅ **Netlify Function criada**
⏳ **Aguardando configuração de provedor de email**

Próximo passo: Configure Mailgun ou escolha outro provedor e adicione as variáveis de ambiente!
