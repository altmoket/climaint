import React from 'react'
import { Avatar, Badge, IconButton } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ClientImage = ({ base64Image, onChange, hidden}) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <IconButton color="primary">
          <CameraAltIcon />
        </IconButton>
      }
    >
      {base64Image ? <Avatar alt="Travis Howard" src={base64Image} sx={{width:100, height: 100}}/> : <AccountCircleIcon />}
    </Badge>
  )
}

export default ClientImage

