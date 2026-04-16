import React, { useState } from 'react';
import { 
  Box, Button, TextField, Typography, Paper, 
  Link, Stack, Divider, Alert, IconButton, InputAdornment 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { IniciarSesion } from '../services/authApi';

export const Iniciar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // --- CONFIGURACIÓN DE CONEXIÓN ---
  // Cambia el puerto (4000) si tu backend usa uno diferente
  const URL_BACKEND_LOCAL = "http://localhost:4000/api"; 
  // ---------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Llamamos a la función del servicio
      await IniciarSesion(formData);
      
      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }
      navigate('/dashboard', { replace: true }); 

    } catch (err) {
      console.error("Error en login:", err);
      
      // Error amigable si el servidor local no está encendido
      if (err.message === "Network Error" || err.code === "ERR_NETWORK") {
        setError(`No se pudo conectar al servidor en ${URL_BACKEND_LOCAL}. Asegúrate de que el backend esté corriendo localmente.`);
      } else {
        setError(err.response?.data?.message || "Credenciales incorrectas o error en el servidor");
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6, bgcolor: '#F9F4F2', minHeight: '80vh' }}>
      <Paper variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 350, borderRadius: '16px', bgcolor: 'white', border: '1px solid #F0E0D9' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#2D2D2D', fontFamily: '"Quicksand", sans-serif' }}>
            Bienvenido
          </Typography>
          <Divider sx={{ width: '30px', height: '3px', bgcolor: '#E5B49E', margin: '10px auto' }} />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.8rem' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField 
              label="Correo electrónico" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              fullWidth 
              required 
              size="small"
              InputProps={{ sx: { borderRadius: '10px' } }}
              sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#00695C' } } }}
            />

            <TextField 
              label="Contraseña" 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              value={formData.password} 
              onChange={handleChange} 
              fullWidth 
              required 
              size="small"
              InputProps={{
                sx: { borderRadius: '10px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#00695C' } },
                '& input::-ms-reveal, & input::-ms-clear': { display: 'none' }
              }}
            />

            <Button 
              type="submit" 
              variant="outlined" 
              fullWidth 
              sx={{ 
                py: 1, mt: 1, fontWeight: 800, color: '#00695C', 
                borderColor: '#00695C', borderRadius: '10px', textTransform: 'none',
                borderWidth: '1.5px', '&:hover': { borderWidth: '1.5px', bgcolor: 'rgba(0,105,92,0.05)', borderColor: '#004D40' }
              }}
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </form>

        <Typography variant="caption" display="block" sx={{ mt: 3, textAlign: 'center', color: '#666', fontWeight: 500 }}>
          ¿No tienes una cuenta? {' '}
          <Link component={RouterLink} to="/registrar" sx={{ color: '#00695C', fontWeight: 800, textDecoration: 'none' }}>
            Regístrate
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Iniciar;