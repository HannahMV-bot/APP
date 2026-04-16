import { Box, Container, Typography, Stack } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, px: 2, mt: 'auto', backgroundColor: '#f9fafb', borderTop: '1px solid #eee' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Privacidad', 'Términos', 'Contacto'].map((text) => (
              <Typography key={text} variant="caption" sx={{ color: '#666', cursor: 'pointer' }}>
                {text}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};