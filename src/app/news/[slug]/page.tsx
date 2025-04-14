"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import FavoriteButton from '@/components/FavoriteButton';
import { useFavorites } from '@/context/FavoritesContext';
import '../../blog.css';

// Добавляем стили для анимации
const floatAnimation = `
@keyframes float {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-15px) translateX(10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
`;

// Типы данных
interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  author: Author;
  tags: Tag[];
}

// Демо-данные для авторов
const authors: Author[] = [
  {
    id: "1",
    name: "Мария Иванова",
    avatar: "/images/blog/avatar-1.jpg",
    role: "Главный редактор"
  },
  {
    id: "2",
    name: "Алексей Петров",
    avatar: "/images/blog/avatar-2.jpg",
    role: "Технический эксперт"
  }
];

// Демо-данные для тегов
const tags: Tag[] = [
  { id: "1", name: "Запчасти" },
  { id: "2", name: "Ремонт" },
  { id: "3", name: "Диагностика" },
  { id: "4", name: "Советы" },
  { id: "5", name: "Новинки" }
];

// Демо-данные для статей
const articles: Article[] = [
  {
    id: "1",
    title: "Как правильно выбрать масло для вашего автомобиля",
    slug: "how-to-choose-oil",
    excerpt: "Разбираемся в тонкостях выбора моторного масла для разных типов двигателей и условий эксплуатации",
    content: `
      <h2>Как правильно выбрать масло для вашего автомобиля</h2>
      
      <p>Выбор правильного моторного масла — один из важнейших аспектов ухода за двигателем вашего автомобиля. Качественное масло не только обеспечивает смазку трущихся деталей, но и отводит тепло, очищает двигатель от продуктов износа и защищает его от коррозии.</p>
      
      <p>В этой статье мы рассмотрим основные критерии выбора моторного масла и дадим рекомендации для разных типов двигателей.</p>
      
      <h3>Что нужно знать при выборе масла</h3>
      
      <p>1. <strong>Рекомендации производителя автомобиля</strong> — это основной критерий. В руководстве по эксплуатации указаны требуемые характеристики масла: вязкость, спецификации и допуски.</p>
      
      <p>2. <strong>Вязкость масла по SAE</strong> — это показатель, определяющий текучесть масла при разных температурах. Например, 5W-30 означает, что масло имеет вязкость 5 при низких температурах (W от англ. winter — зима) и 30 при рабочей температуре двигателя.</p>
      
      <p>3. <strong>Тип масла</strong> — минеральное, полусинтетическое или синтетическое. Синтетические масла обеспечивают лучшую защиту и имеют более широкий температурный диапазон применения, но стоят дороже.</p>
      
      <h3>Какое масло подходит для разных двигателей</h3>
      
      <p><strong>Для бензиновых двигателей</strong> обычно рекомендуются масла с спецификациями API SN/SM или ACEA A3/A5. Вязкость зависит от климатических условий, но чаще всего это 5W-30, 5W-40 или 10W-40.</p>
      
      <p><strong>Для дизельных двигателей</strong> подходят масла с спецификациями API CI-4/CJ-4 или ACEA B3/B4/B5. Вязкость также выбирается в зависимости от климата, обычно это 5W-30, 5W-40, 10W-40.</p>
      
      <p><strong>Для двигателей с большим пробегом</strong> (более 150 000 км) рекомендуются специальные масла с повышенным содержанием присадок, восстанавливающих эластичность сальников и снижающих расход масла.</p>
      
      <h3>Как часто нужно менять масло</h3>
      
      <p>Интервал замены масла указан в руководстве по эксплуатации автомобиля. Обычно это 10 000-15 000 км для современных двигателей при использовании качественных синтетических масел. Однако при тяжелых условиях эксплуатации (частые короткие поездки, езда по пыльным дорогам, буксировка прицепа) масло следует менять чаще.</p>
      
      <h3>Заключение</h3>
      
      <p>Правильный выбор моторного масла — залог долгой и надежной работы двигателя. При выборе масла руководствуйтесь в первую очередь рекомендациями производителя автомобиля, учитывайте климатические условия и режим эксплуатации. И не забывайте своевременно проводить замену масла!</p>
    `,
    coverImage: "/images/blog/oil-selection.jpg",
    publishDate: "2023-09-15",
    readTime: 8,
    author: authors[0],
    tags: [tags[0], tags[3]]
  },
  {
    id: "2",
    title: "Топ-10 причин шума в подвеске и способы их устранения",
    slug: "top-10-suspension-noise-causes",
    excerpt: "Разбираемся в причинах шумов и стуков в подвеске автомобиля, и как их диагностировать",
    content: `
      <h2>Топ-10 причин шума в подвеске и способы их устранения</h2>
      
      <p>Шумы и стуки в подвеске не только доставляют дискомфорт при езде, но и могут быть признаком серьезных проблем с автомобилем. В этой статье мы рассмотрим 10 самых распространенных причин шума в подвеске и расскажем, как их выявить и устранить.</p>
      
      <h3>1. Изношенные амортизаторы</h3>
      
      <p>Проявления: стук при проезде неровностей, раскачивание автомобиля после преодоления препятствий.</p>
      <p>Решение: замена амортизаторов. Рекомендуется менять их парами на одной оси.</p>
      
      <h3>2. Неисправные шаровые опоры</h3>
      
      <p>Проявления: стук при проезде неровностей, особенно заметный при поворотах руля.</p>
      <p>Решение: замена шаровых опор. Это важный элемент безопасности, поэтому не стоит откладывать ремонт.</p>
      
      <h3>3. Изношенные сайлентблоки</h3>
      
      <p>Проявления: глухие стуки при начале движения и торможении, скрип при поворотах.</p>
      <p>Решение: замена сайлентблоков. Можно заменить отдельные элементы или весь рычаг в сборе.</p>
      
      <h3>4. Проблемы со стойками стабилизатора</h3>
      
      <p>Проявления: стуки при проезде неровностей, особенно при движении на малой скорости.</p>
      <p>Решение: замена стоек или втулок стабилизатора.</p>
      
      <h3>5. Износ подшипников ступиц</h3>
      
      <p>Проявления: гул, усиливающийся с ростом скорости, часто меняющийся при поворотах.</p>
      <p>Решение: замена подшипника ступицы.</p>
      
      <h3>6. Неисправные пружины подвески</h3>
      
      <p>Проявления: стуки при проезде неровностей, проседание автомобиля с одной стороны.</p>
      <p>Решение: замена пружин. Рекомендуется менять парами на одной оси.</p>
      
      <h3>7. Проблемы с опорами амортизаторов</h3>
      
      <p>Проявления: стук в районе колес при поворотах руля, особенно на месте.</p>
      <p>Решение: замена опор амортизаторов.</p>
      
      <h3>8. Износ рулевых наконечников и тяг</h3>
      
      <p>Проявления: стук при поворотах руля, люфт в рулевом управлении.</p>
      <p>Решение: замена наконечников или тяг рулевого управления.</p>
      
      <h3>9. Неисправность ШРУС</h3>
      
      <p>Проявления: щелчки при поворотах, особенно при полностью вывернутом руле.</p>
      <p>Решение: замена пыльника ШРУС или всего узла в сборе.</p>
      
      <h3>10. Проблемы с подрамником</h3>
      
      <p>Проявления: стук и вибрация при движении, особенно по неровной дороге.</p>
      <p>Решение: подтяжка болтов крепления подрамника или замена его сайлентблоков.</p>
      
      <h3>Как диагностировать проблемы с подвеской</h3>
      
      <p>Для точной диагностики проблем с подвеской рекомендуется обратиться к специалистам, которые проведут осмотр на подъемнике и проверят все элементы подвески. Однако некоторые проверки можно выполнить самостоятельно:</p>
      
      <ul>
        <li>Визуальный осмотр элементов подвески на предмет износа и повреждений</li>
        <li>Проверка люфтов с помощью раскачивания автомобиля или колеса</li>
        <li>Прослушивание подвески при движении по неровностям</li>
      </ul>
      
      <h3>Заключение</h3>
      
      <p>Своевременная диагностика и устранение проблем с подвеской не только сделает вашу поездку комфортнее, но и повысит безопасность движения, а также предотвратит более серьезные поломки в будущем. Не игнорируйте посторонние шумы и стуки — они всегда являются сигналом о том, что автомобилю требуется внимание.</p>
    `,
    coverImage: "/images/blog/suspension-noise.jpg",
    publishDate: "2023-08-22",
    readTime: 12,
    author: authors[1],
    tags: [tags[1], tags[2], tags[3]]
  },
  {
    id: "3",
    slug: "winter-car-preparation",
    title: "Готовим автомобиль к зиме: полное руководство",
    excerpt: "Пошаговая инструкция по подготовке вашего автомобиля к эксплуатации в зимних условиях",
    content: `<h2>Готовим автомобиль к зиме: полное руководство</h2>
    <p>Зима — серьезное испытание для любого автомобиля. Низкие температуры, реагенты на дорогах, снег и лед создают экстремальные условия эксплуатации. Правильная подготовка автомобиля к зимнему сезону поможет избежать многих проблем и обеспечит комфорт и безопасность.</p>
    
    <h3>1. Замена технических жидкостей</h3>
    
    <p><strong>Моторное масло:</strong> Если приближается срок замены масла, лучше сделать это до наступления холодов. В зимний период рекомендуется использовать масло с меньшей вязкостью (например, 0W-30 вместо 5W-40).</p>
    
    <p><strong>Охлаждающая жидкость:</strong> Проверьте уровень и концентрацию антифриза. Он должен выдерживать минимальную температуру в вашем регионе. Если антифриз эксплуатируется уже более 2-3 лет, рекомендуется его замена.</p>
    
    <p><strong>Жидкость стеклоомывателя:</strong> Залейте незамерзающую жидкость с запасом по температуре (на 10-15°C ниже минимальной в вашем регионе).</p>
    
    <h3>2. Проверка аккумулятора</h3>
    
    <p>Аккумулятор особенно сильно нагружен зимой из-за пониженной емкости при низких температурах и повышенной нагрузки при запуске. Проверьте:</p>
    
    <ul>
      <li>Уровень заряда аккумулятора</li>
      <li>Состояние клемм (отсутствие окисления)</li>
      <li>Напряжение на клеммах при заведенном двигателе (должно быть 13,8-14,4В)</li>
    </ul>
    
    <p>Если аккумулятору больше 3-4 лет, рассмотрите возможность его замены до наступления холодов.</p>
    
    <h3>3. Шины</h3>
    
    <p>Своевременный переход на зимние шины — залог безопасности. Рекомендуется менять шины, когда среднесуточная температура опускается ниже +7°C.</p>
    
    <p>При выборе зимних шин учитывайте:</p>
    
    <ul>
      <li>Климатические условия в вашем регионе (для суровых зим лучше шипованная резина)</li>
      <li>Состояние дорог (для чищеных дорог подойдут фрикционные шины)</li>
      <li>Стиль вождения</li>
    </ul>
    
    <p>Проверьте давление в шинах — зимой оно должно быть немного выше рекомендуемого (на 0,1-0,2 атм).</p>
    
    <h3>4. Система отопления и вентиляции</h3>
    
    <ul>
      <li>Проверьте работу печки и обогрева стекол</li>
      <li>Очистите салонный фильтр или замените его</li>
      <li>Убедитесь, что вентиляционные каналы не забиты</li>
    </ul>
    
    <h3>5. Освещение</h3>
    
    <p>Зимой световой день короче, поэтому особенно важно, чтобы все осветительные приборы работали исправно:</p>
    
    <ul>
      <li>Проверьте работу всех внешних световых приборов</li>
      <li>Отрегулируйте фары</li>
      <li>Очистите фары от загрязнений для лучшего светового потока</li>
    </ul>
    
    <h3>6. Кузов и защита от коррозии</h3>
    
    <p>Дорожные реагенты агрессивно воздействуют на кузов автомобиля:</p>
    
    <ul>
      <li>Вымойте автомобиль, особенно тщательно — днище и колесные арки</li>
      <li>Обработайте кузов полиролью с защитными свойствами</li>
      <li>Нанесите силиконовую смазку на резиновые уплотнители дверей, чтобы они не примерзали</li>
      <li>Рассмотрите возможность антикоррозийной обработки днища</li>
    </ul>
    
    <h3>7. Аварийный комплект</h3>
    
    <p>В зимний период в автомобиле должны быть:</p>
    
    <ul>
      <li>Скребок для льда и щетка для снега</li>
      <li>Лопата малого размера</li>
      <li>Трос буксировочный</li>
      <li>Провода для «прикуривания»</li>
      <li>Теплый плед</li>
      <li>Фонарик и запасные батарейки</li>
      <li>Антигель для топливной системы (для дизельных автомобилей)</li>
    </ul>
    
    <h3>8. Двигатель и топливная система</h3>
    
    <ul>
      <li>Проверьте состояние свечей зажигания</li>
      <li>Замените топливный фильтр, если это необходимо</li>
      <li>Держите бак заполненным не менее чем наполовину, чтобы избежать конденсата</li>
    </ul>
    
    <h3>Заключение</h3>
    
    <p>Подготовка автомобиля к зиме займет немного времени и средств, но обеспечит надежность, комфорт и безопасность в холодный сезон. Помните, что профилактика всегда дешевле, чем устранение серьезных поломок, которые могут возникнуть из-за неподготовленности автомобиля к зимним условиям.</p>`,
    coverImage: "/images/blog/winter-prep.jpg",
    publishDate: "2023-10-05",
    readTime: 10,
    author: authors[0],
    tags: [tags[3], tags[0]]
  }
];

// Компонент страницы отдельной статьи
export default function ArticlePage() {
  const { slug } = useParams();
  const { isFavorite } = useFavorites()
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Добавляем стили анимации к документу
    const styleElement = document.createElement('style');
    styleElement.textContent = floatAnimation;
    document.head.appendChild(styleElement);

    // Очистка при размонтировании
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    // Имитация загрузки данных с сервера
    setLoading(true);
    setTimeout(() => {
      if (typeof slug === 'string') {
        const foundArticle = articles.find(a => a.slug === slug);
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Находим связанные статьи (с похожими тегами)
          const tagIds = foundArticle.tags.map(t => t.id);
          const related = articles
            .filter(a => a.id !== foundArticle.id && a.tags.some(t => tagIds.includes(t.id)))
            .slice(0, 3);
          
          setRelatedArticles(related);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
      setLoading(false);
    }, 800);
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col w-full max-w-3xl">
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-80 bg-gray-300 rounded mb-8"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
          <p className="text-gray-600 mb-8">Запрашиваемая статья не существует или была удалена.</p>
          <Link href="/news" className="px-6 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-medium transition-colors">
            Вернуться к списку статей
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#0A1128] text-white pt-24 pb-16 relative"
    >
      {/* Background with grid effects and starry elements */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Primary Grid pattern */}
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: 'url(/images/solid-grid.svg)',
            backgroundSize: '20px 20px'
          }} 
        />
        
        {/* Secondary Digital circuit lines */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'url(/images/grid-pattern.svg)' }}
        />
        
        {/* Diagonal accent lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Stars - fixed points */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.5 + 0.3;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
              />
            );
          })}
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.4,
                  animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
        
        {/* Ambient background effects */}
        <div className="absolute inset-0 overflow-hidden">
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
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-red-600/10 rounded-full blur-3xl" />
        </div>
        
        {/* Навигация назад */}
        <Link href="/news" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
          <FiChevronLeft className="mr-1" />
          Назад к статьям
        </Link>
        
        {/* Заголовок и мета-информация */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400">{article.title}</h1>
            
            <FavoriteButton 
              product={{
                id: article.id,
                name: article.title,
                price: 0, // Статьи бесплатные
                image: article.coverImage,
                slug: article.slug
              }} 
              size="lg" 
              className="mt-2"
            />
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <FiCalendar className="mr-1" />
              <span>{new Date(article.publishDate).toLocaleDateString('ru-RU', {
                day: 'numeric', 
                month: 'long', 
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <FiClock className="mr-1" />
              <span>{article.readTime} мин. чтения</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {article.tags.map(tag => (
                <Link 
                  href={`/news?tag=${tag.id}`} 
                  key={tag.id}
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors text-gray-300"
                >
                  <FiTag className="mr-1" size={12} />
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Изображение статьи */}
        <div className="max-w-4xl mx-auto relative h-[300px] md:h-[400px] mb-10 rounded-xl overflow-hidden">
          <Image 
            src={article.coverImage || "/images/blog/default.jpg"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 to-transparent"></div>
        </div>
        
        {/* Информация об авторе */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image 
                src={article.author.avatar || "/images/authors/default.jpg"}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-white">{article.author.name}</p>
              <p className="text-sm text-blue-400">{article.author.role}</p>
            </div>
          </div>
        </div>
        
        {/* Содержимое статьи */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-16 prose prose-invert prose-lg prose-headings:font-bold prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 blog-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Связанные статьи */}
        {relatedArticles.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">Вам также может быть интересно</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(related => (
                <motion.div 
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all group"
                >
                  <Link href={`/news/${related.slug}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={related.coverImage || "/images/blog/default.jpg"}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">{related.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{related.excerpt}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{new Date(related.publishDate).toLocaleDateString('ru-RU')}</span>
                        <span>{related.readTime} мин. чтения</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
} 