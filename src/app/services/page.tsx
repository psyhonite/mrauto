'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Wrench, Check, ArrowRight, AlertCircle, ShieldCheck, Clock, Settings, Wrench as ToolIcon } from 'lucide-react'
import ServiceAppointmentForm from '@/components/ServiceAppointmentForm'

// Анимационные варианты
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
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

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Анимация при скролле
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  
  // Данные об услугах
  const servicesList = [
    {
      id: 'diagnostics',
      title: 'Компьютерная диагностика',
      description: 'Полная проверка всех систем автомобиля с использованием современного диагностического оборудования для точного определения причин неисправностей.',
      price: 'от 1 500 ₽',
      icon: <Settings className="w-7 h-7" />,
      features: [
        'Диагностика двигателя и электроники',
        'Проверка тормозной системы',
        'Диагностика ходовой части',
        'Проверка уровней жидкостей'
      ]
    },
    {
      id: 'maintenance',
      title: 'Техническое обслуживание',
      description: 'Регулярное ТО по регламенту производителя с использованием оригинальных или качественных аналоговых запчастей для поддержания автомобиля в отличном состоянии.',
      price: 'от 4 000 ₽',
      icon: <Wrench className="w-7 h-7" />,
      features: [
        'Замена масла и фильтров',
        'Проверка и замена технических жидкостей',
        'Проверка и регулировка подвески',
        'Диагностика и настройка двигателя'
      ]
    },
    {
      id: 'repair',
      title: 'Слесарный ремонт',
      description: 'Квалифицированный ремонт ходовой части, двигателя, трансмиссии и других механических узлов автомобиля с гарантией на все виды работ.',
      price: 'от 2 500 ₽',
      icon: <Wrench className="w-7 h-7" />,
      features: [
        'Ремонт двигателя и КПП',
        'Замена сцепления',
        'Ремонт тормозной системы',
        'Замена элементов подвески'
      ]
    },
    {
      id: 'bodywork',
      title: 'Кузовной ремонт',
      description: 'Профессиональное восстановление геометрии кузова, устранение вмятин, покраска и полировка для возвращения автомобилю первоначального вида.',
      price: 'от 3 500 ₽',
      icon: <Wrench className="w-7 h-7" />,
      features: [
        'Устранение вмятин и царапин',
        'Восстановление геометрии кузова',
        'Покраска элементов',
        'Полировка и защитное покрытие'
      ]
    },
    {
      id: 'tires',
      title: 'Шиномонтаж',
      description: 'Профессиональная замена и балансировка шин, сезонное хранение и ремонт колес с использованием современного оборудования.',
      price: 'от 2 000 ₽',
      icon: <Settings className="w-7 h-7" />,
      features: [
        'Замена и балансировка шин',
        'Ремонт дисков и шин',
        'Сезонное хранение колес',
        'Подбор и продажа новых шин'
      ]
    },
    {
      id: 'electronics',
      title: 'Ремонт электрики',
      description: 'Диагностика и устранение неисправностей в электронных системах автомобиля, установка дополнительного электрооборудования.',
      price: 'от 1 800 ₽',
      icon: <Settings className="w-7 h-7" />,
      features: [
        'Ремонт электропроводки',
        'Диагностика и ремонт ЭБУ',
        'Установка сигнализаций',
        'Ремонт стартеров и генераторов'
      ]
    }
  ]
  
  // Преимущества
  const advantages = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      title: 'Гарантия качества',
      description: 'Предоставляем гарантию на все виды работ и используемые запчасти.'
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-purple-400" />,
      title: 'Прозрачные цены',
      description: 'Никаких скрытых платежей. Вы заранее знаете стоимость всех работ.'
    },
    {
      icon: <Clock className="w-8 h-8 text-teal-400" />,
      title: 'Точно в срок',
      description: 'Соблюдаем установленные сроки ремонта и сервисного обслуживания.'
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
          style={{ opacity, y }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Наши услуги
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Полный спектр услуг по обслуживанию и ремонту автомобилей любых марок с гарантией качества
          </p>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Услуги */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {servicesList.map((service) => (
            <motion.div 
              key={service.id}
              variants={fadeInUp}
              className="bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 mr-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-4 min-h-[80px]">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-blue-400">{service.price}</div>
                  <button className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Подробнее <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Преимущества и форма записи */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="bg-slate-800/30 rounded-2xl p-6 lg:p-8"
          >
            <h2 className="text-2xl font-bold mb-8">
              Почему выбирают наш сервис
            </h2>
            
            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex-shrink-0">
                    {advantage.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{advantage.title}</h3>
                    <p className="text-gray-300">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Нужна помощь с выбором услуги?</h3>
              <p className="text-gray-300 mb-4">
                Наши специалисты помогут определить необходимый перечень работ и рассчитать стоимость.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="tel:+74951234567" 
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Позвонить
                </a>
                <button 
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                  onClick={() => {
                    const element = document.getElementById('appointment-form')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Записаться онлайн
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative h-full"
          >
            <div className="absolute top-0 -left-20 w-40 h-40 bg-blue-500/30 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 -right-20 w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl opacity-20"></div>
            
            <div className="h-full relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-6">
              <div className="absolute inset-0 bg-slate-800/50"></div>
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
              
              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="p-4 rounded-full bg-blue-500/20 w-16 h-16 flex items-center justify-center mb-6">
                  <ToolIcon className="w-8 h-8 text-blue-400" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Современное оборудование</h3>
                <p className="text-gray-300 max-w-md mb-6">
                  Наш сервисный центр оснащен современным диагностическим и ремонтным оборудованием, 
                  что позволяет нам выполнять работы любой сложности быстро и качественно.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Компьютерная диагностика двигателя и электронных систем</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Стенды для проверки и регулировки углов установки колес</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Профессиональное оборудование для кузовного ремонта</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Форма записи на сервис */}
        <div id="appointment-form">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Запись на сервисное обслуживание
          </motion.h2>
          
          <ServiceAppointmentForm className="max-w-4xl mx-auto" />
        </div>
      </div>
    </div>
  )
} 