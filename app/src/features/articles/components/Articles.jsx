import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, Button, Chip } from '@mui/material';

// Datos de ejemplo para los artículos/servicios
const articleList = [
  {
    id: 1,
    title: "Gestión de Ingresos",
    description: "Registra cada entrada de dinero y clasifícala por categorías automáticas.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400",
    tag: "Finanzas"
  },
  {
    id: 2,
    title: "Reportes Mensuales",
    description: "Visualiza gráficos detallados de tu comportamiento financiero cada mes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    tag: "Análisis"
  },
  {
    id: 3,
    title: "Alertas de Gasto",
    description: "Configura límites y recibe notificaciones cuando estés cerca de superarlos.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    tag: "Seguridad"
  }
];

export const Articles = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#fdfdfd' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: 'center' }}>
          Nuestros <span style={{ color: '#0052cc' }}>Servicios</span>
        </Typography>

        <Grid container spacing={4}>
          {articleList.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: '1px solid #eee',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip 
                    label={article.tag} 
                    size="small" 
                    sx={{ mb: 2, fontWeight: 700, color: '#0052cc', bgcolor: '#eef4ff' }} 
                  />
                  <Typography gutterBottom variant="h6" sx={{ fontWeight: 700 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {article.description}
                  </Typography>
                  <Button 
                    variant="text" 
                    sx={{ p: 0, fontWeight: 'bold', color: '#0052cc', textTransform: 'none' }}
                  >
                    Saber más →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};