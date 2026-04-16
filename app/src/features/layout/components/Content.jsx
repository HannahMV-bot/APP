import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  Paper,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

// Iconos
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InsightsIcon from '@mui/icons-material/Insights';
import SavingsIcon from '@mui/icons-material/Savings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export const Content = ({ children }) => {

  // Renderizado para rutas internas (Login, Registro, Dashboard)
  if (children) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: '#FFFFFF', overflow: 'hidden' }}>
      
      {/* 1. SECCIÓN HERO (FONDO RECTO SIN CURVA) */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #F9F4F2 0%, #E5B49E 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 }, 
          borderRadius: 0, 
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="overline" 
                sx={{ fontWeight: 800, color: '#00695C', letterSpacing: 2, display: 'block', mb: 1 }}
              >
                TU LIBERTAD FINANCIERA EMPIEZA AQUÍ
              </Typography>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900, 
                  color: '#2D2D2D', 
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  fontFamily: '"Quicksand", sans-serif'
                }}
              >
                Maneja tu dinero con <span style={{ color: '#00695C' }}>Inteligencia</span>
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ color: '#5D4D4D', mb: 5, fontWeight: 400, maxWidth: '500px', lineHeight: 1.6 }}
              >
                La herramienta diseñada para buscar prosperidad, orden y un futuro brillante.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  component={Link} to="/iniciar"
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#00695C', 
                    borderRadius: '8px', 
                    px: 4, py: 2,
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#004D40' }
                  }}
                >
                  Abrir mi cuenta
                </Button>
                <Button 
                  component={Link} to="/precios" 
                  variant="text" 
                  sx={{ color: '#2D2D2D', fontWeight: 700 }}
                >
                  Ver planes →
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. ESTADÍSTICAS (MÁS ABAJO - EN LA ZONA BLANCA) */}
      <Container 
        sx={{ 
          mt: { xs: 4, md: 8 }, 
          mb: { xs: 4, md: 8 },
          position: 'relative', 
          zIndex: 10 
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {[
            { label: 'Usuarios Activos', value: '10k+', icon: <AccountBalanceIcon /> },
            { label: 'Ahorro Promedio', value: '25%', icon: <InsightsIcon /> },
            { label: 'Seguridad', value: '256-bit', icon: <SavingsIcon /> }
          ].map((stat, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  bgcolor: 'white',
                  border: '1px solid #F0E0D9' 
                }}
              >
                <Box sx={{ color: '#E5B49E', display: 'flex' }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D2D2D' }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. FUNCIONALIDADES (4 TARJETAS SIMÉTRICAS Y CENTRADAS) */}
      <Container sx={{ py: { xs: 8, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#00695C', mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            Todo lo que necesitas para crecer
          </Typography>
          <Divider sx={{ width: '60px', height: '4px', bgcolor: '#E5B49E', margin: '0 auto' }} />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {[
            { title: "Presupuestos Reales", desc: "Límites de gastos mensuales ajustados a tus ingresos.", icon: <AutoGraphIcon fontSize="large" /> },
            { title: "Metas de Inversión", desc: "Visualiza cuánto falta para tu fondo de emergencia.", icon: <InsightsIcon fontSize="large" /> },
            { title: "Reportes Mensuales", desc: "Análisis detallado de tu comportamiento financiero.", icon: <AccountBalanceIcon fontSize="large" /> },
            { title: "Ahorro Automático", desc: "Separa dinero de tus ingresos sin que te des cuenta.", icon: <SavingsIcon fontSize="large" /> }
          ].map((feature, i) => (
            <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: 'flex' }}>
              <Card 
                variant="outlined" 
                sx={{ 
                  width: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  borderRadius: '12px', 
                  borderColor: '#F0E0D9',
                  transition: '0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)', 
                    borderColor: '#E5B49E',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
                  } 
                }}
              >
                <CardContent 
                  sx={{ 
                    p: 4, 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',    
                    justifyContent: 'center', 
                    textAlign: 'center' 
                  }}
                >
                  <Box sx={{ color: '#E5B49E', mb: 2, display: 'flex' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#2D2D2D' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 4. CALL TO ACTION FINAL */}
      <Box sx={{ bgcolor: '#00695C', py: { xs: 8, md: 10 }, color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Tu dinero, tus reglas.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, opacity: 0.9 }}>
            Únete hoy y descubre la tranquilidad de tener tus finanzas en orden con el estilo que mereces.
          </Typography>
          <Button 
            component={Link} to="/iniciar"
            variant="contained" 
            sx={{ 
              bgcolor: 'white', 
              color: '#00695C', 
              px: 6, py: 2, 
              borderRadius: '50px',
              fontWeight: 900,
              '&:hover': { bgcolor: '#F5F5F5' }
            }}
          >
            Comenzar gratis hoy
          </Button>
        </Container>
      </Box>

    </Box>
  );
};