'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Phone, Car, MessageSquare, Send } from 'lucide-react'

interface ServiceAppointmentFormProps {
  className?: string
}

export default function ServiceAppointmentForm({ className = '' }: ServiceAppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    date: '',
    time: '',
    services: [] as string[],
    comment: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const services = [
    { id: 'diagnostics', label: 'Диагностика' },
    { id: 'maintenance', label: 'Техобслуживание' },
    { id: 'repair', label: 'Ремонт' },
    { id: 'bodywork', label: 'Кузовные работы' },
    { id: 'tires', label: 'Шиномонтаж' },
    { id: 'electronics', label: 'Электрика' }
  ]
  
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ]
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    setFormData(prev => {
      if (checked) {
        return { ...prev, services: [...prev.services, value] }
      } else {
        return { ...prev, services: prev.services.filter(service => service !== value) }
      }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Имитация отправки данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Успешный ответ
      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        carModel: '',
        date: '',
        time: '',
        services: [],
        comment: ''
      })
      
      // Сбросить сообщение об успехе через 5 секунд
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Ошибка при отправке формы:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Анимации
  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    }
  }
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }
  
  // Минимальная дата для выбора (сегодня)
  const today = new Date().toISOString().split('T')[0]
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 ${className}`}
    >
      <h3 className="text-2xl font-bold mb-6 text-center text-white">Запись на сервис</h3>
      
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
        >
          <h4 className="text-xl font-medium text-green-400 mb-2">Заявка успешно отправлена!</h4>
          <p className="text-gray-300">
            Наш специалист свяжется с вами в ближайшее время для подтверждения записи.
          </p>
        </motion.div>
      ) : (
        <motion.form 
          variants={formAnimation}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {/* Персональные данные */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemAnimation}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Ваше имя *
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
                  onChange={handleChange}
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Иван Иванов"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemAnimation}>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Телефон *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Информация об автомобиле */}
          <motion.div variants={itemAnimation}>
            <label htmlFor="carModel" className="block text-sm font-medium text-gray-300 mb-2">
              Марка и модель автомобиля *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Car className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="carModel"
                name="carModel"
                type="text"
                required
                value={formData.carModel}
                onChange={handleChange}
                className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Например: Toyota Camry"
              />
            </div>
          </motion.div>
          
          {/* Дата и время */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemAnimation}>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                Дата *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemAnimation}>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                Время *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Выберите время</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>
          
          {/* Услуги */}
          <motion.div variants={itemAnimation}>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Необходимые услуги *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map(service => (
                <div key={service.id} className="flex items-center">
                  <input
                    id={service.id}
                    name="services"
                    type="checkbox"
                    value={service.id}
                    checked={formData.services.includes(service.id)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 accent-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={service.id} className="ml-2 text-sm text-gray-300">
                    {service.label}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Комментарий */}
          <motion.div variants={itemAnimation}>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
              Комментарий
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleChange}
                className="bg-slate-700 border border-slate-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Опишите проблему или укажите дополнительные пожелания"
              ></textarea>
            </div>
          </motion.div>
          
          {/* Кнопка отправки */}
          <motion.div variants={itemAnimation} className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                isSubmitting 
                  ? 'bg-blue-600/50 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              } transition-colors`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Отправить заявку
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      )}
    </motion.div>
  )
} 