import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteDialog = ({ open, onClose, onDeleteConfirm, message }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent className="flex flex-col items-center">
        <img
          src="/src/assets/delete-icon.svg"
          alt=""
          className="w-[70px] h-[70px]"
        />
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px", marginTop: "25px" }}
        >
          Dear Customer
        </Typography>
        <Typography sx={{ marginTop: "10px", fontSize: "14px" }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            color: "#8BA3CB",
            width: "120px",
            height: "35px",
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onDeleteConfirm}
          color="error"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            color: "white",
            width: "120px",
            height: "35px",
            borderRadius: 2,
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
