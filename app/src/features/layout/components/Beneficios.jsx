import React from 'react';
import { 
  Box, Container, Typography, Grid, Paper, Divider, Stack 
} from '@mui/material';

// Iconos
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PieChartIcon from '@mui/icons-material/PieChart';

const listaBeneficios = [
  {
    title: "Control Total",
    desc: "Registra cada ingreso y gasto al instante para saber siempre dónde está tu dinero.",
    icon: <AccountBalanceWalletIcon />
  },
  {
    title: "Metas Claras",
    desc: "Crea objetivos de ahorro personalizados y visualiza tu progreso mes a mes.",
    icon: <TrendingUpIcon />
  },
  {
    title: "Seguridad Bancaria",
    desc: "Tus datos están protegidos con los más altos estándares de encriptación.",
    icon: <SecurityIcon />
  },
  {
    title: "Multiplataforma",
    desc: "Accede a tu información financiera desde cualquier dispositivo en tiempo real.",
    icon: <DevicesIcon />
  },
  {
    title: "Alertas Inteligentes",
    desc: "Recibe recordatorios de pagos y notificaciones cuando te acerques a tu presupuesto.",
    icon: <NotificationsActiveIcon />
  },
  {
    title: "Gráficos Detallados",
    desc: "Visualiza tus hábitos de consumo con reportes visuales fáciles de entender.",
    icon: <PieChartIcon />
  }
];

export const Beneficios = () => {
  return (
    <Box sx={{ bgcolor: '#F9F4F2', py: { xs: 8, md: 12 }, minHeight: '100vh' }}>
      
      <Container maxWidth="lg">
        
        {/* SECCIÓN DE ENCABEZADO */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              color: '#2D2D2D',
              fontSize: { xs: '2rem', md: '2.75rem' },
              mb: 2
            }}
          >
            ¿Por qué elegirnos?
          </Typography>

          <Divider 
            sx={{ 
              width: '60px', 
              height: '5px', 
              bgcolor: '#E5B49E', 
              margin: '0 auto',
              borderRadius: '10px',
              border: 'none'
            }} 
          />

          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '600px', 
              margin: '25px auto 0', 
              color: '#555',
              lineHeight: 1.6
            }}
          >
            Descubre cómo nuestra herramienta puede ayudarte a transformar tus finanzas personales de manera sencilla y segura.
          </Typography>
        </Box>

        {/* GRID DE TARJETAS: 2 por fila (sm=6, md=6) */}
        <Grid 
          container 
          spacing={4}
          justifyContent="center"
        >
          {listaBeneficios.map((item, i) => (
            <Grid 
              item 
              xs={12}    // 1 columna en móviles
              sm={6}     // 2 columnas en tablets
              md={6}     // 2 columnas en escritorio
              key={i}
              sx={{ display: 'flex' }} // Estira las tarjetas para que midan lo mismo en la misma fila
            >
              <Paper 
                variant="outlined"
                sx={{ 
                  p: { xs: 3, md: 5 },
                  width: '100%',
                  borderRadius: '24px',
                  borderColor: '#F0E0D9',
                  bgcolor: 'white',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    borderColor: '#E5B49E',
                    boxShadow: '0 20px 40px rgba(229, 180, 158, 0.15)',
                    '& .icon-box': {
                      bgcolor: '#00695C',
                      color: 'white'
                    }
                  }
                }}
              >
                <Stack 
                  direction={{ xs: 'column', md: 'row' }} 
                  spacing={3} 
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                >
                  {/* CONTENEDOR DEL ICONO */}
                  <Box 
                    className="icon-box"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '64px',
                      height: '64px',
                      borderRadius: '18px',
                      bgcolor: 'rgba(0,105,92,0.08)',
                      color: '#00695C',
                      transition: '0.3s',
                      flexShrink: 0
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { fontSize: 32, color: 'inherit' } })}
                  </Box>

                  {/* TEXTO DE LA TARJETA */}
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ fontWeight: 800, color: '#2D2D2D', mb: 1 }}
                    >
                      {item.title}
                    </Typography>

                    <Typography 
                      variant="body2" 
                      sx={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

