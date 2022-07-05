import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Authorization.css';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
// import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import ResetPasswordForm from '../../components/forms/ResetPasswordForm';
import { resetPassword } from './api/crud';

const ResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  const navigate = useNavigate();
  const { hash } = useParams();

  const resetFn = useMutation(
    'reset-password',
    (data) => resetPassword(hash, data),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleSnack('Your password reset!', 'success');
          setTimeout(() => {
            navigate('/sign-in');
          }, 1500);
        } else {
          handleSnack(data?.data?.message, 'error');
        }
      },
    },
  );

  return (
    <Card sx={{ margin: 'auto', width: '400px' }}>
      <CardContent>
        <ResetPasswordForm onReset={resetFn} />
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
