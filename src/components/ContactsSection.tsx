'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const ContactsSection = () => {
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

  return (
    <section id="contacts" ref={containerRef} className="relative py-32 bg-gradient-to-b from-[#0A1128] to-[#1E2A45] overflow-hidden">
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
            Напишите нам
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
            Контакты
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Свяжитесь с нами удобным для вас способом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl blur-3xl group-hover:opacity-100 transition-opacity" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-blue-300 transition-colors">Контактная информация</h3>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center group/item"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative w-12 h-12 mr-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-red-600/30 rounded-lg blur-sm opacity-75 group-hover/item:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-center h-full p-3 bg-gradient-to-r from-[#0A1128] to-[#1E2A45] rounded-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-blue-400 group-hover/item:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Адрес</p>
                        <p className="text-gray-200 group-hover/item:text-white transition-colors">г. Екатеринбург, ул. Примерная, 123</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center group/item"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative w-12 h-12 mr-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-red-600/30 rounded-lg blur-sm opacity-75 group-hover/item:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-center h-full p-3 bg-gradient-to-r from-[#0A1128] to-[#1E2A45] rounded-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-red-400 group-hover/item:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Телефон</p>
                        <p className="text-gray-200 group-hover/item:text-white transition-colors">+7 (343) 123-45-67</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center group/item"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative w-12 h-12 mr-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-red-600/30 rounded-lg blur-sm opacity-75 group-hover/item:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-center h-full p-3 bg-gradient-to-r from-[#0A1128] to-[#1E2A45] rounded-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-blue-400 group-hover/item:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <p className="text-gray-200 group-hover/item:text-white transition-colors">info@mrauto.ru</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Automotive-themed decorative element */}
                <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M22.5,10.5 L21,8 C20.5,7 19.5,6 17,6 L7,6 C4.5,6 3.5,7 3,8 L1.5,10.5 C1,11 1,12 1,12.5 L1,16 C1,16.5 1.5,17 2,17 L3,17 C3.5,17 4,16.5 4,16 L4,15 L20,15 L20,16 C20,16.5 20.5,17 21,17 L22,17 C22.5,17 23,16.5 23,16 L23,12.5 C23,12 23,11 22.5,10.5 Z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5.5" cy="13.5" r="1.5" />
                    <circle cx="18.5" cy="13.5" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl blur-3xl group-hover:opacity-100 transition-opacity" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-blue-300 transition-colors">Режим работы</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 pulse-blue mr-2"></div>
                        <p className="text-gray-300">Понедельник - Пятница</p>
                      </div>
                      <p className="text-gray-300 bg-gradient-to-r from-blue-500/10 to-red-500/10 px-4 py-1 rounded-full">9:00 - 20:00</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 pulse-blue mr-2"></div>
                        <p className="text-gray-300">Суббота</p>
                      </div>
                      <p className="text-gray-300 bg-gradient-to-r from-blue-500/10 to-red-500/10 px-4 py-1 rounded-full">10:00 - 18:00</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 pulse-red mr-2"></div>
                        <p className="text-gray-300">Воскресенье</p>
                      </div>
                      <p className="text-gray-300 bg-gradient-to-r from-red-500/10 to-blue-500/10 px-4 py-1 rounded-full">Выходной</p>
                    </div>
                  </div>
                </div>
                
                {/* Automotive-themed decorative element */}
                <div className="absolute bottom-2 left-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl blur-3xl group-hover:opacity-100 transition-opacity" />
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl overflow-hidden h-full hover:bg-white/10 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-blue-300 transition-colors">Напишите нам</h3>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-gray-300 text-sm">Ваше имя</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        placeholder="Введите ваше имя"
                        className="block w-full bg-gray-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-300 text-sm">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        placeholder="Введите ваш email"
                        className="block w-full bg-gray-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-gray-300 text-sm">Сообщение</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Введите ваше сообщение"
                        className="block w-full bg-gray-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      ></textarea>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    className="relative group w-full overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="relative px-8 py-3.5 text-white text-base font-medium transition-all flex items-center justify-center">
                      <span>Отправить сообщение</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </motion.button>
                </form>
              </div>
              
              {/* Automotive-themed decorative element */}
              <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M9 17l3-2.94c.2-.2.6-.2.8 0L16 17" />
                  <path d="M12 15V5" />
                  <path d="M8 9h8" />
                  <path d="M22.5,10.5 L21,8 C20.5,7 19.5,6 17,6 L7,6 C4.5,6 3.5,7 3,8 L1.5,10.5 C1,11 1,12 1,12.5 L1,16 C1,16.5 1.5,17 2,17 L3,17 C3.5,17 4,16.5 4,16 L4,15 L20,15 L20,16 C20,16.5 20.5,17 21,17 L22,17 C22.5,17 23,16.5 23,16 L23,12.5 C23,12 23,11 22.5,10.5 Z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="5.5" cy="13.5" r="1.5" />
                  <circle cx="18.5" cy="13.5" r="1.5" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactsSection 