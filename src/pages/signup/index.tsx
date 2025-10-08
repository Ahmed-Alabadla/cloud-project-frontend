import { useState, useCallback } from "react";
import { useSnackbar, type VariantType } from "notistack";
import {
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import validationSchema from "./schema";
import imageSrc from "../../assets/loginImg.jpg";
import { axiosInstance } from "../../utils/apis";
import logosrc from "../../assets/img/logo.png";

const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [userType, setUserType] = useState("user");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [cvFileName, setCvFileName] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  const showSnackbar = useCallback(
    (message: string, severity: VariantType) => {
      enqueueSnackbar(message, { variant: severity });
    },
    [enqueueSnackbar]
  );

  const handlePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const handleConfirmPasswordVisibility = useCallback(() => {
    setConfirmPasswordVisible((prev) => !prev);
  }, []);

  const formik = useFormik({
    initialValues: {
      role: userType,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      major: "",
      hourlyRate: "",
      cv: null,
      image: null,
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (userType === "therapist") {
          const s3ImgUploadUrlPromise = axiosInstance.get("/upload-url");
          const s3CvUploadUrlPromise = axiosInstance.get("/upload-url");

          const [s3ImgUploadUrlResponse, s3CvUploadUrlResponse] =
            await Promise.all([s3ImgUploadUrlPromise, s3CvUploadUrlPromise]);

          const s3ImgUploadUrl = s3ImgUploadUrlResponse.data;
          const s3CvUploadUrl = s3CvUploadUrlResponse.data;

          const imgUploadPromise = axios.put(s3ImgUploadUrl, values.image);
          const cvUploadPromise = axios.put(s3CvUploadUrl, values.cv, {
            headers: {
              "Content-Type": "application/pdf",
            },
          });

          await Promise.all([imgUploadPromise, cvUploadPromise]);

          const imgUrl = s3ImgUploadUrl.split("?")[0];
          const cvUrl = s3CvUploadUrl.split("?")[0];

          await axiosInstance.post("/auth/register", {
            role: values.role,
            fullName: values.username,
            email: values.email,
            password: values.password,
            major: values.major,
            hourlyRate: values.hourlyRate,
            cvLink: cvUrl,
            profileImg: imgUrl,
            phoneNumber: values.phoneNumber,
          });
          showSnackbar(
            "Registration successful! Please Check Your Email",
            "success"
          );
          navigate("/");
        } else {
          await axiosInstance.post("/auth/register", {
            role: values.role,
            fullName: values.username,
            email: values.email,
            password: values.password,
          });
          navigate("/login");
        }
      } catch (err) {
        const error = err as AxiosError;
        showSnackbar(error.message, "error");
      }
    },
  });
  const handleUserTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserType(event.target.value);
      formik.setFieldValue("role", event.target.value);
    },
    [formik]
  );

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
        if (allowedTypes.includes(file.type)) {
          formik.setFieldValue(event.target.name, file);
          if (event.target.name === "cv") {
            setCvFileName(file.name);
          } else if (event.target.name === "image") {
            setImageFileName(file.name);
          }
          showSnackbar("File uploaded successfully!", "success");
        } else {
          showSnackbar(
            "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
            "error"
          );
        }
      } else {
        showSnackbar("Failed to upload file.", "error");
      }
    },
    [formik, showSnackbar]
  );

  const textFieldStyle = {
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
  };

  const renderAdditionalFields = () => {
    if (userType === "therapist") {
      return (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ my: 3 }}>
            <Chip
              label="Professional Information"
              sx={{ color: "#516EFF", fontWeight: 600 }}
            />
          </Divider>

          <TextField
            fullWidth
            margin="normal"
            required
            id="major"
            name="major"
            label="Specialization / Major"
            placeholder="e.g., Clinical Psychology, CBT"
            value={formik.values.major}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.major && Boolean(formik.errors.major)}
            helperText={formik.touched.major && formik.errors.major}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            margin="normal"
            required
            id="hourlyRate"
            name="hourlyRate"
            label="Hourly Rate"
            placeholder="Enter your hourly rate"
            value={formik.values.hourlyRate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.hourlyRate && Boolean(formik.errors.hourlyRate)
            }
            helperText={formik.touched.hourlyRate && formik.errors.hourlyRate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            margin="normal"
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            sx={textFieldStyle}
          />

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, color: "text.secondary", fontWeight: 600 }}
            >
              Upload Required Documents
            </Typography>

            <Box sx={{ mb: 2 }}>
              <input
                accept=".pdf"
                name="cv"
                id="cv-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <label htmlFor="cv-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  startIcon={<DescriptionIcon />}
                  sx={{
                    py: 1.5,
                    borderColor: cvFileName ? "#4caf50" : "#516EFF",
                    color: cvFileName ? "#4caf50" : "#516EFF",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: cvFileName ? "#45a049" : "#3d5acc",
                      backgroundColor: cvFileName
                        ? "rgba(76, 175, 80, 0.04)"
                        : "rgba(81, 110, 255, 0.04)",
                    },
                  }}
                >
                  {cvFileName || "Upload CV (PDF)"}
                </Button>
              </label>
              {formik.touched.cv && formik.errors.cv && (
                <Typography
                  variant="caption"
                  sx={{ color: "error.main", mt: 0.5, display: "block" }}
                >
                  {formik.errors.cv}
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <input
                accept="image/*"
                id="image-upload"
                name="image"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  startIcon={<ImageIcon />}
                  sx={{
                    py: 1.5,
                    borderColor: imageFileName ? "#4caf50" : "#516EFF",
                    color: imageFileName ? "#4caf50" : "#516EFF",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: imageFileName ? "#45a049" : "#3d5acc",
                      backgroundColor: imageFileName
                        ? "rgba(76, 175, 80, 0.04)"
                        : "rgba(81, 110, 255, 0.04)",
                    },
                  }}
                >
                  {imageFileName || "Upload Profile Image"}
                </Button>
              </label>
              {formik.touched.image && formik.errors.image && (
                <Typography
                  variant="caption"
                  sx={{ color: "error.main", mt: 0.5, display: "block" }}
                >
                  {formik.errors.image}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      );
    }
    return null;
  };

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
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "background.paper",
          height: "100vh",
          overflow: "auto",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "480px",
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 4, sm: 6 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Link to="/" style={{ display: "inline-block" }}>
              <img
                src={logosrc}
                alt="NTherapy Pro logo"
                style={{
                  width: "180px",
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

          {/* Title */}
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Join our community and start your journey
            </Typography>
          </Box>

          {/* User Type Selection */}
          <Box sx={{ mb: 3 }}>
            <RadioGroup
              aria-label="User Type"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              row
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <FormControlLabel
                value="user"
                control={
                  <Radio
                    sx={{
                      color: "#516EFF",
                      "&.Mui-checked": { color: "#516EFF" },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontWeight: userType === "user" ? 600 : 400 }}
                  >
                    User
                  </Typography>
                }
              />
              <FormControlLabel
                value="therapist"
                control={
                  <Radio
                    sx={{
                      color: "#516EFF",
                      "&.Mui-checked": { color: "#516EFF" },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontWeight: userType === "therapist" ? 600 : 400 }}
                  >
                    Therapist
                  </Typography>
                }
              />
            </RadioGroup>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Signup Form */}
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              required
              id="username"
              name="username"
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              required
              id="email"
              name="email"
              label="Email Address"
              placeholder="your.email@example.com"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              required
              id="password"
              name="password"
              label="Password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="new-password"
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
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={confirmPasswordVisible ? "text" : "password"}
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {confirmPasswordVisible ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyle}
            />

            {renderAdditionalFields()}

            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              startIcon={<PersonAddIcon />}
              sx={{
                mt: 3,
                mb: 2,
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
              Create Account
            </LoadingButton>

            {/* Sign In Link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
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
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
