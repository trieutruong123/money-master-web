import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  LinearProgress,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'components';

const categories = [
  {
    id: uuid(),
    content: 'Bitcoin',
    imgUrl: '/crypto-currencies/Bitcoin.png',
    total: '$15.13 thsnd',
    unit: 0.3,
    profitRate: '5.79%',
    error: true,
  },
  {
    id: uuid(),
    content: 'Ethereum',
    imgUrl: '/crypto-currencies/Ethereum.png',
    total: '$5.34 thsnd',
    unit: 1.98,
    profitRate: '3.98%',
    error: true,
  },
  {
    id: uuid(),
    content: 'BNB',
    imgUrl: '/crypto-currencies/BNB.png',
    total: '$3.42 thsnd',
    unit: 8.8,
    profitRate: '2.79%',
    error: true,
  },
];

export const YourCoin = () => {
  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {categories.map((item) => {
          return (
            <Grid key={item.id} item lg={4} sm={6} xl={4} xs={12}>
              <Card sx={{ border: '0.5rem' }}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Grid item>
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                      >
                        {item.content}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                      >
                        {item.total}
                      </Typography>
                      <Typography color="textSecondary" variant="h6">
                        {item.unit} coins
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar
                        src={item.imgUrl}
                        alt="coin"
                        sx={{
                          height: '5rem',
                          width: '5rem',
                        }}
                      />
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
                      Since last day
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
