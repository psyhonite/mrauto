import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'МистерАвто.рф - Автозапчасти и автосервис',
  description: 'Магазин автозапчастей, автосервис, автомойка и шиномонтаж. Широкий выбор запчастей, масел, аккумуляторов, шин и дисков.',
  keywords: 'автозапчасти, автосервис, автомойка, шиномонтаж, запчасти, масла, аккумуляторы, шины, диски',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
} 