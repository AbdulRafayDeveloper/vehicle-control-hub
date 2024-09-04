import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { addItemsToAuctions } from '../../../core/api/auctions';
import AddItemModal from '../../components/Item/AddItemModal';
import notyf from '../../components/NotificationMessage/notyfInstance';

const AuctionItems = () => {
  const { category, id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState([]);

  // Dummy data for testing
  const dummyData = {
    vehicles: [
      { id: 1, title: 'Vehicle 1', startingPrice: 5000000, image: '/src/assets/vehicle1.png' },
      { id: 2, title: 'Vehicle 2', startingPrice: 15000000, image: '/src/assets/vehicle2.png' },
    ],
    'spare-parts': [
      { id: 3, title: 'Spare Part 1', startingPrice: 300000, image: '/src/assets/Parts1.png' },
      { id: 4, title: 'Spare Part 2', startingPrice: 500000, image: '/src/assets/Parts2.png' },
    ]
  };

  const existingItems = dummyData[category] || [];

  const handleAddItemToAuction = async (item) => {
    try {
        
      const response = await addItemsToAuctions( {id, ...item });
      console.log('Item added to auction:', response);
      setItems((prevItems) => [...prevItems, item]); // Add new item to dummy array
      notyf.success('Item added to auction successfully!');
      setOpenModal(false);
    } catch (error) {
      console.error('Error adding item to auction:', error);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">
          {category === 'vehicles' ? 'Vehicle Auctions' : 'Spare Parts Auctions'}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenModal(true)}
        >
          Add Item
        </Button>
      </Box>
      <Grid container spacing={2}>
        {existingItems.concat(items).map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>Starting Price: {item.startingPrice}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddItemToAuction}
      />
    </Container>
  );
};

export default AuctionItems;
