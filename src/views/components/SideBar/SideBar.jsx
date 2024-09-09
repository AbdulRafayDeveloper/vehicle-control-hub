import React from "react";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Link,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuIcon from "@mui/icons-material/Menu";

const SideBar = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 300 },
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginY: "1rem",
      }}
    >
      <Avatar
        alt="Percy Reed"
        src="https://i.pravatar.cc/150?img=12"
        sx={{ width: 70, height: 70, mb: 1 }}
      />
      <Typography variant="body1" fontWeight={"bold"}>
        Percy Reed
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        john@gmail.com
      </Typography>

      <List sx={{ width: "90%", mt: 1 }}>
        <ListItem>
          <div className="flex gap-2">
            <DashboardOutlinedIcon
              color="primary"
              fontSize="small"
              className="mt-1"
            />
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>
        <ListItem className="-mt-3">
          <div className="flex gap-2">
            <PersonOutlinedIcon
              color="primary"
              fontSize="small"
              className="mt-1"
            />
            <ListItemText
              primary="Personal Profile"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>

        <ListItem className="-mt-3">
          <div className="flex gap-2">
            <GavelIcon color="primary" fontSize="small" className="mt-1" />
            <ListItemText
              primary="My Bids"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>

        <ListItem className="-mt-3">
          <div className="flex gap-2">
            <EmojiEventsOutlinedIcon
              color="primary"
              fontSize="small"
              className="mt-1"
            />
            <ListItemText
              primary="Winning Bids"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>

        <ListItem className="-mt-3">
          <div className="flex gap-2">
            <NotificationsNoneOutlinedIcon
              color="primary"
              fontSize="small"
              className="mt-1"
            />
            <ListItemText
              primary="My Notification"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>

        <ListItem className="-mt-3">
          <div className="flex gap-2">
            <StarBorderOutlinedIcon
              color="primary"
              fontSize="small"
              className="mt-1"
            />
            <ListItemText
              primary="My Favorite"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>

        <ListItem className="-mt-3">
          <div className="flex gap-2">
            <FavoriteBorderOutlinedIcon
              color="primary"
              fontSize="small"
              className="mt-1"
            />
            <ListItemText
              primary="My WatchList"
              primaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </div>
        </ListItem>
      </List>
    </Box>
  );
};

const SearchBar = () => {
  return (
    <Box display={"flex"} marginTop={"1.5rem"}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          borderRadius: 1,
          boxShadow: 2,
          mr: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "0.8rem" }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton type="submit" sx={{ p: "6px" }} aria-label="search">
          <SearchIcon fontSize="small" />
        </IconButton>
      </Paper>
      <IconButton
        size="small"
        sx={{
          bgcolor: "#000080",
          color: "white",
          borderRadius: 1,
          mr: 1,
        }}
        aria-label="apps"
      >
        <GridViewOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          bgcolor: "white",
          color: "black",
          borderRadius: 1,
          boxShadow: 2,
          "&:hover": {
            bgcolor: "grey.200",
          },
        }}
        aria-label="apps"
      >
        <MenuIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

const UserProfileCard = ({ children, tips }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="p-3">
      <Grid
        container
        justifyContent={"flex-end"}
        width={isSmallScreen ? "100%" : "87%"}
      >
        <SearchBar />
      </Grid>
      <Grid container gap={1}>
        <Grid item xs={12} sm={3} marginLeft={isSmallScreen ? "10px" : "120px"}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box marginY={"1rem"}>{children}</Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginY: "1rem",
          display: isSmallScreen ? "flex" : "",
          justifyItems: isSmallScreen ? "center" : "left",
          marginLeft: isSmallScreen ? "40px" : "0px",
        }}
      >
        {tips}
      </Box>
    </div>
  );
};

export default UserProfileCard;
