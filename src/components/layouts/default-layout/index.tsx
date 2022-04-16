import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { content } from 'i18n';
import { rootStore } from 'shared/store';
import DefaultNavbar from './nav-bar';

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


const DefaultLayout: React.FC<IProps> = ({ children }: IProps) => {
  const router = useRouter();
  const locale = router.locale;
  const landingPage =
    locale === 'en' ? content.en.landingPage : content.vi.landingPage;
  return (
    <>
      <DefaultLayoutRoot>
        <Box id="top-of-page"
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default DefaultLayout;
