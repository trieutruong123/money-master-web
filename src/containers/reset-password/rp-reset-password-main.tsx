import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import RPResetPasswordMainForm from './rp-reset-password-form/rp-main-form';
import { useEffect } from 'react';
import { accountStore } from 'shared/store';

const RPResetPasswordPage = observer(() => {
  useEffect(() => {
    accountStore.resetInitialState();
  }, []);
  useEffect(()=>{
  },[accountStore.currentForm]);
  return (
    <>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8} md={5} xl={5}>
          <RPResetPasswordMainForm />
        </Grid>
      </Grid>
    </>
  );
});

export default RPResetPasswordPage;
