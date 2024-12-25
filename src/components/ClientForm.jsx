import React from "react";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  CardHeader,
  CardContent,
  Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ClientImage from "../components/ClientImage";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const ClientForm = ({ client, interests, onSubmit, setClient }) => {
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate()
  const validateForm = () => {
    const newErrors = {};

    // Validación de longitud
    if (client.nombre && client.nombre.length > 50) newErrors.nombre = "El nombre no puede superar los 50 caracteres";
    if (client.apellidos && client.apellidos.length > 100) newErrors.apellidos = "Los apellidos no pueden superar los 100 caracteres";
    if (client.identificacion && client.identificacion.length > 20) newErrors.identificacion = "La identificación no puede superar los 20 caracteres";
    if (client.celular && client.celular.length > 20) newErrors.celular = "El teléfono celular no puede superar los 20 caracteres";
    if (client.otroTelefono && client.otroTelefono.length > 20) newErrors.otroTelefono = "El teléfono otro no puede superar los 20 caracteres";
    if (client.direccion && client.direccion.length > 200) newErrors.direccion = "La dirección no puede superar los 200 caracteres";
    if (client.sexo && client.sexo.length > 1) newErrors.sexo = "Sexo debe ser 'M' o 'F'";
    if (client.resennaPersonal && client.resennaPersonal.length > 200) newErrors.resennaPersonal = "La reseña personal no puede superar los 200 caracteres";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setClient((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(client)
      onSubmit(client);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <CardHeader
        action={
          <Grid
            container
            spacing={2}
            alignItems='center'  // Alinea los elementos verticalmente al centro
            height="100%"        // Asegura que el contenedor ocupe toda la altura disponible
            maxHeight={200}
          >
            <Grid item>
              <ClientImage base64Image={client.imagen} hidden onChange={handleFileChange} />
            </Grid>

            <Grid item>
              <Typography>Mantenimiento de Clientes</Typography>
            </Grid>


            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/client-consult")}
                startIcon={<ArrowBackIcon />}
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          {[
            { label: "Identificación", name: "identificacion", type: "text", error: errors.identificacion },
            { label: "Nombre", name: "nombre", type: "text", error: errors.nombre },
            { label: "Apellidos", name: "apellidos", type: "text", error: errors.apellidos },
            { label: "Teléfono Celular", name: "celular", type: "tel", error: errors.celular },
            { label: "Teléfono Otro", name: "otroTelefono", type: "tel", error: errors.otroTelefono },
            { label: "Fecha de Nacimiento", name: "fNacimiento", type: "date", error: null },
            { label: "Fecha de Afiliación", name: "fAfiliacion", type: "date", error: null },
            { label: "Dirección", name: "direccion", type: "text", multiline: true, rows: 3, error: errors.direccion },
            { label: "Reseña Personal", name: "resennaPersonal", type: "text", multiline: true, rows: 4, error: errors.resennaPersonal },
          ].map(({ label, name, type, multiline, rows, error }) => (
            <Grid item xs={12} sm={4} key={name}>
              <TextField
                label={label}
                name={name}
                type={type}
                value={client[name]}
                onChange={handleChange}
                fullWidth
                multiline={multiline || false}
                rows={rows || 1}
                InputLabelProps={{ shrink: true }}
                required={name !== "otroTelefono"}
                error={!!error}
                helperText={error}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.sexo}>
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                labelId="sexo-label"
                name="sexo"
                value={client.sexo}
                onChange={handleChange}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
              {errors.sexo && <FormHelperText>{errors.sexo}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.interesFK}>
              <InputLabel id="interesFK-label">Intereses</InputLabel>
              <Select
                labelId="interesFK-label"
                name="interesFK"
                value={client.interesFK}
                onChange={handleChange}
              >
                <MenuItem value="">Seleccione...</MenuItem>
                {interests.map(({ id, descripcion }) => (
                  <MenuItem key={id} value={id}>
                    {descripcion}
                  </MenuItem>
                ))}
              </Select>
              {errors.interesFK && <FormHelperText>{errors.interesFK}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Subir Imagen
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>

    </form>
  );
};

export default ClientForm;
