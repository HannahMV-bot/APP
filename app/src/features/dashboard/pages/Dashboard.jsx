import React, { useState, useMemo } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, TextField, 
  Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Card, Stack, IconButton, Divider
} from '@mui/material';
import { 
  DeleteOutline, EditOutlined, AddCircleOutline, TrendingUp
} from '@mui/icons-material';

const PRIMARY_GREEN = '#00695C';
const TEXT_DARK = '#2D2D2D';
const BORDER_SOFT = '#F0E0D9';
const ACCENT_PEACH = '#E5B49E';

export const Dashboard = () => {
  const [listaDeGastos, setListaDeGastos] = useState([]);
  const [filtroPeriodo, setFiltroPeriodo] = useState('2026-04'); 
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    fecha: '',
    descripcion: '',
    valor: ''
  });

  const gastosFiltrados = useMemo(() => {
    return listaDeGastos.filter(gasto => gasto.fecha.startsWith(filtroPeriodo));
  }, [listaDeGastos, filtroPeriodo]);

  const totalGeneral = useMemo(() => {
    return gastosFiltrados.reduce((acc, curr) => acc + Number(curr.valor), 0);
  }, [gastosFiltrados]);

  const handleGuardar = (e) => {
    e.preventDefault();

    if (!form.fecha || !form.valor) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    if (isEditing) {
      setListaDeGastos(listaDeGastos.map(item => 
        item.id === currentId ? { ...form, id: currentId } : item
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setListaDeGastos([
        ...listaDeGastos,
        { ...form, id: Date.now() }
      ]);
    }

    setForm({ fecha: '', descripcion: '', valor: '' });
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
      
      {/* HEADER */}
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
          
          {/* FORMULARIO */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '15px', border: `1px solid ${BORDER_SOFT}`, mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>
                <AddCircleOutline sx={{ color: PRIMARY_GREEN, mr: 1 }} />
                {isEditing ? 'Editar Registro' : 'Registrar Movimiento'}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyle}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    sx={inputStyle}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="number"
                    value={form.valor}
                    onChange={(e) => setForm({ ...form, valor: e.target.value })}
                    sx={inputStyle}
                  />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleGuardar}
                    sx={{ bgcolor: PRIMARY_GREEN, borderRadius: '10px', px: 4, fontWeight: 700 }}
                  >
                    GUARDAR DATOS
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* TABLA */}
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {item.descripcion}
                        </Typography>
                      </TableCell>
                      <TableCell>${Number(item.valor).toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            setForm(item);
                            setIsEditing(true);
                            setCurrentId(item.id);
                          }}
                          size="small"
                          sx={{ color: ACCENT_PEACH }}
                        >
                          <EditOutlined />
                        </IconButton>

                        <IconButton
                          onClick={() => handleEliminar(item.id)}
                          size="small"
                          sx={{ color: '#c85a54' }}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* RESUMEN */}
          <Grid item xs={12} lg={4}>
            <Card elevation={0} sx={{ p: 4, borderRadius: '15px', border: `1.5px solid ${PRIMARY_GREEN}`, position: 'sticky', top: 100 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>
                <TrendingUp sx={{ color: PRIMARY_GREEN, mr: 1 }} /> Resumen
              </Typography>

              <Stack spacing={2}>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">TOTAL:</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: PRIMARY_GREEN }}>
                    ${totalGeneral.toLocaleString()}
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