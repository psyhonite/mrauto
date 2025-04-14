'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

// Временные данные для последних новостей
const latestNews = [
  {
    id: '1',
    title: 'Как подготовить автомобиль к зимнему сезону: полное руководство',
    slug: 'winter-car-preparation-guide',
    excerpt: 'Зима – сложное время для автомобилей. Подготовьтесь к холодам правильно.',
    image: '/images/blog/winter-car.jpg',
    publishDate: '2023-10-15',
    readTime: 8,
  },
  {
    id: '2',
    title: 'Открытие нового филиала МистерАвто в Юго-Западном районе',
    slug: 'new-store-opening',
    excerpt: 'Мы рады сообщить об открытии нового магазина и сервисного центра!',
    image: '/images/blog/new-store.jpg',
    publishDate: '2023-11-05',
    readTime: 3,
  },
  {
    id: '3',
    title: 'Обзор новых моделей автомобильных масел: что выбрать в 2023 году',
    slug: 'motor-oil-review-2023',
    excerpt: 'Обзор наиболее популярных и эффективных моторных масел текущего года.',
    image: '/images/blog/motor-oil.jpg',
    publishDate: '2023-09-20',
    readTime: 12,
  }
];

// Стили для анимации частиц
const floatAnimation = `
@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-15px) translateX(10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
`;

const NewsBanner = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Добавляем стили анимации
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = floatAnimation;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section id="news" className="relative py-20 bg-dark-blue" ref={containerRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-[50rem] h-[50rem] bg-gradient-to-br from-blue-600/20 to-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[50rem] h-[50rem] bg-gradient-to-tl from-red-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        
        {/* Car blueprint pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [Math.random() * 0.5 + 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-full text-gray-300 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10"
          >
            Будьте в курсе
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400">
            Последние новости
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Актуальная информация, полезные советы и новости компании
          </p>
        </motion.div>
        
        {/* Карточки последних новостей */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className="group h-full"
            >
              <div className="relative h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{article.readTime} мин.</span>
                    </div>
                  </div>
                  
                  <Link href={`/news/${article.slug}`}>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <Link 
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Читать далее</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Кнопка перехода в блог */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-8 py-3 text-white text-lg font-medium flex items-center">
                <span>Все новости и статьи</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsBanner; 