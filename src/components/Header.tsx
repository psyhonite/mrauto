'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-[#0A1128]/80 backdrop-blur-lg shadow-lg' : 'py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-9 w-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg opacity-90" />
              <div className="relative text-white font-bold text-xl flex items-center justify-center">
                МА
              </div>
              {/* Animated car outline icon appearing inside logo on scroll */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path 
                        d="M22.5,10.5 L21,8 C20.5,7 19.5,6 17,6 L7,6 C4.5,6 3.5,7 3,8 L1.5,10.5 C1,11 1,12 1,12.5 L1,16 C1,16.5 1.5,17 2,17 L3,17 C3.5,17 4,16.5 4,16 L4,15 L20,15 L20,16 C20,16.5 20.5,17 21,17 L22,17 C22.5,17 23,16.5 23,16 L23,12.5 C23,12 23,11 22.5,10.5 Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="5.5" cy="13.5" r="1.5" />
                      <circle cx="18.5" cy="13.5" r="1.5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <span className="text-white font-bold text-xl">МистерАвто</span>
              {isScrolled && 
                <motion.div 
                  className="text-xs text-blue-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Сервис и запчасти
                </motion.div>
              }
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Главная', link: '#hero' },
              { name: 'Каталог', link: '#catalog' },
              { name: 'Услуги', link: '#services' },
              { name: 'О нас', link: '#about' },
              { name: 'Отзывы', link: '#reviews' },
              { name: 'Контакты', link: '#contacts' }
            ].map((item, i) => (
              <motion.a 
                key={i}
                href={item.link}
                className="relative px-4 py-2 text-white hover:text-blue-300 transition-colors group overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.link.substring(1));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 group-hover:w-4/5 transition-all duration-300 -translate-x-1/2" />
              </motion.a>
            ))}
          </nav>

          {/* Call-to-action button */}
          <motion.button
            className="hidden md:flex items-center justify-center relative overflow-hidden rounded-xl group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-6 py-2 text-white font-medium">
              <div className="flex items-center">
                <span>Связаться</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            {/* Digital circuit decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
            <div className="absolute left-0 top-0 h-full w-px bg-white/20" />
            <div className="absolute right-0 top-0 h-full w-px bg-white/20" />
          </motion.button>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-5">
                <motion.span 
                  className="absolute h-0.5 w-full bg-white rounded-full"
                  style={{ top: 0 }}
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 9 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="absolute h-0.5 w-full bg-white rounded-full"
                  style={{ top: '50%', translateY: '-50%' }}
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="absolute h-0.5 w-full bg-white rounded-full"
                  style={{ bottom: 0 }}
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -9 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-[#0A1128]/95 backdrop-blur-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {[
                  { name: 'Главная', link: '#hero' },
                  { name: 'Каталог', link: '#catalog' },
                  { name: 'Услуги', link: '#services' },
                  { name: 'О нас', link: '#about' },
                  { name: 'Отзывы', link: '#reviews' },
                  { name: 'Контакты', link: '#contacts' }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.link}
                    className="px-4 py-2 text-white hover:text-blue-300 border-l-2 border-transparent hover:border-blue-500 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * i }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.link.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                <motion.button
                  className="mt-4 w-full flex items-center justify-center relative overflow-hidden rounded-xl group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="relative py-3 text-white font-medium">
                    <div className="flex items-center">
                      <span>Связаться</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 