import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Alert,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  BugReport as BugReportIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import type { AxiosError } from "axios";
import { axiosInstance } from "../../utils/apis";

// Priority configuration
const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "#4caf50" },
  { value: "medium", label: "Medium", color: "#ff9800" },
  { value: "high", label: "High", color: "#f44336" },
] as const;

// Success message component
const SuccessMessage = ({ onGoHome }: { onGoHome: () => void }) => (
  <Paper
    elevation={3}
    sx={{
      p: 6,
      textAlign: "center",
      maxWidth: 600,
      mx: "auto",
      borderRadius: 3,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
    }}
  >
    <CheckCircleIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
    <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
      Thank You!
    </Typography>
    <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.8 }}>
      Your bug report has been submitted successfully. Our team will review it
      and work on resolving the issue as soon as possible.
    </Typography>
    <LoadingButton
      variant="contained"
      size="large"
      startIcon={<HomeIcon />}
      onClick={onGoHome}
      sx={{
        backgroundColor: "#fff",
        color: "#667eea",
        px: 4,
        py: 1.5,
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      Go to Homepage
    </LoadingButton>
  </Paper>
);

export default function BugReportPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, priority: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "warning",
      });
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.post("/bugs", {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
      });
      setIsSubmitted(true);
      enqueueSnackbar("Bug report submitted successfully!", {
        variant: "success",
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit bug report";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isSubmitted) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <SuccessMessage onGoHome={handleGoHome} />
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Box
              sx={{
                backgroundColor: "#5885ff",
                borderRadius: 2,
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BugReportIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#2c3e50" }}
              >
                Report a Bug
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 0.5 }}>
                Help us improve by reporting any issues you encounter
              </Typography>
            </Box>
          </Stack>

          {/* Info Alert */}
          <Alert severity="info" sx={{ mb: 4 }}>
            Please provide as much detail as possible to help us understand and
            resolve the issue quickly.
          </Alert>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              {/* Title Field */}
              <TextField
                fullWidth
                required
                label="Bug Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief description of the issue"
                variant="outlined"
                InputLabelProps={{
                  sx: { fontWeight: 500 },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#5885ff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5885ff",
                    },
                  },
                }}
              />

              {/* Description Field */}
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Detailed Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please describe the bug in detail, including steps to reproduce it..."
                variant="outlined"
                InputLabelProps={{
                  sx: { fontWeight: 500 },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#5885ff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5885ff",
                    },
                  },
                }}
              />

              {/* Priority Field */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontWeight: 500 }}>Priority Level</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={handlePriorityChange}
                  label="Priority Level"
                  sx={{
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#5885ff",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#5885ff",
                    },
                  }}
                >
                  {PRIORITY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Chip
                          size="small"
                          label={option.label}
                          sx={{
                            backgroundColor: option.color,
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<BugReportIcon />}
                sx={{
                  backgroundColor: "#5885ff",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3d5acc",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#b0b8e8",
                  },
                }}
              >
                {isLoading ? "Submitting..." : "Submit Bug Report"}
              </LoadingButton>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
