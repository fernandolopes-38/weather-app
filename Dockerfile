FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --silent
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . ./

CMD ["npm", "start"]
