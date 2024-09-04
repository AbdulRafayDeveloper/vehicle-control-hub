import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TestimonialCard from './TestimonialCard'; // Adjust path as necessary
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSection = () => {
  const testimonials = [
    {
      title: "Great Work",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      reviewer: "Leslie Alexander",
      role: "Facebook",
      image: "path_to_image_1.jpg",
      rating: 4.7
    },
    {
      title: "Awesome",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      reviewer: "Floyd Miles",
      role: "Designer",
      image: "path_to_image_2.jpg",
      rating: 4.8
    },
    {
      title: "Good Job",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      reviewer: "Dianne Russell",
      role: "Marketing",
      image: "path_to_image_3.jpg",
      rating: 4.6
    },
    // Add more testimonials if needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIosIcon />,
    prevArrow: <ArrowBackIosIcon />,
    responsive: [
      {
        breakpoint: 768, // Adjust for mobile view
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container sx={{ my: 6, backgroundColor: '#8a9df7', p: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around' }}>
        <Typography variant="h4" align="center" gutterBottom>
          What our customers say
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews
        </Typography>
      </Box>
      <Box sx={{ mt: 4 , overflow:'hidden'}}>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default TestimonialSection;
