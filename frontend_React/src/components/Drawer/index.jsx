import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import AppLogo from "components/AppLogo";
import { useGlobalContext } from "hooks";
import { useAuthControls } from "hooks/useAuthControls";

export const drawerLinks = [
  // { label: "Share Account", icon: <CoPresentIcon />, to: "/share-account" },
  { label: "Orders", icon: <ReceiptIcon />, to: "/transactions" },
  { label: "Profile", icon: <AccountBoxIcon />, to: "/account" },
];

const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Drawer({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const { tokens } = useGlobalContext()
  const { logout } = useAuthControls()

  return (
    <SwipeableDrawer
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <Box
          sx={{
            backgroundColor: "primary.main",
            height: "10rem",
            display: "flex",
            padding: "1rem",
            alignItems: "center",
          }}
        >
          <AppLogo />
          <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 700 }}>
            Taste of India
          </Typography>
        </Box>
        <Divider />
        <List>
          {drawerLinks.map((link) => (
            <ListItem
              key={link.label}
              disablePadding
              onClick={() => {
                toggleDrawer(false);
                setTimeout(() => navigate(link.to), 200);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {tokens && (
            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer(false);
                logout()
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
          {!tokens && (
            <ListItem
              disablePadding
            // onClick={() => {
            //   toggleDrawer(false);
            //   loginWithRedirect({
            //     appState: { returnTo: "/" },
            //   });
            // }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Box sx={{ position: "fixed", bottom: "2rem", left: "1rem", textAlign: "center" }}>
          <Typography variant="caption">
            ODU<br />
          </Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
