import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientTable = ({ clients, onEdit, onDelete }) => {
  return (
    <Paper >
      <Table>
        <TableHead>
          <TableRow sx={{fontWeight: "bold"}}>
            <TableCell sx={{width: "40%"}}>ID</TableCell>
            <TableCell sx={{width: "40%"}}>Nombre Completo</TableCell>
            <TableCell sx={{width: "20%"}}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.identificacion}</TableCell>
                <TableCell>{`${client.nombre} ${client.apellidos}`}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => onEdit(client.id)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => onDelete(client.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No hay clientes disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>

  );
};

export default ClientTable;
