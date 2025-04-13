'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  
  const footerLinks = [
    {
      title: 'Компания',
      links: [
        { name: 'О нас', href: '#advantages' },
        { name: 'Автосервис', href: '#services' },
        { name: 'Магазин', href: '#catalog' },
        { name: 'Контакты', href: '#contacts' },
      ],
    },
    {
      title: 'Услуги',
      links: [
        { name: 'Ремонт двигателя', href: '#' },
        { name: 'Диагностика', href: '#' },
        { name: 'Замена масла', href: '#' },
        { name: 'Шиномонтаж', href: '#' },
      ],
    },
    {
      title: 'Клиентам',
      links: [
        { name: 'Доставка', href: '#' },
        { name: 'Гарантия', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Отзывы', href: '#reviews' },
      ],
    },
  ]

  const socialLinks = [
    { 
      name: 'VK', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.579 6.855c.14-.465 0-.806-.666-.806h-2.199c-.56 0-.817.29-.958.61 0 0-1.121 2.722-2.708 4.484-.514.516-.748.679-1.028.679-.14 0-.346-.163-.346-.627v-4.34c0-.558-.162-.806-.626-.806H9.642c-.348 0-.558.26-.558.504 0 .529.79.652.87 2.145v3.242c0 .711-.128.84-.406.84-.748 0-2.568-2.731-3.644-5.863-.212-.611-.425-.856-.989-.856H2.713c-.631 0-.757.29-.757.61 0 .57.747 3.403 3.476 7.15 1.819 2.554 4.386 3.943 6.717 3.943 1.401 0 1.573-.315 1.573-.855v-1.974c0-.63.134-.756.585-.756.332 0 .899.166 2.225 1.437 1.514 1.51 1.764 2.185 2.616 2.185h2.199c.63 0 .946-.315.765-.942-.2-.615-.917-1.515-1.866-2.58-.514-.607-1.287-1.26-1.52-1.588-.33-.42-.234-.607 0-.982 0 0 2.672-3.754 2.946-5.029z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'Telegram', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.18-.03-.26-.02-.11.02-1.85 1.17-5.22 3.47-.49.33-.94.5-1.35.48-.44-.02-1.3-.25-1.93-.46-.78-.26-1.4-.4-1.34-.85.03-.22.17-.43.48-.61 1.87-1.18 3.16-1.95 3.86-2.34 3.05-1.71 3.68-2 4.09-2.01 1.09-.01 1.53.61 1.38 1.24z"/>
        </svg>
      )
    },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#080E24] text-white pt-16 pb-8 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Градиентные круги */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-600/10 to-red-600/10 rounded-full blur-3xl opacity-60"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-gradient-to-tr from-red-600/10 to-blue-600/10 rounded-full blur-3xl opacity-60"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Сетка */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        
        {/* Элементы "механических" деталей */}
        <div className="absolute right-20 top-16 w-32 h-32 border border-white/10 rounded-full opacity-20">
          <div className="absolute inset-2 border border-white/20 rounded-full"></div>
          <div className="absolute inset-4 border border-white/10 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-14 h-0.5 bg-white/30"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            ></motion.div>
          </div>
        </div>
        
        <div className="absolute left-40 bottom-10 w-24 h-24 border border-white/10 rounded-full opacity-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-10 h-0.5 bg-white/30"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            ></motion.div>
          </div>
        </div>
        
        {/* Анимированные частицы */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.2,
              }}
              animate={{
                y: [0, -Math.random() * 50 - 30],
                opacity: [Math.random() * 0.4 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Главный контент футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Логотип и информация о компании */}
          <div className="lg:col-span-5">
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-16 h-16 rounded-full p-2 bg-white/5 backdrop-blur-sm border border-white/10">
                  <Image
                    src="/images/logo.png"
                    alt="МистерАвто Логотип"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-red-400 rounded-full blur opacity-30"></div>
                </div>
                <div>
                  <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                    МистерАвто
                  </div>
                  <div className="text-blue-300 text-sm">
                    сеть сервисмаркетов
                  </div>
                </div>
              </motion.div>
            </Link>
            
            <p className="text-gray-300 mb-8 max-w-md">
              Профессиональный сервис и магазин автозапчастей. Мы предлагаем качественные запчасти и услуги по ремонту и обслуживанию автомобилей любых марок.
            </p>
            
            <div className="mb-8 grid grid-cols-1 gap-4">
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-blue-400/50 transition-colors">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">+7 (495) 123-45-67</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-red-400/50 transition-colors">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">info@мистеравто.рф</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-blue-400/50 transition-colors">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">г. Москва, ул. Автомобильная, 10</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-red-400/50 transition-colors">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Пн-Сб: 8:00 - 20:00</span>
              </motion.div>
            </div>
            
            <div className="hidden md:flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(-1)}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 relative overflow-hidden">
                    {hoveredIndex === index && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 opacity-80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <div className="relative text-white z-10">
                      {social.icon}
                    </div>
                  </div>
                  <span className="sr-only">{social.name}</span>
                  {hoveredIndex === index && (
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg opacity-40 blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Ссылки */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((category, idx) => (
              <div key={category.title} className="space-y-5">
                <h3 className="text-xl font-bold relative inline-block">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                    {category.title}
                  </span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-red-400"></div>
                </h3>
                <ul className="space-y-4">
                  {category.links.map((link, linkIdx) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="group flex items-center text-gray-300 transition-all"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span className="group-hover:text-white transition-colors">{link.name}</span>
                        <div className="ml-2 w-0 h-px bg-gradient-to-r from-blue-400 to-red-400 group-hover:w-8 transition-all duration-300"></div>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Мобильные социальные иконки */}
        <div className="flex md:hidden justify-center space-x-3 mt-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href="#"
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(-1)}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 relative overflow-hidden">
                {hoveredIndex === index && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div className="relative text-white z-10">
                  {social.icon}
                </div>
              </div>
              <span className="sr-only">{social.name}</span>
              {hoveredIndex === index && (
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg opacity-40 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.a>
          ))}
        </div>
        
        {/* Нижняя часть футера */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} МистерАвто. Все права защищены.
            </p>
          </div>
          
          <div className="flex space-x-8">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors relative group"
              whileHover={{ scale: 1.02 }}
            >
              <span>Политика конфиденциальности</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 group-hover:w-full transition-all duration-300"></div>
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors relative group"
              whileHover={{ scale: 1.02 }}
            >
              <span>Условия использования</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 group-hover:w-full transition-all duration-300"></div>
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Декоративные элементы верх и низ */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </footer>
  )
}

export default Footer 