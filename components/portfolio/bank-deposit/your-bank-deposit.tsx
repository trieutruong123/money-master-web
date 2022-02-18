import * as React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { v4 as uuid } from 'uuid';
import { BsPiggyBank, BsBank } from 'react-icons/bs';
import { Link } from 'components';
import { getRandomPallete } from 'utils/color-scheme';

const categories = [
  {
    id: uuid(),
    content: 'ACB Savings',
    link: '/portfolio/interest',
    component: <BsBank style={{ height: '2rem', width: '2rem' }} />,
    total: 'VND 300 mil',
    color: getRandomPallete(),
    profitRate: '6.51%',
    termRange: '1 year',
    progress: 40,
    error: false,
  },
  {
    id: uuid(),
    content: 'BIDV Savings',
    link: '/portfolio/interest',
    component: <BsPiggyBank style={{ height: '2rem', width: '2rem' }} />,
    total: 'VND 100 mil',
    color: getRandomPallete(),
    profitRate: '5.2%',
    termRange: '6 months',
    progress: 80,
    error: false,
  },
];

export default function YourBankDeposit() {
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
                    <Box
                      sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {item.error ? (
                        <ArrowDownwardIcon color="error" />
                      ) : (
                        <ArrowUpwardIcon color="success" />
                      )}
                      <Typography
                        color={item.error ? 'error' : 'success'}
                        sx={{
                          mr: 1,
                        }}
                        variant="body2"
                      >
                        {item.profitRate}
                      </Typography>
                      <Typography color="textSecondary" variant="caption">
                        / {item.termRange}
                      </Typography>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                      <LinearProgress
                        value={item.progress}
                        variant="determinate"
                      />
                    </Box>
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
