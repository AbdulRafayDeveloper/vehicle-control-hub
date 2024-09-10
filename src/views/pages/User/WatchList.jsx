import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
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
        maxWidth: 260,
        borderRadius: 2,
        padding: 1,
        boxShadow: 2,
        marginX: 1,
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image="/src/assets/car.png"
        alt={carData.title}
        sx={{ borderRadius: 2 }}
      />
      <CardMedia
        component="img"
        image="/src/assets/favourite.png"
        alt={carData.title}
        sx={{
          position: "absolute",
          top: "15px",
          right: "10px",
          width: 35,
          height: 35,
        }}
      />

      {/* <IconButton
        sx={{
          position: "absolute",
          top: "15px",
          right: "10px",
          backgroundColor: "white",
          boxShadow: 2,
          color: "orange",
          width: 0,
          height: 30,
        }}
      >
        <StarBorderOutlinedIcon fontSize="small" />
      </IconButton> */}

      <CardContent>
        <Grid container justifyContent={"space-between"}>
          <Typography variant="body2" component="div">
            {carData.title}
          </Typography>
          <Typography color="primary" fontSize={"0.7rem"}>
            {carData.year}
          </Typography>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Typography variant="body2" component="div">
            {carData.engine}
          </Typography>
          <Typography color="primary" fontSize={"0.7rem"}>
            {carData.mileage}
          </Typography>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Typography variant="body2" component="div" display={"flex"}>
            {carData.grade}
            <Typography color={"primary"} fontSize={"0.7rem"}>
              (4)
            </Typography>
          </Typography>
          <Typography
            fontSize={"0.7rem"}
            display={"flex"}
            gap={1}
            fontWeight={"bold"}
          >
            Lot #
            <Typography color={"primary"} fontSize={"0.7rem"}>
              {carData.lotNumber}
            </Typography>
          </Typography>
        </Grid>
        <hr />
        <Grid container alignItems="center" padding={0.3}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item>
                <img src="/src/assets/bid.png" alt="" width={25} height={25} />
              </Grid>
              <Grid item>
                <Typography color={"green"} fontSize={"0.7rem"} marginLeft={1}>
                  Current Bid
                </Typography>
                <Typography fontSize={"0.7rem"} marginTop={-1}>
                  $ {carData.currentBid}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item>
                <img src="/src/assets/buy.png" alt="" width={25} height={25} />
              </Grid>
              <Grid item>
                <Typography color={"error"} fontSize={"0.7rem"}>
                  Buy Now
                </Typography>
                <Typography fontSize={"0.7rem"} marginTop={-1} marginLeft={1}>
                  $ {carData.buyNow}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Grid container alignItems="center" gap={0.4}>
              <Grid item>
                <AccessTimeIcon color="primary" fontSize="small" />
              </Grid>
              <Grid item>
                <Typography fontSize={"0.7rem"} marginTop={1}>
                  0d: 3h: 8m: 8s
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" gap={0.4}>
              <Grid item>
                <LocalOfferIcon color="secondary" fontSize="small" />
              </Grid>
              <Grid item>
                <Typography fontSize={"0.7rem"} marginTop={1}>
                  {carData.bids} Bids
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SubmitBidButton
          variant="contained"
          sx={{
            marginTop: "1rem",
            marginBottom: "-1rem",
            borderRadius: 6,
            textTransform: "capitalize",
            fontSize: "0.8rem",
          }}
        >
          Submit A Bid
        </SubmitBidButton>
      </CardContent>
    </Card>
  );
};

const WatchList = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Header title={"My Watchlist"} navText={"User / My Watchlist"} />
      <UserProfileCard>
        <Grid
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: isSmallScreen ? "18px" : 0,
          }}
        >
          <CarCard />
          <CarCard />
        </Grid>
      </UserProfileCard>
    </div>
  );
};

export default WatchList;
