import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'; // <-- Esto carga automáticamente tu archivo .env
import userRoutes from './routes/user.routes.js';

const app = express();

// Middlewares
app.use(cors({
    origin: 'https://app-lxwt.vercel.app', // URL de tu frontend que aparece en el error
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// ==============================================================
// CONFIGURACIÓN DE MONGODB (Usando las variables de tu .env)
// ==============================================================
const MONGO_URI = process.env.MONGODB_URI; 

if (!MONGO_URI) {
    console.error("❌ Error: MONGODB_URI no está definida en el archivo .env");
} else {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("✅ ¡Conexión a MongoDB Atlas exitosa!"))
        .catch((error) => console.error("❌ Error conectando a MongoDB:", error.message));
}

// ==============================================================
// INICIO DEL SERVIDOR
// ==============================================================
const PORT = process.env.PORT || 4000; // Usa el puerto del .env o el 4000 por defecto
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});