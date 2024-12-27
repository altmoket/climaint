import { useState, useEffect } from "react";
import { deleteClient, getClients } from '../utils/clientUtils';

const useClientConsultViewModel = ({token, userId}) => {
  console.log("Token:", token, "User ID", userId)
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ nombre: '', identificacion: '' })

  useEffect(() => {
    const loadClients = async ({ identificacion, nombre }) => {
      try {
        const clientData = await getClients(
          { token, userId: userId },
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
  }, [token, userId, search]);

  // TODO: Handle errors and show notifications
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

  return {
    clients,
    loading,
    error,
    search,
    setSearch,
    eliminarCliente,
  };
}

export default useClientConsultViewModel