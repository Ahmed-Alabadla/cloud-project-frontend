import React, { useState } from 'react';
import { useSnackbar, type VariantType } from 'notistack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { LoadingButton } from '@mui/lab';
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
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import validationSchema from './schema';
import imageSrc from '../../assets/loginImg.jpg';
import {
  boxStyle, textFieldStyle, buttonStyle, gridStyle, imageStyle, fileUploadStyle,
  errorStyle,
} from './classes';
import './style.css';
import { axiosInstance } from '../../utils/apis';
import logosrc from '../../assets/img/logo.png';

const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message:string, severity:VariantType) => {
    enqueueSnackbar(message, { variant: severity });
  };

  const [userType, setUserType] = useState('user');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [cvFileName, setCvFileName] = useState('');
  const [imageFileName, setImageFileName] = useState('');

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      role: userType,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      major: '',
      hourlyRate: '',
      cv: null,
      image: null,
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (userType === 'therapist') {
          const s3ImgUploadUrlPromise = axiosInstance.get('/upload-url');
          const s3CvUploadUrlPromise = axiosInstance.get('/upload-url');

          const [s3ImgUploadUrlResponse, s3CvUploadUrlResponse] = await Promise.all([
            s3ImgUploadUrlPromise,
            s3CvUploadUrlPromise,
          ]);

          const s3ImgUploadUrl = s3ImgUploadUrlResponse.data;
          const s3CvUploadUrl = s3CvUploadUrlResponse.data;

          const imgUploadPromise = axios.put(s3ImgUploadUrl, values.image);
          const cvUploadPromise = axios.put(s3CvUploadUrl, values.cv, {
            headers: {
              'Content-Type': 'application/pdf',
            },
          });

          await Promise.all([imgUploadPromise, cvUploadPromise]);

          const imgUrl = s3ImgUploadUrl.split('?')[0];
          const cvUrl = s3CvUploadUrl.split('?')[0];

          await axiosInstance.post('/auth/register', {
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
          showSnackbar('Registration successful! Please Check Your Email', 'success');
          navigate('/');
        } else {
          await axiosInstance.post('/auth/register', {
            role: values.role,
            fullName: values.username,
            email: values.email,
            password: values.password,
          });
          navigate('/login');
        }
      } catch (err) {
        const error = err as AxiosError;
        showSnackbar(error.message, 'error');
      }
    },
  });
  const handleUserTypeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
    formik.setFieldValue('role', event.target.value);
  };
  const handleFileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        formik.setFieldValue(event.target.name, file);
        if (event.target.name === 'cv') {
          setCvFileName(file.name);
        } else if (event.target.name === 'image') {
          setImageFileName(file.name);
        }
        showSnackbar('File uploaded successfully!', 'success');
      } else {
        showSnackbar('Invalid file type. Please upload a PDF, JPEG, or PNG file.', 'error');
      }
    } else {
      showSnackbar('Failed to upload file.', 'error');
    }
  };

  const renderAdditionalFields = () => {
    if (userType === 'therapist') {
      return (
        <>
          <TextField
            margin="normal"
            required
            sx={textFieldStyle}
            id="major"
            name="major"
            label="major"
            onChange={formik.handleChange}
            error={formik.touched.major && Boolean(formik.errors.major)}
            helperText={formik.touched.major && formik.errors.major}
          />
          <TextField
            margin="normal"
            required
            sx={textFieldStyle}
            id="hourlyRate"
            name="hourlyRate"
            label="Hourly Rate"
            onChange={formik.handleChange}
            error={formik.touched.hourlyRate && Boolean(formik.errors.hourlyRate)}
            helperText={formik.touched.hourlyRate && formik.errors.hourlyRate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            sx={textFieldStyle}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <label htmlFor="file-upload">
            <input
              accept=".pdf"
              name="cv"
              id="file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}

            />
            <Button
              variant="contained"
              component="span"
              style={fileUploadStyle}
            >
              {cvFileName || 'Upload CV'}
            </Button>
          </label>
          {formik.touched.cv && formik.errors.cv && (
          <Typography
            sx={errorStyle}
          >
            {formik.errors.cv}
          </Typography>
          )}

          <label htmlFor="img-upload">
            <input
              accept="image/*"
              id="img-upload"
              name="image"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button variant="contained" component="span" style={fileUploadStyle}>
              {imageFileName || 'Upload Image'}
            </Button>
          </label>
          {formik.touched.image && formik.errors.image && (
          <Typography
            sx={errorStyle}
          >
            {formik.errors.image}
          </Typography>
          )}
        </>
      );
    }
    return null;
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Grid container component="main" sx={gridStyle}>
      <CssBaseline />
      <Grid style={{ height: 'fit-content', width: 'fit-content', overflow: 'hidden' }} item xs={false} md={6}>
        <img src={imageSrc} alt="login" className="imageLogin" style={imageStyle} />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        square
        style={{ height: '100vh', overflow: 'auto', overflowX: 'hidden' }}
      >
        <Box sx={{ ...boxStyle, margin: '50px 0 0', px: '0.5rem' }}>
          <Link to="/">
            <img src={logosrc} alt="login" style={{ width: '250px', cursor: 'pointer' }} />
          </Link>

          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <RadioGroup
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              aria-label="userType"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              row
            >
              <FormControlLabel
                style={{ margin: '10px' }}
                value="user"
                control={<Radio />}
                label="user"
                labelPlacement="end"
              />

              <FormControlLabel
                style={{ margin: '10px' }}
                value="therapist"
                control={<Radio />}
                label="therapist"
                labelPlacement="end"
              />
            </RadioGroup>
            <TextField
              margin="normal"
              required
              sx={textFieldStyle}
              id="username"
              name="username"
              label="Full Name"
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              sx={textFieldStyle}
              id="email"
              name="email"
              label="Email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              sx={textFieldStyle}
              id="password"
              name="password"
              label="Password"
              type={passwordVisible ? 'text' : 'password'}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              sx={textFieldStyle}
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={confirmPasswordVisible ? 'text' : 'password'}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleConfirmPasswordVisibility}
                    >
                      {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {renderAdditionalFields()}
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={buttonStyle}
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Join us
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/login" className="LinkSignIn">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
