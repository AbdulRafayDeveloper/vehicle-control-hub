import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../core/store/auth/authThunks";
import {
  setLanguageRedux,
  setLanguageIdRedux,
} from "../../../core/store/language/languageSlice";
import {
  AppBar,
  Box,
  MenuItem,
  Menu,
  IconButton,
  Button,
  InputBase,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search,
  Language,
  ArrowDropDown,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLanguages } from "../../../core/api/languageTranslation";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userDetails = useSelector((state) => state.auth.user);
  const currentLanguage = useSelector((state) => state.language.language);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguages();
        setLanguages(response.List);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
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
    dispatch(setLanguageRedux(language.name));
    dispatch(setLanguageIdRedux(language.id));
    handleLanguageClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        paddingBottom: "10px",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            py: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              <img
                src="/public/bits.png"
                alt="logo"
                style={{ maxWidth: "100%", maxHeight: "100%", width: "100px" }}
              />
            </IconButton>
            {!isMobile && (
              <InputBase
                placeholder="Search Inventories"
                startAdornment={<Search />}
                sx={{
                  ml: 2,
                  px: 2,
                  py: 1,
                  borderRadius: 10,
                  backgroundColor: "#f0f0f0",
                  width: "300px",
                }}
              />
            )}
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button onClick={handleLanguageMenu} sx={{ color: "#000" }}>
                <Language /> {currentLanguage} <ArrowDropDown />
              </Button>
              <Menu
                anchorEl={languageAnchorEl}
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageClose}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                  >
                    {lang.name}
                  </MenuItem>
                ))}
              </Menu>
              <Button sx={{ color: "#000", ml: 2 }}>
                USD <ArrowDropDown />
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={handleMenu}
              >
                {userDetails?.username ? "Logout" : "Login"}
              </Button>
              {userDetails?.username && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
                </Menu>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton
              edge="end"
              color="black"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
            }}
          >
            <InputBase
              placeholder="Search Inventories"
              startAdornment={<Search />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
                width: "100%",
              }}
            />
          </Box>
        )}

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/inventory">
                <ListItemText primary="Inventory" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Auctions" />
              </ListItem>
              <ListItem button component={Link} to="/locations">
                <ListItemText primary="Locations" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Services & Support" />
              </ListItem>
              <ListItem button component={Link} to="/help-center">
                <ListItemText primary="Help Center" />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleLanguageMenu}>
                <ListItemText
                  primary={
                    <>
                      <Language /> {currentLanguage} <ArrowDropDown />
                    </>
                  }
                />
              </ListItem>
              <Menu
                anchorEl={languageAnchorEl}
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageClose}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                  >
                    {lang.name}
                  </MenuItem>
                ))}
              </Menu>
              <ListItem button>
                <ListItemText primary="USD" />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleMenu}>
                <ListItemText
                  primary={userDetails?.username ? "Logout" : "Login"}
                />
              </ListItem>
              {userDetails?.username && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
                </Menu>
              )}
            </List>
          </Box>
        </Drawer>

        {!isMobile && (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  color: "#000",
                  borderBottom:
                    location.pathname === "/home"
                      ? "2px solid #1976d2"
                      : "none",
                }}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                sx={{
                  color: "#000",
                  borderBottom:
                    location.pathname === "/inventory"
                      ? "2px solid #1976d2"
                      : "none",
                }}
                component={Link}
                to="/inventory"
              >
                Inventory <ArrowDropDown />
              </Button>
              <Button
                sx={{
                  color: "#000",
                  borderBottom:
                    location.pathname === "/auctions"
                      ? "2px solid #1976d2"
                      : "none",
                }}
              >
                Auctions <ArrowDropDown />
              </Button>
              <Button
                sx={{
                  color: "#000",
                  borderBottom:
                    location.pathname === "/locations"
                      ? "2px solid #1976d2"
                      : "none",
                }}
                component={Link}
                to="/locations"
              >
                Locations
              </Button>
              <Button
                sx={{
                  color: "#000",
                  borderBottom:
                    location.pathname === "/services"
                      ? "2px solid #1976d2"
                      : "none",
                }}
              >
                Services & Support
              </Button>
              <Button
                sx={{
                  color: "#000",
                  borderBottom:
                    location.pathname === "/help-center"
                      ? "2px solid #1976d2"
                      : "none",
                }}
                component={Link}
                to="/help-center"
              >
                Help Center
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
