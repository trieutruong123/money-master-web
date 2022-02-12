import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "components";
import { colorScheme } from "utils/color-scheme";
import { userService } from "services";

export default function Navbar() {
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const isAccountMenuOpen = Boolean(accountMenuAnchorEl);
  const router = useRouter();
  const matchAuthPage: boolean = ["/login", "/register", "/"].includes(
    router.pathname
  );
  const matchLoginPage: boolean = router.pathname === "/login";

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAccountMenuAnchorEl(null);
    userService.logout();
  };

  const accountMenuId = "account-menu-anchor-el";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{
          backgroundColor: colorScheme.white,
          color: colorScheme.black200,
        }}
      >
        <Toolbar>
          <Link href="/">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                id="app-icon"
                src='images/app-icon.png'
                alt="app icon"
                style={{ width: "2rem", height: "2rem" }}
              />
              <Typography
                id="brand-name"
                sx={{
                  ml: 1,
                  color: colorScheme.theme,
                  display: { xs: "none", sm: "flex" },
                }}
                fontWeight="bold"
                style={{ cursor: "pointer" }}
                variant="h6"
              >
                Money Master
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {matchAuthPage && (
            <Button
              id="login-button"
              variant="contained"
              sx={{ bg: colorScheme.theme, mr: 3 }}
            >
              {matchLoginPage ? (
                <Link href="/register">Register</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Button>
          )}
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton
              id="account-button"
              size="large"
              edge="start"
              aria-label="account of current user"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleAccountMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 30, height: 30 }} />
            </IconButton>
            <Menu
              anchorEl={accountMenuAnchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              id={accountMenuId}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isAccountMenuOpen}
              onClose={handleAccountMenuClose}
              MenuListProps={{ "aria-labelledby": "account-button" }}
            >
              <MenuItem onClick={handleProfileClick}>
                <Link href="/profile">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar sx={{ width: 30, height: 30 }} />
                    <span>dev@gmail.com</span>
                  </Box>
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
