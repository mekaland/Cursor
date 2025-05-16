import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lüks Kuyumcu - Altın ve Gümüş Takılar',
  description: 'En kaliteli altın ve gümüş takılar, pırlanta ve mücevherler için güvenilir adresiniz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-yellow-600">
                Lüks Kuyumcu
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Ana Sayfa
                </Link>
                <Link href="/urunler" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Ürünler
                </Link>
                <Link href="/hakkimizda" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Hakkımızda
                </Link>
                <Link href="/iletisim" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  İletişim
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <div className="pt-16">
          {children}
        </div>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Lüks Kuyumcu</h3>
                <p className="text-gray-400">
                  Kaliteli ürünler, uygun fiyatlar ve profesyonel hizmet için doğru adres.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/urunler" className="text-gray-400 hover:text-white transition-colors">
                      Ürünler
                    </Link>
                  </li>
                  <li>
                    <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">
                      Hakkımızda
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">
                      İletişim
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Adres: Örnek Mahallesi, Örnek Sokak No:1</li>
                  <li>Telefon: 05347043478</li>
                  <li>E-posta: info@lukskuyumcu.com</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Çalışma Saatleri</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Pazartesi - Cumartesi: 09:00 - 20:00</li>
                  <li>Pazar: 10:00 - 18:00</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Lüks Kuyumcu. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 