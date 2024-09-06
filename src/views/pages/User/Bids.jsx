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
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Header from "../../components/Header/Header";
import UserProfileCard from "../../components/SideBar/SideBar";

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
      <UserProfileCard>
        <Box textAlign={"left"}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 1 : 2}
            sx={{ mb: 2 }}
          >
            {filters.map((filter, index) => (
              <Button
                key={index}
                onClick={() => handleFilterClick(index)}
                variant="contained"
                sx={{
                  backgroundColor:
                    index === activeFilter ? "primary.main" : "white",
                  color: index === activeFilter ? "white" : "black",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor:
                      index === activeFilter ? "primary.dark" : "#f0f0f0",
                  },
                  fontSize: isMobile ? "12px" : "14px",
                  padding: isMobile ? "5px 10px" : "8px 16px",
                  textTransform: "capitalize",
                }}
              >
                {filter}
              </Button>
            ))}
          </Stack>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table aria-label="ads table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Default</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adsData.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="ad-img"
                          style={{ marginRight: 10 }}
                        />
                        <div>
                          {ad.item} <br />
                          <small>{ad.date}</small>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>{ad.category}</TableCell>
                    <TableCell>${ad.price}</TableCell>
                    <TableCell>
                      {ad.status === "Published" ? (
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                        >
                          Published
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Sold
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1, marginBottom: isMobile ? 2 : 0 }}
                      >
                        <CreateOutlinedIcon />
                      </Button>
                      <Button variant="contained" color="error" size="small">
                        <DeleteOutlinedIcon />
                      </Button>
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
