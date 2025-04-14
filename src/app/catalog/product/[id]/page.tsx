'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart, Star, Truck, Shield, BadgeCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Интерфейс для объекта товара
interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  brand: string;
  isNew?: boolean;
  discount?: number;
  description?: string;
  specifications?: { [key: string]: string };
}

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  
  // Состояния
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');
  
  // Получаем функции для работы с корзиной
  const { addItem } = useCart();
  
  // Получение данных о товаре
  useEffect(() => {
    // Имитация загрузки товара с сервера
    const timer = setTimeout(() => {
      // В реальном приложении здесь был бы запрос к API
      // для примера используем объект с тестовыми данными
      const mockProduct: Product = {
        id: id as string,
        title: 'Моторное масло Castrol EDGE 5W-30 синтетическое, 4 л',
        price: 3750,
        oldPrice: 4200,
        image: '/images/products/motor-oil.png',
        category: 'Масла и жидкости',
        inStock: true,
        brand: 'Castrol',
        isNew: true,
        discount: 11,
        description: `
          Полностью синтетическое моторное масло Castrol EDGE произведено с использованием новейшей технологии TITANIUM FST™, придающей масляной пленке дополнительную силу и прочность благодаря соединениям титана.
          
          TITANIUM FST™ радикально меняет поведение масла в условиях высоких нагрузок, формируя дополнительный ударопоглощающий слой. Испытания подтвердили, что TITANIUM FST™ в 2 раза увеличивает прочность пленки, предотвращая ее разрыв и снижая трение для максимальной производительности двигателя.
          
          Основные преимущества:
          - Создает дополнительную защиту для самых требовательных условий вождения
          - Повышает эффективность работы двигателя, независимо от скорости
          - Обеспечивает непревзойденный уровень защиты различных типов двигателей
          - Снижает отложения для увеличения отзывчивости двигателя
        `,
        specifications: {
          'Тип': 'Синтетическое',
          'Вязкость (SAE)': '5W-30',
          'Объем': '4 литра',
          'Применимость': 'Легковые автомобили',
          'Стандарты': 'ACEA C3, API SN/CF',
          'Допуски': 'MB-Approval 229.31/ 229.51, VW 504 00/ 507 00',
          'Страна производства': 'Германия',
          'Класс энергосбережения': 'A3/B4',
          'Особенности': 'С технологией Titanium FST™'
        }
      }
      
      setProduct(mockProduct)
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [id])
  
  // Форматирование цены с разделителем тысяч
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value)
  }
  
  // Уменьшение количества
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  // Увеличение количества
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  
  // Добавление в корзину
  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity
    })
  }
  
  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true)
  }
  
  // Если товар загружается
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Загрузка товара...</p>
          </div>
        </div>
      </div>
    )
  }
  
  // Если товар не найден
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white py-32">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center max-w-xl mx-auto">
            <div className="text-4xl mb-4">😕</div>
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <p className="text-gray-400 mb-6">Запрашиваемый товар не существует или был удален</p>
            <Link href="/catalog">
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl transition-colors">
                Вернуться в каталог
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-950 text-white py-32">
      <div className="container mx-auto px-4">
        {/* Навигация */}
        <div className="mb-6">
          <Link href="/catalog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Вернуться в каталог
          </Link>
          
          {/* Путь (хлебные крошки) */}
          <div className="flex flex-wrap items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-blue-400">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/catalog" className="hover:text-blue-400">Каталог</Link>
            <span className="mx-2">/</span>
            <Link href={`/catalog/category/${product.category}`} className="hover:text-blue-400">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
        
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Изображение товара */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Метки (скидка/новинка) */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.discount && product.discount > 0 && (
                <div className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold">
                  -{product.discount}%
                </div>
              )}
              {product.isNew && (
                <div className="px-2 py-1 rounded-lg bg-blue-500 text-white text-xs font-semibold">
                  Новинка
                </div>
              )}
            </div>
            
            <div className="relative h-[400px] w-full">
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Изображение недоступно</span>
                  </div>
                </div>
              ) : (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  onError={handleImageError}
                />
              )}
            </div>
          </motion.div>
          
          {/* Информация о товаре */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                4 из 5 | 12 отзывов
              </span>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <span className="text-3xl font-bold">{formatPrice(product.price)} ₽</span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-gray-400 text-lg line-through ml-2">
                    {formatPrice(product.oldPrice)} ₽
                  </span>
                )}
              </div>
              {product.inStock ? (
                <div className="flex items-center text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>В наличии</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                  <span>Под заказ</span>
                </div>
              )}
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-gray-400 text-sm">Бренд:</span>
                  <div>{product.brand}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Артикул:</span>
                  <div>ART-{product.id.toString().padStart(6, '0')}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Категория:</span>
                  <div>{product.category}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Гарантия:</span>
                  <div>12 месяцев</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-gray-400 mr-2">Количество:</span>
                <div className="flex items-center">
                  <button 
                    className="w-8 h-8 bg-white/5 rounded-l-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-12 h-8 bg-white/5 border-none text-center text-white"
                    min="1"
                  />
                  <button 
                    className="w-8 h-8 bg-white/5 rounded-r-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-400 ml-4">Доступно: 15 шт.</span>
              </div>
              
              <div className="flex gap-4 mt-4">
                <motion.button
                  className="relative flex-1 overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-90 hover:opacity-100 transition-opacity"></div>
                  <div className="relative px-6 py-3 text-white font-medium flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span>В корзину</span>
                  </div>
                </motion.button>
                
                <motion.button
                  className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 text-white flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Купить в 1 клик
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center">
                <Truck className="w-5 h-5 text-blue-400 mr-3" />
                <div className="text-sm">
                  <div className="font-medium">Быстрая доставка</div>
                  <div className="text-gray-400">от 2 дней</div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center">
                <Shield className="w-5 h-5 text-blue-400 mr-3" />
                <div className="text-sm">
                  <div className="font-medium">Гарантия качества</div>
                  <div className="text-gray-400">12 месяцев</div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center">
                <BadgeCheck className="w-5 h-5 text-blue-400 mr-3" />
                <div className="text-sm">
                  <div className="font-medium">Оригинальный товар</div>
                  <div className="text-gray-400">от производителя</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Вкладки (описание и характеристики) */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex border-b border-white/10 mb-6">
            <button
              className={`pb-3 px-4 text-lg font-medium relative ${
                activeTab === 'description' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Описание
              {activeTab === 'description' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="activeTab"
                />
              )}
            </button>
            <button
              className={`pb-3 px-4 text-lg font-medium relative ${
                activeTab === 'specifications' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Характеристики
              {activeTab === 'specifications' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="activeTab"
                />
              )}
            </button>
          </div>
          
          <div>
            {activeTab === 'description' ? (
              <div className="prose prose-invert max-w-none">
                {product.description?.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={i} className="flex pb-2 border-b border-white/10">
                    <div className="w-1/2 text-gray-400">{key}:</div>
                    <div className="w-1/2 font-medium">{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Похожие товары */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Похожие товары</h2>
            <Link href="/catalog" className="text-blue-400 hover:text-blue-300 flex items-center">
              Все товары
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col"
              >
                <div className="relative h-40 mb-4">
                  <div className="absolute inset-0 rounded-lg bg-slate-800 flex items-center justify-center">
                    <span className="text-gray-500">Изображение товара</span>
                  </div>
                </div>
                <div className="h-10 bg-white/5 rounded mb-2"></div>
                <div className="h-6 w-1/2 bg-white/5 rounded mb-4"></div>
                <div className="mt-auto">
                  <div className="h-8 bg-gradient-to-r from-blue-600/30 to-blue-500/30 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 