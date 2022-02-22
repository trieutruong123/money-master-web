import { Box, Grid, Typography } from '@mui/material';
import { colorScheme } from 'utils/color-scheme';
import FeatureBox from './feature-box';

export default function Feature() {
  return (
    <section className="section" id="feature">
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="1rem"
        mt="2rem"
      >
        <Grid item md={6} sm={8} xs={11}>
          <Box alignItems="center" mb="2rem">
            <Typography
              variant="h3"
              mb="1rem"
              align="center"
              color={colorScheme.theme}
            >
              Features
            </Typography>
            <Typography
              variant="body1"
              fontSize="1.4rem"
              color={colorScheme.gray600}
              textAlign="center"
            >
              Money Master provides service help you observe investment
              channels, monitor the market for specific assets, and plan for own
              finances.
            </Typography>
          </Box>
        </Grid>
        <FeatureBox features={features} />
      </Grid>
    </section>
  );
}

const features = [
  {
    id: 1,
    img: 'images/crypto-portfolio.png',
    title: 'Observe investment channels',
    desc: 'Easiy manage personal investment channels, such as crypto currenies, stocks, and gold.',
    link: '/',
  },
  {
    id: 2,
    img: 'images/investing.png',
    title: 'Track market price ',
    desc: 'Quickly track the market value of many properties, update information.',
    link: '/',
  },
  {
    id: 3,
    img: 'images/personal-finance.png',
    title: 'Plan your finances',
    desc: 'Conviniently plan personal investment, progress to achieve goal, and future accumulation money.',
    link: '/',
  },
];
