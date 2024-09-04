import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../core/store/auth/authThunks";
import {
  setLanguageRedux,
  setLanguageIdRedux,
} from "../../../core/store/language/languageSlice";
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { ExitToApp, Language, Notifications, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PROJECT_NAME } from "../../../core/utils/constants";
import { getLanguages } from "../../../core/api/languageTranslation";
import {
  readNotificationSpecificUser,
  readAllNotifications,
} from "../../../core/api/notifications";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const userDetails = useSelector((state) => state.auth.user);
  const currentLanguage = useSelector((state) => state.language.language);
  const currentLanguageId = useSelector((state) => state.language.languageId);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguages(); // Fetch languages from API
        setLanguages(response.List); // Set languages to state
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    const fetchSpecificUserNotifications = async () => {
      try {
        const response = await readNotificationSpecificUser();
        console.log("Notifications fetched:", response);
        setNotifications(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchSpecificUserNotifications();
    fetchLanguages();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (language) => {
    dispatch(setLanguageRedux(language.code.toLowerCase()));
    dispatch(setLanguageIdRedux(language.id));
    handleLanguageClose();
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" sx={{ width: "100%", boxShadow: "none" }}>
      <Container>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "60px", py: 1 }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
            background="transparent"
          >
            <img
              src="/public/bits.png"
              alt="logo"
              style={{ maxWidth: "100%", maxHeight: "100%", width: "180px" }}
            />
          </IconButton>
          {/* <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {PROJECT_NAME}
            </Link>
          </Typography> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="change language"
              onClick={handleLanguageMenu}
            >
              <Language />
            </IconButton>
            <Menu
              id="language-menu"
              anchorEl={languageAnchorEl}
              open={Boolean(languageAnchorEl)}
              onClose={handleLanguageClose}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} onClick={() => changeLanguage(lang)}>
                  {lang.name}
                </MenuItem>
              ))}
            </Menu>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="notifications"
              onClick={toggleDrawer(true)}
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box sx={{ width: 300 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                  <Typography variant="h6">
                    {t("Notifications")}
                  </Typography>
                  <IconButton onClick={toggleDrawer(false)}>
                    <Close />
                  </IconButton>
                </Box>
                <List>
                  {notifications.map((notification, index) => (
                    <ListItem
                      button
                      key={index}
                      sx={{
                        borderBottom: "1px solid #e0e0e0",
                        padding: "10px 16px",
                      }}
                      onClick={() => {
                        setDrawerOpen(true); // Simulate opening another drawer
                        // Handle new drawer opening logic here
                      }}
                    >
                      <ListItemText
                        primary={notification.message}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "textPrimary",
                        }}
                        secondary={notification.timestamp}
                        secondaryTypographyProps={{
                          variant: "caption",
                          color: "textSecondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ ml: 2 }}
            >
              <Avatar>
                <Typography variant="h6" textTransform={"uppercase"}>
                  {`${userDetails?.name?.split(" ")?.[0]?.[0]}${
                    userDetails?.name?.split(" ")?.[1]?.[0]
                  }`}
                </Typography>
              </Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleLogOut}
                sx={{ color: "#1976d2" }}
                title={t("click_to_logout")}
              >
                <ExitToApp fontSize="small" sx={{ mr: 1 }} /> {t("logout")}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
