import axios from "axios";

// 1. Prioridad a la variable de entorno, de lo contrario usamos localhost.
// Nota: Asegúrate de que el puerto coincida con el de tu servidor local (ej: 4000)
const BASE_URL = import.meta.env.VITE_API_URL || "https://app-c6s4.onrender.com";

const API = axios.create({
  baseURL: `${BASE_URL}/api/users`, 
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. INTERCEPTOR: Esto agrega el token automáticamente si existe en localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Iniciar Sesión
 */
export const IniciarSesion = async (datos) => {
  try {
    const respuesta = await API.post("/login", datos);
    
    // Guardamos el token para mantener la sesión activa
    if (respuesta.data.token) {
      localStorage.setItem("token", respuesta.data.token);
    }
    
    return respuesta.data;
  } catch (error) {
    // Extraemos el mensaje específico del backend (ej: "Usuario no encontrado")
    const errorMsg = error.response?.data?.message || "Error al iniciar sesión";
    throw errorMsg;
  }
};

/**
 * Registrar Nuevo Usuario
 */
export const RegistrarUsuario = async (datos) => {
  try {
    const respuesta = await API.post("/registrar", datos);
    return respuesta.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Error al registrar";
    throw errorMsg;
  }
};

export default API;