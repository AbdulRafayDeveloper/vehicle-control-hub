import React from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { height } from "@mui/system";

const PersonalInformation = () => (
  <div className="px-4">
    {/* Form Title */}
    <Typography
      variant="h5"
      sx={{ textAlign: "left", fontWeight: "bold", marginTop: 5 }}
    >
      Enter Details
    </Typography>
    <Typography
      variant="subtitle2"
      gutterBottom
      color={"gray"}
      sx={{ textAlign: "left" }}
    >
      Let us get started by gathering some personal information.
    </Typography>
    <Typography
      variant="body2"
      gutterBottom
      sx={{
        textAlign: "left",
        fontWeight: "bold",
        marginTop: "2rem",
      }}
    >
      Personal Details
    </Typography>
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2} textAlign={"left"} color={"gray"}>
        {/* First Name */}
        <Grid item xs={12} md={6}>
          <label className="my-1 text-xs text-black">First Name * </label>
          <TextField
            fullWidth
            required
            InputProps={{
              inputProps: {
                sx: {
                  "&::placeholder": {
                    fontSize: "0.8rem",
                  },
                },
              },
            }}
            placeholder="Enter first name"
            size="small"
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <label className="mb-1 text-xs text-black">Last Name * </label>
          <TextField
            fullWidth
            required
            InputProps={{
              inputProps: {
                sx: {
                  "&::placeholder": {
                    fontSize: "0.8rem",
                  },
                },
              },
            }}
            placeholder="Enter last name"
            size="small"
          />
        </Grid>

        {/* Mobile Number */}
        <Grid item xs={12} md={6} sx={{ marginTop: "-15px" }}>
          <label className="text-xs text-black">Mobile Number *</label>
          <TextField
            fullWidth
            required
            InputProps={{
              inputProps: {
                sx: {
                  "&::placeholder": {
                    fontSize: "0.7rem",
                  },
                },
              },
            }}
            placeholder="XXX-XXX XXXX"
            size="small"
          />
        </Grid>

        {/* ID Number */}
        <Grid item xs={12} md={6} sx={{ marginTop: "-15px" }}>
          <label className="text-xs text-black">ID Number *</label>
          <TextField
            fullWidth
            required
            InputProps={{
              inputProps: {
                sx: {
                  "&::placeholder": {
                    fontSize: "0.7rem",
                  },
                },
              },
            }}
            placeholder="XXXXX-XXXXXXXX-X"
            size="small"
            sx={{ padding: 0 }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={6} md={6} sx={{ marginTop: "-15px" }}>
          <label className="text-xs text-black">Email *</label>
          <TextField
            fullWidth
            required
            InputProps={{
              inputProps: {
                sx: {
                  "&::placeholder": {
                    fontSize: "0.8rem",
                  },
                },
              },
            }}
            placeholder="someone@email.com"
            size="small"
          />
        </Grid>
        {/* Continue */}
        <Grid item xs={12} md={7} marginTop={"15px"}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ marginTop: 3, textTransform: "capitalize" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  </div>
);

export default PersonalInformation;
