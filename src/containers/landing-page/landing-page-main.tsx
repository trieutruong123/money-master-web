import { Box } from '@mui/material';
import { content } from 'i18n';
import { useRouter } from 'next/router';
import LandingBrandIntro from './brand-intro';
import LandingFeatures from './features';
import LandingFooter from './footer';


const LandingPage = () => {
  const router = useRouter();
  const { locale } = router;

  const detail = locale === 'vi' ? content['vi'] : content['en'];
  const { landingPage } = detail;

  return     <Box
  component="main"
  sx={{
    flexGrow: 1,
    pt: 8,
  }}
>
  <LandingBrandIntro content={landingPage.body.intro} />
  <LandingFeatures content={landingPage.body.service} />
  <LandingFooter content={landingPage.footer} />
</Box>
};

export default LandingPage;
