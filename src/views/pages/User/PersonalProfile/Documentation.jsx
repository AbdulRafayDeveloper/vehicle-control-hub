import React, { useState } from "react";
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Documentation = () => {
  const [fileNames, setFileNames] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileNamesArray = files.map((file) => file.name);
      setFileNames(fileNamesArray);
      setIsUploaded(true);
    }
  };

  return (
    <Box sx={{ padding: 3, paddingBottom: 0, textAlign: "left" }}>
      {/* Form Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Documentation
      </Typography>
      <Typography variant="subtitle2" gutterBottom color={"gray"} sx={{}}>
        Please attach the business documents.
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginTop: "2rem",
        }}
      >
        Attach Documents
      </Typography>

      <Box component="form" noValidate autoComplete="off" textAlign={"left"}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: "0.5rem", fontSize: "0.7rem" }}>
              ID Card Front Back Side
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                gap: 1,
              }}
            >
              <AttachFileIcon />
              <Typography
                variant="body2"
                sx={{ marginLeft: "10px", fontSize: "0.8rem" }}
              >
                {fileNames.length > 0 ? fileNames.join(", ") : "No file chosen"}
              </Typography>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{
                  opacity: 0,
                  position: "absolute",
                  zIndex: -1,
                }}
                id="upload-button"
              />
              <label htmlFor="upload-button">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ marginLeft: "auto", textTransform: "capitalize" }}
                  size="small"
                >
                  Browse
                </Button>
              </label>
            </Box>
          </Grid>

          {isUploaded && (
            <Grid item xs={12}>
              <Typography color="success.main" sx={{ fontSize: "0.7rem" }}>
                Successfully Uploaded
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Documentation;
