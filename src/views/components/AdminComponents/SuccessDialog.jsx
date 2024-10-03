import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import Lottie from "react-lottie";
import doneAnimation from "/src/assets/done.json";

const SuccessDialog = ({ open, onClose, title, message }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: doneAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent className="flex flex-col items-center">
        <Lottie options={defaultOptions} height={150} width={150} />
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography
          sx={{
            marginTop: "10px",
            fontSize: "14px",
            width: "50%",
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            width: 100,
            height: 30,
            marginTop: "-10px",
            marginBottom: "20px",
            backgroundColor: "#08AD36",
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "#08AD36" },
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
