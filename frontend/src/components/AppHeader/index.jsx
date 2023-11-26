import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { Button } from "components/Atoms/Button";
import Drawer from "components/Drawer";
import AppLogo from "components/AppLogo";
import { drawerLinks } from "components/Drawer";
import { useGlobalContext } from "hooks";

function AppHeader() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { tokens } = useGlobalContext()
  const [drawerOpen, setDrawerOpen] = useState(false);


  const toggleDrawer = (open) => {
    if (open) {
      setDrawerOpen(open);
    } else {
      setDrawerOpen((prev) => !prev);
    }
  };
  if (!tokens) {
    return (
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AppLogo style={{ display: { xs: "none", md: "flex" } }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Hotel Menu
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppLogo style={{ display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hotel Menu
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => toggleDrawer()}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hotel Menu
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {drawerLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => navigate(link.to)}
                sx={{ my: 2, color: "white", textTransform: "none" }}
                variant="text"
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Right hand side menu */}
          <Box sx={{ flexGrow: 0, display: "flex", justifyContent: "end" }}>
            <Tooltip title="Orders">
              <IconButton
                onClick={() => navigate("/account")}
                sx={{
                  p: 0,
                  mr: theme.spacing(3),
                  color: theme.palette.common.white,
                }}
              >
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;
