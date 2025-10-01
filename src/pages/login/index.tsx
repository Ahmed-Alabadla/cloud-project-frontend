/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useContext } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { enqueueSnackbar, type VariantType } from 'notistack';
import { LoadingButton } from '@mui/lab';

import {
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { userDataContext } from '../../context';
import validationSchema from './schema';
import imageSrc from '../../assets/loginImg.jpg';
import logosrc from '../../assets/img/logo.png';
import {
    boxStyle,
    textFieldStyle,
    buttonStyle,
    gridStyle,
} from './classes';
import './style.css';
import { axiosInstance } from '../../utils/apis';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { userChange, setUserChange } = useContext(userDataContext!)!;
    const showSnackbar = (message: string, severity: VariantType) => {
        enqueueSnackbar(message, { variant: severity });
    };
    const navigate = useNavigate();
    const location = useLocation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnMount: true,

        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post('/auth/login', {
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('access_token', response.data.access_token);
                setUserChange(!userChange);

                if (location.state && location.state.from) {
                    navigate(location.state.from);
                } else {
                    navigate('/');
                }
            } catch (error) {
                if (error instanceof Error) {
                    showSnackbar(error.message, 'error');
                } else {
                    showSnackbar('something went wrong', 'error');
                }
            }
        },
    });

    return (

        <Grid container component="main" sx={gridStyle}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                md={6}
                sx={{ height: 'fit-content', width: 'fit-content', overflow: 'hidden' }}
            >
                <img src={imageSrc} alt="login" className="imageLogin" />
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
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

                    <Box component="form" noValidate sx={{ mt: 5 }} onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            sx={textFieldStyle}
                            id="email"
                            name="email"
                            label="Email"
                            autoFocus
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            autoFocus
                            sx={textFieldStyle}
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={buttonStyle}
                            loading={formik.isSubmitting}
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid>
                                <Link to="/signup" className="signUpLink">
                                    Do not have an account?  Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
