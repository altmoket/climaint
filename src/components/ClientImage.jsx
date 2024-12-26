import React from 'react';
import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ClientImage = ({ base64Image }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {base64Image ? (
        <img
          src={base64Image}
          alt="Client"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <AccountCircleIcon
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </Box>
  );
};

export default ClientImage;
