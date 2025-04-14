'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  id: string | number
  title: string
  price: number
  oldPrice?: number
  image: string
  category: string
  inStock: boolean
  isNew?: boolean
  discount?: number
}

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  image,
  category,
  inStock,
  isNew,
  discount
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addItem } = useCart()
  
  // Форматирование цены с разделителем тысяч
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value)
  }
  
  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    addItem({
      id: id.toString(),
      title,
      price,
      image,
      quantity: 1
    })
  }
  
  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <motion.div
      className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 group hover:bg-white/10 transition-colors duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)' }}
    >
      <div className="relative mb-4">
        {/* Метки (скидка/новинка) */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {discount && discount > 0 && (
            <div className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold">
              -{discount}%
            </div>
          )}
          {isNew && (
            <div className="px-2 py-1 rounded-lg bg-blue-500 text-white text-xs font-semibold">
              Новинка
            </div>
          )}
        </div>
        
        {/* Кнопка избранного */}
        <motion.button
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
        
        {/* Изображение товара */}
        <Link href={`/catalog/product/${id}`}>
          <div className="relative h-48 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/5 to-red-500/5 group-hover:from-blue-500/10 group-hover:to-red-500/10 transition-colors">
            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                <div className="text-gray-400 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Нет изображения</span>
                </div>
              </div>
            ) : (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain p-2"
                onError={handleImageError}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      </div>
      
      {/* Категория */}
      <Link href={`/catalog/category/${category}`}>
        <p className="text-blue-400 text-xs mb-1 hover:underline">{category}</p>
      </Link>
      
      {/* Название */}
      <Link href={`/catalog/product/${id}`}>
        <h3 className="text-white font-medium text-lg mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
          {title}
        </h3>
      </Link>
      
      {/* Статус наличия */}
      <div className="mb-4 flex items-center">
        {inStock ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-blue mr-2"></div>
            <span className="text-xs text-green-400">В наличии</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
            <span className="text-xs text-gray-400">Под заказ</span>
          </>
        )}
      </div>
      
      {/* Цена */}
      <div className="mb-4">
        <div className="flex items-end gap-2">
          <span className="text-white text-xl font-bold">{formatPrice(price)} ₽</span>
          {oldPrice && oldPrice > price && (
            <span className="text-gray-400 text-sm line-through">{formatPrice(oldPrice)} ₽</span>
          )}
        </div>
      </div>
      
      {/* Кнопка добавления в корзину */}
      <motion.button
        className="relative w-full overflow-hidden rounded-xl group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative px-6 py-2.5 text-white text-sm font-medium transition-all flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>В корзину</span>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default ProductCard 