'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'
import { RiFilterLine } from 'react-icons/ri'
import { 
  Filter, X, ChevronUp, ChevronDown, Check, Sliders, 
  ArrowDownAZ, Search
} from 'lucide-react'

export type PriceRange = {
  min: number
  max: number
}

export type Category = {
  id: string | number
  name: string
  count: number
}

export type Brand = {
  id: string | number
  name: string
  count: number
}

interface FilterProps {
  categories: Category[]
  brands: Brand[]
  initialPriceRange: PriceRange
  onFilterChange: (filters: {
    categories: (string | number)[]
    brands: (string | number)[]
    priceRange: PriceRange
    inStock: boolean
  }) => void
}

export const ProductFilters = ({
  categories,
  brands,
  initialPriceRange,
  onFilterChange
}: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>([])
  const [selectedBrands, setSelectedBrands] = useState<(string | number)[]>([])
  const [priceRange, setPriceRange] = useState<PriceRange>(initialPriceRange)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  
  // Открытые/закрытые разделы фильтра (для мобильной версии)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true
  })
  
  // Обновляем фильтры при изменении состояния
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      inStock: onlyInStock
    })
  }, [selectedCategories, selectedBrands, priceRange, onlyInStock, onFilterChange])
  
  const toggleCategory = (categoryId: string | number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }
  
  const toggleBrand = (brandId: string | number) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setPriceRange(prev => ({ ...prev, min: value }))
  }
  
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setPriceRange(prev => ({ ...prev, max: value }))
  }
  
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange(initialPriceRange)
    setOnlyInStock(false)
  }
  
  const toggleSection = (section: 'categories' | 'brands' | 'price') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }
  
  return (
    <>
      {/* Мобильная кнопка для открытия фильтров */}
      <div className="lg:hidden mb-4">
        <motion.button
          className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white"
          onClick={() => setIsMobileFiltersOpen(true)}
          whileTap={{ scale: 0.95 }}
        >
          <RiFilterLine className="text-xl" />
          <span>Фильтры</span>
        </motion.button>
      </div>
      
      {/* Мобильные фильтры (перекрывающая панель) */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Фильтры</h2>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <IoIosClose className="text-2xl" />
                </button>
              </div>
              
              <div className="mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('categories')}
                >
                  <h3 className="text-lg font-medium text-white">Категории</h3>
                  <IoIosArrowDown 
                    className={`text-gray-400 transition-transform ${
                      expandedSections.categories ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                
                {expandedSections.categories && (
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`mobile-category-${category.id}`}
                          className="flex items-center text-sm cursor-pointer group"
                        >
                          <span className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                            selectedCategories.includes(category.id)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-600 group-hover:border-gray-400'
                          }`}>
                            {selectedCategories.includes(category.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span className={`text-sm ${
                            selectedCategories.includes(category.id) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                          }`}>
                            {category.name} <span className="text-gray-500">({category.count})</span>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('brands')}
                >
                  <h3 className="text-lg font-medium text-white">Бренды</h3>
                  <IoIosArrowDown 
                    className={`text-gray-400 transition-transform ${
                      expandedSections.brands ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                
                {expandedSections.brands && (
                  <div className="space-y-3">
                    {brands.map(brand => (
                      <div key={brand.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => toggleBrand(brand.id)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`mobile-brand-${brand.id}`}
                          className="flex items-center text-sm cursor-pointer group"
                        >
                          <span className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                            selectedBrands.includes(brand.id)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-600 group-hover:border-gray-400'
                          }`}>
                            {selectedBrands.includes(brand.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span className={`text-sm ${
                            selectedBrands.includes(brand.id) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                          }`}>
                            {brand.name} <span className="text-gray-500">({brand.count})</span>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('price')}
                >
                  <h3 className="text-lg font-medium text-white">Цена</h3>
                  <IoIosArrowDown 
                    className={`text-gray-400 transition-transform ${
                      expandedSections.price ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                
                {expandedSections.price && (
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">От</label>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={handleMinPriceChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">До</label>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={handleMaxPriceChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatPrice(priceRange.min)} ₽ - {formatPrice(priceRange.max)} ₽
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mobile-in-stock"
                    checked={onlyInStock}
                    onChange={() => setOnlyInStock(!onlyInStock)}
                    className="hidden"
                  />
                  <label 
                    htmlFor="mobile-in-stock"
                    className="flex items-center text-sm cursor-pointer group"
                  >
                    <span className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                      onlyInStock 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-600 group-hover:border-gray-400'
                    }`}>
                      {onlyInStock && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-sm ${
                      onlyInStock ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}>
                      Только в наличии
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <button 
                className="py-3 px-4 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                onClick={clearAllFilters}
              >
                Сбросить
              </button>
              <button 
                className="py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Десктопные фильтры */}
      <div className="hidden lg:block bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Фильтры</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Сбросить всё
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Категории</h3>
          <div className="space-y-3">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="hidden"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="flex items-center text-sm cursor-pointer group"
                >
                  <span className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                    selectedCategories.includes(category.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-600 group-hover:border-gray-400'
                  }`}>
                    {selectedCategories.includes(category.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm ${
                    selectedCategories.includes(category.id) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {category.name} <span className="text-gray-500">({category.count})</span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Бренды</h3>
          <div className="space-y-3">
            {brands.map(brand => (
              <div key={brand.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => toggleBrand(brand.id)}
                  className="hidden"
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="flex items-center text-sm cursor-pointer group"
                >
                  <span className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                    selectedBrands.includes(brand.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-600 group-hover:border-gray-400'
                  }`}>
                    {selectedBrands.includes(brand.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm ${
                    selectedBrands.includes(brand.id) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {brand.name} <span className="text-gray-500">({brand.count})</span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Цена</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">От</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">До</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {formatPrice(priceRange.min)} ₽ - {formatPrice(priceRange.max)} ₽
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="in-stock"
              checked={onlyInStock}
              onChange={() => setOnlyInStock(!onlyInStock)}
              className="hidden"
            />
            <label 
              htmlFor="in-stock"
              className="flex items-center text-sm cursor-pointer group"
            >
              <span className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                onlyInStock 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-gray-600 group-hover:border-gray-400'
              }`}>
                {onlyInStock && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm ${
                onlyInStock ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                Только в наличии
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

// Компонент для сортировки
export interface SortOption {
  id: string
  label: string
}

interface ProductSortProps {
  options: SortOption[]
  activeSort: string
  onSortChange: (sortId: string) => void
  className?: string
}

export function ProductSort({ options, activeSort, onSortChange, className = '' }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const activeOption = options.find(option => option.id === activeSort) || options[0]
  
  const handleSortChange = (sortId: string) => {
    onSortChange(sortId)
    setIsOpen(false)
  }
  
  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <ArrowDownAZ className="w-4 h-4 mr-2" />
        <span className="text-sm">{activeOption.label}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2"
            >
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${
                    option.id === activeSort ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  {option.label}
                  {option.id === activeSort && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Компонент для мобильных фильтров и сортировки
export function MobileFilterSort({
  filterCount = 0,
  onFilterClick,
  onSortClick
}: {
  filterCount?: number
  onFilterClick: () => void
  onSortClick: () => void
}) {
  return (
    <div className="sticky top-0 z-10 bg-slate-900 p-4 flex space-x-2 md:hidden">
      <button
        onClick={onFilterClick}
        className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-800 rounded-lg"
      >
        <Sliders className="w-4 h-4 mr-2" />
        <span>Фильтры</span>
        {filterCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-500 text-white rounded-full">
            {filterCount}
          </span>
        )}
      </button>
      <button
        onClick={onSortClick}
        className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-800 rounded-lg"
      >
        <ArrowDownAZ className="w-4 h-4 mr-2" />
        <span>Сортировка</span>
      </button>
    </div>
  )
}

// Компонент для поиска товаров
export function ProductSearch({
  value,
  onChange,
  onSearch,
  className = ''
}: {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch()
          }
        }}
        placeholder="Поиск товаров..."
        className="w-full px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <button
        onClick={onSearch}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-blue-400 hover:text-blue-500"
      >
        Найти
      </button>
    </div>
  )
}

// Добавляем стили для кастомного скроллбара
export const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.5);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(59, 130, 246, 0.5);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(59, 130, 246, 0.7);
  }
` 