# МистерАвто API

Бэкенд-часть приложения для автомобильного сервиса и магазина запчастей "МистерАвто".

## Технологии

- **FastAPI** - современный веб-фреймворк для создания API на Python 3.7+
- **SQLAlchemy** - SQL тулкит и ORM для Python
- **Pydantic** - валидация, сериализация и десериализация данных
- **Alembic** - инструмент для миграции базы данных
- **PostgreSQL** - реляционная база данных
- **Redis** - хранилище ключ-значение для кэширования
- **Docker** и **Docker Compose** - для контейнеризации приложения

## Структура проекта

```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── products.py
│   │   │   │   ├── orders.py
│   │   │   │   └── services.py
│   │   │   ├── api.py
│   │   │   └── __init__.py
│   │   ├── deps.py
│   │   └── __init__.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── __init__.py
│   ├── db/
│   │   ├── base.py
│   │   ├── base_class.py
│   │   ├── session.py
│   │   └── __init__.py
│   ├── models/
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── service.py
│   │   └── __init__.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── service.py
│   │   ├── token.py
│   │   └── __init__.py
│   ├── services/
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── service.py
│   │   └── __init__.py
│   └── __init__.py
├── tests/
│   ├── api/
│   │   ├── test_auth.py
│   │   ├── test_users.py
│   │   └── test_products.py
│   ├── conftest.py
│   └── __init__.py
├── scripts/
│   └── import_data.py
├── main.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Запуск проекта

### Локальный запуск с Docker

1. Клонировать репозиторий
2. Создать файл `.env` на основе `.env.example`
3. Запустить Docker-контейнеры:

```bash
docker-compose up -d
```

4. API будет доступно по адресу `http://localhost:8000`
5. Документация API: `http://localhost:8000/docs`

### Запуск для разработки (без Docker)

1. Клонировать репозиторий
2. Создать виртуальное окружение и активировать его:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Установить зависимости:

```bash
pip install -r requirements.txt
```

4. Создать файл `.env` на основе `.env.example`
5. Убедиться, что Postgres запущен
6. Запустить приложение:

```bash
uvicorn main:app --reload
```

7. API будет доступно по адресу `http://localhost:8000`

## Деплой на Timeweb Cloud

Для деплоя используется сервис [Timeweb Cloud](https://timeweb.cloud/), который предоставляет облачные решения для разработки и бизнеса.

1. Создать аккаунт на [Timeweb Cloud](https://timeweb.cloud/)
2. Настроить облачный сервер на базе Docker
3. Загрузить код приложения на сервер
4. Настроить переменные окружения
5. Запустить контейнеры с помощью docker-compose 