import React, { useEffect, useState } from 'react';
import { getInterests, addInterest, deleteInterest } from '../services/interestService';
import { TextField, Button, List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const InterestManager = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');

  // Fetch interests on component mount
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const data = await getInterests();
        setInterests(data);
      } catch (error) {
        console.error('Failed to fetch interests:', error);
      }
    };
    fetchInterests();
  }, []);

  // Add a new interest
  const handleAddInterest = async () => {
    if (!newInterest.trim()) return;

    try {
      const addedInterest = await addInterest(newInterest.trim());
      setInterests([...interests, addedInterest]);
      setNewInterest(''); // Clear input field
    } catch (error) {
      console.error('Failed to add interest:', error);
    }
  };

  // Delete an interest
  const handleDeleteInterest = async (id) => {
    try {
      await deleteInterest(id);
      setInterests(interests.filter((interest) => interest.id !== id));
    } catch (error) {
      console.error('Failed to delete interest:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Manage Interests</Typography>
      <TextField
        label="New Interest"
        variant="outlined"
        value={newInterest}
        onChange={(e) => setNewInterest(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddInterest}>
        Add Interest
      </Button>

      <List>
        {interests.map((interest) => (
          <ListItem key={interest.id} secondaryAction={
            <IconButton edge="end" onClick={() => handleDeleteInterest(interest.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            {interest.description}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default InterestManager;
