import { createTheme } from "@mui/material/styles";

// #2196f3 -> Primary
// #ffffff -> Secondary
// #0d1621 -> background
// #1c2532 -> background
// #ffffff -> text
// #b0bec5 -> text

const theme = createTheme({
  palette: {
    mode: "dark", // Fondo general oscuro
    primary: {
      main: "#2196f3", // Azul para el encabezado y botones destacados
    },
    secondary: {
      main: "#ffffff", // Color blanco para elementos secundarios
    },
    background: {
      default: "#0d1621", // Fondo oscuro de la aplicación
      paper: "#1c2532", // Fondo de tarjetas y elementos en primer plano
    },
    text: {
      primary: "#ffffff", // Texto principal en blanco
      secondary: "#b0bec5", // Texto secundario en gris claro
    },
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
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)", // Sombra de tarjetas
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
