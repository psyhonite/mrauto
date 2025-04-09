'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const HeroSection = () => {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090E34] to-[#1A1F38]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute -top-20 -left-20 w-[50rem] h-[50rem] bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y, opacity }}
          className="absolute -bottom-20 -right-20 w-[50rem] h-[50rem] bg-gradient-to-tl from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090E34]/50 to-[#090E34]" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                className="text-center lg:text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
                  className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
                >
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                    Автосервис и магазин
                  </span>{" "}
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient delay-75">
                    автозапчастей
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
                  className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Профессиональный ремонт автомобилей и продажа качественных автозапчастей
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 50 }}
                  className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="relative px-8 py-4 text-white text-lg font-medium transition-all">
                      <div className="flex items-center justify-center">
                        <span>Записаться на сервис</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group overflow-hidden rounded-xl border border-gray-700"
                  >
                    <div className="absolute inset-0 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors" />
                    <div className="relative px-8 py-4 text-white text-lg font-medium transition-all">
                      <div className="flex items-center justify-center">
                        <span>Перейти в каталог</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                className="relative h-[450px] w-full"
              >
                {/* Abstract car dashboard */}
                <div className="absolute inset-0 z-10">
                  <motion.div 
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(13,17,38,0.8) 0%, rgba(26,31,56,0.9) 100%)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                    }}
                  >
                    {/* Speed gauge circles */}
                    <motion.div 
                      className="absolute -right-16 -top-16 w-[250px] h-[250px] rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(147,51,234,0.05) 70%)',
                        boxShadow: 'inset 0 0 20px rgba(59,130,246,0.3)'
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.7, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.div 
                      className="absolute -left-24 -bottom-24 w-[300px] h-[300px] rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(59,130,246,0.05) 70%)',
                        boxShadow: 'inset 0 0 30px rgba(147,51,234,0.3)'
                      }}
                      animate={{
                        scale: [1, 1.03, 1],
                        opacity: [0.5, 0.6, 0.5]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Dashboard Interface Elements */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      {/* Top section with logo */}
                      <div className="flex justify-between items-center">
                        <motion.div 
                          className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
                          <span className="text-white font-medium text-lg">Автосервис</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex space-x-2"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                              style={{ opacity: 0.7 + (i * 0.1) }}
                            />
                          ))}
                        </motion.div>
                      </div>
                      
                      {/* Middle section with circular gauges */}
                      <div className="relative grid grid-cols-7 gap-3 my-2">
                        {/* Main circular dashboard element */}
                        <motion.div 
                          className="col-span-3 aspect-square relative flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                        >
                          <motion.div 
                            className="absolute inset-0 rounded-full border-4 border-purple-500/30"
                            animate={{ 
                              boxShadow: ['0 0 15px rgba(147,51,234,0.2)', '0 0 25px rgba(147,51,234,0.4)', '0 0 15px rgba(147,51,234,0.2)'] 
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="absolute inset-3 rounded-full border-2 border-blue-400/40"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div 
                            className="w-4/5 h-4/5 rounded-full flex items-center justify-center"
                            style={{ 
                              background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.1) 70%)',
                              boxShadow: 'inset 0 0 20px rgba(147,51,234,0.2)' 
                            }}
                          >
                            <motion.div 
                              className="w-3/5 h-3/5 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md"
                              whileHover={{ scale: 1.1 }}
                            >
                              <motion.div 
                                className="text-xl font-bold text-white"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                100%
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        
                        {/* Dashboard visualization elements */}
                        <div className="col-span-4 flex flex-col justify-center space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <motion.div 
                              key={i}
                              className="h-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg overflow-hidden backdrop-blur-sm"
                              initial={{ width: '40%', opacity: 0.5 }}
                              animate={{ 
                                width: ['40%', i === 0 ? '95%' : i === 1 ? '75%' : '60%', '40%'],
                                opacity: [0.5, 0.8, 0.5] 
                              }}
                              transition={{ 
                                duration: 5 + i * 2, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                              }}
                            >
                              <motion.div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                                style={{ width: i === 0 ? '90%' : i === 1 ? '75%' : '60%' }}
                                animate={{ 
                                  opacity: [0.7, 0.9, 0.7]
                                }}
                                transition={{ 
                                  duration: 3,
                                  repeat: Infinity
                                }}
                              />
                            </motion.div>
                          ))}
                          
                          <div className="flex justify-between items-center px-2">
                            <span className="text-xs text-blue-300">Качество</span>
                            <span className="text-xs text-purple-300">Скорость</span>
                            <span className="text-xs text-blue-300">Надежность</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom section with buttons */}
                      <div className="grid grid-cols-4 gap-3">
                        {['Диагностика', 'Ремонт', 'Запчасти', 'Сервис'].map((text, i) => (
                          <motion.div
                            key={i}
                            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center cursor-pointer"
                            whileHover={{ 
                              scale: 1.05,
                              background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-white text-sm font-medium">{text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Animated lines */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-[1px] bg-gradient-to-r from-blue-400/0 via-blue-400 to-purple-500/0"
                          style={{
                            top: `${15 + i * 10}%`,
                            left: 0,
                            right: 0
                          }}
                          animate={{
                            translateX: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Glowing accents */}
                <motion.div 
                  className="absolute -top-8 -right-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                {/* Particles overlay */}
                <div className="absolute inset-0 z-20 overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                      }}
                      animate={{
                        y: [0, -40],
                        x: [0, Math.random() * 20 - 10],
                        opacity: [Math.random() * 0.7 + 0.3, 0],
                      }}
                      transition={{
                        duration: Math.random() * 2 + 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 