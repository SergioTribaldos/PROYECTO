FROM node:12.0.0-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
RUN mkdir /app/dist/images
CMD npm run start:prod