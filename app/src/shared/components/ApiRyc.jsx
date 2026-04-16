import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Stack, Avatar, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ApiRyc = () => {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(1);
  const [info, setInfo] = useState({ pages: 0 });
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${pages}&name=${query}`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results || []);
        setInfo(data.info || { pages: 0 });
      }).catch(() => setCharacters([]));
  }, [pages, query]);

  return (
    <Box sx={{ bgcolor: '#F9F4F2', minHeight: '100vh', py: 8 }}>
      <Container>
        
        {/* TITULO */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#2D2D2D', mb: 1 }}>
            Ricky and Morty API (Fetch)
          </Typography>
          <Divider sx={{ width: '60px', height: '5px', bgcolor: '#E5B49E', margin: '0 auto', borderRadius: '10px', border: 'none' }} />
        </Box>

        {/* BUSCADOR */}
        <Stack spacing={3} alignItems="center" sx={{ mb: 6 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ bgcolor: 'white', p: 1, borderRadius: '50px', border: '1px solid #F0E0D9', width: '100%', maxWidth: 400 }}
          >
            <TextField 
              fullWidth 
              variant="standard" 
              placeholder="Nombre del personaje..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ disableUnderline: true, sx: { px: 2 } }}
            />
            <Button 
              variant="contained" 
              onClick={() => { setQuery(search); setPages(1); }}
              sx={{ bgcolor: '#00695C', borderRadius: '50px', '&:hover': { bgcolor: '#004D40' } }}
            >
              <SearchIcon />
            </Button>
          </Stack>

          {/* PAGINACIÓN */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button 
              startIcon={<ArrowBackIosNewIcon />}
              disabled={pages === 1}
              onClick={() => setPages(pages - 1)}
              sx={{ color: '#00695C', fontWeight: 'bold' }}
            >
              Anterior
            </Button>
            <Box sx={{ bgcolor: '#00695C', color: 'white', px: 2, py: 0.5, borderRadius: '10px', fontWeight: 'bold' }}>
               {pages} / {info.pages}
            </Box>
            <Button 
              endIcon={<ArrowForwardIosIcon />}
              disabled={pages === info.pages}
              onClick={() => setPages(pages + 1)}
              sx={{ color: '#00695C', fontWeight: 'bold' }}
            >
              Siguiente
            </Button>
          </Stack>
        </Stack>

        {/* GRID CIRCULAR */}
        <Grid container spacing={4} justifyContent="center">
          {characters.map((char) => (
            <Grid item xs={12} sm={6} md={4} key={char.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ 
                width: 260, height: 260, borderRadius: '50%', bgcolor: 'white', 
                display: 'flex', flexDirection: 'column', alignItems: 'center', 
                justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '2px solid #F0E0D9', transition: '0.3s',
                '&:hover': { borderColor: '#E5B49E', transform: 'scale(1.05)' }
              }}>
                <Avatar src={char.image} sx={{ width: 100, height: 100, mb: 1, border: '3px solid #E5B49E' }} />
                <Typography sx={{ fontWeight: 800, color: '#2D2D2D' }}>{char.name}</Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>{char.species}</Typography>
                
                {/* ESTADO DINÁMICO */}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: '900',
                    color: char.status === 'Alive' ? '#2e7d32' : char.status === 'Dead' ? '#d32f2f' : '#757575'
                  }}
                >
                  {char.status.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ApiRyc;