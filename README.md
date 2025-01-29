# Proyecto: Gestión de Eventos

Este proyecto es una aplicación CRUD para administrar eventos, incluyendo la funcionalidad de **filtro por fecha y ubicación, login, registro**, y el manejo de **JWT** para auntenticación

## Contenido
### Tecnologías 
- **Backend**: Node.js, Express, Mongoose
- **Frontend**: React + Material UI
- **Base de Datos**: MongoDB

### Instrucciones de Instalación
1. **Clona o descarga el repositorio**:
   - git clone https://github.com/mi-usuario/gestioneventos.git
   - cd gestioneventos
2. **Instala dependencias del Backend**:
   - cd backend
   - npm install
3. **Instala dependencias del Frontend**:
   - cd frontend
   - npm install
4. **Configura tu archivo .env en el banckend con las variables de entorno requeridas**
   - PORT=5001
   - MONGO_URI=mongodb://localhost:27017/gestion_eventos
   - JWT_SECRET=tu_clave_secreta
### Ejecución del Proyecto
1. **Ejecución del Backend**
   - En la carpeta backend ejecuta: npx nodemon server.js
2. **Ejecución del Frontend**
   - En la carpeta Frontend ejecuta: npm run dev
