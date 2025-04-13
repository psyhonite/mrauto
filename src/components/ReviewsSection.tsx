'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const ReviewsSection = () => {
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

  const reviews = [
    {
      name: 'Александр',
      avatar: 'А',
      rating: 5,
      text: 'Отличный сервис! Быстро и качественно выполнили ремонт. Рекомендую!',
      date: '12.05.2023'
    },
    {
      name: 'Екатерина',
      avatar: 'Е',
      rating: 5,
      text: 'Очень довольна обслуживанием. Вежливый персонал и профессиональные мастера.',
      date: '28.04.2023'
    },
    {
      name: 'Дмитрий',
      avatar: 'Д',
      rating: 4,
      text: 'Хороший сервис, но немного дороговато. В целом остался доволен.',
      date: '15.04.2023'
    }
  ]

  return (
    <section id="reviews" ref={containerRef} className="relative py-32 bg-gradient-to-b from-[#0A1128] to-[#1E2A45] overflow-hidden">
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
            Мнения клиентов
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
            Отзывы клиентов
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Что говорят о нас наши клиенты
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 50 }}
              className="group"
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl blur-3xl group-hover:opacity-100 transition-opacity" />
                <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-14 h-14 bg-gradient-to-r from-[#0A1128] to-[#1E2A45] rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                          {review.avatar}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">{review.name}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                              transition={{ delay: index * 0.15 + i * 0.05, duration: 0.4 }}
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                      className="relative"
                    >
                      <svg className="absolute top-0 left-0 text-blue-500/20 w-8 h-8 -mt-4 -ml-3 transform -translate-y-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative text-gray-300 mb-4 pl-4 italic group-hover:text-gray-200 transition-colors">{review.text}</p>
                    </motion.div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 pulse-blue mr-2"></div>
                        <span className="text-xs text-blue-400">Проверено</span>
                      </div>
                      <p className="text-gray-400 text-sm">{review.date}</p>
                    </div>
                  </div>
                  
                  {/* Automotive-themed decorative elements */}
                  <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22.5,10.5 L21,8 C20.5,7 19.5,6 17,6 L7,6 C4.5,6 3.5,7 3,8 L1.5,10.5 C1,11 1,12 1,12.5 L1,16 C1,16.5 1.5,17 2,17 L3,17 C3.5,17 4,16.5 4,16 L4,15 L20,15 L20,16 C20,16.5 20.5,17 21,17 L22,17 C22.5,17 23,16.5 23,16 L23,12.5 C23,12 23,11 22.5,10.5 Z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="5.5" cy="13.5" r="1.5" />
                      <circle cx="18.5" cy="13.5" r="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 50 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-8 py-4 text-white text-lg font-medium transition-all flex items-center justify-center">
              <span>Оставить отзыв</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ReviewsSection 