import { createTheme } from "@mui/material/styles";

// Colores Principales
// Primary (Principal): #2196f3
// Secondary (Secundario): #ffffff
// Background 1 (Fondo Principal): #0d1621
// Background 2 (Fondo Secundario): #1c2532
// Text Primary (Texto Principal): #ffffff
// Text Secondary (Texto Secundario): #b0bec5

// Colores Adicionales
// Accent (Acento): #64b5f6
// Hover/Active Primary: #1976d2
// Divider/Border (Divisores o Bordes): #37474f
// Highlight (Resaltado): #bbdefb

// Colores para Estados
// Success (Éxito): #4caf50
// Error (Error): #f44336
// Warning (Advertencia): #ff9800
// Info (Información): #03a9f4

// Gradientes (Opcional)
// Gradient Light: linear-gradient(to right, #2196f3, #64b5f6)
// Gradient Dark: linear-gradient(to right, #0d1621, #1c2532)

const theme = createTheme({
  palette: {
    mode: "light", // Puedes alternar entre "light" y "dark" para cambiar el modo
    primary: {
      main: "#2196f3", // Azul para el encabezado y botones destacados
      light: '#64b5f6', // Azul claro
      dark: '#1976d2', // Azul oscuro
    },
    secondary: {
      main: "#ffffff", // Color blanco para elementos secundarios
    },
    background: {
      default: "#ffffff", // Fondo claro por defecto
      paper: "#f5f5f5", // Fondo claro de tarjetas y elementos en primer plano
    },
    text: {
      primary: "#000000", // Texto principal en negro en modo claro
      secondary: "#757575", // Texto secundario en gris en modo claro
      disabled: '#90a4ae', // Texto deshabilitado
    },
    success: {
      main: '#4caf50', // Verde para éxito
    },
    error: {
      main: '#f44336', // Rojo para error
    },
    warning: {
      main: '#ff9800', // Naranja para advertencias
    },
    info: {
      main: '#03a9f4', // Azul cian para información
    },
    divider: '#e0e0e0', // Divisores o bordes en modo claro
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Tipografía estándar
    h5: {
      fontWeight: 600, // Encabezados destacados
    },
    body1: {
      fontWeight: 400, // Texto general
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Sombra de tarjetas en modo claro
          borderRadius: "8px", // Bordes redondeados
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Texto de los botones sin mayúsculas
          borderRadius: "20px", // Bordes redondeados para botones
        },
      },
      variants: [
        {
          props: { variant: 'custom' }, // Define un nuevo variant llamado "custom"
          style: {
            backgroundColor: '#64b5f6', // Color de fondo personalizado
            color: '#ffffff', // Color del texto
            textTransform: 'none', // Quitar capitalización automática
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#1976d2', // Color de fondo al pasar el mouse
            },
          },
        },
      ]
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0d1621", // Fondo del AppBar
          color: "#ffffff", // Color del texto en el AppBar
        },
      },
    },
  },
});

export default theme;
