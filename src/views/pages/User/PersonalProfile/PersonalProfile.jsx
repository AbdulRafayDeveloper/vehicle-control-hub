import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// Files
import Header from "../../../components/Header/Header";
import UserProfileCard from "../../../components/SideBar/SideBar";
import PersonalInformation from "./PersonalInformation";
import Documentation from "./Documentation";
import Password from "./Password";
import PaymentForm from "./Payment";

// Icons
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function PersonalInfoForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState("");

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Header title={"Personal Profile"} navText={"User / Personal Profile"} />
      <UserProfileCard>
        <Box
          sx={{
            width: "100%",
            boxShadow: 4,
            borderRadius: 2,
            paddingBottom: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              overflowX: isSmallScreen ? "auto" : "hidden",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant={isSmallScreen ? "scrollable" : "standard"}
              scrollButtons={isSmallScreen ? "auto" : "off"}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
              TabIndicatorProps={{
                style: { backgroundColor: "blue" },
              }}
            >
              <Tab
                label="Personal Information"
                icon={
                  <AccountCircleOutlinedIcon
                    className="mr-1"
                    fontSize="small"
                  />
                }
                sx={{
                  outline: "none",
                  textTransform: "capitalize",
                  display: "inline",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
              <Tab
                label="Documentation"
                icon={<TaskOutlinedIcon className="mr-1" fontSize="small" />}
                sx={{
                  outline: "none",
                  textTransform: "capitalize",
                  display: "inline",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
              <Tab
                label="Change Password"
                icon={<LockOutlinedIcon className="mr-1" fontSize="small" />}
                sx={{
                  outline: "none",
                  textTransform: "capitalize",
                  display: "inline",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
              <Tab
                label="Payment Method"
                icon={<ReceiptOutlinedIcon className="mr-1" fontSize="small" />}
                sx={{
                  outline: "none",
                  textTransform: "capitalize",
                  display: "inline",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
            </Tabs>
          </Box>

          {content && (
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {content}
            </Typography>
          )}

          {/* Render components based on the selected tab */}
          {tabIndex === 0 && <PersonalInformation />}
          {tabIndex === 1 && <Documentation />}
          {tabIndex === 2 && <Password />}
          {tabIndex === 3 && <PaymentForm />}
        </Box>
      </UserProfileCard>
    </div>
  );
}

export default PersonalInfoForm;
