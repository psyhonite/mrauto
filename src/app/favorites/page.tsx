'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingCart, ArrowRight, Heart, Search, X } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import FavoriteButton from '@/components/FavoriteButton'
import AddToCartButton from '@/components/AddToCartButton'

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, favoritesCount, clearFavorites } = useFavorites()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredFavorites, setFilteredFavorites] = useState(favorites)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Применяем фильтр поиска при изменении запроса или списка избранного
  useEffect(() => {
    const filtered = favorites.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredFavorites(filtered)
  }, [searchQuery, favorites])
  
  // Имитация загрузки данных для плавной анимации
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])
  
  // Анимация появления списка
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  
  // Преобразуем продукт из избранного в формат, совместимый с AddToCartButton
  const mapProductForCart = (product: any) => {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      inStock: product.availability !== 'Нет в наличии'
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0A1128] text-white pt-24 pb-16 relative"
    >
      {/* Фоновая сетка и звезды */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />

        {/* Звезды - фиксированные точки */}
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
            }}
          />
        ))}
        
        {/* Анимированные звезды/частицы */}
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`animated-${index}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [Math.random() * 0.5 + 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Диагональные линии */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-top-left" />
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden opacity-10">
          <div className="absolute bottom-0 right-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-bottom-right" />
        </div>
        
        {/* Вертикальные и горизонтальные линии */}
        <div className="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-70" />
        <div className="absolute right-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent opacity-70" />
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-70" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-70" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-red-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="flex flex-col items-center mb-12">
          {/* Заголовок страницы */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                Избранное
                {favoritesCount > 0 && (
                  <span className="ml-2 text-lg font-normal text-gray-400">
                    ({favoritesCount})
                  </span>
                )}
              </h1>
              <p className="text-gray-400">
                Сохраняйте товары, которые вам понравились, чтобы вернуться к ним позже
              </p>
            </div>
            
            {favoritesCount > 0 && (
              <button
                onClick={clearFavorites}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Очистить всё
              </button>
            )}
          </div>
          
          {/* Поиск по избранному */}
          {favoritesCount > 0 && (
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск в избранном..."
                  className="w-full md:max-w-md px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Список избранных товаров */}
          {favoritesCount === 0 ? (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-slate-800/80 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Список избранного пуст</h2>
              <p className="text-gray-400 mb-6">
                Добавляйте товары в избранное, чтобы они отображались здесь
              </p>
              <Link href="/catalog" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Перейти в каталог
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredFavorites.length === 0 ? (
                <div className="col-span-full bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 text-center">
                  <p className="text-gray-300 mb-4">По запросу "{searchQuery}" ничего не найдено</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    Сбросить поиск
                  </button>
                </div>
              ) : (
                filteredFavorites.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={item}
                    className="bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all group"
                  >
                    <Link href={`/catalog/${product.slug || product.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Значок избранного */}
                        <div className="absolute top-2 right-2 z-10">
                          <FavoriteButton product={product} iconOnly size="md" />
                        </div>
                        
                        {/* Скидка */}
                        {product.oldPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium mb-2 leading-tight line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center text-sm mb-2">
                          {product.category && (
                            <span className="text-gray-400">
                              {product.category}
                              {product.brand && <span className="mx-1">•</span>}
                            </span>
                          )}
                          {product.brand && (
                            <span className="text-gray-400">{product.brand}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <div className="font-bold text-lg">{product.price.toLocaleString('ru-RU')} ₽</div>
                            {product.oldPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                {product.oldPrice.toLocaleString('ru-RU')} ₽
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <AddToCartButton product={mapProductForCart(product)} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 