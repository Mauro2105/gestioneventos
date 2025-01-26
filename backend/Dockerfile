# Usa la imagen base de Node.js
FROM node:14

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Instala las dependencias
RUN npm install

# Exponer el puerto que usa tu aplicación
EXPOSE 5000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]
