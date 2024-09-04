import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Grid, IconButton, Typography } from '@mui/material';
import FormField from '../../components/InputField/FormField';
import { addCustomer, getCustomerById, updateCustomer } from '../../../core/api/customer';
import notyf from '../../components/NotificationMessage/notyfInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { Box } from '@mui/system';

const CustomerForm = ({ edit }) => {
  const initialValues = {
    name: '',
    phone_number: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const navigate = useNavigate();
  const [startValues, setStartValues] = useState(initialValues);
  const { id } = useParams();

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
    };

    try {
      if (edit) {
        const response = await updateCustomer(id, payload);
        notyf.success('Update Customer Successfully');
      } else {
        const response = await addCustomer(payload);
        notyf.success('Add Customer Successfully');
      }
      navigate('/customers');
    } catch (error) {
      notyf.error(error);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const fetchSingleCustomer = async () => {
    try {
      const response = await getCustomerById(id);
      setStartValues(response.detail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleCustomer();
    }
  }, [id]);

  return (
    <Container
      style={{
        maxHeight: 'calc(100vh - 120px)',
        margin: '1rem',
        overflow: 'auto',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Typography variant="h4" gutterBottom>
          Customer Information
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
                  alignItems='center'
                >
                  <Grid item xs={4}>
                    <Typography
                      variant='body1'
                      align='left'
                      sx={{ paddingLeft: 1 }}
                    >
                      {field
                        .replace(/_/g, ' ')
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <FormField
                      id={field}
                      name={field}
                      type='text'
                      value={values[field]}
                      handleChange={handleChange}
                      error={touched[field] && errors[field]}
                      isTouched={touched[field]}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} container justifyContent='flex-end'>
                <Button type='submit' variant='contained' color='primary'>
                  {edit ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CustomerForm;
