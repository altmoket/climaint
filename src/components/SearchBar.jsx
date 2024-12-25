import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Typography } from '@mui/material';

const SearchBar = ({ setSearch }) => {
  const [info, setInfo] = useState({ nombre: "", identificacion: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const maxLengths = { nombre: 50, identificacion: 20 };

    if (value.length <= maxLengths[name]) {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchClick = () => {
    setSearch({ nombre: info.nombre, identificacion: info.identificacion })
  };

  return (
    <Grid container spacing={2} pb={2}>
      <Grid item xs={12} sm={6} md={5}>
        <TextField
          label="Identificación"
          name="identificacion"
          type="text"
          value={info.identificacion}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 20 }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={5}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          value={info.nombre}
          onChange={handleChange}
          fullWidth
          inputProps={{ maxLength: 50 }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={2}>
        <Button
          startIcon={<SearchIcon />}
          variant='outlined'
          size='large'
          sx={{ height: "100%", width: "100%" }}
          onClick={handleSearchClick}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
