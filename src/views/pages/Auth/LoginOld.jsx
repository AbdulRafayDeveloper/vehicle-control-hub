import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Helmet } from 'react-helmet';
import { login } from '../../../core/store/auth/authThunks';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
    AuthFooter,
    AuthMainContainer,
    AuthSection,
    FormContainer,
    AuthTitle,
    StyledCheckboxStack,
} from '../Auth/Components/Styles';
import FormField from '../../components/InputField/FormField';
import { CLEAR_API_ERRORS } from '../../../core/store/auth/authSlice';
import { MenuItem } from '@mui/material';
import { Phone } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //     .email('Invalid email format')
	//     .required('Email is required'),
	phonenumber: Yup.string().required('Phone Number is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    role: Yup.string().required('Role is required'),
});

const initialValues = {
    phonenumber: '',
    password: '',
    role: 'admin', // Default role value, adjust as needed
};

export default function Login() {
    const [showAlert, setShowAlert] = useState(true);
    const [credentials, setCredentials] = useState('');
    const apiError = useSelector(state => state?.auth?.apiError);
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(login(values));
        } catch (e) {
            console.log('login error', e);
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const updatedErrors = {};
    useEffect(() => {
        if (Object.values(formik.errors).length > 0) setCredentials('');
    }, [formik.errors]);

    useEffect(() => {
        return () => {
            dispatch(CLEAR_API_ERRORS());
        };
    }, []);

    useEffect(() => {
        if (apiError)
            if (apiError.data && apiError.data.message) {
                const errorMessage = apiError.data.message;
                if (errorMessage.credentials && errorMessage.credentials.length > 0) {
                    setCredentials(errorMessage.credentials[0]);
                    setShowAlert(true);
                } else {
                    const error = apiError?.data?.errors;

                    const phonenumber = error?.phonenumber;
                    const password = error?.password;
                    if (phonenumber && phonenumber.length > 0) {
                        updatedErrors.phonenumber = phonenumber[0];
                    }
                    if (password && password.length > 0) {
                        updatedErrors.password = password[0];
                    }
                }
                formik.setErrors(updatedErrors);
            }
    }, [apiError]);

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    return (
        <AuthMainContainer>
            <Helmet>
                <title>Login - BTIS</title>
                <meta name="description" content="Login to access your account on BITS." />
                <meta name="keywords" content="login, BITS, user account, authentication" />
            </Helmet>
            <Grid container>
                <Grid item container display='flex' justifyContent='center'>
                    <Grid item>
                        <AuthSection>
                            <FormContainer>
                                {apiError &&
                                    credentials &&
                                    !credentials.includes('phonenumber') &&
                                    showAlert && (
                                        <Alert severity='error' onClose={handleAlertClose}>
                                            {`${credentials}.. your phonenumber or password is incorrect`}
                                        </Alert>
                                    )}
                                <AuthTitle variant='h4' component='h1'>
                                    Login
                                </AuthTitle>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormField
                                        type='text'
                                        name='phonenumber'
                                        fullWidth
                                        size='small'
                                        label='Phone Number'
                                        isTouched={formik.touched.phonenumber}
                                        onBlur={formik.handleBlur}
                                        style={{ margin: '20px 0' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Phone fontSize='small' />
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={formik.values.phonenumber}
                                        error={
                                            (formik.touched.phonenumber &&
                                                formik.errors.phonenumber &&
                                                formik.errors.phonenumber) ||
                                            (apiError?.phonenumber && apiError.phonenumber) ||
                                            (credentials.includes('phonenumber') && credentials)
                                        }
                                        handleChange={formik.handleChange}
                                    />
                                    <FormField
                                        fullWidth
                                        size='small'
                                        type='password'
                                        label='Password'
                                        name='password'
                                        password
                                        isTouched={formik.touched.password}
                                        onBlur={formik.handleBlur}
                                        variant='outlined'
                                        sx={{ marginY: '.8rem' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <LockIcon fontSize='small' />
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={formik.values.password}
                                        error={
                                            (formik.touched.password &&
                                                formik.errors.password &&
                                                formik.errors.password) ||
                                            (apiError?.password && apiError.password)
                                        }
                                        handleChange={formik.handleChange}
                                    />
                                    <FormField
                                        type='text'
                                        label='Role'
                                        placeholder='Select Role'
                                        name='role'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        select
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <KeyboardBackspaceIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={formik.values.role}
                                        error={
                                            (formik.touched.role &&
                                                formik.errors.role &&
                                                formik.errors.role) ||
                                            (apiError?.role && apiError.role)
                                        }
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='employee'>Employee</MenuItem>
                                        <MenuItem value='customer'>Customer</MenuItem>
                                    </FormField>
                                    <StyledCheckboxStack>
                                        <Checkbox
                                            size='small'
                                            checked={formik.values.remember}
                                            onChange={formik.handleChange}
                                            name='remember'
                                        />
                                        <Typography variant='body2'>Remember</Typography>
                                    </StyledCheckboxStack>
                                    <LoadingButton
                                        type='submit'
                                        disabled={formik.isSubmitting}
                                        loading={formik.isSubmitting}
                                        variant='contained'
                                        fullWidth
                                    >
                                        Login
                                    </LoadingButton>
                                </form>
                                <AuthFooter>
                                    <Button
                                        variant='text'
                                        component={RouterLink}
                                        to='/register'
                                        size='small'
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Button
                                        variant='text'
                                        component={RouterLink}
                                        to='/reset-password'
                                        size='small'
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        Forgot Password
                                    </Button>
                                </AuthFooter>
                            </FormContainer>
                        </AuthSection>
                    </Grid>
                </Grid>
            </Grid>
        </AuthMainContainer>
    );
}
