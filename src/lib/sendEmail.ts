import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(name: string, email: string, product: string, message: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: 'Yeni Teklif İsteği',
      html: `
        <h1>Yeni Teklif İsteği</h1>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Ürün:</strong> ${product}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `
    });

    return { success: true, data };
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    return { success: false, error };
  }
}