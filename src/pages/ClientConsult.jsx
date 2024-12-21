import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import axiosInstance from '../axiosInstance';

export const getInterests = async (token) => {
  try {
    const response = await axiosInstance.get('api/Intereses/Listado', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching interests:', error);
    return [];
  }
};

const ClientConsult = () => {
  const { state } = useGlobalContext();

  const [interests, setInterests] = useState([]);
  const [error, setError] = useState(null);
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', identificacion: '12345678' },
    { id: 2, nombre: 'Ana Gómez', identificacion: '87654321' },
    { id: 3, nombre: 'Luis Martínez', identificacion: '11223344' },
  ]);

  useEffect(() => {
    if (state.token) {
      getInterests(state.token)
        .then((data) => setInterests(data))
        .catch((err) => setError('Failed to fetch interests'));
    }
  }, [state.token]);

  const eliminarCliente = (id) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  const editarCliente = (id) => {
    console.log(`Editar cliente con ID: ${id}`);
  };

  return (
    <div>
      {state.token && (
        <>
          <h2>Lista de Intereses</h2>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DESCRIPCION</th>
                </tr>
              </thead>
              <tbody>
                {interests.map((interest) => (
                  <tr key={interest.id}>
                    <td>{interest.id}</td>
                    <td>{interest.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.identificacion}</td>
              <td>{cliente.nombre}</td>
              <td>
                <button onClick={() => editarCliente(cliente.id)}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientConsult;
