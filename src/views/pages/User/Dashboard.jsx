import React, { useState } from "react";
import UserProfileCard from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import {
  useTheme,
  useMediaQuery,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

const Cards = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ boxShadow: 3, padding: 2, paddingLeft: 3, borderRadius: 2 }}>
      <Typography variant="body1" textAlign={"left"} gutterBottom>
        My Activity
      </Typography>
      <hr className="bg-blue-400 mb-4 " />
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        {/* Active Bids Card */}
        <Card
          sx={{
            borderRadius: 2,
            width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "33%",
          }}
        >
          <CardActionArea>
            <CardMedia
              sx={{
                paddingTop: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="/src/assets/bids.png" className="w-16 h-16"></img>
            </CardMedia>
            <CardContent className="-mt-2">
              <Typography
                gutterBottom
                variant="h4"
                color={"#404040"}
                component="div"
              >
                80
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: -3 }}
              >
                Active
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: -1 }}
              >
                Bids
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Items Won Card */}
        <Card
          sx={{
            borderRadius: 2,
            width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "33%",
          }}
        >
          <CardActionArea>
            <CardMedia
              sx={{
                paddingTop: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="/src/assets/win.png" className="w-16 h-16"></img>
            </CardMedia>
            <CardContent className="-mt-2">
              <Typography
                gutterBottom
                variant="h4"
                color={"#404040"}
                component="div"
              >
                15
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: -3 }}
              >
                Items
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: -1 }}
              >
                Won
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Favourites Card */}
        <Card
          sx={{
            borderRadius: 2,
            width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "33%",
          }}
        >
          <CardActionArea>
            <CardMedia
              sx={{
                paddingTop: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="/src/assets/favorites.png" className="w-16 h-16"></img>
            </CardMedia>
            <CardContent className="-mt-2">
              <Typography
                gutterBottom
                variant="h4"
                color={"#404040"}
                component="div"
              >
                115
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: -3 }}
              >
                Favorites
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: -1 }}
              >
                &nbsp;
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};
function PurchasingTable() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const data = [
    {
      item: "2018 Hyundai Sonata",
      bidPrice: "$1,775.00",
      highestBid: "$1,775.00",
      lowestBid: "$1,400.00",
      expires: "7/2/2024",
    },
    {
      item: "2018 Hyundai Sonata",
      bidPrice: "$1,775.00",
      highestBid: "$1,775.00",
      lowestBid: "$1,400.00",
      expires: "7/2/2024",
    },
    {
      item: "2018 Hyundai Sonata",
      bidPrice: "$1,775.00",
      highestBid: "$1,775.00",
      lowestBid: "$1,400.00",
      expires: "7/2/2024",
    },
    {
      item: "2018 Hyundai Sonata",
      bidPrice: "$1,775.00",
      highestBid: "$1,775.00",
      lowestBid: "$1,400.00",
      expires: "7/2/2024",
    },
    {
      item: "2018 Hyundai Sonata",
      bidPrice: "$1,775.00",
      highestBid: "$1,775.00",
      lowestBid: "$1,400.00",
      expires: "7/2/2024",
    },
  ];

  return (
    <Box
      sx={{
        boxShadow: 3,
        padding: 2,
        paddingLeft: 3,
        borderRadius: 2,
        marginTop: "1rem",
        textAlign: "left",
        backgroundColor: "white",
      }}
    >
      <Typography variant="body1" fontWeight={"bold"}>
        Purchasing
      </Typography>
      <Tabs
        className="-ml-4"
        sx={{ borderBottom: 1, borderColor: "divider" }}
        value={tabIndex}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: { backgroundColor: "blue" },
        }}
      >
        <Tab
          label="Current"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "0.9rem",
            outline: "none",
            border: "none",
            "&.Mui-selected": {
              border: "none",
            },
            "&:focus": {
              outline: "none",
            },
          }}
        />
        <Tab
          label="Pending"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "0.9rem",
            border: "none",
            "&:focus": {
              outline: "none",
            },
          }}
        />
        <Tab
          label="History"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "0.9rem",
            border: "none",
            "&:focus": {
              outline: "none",
            },
          }}
        />
      </Tabs>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.8rem" }}>Item</TableCell>
              <TableCell sx={{ fontSize: "0.8rem" }}>Bid Price</TableCell>
              <TableCell sx={{ fontSize: "0.8rem" }}>Highest Bid</TableCell>
              <TableCell sx={{ fontSize: "0.8rem" }}>Lowest Bid</TableCell>
              <TableCell sx={{ fontSize: "0.8rem" }}>Expires</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "0.8rem" }}>{row.item}</TableCell>
                <TableCell sx={{ fontSize: "0.8rem" }}>
                  {row.bidPrice}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem" }}>
                  {row.highestBid}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem" }}>
                  {row.lowestBid}
                </TableCell>
                <TableCell sx={{ fontSize: "0.8rem" }}>{row.expires}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const Dashboard = () => {
  return (
    <div>
      <Header title={"Dashboard"} navText={"User / Dashboard"} />
      <UserProfileCard>
        <Cards />
        <PurchasingTable />
      </UserProfileCard>
    </div>
  );
};

export default Dashboard;
