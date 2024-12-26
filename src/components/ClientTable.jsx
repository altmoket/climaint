import React from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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
  return (
    <TableContainer component={Paper}>
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
                        onClick={() => onDelete(client.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>

                  </StyledTableCell>
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
