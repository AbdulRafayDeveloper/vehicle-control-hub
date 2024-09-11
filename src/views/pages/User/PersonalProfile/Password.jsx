import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Grid,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{ padding: 3, textAlign: "left" }}>
      <Typography sx={{ fontSize: "0.8rem" }}>Forgot Password</Typography>
      <Typography variant="h5" fontWeight="bold" marginTop="-7px">
        Create Password
      </Typography>
      <Typography
        sx={{ fontSize: "0.8rem", marginTop: "-7px" }}
        color={"gray"}
        gutterBottom
      >
        Please enter the new password.
      </Typography>
      <div className="w-12 bg-slate-200 h-1 rounded"></div>

      {/* Password Field */}
      <Grid item xs={12} md={7} marginTop={"15px"}>
        <label className="text-xs text-black">Password </label>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              sx: {
                "&::placeholder": {
                  fontSize: "0.8rem",
                },
              },
            },
          }}
          size="small"
        />
      </Grid>

      {/* Confirm Password Field */}
      <Grid item xs={12} md={7} marginTop={"15px"}>
        <label className="text-xs text-black">Confirm Password </label>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            inputProps: {
              sx: {
                "&::placeholder": {
                  fontSize: "0.8rem",
                },
              },
            },
          }}
          size="small"
        />
      </Grid>

      {/* Continue Button */}
      <Grid item xs={12} md={7} marginTop={"15px"}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ marginTop: 3, textTransform: "capitalize" }}
        >
          Continue
        </Button>
      </Grid>
    </Box>
  );
};

export default Password;
