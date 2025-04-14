'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useRef, useState, useEffect } from 'react'

// Тип для товара
export interface Product {
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

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
  loading?: boolean
}

const ProductGrid = ({ products, title, subtitle, loading = false }: ProductGridProps) => {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Анимация для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  // Анимация для элементов
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
              {title}
            </h2>
            {subtitle && <p className="text-xl text-gray-300">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 h-[380px] animate-pulse">
              <div className="h-48 w-full bg-gray-700/30 rounded-lg mb-4"></div>
              <div className="h-3 bg-gray-700/30 rounded w-1/4 mb-2"></div>
              <div className="h-5 bg-gray-700/30 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700/30 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-700/30 rounded w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-700/30 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12" ref={containerRef}>
      {title && (
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
            {title}
          </h2>
          {subtitle && <p className="text-xl text-gray-300">{subtitle}</p>}
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                category={product.category}
                inStock={product.inStock}
                isNew={product.isNew}
                discount={product.discount}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">
              Товары не найдены. Измените параметры поиска.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ProductGrid 