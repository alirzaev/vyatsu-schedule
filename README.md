# VyatSU schedule web application

[![Build Status](https://travis-ci.org/AliRzaev/vyatsu_web_app.svg?branch=master)](https://travis-ci.org/AliRzaev/vyatsu_web_app)

This application provides students a convenient way to view group schedules.

Try it: [vyatsuschedule.github.io](https://vyatsuschedule.github.io)

## Building

VyatSU web app is built with `vue-cli-service`.

1. Configure application
   
   ```
   API_URL=<apiUrl> npm run configure
   ```
   
   where `apiUrl` - URL to the VyatSU schedule API server, defaults `http://localhost:8080`.

2. Build application
   
   ```
   npm run build
   ```
   
   Built application can be found in `dist` folder.

## Running

1. Configure application

2. Run application with `webpack-dev-server`
   
   ```
   npm run serve
   ```

## Docker

1. Configure application

2. Build application

3. Build docker image
   Docker image is based on `nginx:alpine`.
   
   ```
   docker build -t somename .
   ```

4. Run docker container
   
   ```
   docker run --name somename -d -p 8080:80 imagename
   ```
