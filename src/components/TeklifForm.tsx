'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TeklifData } from '@/lib/validateTeklifData'

interface TeklifFormProps {
  productName: string
  subProducts: { name: string }[]
}

export function TeklifForm({ productName, subProducts }: TeklifFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data: TeklifData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      product: formData.get('product') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/submit-teklif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#c89454] text-white hover:bg-[#b47d3c]">Teklif İste</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#c89454]">Teklif İste</DialogTitle>
          <DialogDescription>Bu ürün kategorisi için teklif istemek üzere aşağıdaki formu doldurun.</DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-4">
            <p className="text-green-600 font-semibold">Teklif isteğiniz başarıyla gönderildi!</p>
            <p className="mt-2">En kısa sürede sizinle iletişime geçeceğiz.</p>
          </div>
        ) : (
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">İsim</Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">E-posta</Label>
              <Input id="email" name="email" type="email" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">Ürün</Label>
              <Select name="product" defaultValue={productName}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Ürün seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={productName}>{productName}</SelectItem>
                  {subProducts.map((subProduct, index) => (
                    <SelectItem key={index} value={subProduct.name}>{subProduct.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">Mesaj</Label>
              <Textarea id="message" name="message" className="col-span-3" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="ml-auto bg-[#c89454] text-white hover:bg-[#b47d3c]" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : 'Teklif İste'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}