import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
// import LoadingScreen from "../components/LoadingScreen";
import useClientMantenanceViewModel from "../viewModels/clientMaintenanceViewModel";
import {
    Box, Button, Card, CardHeader, Grid, TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    CardContent,
    Divider,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ImageUploader from "../components/ImageUploader";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ClientMaintenance = () => {
    const { state } = useGlobalContext();
    const location = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        client,
        interests,
        fieldsErrors,
        onSubmit,
        setClient,
        handleChange
    } = useClientMantenanceViewModel({
        token: state.token,
        userId: state.userId,
        clientId: location.state?.clientId,
        navigate
    })

    // if (loading) return <LoadingScreen />;

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
                                onClick={onSubmit}
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
                    <form>
                        <Grid container spacing={2}>
                            {[
                                { label: "Identificación", name: "identificacion", type: "text", error: fieldsErrors.identificacion },
                                { label: "Nombre", name: "nombre", type: "text", error: fieldsErrors.nombre },
                                { label: "Apellidos", name: "apellidos", type: "text", error: fieldsErrors.apellidos },
                                { label: "Teléfono Celular", name: "celular", type: "tel", error: fieldsErrors.celular },
                                { label: "Teléfono Otro", name: "otroTelefono", type: "tel", error: fieldsErrors.otroTelefono },
                                { label: "Fecha de Nacimiento", name: "fNacimiento", type: "date", error: fieldsErrors.fNacimiento },
                                { label: "Fecha de Afiliación", name: "fAfiliacion", type: "date", error: fieldsErrors.fAfiliacion },
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
                                <FormControl fullWidth error={!!fieldsErrors.sexo}>
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
                                    {fieldsErrors.sexo && <FormHelperText>{fieldsErrors.sexo}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth error={!!fieldsErrors.interesFK}>
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
                                    {fieldsErrors.interesFK && <FormHelperText>{fieldsErrors.interesFK}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            {[
                                { label: "Dirección", name: "direccion", type: "text", multiline: true, rows: 2, error: fieldsErrors.direccion },
                                { label: "Reseña Personal", name: "resennaPersonal", type: "text", multiline: true, rows: 2, error: fieldsErrors.resennaPersonal },
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



export default ClientMaintenance;
