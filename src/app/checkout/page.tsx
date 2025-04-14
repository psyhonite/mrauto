'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { ChevronLeft, CreditCard, Truck, Home, MapPin, Phone, Mail, User, Package, ShoppingBag, CheckCircle } from 'lucide-react'

// Типы данных для формы заказа
interface OrderFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  address: string
  deliveryMethod: 'courier' | 'pickup'
  paymentMethod: 'card' | 'cash'
  comment: string
  agreement: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  
  // Состояния для управления процессом оформления
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  // Состояние формы
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: '',
    agreement: false
  })
  
  // Состояние ошибок формы
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Проверка на пустую корзину
  if (items.length === 0 && !isSuccess) {
    router.push('/cart')
    return null
  }
  
  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Сбрасываем ошибку при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  
  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон'
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный телефон'
    }
    
    if (formData.deliveryMethod === 'courier') {
      if (!formData.city.trim()) {
        newErrors.city = 'Введите город'
      }
      
      if (!formData.address.trim()) {
        newErrors.address = 'Введите адрес'
      }
    }
    
    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие с условиями'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Здесь будет запрос к API для создания заказа
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Генерируем случайный номер заказа
      const generatedOrderNumber = `MR${Math.floor(100000 + Math.random() * 900000)}`
      setOrderNumber(generatedOrderNumber)
      
      // Очищаем корзину и показываем страницу успешного заказа
      clearCart()
      setIsSuccess(true)
    } catch (error) {
      console.error('Ошибка при создании заказа:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }
  
  // Отображение страницы успешного заказа
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center"
          >
            <div className="bg-green-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Заказ успешно оформлен</h1>
            <p className="text-gray-400 mb-6">
              Ваш заказ №{orderNumber} принят в обработку. 
              Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
            </p>
            
            <div className="bg-slate-800 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Сумма заказа:</span>
                <span className="font-semibold">{formatPrice(totalPrice)} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Способ оплаты:</span>
                <span className="font-semibold">
                  {formData.paymentMethod === 'card' ? 'Банковская карта' : 'Наличными'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl transition-colors"
                >
                  На главную
                </motion.button>
              </Link>
              <Link href="/catalog" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-4 rounded-xl transition-all"
                >
                  Продолжить покупки
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-950 text-white py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Вернуться в корзину
          </Link>
          <h1 className="text-3xl font-bold mb-2">Оформление заказа</h1>
          <p className="text-gray-400">Заполните форму для оформления заказа</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма оформления */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Контактная информация */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  Контактная информация
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-gray-400 mb-1">
                      Имя*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full bg-slate-800 border ${errors.firstName ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-gray-400 mb-1">
                      Фамилия*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full bg-slate-800 border ${errors.lastName ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                      Email*
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">
                      Телефон*
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (___) ___-__-__"
                        className={`w-full bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Доставка */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-400" />
                  Способ доставки
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <label className={`
                    flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                    ${formData.deliveryMethod === 'courier' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-700 bg-slate-800 hover:bg-slate-700'}
                  `}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center mr-3
                        ${formData.deliveryMethod === 'courier' 
                          ? 'border-blue-500' 
                          : 'border-slate-600'}
                      `}>
                        {formData.deliveryMethod === 'courier' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">Курьерская доставка</div>
                        <div className="text-sm text-gray-400">Доставка до двери</div>
                      </div>
                    </div>
                  </label>
                  
                  <label className={`
                    flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                    ${formData.deliveryMethod === 'pickup' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-700 bg-slate-800 hover:bg-slate-700'}
                  `}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center mr-3
                        ${formData.deliveryMethod === 'pickup' 
                          ? 'border-blue-500' 
                          : 'border-slate-600'}
                      `}>
                        {formData.deliveryMethod === 'pickup' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">Самовывоз</div>
                        <div className="text-sm text-gray-400">Из магазина МистерАвто</div>
                      </div>
                    </div>
                  </label>
                </div>
                
                {formData.deliveryMethod === 'courier' && (
                  <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                    <h3 className="font-medium mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      Адрес доставки
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-sm text-gray-400 mb-1">
                          Город*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full bg-slate-800 border ${errors.city ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm text-gray-400 mb-1">
                          Адрес*
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Улица, дом, квартира"
                          className={`w-full bg-slate-800 border ${errors.address ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.deliveryMethod === 'pickup' && (
                  <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Home className="w-4 h-4 mr-2 text-blue-400" />
                      Пункт самовывоза
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-gray-300">Адрес магазина: <span className="text-white">г. Москва, ул. Автомобильная, д. 10</span></p>
                      <p className="text-gray-300">Время работы: <span className="text-white">Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00</span></p>
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg h-40 overflow-hidden">
                      {/* Здесь может быть карта или изображение магазина */}
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Карта проезда
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Способ оплаты */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
                  Способ оплаты
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <label className={`
                    flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                    ${formData.paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-700 bg-slate-800 hover:bg-slate-700'}
                  `}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center mr-3
                        ${formData.paymentMethod === 'card' 
                          ? 'border-blue-500' 
                          : 'border-slate-600'}
                      `}>
                        {formData.paymentMethod === 'card' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">Банковская карта</div>
                        <div className="text-sm text-gray-400">Онлайн оплата</div>
                      </div>
                    </div>
                  </label>
                  
                  <label className={`
                    flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                    ${formData.paymentMethod === 'cash' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-700 bg-slate-800 hover:bg-slate-700'}
                  `}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center mr-3
                        ${formData.paymentMethod === 'cash' 
                          ? 'border-blue-500' 
                          : 'border-slate-600'}
                      `}>
                        {formData.paymentMethod === 'cash' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">Наличными</div>
                        <div className="text-sm text-gray-400">При получении</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Комментарий к заказу */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Комментарий к заказу</h2>
                
                <textarea
                  name="comment"
                  id="comment"
                  rows={3}
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Дополнительная информация к заказу"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
              
              {/* Согласие с условиями */}
              <div className="mb-6">
                <label className="flex items-start cursor-pointer">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleChange}
                      className="w-4 h-4 accent-blue-500"
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <span className="text-gray-300">Я согласен с </span>
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      условиями пользовательского соглашения
                    </Link>
                    <span className="text-gray-300"> и обработкой персональных данных</span>
                  </div>
                </label>
                {errors.agreement && (
                  <p className="mt-1 text-sm text-red-500">{errors.agreement}</p>
                )}
              </div>
              
              {/* Кнопка оформления заказа */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Оформление...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Оформить заказ
                  </>
                )}
              </motion.button>
            </form>
          </div>
          
          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-xl border border-slate-800 sticky top-24">
              <div className="p-4 border-b border-slate-800">
                <h2 className="font-semibold flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-400" />
                  Ваш заказ
                </h2>
              </div>
              
              <div className="p-4">
                {/* Список товаров в заказе */}
                <div className="mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 mb-3 pb-3 border-b border-slate-800 last:border-0 last:mb-0 last:pb-0">
                      <div className="relative w-16 h-16 bg-slate-800 rounded-md border border-slate-700 overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate mb-1">
                          {item.title}
                        </h4>
                        <div className="text-sm text-gray-400">
                          {formatPrice(item.price * item.quantity)} ₽
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)} ₽
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Итоговая сумма и скидки */}
                <div className="space-y-3 py-3 border-t border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Товары ({items.length}):</span>
                    <span>{formatPrice(totalPrice)} ₽</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Скидка:</span>
                    <span className="text-green-500">0 ₽</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Доставка:</span>
                    <span>Бесплатно</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-semibold">Итого:</span>
                  <span className="text-xl font-bold">{formatPrice(totalPrice)} ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 