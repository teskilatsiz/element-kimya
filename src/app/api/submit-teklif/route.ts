import { NextResponse } from 'next/server';
import { validateTeklifData } from '@/lib/validateTeklifData';
import { sendEmail } from '@/lib/sendEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = validateTeklifData(body);

    const result = await sendEmail(
      validatedData.name,
      validatedData.email,
      validatedData.product,
      validatedData.message
    );

    if (result.success) {
      return NextResponse.json({ message: "Teklif başarıyla gönderildi" }, { status: 200 });
    } else {
      console.error("E-posta gönderme hatası:", result.error);
      return NextResponse.json({ message: "Teklif gönderilirken bir hata oluştu" }, { status: 500 });
    }
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 400 });
  }
}