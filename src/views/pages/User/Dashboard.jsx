import React, { useState } from "react";
import UserProfileCard from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
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
    <Box sx={{ boxShadow: 3, padding: 4, borderRadius: 2 }}>
      <Typography variant="h6" textAlign={"left"} gutterBottom>
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
            width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "25%",
          }}
        >
          <CardActionArea>
            <CardMedia sx={{ padding: "10px" }}>
              <MonetizationOnOutlinedIcon color="primary" fontSize="large" />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                80
              </Typography>
              <Typography variant="h5" sx={{ color: "text.secondary" }}>
                Active Bids
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Items Won Card */}
        <Card
          sx={{
            borderRadius: 2,
            width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "25%",
          }}
        >
          <CardActionArea>
            <CardMedia sx={{ padding: "10px" }}>
              <EmojiEventsOutlinedIcon color="primary" fontSize="large" />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                15
              </Typography>
              <Typography variant="h5" sx={{ color: "text.secondary" }}>
                Items Won
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Favourites Card */}
        <Card
          sx={{
            borderRadius: 2,
            width: isSmallScreen ? "100%" : isMediumScreen ? "50%" : "25%",
          }}
        >
          <CardActionArea>
            <CardMedia sx={{ padding: "10px" }}>
              <AutoAwesomeOutlinedIcon color="primary" fontSize="large" />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                115
              </Typography>
              <Typography variant="h5" sx={{ color: "text.secondary" }}>
                Favourites
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};
function PurchasingTable() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
        padding: 4,
        borderRadius: 2,
        marginTop: "1rem",
        textAlign: "left",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Purchasing
      </Typography>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label="Current" />
        <Tab label="Pending" />
        <Tab label="History" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Bid Price</TableCell>
                <TableCell>Highest Bid</TableCell>
                <TableCell>Lowest Bid</TableCell>
                <TableCell>Expires</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.bidPrice}</TableCell>
                  <TableCell>{row.highestBid}</TableCell>
                  <TableCell>{row.lowestBid}</TableCell>
                  <TableCell>{row.expires}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography variant="body1">No pending purchases.</Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Typography variant="body1">No purchase history available.</Typography>
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = () => {
  return (
    <div>
      <Header title={"My Dashboard"} navText={"User / My Dashobard"} />
      <UserProfileCard>
        <Cards />
        <PurchasingTable />
      </UserProfileCard>
    </div>
  );
};

export default Dashboard;
