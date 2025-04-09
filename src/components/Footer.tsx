'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Footer = () => {
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

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-[#0F1631] to-[#090E34] text-white pt-16 pb-8 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl opacity-60"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.7, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-purple-600/10 to-blue-600/10 rounded-full blur-3xl opacity-60"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.7, 0.6]
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Сетка как на фоне */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        
        {/* Анимированные частицы */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Логотип и информация о компании */}
          <div className="lg:col-span-2">
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer mb-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">МА</span>
                </div>
                <div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    МистерАвто
                  </span>
                </div>
              </motion.div>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Профессиональный сервис и магазин автозапчастей. Мы предлагаем качественные запчасти и услуги по ремонту и обслуживанию автомобилей любых марок.
            </p>
            
            <div className="mb-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">info@мистеравто.рф</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">г. Москва, ул. Автомобильная, 10</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Ссылки */}
          {footerLinks.map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                      whileHover={{ x: 3 }}
                    >
                      <svg className="w-3 h-3 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Разделитель */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm order-2 md:order-1 mt-4 md:mt-0">
              © {currentYear} МистерАвто. Все права защищены.
            </p>
            
            <div className="flex space-x-6 order-1 md:order-2">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Политика конфиденциальности
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Условия использования
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Декоративная линия сверху */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </footer>
  )
}

export default Footer 