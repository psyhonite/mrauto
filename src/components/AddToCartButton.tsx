'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { useCart, CartItem } from '@/context/CartContext'

interface AddToCartButtonProps {
  product: {
    id: string
    title: string
    price: number
    image: string
    inStock: boolean
  }
  className?: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = '' }) => {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  
  // Обработчик изменения количества
  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    setQuantity(value)
  }
  
  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: String(product.id),
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.image,
      inStock: product.inStock
    }
    
    addItem(cartItem)
    
    // Показываем индикатор успешного добавления
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }
  
  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {/* Контроль количества */}
      <div className="flex items-center">
        <button 
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-l-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-gray-400"
          aria-label="Уменьшить количество"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input 
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-12 h-8 bg-slate-800 border-x border-slate-700 text-center text-white focus:outline-none"
        />
        <button 
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 rounded-r-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white"
          aria-label="Увеличить количество"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Кнопка добавления в корзину */}
      <motion.button
        onClick={handleAddToCart}
        disabled={!product.inStock || isAdded}
        className={`
          flex items-center justify-center py-3 px-4 rounded-xl font-medium transition-all
          ${isAdded 
            ? 'bg-green-600 text-white' 
            : product.inStock 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }
        `}
        whileHover={product.inStock && !isAdded ? { scale: 1.02 } : {}}
        whileTap={product.inStock && !isAdded ? { scale: 0.98 } : {}}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Добавлено в корзину
          </>
        ) : product.inStock ? (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Добавить в корзину
          </>
        ) : (
          'Нет в наличии'
        )}
      </motion.button>
    </div>
  )
}

export default AddToCartButton 