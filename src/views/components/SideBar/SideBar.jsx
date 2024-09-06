import React from "react";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonIcon from "@mui/icons-material/Person";
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
        width: { xs: "100%", sm: 250 },
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: 3,
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
      <Typography variant="h6">Percy Reed</Typography>
      <Typography variant="body2" color="textSecondary">
        john@gmail.com
      </Typography>

      <List sx={{ width: "100%", mt: 1 }}>
        <ListItem>
          <ListItemIcon>
            <DashboardOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Personal Profile"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <GavelIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="My Bids"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <EmojiEventsOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Winning Bids"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>

        <ListItem sx={{ bgcolor: "rgba(0, 0, 255, 0.1)", borderRadius: 2 }}>
          <ListItemIcon>
            <NotificationsNoneOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="My Notification"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <StarBorderOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="My Favorite"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="My WatchList"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItem>
      </List>
    </Box>
  );
};

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 3,
        marginY: "1rem",
        width: { xs: "100%", sm: "300px" },
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 20,
          boxShadow: "none",
          p: "1px 2px",
          mr: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <IconButton
        size="small"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 1,
          mr: 1,
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
        aria-label="apps"
      >
        <GridViewOutlinedIcon />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          bgcolor: "white",
          color: "black",
          borderRadius: 2,
          mr: 1,
          boxShadow: 1,
          "&:hover": {
            bgcolor: "grey.200",
          },
        }}
        aria-label="apps"
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

const UserProfileCard = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="p-3">
      <Grid container justifyContent={isSmallScreen ? "center" : "flex-end"}>
        <SearchBar />
      </Grid>
      <Grid container gap={6}>
        <Grid item xs={12} sm={2} marginLeft={isSmallScreen ? "10px" : "70px"}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box marginY={"1rem"}>{children}</Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfileCard;
