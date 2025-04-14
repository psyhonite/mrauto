import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from '@/app/providers'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'МистерАвто - Автозапчасти и автосервис',
  description: 'Магазин автозапчастей и автосервис в одном месте. Широкий ассортимент запчастей, аксессуаров и профессиональный сервис.',
  keywords: 'автозапчасти, автосервис, ремонт авто, шины, диски, масла, аксессуары',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
} 