import { Box, Grid, Typography } from '@mui/material';
import { colorScheme } from 'utils/color-scheme';
import FeatureBox from './feature-box';
interface IProps {
  content: any;
}

export default function Service({ content }: IProps) {
  const featureList = content.feature;
  const features = [
    {
      id: 1,
      img: '/images/crypto-portfolio.png',
      title: featureList[0].title,
      desc: featureList[0].desc,
    },
    {
      id: 2,
      img: '/images/investing.png',
      title: featureList[1].title,
      desc: featureList[1].desc,
    },
    {
      id: 3,
      img: '/images/personal-finance.png',
      title: featureList[2].title,
      desc: featureList[2].desc,
    },
  ];

  return (
    <section className="section" id="service">
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
              {content?.title}
            </Typography>
            <Typography
              variant="body1"
              fontSize="1.4rem"
              color={colorScheme.gray600}
              textAlign="center"
            >
              {content?.desc}
            </Typography>
          </Box>
        </Grid>
        <FeatureBox features={features} />
      </Grid>
    </section>
  );
}
