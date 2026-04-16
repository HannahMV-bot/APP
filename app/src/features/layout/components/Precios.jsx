import React from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, 
  Button, Divider, List, ListItem, ListItemIcon, ListItemText, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const planes = [
  {
    title: "Esencial",
    price: "0",
    features: ["Registro de gastos", "1 Meta de ahorro", "Reporte básico", "1 dispositivo"],
    buttonText: "Gratis"
  },
  {
    title: "Prosperidad",
    price: "15.900",
    features: ["Todo lo de Esencial", "Metas ilimitadas", "Exportar PDF/Excel", "Soporte prioritario"],
    buttonText: "Elegir Plan"
  },
  {
    title: "Patrimonio",
    price: "32.000",
    features: ["Todo lo de Prosperidad", "Asesoría IA", "Multiusuario", "Inversiones"],
    buttonText: "Elegir Plan"
  }
];

export const Precios = () => {
  return (
    <Box sx={{ bgcolor: '#F9F4F2', py: { xs: 6, md: 8 }, minHeight: '90vh' }}>
      <Container maxWidth="md">
        
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 900, 
              color: '#2D2D2D', 
              fontFamily: '"Quicksand", sans-serif'
            }}
          >
            Planes a tu medida
          </Typography>
          <Divider sx={{ width: '40px', height: '3px', bgcolor: '#E5B49E', margin: '15px auto' }} />
        </Box>

        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          {planes.map((plan, i) => (
            <Grid item xs={12} sm={4} key={i} sx={{ display: 'flex' }}>
              <Card 
                variant="outlined"
                sx={{ 
                  width: '100%',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: '#F0E0D9',
                  borderWidth: '1px',
                  bgcolor: 'white',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
              >
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, color: '#2D2D2D' }}>
                    {plan.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#00695C' }}>${plan.price}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontWeight: 600 }}>/mes</Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <List sx={{ flex: 1, mb: 2 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} disableGutters sx={{ py: 0.2 }}>
                        <ListItemIcon sx={{ minWidth: 24, color: '#E5B49E' }}>
                          <CheckCircleIcon sx={{ fontSize: '1rem' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ variant: 'caption', sx: { fontWeight: 500, color: '#555' } }} 
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button 
                    component={Link} to="/iniciar"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ 
                      py: 1, 
                      borderRadius: '8px', 
                      fontWeight: 700, 
                      fontSize: '0.75rem',
                      textTransform: 'none',
                      color: '#00695C', 
                      borderColor: '#00695C',
                      '&:hover': { 
                        bgcolor: 'rgba(0,105,92,0.05)', 
                        borderColor: '#004D40' 
                      }
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* --- NUEVA SECCIÓN DE INFORMACIÓN ADICIONAL --- */}
        <Box sx={{ mt: 8, px: 2 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 800, 
              color: '#2D2D2D', 
              mb: 3, 
              textAlign: 'center', 
              fontFamily: '"Quicksand", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Información Adicional
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <SecurityIcon sx={{ color: '#00695C', fontSize: '1.2rem', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}> Privacidad Asegurada </Typography>
                  <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.4 }}> Tus datos financieros están encriptados con tecnología de grado bancario. </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <CreditCardIcon sx={{ color: '#00695C', fontSize: '1.2rem', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}> Sin Contratos </Typography>
                  <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.4 }}> Puedes cancelar o cambiar tu suscripción en cualquier momento sin cargos extra. </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <InfoOutlinedIcon sx={{ color: '#00695C', fontSize: '1.2rem', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}> Soporte 24/7 </Typography>
                  <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.4 }}> Nuestro equipo está disponible para ayudarte con cualquier duda sobre tus planes. </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </Box>
  );
};