'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, StarHalf, ShieldCheck, Truck, Clock, Share2, Heart } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'

// Тестовые данные для продукта
const mockProduct = {
  id: '1',
  title: 'Масло моторное синтетическое Shell Helix Ultra ECT 5W-30',
  price: 4500,
  image: '/images/product-1.jpg',
  gallery: [
    '/images/product-1.jpg',
    '/images/product-1-1.jpg',
    '/images/product-1-2.jpg',
  ],
  brand: 'Shell',
  rating: 4.5,
  reviews: 28,
  inStock: true,
  availability: 'В наличии',
  sku: 'SH-5W30-ECT-4L',
  category: 'Масла моторные',
  description: 'Полностью синтетическое моторное масло – уникальная, современная формула Shell, специально разработанная для двигателей, оснащенных системами снижения токсичности выхлопных газов.',
  features: [
    'Защита сажевых фильтров',
    'Экономия топлива до 3%',
    'Мгновенная смазка при холодном пуске',
    'Увеличенный интервал замены',
    'Для бензиновых и дизельных двигателей'
  ],
  specifications: {
    'Тип': 'Синтетическое',
    'Вязкость SAE': '5W-30',
    'Объем': '4 литра',
    'Стандарты': 'ACEA C3, API SN, BMW LL-04, MB 229.51/229.31, VW 504.00/507.00',
    'Допуски': 'BMW LL-04, MB 229.51/229.31, VW 504.00/507.00'
  }
}

// Анимационные варианты
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState(mockProduct)
  const [activeImage, setActiveImage] = useState(mockProduct.gallery[0])
  const [loading, setLoading] = useState(true)
  
  // Эмуляция загрузки данных продукта с сервера
  useEffect(() => {
    // Здесь в реальном приложении был бы запрос к API
    // fetch(`/api/products/${params.productId}`)
    
    // Эмулируем задержку загрузки
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [params.productId])
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Breadcrumbs и кнопка назад */}
      <motion.div 
        className="flex items-center mb-8"
        variants={fadeInUp}
      >
        <Link href="/catalog" className="text-blue-500 hover:text-blue-600 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад в каталог
        </Link>
        <span className="mx-3 text-gray-400">/</span>
        <span className="text-gray-400">Масла моторные</span>
        <span className="mx-3 text-gray-400">/</span>
        <span className="text-gray-400 truncate max-w-[200px]">{product.title}</span>
      </motion.div>
      
      {/* Основной контент */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Галерея изображений */}
        <motion.div variants={fadeInUp}>
          <div className="bg-slate-900 rounded-2xl overflow-hidden mb-4">
            <div className="relative aspect-square">
              <Image 
                src={activeImage} 
                alt={product.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
          {/* Миниатюры */}
          <div className="grid grid-cols-4 gap-2">
            {product.gallery.map((img, idx) => (
              <div 
                key={idx}
                className={`
                  cursor-pointer relative bg-slate-900 rounded-lg overflow-hidden aspect-square
                  ${activeImage === img ? 'ring-2 ring-blue-500' : ''}
                `}
                onClick={() => setActiveImage(img)}
              >
                <Image 
                  src={img} 
                  alt={`${product.title} - изображение ${idx + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="100px"
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Информация о продукте */}
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold mb-3"
            variants={fadeInUp}
          >
            {product.title}
          </motion.h1>
          
          <motion.div 
            className="flex items-center mb-5"
            variants={fadeInUp}
          >
            <div className="flex items-center text-yellow-500 mr-3">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <StarHalf className="w-4 h-4 fill-current" />
              <span className="ml-2 text-white">{product.rating}</span>
            </div>
            <span className="text-gray-400">
              ({product.reviews} отзывов)
            </span>
            <span className="mx-3 text-gray-500">•</span>
            <span className="text-gray-400">Артикул: {product.sku}</span>
          </motion.div>
          
          <motion.div 
            className="bg-slate-800/50 rounded-xl p-5 mb-6"
            variants={fadeInUp}
          >
            <div className="text-3xl font-bold mb-4">
              {product.price.toLocaleString()} ₽
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center text-sm">
                <ShieldCheck className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Гарантия качества</span>
              </div>
              <div className="flex items-center text-sm">
                <Truck className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-gray-300">Доставка от 2 часов</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-amber-500 mr-2" />
                <span className="text-gray-300">Самовывоз 24/7</span>
              </div>
            </div>
            
            <div className="mb-5">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {product.availability}
              </div>
            </div>
            
            {/* Кнопка добавления в корзину */}
            <AddToCartButton product={product} />
            
            {/* Дополнительные действия */}
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center text-gray-400 hover:text-white">
                <Heart className="w-5 h-5 mr-1" />
                <span className="text-sm">В избранное</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-white">
                <Share2 className="w-5 h-5 mr-1" />
                <span className="text-sm">Поделиться</span>
              </button>
            </div>
          </motion.div>
          
          {/* Описание */}
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
          >
            <h2 className="text-xl font-bold mb-3">Описание</h2>
            <p className="text-gray-300">{product.description}</p>
          </motion.div>
          
          {/* Особенности */}
          <motion.div 
            className="mb-6"
            variants={fadeInUp}
          >
            <h2 className="text-xl font-bold mb-3">Особенности</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </motion.div>
          
          {/* Спецификации */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-xl font-bold mb-3">Спецификации</h2>
            <div className="bg-slate-800/30 rounded-xl overflow-hidden">
              {Object.entries(product.specifications).map(([key, value], idx) => (
                <div 
                  key={idx}
                  className={`flex py-3 px-4 ${idx % 2 === 0 ? 'bg-slate-800/50' : ''}`}
                >
                  <div className="w-1/3 text-gray-400">{key}</div>
                  <div className="w-2/3 text-white">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 