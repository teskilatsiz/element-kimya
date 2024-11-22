'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Facebook, Instagram, Linkedin, Twitter, Award, Users, Lightbulb, Headphones, Globe, Leaf, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

const whyUsData = [
  { title: 'Kaliteli Ürünler', description: 'Uluslararası standartlara uygun yüksek kaliteli kimyasal ürünler sunuyoruz.', icon: Award },
  { title: 'Uzman Ekip', description: 'Uzman ekibimiz, kimyasal ihtiyaçlarınız için en iyi çözümleri sunar.', icon: Users },
  { title: 'İnovasyon', description: 'Kimya teknolojisindeki en son yenilikleri size sunmak için sürekli inovasyon yapıyoruz.', icon: Lightbulb },
  { title: 'Müşteri Hizmetleri', description: 'Özel müşteri hizmetleri ekibimiz her zaman size yardımcı olmaya hazır.', icon: Headphones },
  { title: 'Global Erişim', description: 'Geniş dağıtım ağımızla dünya çapındaki müşterilerimize hizmet veriyoruz.', icon: Globe },
  { title: 'Sürdürülebilirlik', description: 'Tüm operasyonlarımızda sürdürülebilir uygulamalara bağlıyız.', icon: Leaf },
]

interface SubProduct {
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface ProductCategory {
  name: string;
  description: string;
  image: string;
  subProducts: SubProduct[];
}

const productCategories: ProductCategory[] = [
  {
    name: 'Gıda Ambalaj Ürünleri',
    description: 'Gıda güvenliği ve tazeliği için yüksek kaliteli ambalaj çözümleri.',
    image: '/images/gida-ambalaj-urunleri.png',
    subProducts: [
      { name: 'Streç Film', description: 'Gıda koruma için yüksek kaliteli streç film.', features: ['Yüksek esneklik', 'Oksijen bariyeri', 'Gıda güvenliği onaylı'], image: '/images/strec-film.jpg' },
      { name: 'Alüminyum Folyo', description: 'Pişirme ve saklama için dayanıklı alüminyum folyo.', features: ['Isı yalıtımı', 'Geri dönüştürülebilir', 'Çoklu kullanım'], image: '/images/aluminyum-folyo.jpg' },
      { name: 'Vakum Poşetleri', description: 'Uzun süreli gıda tazeliği için vakumlu poşetler.', features: ['Hava geçirmez', 'Dondurucuya uygun', 'BPA içermez'], image: '/images/vakum-posetleri.jpg' },
    ],
  },
  {
    name: 'Kağıt Ürünleri',
    description: 'Çeşitli kağıt bazlı ambalaj ve kullanım ürünleri.',
    image: '/images/kagit-urunleri.jpg',
    subProducts: [
      { name: 'Kağıt Poşetler', description: 'Çevre dostu kağıt poşetler.', features: ['Geri dönüştürülebilir', 'Dayanıklı', 'Özelleştirilebilir baskı'], image: '/images/kagit-posetler.jpg' },
      { name: 'Karton Kutular', description: 'Çeşitli boyutlarda karton kutular.', features: ['Sağlam yapı', 'Yığınlanabilir', 'Geri dönüştürülebilir'], image: '/images/karton-kutular.jpg' },
      { name: 'Kağıt Bardaklar', description: 'Tek kullanımlık kağıt bardaklar.', features: ['Sıcak ve soğuk içecekler için uygun', 'Çevre dostu', 'Özelleştirilebilir tasarım'], image: '/images/kagit-bardaklar.jpg' },
    ],
  },
  {
    name: 'Endüstriyel Ambalaj Ürünleri',
    description: 'Endüstriyel kullanım için dayanıklı ambalaj çözümleri.',
    image: '/images/endustriyel-ambalaj-urunleri.jpg',
    subProducts: [
      { name: 'Palet Örtüleri', description: 'Paletleri korumak için dayanıklı örtüler.', features: ['Su geçirmez', 'UV dirençli', 'Yeniden kullanılabilir'], image: '/images/palet-ortuleri.jpg' },
      { name: 'Endüstriyel Filmler', description: 'Ağır yük için yüksek mukavemetli filmler.', features: ['Yüksek dayanıklılık', 'Esneklik', 'Çeşitli boyutlar'], image: '/images/endustriyel-filmler.jpg' },
      { name: 'Koruyucu Köpükler', description: 'Hassas ürünler için koruyucu köpükler.', features: ['Şok emici', 'Hafif', 'Kesilebilir'], image: '/images/koruyucu-kopukler.jpg' },
    ],
  },
  {
    name: 'Çöp Poşetleri',
    description: 'Ev ve endüstriyel kullanım için çeşitli çöp poşetleri.',
    image: '/images/cop-posetleri.jpg',
    subProducts: [
      { name: 'Ev Tipi Çöp Poşetleri', description: 'Günlük kullanım için dayanıklı çöp poşetleri.', features: ['Sızıntı önleyici', 'Kolay bağlanabilir', 'Çeşitli boyutlar'], image: '/images/ev-tipi-cop-posetleri.jpg' },
      { name: 'Endüstriyel Çöp Poşetleri', description: 'Yüksek hacimli atıklar için büyük boy poşetler.', features: ['Ekstra dayanıklı', 'Yırtılmaya dirençli', 'Yüksek kapasite'], image: '/images/endustriyel-cop-posetleri.jpg' },
      { name: 'Geri Dönüşüm Poşetleri', description: 'Geri dönüşüm için renk kodlu poşetler.', features: ['Renk kodlaması', 'Biyobozunur seçenekler', 'Çevre dostu'], image: '/images/geri-donusum-posetleri.jpg' },
    ],
  },
  {
    name: 'Bantlar',
    description: 'Çeşitli kullanımlar için yapışkan bantlar.',
    image: '/images/bantlar.jpg',
    subProducts: [
      { name: 'Paketleme Bantları', description: 'Kutu ve paketleri kapatmak için güçlü bantlar.', features: ['Yüksek yapışma gücü', 'Kolay açılır', 'Çeşitli genişlikler'], image: '/images/paketleme-bantlari.jpg' },
      { name: 'Maskeleme Bantları', description: 'Boyama ve hassas işler için maskeleme bantları.', features: ['Hassas yüzeylere uygun', 'Kolay çıkarılabilir', 'Keskin boya hatları'], image: '/images/maskeleme-bantlari.jpg' },
      { name: 'Çift Taraflı Bantlar', description: 'Montaj ve yapıştırma için çift taraflı bantlar.', features: ['Güçlü yapışma', 'İnce ve şeffaf', 'Çeşitli yüzeylere uygun'], image: '/images/cift-tarafli-bantlar.jpg' },
    ],
  },
  {
    name: 'Gıda Kapları',
    description: 'Gıda saklama ve servis için çeşitli kaplar.',
    image: '/images/gida-kaplari.jpg',
    subProducts: [
      { name: 'Plastik Saklama Kapları', description: 'Yiyecekleri saklamak için dayanıklı plastik kaplar.', features: ['Sızdırmaz', 'Mikrodalga uyumlu', 'Bulaşık makinesi güvenli'], image: '/images/plastik-saklama-kaplari.jpg' },
      { name: 'Alüminyum Folyo Kaplar', description: 'Tek kullanımlık alüminyum folyo kaplar.', features: ['Fırına dayanıklı', 'Kolay şekil verilebilir', 'Geri dönüştürülebilir'], image: '/images/aluminyum-folyo-kaplar.jpg' },
      { name: 'Kağıt Yemek Kutuları', description: 'Paket servis için kağıt yemek kutuları.', features: ['Yağ geçirmez', 'Sıcak yemeklere uygun', 'Çevre dostu'], image: '/images/kagit-yemek-kutulari.jpg' },
    ],
  },
  {
    name: 'Gıda Servis Ürünleri',
    description: 'Yemek servisi için tek kullanımlık ürünler.',
    image: '/images/gida-servis-urunleri.jpg',
    subProducts: [
      { name: 'Plastik Çatal Bıçak Takımları', description: 'Tek kullanımlık plastik çatal, kaşık ve bıçaklar.', features: ['Dayanıklı', 'Çeşitli renk seçenekleri', 'Ekonomik'], image: '/images/plastik-catal-bicak-takimlari.jpg' },
      { name: 'Kağıt Peçeteler', description: 'Yumuşak ve emici kağıt peçeteler.', features: ['Yüksek emicilik', 'Cilt dostu', 'Çeşitli boyutlar'], image: '/images/kagit-peceteler.jpg' },
      { name: 'Pipetler', description: 'İçecekler için çeşitli pipetler.', features: ['Plastik ve kağıt seçenekleri', 'Bükülebilir', 'Hijyenik paketleme'], image: '/images/pipetler.jpg' },
    ],
  },
  {
    name: 'Hijyen ve Temizlik Ürünleri',
    description: 'Kişisel ve mekan hijyeni için temizlik ürünleri.',
    image: '/images/hijyen-ve-temizlik-urunleri.jpg',
    subProducts: [
      { name: 'El Dezenfektanları', description: 'Hızlı ve etkili el temizliği için dezenfektanlar.', features: ['Alkol bazlı', 'Hızlı kuruyan', 'Cilt dostu formül'], image: '/images/el-dezenfektanlari.jpg' },
      { name: 'Temizlik Bezleri', description: 'Çok amaçlı kullanım için temizlik bezleri.', features: ['Yüksek emicilik', 'Dayanıklı', 'Yeniden kullanılabilir'], image: '/images/temizlik-bezleri.jpg' },
      { name: 'Yüzey Temizleyiciler', description: 'Çeşitli yüzeyler için etkili temizleyiciler.', features: ['Çok amaçlı', 'Konsantre formül', 'Hoş koku'], image: '/images/yuzey-temizleyiciler.jpg' },
    ],
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [whyUsIndex, setWhyUsIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<ProductCategory | null>(null)
  const [selectedSubProduct, setSelectedSubProduct] = useState<SubProduct | null>(null)
  const urunlerimizRef = useRef<HTMLElement>(null)

  const slides = [
    { image: '/images/slide1.jpg', title: 'Element Kimya\'ya Hoş Geldiniz', description: 'Kimyasal çözümlerde güvenilir ortağınız' },
    { image: '/images/slide2.png', title: 'Kaliteli Ürünler', description: 'Uluslararası standartlara uygun ürünler' },
    { image: '/images/slide1.jpg', title: 'Müşteri Memnuniyeti', description: 'Müşteri odaklı hizmet anlayışımız' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextWhyUs = () => setWhyUsIndex((whyUsIndex + 1) % 2)
  const prevWhyUs = () => setWhyUsIndex((whyUsIndex - 1 + 2) % 2)

  const scrollToUrunlerimiz = () => {
    urunlerimizRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      product: formData.get('product'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/submit-teklif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Teklif başarıyla gönderildi!');
        // Form alanlarını temizle veya modal'ı kapat
      } else {
        alert('Teklif gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6E9]">
      <header className="bg-[#c89454] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Element Kimya
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-[#FDF6E9] transition-colors duration-300">Ana Sayfa</Link></li>
              <li><button onClick={scrollToUrunlerimiz} className="hover:text-[#FDF6E9] transition-colors duration-300">Ürünlerimiz</button></li>
              <li><Link href="#" className="hover:text-[#FDF6E9] transition-colors duration-300">Hakkımızda</Link></li>
              <li><Link href="#" className="hover:text-[#FDF6E9] transition-colors duration-300">İletişim</Link></li>
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="block py-2 hover:text-[#c89454]">Ana Sayfa</Link>
                <button onClick={scrollToUrunlerimiz} className="block py-2 hover:text-[#c89454] text-left">Ürünlerimiz</button>
                <Link href="#" className="block py-2 hover:text-[#c89454]">Hakkımızda</Link>
                <Link href="#" className="block py-2 hover:text-[#c89454]">İletişim</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        <div className="relative bg-[#c89454] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              layout="fill"
              objectFit="cover"
              className="opacity-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
            <div className="flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-white"
                >
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
                  <p className="text-xl mb-8">{slides[currentSlide].description}</p>
                  <Button size="lg" className="bg-white text-[#c89454] hover:bg-[#FDF6E9]" onClick={scrollToUrunlerimiz}>
                    Ürünleri Keşfet
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <section className="py-16 bg-[#FDF6E9]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#c89454]">Neden Biz?</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyUsData.slice(whyUsIndex * 3, (whyUsIndex * 3) + 3).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white hover:shadow-lg transition-shadow duration-300 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <item.icon className="w-12 h-12 text-[#c89454] mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-[#c89454]">{item.title}</h3>
                        <p className="text-gray-600 flex-grow">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <Button
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-[#c89454] text-white hover:bg-[#b47d3c]"
                onClick={prevWhyUs}
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-[#c89454] text-white hover:bg-[#b47d3c]"
                onClick={nextWhyUs}
                size="icon"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="urunlerimiz" ref={urunlerimizRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#c89454]">Ürünlerimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
              {productCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-[#c89454]">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover mb-4 rounded-md"
                      />
                      <p className="text-gray-600 mb-4">{category.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedProduct(category)} className="bg-[#c89454] text-white hover:bg-[#b47d3c] hover:text-white">
                            Detayları Gör
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                          <div className="sticky top-0 bg-white z-10 pb-4 mb-4 border-b flex justify-between items-center">
                            <DialogHeader>
                              <DialogTitle className="text-[#c89454]">{selectedProduct?.name}</DialogTitle>
                              <DialogDescription>Ürün Detayları</DialogDescription>
                            </DialogHeader>
                            <DialogClose asChild>
                              <Button variant="ghost" className="p-2 rounded-full hover:bg-gray-200">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Kapat</span>
                              </Button>
                            </DialogClose>
                          </div>
                          <div className="grid gap-4 py-4">
                            {selectedProduct?.subProducts.map((subProduct, subIndex) => (
                              <div key={subIndex} className="border rounded-lg p-4">
                                <Button
                                  onClick={() => setSelectedSubProduct(subProduct)}
                                  className="w-full justify-start text-left bg-[#FDF6E9] text-[#c89454] hover:bg-[#c89454] hover:text-white"
                                >
                                  {subProduct.name}
                                </Button>
                                <AnimatePresence>
                                  {selectedSubProduct === subProduct && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-4 grid md:grid-cols-2 gap-4 overflow-hidden"
                                    >
                                      <Image
                                        src={subProduct.image}
                                        alt={subProduct.name}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover rounded-md"
                                      />
                                      <div>
                                        <p className="text-gray-600 mb-2">{subProduct.description}</p>
                                        <h4 className="font-semibold text-[#c89454] mb-2">Özellikler:</h4>
                                        <ul className="list-disc list-inside">
                                          {subProduct.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="text-gray-600">{feature}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-[#c89454] text-white hover:bg-[#b47d3c]">Teklif İste</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Teklif İste</DialogTitle>
                            <DialogDescription>Bu ürün kategorisi için teklif istemek üzere aşağıdaki formu doldurun.</DialogDescription>
                          </DialogHeader>
                          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                İsim
                              </Label>
                              <Input id="name" name="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                E-posta
                              </Label>
                              <Input id="email" name="email" type="email" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="product" className="text-right">
                                Ürün
                              </Label>
                              <Select name="product" defaultValue={category.name}>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Ürün seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={category.name}>{category.name}</SelectItem>
                                  {category.subProducts.map((subProduct, index) => (
                                    <SelectItem key={index} value={subProduct.name}>{subProduct.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="message" className="text-right">
                                Mesaj
                              </Label>
                              <Textarea id="message" name="message" className="col-span-3" />
                            </div>
                            <DialogClose asChild>
                              <Button type="submit" className="ml-auto bg-[#c89454] text-white hover:bg-[#b47d3c]">Teklif İste</Button>
                            </DialogClose>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#c89454] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">İletişim</h3>
              <p>123 Kimya Sokak, İstanbul, Türkiye</p>
              <p>Telefon: +90 123 456 7890</p>
              <p>E-posta: info@elementkimya.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">Ana Sayfa</Link>
                </li>
                <li>
                  <button onClick={scrollToUrunlerimiz} className="hover:underline">Ürünlerimiz</button>
                </li>
                <li>
                  <Link href="#" className="hover:underline">Hakkımızda</Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">İletişim</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#FDF6E9] transition-colors duration-300">
                  <Facebook />
                </a>
                <a href="#" className="hover:text-[#FDF6E9] transition-colors duration-300">
                  <Twitter />
                </a>
                <a href="#" className="hover:text-[#FDF6E9] transition-colors duration-300">
                  <Instagram />
                </a>
                <a href="#" className="hover:text-[#FDF6E9] transition-colors duration-300">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Element Kimya. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}