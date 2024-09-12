import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableRow,
  TableBody,
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
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const PaymentForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cards, setCards] = useState([
    {
      type: "card",
      logo: "/src/assets/visa.png",
      number: "**** **** **** 7389",
    },
    {
      type: "card",
      logo: "/src/assets/visa.png",
      number: "**** **** **** 7389",
    },
  ]);
  const [newCard, setNewCard] = useState({
    type: "",
    logo: "",
    number: "",
  });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAddCard = () => {
    if (paymentMethod === "card") {
      setCards([
        ...cards,
        {
          type: "card",
          logo: "/src/assets/visa.png",
          number: newCard.number,
        },
      ]);
    } else if (paymentMethod === "paypal") {
      setCards([
        ...cards,
        {
          type: "paypal",
          logo: "/src/assets/paypal-logo.png",
          number: newCard.number,
        },
      ]);
    }
    setNewCard({ type: "", logo: "", number: "" });
    setPaypalEmail("");
    setBillingAddress("");
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
        flexWrap="wrap"
        sx={{
          width: "100%",
          "& > *": {
            flex: "1 1 calc(50% - 16px)", // Adjust width to be responsive
            maxWidth: "calc(50% - 16px)", // Adjust width to be responsive
            marginBottom: "16px",
          },
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: card.type === "paypal" ? "grey" : "#023B8D",
              color: "#fff",
              borderRadius: 2,
              height: "80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 1,
            }}
          >
            <CardContent>
              <img src={card.logo} alt={card.type} width={40} height={40} />
              <div className="flex justify-between">
                <Typography marginTop={"1rem"} fontSize={"0.8rem"}>
                  {card.number}
                </Typography>
                <IconButton
                  className="bg-red-600 text-white rounded p-1 mt-4 justify-end focus:outline-none"
                  onClick={handleClickOpen}
                >
                  <DeleteOutlinedIcon
                    sx={{
                      color: "white",
                      backgroundColor: "red",
                      borderRadius: 1,
                    }}
                    fontSize="small"
                  />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
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

      <div>
        {/* Payment Method Selection */}
        <Box mb={3} width="100%">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                onClick={() => setPaymentMethod("card")}
                sx={{
                  backgroundColor:
                    paymentMethod === "card" ? "#2767f4" : "#f2f2f2",
                  color: paymentMethod === "card" ? "#fff" : "#000",
                  height: "60px",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <div className="flex justify-center items-center">
                    {/* <img
                      src="/src/assets/credit.png"
                      alt="Credit Card"
                      width={20}
                      height={20}
                      className="-mt-2"
                    /> */}
                    <CreditCardOutlinedIcon className="-mt-2" />
                  </div>
                  <Typography fontSize={"0.8rem"} textAlign={"center"}>
                    Credit / Debit Card
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                onClick={() => setPaymentMethod("paypal")}
                sx={{
                  backgroundColor:
                    paymentMethod === "paypal" ? "#2767f4" : "#f2f2f2",
                  color: paymentMethod === "paypal" ? "#fff" : "#000",
                  height: "60px",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <div className="flex justify-center items-center">
                    <img
                      src="/src/assets/paypal.png"
                      alt="PayPal"
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
                    PayPal
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Conditionally Render Input Fields Based on Selected Payment Method */}
        {paymentMethod === "card" && (
          <Grid container spacing={2} textAlign={"left"} color={"gray"}>
            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">Card Number</label>
              <br />
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
                className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">Name on Card</label>
              <br />
              <input
                type="text"
                placeholder="Full Name"
                className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
              />
            </Grid>

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

            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">CVV</label>
              <br />
              <div className="flex">
                <input
                  type="text"
                  placeholder="XXX"
                  className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
                />
                <CalendarToday fontSize="small" className="-ml-7 mt-1" />
              </div>
            </Grid>
          </Grid>
        )}

        {paymentMethod === "paypal" && (
          <Grid container spacing={2} textAlign={"left"} color={"gray"}>
            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">PayPal Email</label>
              <br />
              <input
                type="email"
                placeholder="Enter PayPal email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">Card Number</label>
              <br />
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
                className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">Name on Card</label>
              <br />
              <input
                type="text"
                placeholder="Full Name"
                className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <label className="my-1 text-xs text-gray-500">CVV</label>
              <br />
              <div className="flex">
                <input
                  type="text"
                  placeholder="XXX"
                  className="text-xs border border-black px-3 py-1.5 w-full rounded-lg"
                />
                <CalendarToday fontSize="small" className="-ml-7 mt-1" />
              </div>
            </Grid>
          </Grid>
        )}

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCard}
            sx={{ width: "100%" }}
          >
            Add Card
          </Button>
        </Box>
      </div>

      {/* Dialog for Confirmation */}
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
