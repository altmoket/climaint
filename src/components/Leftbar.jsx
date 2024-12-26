import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { People, Login, Home, Mail, PersonAdd } from '@mui/icons-material';
import { Link as RouterLink } from "react-router-dom";

const links = [
  { label: 'Home', to: '/', icon: <Home /> },
  { label: 'Login', to: '/login', icon: <Login /> },
  { label: 'Register', to: '/register', icon: <Mail /> },
  { label: 'Consulta Cliente', to: "/client-consult", icon: <People /> },
  { label: 'Mantenimiento Cliente', to: "/client-maintenance", icon: <PersonAdd /> }
]

const Leftbar = () => {
  return (
    <List sx={{ height: '100vh', width: '100%'}}>
      {links.map(({ label, to, icon }, index) => (
        <RouterLink
          to={to}
          key={label}
          style={{ textDecoration: 'none', color: 'inherit' }}  // Remueve subrayado y asegura el color heredad
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} sx={{ color: 'inherit' }} />  {/* Asegura que el color también se herede */}
            </ListItemButton>
          </ListItem>
        </RouterLink>
      ))}
    </List>
  )
}

export default Leftbar