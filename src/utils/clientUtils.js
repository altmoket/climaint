import axiosInstance from "./axiosInstance";

// Fetch interests with proper error handling
export const getInterests = async (token) => {
  try {
    const response = await axiosInstance.get("api/Intereses/Listado", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching interests:", error);
    return []; // Return an empty array on error
  }
};

// Format date string to "YYYY-MM-DD"
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

// Fetch clients with proper return handling and error handling
export const getClients = async ({ token, userId }, { identificacion = '', nombre = '' }) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axiosInstance.post(
      "api/Cliente/Listado",
      { identificacion, nombre, usuarioId: userId },
      { headers }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error; // Propagate the error after logging
  }
};

// Create a new client with proper error handling
export const createClient = async ({ token, userId }, clientData) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axiosInstance.post(
      "api/Cliente/Crear",
      { ...clientData, usuarioId: userId },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating client:", error);
    throw error; // Propagate the error after logging
  }
};

// Update client data with proper error handling
export const updateClient = async ({ token, userId }, clientData) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axiosInstance.post(
      "api/Cliente/Actualizar",
      { ...clientData, usuarioId: userId },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating client:", error);
    throw error; // Propagate the error after logging
  }
};

// Fetch a single client by ID with proper error handling
export const getClient = async ({ token }, { idCliente }) => {
  const headers = { Authorization: `Bearer ${token}` };
  if (!idCliente) throw new Error("Client ID is required.");
  try {
    const response = await axiosInstance.get(
      `api/Cliente/Obtener/${idCliente}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching client:", error);
    throw error; // Propagate the error after logging
  }
};

// Delete a client with proper error handling
export const deleteClient = async ({ token }, { idCliente }) => {
  const headers = { Authorization: `Bearer ${token}` };
  if (!idCliente) throw new Error("Client ID is required.");
  try {
    const response = await axiosInstance.delete(
      `api/Cliente/Eliminar/${idCliente}`,
      { headers }
    );
    return response;
  } catch (error) {
    console.log("Error deleting client:", error);
    throw error; // Propagate the error after logging
  }
};
