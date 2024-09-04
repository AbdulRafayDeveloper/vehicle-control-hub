import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import FacebookLogo from "/src/assets/facebook.jpg";
import GoogleLogo from "/src/assets/google.png";
import AppleLogo from "/src/assets/apple.png";
import {
  AuthMainContainer,
  AuthSection,
  FormContainer,
  AuthTitle,
} from "../Auth/Components/Styles";

import FormField from "../../components/InputField/FormField"; // Adjust import based on your FormField component
import { register } from "../../../core/store/auth/authThunks";
import { CLEAR_API_ERRORS } from "../../../core/store/auth/authSlice";
import { Helmet } from "react-helmet";
import { Phone } from "@mui/icons-material";
import { Checkbox, FormControlLabel, MenuItem } from "@mui/material";

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
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
  mfa_enabled: Yup.boolean(),
  terms_agreement: Yup.boolean(),
});

export default function Register() {
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
      role: values.role || "admin", // Default to admin if role is not selected
    };

    function cb(params) {
      if (params === "catch") {
        setLoading(false);
      } else {
        accountFormik.resetForm();
        setLoading(false);
        navigate("/login");
      }
    }

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
      role: "", // Added role field to initialValues
      mfa_enabled: false, // Default to false
      terms_agreement: false, // Default to false
    },
    validationSchema: accountValidationSchema,
    onSubmit: handleAccountSubmit,
  });

  // Backend API error handling with specific field errors
  useEffect(() => {
    if (apiError) {
      const { email, username, phonenumber, password, confirm_password } =
        apiError;
      const updatedAccountError = {};
      if (username && username.length > 0) {
        updatedAccountError.username = username[0];
      }
      if (phonenumber && phonenumber.length > 0) {
        updatedAccountError.phonenumber = phonenumber[0];
      }
      if (
        password &&
        password.length > 0 &&
        !password[0].includes("confirmation")
      ) {
        updatedAccountError.password = password[0];
      }
      if (
        password &&
        password.length > 0 &&
        password[0].includes("confirmation")
      ) {
        updatedAccountError.confirm_password = "Password not matched";
      }
      if (email && email.length > 0) {
        updatedAccountError.email = email[0];
      }
      accountFormik.setErrors(updatedAccountError);
    }
  }, [apiError]);

  // Clear API errors on component unmount
  useEffect(() => {
    return () => {
      dispatch(CLEAR_API_ERRORS());
    };
  }, []);
  return (
    <>
      <AuthMainContainer>
        <Helmet>
          <title>Create Your Account - BTIS</title>
          <meta
            name="description"
            content="Create your account or join a company. Start your journey with us!"
          />
        </Helmet>
        <Grid container>
          <Grid container display="flex" justifyContent="center">
            <AuthSection>
              <FormContainer>
                <form onSubmit={accountFormik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <AuthTitle variant="h6" component="body1">
                        Sign Up
                      </AuthTitle>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ textAlign: "left" }}
                      >
                        Let's get you all sit up so you can access your personal
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
                        error={
                          (accountFormik.touched.username &&
                            accountFormik.errors.username &&
                            accountFormik.errors.username) ||
                          (apiError?.username && apiError.username)
                        }
                        onBlur={accountFormik.handleBlur}
                        onChange={accountFormik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        type="email"
                        label="Email Address"
                        variant="outlined"
                        placeholder=" abc@xyz.com"
                        isTouched={accountFormik.touched.email}
                        size="small"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        name="email"
                        value={accountFormik.values.email}
                        error={
                          (accountFormik.touched.email &&
                            accountFormik.errors.email &&
                            accountFormik.errors.email) ||
                          (apiError?.email && apiError.email)
                        }
                        onBlur={accountFormik.handleBlur}
                        onChange={accountFormik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        type="text"
                        label="Phone Number"
                        placeholder="Phone Number"
                        name="phonenumber"
                        isTouched={accountFormik.touched.phonenumber}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        value={accountFormik.values.phonenumber}
                        error={
                          (accountFormik.touched.phonenumber &&
                            accountFormik.errors.phonenumber &&
                            accountFormik.errors.phonenumber) ||
                          (apiError?.phonenumber && apiError.phonenumber)
                        }
                        onBlur={accountFormik.handleBlur}
                        onChange={accountFormik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        type="text"
                        label="Role"
                        placeholder="Select Role"
                        name="role"
                        isTouched={accountFormik.touched.role}
                        variant="outlined"
                        size="small"
                        fullWidth
                        select
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyboardBackspaceIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={accountFormik.values.role}
                        error={
                          (accountFormik.touched.role &&
                            accountFormik.errors.role &&
                            accountFormik.errors.role) ||
                          (apiError?.role && apiError.role)
                        }
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
                        password
                        placeholder="Password"
                        variant="outlined"
                        size="small"
                        isTouched={accountFormik.touched.password}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        name="password"
                        value={accountFormik.values.password}
                        error={
                          (accountFormik.touched.password &&
                            accountFormik.errors.password &&
                            accountFormik.errors.password) ||
                          (apiError?.password && apiError.password)
                        }
                        onBlur={accountFormik.handleBlur}
                        onChange={accountFormik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormField
                        type={showPass ? "text" : "password"}
                        label="Confirm Password"
                        variant="outlined"
                        placeholder=" Confirm Password"
                        size="small"
                        isTouched={accountFormik.touched.confirm_password}
                        password
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        name="confirm_password"
                        value={accountFormik.values.confirm_password}
                        error={
                          (accountFormik.touched.confirm_password &&
                            accountFormik.errors.confirm_password &&
                            accountFormik.errors.confirm_password) ||
                          (apiError?.confirm_password &&
                            apiError.confirm_password)
                        }
                        onBlur={accountFormik.handleBlur}
                        onChange={accountFormik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="mfa_enabled"
                            checked={accountFormik.values.mfa_enabled}
                            onChange={accountFormik.handleChange}
                            color="primary"
                          />
                        }
                        label="Enable MFA"
                        sx={{ display: "flex", alignItems: "center" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="terms_agreement"
                            checked={accountFormik.values.terms_agreement}
                            onChange={accountFormik.handleChange}
                            color="primary"
                          />
                        }
                        label=" I agree to all Terms and Privacy Policies"
                        sx={{ display: "flex", alignItems: "center" }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ marginY: 2 }}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress color="inherit" size={24} />
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        Already have an account?{" "}
                        <RouterLink to="/login">Login</RouterLink>
                      </Typography>
                    </Grid>
                    <Typography variant="body2"gutterBottom sx={{textAlign: "center"}}>
                     Or Sign Up with
                    </Typography>
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
                            padding: "10px 20px",
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
                            padding: "10px 20px",
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
                            padding: "10px 20px",
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
              </FormContainer>
            </AuthSection>
          </Grid>
        </Grid>
      </AuthMainContainer>
    </>
  );
}
