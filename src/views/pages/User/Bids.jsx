import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Box,
  Stack,
  useMediaQuery,
  Typography,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Header from "../../components/Header/Header";
import UserProfileCard from "../../components/SideBar/SideBar";
import { List, ListItem, ListItemIcon, Link } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const SafetyTips = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: 4,
        width: "300px",
        backgroundColor: "#fff",
        marginLeft: "120px",
      }}
    >
      <Typography variant="body1" fontWeight={"bold"}>
        Safety Tips For Buyers
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <DoneOutlinedIcon sx={{ color: "green" }} fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: "0.7rem", marginLeft: "-25px" }}>
            Meet Seller at public Place
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DoneOutlinedIcon sx={{ color: "green" }} fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: "0.7rem", marginLeft: "-25px" }}>
            Check item before you buy
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DoneOutlinedIcon sx={{ color: "green" }} fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize: "0.7rem", marginLeft: "-25px" }}>
            Pay only after collecting item
          </Typography>
        </ListItem>
      </List>
      <Link
        href="#"
        sx={{
          display: "block",
          fontSize: "0.7rem",
          textAlign: "left",
          marginLeft: "45px",
        }}
      >
        View more...
      </Link>
    </Box>
  );
};

const adsData = [
  {
    id: 1,
    item: "Hondai",
    date: "Feb-21-2019, 16:54",
    category: "Vehicles",
    price: 54,
    status: "Published",
  },
  {
    id: 2,
    item: "Hondai",
    date: "Feb-21-2019, 16:54",
    category: "Vehicles",
    price: 54,
    status: "Published",
  },
  {
    id: 3,
    item: "Hondai",
    date: "Feb-21-2019, 16:54",
    category: "Vehicles",
    price: 54,
    status: "Sold",
  },
];

const filters = [
  "All Ads (20)",
  "Published (08)",
  "Featured (05)",
  "Sold (03)",
  "Active (03)",
  "Expired (01)",
];

export default function Bids() {
  const [activeFilter, setActiveFilter] = React.useState(0);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleFilterClick = (index) => {
    setActiveFilter(index);
  };

  return (
    <div>
      <Header title={"My Bids"} navText={"User / My Bids"} />
      <UserProfileCard tips={<SafetyTips />}>
        <Box textAlign={"left"} sx={{ backgroundColor: "white" }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            sx={{ mb: 2 }}
          >
            {filters.map((filter, index) => (
              <Button
                key={index}
                onClick={() => handleFilterClick(index)}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor:
                    index === activeFilter ? "primary.main" : "white",
                  color: index === activeFilter ? "white" : "black",
                  border: "1px solid #ccc",
                  borderRadius: 0,
                  boxShadow: 0,
                  "&:hover": {
                    backgroundColor:
                      index === activeFilter ? "primary.dark" : "#f0f0f0",
                  },
                  fontSize: isMobile ? "12px" : "12px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                {filter}
              </Button>
            ))}
          </Stack>

          {/* Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table aria-label="ads table">
              <TableHead>
                <TableRow sx={{ padding: 0 }}>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      paddingY: 0,
                    }}
                  >
                    Default
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    Item
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adsData.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img
                          src="/src/assets/bids-img.png"
                          alt="ad-img"
                          style={{ marginRight: 10 }}
                        />
                        <div className="text-[0.7rem]">
                          {ad.item} <br />
                          <small>{ad.date}</small> <br />
                          <small>sale</small>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.7rem" }}>
                      {ad.category}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.7rem" }}>
                      ${ad.price}
                    </TableCell>
                    <TableCell>
                      {ad.status === "Published" ? (
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          sx={{ textTransform: "capitalize", paddingY: 0 }}
                        >
                          Published
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ textTransform: "capitalize", paddingY: 0 }}
                        >
                          Sold
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <CreateOutlinedIcon className="bg-green-600 text-white rounded p-1" />
                        <DeleteOutlinedIcon className="bg-red-600 text-white rounded p-1" />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </UserProfileCard>
    </div>
  );
}
