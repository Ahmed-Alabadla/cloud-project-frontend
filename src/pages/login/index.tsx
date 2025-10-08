import { useState, useContext, useCallback } from "react";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { enqueueSnackbar, type VariantType } from "notistack";
import { LoadingButton } from "@mui/lab";
import {
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { userDataContext } from "../../context";
import validationSchema from "./schema";
import imageSrc from "../../assets/loginImg.jpg";
import logosrc from "../../assets/img/logo.png";
import { axiosInstance } from "../../utils/apis";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(userDataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const showSnackbar = useCallback((message: string, severity: VariantType) => {
    enqueueSnackbar(message, { variant: severity });
  }, []);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("access_token", response.data.access_token);
        context?.setUserChange(!context.userChange);

        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);

        showSnackbar("Login successful! Welcome back.", "success");
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.";
        showSnackbar(errorMessage, "error");
      }
    },
  });

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <CssBaseline />

      {/* Left Side - Image Section */}
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(rgba(81, 110, 255, 0.1), rgba(81, 110, 255, 0.3))",
              zIndex: 1,
            },
          }}
        >
          <img
            src={imageSrc}
            alt="Therapy session illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>

      {/* Right Side - Form Section */}
      <Grid
        item
        xs={12}
        md={5}
        component={Paper}
        elevation={0}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          position: "relative",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "480px",
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 6, sm: 8 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Link to="/" style={{ display: "inline-block" }}>
              <img
                src={logosrc}
                alt="NTherapy Pro logo"
                style={{
                  width: "200px",
                  height: "auto",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Link>
          </Box>

          {/* Welcome Text */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mt: 1,
              }}
            >
              Sign in to continue your journey
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Login Form */}
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#516EFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#516EFF",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#516EFF",
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
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
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#516EFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#516EFF",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#516EFF",
                },
              }}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={formik.isSubmitting}
              disabled={!formik.isValid || formik.isSubmitting}
              startIcon={<LoginIcon />}
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
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
              Sign In
            </LoadingButton>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#516EFF",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
