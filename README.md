# МистерАвто.рф - Веб-приложение автомагазина

Современное веб-приложение для автомагазина "МистерАвто.рф" и "Mrauto96.com", разработанное с использованием Next.js, React и TypeScript.

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Intersection Observer
- Next Themes

## Требования

- Node.js 18.0 или выше
- npm или yarn

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/mrauto.git
cd mrauto
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Создайте файл `.env.local` и добавьте необходимые переменные окружения:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Разработка

Запустите сервер разработки:

```bash
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере для просмотра приложения.

## Сборка

Для создания production-сборки выполните:

```bash
npm run build
# или
yarn build
```

Затем запустите production-сервер:

```bash
npm run start
# или
yarn start
```

## Структура проекта

```
mrauto/
├── src/
│   ├── app/              # Основные страницы приложения
│   ├── components/       # React компоненты
│   ├── lib/             # Вспомогательные функции и утилиты
│   ├── styles/          # Глобальные стили
│   ├── types/           # TypeScript типы
│   └── utils/           # Утилиты
├── public/              # Статические файлы
└── package.json         # Зависимости и скрипты
```

## Основные функции

- Современный дизайн с эффектом стекла (Glassmorphism)
- Адаптивный интерфейс
- Анимации при прокрутке
- Темная и светлая темы
- Каталог товаров
- Онлайн-запись на сервис
- Форма обратной связи
- SEO-оптимизация

## Лицензия

MIT 