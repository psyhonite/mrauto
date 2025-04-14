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
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.579 6.855c.14-.465 0-.806-.666-.806h-2.199c-.56 0-.817.29-.958.61 0 0-1.121 2.722-2.708 4.484-.514.516-.748.679-1.028.679-.14 0-.346-.163-.346-.627v-4.34c0-.558-.162-.806-.626-.806H9.642c-.348 0-.558.26-.558.504 0 .529.79.652.87 2.145v3.242c0 .711-.128.84-.406.84-.748 0-2.568-2.731-3.644-5.863-.212-.611-.425-.856-.989-.856H2.713c-.631 0-.757.29-.757.61 0 .57.747 3.403 3.476 7.15 1.819 2.554 4.386 3.943 6.717 3.943 1.401 0 1.573-.315 1.573-.855v-1.974c0-.63.134-.756.585-.756.332 0 .899.166 2.225 1.437 1.514 1.51 1.764 2.185 2.616 2.185h2.199c.63 0 .946-.315.765-.942-.2-.615-.917-1.515-1.866-2.58-.514-.607-1.287-1.26-1.52-1.588-.33-.42-.234-.607 0-.982 0 0 2.672-3.754 2.946-5.029z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'Telegram', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.18-.03-.26-.02-.11.02-1.85 1.17-5.22 3.47-.49.33-.94.5-1.35.48-.44-.02-1.3-.25-1.93-.46-.78-.26-1.4-.4-1.34-.85.03-.22.17-.43.48-.61 1.87-1.18 3.16-1.95 3.86-2.34 3.05-1.71 3.68-2 4.09-2.01 1.09-.01 1.53.61 1.38 1.24z"/>
        </svg>
      )
    },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-[#080E24] to-[#0A1232] text-white pt-16 pb-8 overflow-hidden border-t border-white/10">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Градиент и сетка */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        <motion.div 
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Анимированная точечная сетка */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                opacity: [
                  Math.random() * 0.2 + 0.1, 
                  Math.random() * 0.5 + 0.3, 
                  Math.random() * 0.2 + 0.1
                ],
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
        {/* Основной контент футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Блок с логотипом и контактами */}
          <div className="lg:col-span-5">
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-12 h-12 rounded-xl p-2 bg-white/5 backdrop-blur-sm border border-white/10">
                  <Image
                    src="/МистерАвто.png"
                    alt="МистерАвто Логотип"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 to-red-400/20 rounded-xl blur opacity-50"></div>
                </div>
                <div>
                  <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                    МистерАвто
                  </div>
                  <div className="text-gray-400 text-sm">
                    сеть сервисмаркетов
                  </div>
                </div>
              </motion.div>
            </Link>
            
            <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
              Профессиональный сервис и магазин автозапчастей. Мы предлагаем качественные запчасти и услуги по ремонту и обслуживанию автомобилей любых марок.
            </p>
            
            <div className="mb-8 grid grid-cols-1 gap-4">
              <motion.a 
                href="tel:+74951234567"
                className="flex items-center space-x-3 group transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-blue-400/50 group-hover:bg-blue-500/10 transition-colors duration-300">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+7 (495) 123-45-67</span>
              </motion.a>
              <motion.a 
                href="mailto:info@мистеравто.рф"
                className="flex items-center space-x-3 group transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-red-400/50 group-hover:bg-red-500/10 transition-colors duration-300">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">info@мистеравто.рф</span>
              </motion.a>
              <motion.div 
                className="flex items-center space-x-3 group transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-blue-400/50 group-hover:bg-blue-500/10 transition-colors duration-300">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">г. Москва, ул. Автомобильная, 10</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 group transition-all duration-300"
                whileHover={{ x: 3 }}
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-red-400/50 group-hover:bg-red-500/10 transition-colors duration-300">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Пн-Сб: 8:00 - 20:00</span>
              </motion.div>
            </div>
          </div>

          {/* Блоки ссылок */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-medium mb-4 text-white relative inline-block">
                  {section.title}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.2 }}
                  />
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <motion.li 
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) + (j * 0.1) }}
                    >
                      <Link 
                        href={link.href}
                        className="group flex items-center transition-colors duration-300"
                        onMouseEnter={() => setHoveredIndex(i * 10 + j)}
                        onMouseLeave={() => setHoveredIndex(-1)}
                      >
                        <motion.span 
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100"
                          animate={{ 
                            scale: hoveredIndex === i * 10 + j ? [1, 1.5, 1] : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="text-gray-400 group-hover:text-white transition-colors text-sm duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Разделительная линия */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Нижний блок футера */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} МистерАвто. Все права защищены.
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href="#"
                aria-label={social.name}
                className="w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-blue-400/50 hover:bg-blue-500/10 transition-colors duration-300 text-gray-400 hover:text-white"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 