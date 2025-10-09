import { useState, useContext, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { userDataContext } from "../context";
import ThemeContext from "../context/themeContext";
import Logo from "../assets/img/logo.png";

// Navigation configuration
const NAVIGATION_PAGES = [
  { title: "Home", path: "/" },
  { title: "Therapists", path: "/therapists" },
] as const;

const DEFAULT_AVATAR = "https://2u.pw/boTFzk6";

const LogoSection = () => (
  <Link to="/" style={{ display: "flex", alignItems: "center" }}>
    <img
      src={Logo}
      alt="NTherapy Pro Logo"
      style={{ width: "160px", height: "auto" }}
    />
  </Link>
);

const ThemeToggle = () => {
  const themes = useContext(ThemeContext);

  return (
    <Tooltip
      title={`Switch to ${
        themes?.themeMode === "light" ? "dark" : "light"
      } mode`}
    >
      <IconButton
        aria-label="Toggle theme mode"
        onClick={themes?.handleThemeModeSwitch}
        color="inherit"
        sx={{ ml: 1 }}
      >
        {themes?.themeMode === "light" ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </IconButton>
    </Tooltip>
  );
};

interface MobileMenuProps {
  anchorEl: null | HTMLElement;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
}

const MobileMenu = ({ anchorEl, onOpen, onClose }: MobileMenuProps) => (
  <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
    <IconButton
      size="large"
      aria-label="Open navigation menu"
      aria-controls="mobile-menu-appbar"
      aria-haspopup="true"
      onClick={onOpen}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Menu
      id="mobile-menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      {NAVIGATION_PAGES.map((page) => (
        <MenuItem key={page.title} onClick={onClose}>
          <Link
            to={page.path}
            style={{
              textDecoration: "none",
              color: "#516EFF",
              width: "100%",
            }}
          >
            <Typography textAlign="center">{page.title}</Typography>
          </Link>
        </MenuItem>
      ))}
    </Menu>
  </Box>
);

const DesktopMenu = ({ onClose }: { onClose: () => void }) => (
  <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 3 }}>
    {NAVIGATION_PAGES.map((page) => (
      <Button
        key={page.title}
        component={Link}
        to={page.path}
        variant="outlined"
        onClick={onClose}
        sx={{
          my: 2,
          color: "#516EFF",
          borderColor: "transparent",
          ml: 2,
          "&:hover": {
            borderColor: "#516EFF",
            backgroundColor: "rgba(81, 110, 255, 0.04)",
          },
        }}
      >
        {page.title}
      </Button>
    ))}
  </Box>
);

interface UserMenuProps {
  userData: any;
  anchorEl: null | HTMLElement;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onLogout: () => void;
}

const UserMenu = ({
  userData,
  anchorEl,
  onOpen,
  onClose,
  onLogout,
}: UserMenuProps) => {
  const userRole = userData?.role;
  const isTherapist = userRole === "therapist";
  const isAdmin = userRole === "admin";
  const showMenu = isTherapist || isAdmin;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Button
        onClick={onOpen}
        sx={{
          p: 0,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Typography
          sx={{
            color: "#516EFF",
            fontWeight: 600,
            ml: { xs: 1, md: 2 },
            display: { xs: "none", sm: "block" },
          }}
        >
          {userData?.fullName || "User"}
        </Typography>
        <Avatar
          alt={userData?.fullName || "User avatar"}
          src={
            userData?.profileImg
              ? `${userData.profileImg}?timestamp=${Date.now()}`
              : DEFAULT_AVATAR
          }
          sx={{ ml: 1, width: 40, height: 40 }}
        />
      </Button>

      <Tooltip title="Logout">
        <IconButton
          onClick={onLogout}
          sx={{
            color: "#516EFF",
            "&:hover": {
              backgroundColor: "rgba(81, 110, 255, 0.08)",
            },
          }}
          aria-label="Logout"
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>

      {showMenu && (
        <Menu
          sx={{ mt: "45px" }}
          id="user-menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <MenuItem onClick={onClose}>
            {isTherapist ? (
              <Link
                to={`/therapist/${userData?.therapistId}`}
                style={{
                  textDecoration: "none",
                  color: "#516EFF",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                }}
              >
                <AccountCircleIcon />
                Profile
              </Link>
            ) : (
              <Link
                to="/admin/therapists"
                style={{
                  textDecoration: "none",
                  color: "#516EFF",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                }}
              >
                <AccountCircleIcon />
                Dashboard
              </Link>
            )}
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

const AuthButtons = () => (
  <Box sx={{ display: "flex", gap: 1 }}>
    <Button
      component={Link}
      to="/signup"
      variant="outlined"
      sx={{
        color: "#516EFF",
        borderColor: "#516EFF",
        "&:hover": {
          borderColor: "#516EFF",
          backgroundColor: "rgba(81, 110, 255, 0.08)",
        },
      }}
    >
      Sign Up
    </Button>
    <Button
      component={Link}
      to="/login"
      variant="contained"
      sx={{
        backgroundColor: "#516EFF",
        "&:hover": {
          backgroundColor: "#3d5acc",
        },
      }}
    >
      Sign In
    </Button>
    <Button
      component={Link}
      to="/admin/login"
      variant="outlined"
      sx={{
        color: "#516EFF",
        borderColor: "#516EFF",
        "&:hover": {
          borderColor: "#516EFF",
          backgroundColor: "rgba(81, 110, 255, 0.08)",
        },
      }}
    >
      Admin Login
    </Button>
  </Box>
);

// Main Navbar Component
const Navbar = () => {
  const userData = useContext(userDataContext);
  const themes = useContext(ThemeContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("access_token");
    userData?.setUserData(null);
    navigate("/");
  }, [navigate, userData]);

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: themes?.themeMode === "dark" ? "#181A1B" : "#F4F7FF",
        color: "#516EFF",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Section: Mobile Menu + Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: { xs: 0, md: 0 },
            }}
          >
            <MobileMenu
              anchorEl={anchorElNav}
              onOpen={handleOpenNavMenu}
              onClose={handleCloseNavMenu}
            />
            <LogoSection />
          </Box>

          {/* Center Section: Desktop Navigation Menu */}
          <DesktopMenu onClose={handleCloseNavMenu} />

          {/* Right Section: Theme Toggle + User Menu/Auth Buttons */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}
          >
            <ThemeToggle />

            {userData?.userData ? (
              <UserMenu
                userData={userData.userData}
                anchorEl={anchorElUser}
                onOpen={handleOpenUserMenu}
                onClose={handleCloseUserMenu}
                onLogout={handleLogout}
              />
            ) : (
              <AuthButtons />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
