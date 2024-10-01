import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BsBarChart } from "react-icons/bs";
import { PiBriefcase } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { RiFileList3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Footer from "../AdminComponents/Footer";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openAuction, setOpenAuction] = useState(false);
  const [openUserManagement, setOpenUserManagement] = useState(false);

  const handleClickProduct = () => setOpenProduct(!openProduct);
  const handleClickAuction = () => setOpenAuction(!openAuction);
  const handleClickUserManagement = () =>
    setOpenUserManagement(!openUserManagement);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {/* Hamburger Icon for mobile view */}
      <div className="lg:hidden p-4">
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* Sidebar Drawer */}
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          width: 287,
          "& .MuiDrawer-paper": {
            width: 287,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <div>
          <img
            src="/src/assets/logo_bits.svg"
            alt="logo"
            width={106}
            height={56.12}
            className="mt-5 ml-14"
          />
        </div>
        <List sx={{ width: 280, paddingLeft: "40px", marginTop: "40px" }}>
          {/* Dashboard */}
          <ListItem button>
            <ListItemIcon>
              <BsBarChart className="w-5 h-5 text-[#7C8DB5]" />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ color: "#7C8DB5", marginLeft: "-20px" }}
            />
          </ListItem>

          {/* Product */}
          <ListItem button onClick={handleClickProduct}>
            <ListItemIcon>
              <PiBriefcase className="w-5 h-5 text-[#7C8DB5]" />
            </ListItemIcon>
            <ListItemText
              primary="Product"
              sx={{ color: "#7C8DB5", marginLeft: "-20px" }}
            />
            {openProduct ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ paddingLeft: "20px" }}>
              <ListItem sx={{ pl: 4 }} button>
                <ListItemText primary="Manage Cars" />
              </ListItem>
              <ListItem sx={{ pl: 4 }} button>
                <ListItemText primary="Manage Trucks" />
              </ListItem>
              <ListItem sx={{ pl: 4 }} button>
                <ListItemText primary="Manage Spare Parts" />
              </ListItem>
            </List>
          </Collapse>

          {/* Auction */}
          <ListItem button onClick={handleClickAuction}>
            <ListItemIcon>
              <FaRegUser className="w-5 h-5 text-[#7C8DB5]" />
            </ListItemIcon>
            <ListItemText
              primary="Auction"
              sx={{ color: "#7C8DB5", marginLeft: "-20px" }}
            />
            {openAuction ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAuction} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} button>
                <ListItemText primary="Submenu 1" />
              </ListItem>
              <ListItem sx={{ pl: 4 }} button>
                <ListItemText primary="Submenu 2" />
              </ListItem>
            </List>
          </Collapse>

          {/* Reports */}
          <ListItem button>
            <ListItemIcon>
              <RiFileList3Line className="w-5 h-5 text-[#7C8DB5]" />
            </ListItemIcon>
            <ListItemText
              primary="Reports"
              sx={{ color: "#7C8DB5", marginLeft: "-20px" }}
            />
          </ListItem>

          {/* Settings */}
          <ListItem button>
            <ListItemIcon>
              <IoSettingsOutline className="w-5 h-5 text-[#7C8DB5]" />
            </ListItemIcon>
            <ListItemText
              primary="Setting"
              sx={{ color: "#7C8DB5", marginLeft: "-20px" }}
            />
          </ListItem>

          {/* Employee Activity */}
          <ListItem button>
            <ListItemIcon>
              <IoSettingsOutline className="w-5 h-5 text-[#7C8DB5]" />
            </ListItemIcon>
            <ListItemText
              primary="Employee Activity"
              sx={{ color: "#7C8DB5", marginLeft: "-20px" }}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

const Admin = ({ header, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Set initial state to true for desktop

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Wrapper */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <Box>{header}</Box>

        {/* Main content area */}
        <Box className="flex-grow p-4 overflow-auto">{children}</Box>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
