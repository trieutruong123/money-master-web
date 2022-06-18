import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import RPResetPasswordMainForm from './rp-reset-password-form/rp-main-form';

const RPResetPasswordPage = observer(() => {

    return <>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={8} md={5} xl={3}>
                <RPResetPasswordMainForm />
            </Grid>
        </Grid>
    </>;
})

export default RPResetPasswordPage;