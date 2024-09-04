import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Grid, IconButton, Typography } from '@mui/material';
import FormField from '../../components/InputField/FormField';
import { addSpareParts, getSparePartsById, updateSpareParts } from '../../../core/api/spareparts';
import notyf from '../../components/NotificationMessage/notyfInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { Box } from '@mui/system';
const SparePartForm = ({edit}) => {
  const initialValues ={
    name:'',
    status:'',
    description:'',
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),  
  status: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});
const options ={
    status: ['new', 'sold'],
}
    const navigate = useNavigate();
    const [startValues, setStartValues] = useState(initialValues);
    const { id } = useParams();
    const handleSubmit = async (values) => {
     if(edit){
      const payload = {
        ...values,
        fk_vehicle_id: "1",
        fk_user_id: '1',
        fk_container_id: '1',
      };
      try {
        const response = await updateSpareParts(id, payload);
        console.log('response', response);
        notyf.success('Update Spare Part Successfully');
        navigate('/spare-part-listing');
        // debugger
      } catch (error) {
        console.log(error);
      }
     }

     else{
      const payload = {
        ...values,
        fk_vehicle_id: "1",
        fk_user_id: '1',
        fk_container_id: '1',
      };
      try {
        const response = await addSpareParts(payload);
        console.log('response', response);
        notyf.success('Add Spare Part Successfully');
        navigate('/spare-part-listing');
        // debugger
      } catch (error) {
        console.log(error);
      }
     }
    };
    const handleClose = () => {
      navigate(-1); // Navigate back to the previous page
    };
    const fetchSingleSparePart = async () => {
      try {
        const response = await getSparePartsById(id);
        setStartValues(response.detail);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (id) {
        fetchSingleSparePart();
      }
    }, [id]);

    return (
        <Container
          style={{
            maxHeight: 'calc(100vh - 120px)',
            margin: '1rem',
            overflow: 'auto',
            // border: '1px solid grey',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Typography variant="h4" gutterBottom>
          Spare Part Information
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
                          type={
                            [
                              'status',
                            ].includes(field)
                              ? 'select'
                              : 'text'
                          }
                          //  label={field.replace(/_/g, ' ').toUpperCase()}
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

export default SparePartForm
