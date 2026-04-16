import React, { useState, useMemo, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, TextField, 
  Button, MenuItem, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Card, Stack, IconButton, Divider
} from '@mui/material';
import { 
  DeleteOutline, EditOutlined, AddCircleOutline, TrendingUp
} from '@mui/icons-material';
import axios from 'axios';

const PRIMARY_GREEN = '#00695C';
const TEXT_DARK = '#2D2D2D';
const BORDER_SOFT = '#F0E0D9';
const ACCENT_PEACH = '#E5B49E';

// 1. IMPORTANTE: Recibimos listaNombres desde AppRoutes
export const Dashboard = ({ listaNombres = [] }) => {
  const [listaDeGastos, setListaDeGastos] = useState([]);
  const [usuariosDB, setUsuariosDB] = useState([]); 
  const [filtroPeriodo, setFiltroPeriodo] = useState('2026-04'); 
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [form, setForm] = useState({
    fecha: '', categoria: '', descripcion: '', valor: '', responsable: ''
  });

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/users');
        setUsuariosDB(res.data);
      } catch (error) {
        console.error("Error al obtener usuarios de la DB", error);
        // Si falla la DB, no pasa nada, usaremos listaNombres
      }
    };
    cargarUsuarios();
  }, []);

  // 2. ESTA ES LA CLAVE: Combinamos lo de la DB con lo que recibimos por props
  const todosLosResponsables = useMemo(() => {
    // Extraemos nombres de la base de datos (si existen)
    const nombresDB = usuariosDB.map(u => u.nombre || u.username || u.name);
    // Unimos con los nombres que vienen de AppRoutes (los que se registraron)
    const unificados = [...new Set([...nombresDB, ...listaNombres])];
    return unificados.filter(n => n); // Quitamos vacíos
  }, [usuariosDB, listaNombres]);

  const gastosFiltrados = useMemo(() => {
    return listaDeGastos.filter(gasto => gasto.fecha.startsWith(filtroPeriodo));
  }, [listaDeGastos, filtroPeriodo]);

  const totalesPorResponsable = useMemo(() => {
    const resumen = {};
    gastosFiltrados.forEach(gasto => {
      if (!resumen[gasto.responsable]) resumen[gasto.responsable] = 0;
      resumen[gasto.responsable] += Number(gasto.valor);
    });
    return resumen;
  }, [gastosFiltrados]);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!form.fecha || !form.valor || !form.responsable) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }
    if (isEditing) {
      setListaDeGastos(listaDeGastos.map(item => item.id === currentId ? { ...form, id: currentId } : item));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setListaDeGastos([...listaDeGastos, { ...form, id: Date.now() }]);
    }
    setForm({ fecha: '', categoria: '', descripcion: '', valor: '', responsable: '' });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      setListaDeGastos(listaDeGastos.filter(item => item.id !== id));
    }
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: 'white',
      '&.Mui-focused fieldset': { borderColor: ACCENT_PEACH }
    },
    '& .MuiInputLabel-root.Mui-focused': { color: ACCENT_PEACH }
  };

  return (
    <Box sx={{ bgcolor: '#FDFCFB', minHeight: '100vh', pb: 8 }}>
      <Box sx={{ bgcolor: 'white', borderBottom: `1px solid ${BORDER_SOFT}`, py: 4, mb: 6 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: TEXT_DARK }}>
                Panel de <span style={{ color: PRIMARY_GREEN }}>Gastos</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4D4D', fontWeight: 600 }}>
                Sistema de Administración Financiera
              </Typography>
            </Box>
            <TextField
              type="month"
              size="small"
              label="Filtrar Mes"
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ ...inputStyle, width: { xs: '100%', md: 220 } }}
            />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '15px', border: `1px solid ${BORDER_SOFT}`, mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>
                <AddCircleOutline sx={{ color: PRIMARY_GREEN, mr: 1 }} />
                {isEditing ? 'Editar Registro' : 'Registrar Movimiento'}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Fecha" type="date" value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})} InputLabelProps={{ shrink: true }} sx={inputStyle} />
                </Grid>

                {/* SELECT DE RESPONSABLES CORREGIDO */}
                <Grid item xs={12} sm={3}>
                  <TextField 
                    fullWidth 
                    select 
                    label="Responsable" 
                    value={form.responsable} 
                    onChange={(e) => setForm({...form, responsable: e.target.value})}
                    sx={inputStyle}
                  >
                    {todosLosResponsables.length === 0 ? (
                      <MenuItem disabled>No hay usuarios</MenuItem>
                    ) : (
                      todosLosResponsables.map((nombre, index) => (
                        <MenuItem key={index} value={nombre}>
                          {nombre}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Descripción" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} sx={inputStyle} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Monto" type="number" value={form.valor} onChange={(e) => setForm({...form, valor: e.target.value})} sx={inputStyle} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="contained" onClick={handleGuardar} sx={{ bgcolor: PRIMARY_GREEN, borderRadius: '10px', px: 4, fontWeight: 700 }}>
                    GUARDAR DATOS
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '15px', border: `1px solid ${BORDER_SOFT}` }}>
              <Table>
                <TableHead sx={{ bgcolor: '#F9F7F6' }}>
                  <TableRow>
                    <TableCell>FECHA</TableCell>
                    <TableCell>DETALLE</TableCell>
                    <TableCell>MONTO</TableCell>
                    <TableCell align="center">ACCIONES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gastosFiltrados.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.fecha}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.descripcion}</Typography>
                        <Typography variant="caption" sx={{ color: PRIMARY_GREEN }}>{item.responsable}</Typography>
                      </TableCell>
                      <TableCell>${Number(item.valor).toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => { setForm(item); setIsEditing(true); setCurrentId(item.id); }} size="small" sx={{ color: ACCENT_PEACH }}><EditOutlined /></IconButton>
                        <IconButton onClick={() => handleEliminar(item.id)} size="small" sx={{ color: '#c85a54' }}><DeleteOutline /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card elevation={0} sx={{ p: 4, borderRadius: '15px', border: `1.5px solid ${PRIMARY_GREEN}`, position: 'sticky', top: 100 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>
                <TrendingUp sx={{ color: PRIMARY_GREEN, mr: 1 }} /> Resumen
              </Typography>
              <Stack spacing={2}>
                {Object.entries(totalesPorResponsable).map(([nombre, total]) => (
                  <Box key={nombre} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F9F7F6' }}>
                    <Typography>{nombre}</Typography>
                    <Typography sx={{ fontWeight: 800 }}>${total.toLocaleString()}</Typography>
                  </Box>
                ))}
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">TOTAL:</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: PRIMARY_GREEN }}>
                    ${gastosFiltrados.reduce((acc, curr) => acc + Number(curr.valor), 0).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};