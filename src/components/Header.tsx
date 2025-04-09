'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Главная', href: '#' },
    { name: 'Каталог', href: '#catalog' },
    { name: 'Услуги', href: '#services' },
    { name: 'О нас', href: '#advantages' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'Контакты', href: '#contacts' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-[#090E34]/90 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">МА</span>
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  МистерАвто
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Contact Button */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 15px rgba(79, 70, 229, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-4 py-2 text-white text-sm font-medium transition-all">
                <div className="flex items-center justify-center">
                  <span>Связаться</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-7 h-6">
              <motion.span
                className="absolute h-0.5 bg-white rounded-full left-0 right-0"
                animate={{ 
                  top: isMobileMenuOpen ? '10px' : '0px',
                  rotate: isMobileMenuOpen ? '45deg' : '0deg'
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span
                className="absolute h-0.5 bg-white rounded-full left-0 right-0 top-[10px]"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span
                className="absolute h-0.5 bg-white rounded-full left-0 right-0 bottom-0"
                animate={{ 
                  bottom: isMobileMenuOpen ? '10px' : '0px',
                  rotate: isMobileMenuOpen ? '-45deg' : '0deg'
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-[#090E34]/95 backdrop-blur-lg border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="py-4 px-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * i }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="mt-2 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="relative group overflow-hidden rounded-xl w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="relative px-4 py-3 text-white text-sm font-medium transition-all">
                      <div className="flex items-center justify-center">
                        <span>Связаться с нами</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glowing accents */}
      <div className="absolute inset-x-0 -bottom-5 h-5 bg-gradient-to-b from-blue-600/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </header>
  )
}

export default Header 