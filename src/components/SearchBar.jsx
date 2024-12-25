import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, IconButton } from '@mui/material';

const SearchBar = ({setSearch}) => {
  const [info, setInfo] = useState({ nombre: "", identificacion: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Opcional: Evitar que se superen los límites mediante validación
    const maxLengths = { nombre: 50, identificacion: 20 };

    if (value.length <= maxLengths[name]) {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchClick = () => {
    // Imprime el nombre y la identificación cuando se presiona el icono
    setSearch({nombre: info.nombre, identificacion: info.identificacion})
  };

  return (
    <Grid container spacing={2} pb={2}>
      <Grid item xs={12} sm={5}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          value={info.nombre}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 50 }} // Limita a 50 caracteres
        />
      </Grid>

      <Grid item xs={12} sm={5}>
        <TextField
          label="Identificación"
          name="identificacion"
          type="text"
          value={info.identificacion}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 20 }} // Limita a 20 caracteres
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        {/* <IconButton
          onClick={handleSearchClick} // Evento onClick para manejar la acción
          style={{
            // backgroundColor: '#90A4AE', // Fondo más claro
            // color: '#fff',
            color: "primary",
            // width: '56px', // Ajusta el tamaño según sea necesario
            // height: '56px',
            // borderRadius: '50%', // Hace que el botón sea circular
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #9B7BC2', // Borde más oscuro
            // boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Añadir sombra sutil para el efecto de profundidad
          }}
        >
          <SearchIcon />
        </IconButton> */}
        <Button startIcon={<SearchIcon />} variant='outlined' size='large' sx={{height: "100%", width: "100%"}}>Buscar</Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
