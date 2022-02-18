import * as React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  LinearProgress,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { v4 as uuid } from 'uuid';
import { Link } from 'components';
import { AiOutlineStock } from 'react-icons/ai';

const categories = [
  {
    id: uuid(),
    content: 'Stocks',
    link: '/portfolio/none-interest/stock',
    component: <AiOutlineStock style={{ height: '2rem', width: '2rem' }} />,
    total: '$19.94 thsnd',
    color: 'error.main',
    profitRate: '1.2%',
    termRange: 'day',
    error: false,
  },
];

export default function YourStock() {
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
                        Since last {item.termRange}
                      </Typography>
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
