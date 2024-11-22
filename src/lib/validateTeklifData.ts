import { z } from 'zod';

export const teklifSchema = z.object({
  name: z.string().min(1, { message: "İsim gereklidir" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  product: z.string().min(1, { message: "Ürün seçimi gereklidir" }),
  message: z.string().min(1, { message: "Mesaj gereklidir" }),
});

export type TeklifData = z.infer<typeof teklifSchema>;

export function validateTeklifData(data: unknown): TeklifData {
  return teklifSchema.parse(data);
}