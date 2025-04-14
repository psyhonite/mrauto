'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }
  
  // Анимация для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }
  
  // Анимация для элементов
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  // Если корзина пуста
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 p-8 rounded-2xl mb-8 border border-slate-800"
            >
              <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-gray-500" />
              <h1 className="text-3xl font-bold mb-4">Ваша корзина пуста</h1>
              <p className="text-gray-400 mb-8 max-w-md">
                Похоже, вы еще не добавили товары в корзину.
                Перейдите в каталог, чтобы найти необходимые автозапчасти.
              </p>
              <Link href="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center mx-auto"
                >
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Перейти в каталог
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-950 text-white py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Вернуться в каталог
          </Link>
          <h1 className="text-3xl font-bold">Корзина</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Список товаров */}
          <motion.div 
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h2 className="font-semibold">Товары в корзине</h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Очистить корзину
                </button>
              </div>
              
              <div className="divide-y divide-slate-800">
                {items.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="p-4 flex flex-col sm:flex-row items-start gap-4"
                    variants={itemVariants}
                  >
                    {/* Изображение товара */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    {/* Информация о товаре */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                        <div className="text-xl font-bold text-white sm:text-right mb-2 sm:mb-0">
                          {formatPrice(item.price * item.quantity)} ₽
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-4">
                        {formatPrice(item.price)} ₽ за шт.
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Контроль количества */}
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-l-md transition-colors"
                            aria-label="Уменьшить количество"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                            className="w-12 h-8 text-center bg-slate-800 border-x border-slate-700 text-white focus:outline-none"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-r-md transition-colors"
                            aria-label="Увеличить количество"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Удаление товара */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                          aria-label="Удалить товар"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span>Удалить</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Сводка и оформление заказа */}
          <div className="lg:col-span-4">
            <motion.div 
              className="bg-slate-900 rounded-xl border border-slate-800 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-4 border-b border-slate-800">
                <h2 className="font-semibold">Сводка заказа</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Товары ({items.length}):</span>
                  <span>{formatPrice(totalPrice)} ₽</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Скидка:</span>
                  <span className="text-green-500">0 ₽</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Доставка:</span>
                  <span>Бесплатно</span>
                </div>
                
                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-semibold">Итого:</span>
                  <span className="text-xl font-bold">{formatPrice(totalPrice)} ₽</span>
                </div>
                
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center mt-4"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <ShoppingBag className="w-5 h-5 mr-2" />
                    )}
                    Оформить заказ
                  </motion.button>
                </Link>
                
                <p className="text-xs text-gray-500 text-center">
                  Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями 
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300 ml-1">
                    пользовательского соглашения
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 