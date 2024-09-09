import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const PaymentForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Box sx={{ padding: 3, textAlign: "left", paddingTop: 0 }}>
      {/* Linked Cards */}
      <Typography gutterBottom sx={{ fontSize: "0.8rem" }}>
        Linked Cards
      </Typography>
      <Box
        display="flex"
        mb={3}
        gap={2}
        width={"100%"}
        sx={{
          flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
          width: { xs: "100%", sm: "70%" }, // Full width on mobile, 70% on larger screens
        }}
      >
        {/* First Card */}
        <Card
          sx={{
            backgroundColor: "#023B8D",
            color: "#fff",
            flex: 1,
            height: "80px",
            borderRadius: 2,
            width: { xs: "100%", sm: "40%" }, // Full width on mobile, 40% on larger screens
          }}
        >
          <CardContent>
            <img src="/src/assets/visa.png" alt="Visa" width={40} height={40} />
            <div className="flex justify-between">
              <Typography marginTop={"1rem"} fontSize={"0.8rem"}>
                **** **** **** 7389
              </Typography>
              <DeleteOutlinedIcon
                className="bg-red-600 text-white rounded p-1 mt-4 justify-end cursor-pointer"
                onClick={handleClickOpen}
              />
            </div>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card
          sx={{
            backgroundColor: "#D3D3D3",
            color: "#fff",
            flex: 1,
            height: "80px",
            borderRadius: 2,
            width: { xs: "100%", sm: "40%" }, // Full width on mobile, 40% on larger screens
          }}
        >
          <CardContent>
            <img src="/src/assets/visa.png" alt="Visa" width={40} height={40} />
            <div className="flex justify-between">
              <Typography marginTop={"1rem"} fontSize={"0.8rem"}>
                **** **** **** 7389
              </Typography>
              <DeleteOutlinedIcon className="bg-red-600 text-white rounded p-1 mt-4 justify-end" />
            </div>
          </CardContent>
        </Card>
      </Box>

      {/* Add New Payment Method */}
      <Typography variant="body1" gutterBottom fontWeight={"600"} marginTop={4}>
        Add New Payment Method
      </Typography>
      <Typography
        color="textSecondary"
        gutterBottom
        fontSize={"0.8rem"}
        marginTop={1}
      >
        Please select Payment Method
      </Typography>

      {/* Payment Method Selection */}
      <Box mb={3} width="100%">
        <Grid container spacing={2}>
          {/* Credit / Debit Card */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                backgroundColor: "#2767f4",
                color: "#fff",
                height: "60px",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <div className="flex justify-center items-center">
                  <img
                    src="/src/assets/credit.png"
                    alt="Credit Card"
                    width={20}
                    height={20}
                    className="-mt-2"
                  />
                </div>
                <Typography fontSize={"0.8rem"} textAlign={"center"}>
                  Credit / Debit Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* PayPal */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                backgroundColor: "#F2f2f2",
                color: "#fff",
                height: "60px",
                borderRadius: 2,
                boxShadow: 0,
              }}
            >
              <CardContent>
                <div className="flex justify-center items-center">
                  <img
                    src="/src/assets/paypal.png"
                    alt="Credit Card"
                    width={20}
                    height={20}
                    className="-mt-2"
                  />
                </div>
                <Typography
                  fontSize={"0.8rem"}
                  textAlign={"center"}
                  color={"black"}
                >
                  Pay Pal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Card Information Form */}
      <Grid container spacing={2} textAlign={"left"} color={"gray"}>
        <Grid item xs={12} md={5}>
          <label className="my-1 text-xs text-gray-500">Card Number</label>
          <br />
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
          />
        </Grid>

        {/* Full Name */}
        <Grid item xs={12} md={5}>
          <label className="my-1 text-xs text-gray-500">Name on Card</label>
          <br />
          <input
            type="text"
            placeholder="Full Name"
            className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
          />
        </Grid>

        {/* Expiry */}
        <Grid item xs={12} md={5}>
          <label className="my-1 text-xs text-gray-500">Expiry</label>
          <br />
          <div className="flex">
            <input
              type="text"
              placeholder="Select Date"
              className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
            />
            <CalendarToday fontSize="small" className="-ml-7 mt-1" />
          </div>
        </Grid>

        {/* CVV */}
        <Grid item xs={12} md={5}>
          <label className="my-1 text-xs text-gray-500">CVV</label>
          <br />
          <div className="flex">
            <input
              type="text"
              placeholder="Select Date"
              className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
            />
            <CalendarToday fontSize="small" className="-ml-7 mt-1" />
          </div>
        </Grid>
      </Grid>

      {/* Terms & Conditions */}
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
            size="small"
            sx={{ marginTop: 2 }}
          />
        }
        label={
          <Typography sx={{ fontSize: "0.8rem", marginTop: 2 }}>
            I Agree to all{" "}
            <Typography
              color="primary"
              component="span"
              sx={{ fontSize: "0.8rem" }}
            >
              Terms & Conditions
            </Typography>
          </Typography>
        }
      />

      {/* Add Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 3, backgroundColor: "#2767F4" }}
        disabled={!isChecked}
      >
        Add
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: "20px",
            width: "450px",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" color="error" fontWeight={"bold"}>
            Delete VISA Card
          </Typography>
          <DialogContentText sx={{ fontSize: "0.8rem" }}>
            Are you sure you want to delete your VISA card?
          </DialogContentText>
        </DialogTitle>
        <hr className="mt-5 mx-4" />
        <DialogContent>
          <Table
            sx={{
              border: "none",
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography
                    fontSize={"0.8rem"}
                    component="span"
                    color={"gray"}
                  >
                    Card Holder Name:
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography fontSize={"0.8rem"} component="span">
                    Syed Majeed
                  </Typography>
                </TableCell>
              </TableRow>

              {/* Repeat for other rows */}
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography
                    fontSize={"0.8rem"}
                    component="span"
                    color={"gray"}
                  >
                    Card Number:
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography fontSize={"0.8rem"} component="span">
                    **** **** **** 7389
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography
                    fontSize={"0.8rem"}
                    component="span"
                    color={"gray"}
                  >
                    CVV:
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography fontSize={"0.8rem"} component="span">
                    334
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography
                    fontSize={"0.8rem"}
                    component="span"
                    color={"gray"}
                  >
                    Expiry Date:
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    padding: "4px 16px",
                  }}
                >
                  <Typography fontSize={"0.8rem"} component="span">
                    25/08/2028
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <hr className="mx-4" />

        <DialogActions className="mt-2">
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "gray",
              color: "white",
              textTransform: "capitalize",
              width: "120px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="error"
            variant="contained"
            sx={{ textTransform: "capitalize", width: "120px" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentForm;
