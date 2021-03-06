# NewsExplorer. REST API

---

## Стек

- Node.js
- Express
- MongoDB

## Директории

- `/models` – папка со схемами и моделями пользователя и статьи
- `/controllers` – папка с контроллерами
- `/routes` — папка с файлами роутера
- `/errors` – папка с модулями ошибок
- `/middlewares` – папка с мидлварами

## Запуск проекта

Для запуска проекта:

1. Клонировать репозиторий
2. Установить зависимости `npm install`
3. Запустить проект `npm start`
4. Проект запускается на http://localhost:3000/

## Запросы

### Регистрация

POST http://localhost:3000/signup

В теле запроса передать объект вида

    {
      "email": "example@example.com",
      "password": "password",
      "name": "Жак-Ив Кусь",
    }

:heavy_check_mark: При успехе в ответе приходит объект пользователя со статусом `201`.

:x: При попытке создать пользователя с уже существующей в базе почтой приходит ответ со статусом `409` и сообщением `Пользователь с таким email уже зарегистрирован`.

:x: При попытке создать пользователя с некорректными данными приходит ответ со статусом `400` и ошибкой валидации.

### Авторизация

POST http://localhost:3000/signin

В теле запроса передать объект вида

    {
      "email": "example@example.com",
      "password": "password"
    }

:heavy_check_mark: При успехе приходит ответ со статусом `200` и сообщением `Успешная авторизация`.

:x: При неправильных почте и/или пароле приходит ответ со статусом `401` и сообщением `Неправильные email или пароль`.

### Информация о пользователе

GET http://localhost:3000/users/me

:heavy_check_mark: При успехе в ответе приходит объект пользователя (email и имя) со статусом `200`.

:x: При попытке получить данные несуществующего пользователя приходит ответ со статусом `404` и сообщением `Ресурс не найден`.

### Добавление статьи

POST http://localhost:3000/articles

В теле запроса передать объект вида

    {
      "keyword": "keyword",
      "title": "title",
      "text": "text",
      "date": "18.10.2020",
      "source": "source",
      "link": "https://ya.ru/",
      "image": "https://avatars.mds.yandex.net/get-banana/64225/x25CFuJKZ7D4sr5M4kaU8QjLm_banana_20161021_extensions_05x402x.png/orig"
    }

:heavy_check_mark: При успехе в ответе приходит объект статьи со статусом `201`.

:x: При попытке создать статью с некорректными данными приходит ответ со статусом `400` и ошибкой валидации.

### Удаление статьи

DELETE http://localhost:3000/articles/:id

:heavy_check_mark: При успехе в ответе приходит объект статьи со статусом `200`.

:x: При попытке удалить чужую статью приходит ответ со статусом `403` и сообщением `Недостаточно прав для выполнения операции`.

:x: При повторной попытке удалить статью или попытке удалить статью с несуществующим в базе id приходит ответ со статусом `404` и сообщением `Ресурс не найден`.

:x: При попытке удалить статью с некорректным id приходит ответ со статусом `400` и ошибкой валидации.

### Получение всех статей пользователя

GET http://localhost:3000/articles/

:heavy_check_mark: При успехе в ответе приходит массив статей со статусом `200`.
