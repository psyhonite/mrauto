'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from 'lucide-react'

// Анимационные варианты
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function ContactsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [activeTab, setActiveTab] = useState(0)
  
  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Реализовать отправку формы
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }
  
  // Данные филиалов
  const locations = [
    {
      id: 1,
      name: 'Главный офис',
      address: 'г. Москва, ул. Автомобильная, 42',
      phone: '+7 (495) 123-45-67',
      email: 'info@mrauto.ru',
      hours: 'Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00',
      mapUrl: 'https://yandex.ru/map-widget/v1/-/CCUvVHRfdC',
      coordinates: [55.755864, 37.617698]
    },
    {
      id: 2,
      name: 'Сервисный центр Север',
      address: 'г. Москва, Северный бульвар, 14',
      phone: '+7 (495) 987-65-43',
      email: 'service@mrauto.ru',
      hours: 'Пн-Вс: 8:00 - 22:00',
      mapUrl: 'https://yandex.ru/map-widget/v1/-/CCUvVLcc2A',
      coordinates: [55.845638, 37.639816]
    },
    {
      id: 3,
      name: 'Автосалон Запад',
      address: 'г. Москва, Западный проспект, 28',
      phone: '+7 (495) 456-78-90',
      email: 'sales@mrauto.ru',
      hours: 'Пн-Пт: 9:00 - 21:00, Сб-Вс: 10:00 - 20:00',
      mapUrl: 'https://yandex.ru/map-widget/v1/-/CCUvVPwdkC',
      coordinates: [55.728577, 37.432562]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* Заголовок страницы с анимированным градиентом */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-500/30 to-blue-600/30 opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Свяжитесь с нами
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Мы всегда готовы ответить на ваши вопросы и помочь с выбором автозапчастей или записью на сервисное обслуживание
          </p>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Основная информация о контактах */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-800/70 transition duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Телефон</h3>
            <p className="text-gray-300 mb-4">Звоните нам 24/7 для консультации</p>
            <a href="tel:+74951234567" className="text-blue-400 hover:text-blue-300 transition-colors">
              +7 (495) 123-45-67
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-800/70 transition duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-300 mb-4">Напишите нам с любым вопросом</p>
            <a href="mailto:info@mrauto.ru" className="text-purple-400 hover:text-purple-300 transition-colors">
              info@mrauto.ru
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-800/70 transition duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Адрес</h3>
            <p className="text-gray-300 mb-4">Посетите наш главный офис</p>
            <p className="text-teal-400">г. Москва, ул. Автомобильная, 42</p>
          </motion.div>
        </motion.div>
        
        {/* Секция с картой и филиалами */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-slate-800/30 rounded-2xl p-6 mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Наши филиалы</h2>
          
          {/* Табы с филиалами */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === index 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
          
          {/* Информация о филиале и карта */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{locations[activeTab].name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>{locations[activeTab].address}</span>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>{locations[activeTab].phone}</span>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>{locations[activeTab].email}</span>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>{locations[activeTab].hours}</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] md:h-[400px] bg-slate-700 rounded-xl overflow-hidden">
              {/* Здесь будет Яндекс.Карта */}
              <iframe 
                src={locations[activeTab].mapUrl}
                width="100%" 
                height="100%" 
                className="border-0"
                allowFullScreen={true}
                aria-hidden="false" 
                tabIndex={0}
              ></iframe>
            </div>
          </div>
        </motion.div>
        
        {/* Форма обратной связи */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Напишите нам</h2>
          
          <form onSubmit={handleSubmit} className="bg-slate-800/30 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Ваше имя
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Иван Иванов"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Номер телефона
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Сообщение
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Напишите ваш вопрос или сообщение..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Send className="w-5 h-5 mr-2" />
                Отправить сообщение
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 