import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { BiBell } from "react-icons/bi";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const AdminHeader = ({ title = "", subText = "" }) => {
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const handleProfileMenuClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleNotificationsMenuClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setAnchorElNotifications(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        marginTop: "22px",
        backgroundColor: "#f3f4f6",
        color: "black",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        {/* Left Section: Title and Subtitle */}
        <div style={{ flexGrow: 1, textAlign: "left" }}>
          <Typography
            variant="body"
            sx={{ fontSize: "24px", fontWeight: "500" }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "14px", color: "#7C8DB5" }}
          >
            {subText}
          </Typography>
        </div>

        {/* Right Section: Search, Notifications, Profile */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Search Icon */}
          <IconButton
            color="inherit"
            sx={{
              outline: "none",
              border: "none", // Ensures no border is shown
              boxShadow: "none", // Removes any box shadow on click/focus
              "&:focus": {
                outline: "none", // Ensures no focus outline
                border: "none",
                boxShadow: "none",
              },
              "&:hover": {
                outline: "none", // Ensures no focus outline
                border: "none",
                boxShadow: "none",
                bgcolor: "white",
              },
            }}
          >
            <IoIosSearch className="w-6 h-6" />
          </IconButton>

          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={handleNotificationsMenuClick}
            sx={{
              outline: "none",
              border: "none", // Ensures no border is shown
              boxShadow: "none", // Removes any box shadow on click/focus
              "&:focus": {
                outline: "none", // Ensures no focus outline
                border: "none",
                boxShadow: "none",
              },
              "&:hover": {
                outline: "none", // Ensures no focus outline
                border: "none",
                boxShadow: "none",
                bgcolor: "white",
              },
            }}
          >
            <Badge badgeContent={1} color="error">
              <BiBell className="w-6 h-6 -ml-2" />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleNotificationsMenuClose}
          >
            <MenuItem onClick={handleNotificationsMenuClose}>
              Notification 1
            </MenuItem>
            <MenuItem onClick={handleNotificationsMenuClose}>
              Notification 2
            </MenuItem>
          </Menu>

          {/* Profile */}
          <IconButton
            color="inherit"
            onClick={handleProfileMenuClick}
            sx={{
              display: "flex",
              gap: "10px",
              outline: "none",
              border: "none",
              boxShadow: "none",
              "&:focus": {
                outline: "none",
                border: "none",
                boxShadow: "none",
              },
              "&:hover": {
                outline: "none",
                border: "none",
                boxShadow: "none",
                bgcolor: "white",
              },
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/150?img=10"
              alt="Profile"
              sx={{ width: "32px", height: "32px" }}
            />
            <div className="flex">
              <Typography variant="subtitle1" className="list">
                Marci Fumons
              </Typography>
              <ArrowDropDownIcon />
            </div>
          </IconButton>

          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem
              onClick={handleProfileMenuClose}
              sx={{ display: "flex", gap: "10px" }}
            >
              <FaRegUser />
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleProfileMenuClose}
              sx={{ display: "flex", gap: "10px" }}
            >
              <IoSettingsOutline />
              <Typography>Settings</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleProfileMenuClose}
              sx={{ display: "flex", gap: "10px" }}
            >
              <IoLogOutOutline />
              <Typography>Log out</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
