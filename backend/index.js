import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'; 
import userRoutes from './routes/user.routes.js';

const app = express();

// ==============================================================
// CONFIGURACIÓN DE CORS (Ajustada para Local y Producción)
// ==============================================================
const allowedOrigins = [
    'https://app-ls9n.vercel.app/', // Tu app en Vercel
    'http://localhost:5173', 
    'http://localhost:4173',       // Tu app local con Vite
    'http://127.0.0.1:5173'        // Alternativa local
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como Postman o apps móviles)
        // o si el origen está en la lista de permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no permitido por la configuración.'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ==============================================================
// RUTAS
// ==============================================================
app.use('/api/users', userRoutes);

// Ruta de prueba para verificar que el backend responde
app.get('/', (req, res) => {
    res.send('🚀 Servidor de Finanzas funcionando correctamente');
});

// ==============================================================
// CONFIGURACIÓN DE MONGODB
// ==============================================================
const MONGO_URI = process.env.MONGODB_URI; 

if (!MONGO_URI) {
    console.error("❌ Error: MONGODB_URI no está definida en el archivo .env");
    process.exit(1); // Detiene la app si no hay base de datos
} else {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("✅ ¡Conexión a MongoDB Atlas exitosa!"))
        .catch((error) => console.error("❌ Error conectando a MongoDB:", error.message));
}

// ==============================================================
// INICIO DEL SERVIDOR
// ==============================================================
const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`🌍 Orígenes permitidos: ${allowedOrigins.join(', ')}`);
});