import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  styled,
  tableCellClasses,
  Stack,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const DeleteConfirmationModal = ({ onDelete, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¿Estás seguro de que deseas eliminar a este cliente?</DialogTitle>
      <DialogContent>
        <p>Esta acción no se puede deshacer.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} variant="outlined" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ClientTable = ({ clients, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [clientId, setClientId] = useState(null);

  const handleOpenModal = (clientId) => {
    setClientId(clientId)
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteModal = () => {
    console.log("Elemento eliminado");
    onDelete(clientId)
    handleCloseModal();
  };

  return (
    <TableContainer component={Paper}>
      <DeleteConfirmationModal  onDelete={handleDeleteModal} open={openModal} onClose={handleCloseModal}></DeleteConfirmationModal>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {[
              { label: 'IDENTIFICACIÓN', width: '35%' },
              { label: 'NOMBRE COMPLETO', width: '45%' },
              { label: 'ACCIONES', width: '20%', align: 'center' }
            ].map(({ label, width, align = 'left' }) => (
              <StyledTableCell key={label} sx={{ width }} align={align}>{label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <StyledTableRow key={client.id}>
                <StyledTableCell>{client.identificacion}</StyledTableCell>
                <StyledTableCell>{`${client.nombre} ${client.apellidos}`}</StyledTableCell>
                <StyledTableCell>
                  <Stack direction={'row'}>
                    <IconButton aria-label="edit"
                      variant="text"
                      color="primary"
                      onClick={() => onEdit(client.id)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete"
                      variant="text"
                      color="error"
                      onClick={() => handleOpenModal(client.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>

                </StyledTableCell>
              </StyledTableRow>
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
    </TableContainer>
  );
};

export default ClientTable;
