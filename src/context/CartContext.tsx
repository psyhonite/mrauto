'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'

// Тип элемента корзины
export type CartItem = {
  id: string
  title: string
  price: number
  image: string
  quantity: number
  inStock?: boolean
}

// Интерфейс контекста корзины
interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

// Создаем контекст с начальным значением
export const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {}
})

// Провайдер контекста корзины
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Состояние корзины
  const [items, setItems] = useState<CartItem[]>([])
  
  // Общее количество товаров и общая стоимость
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  
  // Загружаем корзину из локального хранилища при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
  }, [])
  
  // Обновляем локальное хранилище при изменении корзины
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
    
    // Обновляем общее количество и стоимость
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    setTotalItems(itemCount)
    setTotalPrice(cartTotal)
  }, [items])
  
  // Добавление товара в корзину
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Проверяем, есть ли такой товар уже в корзине
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id)
      
      if (existingItemIndex !== -1) {
        // Если товар уже в корзине, увеличиваем количество
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        // Иначе добавляем новый товар
        return [...prevItems, item]
      }
    })
  }
  
  // Удаление товара из корзины
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }
  
  // Обновление количества товара
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }
  
  // Очистка корзины
  const clearCart = () => {
    setItems([])
  }
  
  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Хук для использования контекста корзины
export const useCart = () => useContext(CartContext) 