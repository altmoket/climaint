import React, { useState } from 'react';
import { Button, Box, FormLabel } from '@mui/material';
import ClientImage from './ClientImage';

const ImageUploader = ({ setImage , image}) => {
  const [base64Image, setBase64Image] = useState(image);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result
        setBase64Image(image);
        setImage(image)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="file-input"
        type="file"
        onChange={handleFileChange}
      />

      <FormLabel htmlFor='file-input'>
        <Button>
          <ClientImage base64Image={base64Image} />
        </Button>
      </FormLabel>
    </Box>
  );
};

export default ImageUploader;
