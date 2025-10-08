import { useSnackbar, type VariantType } from "notistack";
import { useContext, useState, useCallback } from "react";
import { userDataContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { axiosInstance } from "../../utils/apis";
import type { AxiosError } from "axios";
import {
  Box,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  CssBaseline,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import adminSchema from "./adminSchema";

export default function LoginAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const userContext = useContext(userDataContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const showSnackbar = useCallback(
    (message: string, severity: VariantType) => {
      enqueueSnackbar(message, { variant: severity });
    },
    [enqueueSnackbar]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema: adminSchema,
    onSubmit: async (values) => {
      try {
        const resp = await axiosInstance.post("/admin/login", {
          username: values.username,
          password: values.password,
        });

        localStorage.setItem("access_token", resp.data.access_token);
        userContext?.setUserData(resp.data.data);

        showSnackbar("Admin login successful! Welcome back.", "success");
        navigate("/admin/therapists");
      } catch (e) {
        const error = e as AxiosError;
        const errorMessage =
          error.message || "Invalid credentials. Please try again.";
        showSnackbar(errorMessage, "error");
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)",
        position: "relative",
        overflow: "hidden",
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
      <CssBaseline />

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <img
              src="https://imgur.com/uXh9MXM.png"
              alt="Admin Portal Logo"
              style={{
                maxWidth: "200px",
                height: "auto",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              }}
            />
          </Box>

          {/* Title */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Admin Portal
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 1,
              }}
            >
              Secure access for authorized administrators
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Login Form */}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Admin Username"
              placeholder="Enter your username"
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />

            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              loading={formik.isSubmitting}
              disabled={!formik.isValid || formik.isSubmitting}
              startIcon={<LoginIcon />}
              sx={{
                py: 1.8,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.39)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Access Admin Panel
            </LoadingButton>
          </Box>

          {/* Security Notice */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              🔒 This is a secure area. All activities are logged.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
