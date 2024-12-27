import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import { useState } from "react";

const ClientForm = ({ client, interests, onSubmit, setClient }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const theme = useTheme()
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const validateForm = () => {
    const newErrors = {};
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(client);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "1rem", boxShadow: 3}}>
      <CardHeader
        title="Mantenimiento de Clientes"
        avatar={
          <ImageUploader
            image={client.imagen}
            setImage={(imagen) => setClient((prev) => ({ ...prev, imagen }))}
          />
        }
        action={
          <Box
            textAlign="right"
            padding={2}
            display="flex"
            flexDirection={isXsScreen ? "column" : "row"}
            gap={1}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => validateForm() && onSubmit(client)}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Regresar
            </Button>
          </Box>
        }
        titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
      />
      <Divider />
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Identificación", name: "identificacion", type: "text", error: errors.identificacion },
              { label: "Nombre", name: "nombre", type: "text", error: errors.nombre },
              { label: "Apellidos", name: "apellidos", type: "text", error: errors.apellidos },
              { label: "Teléfono Celular", name: "celular", type: "tel", error: errors.celular },
              { label: "Teléfono Otro", name: "otroTelefono", type: "tel", error: errors.otroTelefono },
              { label: "Fecha de Nacimiento", name: "fNacimiento", type: "date", error: null },
              { label: "Fecha de Afiliación", name: "fAfiliacion", type: "date", error: null },
            ].map(({ label, name, type, error }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <TextField
                  label={label}
                  name={name}
                  type={type}
                  value={client[name]}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required={name !== "otroTelefono"}
                  error={!!error}
                  helperText={error}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6} md={4}>
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

            <Grid item xs={12} sm={6} md={4}>
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

            {[
              { label: "Dirección", name: "direccion", type: "text", multiline: true, rows: 2, error: errors.direccion },
              { label: "Reseña Personal", name: "resennaPersonal", type: "text", multiline: true, rows: 2, error: errors.resennaPersonal },
            ].map(({ label, name, type, multiline, rows, error }) => (
              <Grid item xs={12} key={name}>
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
                  required
                  error={!!error}
                  helperText={error}
                />
              </Grid>
            ))}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClientForm;
