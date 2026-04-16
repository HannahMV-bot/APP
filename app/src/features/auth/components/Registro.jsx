import React, { useState } from 'react';
import { 
  Box, Button, TextField, Typography, Paper, 
  Link, Stack, Divider, Alert, IconButton, InputAdornment 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { RegistrarUsuario } from '../services/authApi';

export const Registro = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // --- CONFIGURACIÓN DE CONEXIÓN LOCAL ---
  const URL_BACKEND_LOCAL = "http://localhost:4000"; 
  // ---------------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Llamada al servicio de registro
      await RegistrarUsuario(formData);
      
      if (onRegister) onRegister(formData.username);
      
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/Iniciar'); 

    } catch (err) {
      console.error("Error en registro:", err);
      
      // Manejo de error de conexión (Servidor apagado)
      if (err.message === "Network Error" || err.code === "ERR_NETWORK") {
        setError(`No se pudo conectar al servidor en ${URL_BACKEND_LOCAL}. Asegúrate de que el backend esté encendido.`);
      } else {
        // Error del servidor (ej. usuario ya existe)
        setError(err.response?.data?.message || err || "Error al registrar el usuario"); 
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 6 }, bgcolor: '#F9F4F2', minHeight: '80vh' }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, width: '100%', maxWidth: 350, border: '1px solid #F0E0D9', borderRadius: '16px', bgcolor: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#2D2D2D', fontFamily: '"Quicksand", sans-serif' }}>
            Crear Cuenta
          </Typography>
          <Divider sx={{ width: '25px', height: '3px', bgcolor: '#E5B49E', margin: '10px auto' }} />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '10px', fontSize: '0.8rem' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegistro}>
          <Stack spacing={2}>
            <TextField 
              label="Nombre completo" name="username" value={formData.username} onChange={handleChange}
              size="small" fullWidth required
              InputProps={{ sx: { borderRadius: '10px', fontSize: '0.9rem' } }}
              sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#00695C' } } }}
            />

            <TextField 
              label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange}
              size="small" fullWidth required
              InputProps={{ sx: { borderRadius: '10px', fontSize: '0.9rem' } }}
              sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#00695C' } } }}
            />

            <TextField 
              label="Contraseña" name="password" type={showPassword ? 'text' : 'password'} 
              value={formData.password} onChange={handleChange}
              size="small" fullWidth required
              InputProps={{ 
                sx: { borderRadius: '10px', fontSize: '0.9rem' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#00695C' } },
                '& input::-ms-reveal, & input::-ms-clear': { display: 'none' }
              }}
            />

            <Button 
              type="submit" variant="outlined" fullWidth
              sx={{ 
                mt: 1, py: 1, borderRadius: '10px', fontWeight: 800, 
                textTransform: 'none', color: '#00695C', borderColor: '#00695C',
                borderWidth: '1.5px',
                '&:hover': { bgcolor: 'rgba(0,105,92,0.05)', borderColor: '#004D40', borderWidth: '1.5px' }
              }}
            >
              Registrarse
            </Button>
          </Stack>
        </Box>

        <Typography variant="caption" display="block" sx={{ mt: 3, textAlign: 'center', color: '#666', fontWeight: 500 }}>
          ¿Ya tienes cuenta? {' '}
          <Link component={RouterLink} to="/Iniciar" sx={{ color: '#00695C', fontWeight: 800, textDecoration: 'none' }}>
            Inicia Sesión
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Registro;