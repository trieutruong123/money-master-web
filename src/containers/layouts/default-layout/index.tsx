import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { content } from 'i18n';
import { rootStore } from 'shared/store';
import DefaultNavbar from './nav-bar';
import { observer } from 'mobx-react-lite';

interface IProps {
  children: ReactNode;
}

const DefaultLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

const DefaultLayout: React.FC<IProps> = observer(({ children }: IProps) => {
  const router = useRouter();
  const locale = router.locale;
  const landingPage =
    locale === 'en' ? content.en.landingPage : content.vi.landingPage;

  const { isNotified, message, variant } = rootStore;
  useEffect(() => {
    if (isNotified) {
      toast(message, {
        type: variant,
        onClose: () => rootStore.deleteNotification(),
      });
    }
  }, [isNotified, message, variant, rootStore, toast]);

  return (
    <>
      <DefaultLayoutRoot>
        <Box
          id="top-of-page"
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DefaultLayoutRoot>
      <DefaultNavbar content={landingPage.navbar} />
    </>
  );
});

export default DefaultLayout;
