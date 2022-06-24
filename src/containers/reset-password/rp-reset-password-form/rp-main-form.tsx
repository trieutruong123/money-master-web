import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { RPFormContants } from 'shared/constants';
import { accountStore } from 'shared/store';
import RPResetPasswordForm from './rp-reset-password';
import RPSendEmail from './rp-send-email';
import RPVerifyOTP from './rp-verify-otp';

const RPResetPasswordMainForm = observer(() => {
  const [curForm,setForm] = useState<any>(<></>);

  useEffect(()=>{
    setForm(<RPSendEmail openNextForm = {onClick}/>);
  },[])

  const onClick = (formType:string)=>{
    setForm(formList[formType])
  }


  const formList = {
    [RPFormContants.sendEmail]: <RPSendEmail openNextForm = {onClick}/>,
    [RPFormContants.verifyOTP]: <RPVerifyOTP openNextForm = {onClick}/>,
    [RPFormContants.resetPassword]: <RPResetPasswordForm />,
  };


  return <>
    {curForm}
  </>
});

export default RPResetPasswordMainForm;
