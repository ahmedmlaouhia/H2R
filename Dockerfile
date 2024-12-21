FROM node:21.2.0-alpine AS build

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

FROM nginx:alpine as prod

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]