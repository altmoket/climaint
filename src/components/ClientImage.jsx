import React from 'react'
import { Box} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ClientImage = ({ base64Image }) => {
  return (
    <Box>
      {base64Image ? (
        <img src={base64Image} alt="Client" style={{ width: '50px', height: 'auto' }} />
      ) : (
        <AccountCircleIcon sx={{ width: '50px', height: 'auto' }} />
      )}
    </Box>
  );
};

export default ClientImage

