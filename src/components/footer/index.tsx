import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  Email,
  BugReport,
} from "@mui/icons-material";
import Logo from "../../assets/img/logo.png";

export default function Footer() {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const footerLinks = [
    { title: "Home", path: "/" },
    { title: "Find Therapists", path: "/therapists" },
    { title: "About Us", path: "/" },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram />, url: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a2e",
        color: "#fff",
        pt: { xs: 6, md: 8 },
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Section */}
          <Grid item xs={12} md={4}>
            <Box>
              <img
                src={Logo}
                alt="NTherapy Pro Logo"
                style={{ width: "250px", height: "auto" }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              We&apos;re committed to delivering life-changing anxiety and
              depression care to everyone who needs it. Your mental health
              matters.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                    "&:hover": {
                      color: "#5885ff",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Get In Touch
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Email sx={{ color: "#5885ff", fontSize: "1.2rem" }} />
                <Link
                  href="mailto:ntherapypro@gmail.com"
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#5885ff",
                    },
                  }}
                >
                  ntherapypro@gmail.com
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <BugReport sx={{ color: "#5885ff", fontSize: "1.2rem" }} />
                <Link
                  href="/bug-report"
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#5885ff",
                    },
                  }}
                >
                  Report a Bug
                </Link>
              </Box>

              {/* Social Media Icons */}
              <Box sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 1.5,
                    fontSize: "0.85rem",
                  }}
                >
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        width: 40,
                        height: 40,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#5885ff",
                          color: "#fff",
                          borderColor: "#5885ff",
                          transform: "translateY(-3px)",
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            my: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Copyright Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.875rem",
            }}
          >
            &copy; {new Date().getFullYear()} NTherapy Pro. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              underline="none"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#5885ff",
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              underline="none"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#5885ff",
                },
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
