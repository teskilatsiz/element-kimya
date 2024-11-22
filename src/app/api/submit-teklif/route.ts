import { NextResponse } from 'next/server';
import { validateTeklifData } from '@/lib/validateTeklifData';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = validateTeklifData(body);

    const emailText = `
      Yeni Teklif İsteği:
      İsim: ${validatedData.name}
      E-posta: ${validatedData.email}
      Ürün: ${validatedData.product}
      Mesaj: ${validatedData.message}
    `;

    const emailHtml = `
      <h2>Yeni Teklif İsteği</h2>
      <p><strong>İsim:</strong> ${validatedData.name}</p>
      <p><strong>E-posta:</strong> ${validatedData.email}</p>
      <p><strong>Ürün:</strong> ${validatedData.product}</p>
      <p><strong>Mesaj:</strong> ${validatedData.message}</p>
    `;

    const emailSent = await sendEmail(
      process.env.TO_EMAIL as string,
      'Yeni Teklif İsteği',
      emailText,
      emailHtml
    );

    if (emailSent) {
      return NextResponse.json({ message: 'Teklif başarıyla gönderildi.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'E-posta gönderilirken bir hata oluştu.' }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Bir hata oluştu.' }, { status: 500 });
  }
}