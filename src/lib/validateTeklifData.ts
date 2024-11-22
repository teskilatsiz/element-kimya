import { z } from 'zod';

const teklifSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  product: z.string().min(1, 'Bir ürün seçiniz'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
});

export type TeklifData = z.infer<typeof teklifSchema>;

export function validateTeklifData(data: unknown): TeklifData {
  return teklifSchema.parse(data);
}