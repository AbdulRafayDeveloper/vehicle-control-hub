import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const currentYear = new Date().getFullYear();


export default function MainFooter() {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: "#0c0e24", // Dark background color
        color: "#ffffff",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}  textAlign={'left'}  >
          {/* Left Section: Logo and Subscription */}
          <Grid
            item
            xs={12}
            md={12}
            display={isMobile ? 'block' : 'flex'}
            justifyContent={"space-around"}
            textAlign={"left"}
            paddingBottom={isMobile ? 0 : 5}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Big Star
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Receive pricing updates, shopping tips & more!
              </Typography>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#2a2d45",
                borderRadius: "50px",
                overflow: "hidden",
                mt: 2,
              }}
            >
              <TextField
                placeholder="Your email address"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: "#2a2d45",
                  input: { color: "#ffffff" },
                  fieldset: { border: "none" },
                  mr: 1,
                  px: 2,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#405ff2",
                  textTransform: "none",
                  borderRadius: "30px",
                  px: 6,
                  height: "100%",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>

          {/* Middle Section: Links */}

          <Grid
            container
            spacing={6}
            marginLeft={isMobile ? 0 : 18}
            item
            xs={12}
            md={12}
            display={"flex"}
            justifyContent={"space-around"}
            textAlign={'left'}
            columns={15}
          >
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              {[
                "About Us",
                "Blog",
                "Services",
                "FAQs",
                "Terms",
                "Contact Us",
              ].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="inherit"
                  underline="none"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {text}
                </Link>
              ))}
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              {["Get in Touch", "Help Center", "Live Chat", "How it Works"].map(
                (text) => (
                  <Link
                    key={text}
                    href="#"
                    color="inherit"
                    underline="none"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    {text}
                  </Link>
                )
              )}
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Our Brands
              </Typography>
              {[
                "Toyota",
                "Porsche",
                "Audi",
                "BMW",
                "Ford",
                "Nissan",
                "Peugeot",
                "Volkswagen",
              ].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="inherit"
                  underline="none"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {text}
                </Link>
              ))}
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Vehicles Type
              </Typography>
              {[
                "Sedan",
                "Hatchback",
                "SUV",
                "Hybrid",
                "Electric",
                "Coupe",
                "Truck",
                "Convertible",
              ].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="inherit"
                  underline="none"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {text}
                </Link>
              ))}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Link href="https://facebook.com" target="_blank" rel="noopener">
                <IconButton sx={{ color: "#ffffff" }}>
                  <Facebook />
                </IconButton>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener">
                <IconButton sx={{ color: "#ffffff" }}>
                  <Twitter />
                </IconButton>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener">
                <IconButton sx={{ color: "#ffffff" }}>
                  <LinkedIn />
                </IconButton>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener">
                <IconButton sx={{ color: "#ffffff" }}>
                  <Instagram />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Section: Social Media Links and Legal Text */}
        <Grid
          item
          xs={12}
          md={12}
          mt={4}
          display="flex"
          justifyContent="space-around"
          alignItems="left"
          borderTop={1}
          paddingTop={5}
        >
          <Box>
            <Typography variant="body2">
              © {currentYear} example.com. All rights reserved.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="none">
                Terms & Conditions
              </Link>{" "}
              •{" "}
              <Link href="#" color="inherit" underline="none">
                Privacy Notice
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
