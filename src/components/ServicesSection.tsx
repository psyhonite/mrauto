'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const ServicesSection = () => {
  const containerRef = useRef(null)
  const [ref, isInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  
  // Animation variants for service cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }
  
  // Service items with automotive theme
  const services = [
    {
      title: 'Диагностика',
      description: 'Компьютерная диагностика всех систем автомобиля с использованием современного оборудования',
      icon: (
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: 'Ремонт двигателя',
      description: 'Ремонт и обслуживание двигателей всех типов: бензиновых, дизельных и гибридных',
      icon: (
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: 'Ходовая часть',
      description: 'Диагностика и ремонт подвески, тормозной системы, рулевого управления',
      icon: (
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: 'Электрика',
      description: 'Ремонт и обслуживание электрических систем автомобиля, установка дополнительного оборудования',
      icon: (
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Замена масла',
      description: 'Замена масла и других жидкостей, фильтров с использованием качественных материалов',
      icon: (
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Шиномонтаж',
      description: 'Сезонная замена шин, балансировка, ремонт и обслуживание колёс',
      icon: (
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeWidth="1.5" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      )
    }
  ]

  // Добавляем локальное состояние для отслеживания видимости 
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  
  // Обновляем состояние при изменении видимости
  useEffect(() => {
    if (isInView) {
      setHasBeenVisible(true)
    }
  }, [isInView])
  
  // Используем это состояние для управления анимацией
  const shouldBeVisible = isInView || hasBeenVisible

  return (
    <section id="services" ref={containerRef} className="relative py-32 bg-gradient-to-b from-[#0A1128] to-[#1E2A45] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute -top-20 -left-20 w-[50rem] h-[50rem] bg-gradient-to-br from-blue-600/20 to-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y, opacity }}
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={shouldBeVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="text-center mb-24"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={shouldBeVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-full text-gray-300 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10"
          >
            Профессиональное обслуживание
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Профессиональные услуги для вашего автомобиля
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 group"
              custom={i}
              initial="hidden"
              animate={shouldBeVisible ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="relative mb-6 w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-red-500/10 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  {service.icon}
                </div>
                
                {/* Animated indicator line when hovered */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 group-hover:w-full transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
              
              {/* Digital indicator */}
              <div className="mt-4 flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 pulse-blue mr-2"></div>
                <span className="text-xs text-blue-400">Доступно сейчас</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTAs */}
        <motion.div 
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={shouldBeVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-4 text-white text-lg font-medium transition-all">
              <div className="flex items-center justify-center">
                <span>Записаться на сервис</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </motion.button>
          
          <motion.a
            href="#catalog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            <span>Перейти в каталог запчастей</span>
            <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection 