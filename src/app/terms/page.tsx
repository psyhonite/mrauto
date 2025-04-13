'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const TermsPage = () => {
  return (
    <main className="relative bg-gradient-to-b from-[#0A1128] to-[#1E2A45] text-white min-h-screen pt-28 pb-20">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* Digital circuit lines */}
        <div className="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-70" />
        <div className="absolute right-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent opacity-70" />
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-70" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-70" />
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-top-left" />
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden opacity-10">
          <div className="absolute bottom-0 right-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-45 origin-bottom-right" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        
        {/* Car blueprint pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Анимированные частицы как искры от сварки */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [0, -Math.random() * 70 - 30],
                opacity: [Math.random() * 0.5 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#0D1630]/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden">
          <motion.div 
            className="p-6 md:p-10 bg-gradient-to-r from-blue-600 to-red-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Пользовательское Соглашение
            </h1>
          </motion.div>
          
          <motion.div 
            className="p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между Лотокин Игорь Юревич (далее Мистер Авто или Администрация) с одной стороны и пользователем сайта с другой.
              </p>
              <p className="text-gray-300">
                Сайт Мистер Авто не является средством массовой информации.
              </p>
              
              <div className="bg-blue-900/30 border-l-4 border-blue-600 p-4 mb-6">
                <p className="font-medium text-blue-200">
                  Используя сайт, Вы соглашаетесь с условиями данного соглашения.
                  Если Вы не согласны с условиями данного соглашения, не используйте сайт Мистер Авто!
                </p>
              </div>
              
              <h2 className="text-xl font-bold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Предмет соглашения</h2>
              <p className="text-gray-300">
                Администрация предоставляет пользователю право на размещение на сайте следующей информации:
              </p>
              <ul className="text-gray-300">
                <li>Текстовой информации</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Права и обязанности сторон</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Пользователь имеет право:</h3>
              <ul className="text-gray-300">
                <li>осуществлять поиск информации на сайте</li>
                <li>получать информацию на сайте</li>
                <li>требовать от администрации скрытия любой информации о пользователе</li>
                <li>требовать от администрации скрытия любой информации переданной пользователем сайту</li>
                <li>использовать информацию сайта в личных некоммерческих целях</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Администрация имеет право:</h3>
              <ul className="text-gray-300">
                <li>по своему усмотрению и необходимости создавать, изменять, отменять правила</li>
                <li>ограничивать доступ к любой информации на сайте</li>
                <li>создавать, изменять, удалять информацию</li>
                <li>удалять учетные записи</li>
                <li>отказывать в регистрации без объяснения причин</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Пользователь обязуется:</h3>
              <ul className="text-gray-300">
                <li>обеспечить достоверность предоставляемой информации</li>
                <li>обеспечивать сохранность личных данных от доступа третьих лиц</li>
                <li>не нарушать работоспособность сайта</li>
                <li>не создавать несколько учётных записей на Сайте, если фактически они принадлежат одному и тому же лицу</li>
                <li>не использовать скрипты (программы) для автоматизированного сбора информации и/или взаимодействия с Сайтом и его Сервисами</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-white">Администрация обязуется:</h3>
              <ul className="text-gray-300">
                <li>поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам.</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Ответственность сторон</h2>
              <ul className="text-gray-300">
                <li>пользователь лично несет полную ответственность за распространяемую им информацию</li>
                <li>администрация не несет никакой ответственности за достоверность информации, скопированной из других источников</li>
                <li>администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами</li>
                <li>в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Условия действия Соглашения</h2>
              <ul className="text-gray-300">
                <li>Данное Соглашение вступает в силу при любом использовании данного сайта.</li>
                <li>Соглашение перестает действовать при появлении его новой версии.</li>
                <li>Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.</li>
                <li>Администрация не оповещает пользователей об изменении в Соглашении.</li>
              </ul>
              
              <div className="mt-10 pt-6 border-t border-white/10">
                <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Вернуться на главную
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default TermsPage 