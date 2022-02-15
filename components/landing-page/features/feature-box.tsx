import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import _ from 'lodash';
import Image from 'next/image';
import { colorScheme } from 'utils/color-scheme';

interface FeatureItem {
  id: number;
  img: string;
  title: string;
  desc: string;
  link: string;
}

interface IProps {
  features: Array<FeatureItem>;
}
export default function FeatureBox({ features }: IProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {features.map((feature, key) => {
        return feature.id % 2 !== 0 && !isSm ? (
          <Grid
            key={key}
            container
            item
            alignItems="center"
            mt={feature.id === 1 ? '2rem' : 0}
            md={7}
            sm={8}
            xs={11}
          >
            <Grid item md={6} alignItems="center">
              <img src={feature.img} alt="alt" style={{ width: '90%' }} />
            </Grid>
            <Grid item md={6}>
              <Box mt={isSm ? '3rem' : '0'} mb="1.5rem">
                <Typography variant="h4" mb="1rem" pt="1rem">
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  mb="1rem"
                  fontSize="1.4rem"
                  color={colorScheme.gray600}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid
            key={key}
            container
            item
            alignItems="center"
            mt="2rem"
            md={7}
            sm={8}
            xs={11}
          >
            <Grid item md={6}>
              <Box mt={isSm ? '3rem' : '0'} mb="1.5rem">
                <Typography variant="h4" mb="1rem" pt="1rem">
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  mb="1rem"
                  fontSize="1.4rem"
                  color={colorScheme.gray600}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={5} mt={isSm ? '3rem' : '0'}>
              <img src={feature.img} alt="alt" style={{ width: '90%' }} />
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
