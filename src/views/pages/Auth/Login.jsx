import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  Grid,
  InputAdornment,
  MenuItem,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../../../core/store/auth/authThunks";
import { CLEAR_API_ERRORS } from "../../../core/store/auth/authSlice";
import FacebookLogo from "/src/assets/facebook.jpg";
import GoogleLogo from "/src/assets/google.png";
import AppleLogo from "/src/assets/apple.png";
import { Container, FormWrapperLogin } from "./Components/Styles";

const validationSchema = Yup.object({
  phonenumber: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: Yup.string().required("Role is required"),
});

const initialValues = {
  phonenumber: "",
  password: "",
  role: "admin",
};

export default function LoginForm() {
    const query = useMediaQuery("(max-width:1150px)");
  const [showAlert, setShowAlert] = useState(true);
  const [credentials, setCredentials] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const apiError = useSelector((state) => state?.auth?.apiError);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values));
    } catch (e) {
      console.log("login error", e);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (Object.values(formik.errors).length > 0) setCredentials("");
  }, [formik.errors]);

  useEffect(() => {
    return () => {
      dispatch(CLEAR_API_ERRORS());
    };
  }, [dispatch]);

  useEffect(() => {
    if (apiError && apiError.data?.message) {
      const errorMessage = apiError.data.message;
      if (errorMessage.credentials?.length > 0) {
        setCredentials(errorMessage.credentials[0]);
        setShowAlert(true);
      } else {
        const { phonenumber, password } = apiError.data.errors || {};
        if (phonenumber?.length > 0) {
          formik.setFieldError("phonenumber", phonenumber[0]);
        }
        if (password?.length > 0) {
          formik.setFieldError("password", password[0]);
        }
      }
    }
  }, [apiError, formik]);

  return (
    <Container
    style={{
        backgroundImage: `url('/src/assets/login-background.png')`,
        backgroundSize: query ? "cover" : "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <FormWrapperLogin>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" gutterBottom>
          Login to access your BigStar account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phonenumber"
            variant="outlined"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
            }
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
          />
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <Visibility
                      onClick={() => setShowPassword(false)}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => setShowPassword(true)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            fullWidth
            margin="normal"
            label="Role"
            name="role"
            variant="outlined"
            select
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </TextField>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  sx={{ color: "white" }}
                />
              }
              label="Remember me"
            />
            <Button
              variant="text"
              to="/reset-password"
              component={RouterLink}
              sx={{ color: "white", textDecorationLine: "underline" }}
            >
              Forgot Password
            </Button>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            Don’t have an account?{" "}
            <Button
              component={RouterLink}
              to="/register"
              variant="text"
              sx={{ color: "white", textDecorationLine: "underline" }}
            >
              Sign up
            </Button>
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
        </form>
      </FormWrapperLogin>
    </Container>
  );
}
