import { useSnackbar, type VariantType } from "notistack";
import { useContext } from "react";
import { userDataContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { axiosInstance } from "../../utils/apis";
import type { AxiosError } from "axios";
import { Box, Container, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { formContainer, loginContainer } from "./style";
import adminSchema from "./adminSchema";

export default function LoginAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const userContext = useContext(userDataContext);

  const showSnackbar = (message: string, severity: VariantType) => {
    enqueueSnackbar(message, { variant: severity });
  };
  const navigate = useNavigate();
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
        navigate("/admin");
      } catch (e) {
        const error = e as AxiosError;
        showSnackbar(error.message, "error");
      }
    },
  });

  return (
    <Container sx={formContainer}>
      <Box sx={{ width: "500px" }}>
        <img className="logo" src="https://imgur.com/uXh9MXM.png" alt="logo" />
      </Box>
      <Box sx={loginContainer}>
        <TextField
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{ width: "90%", margin: "auto" }}
          onChange={formik.handleChange}
          value={formik.values.username}
          id="outlined-password-input"
          label="User"
          type="user"
          name="username"
          required
          autoComplete="current-password"
        />
        <TextField
          sx={{ width: "90%", margin: "auto" }}
          onChange={formik.handleChange}
          required
          value={formik.values.password}
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <LoadingButton
          loading={formik.isSubmitting}
          disabled={!formik.isValid || formik.isSubmitting}
          sx={{ width: "90%", padding: "15px", margin: "auto" }}
          onClick={() => formik.handleSubmit()}
          variant="contained"
        >
          login
        </LoadingButton>
      </Box>
    </Container>
  );
}
