import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import FormField from "../../components/InputField/FormField";
import {
  addContainer,
  updateContainer,
  fetchContainerById,
} from "../../../core/api/containers";
import notyf from "../../components/NotificationMessage/notyfInstance";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Close } from '@mui/icons-material';

const ContainerForm = ({ edit }) => {
  const initialValues = {
    container_number: "123",
    bl_number: "",
    container_weight: "",
    volume: "",
    container_type: "high cube",
    origin: "japan",
    status: "loaded",
    expected_arrival: "monday",
    actual_arrival: "tuesday",
    document_url:
      "https://live.mdnplay.dev/en-US/docs/Web/API/Document/URL/runner.html?id=examples",
    freight_price: "",
    drayage_price: "",
    loading_price: "",
    port_price: "",
  };

  const validationSchema = Yup.object().shape({
    container_number: Yup.string().required("Required"),
    bl_number: Yup.string().required("Required"),
    container_weight: Yup.string().required("Required"),
    volume: Yup.string().required("Required"),
    container_type: Yup.string().required("Required"),
    origin: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    expected_arrival: Yup.string().required("Required"),
    actual_arrival: Yup.string().required("Required"),
    document_url: Yup.string().url("Invalid URL").required("Required"),
    freight_price: Yup.string().required("Required"),
    drayage_price: Yup.string().required("Required"),
    loading_price: Yup.string().required("Required"),
    port_price: Yup.string().required("Required"),
  });

  const options = {
    container_type: ["high cube", "standard", "open top"],
    status: ["loaded", "unloaded"],
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [startValues, setStartValues] = useState(initialValues);
  const fetchSingleContainer = async () => {
    try {
      const response = await fetchContainerById(id);
      setStartValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleContainer();
    }
  }, [id]);
  const handleSubmit = async (values) => {
    if (edit) {
      const payload = {
        ...values,
      };
      try {
        const response = await updateContainer(id, payload);
        console.log("response", response);
        notyf.success("Container added successfully");
        navigate("/containers");
      } catch (error) {
        console.log(error);
        notyf.error("Failed to add container");
      }
    } else {
      const payload = {
        ...values,
      };
      try {
        const response = await addContainer(payload);
        console.log("response", response);
        notyf.success("Container added successfully");
        navigate("/containers");
      } catch (error) {
        console.log(error);
        notyf.error("Failed to add container");
      }
    }
  };
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <Container
      style={{
        maxHeight: "calc(100vh - 120px)",
        margin: "1rem",
        overflow: "auto",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Typography variant="h4" gutterBottom>
          Container Information
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Formik
        enableReinitialize
        initialValues={startValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              {Object.keys(initialValues).map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={field}
                  container
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      align="left"
                      sx={{ paddingLeft: 1 }}
                    >
                      {field
                        .replace(/_/g, " ")
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <FormField
                      id={field}
                      name={field}
                      type={
                        ["container_type", "status"].includes(field)
                          ? "select"
                          : "text"
                      }
                      value={values[field]}
                      options={
                        options[field]
                          ? options[field].map((opt) => ({
                              value: opt,
                              text: opt,
                            }))
                          : []
                      }
                      handleChange={handleChange}
                      error={touched[field] && errors[field]}
                      isTouched={touched[field]}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} container justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  {edit ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ContainerForm;
