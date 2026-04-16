import express from 'express';
import User from '../models/User.js'; // <-- IMPORTANTE: el .js al final
import bcrypt from 'bcryptjs';

const router = express.Router();

// Ruta de Registro
router.post('/registrar', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const nuevoUsuario = new User({ username, email, password });
        await nuevoUsuario.save();
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta de Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        res.status(200).json({ message: "Login correcto", user: usuario });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});

export default router;