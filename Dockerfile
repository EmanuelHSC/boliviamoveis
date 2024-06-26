# Use uma imagem do Node.js como base
FROM node:16-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package.json ./
COPY package-lock.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte do projeto
COPY . .

# Faça o build do projeto
RUN npm run build

# Use uma imagem do Nginx como base para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
