import * as React from 'react';
import {
  AccordionDetails,
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { FcDepartment, FcHome } from 'react-icons/fc';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { Link } from 'components';
import { getRandomPallete } from 'utils/color-scheme';

const categories = [
  {
    id: uuid(),
    content: 'Him Lam Department',
    link: '/portfolio/real-estate',
    component: <FcDepartment style={{ height: '2rem', width: '2rem' }} />,
    total: 'VND 3.5 bln',
    color: getRandomPallete(),
  },
  {
    id: uuid(),
    content: 'My house',
    link: '/portfolio/real-estate',
    component: <FcHome style={{ height: '2rem', width: '2rem' }} />,
    total: 'VND 5 bln',
    color: getRandomPallete(),
  },
  {
    id: uuid(),
    content: 'Nguyen Trai Street House',
    link: '/portfolio/real-estate',
    component: (
      <SiHomeassistantcommunitystore
        style={{ height: '1.5rem', width: '1.5rem' }}
      />
    ),
    total: 'VND 4.5 bln',
    color: getRandomPallete(),
  },
];

export default function YourRealEstate() {
  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {categories.map((item) => {
          return (
            <Grid key={item.id} item lg={4} sm={6} xl={4} xs={12}>
              <Link href={item.link}>
                <Card sx={{ border: '0.5rem' }}>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="h5"
                        >
                          {item.content}
                        </Typography>
                        <Typography color="textPrimary" variant="h5">
                          {item.total}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            backgroundColor: item.color,
                            height: 56,
                            width: 56,
                          }}
                        >
                          {item.component}
                        </Avatar>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
