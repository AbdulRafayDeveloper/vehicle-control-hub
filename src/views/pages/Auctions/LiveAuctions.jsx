import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CardMedia, Box } from '@mui/material';
import { verifyAgreement } from '../../../core/api/agreement';
import { useNavigate } from 'react-router-dom';

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      // Dummy data for testing
      const dummyData = [
        { id: 1, title: 'Vehicle Auctions', category: 'vehicles', image: '/src/assets/vehicle1.png' },
        { id: 2, title: 'Spare Parts Auctions', category: 'spare-parts', image: '/src/assets/Parts1.png' },
      ];
      setAuctions(dummyData);
    };

    fetchAuctions();
  }, []);

  const handleJoinAuction = async () => {
    try {
      const agreementResponse = await verifyAgreement();
      console.log('Agreement verified:', agreementResponse);
    } catch (error) {
      console.error('Error joining auction:', error);
    }
  };

  const handleCardClick = (auction) => {
    navigate(`/auctions/${auction.category}/${auction.id}`);
  };

  useEffect(() => {
    const socket = new WebSocket('wss://api.example.com/live-auctions');
  
    socket.onmessage = (event) => {
      const liveData = JSON.parse(event.data);
      console.log('Live auction data:', liveData);
      // Update state with live data
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    return () => {
      socket.close();
    };
  }, []);
  
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Live Auctions</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleJoinAuction()}>
            Join Auction
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {auctions.map((auction) => (
          <Grid item xs={12} sm={6} md={4} key={auction.id}>
            <Card onClick={() => handleCardClick(auction)}>
              <CardMedia
                component="img"
                height="140"
                image={auction.image}
                alt={auction.title}
              />
              <CardContent>
                <Typography variant="h6">{auction.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LiveAuctions;
