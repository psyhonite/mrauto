'use client'

import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CartContext } from '@/context/CartContext'

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useContext(CartContext)

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
  }

  return (
    <div className="relative">
      {/* Иконка корзины с количеством товаров */}
      <button 
        className="flex items-center space-x-1 text-white relative transition-colors duration-200 hover:text-blue-400"
        onClick={toggleCart}
        aria-label="Корзина"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Выпадающая мини-корзина */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-72 sm:w-96 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Корзина ({totalItems})</h3>
              <button onClick={toggleCart} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>

            <div className={`max-h-96 overflow-y-auto ${items.length === 0 ? 'p-4 text-center text-gray-500' : ''}`}>
              {items.length === 0 ? (
                <p>Ваша корзина пуста</p>
              ) : (
                <ul>
                  {items.map((item) => (
                    <li key={item.id} className="p-4 border-b border-gray-100 flex items-center">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-800 truncate">{item.title}</h4>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                        
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="mx-2 w-6 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                          >
                            +
                          </button>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                            aria-label="Удалить товар"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-600">Итого:</span>
                  <span className="font-bold text-gray-800">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href="/cart" 
                    onClick={toggleCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-center transition-colors duration-200"
                  >
                    Перейти в корзину
                  </Link>
                  <Link 
                    href="/checkout" 
                    onClick={toggleCart}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-center transition-colors duration-200"
                  >
                    Оформить заказ
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay для закрытия корзины при клике вне ее */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={toggleCart}
        />
      )}
    </div>
  )
} 