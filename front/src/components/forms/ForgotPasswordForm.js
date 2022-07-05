import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ForgotPasswordForm = ({ onForgot }) => {
  const initialValues = {
    email: '',
  };

  const schema = Yup.object().shape({
    email: Yup.string().email('Please, enter correct email!').required('Email is required!'),
  });

  const login = (formData, { resetForm }) => {
    onForgot.mutate(formData);
    resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={login} validationSchema={schema}>
        {() => (
          <Form className="auth-form">
            <div
              className="form-element"
            >
              <Typography className="label">
                Enter your email
              </Typography>

              <Field
                component={TextField}
                name="email"
                type="text"
                placeholder="Email"
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              className="form-element btn"
            >
              Send mail
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ForgotPasswordForm.propTypes = {
  onForgot: PropTypes.shape({}).isRequired,
};

export default ForgotPasswordForm;
