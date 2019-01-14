# Веб-сайт проекта VyatSU schedule

[![Build Status](https://travis-ci.org/alirzaev/vyatsu-schedule.svg?branch=master)](https://travis-ci.org/alirzaev/vyatsu-schedule)

Неофициальный сайт для просмотра расписания занятий студентов [Вятского государственного университета](https://www.vyatsu.ru).

Основной упор сделан на удобство работы с мобильных устройств. В отличие от официального сайта, здесь расписание групп можно смотреть прямо во вкладке браузера, не загружая PDF-файлы.

## Для пользователей

Тык: [vyatsuschedule.github.io](https://vyatsuschedule.github.io)

## Для разработчиков

Этот сайт - не что иное, как одностраничное [Vue.js](https://vuejs.org)-приложение. Для сборки на production, запуска сервера и линтера используется [Vue CLI 3](https://cli.vuejs.org).

### Сборка приложения

1. Установка параметров

   Для работы сайта нужен [backend-сервер](https://github.com/AliRzaev/vyatsu-schedule-backend). Указываем его URL через переменную окружения `API_URL` и запускаем скрпит `configure`:
   
   ```
   API_URL=<apiUrl> npm run configure
   ```
   
   По умолчанию для `API_URL` используется значение `http://localhost:8080`.

2. Собираем на production
   
   ```
   npm run build
   ```
   
   Скомпилированные файлы расположены в папке `dist`.

### Запуск сервера для разработки

1. Устанавливаем параметры

2. Запускаем сервер
   
   ```
   npm run serve
   ```

### Сборка Docker-образа

1. Устанавливаем параметры

2. Собираем на production

3. Собираем образ

   ```
   docker build -t imagename .
   ```

4. Запускаем
   
   ```
   docker run --name somename -d -p 8080:80 imagename
   ```
