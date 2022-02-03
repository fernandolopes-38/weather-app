# Imagem de Origem
FROM node:16-alpine

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /weather-app

# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Instalando dependências da aplicação e armazenando em cache.
COPY package.json /weather-app/package.json
RUN npm install

# Inicializa a aplicação
CMD ["npm", "start"]