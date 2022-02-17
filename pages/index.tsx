import { Box } from '@mui/material';
import {
  BrandIntro,
  Footer,
  DefaultNavbar,
  Feature,
} from 'components/landing-page';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Box id="top-of-page">
      <DefaultNavbar />
      <BrandIntro />
      <Feature />
      <Footer />
    </Box>
  );
};

export default Home;
