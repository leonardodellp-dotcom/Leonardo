import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { email, resetCode, userName } = JSON.parse(event.body || "{}");

    if (!email || !resetCode) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email and resetCode are required" }),
      };
    }

    // Get Mailgun API key from environment
    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN || "sandboxXXXX.mailgun.org";

    if (!mailgunApiKey) {
      console.warn(
        "Mailgun API key not configured. Skipping email send. Code: " +
          resetCode
      );
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Email service not configured. Token was saved.",
          debug: {
            resetCode,
            expiresIn: "1 hour",
          },
        }),
      };
    }

    // Build email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #7c3aed; margin-bottom: 10px; }
            .title { font-size: 20px; color: #333; margin: 0; }
            .content { color: #666; line-height: 1.6; margin-bottom: 30px; }
            .code-box { background: #f9fafb; border: 2px dashed #7c3aed; padding: 20px; text-align: center; margin: 20px 0; border-radius: 4px; }
            .code { font-size: 32px; font-weight: bold; color: #7c3aed; letter-spacing: 2px; font-family: 'Courier New', monospace; }
            .small-text { font-size: 12px; color: #999; margin: 10px 0 0 0; }
            .button { display: inline-block; padding: 12px 30px; background: #7c3aed; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            .footer { border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999; }
            .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; color: #991b1b; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🙏 Jucrisc</div>
              <p class="title">Recuperação de Senha</p>
            </div>

            <div class="content">
              <p>Olá ${userName || "Membro"},</p>
              
              <p>Recebemos uma solicitação para redefinir sua senha no Jucrisc. Use o código abaixo para continuar:</p>

              <div class="code-box">
                <div class="code">${resetCode}</div>
                <p class="small-text">Este código é válido por <strong>1 hora</strong></p>
              </div>

              <p><strong>Como usar:</strong></p>
              <ol style="color: #666;">
                <li>Vá para a página de recuperação de senha</li>
                <li>Insira este código: <strong>${resetCode}</strong></li>
                <li>Digite sua nova senha e confirme</li>
                <li>Pronto! Você poderá fazer login com a nova senha</li>
              </ol>

              <div class="warning">
                <strong>⚠️ Segurança:</strong> Se você não solicitou essa recuperação de senha, ignore este email. Sua conta permanece segura.
              </div>

              <p>Se tiver dúvidas, entre em contato com nossa equipe de suporte.</p>
            </div>

            <div class="footer">
              <p>Jucrisc - Grupo de Jovens Católicos<br>
              Este é um email automático, não responda a este endereço.<br>
              © 2024 Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Olá ${userName || "Membro"},

Recebemos uma solicitação para redefinir sua senha no Jucrisc.

Seu código de recuperação é:
${resetCode}

Este código é válido por 1 hora.

Se você não solicitou essa recuperação, ignore este email.

Jucrisc - Grupo de Jovens Católicos
    `;

    // Send via Mailgun API
    const auth = Buffer.from(`api:${mailgunApiKey}`).toString("base64");

    const response = await fetch(
      `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          from: `Jucrisc <noreply@${mailgunDomain}>`,
          to: email,
          subject: "Recuperação de Senha - Jucrisc",
          text: emailText,
          html: emailHtml,
        }).toString(),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Mailgun error:", result);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to send email",
          details: result,
        }),
      };
    }

    console.log(`Email sent to ${email}:`, result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email enviado com sucesso!",
        messageId: result.id,
      }),
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};

export { handler };
