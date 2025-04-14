'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Тип для товара
export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  slug?: string
  category?: string
  brand?: string
  availability?: string
}

// Интерфейс контекста для избранного
interface FavoritesContextValue {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
  toggleFavorite: (product: Product) => void
  favoritesCount: number
}

// Создание контекста
const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

// Поставщик контекста
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Загрузка избранных товаров из localStorage при монтировании
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error)
        setFavorites([])
      }
    }
    setIsInitialized(true)
  }, [])

  // Сохранение избранных товаров в localStorage при изменении
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, isInitialized])

  // Добавление товара в избранное
  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      // Проверяем, есть ли уже этот товар в избранном
      if (prev.some(item => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  // Удаление товара из избранного
  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId))
  }

  // Проверка, находится ли товар в избранном
  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId)
  }

  // Очистка всех избранных товаров
  const clearFavorites = () => {
    setFavorites([])
  }

  // Переключение статуса избранного
  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  // Количество товаров в избранном
  const favoritesCount = favorites.length

  // Значение контекста
  const value: FavoritesContextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    toggleFavorite,
    favoritesCount
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Хук для использования контекста
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
} 