import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import ClientTable from '../components/ClientTable';
import LoadingScreen from '../components/LoadingScreen';
import { deleteClient, getClients } from '../utils/clientUtils';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClientConsult = () => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState({ nombre: '', identificacion: '' })

  useEffect(() => {
    const loadClients = async ({ identificacion, nombre }) => {
      try {
        const clientData = await getClients(
          { token: state.token, userId: state.userId },
          { identificacion, nombre }
        );
        setClients(clientData);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch clients');
      }
    };
    setLoading(true)
    loadClients(search);
    setLoading(false)
  }, [state.token, state.userId, search]);

  const eliminarCliente = async ({ token }, id) => {
    try {
      if (token) {
        await deleteClient({ token }, { idCliente: id });
        setClients((prevClients) => prevClients.filter((client) => client.id !== id));
        console.log(`Cliente con ID ${id} eliminado.`);
      } else {
        setError('Servicio no disponible');
      }
    } catch (err) {
      console.error(err);
      setError('Error al eliminar el cliente');
    }
  };

  const editarCliente = (id) => {
    navigate('/client-maintenance', { state: { clientId: id } });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Header navigate={navigate} />
      <Divider />
      <Box mt={2}>
        <SearchBar setSearch={setSearch} />

      </Box>
      <ClientTable
        clients={clients}
        onEdit={editarCliente}
        onDelete={eliminarCliente}
      />
    </Box>
  );
};

const ErrorScreen = ({ error }) => (
  <Box sx={{ p: 3 }}>
    <Alert severity="error">{error}</Alert>
  </Box>
);

const Header = ({ navigate }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
    <Typography variant="h4">Consulta de Clientes</Typography>
    <Stack direction={"row"} spacing={1}>
      <Button startIcon={<PersonAddIcon />} variant="contained" color="primary" onClick={() => navigate('/client-maintenance')}>Agregar</Button>
      <Button startIcon={<ArrowBackIcon />} variant="outlined" color="secondary" onClick={() => navigate('/')}>Regresar</Button>
    </Stack>
  </Box>
);

export default ClientConsult;
