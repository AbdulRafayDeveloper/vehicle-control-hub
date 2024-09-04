import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Container, Grid, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import FormField from "../../components/InputField/FormField";
import {
  addVehicles,
  fetchVehiclesById,
  updateVehicles,
} from "../../../core/api/vehicles";
import notyf from "../../components/NotificationMessage/notyfInstance";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";

const VehicleForm = ({ edit }) => {
  const initialValues = {
    type: "sedan",
    make: "2020",
    model: "2020",
    year: "2020",
    chassis_number: "123454321",
    mileage: "1000",
    damage_details: "not-any",
    transmission: "5",
    color: "blue",
    engine: "1299",
    status: "avaliable",
    document_name: "sedan-2020-doc",
    image: "http://sedan-image/1",
    grade: "2",
    score: "9.5",
    displacement: "200",
    start_price: "1000.4",
    end_price: "2000.2",
    auction_result: "successful",
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Required"),
    make: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    year: Yup.string().required("Required"),
    chassis_number: Yup.string().required("Required"),
    mileage: Yup.string().required("Required"),
    damage_details: Yup.string().required("Required"),
    transmission: Yup.string().required("Required"),
    color: Yup.string().required("Required"),
    engine: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    document_name: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    grade: Yup.string().required("Required"),
    score: Yup.string().required("Required"),
    displacement: Yup.string().required("Required"),
    start_price: Yup.string().required("Required"),
    end_price: Yup.string().required("Required"),
    auction_result: Yup.string().required("Required"),
  });

  const options = {
    type: ["sedan", "suv", "truck"],
    transmission: ["5", "6", "7"],
    status: ["avaliable", "sold"],
    color: ["blue", "red", "green"],
    auction_result: ["successful", "unsuccessful"],
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [startValues, setStartValues] = useState(initialValues);

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSubmit = async (values) => {
    if (edit) {
      const payload = {
        ...values,
        fk_user_id: "2",
        fk_container_id: "1",
      };
      try {
        const response = await updateVehicles(id, payload);
        console.log("response", response);
        notyf.success("Update Vehicle Successfully");
        navigate("/vehicle-listing");
      } catch (error) {
        console.log(error);
      }
    } else {
      const payload = {
        ...values,
        fk_user_id: "2",
        fk_container_id: "1",
      };
      try {
        const response = await addVehicles(payload);
        console.log("response", response);
        notyf.success("Add Vehicle Successfully");
        navigate("/vehicle-listing");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchSingleVehicle = async () => {
    try {
      const response = await fetchVehiclesById(id);
      setStartValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleVehicle();
    }
  }, [id]);
  return (
    <Container
      style={{
        maxHeight: "calc(100vh - 120px)",
        margin: "1rem",
        overflow: "auto",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        <Typography variant="h4" gutterBottom>
          Vehicle Information
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
                        [
                          "type",
                          "transmission",
                          "status",
                          "color",
                          "auction_result",
                        ].includes(field)
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
                  {edit ? "Update" : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default VehicleForm;
