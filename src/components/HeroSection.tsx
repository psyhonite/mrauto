'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

const HeroSection = () => {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Состояния для формы записи
  const [selectedService, setSelectedService] = useState('maintenance'); // 'maintenance' или 'repair'
  const [selectedDate, setSelectedDate] = useState(0); // индекс выбранной даты
  const [selectedTime, setSelectedTime] = useState(1); // индекс выбранного времени
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  // Форматирование телефонного номера
  const formatPhone = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, '');
    
    // Ограничиваем до 11 цифр (для российского формата)
    const limited = cleaned.substring(0, 11);
    
    // Форматируем для отображения
    let formatted = '';
    if (limited.length > 0) {
      formatted = '+' + limited.charAt(0);
      if (limited.length > 1) {
        formatted += ' (' + limited.substring(1, 4);
        if (limited.length > 4) {
          formatted += ') ' + limited.substring(4, 7);
          if (limited.length > 7) {
            formatted += '-' + limited.substring(7, 9);
            if (limited.length > 9) {
              formatted += '-' + limited.substring(9, 11);
            }
          }
        }
      }
    }
    
    return formatted;
  };
  
  // Обработка изменения телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };
  
  // Имитация отправки формы
  const handleSubmit = () => {
    if (phone.length < 16) return; // Проверка на валидность номера
    
    setIsSubmitting(true);
    // Имитируем запрос к API
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Сброс формы
        setPhone('');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1128] to-[#1E2A45]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute -top-20 -left-20 w-[50rem] h-[50rem] bg-gradient-to-br from-blue-600/20 to-red-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y, opacity }}
          className="absolute -bottom-20 -right-20 w-[50rem] h-[50rem] bg-gradient-to-tl from-red-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        
        {/* Digital circuit patterns */}
        <div className="absolute inset-0 backdrop-blur-[1px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
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
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
                    Автосервис и магазин
                  </span>{" "}
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient delay-75">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
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
                className="relative h-[500px] w-full"
              >
                {/* Добавить баннер над формой */}
                <motion.div
                  className="absolute z-50 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 50 }}
                  style={{ top: "-40px" }}
                >
                  <motion.div
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-white text-sm font-medium shadow-xl"
                    animate={{ 
                      y: [0, -8, 0], 
                      x: [0, 5, -5, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <span className="flex items-center">
                      <span className="text-lg mr-1.5">🔥</span> Скидка 15% на первое обслуживание
                    </span>
                  </motion.div>
                </motion.div>
                
                {/* Премиум сервисный калькулятор с записью */}
                <motion.div
                  className="absolute inset-0 z-10 rounded-3xl overflow-hidden backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(10,17,40,0.85) 0%, rgba(30,42,69,0.95) 100%)',
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Фоновые эффекты */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute -right-24 top-1/3 w-64 h-64 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)' }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute -left-24 bottom-1/3 w-64 h-64 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15), transparent 70%)' }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    />
                  </div>

                  {/* Шапка блока */}
                  <motion.div 
                    className="absolute top-8 inset-x-0 px-8 flex justify-between items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500"></div>
                        <div className="relative h-full w-full flex items-center justify-center p-1">
                          <Image
                            src="/images/logo.png"
                            alt="МистерАвто Логотип"
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-bold tracking-wide">ОНЛАЙН ЗАПИСЬ</span>
                        <span className="text-xs text-blue-300">Расчет стоимости</span>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
                      <span className="flex items-center">
                        <span className="text-green-400 mr-1">●</span> Работаем сейчас
                      </span>
                    </div>
                  </motion.div>

                  {/* Контент калькулятора */}
                  <div className="absolute top-24 bottom-20 inset-x-6 overflow-y-auto scrollbar-hide">
                    {/* Всплывающее сообщение об успешной отправке */}
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-0 inset-x-0 bg-green-500/90 text-white p-3 rounded-xl z-50 flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Заголовок */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <h3 className="text-white text-lg font-bold mb-1">Запись на сервис</h3>
                      <p className="text-sm text-gray-300">Выберите услугу и удобную дату</p>
                    </motion.div>
                    
                    {/* Выбор услуги */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div 
                          className={`relative overflow-hidden rounded-2xl p-4 h-32 flex flex-col justify-between group cursor-pointer ${selectedService === 'maintenance' ? 'ring-2 ring-blue-500' : ''}`}
                          whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.5)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedService('maintenance')}
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.2) 100%)',
                            border: '1px solid rgba(59,130,246,0.3)'
                          }}
                        >
                          <div>
                            <div className="text-xs text-blue-300 mb-1">Техническое</div>
                            <div className="text-white text-lg font-bold">Обслуживание</div>
                          </div>
                          <div className="flex justify-between items-end">
                            <motion.div 
                              className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-medium"
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59,130,246,0.3)' }}
                            >
                              от 2 500 ₽
                            </motion.div>
                            <span className="text-2xl opacity-20 group-hover:opacity-50 transition-opacity">🛠️</span>
                          </div>
                          
                          <motion.div 
                            className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)' }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </motion.div>

                        <motion.div 
                          className={`relative overflow-hidden rounded-2xl p-4 h-32 flex flex-col justify-between group cursor-pointer ${selectedService === 'repair' ? 'ring-2 ring-red-500' : ''}`}
                          whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.5)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedService('repair')}
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.2) 100%)',
                            border: '1px solid rgba(239,68,68,0.3)'
                          }}
                        >
                          <div>
                            <div className="text-xs text-red-300 mb-1">Диагностика и</div>
                            <div className="text-white text-lg font-bold">Ремонт</div>
                          </div>
                          <div className="flex justify-between items-end">
                            <motion.div 
                              className="px-2 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs font-medium"
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(239,68,68,0.3)' }}
                            >
                              от 1 500 ₽
                            </motion.div>
                            <span className="text-2xl opacity-20 group-hover:opacity-50 transition-opacity">🔧</span>
                          </div>
                          
                          <motion.div 
                            className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.3), transparent 70%)' }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Выбор даты и времени */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    >
                      <label className="text-xs text-gray-400 mb-2 block">Выберите дату</label>
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {['Сегодня', 'Завтра', 'Пт, 10', 'Сб, 11', 'Вс, 12'].map((day, i) => (
                          <motion.div
                            key={i}
                            className={`p-2 rounded-xl border text-center text-sm cursor-pointer transition-all ${i === selectedDate ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-700 text-gray-400 hover:border-blue-500/50'}`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(i)}
                          >
                            {day}
                          </motion.div>
                        ))}
                      </div>
                      
                      <label className="text-xs text-gray-400 mb-2 block">Выберите время</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['10:00', '12:00', '14:00', '16:00'].map((time, i) => (
                          <motion.div
                            key={i}
                            className={`p-2 rounded-xl border text-center text-sm cursor-pointer transition-all ${i === selectedTime ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-700 text-gray-400 hover:border-blue-500/50'}`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(i)}
                          >
                            {time}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Ввод контактов */}
                    <motion.div
                      className="relative mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                    >
                      <label className="text-xs text-gray-400 mb-2 block">Введите телефон для связи</label>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="+7 (___) ___-__-__" 
                          className="flex-1 rounded-l-xl px-4 py-3 bg-white/5 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                        />
                        <button 
                          className={`${isSubmitting ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} transition-colors text-white rounded-r-xl px-4 flex items-center justify-center min-w-[3rem]`}
                          onClick={handleSubmit}
                          disabled={isSubmitting || phone.length < 16}
                        >
                          {isSubmitting ? (
                            <motion.div 
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {phone.length > 0 && phone.length < 16 && (
                        <p className="text-xs text-red-400 mt-1">Введите полный номер телефона</p>
                      )}
                    </motion.div>

                    {/* Отзывы */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                    >
                      <div className="flex items-start">
                        <div className="flex -space-x-2 mr-3">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center border-2 border-[#0A1128] text-white text-xs font-bold">
                            МД
                          </div>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center border-2 border-[#0A1128] text-white text-xs font-bold">
                            АК
                          </div>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center border-2 border-[#0A1128] text-white text-xs font-bold">
                            ВП
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-xs text-yellow-400 mb-1">
                            ★★★★★ <span className="ml-1 text-gray-400">4.9 (128 отзывов)</span>
                          </div>
                          <p className="text-xs text-gray-400">Клиенты довольны нашим сервисом</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Нижние кнопки */}
                  <div className="absolute bottom-6 inset-x-6">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        className="relative group overflow-hidden rounded-xl h-12"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting || phone.length < 16}
                      >
                        <div className={`absolute inset-0 rounded-xl transition-opacity ${isSubmitting || phone.length < 16 ? 'bg-gray-600 opacity-90' : 'bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100'}`} />
                        <div className="relative h-full flex items-center justify-center text-white font-medium">
                          {isSubmitting ? (
                            <motion.div 
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : null}
                          Записаться
                        </div>
                      </motion.button>
                      
                      <motion.button
                        className="relative group overflow-hidden rounded-xl h-12 border border-white/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-white/5 rounded-xl group-hover:bg-white/10 transition-all" />
                        <div className="relative h-full flex items-center justify-center text-white font-medium">
                          Каталог
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Декоративные элементы */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
                  </div>
                </motion.div>
                
                {/* Фоновые световые эффекты */}
                <motion.div 
                  className="absolute -top-20 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-20 -left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 