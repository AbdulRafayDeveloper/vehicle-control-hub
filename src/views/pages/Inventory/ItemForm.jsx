import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Container, Grid, Typography, IconButton } from "@mui/material";
import FormField from "../../components/InputField/FormField";
import { addItem, updateItem, getItemById } from "../../../core/api/items";
import notyf from "../../components/NotificationMessage/notyfInstance";
import { useNavigate, useParams } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";

const ItemForm = ({ edit }) => {
  const initialValues = {
    transaction_id: "",
    customer_id: "",
    item_type: "",
    item_name: "",
    chassis_number: "",
    quantity: "",
    notes: "",
    offer_price: "",
    status: "",
    category: "",
  };

  const validationSchema = Yup.object().shape({
    transaction_id: Yup.string().required("Required"),
    customer_id: Yup.string().required("Required"),
    item_type: Yup.string().required("Required"),
    item_name: Yup.string().required("Required"),
    chassis_number: Yup.string().optional("Optional"),
    quantity: Yup.string().required("Required"),
    notes: Yup.string(),
    offer_price: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
  });

  const navigate = useNavigate();
  const [startValues, setStartValues] = useState(initialValues);
  const { id } = useParams();
  const [showChassisNumber, setShowChassisNumber] = useState(false);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setShowChassisNumber(selectedCategory === "Vehicle");
    console.log("Selected category:", event.target.value);
  };

  const handleSubmit = async (values) => {
    const payload = { ...values };
    try {
      if (edit) {
        const response = await updateItem(id, payload);
        notyf.success("Item updated successfully");
      } else {
        const response = await addItem(payload);
        notyf.success("Item added successfully");
      }
      navigate("/item");
    } catch (error) {
      console.error(error);
      notyf.error("Error while processing the request");
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const fetchSingleItem = async () => {
    try {
      const response = await getItemById(id);
      setStartValues(response);
      setShowChassisNumber(response.detail.category === "Vehicle");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleItem();
    }
  }, [id]);

  useEffect(() => {
    console.log("Formik values:", Formik.values);
    console.log("Formik errors:", Formik.errors);
  }, [Formik.values, Formik.errors]);

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
          {edit ? "Edit Item Information" : "Add New Item"}
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
              {Object.keys(initialValues).map((field) => {
                // Conditionally render the chassis_number field
                if (field === "chassis_number" && !showChassisNumber) {
                  return null;
                }
                const options = {
                  category: [
                    { value: "Vehicle", text: "Vehicle" },
                    { value: "Other", text: "Other" },
                  ],
                  item_type: [
                    { value: "Vehicle", text: "Vehicle" },
                    { value: "Spare Part", text: "Spare Part" },
                    { value: "Other", text: "Other" },
                  ],
                  status: [
                    { value: "Sold", text: "Sold" },
                    { value: "Available", text: "Available" },
                    { value: "Reserved", text: "Reserved" },
                  ],
                };

                return (
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
                            "quantity",
                            "offer_price",
                            "customer_id",
                            "transaction_id",
                          ].includes(field)
                            ? "number"
                            : options[field]
                            ? "select"
                            : "text"
                        }
                        value={values[field]}
                        options={options[field] || []}
                        handleChange={
                          field === "category"
                            ? (e) => {
                                handleChange(e);
                                handleCategoryChange(e);
                              }
                            : handleChange
                        }
                        error={touched[field] && errors[field]}
                        isTouched={touched[field]}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                );
              })}
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

export default ItemForm;
