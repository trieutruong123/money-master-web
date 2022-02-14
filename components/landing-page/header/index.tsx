import { useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tabs,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "components";
import { colorScheme } from "utils/color-scheme";
import LinkTab from "./link-tab";
import DrawerComponent from "./drawer-component";

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const matchAuthPage: boolean = ["/login", "/register", "/"].includes(
    router.pathname
  );
  const matchLoginPage: boolean = router.pathname === "/login";

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleScroll = () => {
    if (window.scrollY > 90) {
      setSticky(true);
    } else if (window.scrollY < 90) {
      setSticky(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position={sticky ? "sticky" : "relative"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{
          backgroundColor: colorScheme.white,
          color: colorScheme.black200,
        }}
      >
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                sx={{ mr: 1 }}
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
              <DrawerComponent
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </>
          ) : null}
          <Link href="/">
            <Box display="flex" justifyContent="end" alignItems="end">
              <img
                id="app-icon"
                src="images/app-icon.png"
                alt="app icon"
                style={{ width: "2rem", height: "2rem" }}
              />
              <Typography
                id="brand-name"
                sx={{
                  ml: 1,
                  color: colorScheme.theme,
                }}
                fontWeight="bold"
                style={{ cursor: "pointer" }}
                variant="h6"
              >
                Money Master
              </Typography>
            </Box>
          </Link>
          {
          !isMobile ? (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
              justifyContent="center"
              alignItems="center"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="Home" href="/" />
                <LinkTab label="Features" href="/#feature" />
                <LinkTab label="Services" href="/#service" />
                <LinkTab label="About" href="/#about" />
              </Tabs>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }} />
          )}

          {matchAuthPage && (
            <>
              <Button
                id="login-button"
                variant="contained"
                sx={{ bg: colorScheme.theme, mr: 1, ml: "auto" }}
              >
                {matchLoginPage ? (
                  <Link href="/register">Register</Link>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
