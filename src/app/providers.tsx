'use client'

import { ThemeProvider } from 'next-themes'
import { FavoritesProvider } from '@/context/FavoritesContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </ThemeProvider>
  )
} 