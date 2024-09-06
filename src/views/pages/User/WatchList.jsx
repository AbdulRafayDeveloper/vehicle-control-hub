import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import { styled } from "@mui/system";
import Header from "../../components/Header/Header";
import UserProfileCard from "../../components/SideBar/SideBar";

const carData = {
  title: "Audi A5",
  engine: "1.8 Litres",
  grade: "Grade",
  year: 2018,
  mileage: "147,896 Km",
  lotNumber: "58939794",
  currentBid: "876.00",
  buyNow: "5,000.00",
  bids: 30,
  imageUrl:
    "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCEtzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grT6IZW1LM5FXvttkx5OyX3LxWaWLSLgZWoC7GeUCCWQhI8KUBCU5VBjAJMm8-iLAD8ZksmRkYWCuAjEgGEODjKy3KKUgsSszVK89MKckQ1DAgEgizu7iGOHr6BAMAWEMXeOkAAAA?wid=850", // Example image, replace with actual image URL
};

const SubmitBidButton = styled(Button)({
  background: "linear-gradient(to right, #6b73ff, #000dff)",
  color: "white",
  width: "100%",
});

const CarCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        padding: 1,
        boxShadow: 2,
        marginX: 2,
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={carData.imageUrl}
        alt={carData.title}
      />
      <IconButton
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "white",
          boxShadow: 2,
          color: "skyblue",
        }}
      >
        <FavoriteBorderIcon fontSize="small" />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          boxShadow: 2,
          color: "orange",
        }}
      >
        <StarBorderOutlinedIcon fontSize="small" />
      </IconButton>

      <CardContent>
        <Grid container spacing={2} alignItems="left">
          <Grid item xs={3} textAlign={"left"} gap={2}>
            <Typography
              variant="body2"
              color="white"
              bgcolor={"green"}
              padding={"2px"}
              borderRadius={2}
              display={"flex"}
              gap={1}
            >
              <OfflineBoltOutlinedIcon fontSize="small" />
              Live
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-between"} marginY={1}>
          <Typography variant="body1" component="div" fontWeight={"bold"}>
            {carData.title}
          </Typography>
          <Typography variant="body2" color="primary">
            {carData.year}
          </Typography>
        </Grid>
        <Grid container justifyContent={"space-between"} marginY={1}>
          <Typography variant="body1" component="div" fontWeight={"bold"}>
            {carData.engine}
          </Typography>
          <Typography variant="body2" color="primary">
            {carData.mileage}
          </Typography>
        </Grid>
        <Grid container justifyContent={"space-between"} marginY={1}>
          <Typography
            variant="body1"
            component="div"
            fontWeight={"bold"}
            display={"flex"}
            gap={1}
          >
            {carData.grade}
            <Typography color={"primary"}>(4)</Typography>
          </Typography>
          <Typography
            variant="body1"
            display={"flex"}
            gap={1}
            fontWeight={"bold"}
          >
            Lot #<Typography color={"primary"}>{carData.lotNumber}</Typography>
          </Typography>
        </Grid>
        <hr className="mt-1" />
        <Grid container spacing={2} alignItems="center" padding={1}>
          <Grid item xs={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <GavelIcon color="success" fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color={"green"}>
                  Current Bid
                </Typography>
                <Typography>$ {carData.currentBid}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <LocalMallOutlinedIcon color="error" fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="body2" color={"red"}>
                  Buy Now
                </Typography>
                <Typography>$ {carData.buyNow}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className="my-2" />
        <Grid container spacing={3} alignItems="center" marginY={1}>
          <Grid item xs={6} align="right">
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <AccessTimeIcon color="primary" />
              </Grid>
              <Grid item>
                <Typography variant="body2">0d: 3h: 8m: 8s</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <LocalOfferIcon color="secondary" />
              </Grid>
              <Grid item>
                <Typography variant="body2">{carData.bids} Bids</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SubmitBidButton variant="contained">Submit A Bid</SubmitBidButton>
      </CardContent>
    </Card>
  );
};

const WatchList = () => {
  return (
    <div>
      <Header title={"My Watchlist"} navText={"User / My Watchlist"} />
      <UserProfileCard>
        <Grid container justifyContent="center">
          <CarCard />
          <CarCard />
        </Grid>
      </UserProfileCard>
    </div>
  );
};

export default WatchList;
