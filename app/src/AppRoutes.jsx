import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Importaciones de Layout y Auth
import { Header } from './features/layout/components/Header';
import { Content } from './features/layout/components/Content';
import { Beneficios } from './features/layout/components/Beneficios.jsx';
import { Precios } from './features/layout/components/Precios.jsx';
import { Footer } from './features/layout/components/Footer';
import Iniciar from './features/auth/components/Iniciar';
import Registro from './features/auth/components/Registro';
import { Dashboard } from './features/dashboard/pages/Dashboard';
import  ApiRyc  from './shared/components/ApiRyc'; 
import  ApiRycAxios  from './shared/components/ApiRycAxios' ;

export const AppRoutes = () => {
  // Estado de autenticación basado en el token del localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  // Estado para la lista de responsables (se alimenta del localStorage para no perderse al recargar)
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(() => {
    const savedUsers = localStorage.getItem('listaUsuarios');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Función para guardar el nombre del nuevo usuario sin loguearlo automáticamente
  const agregarUsuarioALista = (nuevoNombre) => {
    const usuariosActuales = JSON.parse(localStorage.getItem('listaUsuarios') || '[]');
    // Evitamos duplicados antes de guardar
    if (!usuariosActuales.includes(nuevoNombre)) {
      const nuevaLista = [...usuariosActuales, nuevoNombre];
      setUsuariosRegistrados(nuevaLista);
      localStorage.setItem('listaUsuarios', JSON.stringify(nuevaLista));
    }
  };

  // Escuchar cambios en el storage para actualizar la autenticación en tiempo real
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <HashRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header recibe el estado para mostrar u ocultar botones como "Salir" */}
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Content />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/apis" element={<ApiRyc />} />
            <Route path="/api-axios" element={<ApiRycAxios />} />

            {/* LOGIN: Si ya está logueado, redirige al Dashboard */}
            <Route 
              path="/Iniciar" 
              element={!isAuthenticated ? (
                <Iniciar setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/dashboard" replace />
              )} 
            />
            
            {/* REGISTRO: Pasa el nombre a la lista global. 
                El componente Registro debe ejecutar navigate('/Iniciar') tras el éxito. */}
            <Route 
              path="/registrar" 
              element={!isAuthenticated ? (
                <Registro 
                  onRegister={agregarUsuarioALista} 
                />
              ) : (
                <Navigate to="/dashboard" replace />
              )} 
            />

            {/* DASHBOARD: Solo accesible si hay token. Recibe la lista de responsables. */}
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? (
                <Dashboard 
                  setIsAuthenticated={setIsAuthenticated} 
                  listaNombres={usuariosRegistrados} 
                />
              ) : (
                <Navigate to="/Iniciar" replace />
              )} 
            />

            {/* Redirección por defecto para rutas no existentes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </HashRouter>
  );
};

export default AppRoutes;