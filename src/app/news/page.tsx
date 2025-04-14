'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, Search, X, Tag, Clock, ArrowRight, ExternalLink } from 'lucide-react'
import FavoriteButton from '@/components/FavoriteButton'
import { useFavorites } from '@/context/FavoritesContext'
import '../blog.css'

// Типы данных для статей
interface BlogTag {
  id: string
  name: string
}

interface BlogAuthor {
  id: string
  name: string
  avatar: string
}

interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage: string
  publishDate: string
  readTime: number
  author: BlogAuthor
  tags: BlogTag[]
  isExternal?: boolean
  externalUrl?: string
}

// Демо-данные для блога
const demoTags: BlogTag[] = [
  { id: 'news', name: 'Новости' },
  { id: 'tips', name: 'Советы' },
  { id: 'reviews', name: 'Обзоры' },
  { id: 'tech', name: 'Технологии' },
  { id: 'events', name: 'События' },
  { id: 'maintenance', name: 'Обслуживание' },
  { id: 'repair', name: 'Ремонт' }
]

const demoAuthors: BlogAuthor[] = [
  { id: 'admin', name: 'Администратор', avatar: '/images/blog/avatar-1.jpg' },
  { id: 'expert', name: 'Эксперт', avatar: '/images/blog/avatar-2.jpg' },
  { id: 'mechanic', name: 'Главный механик', avatar: '/images/blog/avatar-3.jpg' }
]

const demoArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Как подготовить автомобиль к зимнему сезону: полное руководство',
    slug: 'winter-car-preparation-guide',
    excerpt: 'Зима – сложное время для автомобилей. В этой статье мы расскажем, как правильно подготовить вашу машину к зимнему периоду и избежать проблем.',
    coverImage: '/images/blog/winter-car.jpg',
    publishDate: '2023-10-15',
    readTime: 8,
    author: demoAuthors[2],
    tags: [demoTags[1], demoTags[5]]
  },
  {
    id: '2',
    title: 'Открытие нового филиала МистерАвто в Юго-Западном районе',
    slug: 'new-store-opening',
    excerpt: 'Мы рады сообщить об открытии нового магазина и сервисного центра в Юго-Западном районе города. Теперь наши услуги стали еще доступнее!',
    coverImage: '/images/blog/new-store.jpg',
    publishDate: '2023-11-05',
    readTime: 3,
    author: demoAuthors[0],
    tags: [demoTags[0], demoTags[4]]
  },
  {
    id: '3',
    title: 'Обзор новых моделей автомобильных масел: что выбрать в 2023 году',
    slug: 'motor-oil-review-2023',
    excerpt: 'Обзор наиболее популярных и эффективных моторных масел текущего года. Сравнение характеристик, цен и отзывы экспертов.',
    coverImage: '/images/blog/motor-oil.jpg',
    publishDate: '2023-09-20',
    readTime: 12,
    author: demoAuthors[1],
    tags: [demoTags[2], demoTags[3]]
  },
  {
    id: '4',
    title: 'Почему важно регулярно менять фильтры в автомобиле',
    slug: 'importance-of-car-filters',
    excerpt: 'Воздушные, масляные и топливные фильтры играют критическую роль в работе автомобиля. Расскажем, как часто их нужно менять и почему это важно.',
    coverImage: '/images/blog/car-filters.jpg',
    publishDate: '2023-08-12',
    readTime: 6,
    author: demoAuthors[2],
    tags: [demoTags[1], demoTags[6]]
  },
  {
    id: '5',
    title: 'Интервью с победителем соревнований по автоспорту',
    slug: 'interview-racing-champion',
    excerpt: 'Эксклюзивное интервью с чемпионом городских гонок. Узнайте о секретах победы и особенностях подготовки автомобиля к соревнованиям.',
    coverImage: '/images/blog/racing.jpg',
    publishDate: '2023-10-30',
    readTime: 9,
    author: demoAuthors[0],
    tags: [demoTags[0], demoTags[4]]
  },
  {
    id: '6',
    title: 'Новые технологии диагностики автомобиля: что изменилось за последние 5 лет',
    slug: 'car-diagnostic-technologies',
    excerpt: 'Обзор современных методов диагностики автомобиля, которые позволяют точнее и быстрее выявлять неисправности.',
    coverImage: '/images/blog/diagnostics.jpg',
    publishDate: '2023-07-19',
    readTime: 10,
    author: demoAuthors[1],
    tags: [demoTags[3], demoTags[6]]
  },
  {
    id: '7',
    title: 'Как выбрать идеальные шины для вашего автомобиля',
    slug: 'choosing-perfect-tires',
    excerpt: 'Гид по выбору шин в зависимости от сезона, условий эксплуатации и особенностей вашего автомобиля.',
    coverImage: '/images/blog/tires.jpg',
    publishDate: '2023-09-05',
    readTime: 7,
    author: demoAuthors[2],
    tags: [demoTags[1], demoTags[5]]
  },
  {
    id: '8',
    title: 'Участие МистерАвто в городской выставке автодетейлинга',
    slug: 'auto-detailing-exhibition',
    excerpt: 'Отчет о нашем участии в ежегодной выставке автодетейлинга. Фотографии, видео и впечатления посетителей.',
    coverImage: '/images/blog/exhibition.jpg',
    publishDate: '2023-11-18',
    readTime: 5,
    author: demoAuthors[0],
    tags: [demoTags[0], demoTags[4]],
    isExternal: true,
    externalUrl: 'https://medium.com/mr-auto-blog/auto-detailing-exhibition-report'
  }
]

export default function NewsPage() {
  const { isFavorite } = useFavorites()
  const [articles, setArticles] = useState<BlogArticle[]>(demoArticles)
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>(demoArticles)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Фильтрация статей по тегу и поисковому запросу
  useEffect(() => {
    let filtered = articles
    
    // Фильтрация по тегу
    if (selectedTag) {
      filtered = filtered.filter(article => 
        article.tags.some(tag => tag.id === selectedTag)
      )
    }
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.name.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query)
      )
    }
    
    setFilteredArticles(filtered)
  }, [articles, selectedTag, searchQuery])
  
  // Обработчик выбора тега
  const handleTagSelect = (tagId: string) => {
    setSelectedTag(prev => prev === tagId ? null : tagId)
  }
  
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }
  
  // Анимации
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  
  return (
    <div className="min-h-screen bg-[#0A1128] text-white pt-24 pb-20 relative">
      {/* Фоновая сетка и звезды */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
        {/* Primary Grid pattern */}
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: 'url(/images/solid-grid.svg)',
            backgroundSize: '20px 20px'
          }} 
        />
        
        {/* Secondary Digital circuit lines */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'url(/images/grid-pattern.svg)' }}
        />
        
        {/* Diagonal accent lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Stars - fixed points */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.5 + 0.3;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
              />
            );
          })}
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.4,
                  animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
        
        {/* Ambient background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Digital circuit lines */}
          <div className="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-70" />
          <div className="absolute right-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent opacity-70" />
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-70" />
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-70" />
          
          {/* Diagonal accent lines */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-top-left" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden opacity-10">
            <div className="absolute bottom-0 right-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-bottom-right" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-red-600/10 rounded-full blur-3xl" />
        </div>

        {/* Заголовок страницы */}
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400"
          >
            Новости и блог
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 max-w-3xl mx-auto text-center text-xl"
          >
            Актуальные новости компании, полезные статьи, советы по обслуживанию автомобиля 
            и обзоры новых продуктов
          </motion.p>
        </div>
        
        {/* Фильтрация и поиск */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Поиск по блогу */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white backdrop-blur-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-blue-400" />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Фильтр по категориям */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {demoTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagSelect(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTag === tag.id
                        ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white'
                        : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="px-3 py-1 rounded-full text-sm bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    Сбросить
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Список статей */}
        {filteredArticles.length === 0 ? (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
          >
            <h2 className="text-xl font-semibold mb-2">Статьи не найдены</h2>
            <p className="text-gray-400 mb-4">
              По вашему запросу не найдено ни одной статьи. Попробуйте изменить параметры поиска.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedTag(null)
              }}
              className="inline-flex items-center px-4 py-2 relative overflow-hidden rounded-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-medium">Сбросить все фильтры</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map(article => (
              <motion.div
                key={article.id}
                variants={itemVariant}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all group"
              >
                {article.isExternal ? (
                  <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs px-2 py-1 m-2 rounded-md flex items-center">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Внешняя статья
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map(tag => (
                            <span key={tag.id} className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag.name}
                            </span>
                          ))}
                        </div>
                        
                        <FavoriteButton 
                          product={{
                            id: article.id,
                            name: article.title,
                            price: 0, // Статьи бесплатные
                            image: article.coverImage,
                            slug: article.isExternal ? undefined : article.slug
                          }} 
                          iconOnly 
                          size="sm" 
                        />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{article.readTime} мин.</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link href={`/news/${article.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map(tag => (
                            <span key={tag.id} className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag.name}
                            </span>
                          ))}
                        </div>
                        
                        <FavoriteButton 
                          product={{
                            id: article.id,
                            name: article.title,
                            price: 0, // Статьи бесплатные
                            image: article.coverImage,
                            slug: article.slug
                          }} 
                          iconOnly 
                          size="sm" 
                        />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{article.readTime} мин.</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Дополнительная информация */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-8">
              <h2 className="text-2xl font-bold mb-3 text-white">Хотите получать новости и статьи на почту?</h2>
              <p className="text-gray-300 mb-6">
                Подпишитесь на нашу рассылку, чтобы первыми узнавать о новых статьях, 
                акциях и специальных предложениях!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Ваш email"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button className="relative group overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="relative px-6 py-2 text-white font-medium">Подписаться</div>
                </button>
              </div>
            </div>
            
            <div className="md:w-1/3 hidden md:block">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-red-500/30 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-blue-400/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 