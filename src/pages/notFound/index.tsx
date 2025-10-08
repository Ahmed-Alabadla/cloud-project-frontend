import { Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const NotFound = () => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      position: "relative",
      overflow: "auto",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3,
      },
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          borderRadius: 4,
          p: { xs: 2, sm: 3, md: 4 },
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(20px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Animated 404 Number */}
        <Box
          sx={{
            mb: 3,
            position: "relative",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4.5rem", sm: "6rem", md: "8rem" },
              fontWeight: 900,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              textShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
            }}
          >
            404
          </Typography>
        </Box>

        {/* Illustration */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404 Error Illustration"
            sx={{
              maxWidth: { xs: "230px", sm: "270px" },
              width: "100%",
              height: "auto",
              borderRadius: 2,
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
            }}
          />
        </Box>

        {/* Error Message */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          Oops! Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 2,
            fontSize: { xs: "0.5rem", sm: "0.875rem" },
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              px: 4,
              py: 1,
              minWidth: { xs: "100%", sm: "200px" },
              backgroundColor: "#516EFF",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "0 4px 14px 0 rgba(81, 110, 255, 0.39)",
              "&:hover": {
                backgroundColor: "#3d5acc",
                boxShadow: "0 6px 20px rgba(81, 110, 255, 0.5)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Go to Homepage
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 4,
              py: 1,
              minWidth: { xs: "100%", sm: "200px" },
              borderColor: "#516EFF",
              color: "#516EFF",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#3d5acc",
                backgroundColor: "rgba(81, 110, 255, 0.04)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Additional Help Text */}
        <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            Need help? Contact our{" "}
            <Link
              to="/"
              style={{
                color: "#516EFF",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              support team
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default NotFound;
