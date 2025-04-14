"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ArrowUpDown, X, Loader2, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/catalog/ProductCard';
import { ProductFilters, Category, Brand, PriceRange, ProductSort, ProductSearch, MobileFilterSort } from '@/components/catalog/ProductFilters';
import Pagination from '@/components/catalog/Pagination';
import { cn } from '@/lib/utils';

// Тестовые данные для категорий
const testCategories: Category[] = [
  { id: 'oils', name: 'Масла и жидкости', count: 45 },
  { id: 'brakes', name: 'Тормозная система', count: 32 },
  { id: 'engine', name: 'Двигатель и выхлоп', count: 78 },
  { id: 'electronics', name: 'Электроника', count: 54 },
  { id: 'body', name: 'Кузовные детали', count: 23 },
  { id: 'accessories', name: 'Аксессуары', count: 61 }
];

// Тестовые данные для брендов
const testBrands: Brand[] = [
  { id: 'bosch', name: 'Bosch', count: 76 },
  { id: 'continental', name: 'Continental', count: 58 },
  { id: 'castrol', name: 'Castrol', count: 34 },
  { id: 'mobil', name: 'Mobil', count: 29 },
  { id: 'brembo', name: 'Brembo', count: 42 },
  { id: 'valeo', name: 'Valeo', count: 31 }
];

// Тестовые данные для товаров
const testProducts = [
  {
    id: 'p1',
    title: 'Моторное масло Castrol EDGE 5W-30 синтетическое, 4 л',
    price: 3750,
    oldPrice: 4200,
    image: '/images/products/motor-oil.png',
    category: 'Масла и жидкости',
    inStock: true,
    isNew: true,
    brand: 'castrol'
  },
  {
    id: 'p2',
    title: 'Тормозные колодки Brembo P85020 для BMW 3 серии передние',
    price: 4200,
    image: '/images/products/brake-pads.png',
    category: 'Тормозная система',
    inStock: true, 
    brand: 'brembo'
  },
  {
    id: 'p3',
    title: 'Воздушный фильтр Bosch F026400180 универсальный',
    price: 850,
    oldPrice: 980,
    image: '/images/products/air-filter.png',
    category: 'Двигатель и выхлоп',
    inStock: true,
    discount: 15,
    brand: 'bosch'
  },
  {
    id: 'p4',
    title: 'Аккумулятор Bosch S4 60Ah 540A прямая полярность',
    price: 7800,
    image: '/images/products/battery.png',
    category: 'Электроника',
    inStock: false,
    brand: 'bosch'
  },
  {
    id: 'p5',
    title: 'Свечи зажигания NGK LZKR6B-10E комплект 4 шт',
    price: 2400,
    oldPrice: 2600,
    image: '/images/products/spark-plugs.png',
    category: 'Двигатель и выхлоп',
    inStock: true,
    brand: 'continental'
  },
  {
    id: 'p6',
    title: 'Антифриз Mobil Antifreeze концентрат, 1 л',
    price: 650,
    image: '/images/products/antifreeze.png',
    category: 'Масла и жидкости',
    inStock: true,
    brand: 'mobil'
  },
  {
    id: 'p7',
    title: 'Лампа светодиодная Philips H7 X-treme Ultinon LED',
    price: 3450,
    oldPrice: 3800,
    image: '/images/products/car-lamp.png',
    category: 'Электроника',
    inStock: true,
    isNew: true,
    discount: 10,
    brand: 'valeo'
  },
  {
    id: 'p8',
    title: 'Комплект передних дисковых тормозов Brembo MAX диаметр 320 мм',
    price: 12800,
    image: '/images/products/brake-disc.png',
    category: 'Тормозная система',
    inStock: false,
    brand: 'brembo'
  },
  {
    id: 'p9',
    title: 'Трансмиссионное масло Castrol Syntrans Transaxle 75W-90, 1 л',
    price: 1250,
    image: '/images/products/transmission-oil.png',
    category: 'Масла и жидкости',
    inStock: true,
    brand: 'castrol'
  },
  {
    id: 'p10',
    title: 'Комплект чехлов на сиденья автомобиля черные с синей строчкой',
    price: 3900,
    oldPrice: 4500,
    image: '/images/products/seat-covers.png',
    category: 'Аксессуары',
    inStock: true,
    discount: 15,
    brand: 'continental'
  },
  {
    id: 'p11',
    title: 'Датчик кислорода Bosch 0258017025 универсальный',
    price: 5600,
    image: '/images/products/oxygen-sensor.png',
    category: 'Электроника',
    inStock: true,
    brand: 'bosch'
  },
  {
    id: 'p12',
    title: 'Щетки стеклоочистителя Valeo First 650/400 мм, комплект',
    price: 1800,
    oldPrice: 2000,
    image: '/images/products/wipers.png',
    category: 'Аксессуары',
    inStock: true,
    brand: 'valeo'
  }
];

// Варианты сортировки
const sortOptions = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'new', label: 'Сначала новинки' },
  { value: 'discount', label: 'По размеру скидки' }
];

export default function CatalogPage() {
  // Состояние для продуктов
  const [products, setProducts] = useState(testProducts);
  const [filteredProducts, setFilteredProducts] = useState(testProducts);
  
  // Состояние для фильтров
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<(string | number)[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 20000 });
  const [onlyInStock, setOnlyInStock] = useState(false);
  
  // Состояние для сортировки
  const [sortBy, setSortBy] = useState('popular');
  
  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Состояние для мобильных фильтров
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Состояние загрузки
  const [isLoading, setIsLoading] = useState(true);
  
  // Применяем фильтры при изменении состояния
  useEffect(() => {
    setIsLoading(true);
    
    // Имитация задержки загрузки
    const timer = setTimeout(() => {
      // Применяем фильтры
      let result = [...products];
      
      // Фильтр по категориям
      if (selectedCategories.length > 0) {
        result = result.filter(product => 
          selectedCategories.includes(product.category.toLowerCase().replace(/\s+/g, '-'))
        );
      }
      
      // Фильтр по брендам
      if (selectedBrands.length > 0) {
        result = result.filter(product => selectedBrands.includes(product.brand));
      }
      
      // Фильтр по цене
      result = result.filter(product => 
        product.price >= priceRange.min && 
        product.price <= priceRange.max
      );
      
      // Фильтр "только в наличии"
      if (onlyInStock) {
        result = result.filter(product => product.inStock);
      }
      
      // Применяем сортировку
      switch (sortBy) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'new':
          result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
          break;
        case 'discount':
          result.sort((a, b) => {
            const discountA = a.discount || 0;
            const discountB = b.discount || 0;
            return discountB - discountA;
          });
          break;
        default:
          // По умолчанию - по популярности (оставляем исходный порядок)
          break;
      }
      
      setFilteredProducts(result);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500); // Имитация загрузки данных
    
    return () => clearTimeout(timer);
  }, [products, selectedCategories, selectedBrands, priceRange, onlyInStock, sortBy]);
  
  // Обработчик изменения фильтров
  const handleFilterChange = (filters: {
    categories: (string | number)[]
    brands: (string | number)[]
    priceRange: PriceRange
    inStock: boolean
  }) => {
    setSelectedCategories(filters.categories);
    setSelectedBrands(filters.brands);
    setPriceRange(filters.priceRange);
    setOnlyInStock(filters.inStock);
  };
  
  // Обработчик изменения страницы
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    
    // Прокрутка к верху списка товаров
    window.scrollTo({
      top: document.getElementById('products-grid')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };
  
  // Получаем текущую страницу продуктов
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Анимация для продуктов
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Каталог товаров
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Найдите необходимые запчасти и аксессуары для вашего автомобиля
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая панель с фильтрами */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductFilters
              categories={testCategories}
              brands={testBrands}
              initialPriceRange={{ min: 0, max: 20000 }}
              onFilterChange={handleFilterChange}
            />
          </motion.div>
          
          {/* Основной контент - список товаров */}
          <div className="lg:w-3/4">
            {/* Верхняя панель с фильтрами и сортировкой */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Найдено:</span>
                <span className="font-medium">{filteredProducts.length} товаров</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="text-gray-400 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            
            {/* Список активных фильтров */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || onlyInStock) && (
              <motion.div 
                className="mb-6 flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center text-sm text-gray-400 mr-2">
                  <Filter className="w-4 h-4 mr-1" />
                  Активные фильтры:
                </div>
                
                {selectedCategories.map(categoryId => {
                  const category = testCategories.find(c => c.id === categoryId);
                  if (!category) return null;
                  
                  return (
                    <button
                      key={`cat-${categoryId}`}
                      className="flex items-center bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-sm"
                      onClick={() => setSelectedCategories(prev => prev.filter(id => id !== categoryId))}
                    >
                      {category.name}
                      <X className="ml-1 w-3 h-3" />
                    </button>
                  );
                })}
                
                {selectedBrands.map(brandId => {
                  const brand = testBrands.find(b => b.id === brandId);
                  if (!brand) return null;
                  
                  return (
                    <button
                      key={`brand-${brandId}`}
                      className="flex items-center bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-sm"
                      onClick={() => setSelectedBrands(prev => prev.filter(id => id !== brandId))}
                    >
                      {brand.name}
                      <X className="ml-1 w-3 h-3" />
                    </button>
                  );
                })}
                
                {onlyInStock && (
                  <button
                    className="flex items-center bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-sm"
                    onClick={() => setOnlyInStock(false)}
                  >
                    Только в наличии
                    <X className="ml-1 w-3 h-3" />
                  </button>
                )}
                
                <button
                  className="flex items-center text-blue-400 hover:text-blue-300 px-3 py-1 text-sm"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange({ min: 0, max: 20000 });
                    setOnlyInStock(false);
                  }}
                >
                  Сбросить все
                </button>
              </motion.div>
            )}
            
            {/* Состояние загрузки */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-400">Загрузка товаров...</span>
              </div>
            ) : (
              <>
                {/* Сетка товаров */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                    <div className="text-gray-400 mb-2">По вашему запросу ничего не найдено</div>
                    <p>Попробуйте изменить параметры фильтрации</p>
                  </div>
                ) : (
                  <>
                    <motion.div
                      id="products-grid"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <AnimatePresence>
                        {currentProducts.map((product, i) => (
                          <motion.div
                            key={product.id}
                            variants={itemVariants}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                          >
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
                        ))}
                      </AnimatePresence>
                    </motion.div>
                    
                    {/* Пагинация */}
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 