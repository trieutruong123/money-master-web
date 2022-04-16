import React from 'react';
import Image from 'next/image';
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { colorScheme } from 'utils/color-scheme';
import { Link } from 'shared/components';

interface IProps {
  content: any;
}

export default function BrandIntro({ content }: IProps) {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <section
      className="section"
      id="brand-intro"
      style={{ position: 'relative' }}
    >
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          mx="1rem"
          lg={3}
          md={7}
          sm={8}
          xs={11}
          pr={isLg ? '1.5rem' : '0'}
        >
          <div>
            <Typography
              variant="body1"
              textTransform="uppercase"
              color={colorScheme.theme}
              fontSize="1.4rem"
              mb="1.5rem"
            >
              {content?.brand}
            </Typography>
            <Typography variant="h3" mb="1.5rem">
              {content?.title}
            </Typography>
            <Typography variant="h5" mb="1.5rem" color={colorScheme.gray600}>
              {content?.desc}
            </Typography>
            <Link href="/#">
              <Button variant="contained" color="primary">
                {content?.findOutMore}{' '}
                <span style={{ alignItems: 'center', marginLeft: '0.5rem' }}>
                  &#8594;
                </span>
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item lg={4} md={7} sm={8} xs={11} mt={isLg ? '1rem' : '0rem'}>
          <Image
            id="landing-image-01"
            src="/images/landing-image-01.png"
            alt="landing image 01"
            width={'450'}
            height = {'420'}
            priority
          />
        </Grid>
      </Grid>
    </section>
  );
}
