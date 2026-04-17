import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box, Container, Typography, Grid, TextField, 
  Button, Stack, Card, CardMedia, CardContent, Divider 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ApiRycAxios = () => {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState("");   

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${pages}&name=${query}`
        );
        setCharacters(res.data.results || []);
        setTotalPages(res.data.info.pages);
      } catch {
  setCharacters([]);
  setTotalPages(0);
}
    };
    fetchChars();
  }, [pages, query]);

  return (
    <Box sx={{ bgcolor: '#F9F4F2', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">

        {/* TITULO */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#2D2D2D', mb: 1 }}>
            Personajes (Axios)
          </Typography>
          <Divider sx={{ width: '60px', height: '5px', bgcolor: '#E5B49E', margin: '0 auto', borderRadius: '10px', border: 'none' }} />
        </Box>

        {/* BUSCADOR */}
        <Stack 
          component="form"
          onSubmit={(e) => { e.preventDefault(); setQuery(search); setPages(1); }}
          direction="row" 
          spacing={1} 
          sx={{ 
            maxWidth: 500, mx: 'auto', mb: 3, bgcolor: 'white', p: 1, 
            borderRadius: '50px', border: '1px solid #F0E0D9' 
          }}
        >
          <TextField 
            fullWidth 
            variant="standard"
            placeholder="Buscar personaje..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            sx={{ px: 2 }}
            InputProps={{ disableUnderline: true }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ bgcolor: '#00695C', borderRadius: '50px', minWidth: '50px', '&:hover': { bgcolor: '#004D40' } }}
          >
            <SearchIcon />
          </Button>
        </Stack>

        {/* PAGINACIÓN */}
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 6 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
            disabled={pages === 1}
            onClick={() => setPages(pages - 1)}
            sx={{ borderRadius: '12px', borderColor: '#00695C', color: '#00695C', fontWeight: 700 }}
          >
            Anterior
          </Button>

          <Box sx={{ bgcolor: '#E5B49E', color: 'white', px: 2, py: 0.5, borderRadius: '20px', fontWeight: 'bold' }}>
            {pages} / {totalPages}
          </Box>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
            disabled={pages === totalPages}
            onClick={() => setPages(pages + 1)}
            sx={{ borderRadius: '12px', borderColor: '#00695C', color: '#00695C', fontWeight: 700 }}
          >
            Siguiente
          </Button>
        </Stack>

        {/* GRID DE CARDS */}
        <Grid container spacing={3}>
          {characters.map((char) => (
            <Grid item xs={12} sm={6} md={3} key={char.id}>
              <Card sx={{ 
                borderRadius: '24px', 
                border: '1px solid #F0E0D9', 
                transition: '0.3s', 
                '&:hover': { transform: 'translateY(-10px)', borderColor: '#E5B49E' } 
              }}>
                <CardMedia component="img" image={char.image} sx={{ height: 200 }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{char.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{char.species}</Typography>
                  
                  {/* ESTADO DINÁMICO */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 'bold', 
                      display: 'block', 
                      mt: 1,
                      color: char.status === 'Alive' ? '#2e7d32' : char.status === 'Dead' ? '#d32f2f' : '#757575'
                    }}
                  >
                    ● {char.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ApiRycAxios;