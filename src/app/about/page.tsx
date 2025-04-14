'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Star, Award, TrendingUp, Heart } from 'lucide-react'

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

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Данные о компании
  const companyStats = [
    {
      icon: <Calendar className="w-6 h-6" />,
      value: '15+',
      label: 'лет на рынке'
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: '30+',
      label: 'опытных сотрудников'
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: '10 000+',
      label: 'довольных клиентов'
    }
  ]
  
  // Команда
  const teamMembers = [
    {
      name: 'Иванов Иван',
      position: 'Генеральный директор',
      bio: 'Более 20 лет опыта в автомобильной индустрии. Отвечает за стратегическое развитие компании и контроль качества услуг.',
    },
    {
      name: 'Петров Петр',
      position: 'Технический директор',
      bio: 'Сертифицированный инженер-механик с глубокими знаниями автомобильных систем. Следит за внедрением современных технологий ремонта.',
    },
    {
      name: 'Сидорова Елена',
      position: 'Руководитель отдела продаж',
      bio: 'Эксперт по автозапчастям с обширными знаниями рынка. Обеспечивает наличие качественных комплектующих по оптимальным ценам.',
    }
  ]
  
  // Ценности компании
  const values = [
    {
      icon: <Award className="w-8 h-8 text-blue-400" />,
      title: 'Качество',
      description: 'Мы используем только оригинальные или качественные аналоговые запчасти и современное оборудование для диагностики и ремонта автомобилей.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      title: 'Профессионализм',
      description: 'Наша команда состоит из опытных специалистов, регулярно проходящих обучение и повышение квалификации, чтобы быть в курсе последних технологий.'
    },
    {
      icon: <Heart className="w-8 h-8 text-teal-400" />,
      title: 'Клиентоориентированность',
      description: 'Мы ставим потребности клиента на первое место, обеспечивая прозрачность работы, честные цены и соблюдение сроков.'
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
            О компании
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Мистер Авто — это команда профессионалов, объединенных общей целью: 
            обеспечивать клиентов качественными автозапчастями и сервисным обслуживанием
          </p>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* История компании */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Наша история</h2>
          
          <div className="bg-slate-800/30 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {companyStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <div className="text-blue-400">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Компания «Мистер Авто» начала свою деятельность в 2008 году с небольшого магазина автозапчастей на окраине города. 
                Основатели компании, имея богатый опыт работы в автомобильной сфере, поставили перед собой амбициозную цель: 
                создать сеть магазинов и сервисных центров, где клиенты могли бы получить полный спектр услуг по обслуживанию своих автомобилей.
              </p>
              <p className="text-gray-300 mb-4">
                За годы работы мы расширили свою сеть до нескольких филиалов, значительно увеличили ассортимент предлагаемых товаров и услуг,
                а также собрали команду высококвалифицированных специалистов, способных решать задачи любой сложности.
              </p>
              <p className="text-gray-300">
                Сегодня «Мистер Авто» — это современный многопрофильный бизнес, включающий в себя магазины автозапчастей,
                сервисные центры и интернет-магазин, обслуживающий клиентов по всей России. 
                Мы постоянно развиваемся, внедряем новые технологии и стремимся к тому, чтобы каждый клиент остался доволен нашей работой.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Миссия и ценности */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Наша миссия и ценности</h2>
          
          <motion.div 
            variants={fadeInUp}
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Миссия компании</h3>
              <p className="text-gray-300 text-center mb-6">
                Обеспечивать владельцев автомобилей качественными запчастями и профессиональным сервисом, 
                делая обслуживание автомобилей доступным, быстрым и надежным.
              </p>
              
              <div className="border-t border-slate-700 w-24 mx-auto my-8"></div>
              
              <h3 className="text-xl font-semibold mb-6 text-center">Наши ценности</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-slate-800/50 rounded-xl p-5 flex flex-col items-center text-center"
                  >
                    <div className="mb-4">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-medium mb-2">{value.title}</h4>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Команда */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Наша команда</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-4 text-center">{member.position}</p>
                <p className="text-gray-300 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Сертификаты и партнеры */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Сертификаты и партнеры</h2>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <p className="text-gray-300 text-center mb-8">
              Мы гордимся сотрудничеством с ведущими производителями автозапчастей и расходных материалов, 
              что позволяет нам предлагать нашим клиентам только сертифицированную продукцию высокого качества.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800/50 rounded-lg h-20 flex items-center justify-center"
                >
                  <div className="text-gray-400 text-sm">Партнер {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 