import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AddItemModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    auction_type: '',
    start_time: '',
    end_time: '',
    starting_bid: '',
    initial_bid_amount: '',
    winning_bid: '',
    auction_house_name: '',
    auction_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{ 
          position: 'absolute', top: '51%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, bgcolor: 'background.paper', borderRadius: 1, pt:2, pb:2, pl:4, pr:4,
        }}
      >
        <Typography variant="h6" mb={1}>Add Item</Typography>
        {Object.keys(formData).map((key) => {
          if (key === 'auction_type') {
            return (
              <FormControl fullWidth margin="normal" key={key}>
                <InputLabel id="auction_type-label">Auction Type</InputLabel>
                <Select
                  labelId="auction_type-label"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="live">Live</MenuItem>
                  <MenuItem value="negotiation">Negotiation</MenuItem>
                  <MenuItem value="spare_part">Spare Part</MenuItem>
                </Select>
              </FormControl>
            );
          } else if (key === 'starting_bid' || key === 'initial_bid_amount' || key === 'winning_bid') {
            return (
              <TextField
                sx={{ mb: 0 }}
                key={key}
                label={key.replace('_', ' ')}
                name={key}
                value={formData[key]}
                onChange={(e) => {
                  // Ensure the value is numeric
                  if (/^\d*\.?\d*$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                fullWidth
                margin="normal"
                type="number" // Use number type for numeric input
              />
            );
          } else {
            return (
              <TextField
                sx={{ mb: 0 }}
                key={key}
                label={key.replace('_', ' ')}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            );
          }
        })}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
