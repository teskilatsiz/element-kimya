'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SubProduct {
  name: string;
}

interface TeklifFormProps {
  productName: string;
  subProducts: SubProduct[];
}

export function TeklifForm({ productName, subProducts }: TeklifFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [product, setProduct] = useState(productName)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-teklif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, product, message }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setName('')
        setEmail('')
        setProduct(productName)
        setMessage('')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Hata:', error)
      setSubmitStatus('error')
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
          <DialogTitle>Teklif İste</DialogTitle>
          <DialogDescription>
            Bu ürün kategorisi için teklif istemek üzere aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              İsim
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Ürün
            </Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Ürün seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={productName}>{productName}</SelectItem>
                {subProducts.map((subProduct, index) => (
                  <SelectItem key={index} value={subProduct.name}>
                    {subProduct.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Mesaj
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <Button
            type="submit"
            className="ml-auto bg-[#c89454] text-white hover:bg-[#b47d3c]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Gönderiliyor...' : 'Teklif İste'}
          </Button>
          {submitStatus === 'success' && (
            <p className="text-green-600">Teklif başarıyla gönderildi!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600">
              Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}