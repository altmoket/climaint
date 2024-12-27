import { useEffect, useState } from "react";
import { createClient, formatDate, getClient, getInterests, updateClient } from "../utils/clientUtils";

const initialClientState = {
  identificacion: "",
  nombre: "",
  apellidos: "",
  celular: "",
  otroTelefono: "",
  direccion: "",
  fNacimiento: "",
  fAfiliacion: "",
  sexo: "",
  resennaPersonal: "",
  imagen: "",
  interesFK: "",
};

const mapClientData = (data) => ({
  identificacion: data.identificacion || "",
  nombre: data.nombre || "",
  apellidos: data.apellidos || "",
  celular: data.telefonoCelular || "",
  otroTelefono: data.otroTelefono || "",
  direccion: data.direccion || "",
  fNacimiento: formatDate(data.fNacimiento),
  fAfiliacion: formatDate(data.fAfiliacion),
  sexo: data.sexo ? data.sexo.toUpperCase() : "",
  resennaPersonal: data.resenaPersonal || "",
  imagen: data.imagen || "",
  interesFK: data.interesesId || "",
});

const useClientMantenanceViewModel = ({ token, userId, clientId, navigate }) => {
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState(null);
  const [client, setClient] = useState(initialClientState);
  const [loading, setLoading] = useState(false); // This controls both loading states

  useEffect(() => {
    if (token && userId) {
      fetchInterests(token);
      if (clientId) {
        fetchClient({ token: token, userId: userId }, clientId);
      }
    }
  }, [token, userId, clientId]);

  // TODO: Handle errors and show notifications
  const fetchInterests = async (token) => {
    try {
      const data = await getInterests(token);
      setInterests(data);
    } catch {
      setError("Failed to fetch interests");
    }
  };

  // TODO: Handle errors and show notifications
  const fetchClient = async ({ token, userId }, clientId) => {
    try {
      setLoading(true);
      const data = await getClient({ token, userId }, { idCliente: clientId });
      setClient(mapClientData(data));
    } catch (error) {
      console.error("Error fetching client:", error);
      setError("Failed to fetch client data");
    } finally {
      setLoading(false);
    }
  };

  // TODO: Handle errors and show notifications
  const handleSubmit = async (updatedClient) => {
    setLoading(true);
    try {
      if (clientId) {
        await updateClient({ token, userId }, { ...updatedClient, id: clientId });
      } else {
        await createClient({ token: token, userId: userId }, updatedClient);
      }
      setLoading(false);
      navigate("/client-consult");
    } catch (error) {
      console.error("Error saving client:", error);
      setError("Failed to save client data");
    }
  };

  return {
    loading,
    client, 
    handleSubmit,
    setClient,
    interests,
    error
  }
}

export default useClientMantenanceViewModel