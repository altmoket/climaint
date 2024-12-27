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

// Componente FormField para simplificar la creación de campos
const FormField = ({ label, name, type, value, onChange, error, helperText, multiline, rows }) => (
  <Grid item xs={12} sm={6} md={4} key={name}>
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      rows={rows}
      InputLabelProps={{ shrink: true }}
      required
      error={!!error}
      helperText={helperText || error}
    />
  </Grid>
);

const ClientForm = ({ client, interests, onSubmit, setClient }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const validateForm = () => {
    const newErrors = {};
    const validations = [
      { field: "nombre", maxLength: 50 },
      { field: "apellidos", maxLength: 100 },
      { field: "identificacion", maxLength: 20 },
      { field: "celular", maxLength: 20 },
      { field: "otroTelefono", maxLength: 20 },
      { field: "direccion", maxLength: 200 },
      { field: "sexo", validValues: ["M", "F"] },
      { field: "resennaPersonal", maxLength: 200 },
      { field: "fNacimiento" },
      { field: "fAfiliacion" },
      { field: "interesFK"}

    ];

    validations.forEach(({ field, maxLength, validValues }) => {
      console.log(field)
      if (!client[field]) {
        newErrors[field] = `${labelFor(field)} es requerido(a)`;
      } else if (maxLength && client[field]?.length > maxLength) {
        newErrors[field] = `${labelFor(field)} no puede superar los ${maxLength} caracteres`;
      } else if (validValues && !validValues.includes(client[field])) {
        newErrors[field] = `${labelFor(field)} debe ser 'M' o 'F'`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const labelFor = (field) => {
    const labels = {
      nombre: "El nombre",
      apellidos: "Los apellidos",
      identificacion: "La identificación",
      celular: "El teléfono celular",
      otroTelefono: "El teléfono adicional",
      direccion: "La dirección",
      sexo: "Sexo",
      resennaPersonal: "La reseña personal",
      fNacimiento: "La fecha de nacimiento",
      fAfiliacion: "La fecha de afiliación",
      interesFK: "El interés"
    };
    return labels[field] || field;
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
    <Card sx={{ padding: 2, margin: "1rem", boxShadow: 3 }}>
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
              { label: "Fecha de Nacimiento", name: "fNacimiento", type: "date", error: errors.fNacimiento },
              { label: "Fecha de Afiliación", name: "fAfiliacion", type: "date", error: errors.fAfiliacion },
            ].map(({ label, name, type, error }) => (
              <FormField
                key={name}
                label={label}
                name={name}
                type={type}
                value={client[name]}
                onChange={handleChange}
                error={error}
              />
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
                  required
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
              <FormField
                key={name}
                label={label}
                name={name}
                type={type}
                value={client[name]}
                onChange={handleChange}
                error={error}
                multiline={multiline}
                rows={rows}

              />
            ))}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClientForm;
