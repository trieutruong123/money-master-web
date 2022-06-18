import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { RPFormContants } from 'shared/constants';
import { accountStore } from 'shared/store';
import RPSendEmail from './rp-send-email';

const RPResetPasswordMainForm = observer(() => {
    const [form, setForm] = useState<JSX.Element>(<></>);

    const formList = {
        [RPFormContants.sendEmail]: < RPSendEmail />,
        [RPFormContants.verifyOTP]: <RPVerifyOTP />,
        [RPFormContants.resetPassword]: <RPResetPasswordForm />
    }

    return <>
        {formList[accountStore.currentForm]}
    </>
})

export default RPResetPasswordMainForm;