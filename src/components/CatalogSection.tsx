'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const CatalogSection = () => {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      },
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const categories = [
    {
      title: 'Запчасти',
      description: 'Оригинальные и неоригинальные запчасти для всех марок автомобилей',
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Масла и жидкости',
      description: 'Моторные масла, тормозные жидкости и другие технические жидкости',
      icon: (
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      title: 'Аккумуляторы',
      description: 'Аккумуляторы для всех типов автомобилей с установкой',
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Шины и диски',
      description: 'Летние и зимние шины, литые и штампованные диски',
      icon: (
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ]

  return (
    <section id="catalog" ref={containerRef} className="relative py-32 bg-gradient-to-b from-[#0A1128] to-[#1E2A45] overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="text-center mb-24"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-full text-gray-300 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10"
          >
            Широкий выбор
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
            Каталог
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Широкий ассортимент автозапчастей и аксессуаров
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 50 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 group h-[330px] flex flex-col"
              whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)' }}
            >
              <div className="relative mb-6 w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-red-500/10 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  {category.icon}
                </div>
                
                {/* Animated indicator line when hovered */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 group-hover:w-full transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                {category.title}
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors min-h-[60px]">
                {category.description}
              </p>
              
              {/* Digital indicator */}
              <div className="mt-4 flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 pulse-blue mr-2"></div>
                <span className="text-xs text-blue-400">В наличии</span>
              </div>
              
              <div className="mt-auto pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group w-full overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative px-6 py-2.5 text-white text-sm font-medium transition-all flex items-center justify-center">
                    <span>Подробнее</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                <span>Смотреть весь каталог</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default CatalogSection 