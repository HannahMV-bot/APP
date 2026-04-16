import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// ICONOS
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub'; // Importamos el icono de GitHub

export const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Beneficios', path: '/beneficios' },
    { text: 'Precios', path: '/precios' },
    { text: 'APIs', path: '/apis' }
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #F0E0D9',
          zIndex: 1200 
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between', 
              height: '70px',
              px: 1
            }}
          >

            {/* IZQUIERDA */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                onClick={toggleDrawer(true)} 
                sx={{ display: { md: 'none' }, color: '#2D2D2D' }}
              >
                <MenuIcon />
              </IconButton>

              <Box 
                component={Link} 
                to="/" 
                sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
              >
                <AccountBalanceWalletIcon sx={{ color: '#00695C', fontSize: '1.6rem' }} />
                <Typography 
                  sx={{ 
                    fontWeight: 900, 
                    color: '#2D2D2D', 
                    fontSize: '1rem'
                  }}
                >
                  FINANZAS<span style={{ color: '#00695C' }}>.</span>
                </Typography>
              </Box>
            </Box>

            {/* MENÚ DESKTOP */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button component={Link} to="/" sx={navButtonStyle}>Inicio</Button>
              <Button component={Link} to="/beneficios" sx={navButtonStyle}>Beneficios</Button>
              <Button component={Link} to="/precios" sx={navButtonStyle}>Precios</Button>
              <Button component={Link} to="/apis" sx={navButtonStyle}>APIs</Button>
            </Box>

            {/* BOTONES DERECHA */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              
              {/* BOTÓN REPOSITORIO (NUEVO) */}
              <Button
                href="https://github.com/HannahMV-bot/APP.git"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                sx={{
                  color: '#2D2D2D',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: { xs: '0.75rem', md: '0.9rem' },
                  borderRadius: '10px',
                  border: '1px solid #2D2D2D',
                  px: { xs: 1.5, md: 2 },
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                    borderColor: '#00695C',
                    color: '#00695C'
                  }
                }}
              >
                Repositorio
              </Button>

              {isAuthenticated ? (
                <Button 
                  variant="outlined" 
                  onClick={handleLogout}
                  sx={{ 
                    color: '#c85a54', 
                    borderColor: '#c85a54', 
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    px: { xs: 1.5, md: 2.5 },
                    '&:hover': { borderColor: '#a34944', bgcolor: 'rgba(200, 90, 84, 0.05)' }
                  }}
                >
                  Salir
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/iniciar" 
                  sx={{ 
                    bgcolor: '#00695C', 
                    color: 'white',
                    textTransform: 'none', 
                    fontWeight: 700,
                    borderRadius: '10px',
                    px: { xs: 2, md: 3 },
                    py: { xs: 0.7, md: 1 },
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    boxShadow: '0 4px 12px rgba(0, 105, 92, 0.2)',
                    '&:hover': { bgcolor: '#004D40', boxShadow: 'none' }
                  }}
                >
                  Iniciar Sesión
                </Button>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* DRAWER */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography sx={{ fontWeight: 900, mb: 2, color: '#2D2D2D' }}> Menú </Typography>
          <List>
            {menuItems.map((item, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

const navButtonStyle = {
  color: '#5D4D4D', 
  fontSize: '0.95rem', 
  fontWeight: 600,
  textTransform: 'none',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '5px',
    left: '50%',
    bgcolor: '#E5B49E',
    transition: '0.3s',
    transform: 'translateX(-50%)'
  },
  '&:hover': { 
    color: '#00695C',
    bgcolor: 'transparent',
    '&:after': { width: '60%' }
  }
};

export default Header;