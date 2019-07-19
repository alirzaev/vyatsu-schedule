# Веб-сайт проекта VyatSU schedule

[![Build Status](https://travis-ci.org/alirzaev/vyatsu-schedule.svg?branch=master)](https://travis-ci.org/alirzaev/vyatsu-schedule)

Неофициальный сайт для просмотра расписания занятий студентов [Вятского государственного университета](https://www.vyatsu.ru).

Основной упор сделан на удобство работы с мобильных устройств. В отличие от официального сайта, здесь расписание групп можно смотреть прямо во вкладке браузера, не загружая PDF-файлы.

## Для разработчиков

Этот сайт - не что иное, как одностраничное [Vue.js](https://vuejs.org)-приложение. Для сборки на production, запуска сервера и линтера используется [Vue CLI 3](https://cli.vuejs.org).

### Сборка приложения

1. Установка переменных окружения

   Для работы сайта нужен [backend-сервер](https://github.com/AliRzaev/vyatsu-schedule-backend). Указываем его URL через переменную окружения `VUE_APP_API_URL`:
   
   ```
   export VUE_APP_API_URL=<apiUrl>
   ```
   
   По умолчанию для `VUE_APP_API_URL` используется значение `''`.

2. Собираем на production
   
   ```
   npm run build
   ```
   
   Скомпилированные файлы расположены в папке `dist`.

### Запуск сервера для разработки

1. Устанавливаем переменные окружения

2. Запускаем сервер
   
   ```
   npm run serve
   ```

### Сборка и запуск Docker-образа

1. Собираем образ

   ```
   docker build --build-arg VUE_APP_API_URL=<apiUrl> -t imagename .
   ```

2. Запускаем
   
   ```
   docker run --name somename -d -p 8080:80 imagename
   ```
