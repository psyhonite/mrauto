'use client'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites, Product } from '@/context/FavoritesContext'

interface FavoriteButtonProps {
  product: Product
  className?: string
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function FavoriteButton({
  product,
  className = '',
  iconOnly = false,
  size = 'md'
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isInFavorites = isFavorite(product.id)
  
  // Размеры иконки в зависимости от параметра size
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  // Размеры кнопки в зависимости от параметра size
  const buttonSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  }
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    toggleFavorite(product)
  }
  
  // Вариант с текстом и иконкой
  if (!iconOnly) {
    return (
      <button
        onClick={handleClick}
        className={`group flex items-center transition-all ${
          isInFavorites ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
        } ${className}`}
        aria-label={isInFavorites ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          className="flex items-center"
        >
          <Heart 
            className={`${iconSizes[size]} mr-1.5 ${isInFavorites ? 'fill-red-500' : 'group-hover:fill-red-400/10'}`} 
          />
          <span className="text-sm">
            {isInFavorites ? 'В избранном' : 'В избранное'}
          </span>
        </motion.div>
      </button>
    )
  }
  
  // Вариант только с иконкой
  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 transition-colors ${
        buttonSizes[size]
      } ${
        isInFavorites ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
      } ${className}`}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isInFavorites ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <Heart 
        className={`${iconSizes[size]} ${isInFavorites ? 'fill-red-500' : 'group-hover:fill-red-400/10'}`} 
      />
    </motion.button>
  )
} 