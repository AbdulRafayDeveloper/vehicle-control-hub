import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialCard = ({ title, content, reviewer, role, image, rating }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, m: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{title}</Typography>
          <FormatQuoteIcon fontSize="large" color="disabled" />
        </Box>
        <Typography variant="body2" color="textSecondary" my={2}>
          {content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar src={image} alt={reviewer} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1">{reviewer}</Typography>
            <Typography variant="body2" color="textSecondary">{role}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              {Array.from({ length: Math.round(rating) }).map((_, index) => (
                <StarIcon key={index} color="primary" />
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
