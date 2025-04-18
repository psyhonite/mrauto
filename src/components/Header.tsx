'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MiniCart from './MiniCart'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Определяем, находимся ли мы на странице каталога
  const isCatalogPage = pathname?.startsWith('/catalog')
  const isServicesPage = pathname?.startsWith('/services')
  const isAboutPage = pathname?.startsWith('/about')
  const isNewsPage = pathname?.startsWith('/news')
  const isContactsPage = pathname?.startsWith('/contacts')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Функция для обработки клика по ссылке
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // Если это внешняя ссылка (начинается с "/"), не перехватываем клик
    if (link.startsWith('/')) return
    
    // Для якорных ссылок на этой же странице, перехватываем клик
    e.preventDefault()
    const element = document.getElementById(link.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  // Навигационные ссылки
  const navLinks = [
    { name: 'Главная', link: '/' },
    { name: 'Каталог', link: '/catalog' },
    { name: 'Услуги', link: '/services' },
    { name: 'О нас', link: '/about' },
    { name: 'Блог', link: '/news' },
    { name: 'Контакты', link: '/contacts' }
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1 bg-[#0A1128]/80 backdrop-blur-lg shadow-lg' : 'py-2'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`relative transition-all duration-300 ${isScrolled ? 'w-16 h-16' : 'w-20 h-20'}`}>
                <Image
                  src="/images/logo.png"
                  alt="МистерАвто Логотип"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className={`font-bold transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'} bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400`}>
                  МистерАвто
                </div>
                <div className={`text-blue-300 transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                  сеть сервисмаркетов
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item, i) => (
              <Link 
                key={i}
                href={item.link}
                className={`relative px-4 py-2 transition-colors group overflow-hidden ${
                  (item.link === pathname || 
                  (item.link === '/catalog' && isCatalogPage) ||
                  (item.link === '/services' && isServicesPage) ||
                  (item.link === '/about' && isAboutPage) ||
                  (item.link === '/news' && isNewsPage) ||
                  (item.link === '/contacts' && isContactsPage)
                  ) 
                    ? 'text-blue-400' 
                    : 'text-white hover:text-blue-300'
                }`}
                onClick={(e) => handleLinkClick(e, item.link)}
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
                <div className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 transition-all duration-300 -translate-x-1/2 ${
                  (item.link === pathname || 
                  (item.link === '/catalog' && isCatalogPage) ||
                  (item.link === '/services' && isServicesPage) ||
                  (item.link === '/about' && isAboutPage) ||
                  (item.link === '/news' && isNewsPage) ||
                  (item.link === '/contacts' && isContactsPage)
                  ) 
                    ? 'w-4/5' 
                    : 'w-0 group-hover:w-4/5'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Actions (Cart and CTA) */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Мини-корзина */}
            <MiniCart />
            
            {/* Call-to-action button */}
            <motion.button
              className="flex items-center justify-center relative overflow-hidden rounded-xl group"
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
          </div>

          {/* Mobile menu button & cart */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Мини-корзина (мобильная версия) */}
            <MiniCart />
            
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
                {navLinks.map((item, i) => (
                  <Link 
                    key={i}
                    href={item.link}
                    className={`px-4 py-2 border-l-2 transition-colors ${
                      (item.link === pathname || 
                      (item.link === '/catalog' && isCatalogPage) ||
                      (item.link === '/services' && isServicesPage) ||
                      (item.link === '/about' && isAboutPage) ||
                      (item.link === '/news' && isNewsPage) ||
                      (item.link === '/contacts' && isContactsPage)
                      ) 
                        ? 'text-blue-400 border-blue-500' 
                        : 'text-white hover:text-blue-300 border-transparent hover:border-blue-500'
                    }`}
                    onClick={(e) => handleLinkClick(e, item.link)}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 * i }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
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