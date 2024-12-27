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
import useClientFormViewModel from "../viewModels/clientFormViewModel";

const FormField = ({ label, name, type, value, onChange, error, helperText, multiline, rows, ...props }) => (
  <Grid item xs={12} sm={6} md={4} key={name} {...props}>
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
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { validateForm, handleFormSubmit, errors, handleChange } = useClientFormViewModel()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={'30px'}
    >
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
                  xs={12}
                  sm={12}
                  md={6}
                />
              ))}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientForm;
