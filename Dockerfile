# Etapa 1: Construção do projeto
FROM node:14 AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o yarn.lock/package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto
COPY . .

# Execute o build da aplicação
RUN npm run build

# Etapa 2: Configuração do servidor web
FROM nginx:alpine

# Remova a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie a nova configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d

# Copie os arquivos buildados para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta que o Nginx irá rodar
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
