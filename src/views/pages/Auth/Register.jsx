import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Typography,
  InputAdornment,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  MenuItem,
  useMediaQuery,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import FormField from "../../components/InputField/FormField"; // Adjust import based on your FormField component
import { register } from "../../../core/store/auth/authThunks";
import { CLEAR_API_ERRORS } from "../../../core/store/auth/authSlice";
import FacebookLogo from "/src/assets/facebook.jpg";
import GoogleLogo from "/src/assets/google.png";
import AppleLogo from "/src/assets/apple.png";
import { Container, FormWrapper } from "./Components/Styles";

const accountValidationSchema = Yup.object().shape({
  username: Yup.string().required("User Name is required"),
  phonenumber: Yup.string().required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
  mfa_enabled: Yup.boolean(),
  terms_agreement: Yup.boolean(),
});

export default function Register() {
  const query = useMediaQuery("(max-width:1150px)");
  const navigate = useNavigate();
  const apiError = useSelector((state) => state?.auth?.apiError);
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccountSubmit = async (values, { setSubmitting }) => {
    const combinedValues = {
      ...values,
      mfa_enabled: values.mfa_enabled ? "Yes" : "No",
      terms_agreement: values.terms_agreement ? "Yes" : "No",
      role: values.role || "admin",
    };

    const cb = (params) => {
      if (params === "catch") {
        setLoading(false);
      } else {
        accountFormik.resetForm();
        setLoading(false);
        navigate("/login");
      }
    };

    try {
      setLoading(true);
      dispatch(register(combinedValues, cb));
      setSubmitting(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const accountFormik = useFormik({
    initialValues: {
      username: "",
      phonenumber: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "employee",
      mfa_enabled: false,
      terms_agreement: false,
    },
    validationSchema: accountValidationSchema,
    onSubmit: handleAccountSubmit,
  });

  useEffect(() => {
    if (apiError) {
      const { email, username, phonenumber, password } = apiError;
      const updatedAccountError = {};
      if (username?.length) updatedAccountError.username = username[0];
      if (phonenumber?.length) updatedAccountError.phonenumber = phonenumber[0];
      if (password?.length) {
        updatedAccountError.password = password[0];
        if (password[0].includes("confirmation")) {
          updatedAccountError.confirm_password = "Password not matched";
        }
      }
      if (email?.length) updatedAccountError.email = email[0];
      accountFormik.setErrors(updatedAccountError);
    }
  }, [apiError]);

  useEffect(() => {
    return () => {
      dispatch(CLEAR_API_ERRORS());
    };
  }, [dispatch]);

  const togglePasswordVisibility = () => setShowPass((prev) => !prev);

  return (
    <>
      <Container>
        <FormWrapper>
          <Helmet>
            <title>Create Your Account - BTIS</title>
            <meta
              name="description"
              content="Create your account or join a company. Start your journey with us!"
            />
          </Helmet>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                backgroundImage: `url('/src/assets/signup1.png')`,
                backgroundSize: query ? "cover" : "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <form onSubmit={accountFormik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                      Sign Up
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ textAlign: "left" }}
                    >
                      Let's get you all set up so you can access your personal
                      account.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="User Name"
                      name="username"
                      isTouched={accountFormik.touched.username}
                      placeholder="User Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={accountFormik.values.username}
                      error={accountFormik.errors.username}
                      onBlur={accountFormik.handleBlur}
                      onChange={accountFormik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="email"
                      label="Email Address"
                      name="email"
                      placeholder="abc@xyz.com"
                      variant="outlined"
                      size="small"
                      isTouched={accountFormik.touched.email}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={accountFormik.values.email}
                      error={accountFormik.errors.email}
                      onBlur={accountFormik.handleBlur}
                      onChange={accountFormik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Phone Number"
                      name="phonenumber"
                      placeholder="Phone Number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      isTouched={accountFormik.touched.phonenumber}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={accountFormik.values.phonenumber}
                      error={accountFormik.errors.phonenumber}
                      onBlur={accountFormik.handleBlur}
                      onChange={accountFormik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      type="text"
                      label="Role"
                      name="role"
                      placeholder="Select Role"
                      variant="outlined"
                      size="small"
                      fullWidth
                      select
                      isTouched={accountFormik.touched.role}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyboardBackspaceIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={accountFormik.values.role}
                      error={accountFormik.errors.role}
                      onBlur={accountFormik.handleBlur}
                      onChange={accountFormik.handleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="employee">Employee</MenuItem>
                      <MenuItem value="customer">Customer</MenuItem>
                    </FormField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      type={showPass ? "text" : "password"}
                      label="Password"
                      name="password"
                      placeholder="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      isTouched={accountFormik.touched.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={accountFormik.values.password}
                      error={accountFormik.errors.password}
                      onBlur={accountFormik.handleBlur}
                      onChange={accountFormik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      type={showPass ? "text" : "password"}
                      label="Confirm Password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      isTouched={accountFormik.touched.confirm_password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={accountFormik.values.confirm_password}
                      error={accountFormik.errors.confirm_password}
                      onBlur={accountFormik.handleBlur}
                      onChange={accountFormik.handleChange}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={accountFormik.values.mfa_enabled}
                          onChange={accountFormik.handleChange}
                          name="mfa_enabled"
                        />
                      }
                      label="Enable Two-Factor Authentication"
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={accountFormik.values.terms_agreement}
                          onChange={accountFormik.handleChange}
                          name="terms_agreement"
                        />
                      }
                      label="I agree to the Terms and Conditions"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading || !accountFormik.isValid}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="body2">
                      Already have an account?{" "}
                      <RouterLink to="/login">Sign In</RouterLink>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
                  <Divider style={{ flex: 1 }} />
                    <Typography variant="body2" style={{ margin: "0 10px" }}>Or Sign Up with </Typography>
                    <Divider style={{ flex: 1 }} />
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    spacing={2}
                    style={{ marginTop: "20px" }}
                  >
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          color: "white",
                          borderColor: "white",
                          backgroundColor: "white",
                          padding: "10px 30px",
                          border: "1px solid blue",
                          "&:hover": { backgroundColor: "white" }, // Optional: Facebook blue
                        }}
                      >
                        <img
                          src={FacebookLogo}
                          alt="Facebook"
                          style={{ width: "24px", marginRight: "8px" }}
                        />
                        {/* Facebook */}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          color: "white",
                          borderColor: "white",
                          backgroundColor: "white",
                          padding: "10px 30px",
                          border: "1px solid blue",
                          "&:hover": { backgroundColor: "white" }, // Optional: Google blue
                        }}
                      >
                        <img
                          src={GoogleLogo}
                          alt="Google"
                          style={{ width: "24px", marginRight: "8px" }}
                        />
                        {/* Google */}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          color: "white",
                          borderColor: "white",
                          backgroundColor: "white",
                          padding: "10px 30px",
                          border: "1px solid blue",
                          "&:hover": { backgroundColor: "white" }, // Optional: Apple black
                        }}
                      >
                        <img
                          src={AppleLogo}
                          alt="Apple"
                          style={{ width: "24px", marginRight: "8px" }}
                        />
                        {/* Apple */}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </FormWrapper>
      </Container>
    </>
  );
}
