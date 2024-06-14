# Escolha a imagem base
FROM node:22

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --production

# Copie os arquivos do projeto para o contêiner
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Exponha a porta que o seu app usa
EXPOSE 3000

# Comando para rodar o app
CMD ["npx", "ts-node", "src/server.ts"]
