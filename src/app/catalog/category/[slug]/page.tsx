'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

import ProductCard from '@/components/catalog/ProductCard';
import { ProductFilters } from '@/components/catalog/ProductFilters';
import Pagination from '@/components/catalog/Pagination';

// Временные тестовые данные для категорий
const categories = {
  'oils': {
    name: 'Масла и жидкости',
    description: 'Полный ассортимент масел и технических жидкостей для вашего автомобиля: моторные и трансмиссионные масла, антифризы, тормозные жидкости, и многое другое.',
    image: '/images/categories/oils.jpg',
    icon: '🛢️'
  },
  'filters': {
    name: 'Фильтры',
    description: 'Масляные, воздушные, топливные и салонные фильтры от ведущих производителей для любых марок автомобилей.',
    image: '/images/categories/filters.jpg',
    icon: '🔄'
  },
  'brakes': {
    name: 'Тормозная система',
    description: 'Широкий выбор деталей тормозной системы: колодки, диски, суппорты, шланги и прочие компоненты для эффективного и безопасного торможения.',
    image: '/images/categories/brakes.jpg',
    icon: '🛑'
  },
  'electrical': {
    name: 'Электрооборудование',
    description: 'Автомобильные аккумуляторы, генераторы, стартеры, свечи зажигания и другие детали электрооборудования.',
    image: '/images/categories/electrical.jpg',
    icon: '⚡'
  },
  'suspension': {
    name: 'Подвеска',
    description: 'Амортизаторы, пружины, рычаги, шаровые опоры и другие детали для ремонта и обслуживания подвески вашего автомобиля.',
    image: '/images/categories/suspension.jpg',
    icon: '🔧'
  },
  'engine': {
    name: 'Двигатель',
    description: 'Все необходимое для ремонта и обслуживания двигателя: комплекты ГРМ, прокладки, ремни, цепи и многое другое.',
    image: '/images/categories/engine.jpg',
    icon: '🔥'
  }
};

// Временные тестовые данные для товаров
const testProducts = [
  {
    id: '1',
    title: 'Моторное масло Castrol EDGE 5W-30',
    price: 2850,
    oldPrice: 3200,
    image: '/images/products/oil1.png',
    category: 'Масла и жидкости',
    categorySlug: 'oils',
    inStock: true,
    isNew: true,
    discount: 10,
    brand: 'Castrol'
  },
  {
    id: '7',
    title: 'Антифриз FELIX PROLONGER -40 G12+ красный 5кг',
    price: 1750,
    oldPrice: 1900,
    image: '/images/products/antifreeze1.png',
    category: 'Масла и жидкости',
    categorySlug: 'oils',
    inStock: true,
    discount: 8,
    brand: 'FELIX'
  },
  {
    id: '2',
    title: 'Фильтр масляный Mann-Filter W 940/25',
    price: 720,
    image: '/images/products/filter1.png',
    category: 'Фильтры',
    categorySlug: 'filters',
    inStock: true,
    brand: 'Mann-Filter'
  },
  {
    id: '3',
    title: 'Комплект тормозных колодок Brembo P85075',
    price: 3150,
    oldPrice: 3400,
    image: '/images/products/brake1.png',
    category: 'Тормозная система',
    categorySlug: 'brakes',
    inStock: true,
    discount: 7,
    brand: 'Brembo'
  },
  {
    id: '4',
    title: 'Аккумулятор BOSCH S4 Silver 60 А·ч',
    price: 7800,
    image: '/images/products/battery1.png',
    category: 'Электрооборудование',
    categorySlug: 'electrical',
    inStock: false,
    brand: 'BOSCH'
  },
  {
    id: '6',
    title: 'Свечи зажигания NGK LZKAR6-11 6шт',
    price: 3600,
    image: '/images/products/spark1.png',
    category: 'Электрооборудование',
    categorySlug: 'electrical',
    inStock: true,
    isNew: true,
    brand: 'NGK'
  },
  {
    id: '5',
    title: 'Амортизатор KYB Excel-G 344459',
    price: 3850,
    oldPrice: 4200,
    image: '/images/products/shock1.png',
    category: 'Подвеска',
    categorySlug: 'suspension',
    inStock: true,
    discount: 8,
    brand: 'KYB'
  },
  {
    id: '8',
    title: 'Комплект ГРМ Gates K015603XS',
    price: 8950,
    oldPrice: 9500,
    image: '/images/products/timing1.png',
    category: 'Двигатель',
    categorySlug: 'engine',
    inStock: true,
    discount: 6,
    brand: 'Gates'
  }
];

// Временные категории для фильтров
const categoryFilters = [
  { id: 'oils', name: 'Масла и жидкости', count: 25 },
  { id: 'filters', name: 'Фильтры', count: 18 },
  { id: 'brakes', name: 'Тормозная система', count: 32 },
  { id: 'electrical', name: 'Электрооборудование', count: 45 },
  { id: 'suspension', name: 'Подвеска', count: 28 },
  { id: 'engine', name: 'Двигатель', count: 37 }
];

// Временные бренды для фильтров
const brands = [
  { id: 'bosch', name: 'Bosch', count: 65 },
  { id: 'castrol', name: 'Castrol', count: 42 },
  { id: 'mann', name: 'Mann-Filter', count: 23 },
  { id: 'brembo', name: 'Brembo', count: 31 },
  { id: 'kyb', name: 'KYB', count: 19 },
  { id: 'ngk', name: 'NGK', count: 27 },
  { id: 'gates', name: 'Gates', count: 16 },
  { id: 'felix', name: 'FELIX', count: 12 }
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState<{
    categories: (string | number)[]
    brands: (string | number)[]
    priceRange: { min: number, max: number }
    inStock: boolean
  }>({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 10000 },
    inStock: false
  });

  // Получение данных о категории и товарах
  useEffect(() => {
    setIsLoading(true);
    
    // Имитация API запроса
    setTimeout(() => {
      // Получение данных о категории
      const categoryData = categories[params.slug as keyof typeof categories];
      setCategory(categoryData || null);
      
      // Получение товаров категории
      const categoryProducts = testProducts.filter(product => 
        product.categorySlug === params.slug
      );
      
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
      setIsLoading(false);
    }, 500);
  }, [params.slug]);

  // Применение фильтров
  useEffect(() => {
    if (products.length === 0) return;
    
    setIsLoading(true);
    
    // Имитация задержки загрузки для демонстрации
    setTimeout(() => {
      let results = [...products];
      
      // Фильтрация по брендам
      if (filters.brands.length > 0) {
        results = results.filter(product => 
          filters.brands.includes(product.brand.toLowerCase())
        );
      }
      
      // Фильтрация по цене
      results = results.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      );
      
      // Фильтрация по наличию
      if (filters.inStock) {
        results = results.filter(product => product.inStock);
      }
      
      // Сортировка
      if (sortBy === 'price-asc') {
        results.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        results.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'new') {
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }
      
      setFilteredProducts(results);
      setCurrentPage(1); // Сброс страницы при изменении фильтров
      setIsLoading(false);
    }, 300);
  }, [filters, sortBy, products]);

  // Получение текущих товаров для отображения
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Изменение страницы
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Обработка изменений фильтров
  const handleFilterChange = (newFilters: {
    categories: (string | number)[]
    brands: (string | number)[]
    priceRange: { min: number, max: number }
    inStock: boolean
  }) => {
    setFilters(newFilters);
  };
  
  // Обработка изменения сортировки
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Если категория загружается
  if (isLoading && !category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#080E24] to-[#121A34] pb-16 flex justify-center items-center">
        <motion.div 
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Если категория не найдена
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#080E24] to-[#121A34] pb-16">
        <div className="container mx-auto px-4 pt-8">
          <Link href="/catalog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Вернуться в каталог
          </Link>
          
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <svg className="w-20 h-20 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <h1 className="text-2xl text-white font-semibold mb-2">Категория не найдена</h1>
            <p className="text-gray-400 max-w-md mb-6">
              К сожалению, запрашиваемая категория не существует или была удалена.
            </p>
            <Link href="/catalog">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-2 px-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Перейти в каталог
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#080E24] to-[#121A34] pb-16">
      <div className="container mx-auto px-4 pt-8">
        {/* Хлебные крошки */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-blue-400">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/catalog" className="hover:text-blue-400">Каталог</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{category.name}</span>
          </div>
        </div>
        
        {/* Шапка категории */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-4xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 text-center md:text-left">{category.name}</h1>
              <p className="text-gray-300 max-w-3xl text-center md:text-left">
                {category.description}
              </p>
            </div>
          </div>
          
          {/* Декоративные элементы */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute -right-32 -top-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        {/* Основной контент */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Сайдбар с фильтрами */}
          <div className="w-full lg:w-1/4">
            <ProductFilters 
              categories={categoryFilters}
              brands={brands}
              initialPriceRange={{ min: 0, max: 10000 }}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Товары */}
          <div className="w-full lg:w-3/4">
            {/* Верхняя панель (количество товаров, сортировка) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-white mb-3 sm:mb-0">
                Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-gray-300 text-sm">Сортировать:</label>
                <select 
                  id="sort" 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-white/5 text-white border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="new">Сначала новинки</option>
                </select>
              </div>
            </div>
            
            {/* Сетка товаров */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div 
                  className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {currentProducts.map(product => (
                      <ProductCard
                        key={product.id}
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
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <h3 className="text-xl text-white font-semibold mb-2">Товары не найдены</h3>
                    <p className="text-gray-400 max-w-md">
                      К сожалению, по вашему запросу не найдено товаров. Попробуйте изменить параметры фильтра.
                    </p>
                  </div>
                )}
              
                {/* Пагинация */}
                {filteredProducts.length > productsPerPage && (
                  <Pagination 
                    totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 