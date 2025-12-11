# 1. Fase de Build (apenas para copiar os arquivos e instalar dependências)
# Usamos uma imagem Node.js que é apropriada para rodar o Angular CLI
FROM node:24-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (ou yarn.lock)
# Isso permite que o Docker utilize o cache para a camada de instalação de dependências
COPY package*.json ./

# Instala as dependências do projeto
# O --force é opcional, mas pode ser útil em alguns ambientes para evitar problemas de dependências de pares.
RUN npm install --force

# Copia o restante dos arquivos do projeto (código-fonte) para o container
COPY . .

# Expõe a porta padrão do ng serve (4200)
EXPOSE 80

# 2. Comando de Execução (Rodar a aplicação)
# O comando de startup que será executado quando o container for iniciado.
# A flag --host 0.0.0.0 é crucial para que o servidor seja acessível de fora do container (pelo host).
# --disable-host-check é frequentemente necessário ao acessar via IP/nome do container.
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "80"]
